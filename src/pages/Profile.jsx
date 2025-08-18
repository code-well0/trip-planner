import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaSignOutAlt, FaEdit, FaSave, FaTimes } from 'react-icons/fa';

const Profile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: 'Travel Enthusiast',
    email: 'user@example.com',
    location: 'New York, USA',
    bio: 'Love exploring new places and creating memories!',
    joinDate: 'January 2024'
  });
  const [editInfo, setEditInfo] = useState({ ...userInfo });

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    window.location.reload();
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditInfo({ ...userInfo });
  };

  const handleSave = () => {
    setUserInfo({ ...editInfo });
    setIsEditing(false);
    // Here you would typically save to a database
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditInfo({ ...userInfo });
  };

  const handleInputChange = (field, value) => {
    setEditInfo({ ...editInfo, [field]: value });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Profile Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Profile Picture */}
            <div className="relative">
              <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-4xl">
                <FaUser />
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left">
              {isEditing ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={editInfo.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="text-2xl font-bold bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded px-3 py-2 w-full text-gray-800 dark:text-white"
                    placeholder="Your Name"
                  />
                  <input
                    type="email"
                    value={editInfo.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded px-3 py-2 w-full"
                    placeholder="Your Email"
                  />
                  <input
                    type="text"
                    value={editInfo.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded px-3 py-2 w-full"
                    placeholder="Your Location"
                  />
                  <textarea
                    value={editInfo.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    className="text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded px-3 py-2 w-full h-20 resize-none"
                    placeholder="Tell us about yourself..."
                  />
                </div>
              ) : (
                <div>
                  <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                    {userInfo.name}
                  </h1>
                  <p className="text-gray-600 dark:text-gray-300 mb-2">{userInfo.email}</p>
                  <p className="text-gray-600 dark:text-gray-300 mb-3">{userInfo.location}</p>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">{userInfo.bio}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Member since {userInfo.joinDate}
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

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
            <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">12</h3>
            <p className="text-gray-600 dark:text-gray-300">Trips Planned</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
            <h3 className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">$2,450</h3>
            <p className="text-gray-600 dark:text-gray-300">Total Expenses</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
            <h3 className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-2">8</h3>
            <p className="text-gray-600 dark:text-gray-300">Countries Visited</p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Recent Activity</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-gray-700 dark:text-gray-300">Planned a trip to Paris</span>
              <span className="text-sm text-gray-500 dark:text-gray-400 ml-auto">2 days ago</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-gray-700 dark:text-gray-300">Added expense for Tokyo trip</span>
              <span className="text-sm text-gray-500 dark:text-gray-400 ml-auto">5 days ago</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-gray-700 dark:text-gray-300">Used AI assistant for recommendations</span>
              <span className="text-sm text-gray-500 dark:text-gray-400 ml-auto">1 week ago</span>
            </div>
          </div>
        </div>

        {/* Logout Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Account Actions</h2>
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
