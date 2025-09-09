import React, { useState, useEffect } from "react";
import "./ActivityPlanner.css";

// --- Mock API ---
// In a real app, these functions would make network requests to your backend.
const mockApi = {
  getActivities: async (destination) => {
    console.log(`Fetching activities for ${destination}...`);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
    // In a real app, you might return different activities based on the destination.
    return [
      { id: 1, text: "Visit the Eiffel Tower" },
      { id: 2, text: "Explore the Louvre Museum" },
    ];
  },
  addActivity: async (activity) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { ...activity, id: Date.now() }; // Simulate DB assigning an ID
  },
  updateActivity: async (activity) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return activity;
  },
  deleteActivity: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { id };
  },
};
// --- End Mock API ---

// A simple SVG spinner component for a professional loading state
const Spinner = () => (
  <svg className="animate-spin h-8 w-8 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

// --- Hardcoded Data for Inspiration Cards ---
const inspirationPlaces = [
  {
    id: 'india-1',
    name: 'Jaipur',
    location: 'India',
    imageUrl: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80'
  },
  {
    id: 'global-1',
    name: 'Kyoto',
    location: 'Japan',
    imageUrl: 'https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
  },
  {
    id: 'india-2',
    name: 'Kerala',
    location: 'India',
    imageUrl: 'https://images.unsplash.com/photo-1593693411515-c20261bcad6e?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8a2VyYWxhfGVufDB8fDB8fHww'
  },
  {
    id: 'global-2',
    name: 'Santorini',
    location: 'Greece',
    imageUrl: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
  },
  {
    id: 'global-3',
    name: 'Paris',
    location: 'France',
    imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760c0337?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
  },
  {
    id: 'india-3',
    name: 'Goa',
    location: 'India',
    imageUrl: 'https://images.unsplash.com/photo-1560179406-1f6234b5a493?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
  },
  {
    id: 'global-4',
    name: 'Rome',
    location: 'Italy',
    imageUrl: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1096&q=80'
  },
  {
    id: 'india-4',
    name: 'Ladakh',
    location: 'India',
    imageUrl: 'https://images.unsplash.com/photo-1581793745862-95329351821a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
  }
];

// A beautiful card component for the inspiration section
const PlaceCard = ({ name, location, imageUrl, onSelect }) => (
  <div onClick={() => onSelect(name)} className="relative rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition-all duration-300 cursor-pointer group w-full h-full">
    <img src={imageUrl} alt={name} className="w-full h-48 object-cover" />
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
    <div className="absolute bottom-0 left-0 p-4">
      <h3 className="text-white font-bold text-lg">{name}</h3>
      <p className="text-gray-300 text-sm">{location}</p>
    </div>
  </div>
);

function ActivityPlanner() {
  const [destination, setDestination] = useState("");
  const [activity, setActivity] = useState("");
  const [activities, setActivities] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch initial data when the component mounts
    const fetchActivities = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const fetchedActivities = await mockApi.getActivities(destination || "your destination");
        setActivities(fetchedActivities);
      } catch (err) {
        setError("Failed to fetch activities. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchActivities();
  }, [destination]); // Re-fetch if destination changes

  const handleAddActivity = async (e) => {
    e.preventDefault(); // Prevent form from reloading the page
    if (activity.trim() === "") return;

    const newActivity = { text: activity.trim() };
    const addedActivity = await mockApi.addActivity(newActivity);
    setActivities([...activities, addedActivity]);
    setActivity(""); // Clear input after adding
  };

  const handleDelete = async (id) => {
    await mockApi.deleteActivity(id);
    setActivities(activities.filter((a) => a.id !== id));
  };

  const handleEdit = (id, text) => {
    setEditId(id);
    setEditValue(text);
  };

  const handleEditSave = async (id) => {
    const updatedActivity = { id, text: editValue };
    await mockApi.updateActivity(updatedActivity);
    setActivities(activities.map((a) => (a.id === id ? updatedActivity : a)));
    setEditId(null);
    setEditValue("");
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setEditValue("");
  };

  return (
    // This outer div creates the beautiful background for the whole page
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen font-sans p-4 sm:p-8">
      <div className="max-w-3xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl shadow-blue-200/50 overflow-hidden">
        <header className="p-6 sm:p-8 border-b border-gray-200 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 tracking-tight">
            Activity Planner
          </h1>
          <p className="mt-2 text-md text-gray-500">
            Plan your next adventure, one activity at a time.
          </p>
        </header>

        {/* --- Inspiration Section --- */}
        <section className="p-6 sm:p-8 border-b border-gray-200">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-700 mb-4">Get Inspired</h2>
          <div className="scroller w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
            <div className="flex gap-4">
              {/* We render the list twice for a seamless loop */}
              <div className="flex min-w-full shrink-0 items-center justify-around gap-4 animate-scroll-x">
                {inspirationPlaces.map(place => (
                  <div className="w-64 h-48 flex-shrink-0" key={place.id}>
                    <PlaceCard {...place} onSelect={setDestination} />
                  </div>
                ))}
              </div>
              <div aria-hidden="true" className="flex min-w-full shrink-0 items-center justify-around gap-4 animate-scroll-x">
                {inspirationPlaces.map(place => (
                  <div className="w-64 h-48 flex-shrink-0" key={`${place.id}-clone`}>
                    <PlaceCard {...place} onSelect={setDestination} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="p-6 sm:p-8 space-y-6">
          <div className="destination-input">
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Enter your destination (e.g., Paris)"
              className="w-full px-4 py-3 bg-white/50 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300 placeholder-gray-400 text-gray-700"
            />
          </div>
          <form className="flex gap-3" onSubmit={handleAddActivity}>
            <input
              type="text"
              value={activity}
              onChange={(e) => setActivity(e.target.value)}
              placeholder="Add a new activity..."
              className="flex-grow px-4 py-3 bg-white/50 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300 placeholder-gray-400 text-gray-700"
            />
            <button 
              type="submit"
              className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75 transition-all duration-300 transform hover:scale-105"
            >
              Add
            </button>
          </form>
        </div>

        <main className="px-6 sm:px-8 pb-6 sm:pb-8">
          {isLoading && (
            <div className="flex justify-center items-center p-16">
              <Spinner />
            </div>
          )}
          {error && <p className="text-center py-12 text-red-500 font-medium">{error}</p>}
          {!isLoading && !error && (
            <ul className="space-y-4">
              {activities.length === 0 && (
                <li className="text-center py-12 text-gray-500 italic">
                  No activities yet. Let's plan something amazing!
                </li>
              )}
              {activities.map(({ id, text }) => (
                <li 
                  key={id} 
                  className="bg-white/90 p-4 rounded-lg shadow-md flex items-center transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
                >
                  {editId === id ? (
                    <div className="flex w-full items-center gap-3">
                      <input
                        type="text"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        autoFocus
                        className="flex-grow px-3 py-2 bg-white rounded-md border border-indigo-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300 text-gray-700"
                      />
                      <div className="flex-shrink-0 flex gap-2">
                        <button className="px-4 py-2 bg-emerald-500 text-white font-semibold rounded-md hover:bg-emerald-600 transition-colors duration-200" onClick={() => handleEditSave(id)}>Save</button>
                        <button className="px-4 py-2 bg-gray-400 text-white font-semibold rounded-md hover:bg-gray-500 transition-colors duration-200" onClick={handleCancelEdit}>Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex w-full items-center gap-3">
                      <span className="flex-grow text-gray-800 text-lg">{text}</span>
                      <div className="flex-shrink-0 flex gap-2">
                        <button className="px-4 py-2 bg-blue-100 text-blue-800 font-semibold rounded-md hover:bg-blue-200 transition-colors duration-200" onClick={() => handleEdit(id, text)}>Edit</button>
                        <button className="px-4 py-2 bg-red-100 text-red-800 font-semibold rounded-md hover:bg-red-200 transition-colors duration-200" onClick={() => handleDelete(id)}>Delete</button>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </main>
      </div>
    </div>
  );
}

export default ActivityPlanner;