import React, { useState, useEffect, useRef } from "react";
import data from "../data";
import Tours from "../Components/Tours";
// import Refresh from "../Components/Refresh";
import { FaMapMarkedAlt, FaSearch, FaTimesCircle } from "react-icons/fa";
import "../index.css";
import "../Components/Navbar.css";
import { db, auth } from "../firebase";
import {
  collection,
  doc,
  setDoc,
  updateDoc,
  onSnapshot,
  serverTimestamp,
  getDoc,
  deleteDoc,
  getDocs,
} from "firebase/firestore";
import {
  signInAnonymously,
  onAuthStateChanged,
} from "firebase/auth";
import { arrayToMap, mapToArray } from "../lib/planModel";

export default function PlanTrip({ searchQuery = "" }) {
  const [tour, setTour] = useState(data);
  const [selectedCountry, setSelectedCountry] = useState("India");
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [sortBy, setSortBy] = useState("default");
  const [localSearchQuery, setLocalSearchQuery] = useState("");
  const [showRegionDropdown, setShowRegionDropdown] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  // Collaboration states
  const [sharedPlanId, setSharedPlanId] = useState("");
  const [isCollaborating, setIsCollaborating] = useState(false);
  const [collabStatus, setCollabStatus] = useState("idle");
  const unsubscribeRef = useRef({});
  const saveTimeoutRef = useRef(null);
  const presenceIntervalRef = useRef(null);
  const [uid, setUid] = useState(null);
  const [plansList, setPlansList] = useState([]);
  const [planTitle, setPlanTitle] = useState("");
  const [locks, setLocks] = useState({});
  const [presence, setPresence] = useState({});

  const regions = [
    "All",
    ...new Set(
      data
        .filter((t) => t.country === selectedCountry)
        .map((t) => t.region)
    ),
  ];
  const sortOptions = [
    { value: "default", label: "Default" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown-container")) {
        setShowRegionDropdown(false);
        setShowSortDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function removeTour(id) {
    const newTour = tour.filter((tour) => tour.id !== id);
    setTour(newTour);
    // Persist removal when collaborating
    if (isCollaborating && sharedPlanId) {
      const planDoc = doc(collection(db, "sharedPlans"), sharedPlanId);
      // Save as map keyed by id
      const toursMap = arrayToMap(newTour);
      updateDoc(planDoc, {
        tours: toursMap,
        updatedAt: serverTimestamp(),
      }).catch((err) => console.error("Failed to sync removeTour:", err));
    }
  }

  const getSortedTours = (tours) => {
    if (sortBy === "price-low") {
      return [...tours].sort((a, b) => a.price - b.price);
    }
    if (sortBy === "price-high") {
      return [...tours].sort((a, b) => b.price - a.price);
    }
    return tours;
  };


  const filteredTours = tour.filter((t) => {
    const matchesCountry = t.country === selectedCountry;
    const matchesRegion =
      selectedRegion === "All" || t.region === selectedRegion;
    const effectiveSearchQuery = (searchQuery || localSearchQuery || "").toLowerCase();
    const matchesSearch = t.name.toLowerCase().includes(effectiveSearchQuery);
    return matchesCountry && matchesRegion && matchesSearch;
  });

  const sortedAndFilteredTours = getSortedTours(filteredTours);

  const handleRegionSelect = (region) => {
    setSelectedRegion(region);
    setShowRegionDropdown(false);
  };

  const handleSortSelect = (sortValue) => {
    setSortBy(sortValue);
    setShowSortDropdown(false);
  };

  const handleClearFilters = () => {
    setSelectedRegion("All");
    setSortBy("default");
    setLocalSearchQuery("");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Create a new shared plan in Firestore
  const createSharedPlan = async () => {
    try {
      const plansCol = collection(db, "sharedPlans");
      // Use a random id by creating a doc ref without id then reading its id
      const newDocRef = doc(plansCol);
      const id = newDocRef.id;
      await setDoc(newDocRef, {
        title: planTitle || "Untitled Plan",
        owner: uid || null,
        allowedEditors: uid ? [uid] : [],
        tours: arrayToMap(tour),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      setSharedPlanId(id);
      setIsCollaborating(true);
      setCollabStatus("created");
      subscribeToPlan(id);
    } catch (err) {
      console.error("createSharedPlan error:", err);
      setCollabStatus("error");
    }
  };

  // Join an existing shared plan by id
  const joinSharedPlan = async (id) => {
    if (!id) return;
    try {
      const planDocRef = doc(collection(db, "sharedPlans"), id);
      const snap = await getDoc(planDocRef);
      if (!snap.exists()) {
        setCollabStatus("not-found");
        return;
      }
      const dataSnap = snap.data();
      if (dataSnap?.tours) setTour(mapToArray(dataSnap.tours));
      // load metadata
      if (dataSnap?.title) setPlanTitle(dataSnap.title);
      setSharedPlanId(id);
      setIsCollaborating(true);
      setCollabStatus("joined");
      subscribeToPlan(id);
      // add presence doc
      try {
        const presenceDoc = doc(collection(db, "sharedPlans", id, "presence"), uid || "anon");
        await setDoc(presenceDoc, { uid: uid || "anon", lastActive: serverTimestamp() });
        // start updating lastActive periodically
        if (presenceIntervalRef.current) clearInterval(presenceIntervalRef.current);
        presenceIntervalRef.current = setInterval(async () => {
          try {
            await setDoc(presenceDoc, { uid: uid || "anon", lastActive: serverTimestamp() });
          } catch (e) {
            /* ignore */
          }
        }, 20000);
      } catch (e) {
        console.error("presence init error", e);
      }
    } catch (err) {
      console.error("joinSharedPlan error:", err);
      setCollabStatus("error");
    }
  };

  const leaveSharedPlan = () => {
    // unsubscribe all
    if (unsubscribeRef.current.planUnsub) unsubscribeRef.current.planUnsub();
    if (unsubscribeRef.current.locksUnsub) unsubscribeRef.current.locksUnsub();
    if (unsubscribeRef.current.presenceUnsub) unsubscribeRef.current.presenceUnsub();
    unsubscribeRef.current = {};
    // clear presence interval
    if (presenceIntervalRef.current) {
      clearInterval(presenceIntervalRef.current);
      presenceIntervalRef.current = null;
    }
    // remove presence doc
    if (sharedPlanId && uid) {
      const presenceDocRef = doc(collection(db, "sharedPlans", sharedPlanId, "presence"), uid);
      deleteDoc(presenceDocRef).catch(() => {});
    }
    setIsCollaborating(false);
    setCollabStatus("left");
    setSharedPlanId("");
  };

  // Subscribe to real-time updates for a shared plan
  const subscribeToPlan = (id) => {
    // clean previous
    if (unsubscribeRef.current.planUnsub) unsubscribeRef.current.planUnsub();
    if (unsubscribeRef.current.locksUnsub) unsubscribeRef.current.locksUnsub();
    if (unsubscribeRef.current.presenceUnsub) unsubscribeRef.current.presenceUnsub();

    const planDoc = doc(collection(db, "sharedPlans"), id);
    const planUnsub = onSnapshot(
      planDoc,
      (snap) => {
        if (snap.exists()) {
          const dataSnap = snap.data();
          if (dataSnap?.tours) {
            // Apply remote changes (tours stored as map)
            setTour((prev) => {
              const remoteArr = mapToArray(dataSnap.tours || {});
              const remote = JSON.stringify(remoteArr || []);
              const local = JSON.stringify(prev || []);
              if (remote !== local) return remoteArr;
              return prev;
            });
          }
          if (dataSnap?.title) setPlanTitle(dataSnap.title);
          setCollabStatus("synced");
        } else {
          setCollabStatus("deleted");
        }
      },
      (err) => {
        console.error("onSnapshot error:", err);
        setCollabStatus("error");
      }
    );

    // listen to locks subcollection
    const locksCol = collection(db, "sharedPlans", id, "locks");
    const locksUnsub = onSnapshot(locksCol, (snap) => {
      const newLocks = {};
      snap.docs.forEach((d) => newLocks[d.id] = d.data());
      setLocks(newLocks);
    });

    // listen to presence subcollection
    const presenceCol = collection(db, "sharedPlans", id, "presence");
    const presenceUnsub = onSnapshot(presenceCol, (snap) => {
      const newPresence = {};
      snap.docs.forEach((d) => newPresence[d.id] = d.data());
      setPresence(newPresence);
    });

    unsubscribeRef.current = { planUnsub, locksUnsub, presenceUnsub };
  };

  // Persist a full save to Firestore (useful for manual save button)
  const saveSharedPlan = async () => {
    if (!isCollaborating || !sharedPlanId) return;
    try {
      const planDoc = doc(collection(db, "sharedPlans"), sharedPlanId);
      await updateDoc(planDoc, {
        tours: arrayToMap(tour),
        updatedAt: serverTimestamp(),
      });
      setCollabStatus("saved");
    } catch (err) {
      console.error("saveSharedPlan error:", err);
      setCollabStatus("error");
    }
  };

  // Auto-save (debounced) whenever the local `tour` changes while collaborating.
  useEffect(() => {
    if (!isCollaborating || !sharedPlanId) return;
    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    saveTimeoutRef.current = setTimeout(async () => {
      try {
        const planDoc = doc(collection(db, "sharedPlans"), sharedPlanId);
        await updateDoc(planDoc, {
          tours: arrayToMap(tour),
          updatedAt: serverTimestamp(),
        });
        setCollabStatus("autosaved");
      } catch (err) {
        console.error("autosave error:", err);
        setCollabStatus("error");
      }
    }, 700);

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
        saveTimeoutRef.current = null;
      }
    };
  }, [tour, isCollaborating, sharedPlanId]);

  // Auth: sign in anonymously if not signed in
  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, (user) => {
      if (user) setUid(user.uid);
      else {
        signInAnonymously(auth).catch((e) => console.error("anon sign-in failed", e));
      }
    });
    return () => unsubAuth();
  }, []);

  // fetch list of plans for browsing
  const fetchPlansList = async () => {
    try {
      const plansCol = collection(db, "sharedPlans");
      const snaps = await getDocs(plansCol);
      const items = snaps.docs.map(d => ({ id: d.id, ...d.data() }));
      setPlansList(items);
    } catch (e) {
      console.error("fetchPlans error", e);
    }
  };

  // lock/unlock item
  const lockItem = async (tourId) => {
    if (!sharedPlanId || !uid) return;
    const lockDoc = doc(collection(db, "sharedPlans", sharedPlanId, "locks"), tourId);
    try {
      await setDoc(lockDoc, { lockedBy: uid, lockedAt: serverTimestamp() });
    } catch (e) {
      console.error("lock error", e);
    }
  };

  const unlockItem = async (tourId) => {
    if (!sharedPlanId || !uid) return;
    const lockDoc = doc(collection(db, "sharedPlans", sharedPlanId, "locks"), tourId);
    try {
      await deleteDoc(lockDoc);
    } catch (e) {
      console.error("unlock error", e);
    }
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (unsubscribeRef.current) unsubscribeRef.current();
    };
  }, []);

  return (
    <div className="px-4 py-10 md:px-16 lg:px-24">
      {/* Title Section */}
      <div className="text-center mb-10">
        <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-transparent bg-clip-text flex items-center justify-center gap-3 animate-fadeIn">
          <FaMapMarkedAlt className="text-5xl" /> Plan Your Dream Gateway
        </h2>
        <p className="text-gray-600 mt-3 text-lg">
          Discover the best destinations tailored to your mood and purpose.
        </p>
        <p className="mt-2 text-sm text-gray-500 italic">
          Adventure, culture, or calm — what are you exploring today?
        </p>
      </div>

      {/* Country Tabs */}
      <div className="flex justify-center mb-8 border-b-2 border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setSelectedCountry("India")}
          className={`px-6 py-2 text-lg font-semibold transition-colors duration-300 ${
            selectedCountry === "India"
              ? "border-b-4 border-purple-500 text-purple-600 dark:text-purple-400"
              : "text-gray-500 hover:text-purple-500 dark:text-gray-400 dark:hover:text-purple-400"
          }`}
        >
          India
        </button>
        <button
          onClick={() => setSelectedCountry("Global")}
          className={`px-6 py-2 text-lg font-semibold transition-colors duration-300 ${
            selectedCountry === "Global"
              ? "border-b-4 border-purple-500 text-purple-600 dark:text-purple-400"
              : "text-gray-500 hover:text-purple-500 dark:text-gray-400 dark:hover:text-purple-400"
          }`}
        >
          Global
        </button>
      </div>

      {/* Search, Filter and Sort Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-center gap-4 mb-10">
  <div className="w-full md:w-auto flex flex-col md:flex-row items-stretch md:items-center gap-3 bg-white/80 shadow-lg rounded-2xl px-4 py-3 border border-gray-100">
    {/* Region Dropdown */}
    <div className="dropdown-container relative flex-1 min-w-[150px]">
      <button
        className="w-full flex items-center justify-between gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-sky-400 to-blue-600 text-white font-semibold shadow transition hover:scale-[1.03] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        onClick={() => {
          setShowRegionDropdown(!showRegionDropdown);
          setShowSortDropdown(false);
        }}
      >
        <span><FaMapMarkedAlt className="inline mr-2" />Region: {selectedRegion}</span>
        <span className="ml-2">▼</span>
      </button>
      {showRegionDropdown && (
        <div className="dropdown-menu absolute left-0 right-0 mt-2 bg-white shadow-xl rounded-xl z-10 animate-fadeIn border border-gray-100">
          {regions.map((region) => (
            <button
              key={region}
              onClick={() => handleRegionSelect(region)}
              className={`block w-full text-left px-4 py-2 hover:bg-blue-50 transition-colors rounded ${
                selectedRegion === region ? "font-bold text-blue-600 bg-blue-50" : ""
              }`}
            >
              {region}
            </button>
          ))}
        </div>
      )}
    </div>

    {/* Divider */}
    <div className="hidden md:block w-px bg-gray-200 mx-2" />

    {/* Search Bar */}
    <div className="relative flex-1 min-w-[200px]">
      <FaSearch className="absolute top-3 left-3 text-gray-400" />
      <input
        type="text"
        placeholder="Search destinations..."
        value={localSearchQuery}
        onChange={(e) => setLocalSearchQuery(e.target.value)}
        className="pl-10 pr-4 py-2 w-full rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm bg-white"
      />
    </div>

    {/* Divider */}
    <div className="hidden md:block w-px bg-gray-200 mx-2" />

    {/* Sort Dropdown */}
    <div className="dropdown-container relative flex-1 min-w-[150px]">
      <button
        className="w-full flex items-center justify-between gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-green-400 to-teal-600 text-white font-semibold shadow transition hover:scale-[1.03] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
        onClick={() => {
          setShowSortDropdown(!showSortDropdown);
          setShowRegionDropdown(false);
        }}
      >
        <span>Sort: {sortOptions.find((option) => option.value === sortBy)?.label}</span>
        <span className="ml-2">▼</span>
      </button>
      {showSortDropdown && (
        <div className="dropdown-menu absolute left-0 right-0 mt-2 bg-white shadow-xl rounded-xl z-10 animate-fadeIn border border-gray-100">
          {sortOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSortSelect(option.value)}
              className={`block w-full text-left px-4 py-2 hover:bg-teal-50 transition-colors rounded ${
                sortBy === option.value ? "font-bold text-teal-600 bg-teal-50" : ""
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>

    {/* Divider */}
    <div className="hidden md:block w-px bg-gray-200 mx-2" />

    {/* Clear Filters */}
    <button
      onClick={handleClearFilters}
      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-100 text-red-600 font-semibold hover:bg-red-200 transition-all"
    >
      <FaTimesCircle /> Clear
    </button>
  </div>
</div>

        {/* Collaboration Controls */}
        <div className="mt-4 mb-8 flex flex-col md:flex-row items-center gap-3">
          <input
            type="text"
            placeholder="Enter plan id to join or leave"
            value={sharedPlanId}
            onChange={(e) => setSharedPlanId(e.target.value)}
            className="px-3 py-2 rounded-lg border border-gray-300 w-full md:w-72"
          />
          <div className="flex gap-2">
            <button
              onClick={createSharedPlan}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700"
            >
              Create & Share
            </button>
            <button
              onClick={() => joinSharedPlan(sharedPlanId)}
              className="px-4 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700"
            >
              Join
            </button>
            <button
              onClick={saveSharedPlan}
              className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700"
            >
              Save
            </button>
            <button
              onClick={leaveSharedPlan}
              className="px-4 py-2 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600"
            >
              Leave
            </button>
          </div>
          <div className="ml-4 text-sm text-gray-600">
            Status: <span className="font-medium">{collabStatus}</span>
            {isCollaborating && sharedPlanId && (
              <>
                <div className="mt-1">
                  Share id: <span className="font-semibold">{sharedPlanId}</span>
                  <button
                    onClick={() => {
                      try {
                        navigator.clipboard.writeText(sharedPlanId);
                      } catch (e) {
                        // ignore clipboard errors
                      }
                    }}
                    className="ml-2 px-2 py-1 text-xs bg-gray-200 rounded"
                  >
                    Copy
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

       

      {/* Tours List with Improved Card Layout */}
      {sortedAndFilteredTours.length > 0 ? (
        // <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          <Tours
            tours={sortedAndFilteredTours}
            removeTour={removeTour}
            setSelectedRegion={setSelectedRegion}
            lockItem={lockItem}
            unlockItem={unlockItem}
            locks={locks}
            presence={presence}
          />
        // </div>
      ) : (
        <div className="text-center py-20 text-gray-500 text-lg italic animate-fadeIn">
          No destinations found. Try adjusting your search or filters.
        </div>
      )}
      {/* Plan browser */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-2">Available Shared Plans</h3>
        <div className="flex gap-2 flex-wrap">
          <button onClick={fetchPlansList} className="px-3 py-1 bg-gray-200 rounded">Refresh</button>
          {plansList.map(p => (
            <div key={p.id} className="p-3 border rounded bg-white">
              <div className="font-semibold">{p.title}</div>
              <div className="text-xs text-gray-500">id: {p.id}</div>
              <div className="mt-2 flex gap-2">
                <button onClick={() => { setSharedPlanId(p.id); joinSharedPlan(p.id); }} className="px-2 py-1 bg-green-500 text-white rounded">Join</button>
                <button onClick={() => { navigator.clipboard?.writeText(p.id); }} className="px-2 py-1 bg-gray-100 rounded">Copy id</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}