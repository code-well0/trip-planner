import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signOut, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase";
import { toast } from "react-toastify";
import { FaSignOutAlt, FaEdit, FaSave, FaTimes } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import {
  doc,
  onSnapshot,
  setDoc,
  collection,
  query,
  orderBy,
  limit,
  getDocs,
} from "firebase/firestore";
import { useInterested } from "../contexts/InterestedContext";

const formatJoinDate = (timestamp) => {
  if (!timestamp) return "";
  const date = new Date(timestamp);
  return date.toLocaleString("default", { month: "long", year: "numeric" });
};

const formatRelativeTime = (timestamp) => {
  if (!timestamp) return "";
  const now = new Date();
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);
  const diffWeeks = Math.floor(diffDays / 7);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? "s" : ""} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
  return `${diffWeeks} week${diffWeeks > 1 ? "s" : ""} ago`;
};

const activityTypeColors = {
  trip_planned: "bg-blue-500",
  expense_added: "bg-green-500",
  ai_chat: "bg-yellow-500",
  itinerary_created: "bg-indigo-500",
  blog_posted: "bg-pink-500",
  place_visited: "bg-purple-500",
};

const Profile = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    location: "",
    bio: "",
    joinDate: "",
    profilePic: "",
  });

  const [editInfo, setEditInfo] = useState({ name: "", location: "", bio: "" });
  const [profilePic, setProfilePic] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const { visitedPlaces } = useInterested();

  // Real-time stats from Firestore
  const [tripsPlanned, setTripsPlanned] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [recentActivities, setRecentActivities] = useState([]);
  const [loadingActivities, setLoadingActivities] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        // not logged in
        setUserInfo({
          name: "",
          email: "",
          location: "",
          bio: "",
          joinDate: "",
          profilePic: "",
        });
        setEditInfo({ name: "", location: "", bio: "" });
        setProfilePic("");
        setTripsPlanned(0);
        setTotalExpenses(0);
        setRecentActivities([]);
        return;
      }

      const fetchUserData = async () => {
        try {
          if (user && user.uid) {
            const userDocRef = doc(db, "users", user.uid);

            const unsubSnap = onSnapshot(
              userDocRef,
              async (docSnap) => {
                let userData;
                if (docSnap.exists()) {
                  userData = docSnap.data();

                  let needUpdate = false;

                  // If name is missing, fallback to auth displayName or "U"
                  if (!userData.name || userData.name.trim() === "") {
                    userData.name =
                      user.displayName || user.email.split("@")[0] || "User";
                    needUpdate = true;
                  }

                  // If profilePic is missing, generate avatar
                  if (
                    !userData.profilePic ||
                    userData.profilePic.trim() === ""
                  ) {
                    const initials = userData.name
                      .split(" ")
                      .map((n) => n[0].toUpperCase())
                      .join("")
                      .slice(0, 2);

                    userData.profilePic =
                      user.photoURL ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        initials
                      )}&rounded=true&background=random&size=128`;
                    needUpdate = true;
                  }

                  // Save updates to Firestore if needed
                  if (needUpdate) {
                    await setDoc(userDocRef, userData, { merge: true });
                  }

                  // Read real-time stats from user doc
                  setTripsPlanned(userData.tripsPlanned || 0);
                  setTotalExpenses(userData.totalExpenses || 0);
                } else {
                  const displayName =
                    user.displayName || user.email.split("@")[0] || "User";

                  const initials = displayName
                    .split(" ")
                    .map((n) => n[0].toUpperCase())
                    .join("")
                    .slice(0, 2);

                  const generatedProfilePic =
                    user.photoURL ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      initials
                    )}&rounded=true&background=random&size=128`;

                  userData = {
                    name: displayName,
                    location: "",
                    bio: "",
                    profilePic: generatedProfilePic,
                    joinDate: user.metadata.creationTime,
                    tripsPlanned: 0,
                    totalExpenses: 0,
                  };
                  await setDoc(userDocRef, userData);
                  setTripsPlanned(0);
                  setTotalExpenses(0);
                }

                setProfilePic(userData.profilePic);

                setUserInfo({
                  ...userData,
                  email: user.email,
                  joinDate: user.metadata.creationTime,
                });

                setEditInfo({
                  name: userData.name,
                  location: userData.location,
                  bio: userData.bio,
                });
              },
              (err) => {
                console.error("Error loading Firestore user:", err);
              }
            );

            // Fetch real expenses total from the expenses sub-doc
            const expDocRef = doc(db, "users", user.uid, "data", "expenses");
            const unsubExp = onSnapshot(expDocRef, (snap) => {
              if (snap.exists()) {
                const data = snap.data();
                setTotalExpenses(data.totalSpent || 0);
              }
            });

            // Fetch recent activities
            const fetchActivities = async () => {
              setLoadingActivities(true);
              try {
                const activitiesCol = collection(
                  db,
                  "users",
                  user.uid,
                  "activities"
                );
                const q = query(
                  activitiesCol,
                  orderBy("createdAt", "desc"),
                  limit(10)
                );
                const snap = await getDocs(q);
                const activities = snap.docs.map((d) => ({
                  id: d.id,
                  ...d.data(),
                }));
                setRecentActivities(activities);
              } catch (err) {
                console.error("Error fetching activities:", err);
              }
              setLoadingActivities(false);
            };
            fetchActivities();

            // Also listen for real-time activity updates
            const activitiesCol = collection(
              db,
              "users",
              user.uid,
              "activities"
            );
            const q = query(
              activitiesCol,
              orderBy("createdAt", "desc"),
              limit(10)
            );
            const unsubActivities = onSnapshot(q, (snap) => {
              const activities = snap.docs.map((d) => ({
                id: d.id,
                ...d.data(),
              }));
              setRecentActivities(activities);
              setLoadingActivities(false);
            });

            return () => {
              unsubSnap();
              unsubExp();
              unsubActivities();
            };
          }
        } catch (err) {
          console.error("Error in fetchUserData:", err);
        }
      };
      fetchUserData();
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logged out successfully!");
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error during logout:", error);
        toast.error("Failed to logout. Please try again.");
      });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    const user = auth.currentUser;
    if (!user) return;

    try {
      const userDocRef = doc(db, "users", user.uid);
      await setDoc(
        userDocRef,
        {
          name: editInfo.name,
          location: editInfo.location,
          bio: editInfo.bio,
          profilePic: profilePic || userInfo.profilePic,
          joinDate: user.metadata.creationTime,
        },
        { merge: true }
      );

      try {
        await updateProfile(user, {
          displayName: editInfo.name,
          photoURL: profilePic || userInfo.profilePic,
        });
      } catch (err) {
        console.warn("Firebase auth updateProfile failed:", err);
      }

      setUserInfo({
        ...userInfo,
        name: editInfo.name,
        location: editInfo.location,
        bio: editInfo.bio,
        profilePic: profilePic || userInfo.profilePic,
      });

      setIsEditing(false);
      toast.success("Profile Updated Successfully");

      // Here you would typically save to a database
    } catch (err) {
      console.error("Error updating profile:", err);
      toast.error("Failed to update profile.");
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditInfo({
      name: userInfo.name,
      location: userInfo.location,
      bio: userInfo.bio,
    });
    setProfilePic(userInfo.profilePic);
  };

  const handleInputChange = (field, value) => {
    setEditInfo({ ...editInfo, [field]: value });
  };

  const handleProfilePicChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (ev) => {
      const dataUrl = ev.target.result;
      const user = auth.currentUser;
      if (!user) return;

      try {
        const userDocRef = doc(db, "users", user.uid);
        await setDoc(userDocRef, { profilePic: dataUrl }, { merge: true });

        try {
          await updateProfile(user, { photoURL: dataUrl });
        } catch (err) {
          console.warn("Firebase Auth updateProfile failed:", err);
        }

        setProfilePic(dataUrl);
        setUserInfo((prev) => ({ ...prev, profilePic: dataUrl }));
        toast.success("Profile picture updated successfully!");
      } catch (err) {
        console.error("Error updating profile pic:", err);
        toast.error("Failed to update profile picture.");
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Profile Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Profile Picture */}
            <div className="relative">
              <img
                src={
                  profilePic ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    userInfo.name
                  )}&background=random`
                }
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover shadow-md"
              />

              {/* Always show edit icon for profile pic */}
              <label
                htmlFor="profile-pic-upload"
                className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer shadow-lg hover:bg-blue-700 transition"
              >
                <FaEdit />
              </label>
              <input
                id="profile-pic-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleProfilePicChange}
              />
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left">
              {isEditing ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={editInfo.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="text-2xl font-bold bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded px-3 py-2 w-full text-gray-800 dark:text-white"
                    placeholder="Your Name"
                  />
                  <input
                    type="email"
                    value={userInfo.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded px-3 py-2 w-full"
                    placeholder="Your Email"
                  />
                  <input
                    type="text"
                    value={editInfo.location}
                    onChange={(e) =>
                      handleInputChange("location", e.target.value)
                    }
                    className="text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded px-3 py-2 w-full"
                    placeholder="Your Location"
                  />
                  <textarea
                    value={editInfo.bio}
                    onChange={(e) => handleInputChange("bio", e.target.value)}
                    className="text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded px-3 py-2 w-full h-20 resize-none"
                    placeholder="Tell us about yourself..."
                  />
                </div>
              ) : (
                <div>
                  <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                    {userInfo.name || "Username"}
                  </h1>
                  <p className="text-gray-600 dark:text-gray-300 mb-2">
                    {userInfo.email}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 mb-3">
                    {userInfo.location || "Add your location"}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    {userInfo.bio || "Tell us about yourself..."}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Member since: {formatJoinDate(userInfo.joinDate)}
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 mt-6 justify-center md:justify-start">
                {isEditing ? (
                  <>
                    <button
                      onClick={handleSave}
                      className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-200"
                    >
                      <FaSave /> Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-200"
                    >
                      <FaTimes /> Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleEdit}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
                  >
                    <FaEdit /> Edit Profile
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards — real-time data from Firestore */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
            <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              {tripsPlanned}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">Trips Planned</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
            <h3 className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">
              ₹{totalExpenses.toLocaleString("en-IN", { minimumFractionDigits: 0, maximumFractionDigits: 2 })}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">Total Expenses</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
            <h3 className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-2">
              {visitedPlaces.length}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Places Visited
            </p>
          </div>
        </div>

        {visitedPlaces.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
             <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              My Travel Log
            </h2>
            <div className="space-y-4">
              {visitedPlaces.map((place, index) => (
                <div key={index} className="border-b dark:border-gray-700 pb-4 last:border-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-lg dark:text-white">{place.name}</h4>
                      <div className="text-yellow-400 text-sm mb-1">
                        {"★".repeat(place.review.rating)}
                        <span className="text-gray-300">{"★".repeat(5 - place.review.rating)}</span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">"{place.review.comment}"</p>
                    </div>
                    {place.review.visitAgain && (
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full dark:bg-green-900 dark:text-green-200">
                        Wants to visit again
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recent Activity — real-time from Firestore */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
            Recent Activity
          </h2>
          <div className="space-y-3">
            {loadingActivities ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                <span className="ml-3 text-gray-500 dark:text-gray-400">Loading activities...</span>
              </div>
            ) : recentActivities.length === 0 ? (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <p className="text-lg mb-1">No recent activity yet</p>
                <p className="text-sm">Start planning trips, adding expenses, or using the AI assistant to see your activity here!</p>
              </div>
            ) : (
              recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div
                    className={`w-2 h-2 rounded-full ${
                      activityTypeColors[activity.type] || "bg-gray-500"
                    }`}
                  ></div>
                  <span className="text-gray-700 dark:text-gray-300 flex-1">
                    {activity.description}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400 ml-auto whitespace-nowrap">
                    {formatRelativeTime(activity.createdAt)}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Logout Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
            Account Actions
          </h2>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
