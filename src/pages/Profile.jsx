import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';

export default function Profile() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [tripStats, setTripStats] = useState({
    totalTrips: 0,
    upcomingTrips: 0,
    completedTrips: 0,
    totalExpenses: 0,
    favoriteDestination: 'Not set'
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    favoriteDestination: '',
    travelStyle: '',
    budgetRange: ''
  });

  useEffect(() => {
    // Get user data from localStorage
    const storedUserData = localStorage.getItem('userData');
    const storedTripStats = localStorage.getItem('tripStats');
    
    if (!storedUserData) {
      // If no user data, redirect to login
      navigate('/');
      return;
    }

    setUserData(JSON.parse(storedUserData));
    
    if (storedTripStats) {
      setTripStats(JSON.parse(storedTripStats));
    }

    // Initialize edit form with current data
    const user = JSON.parse(storedUserData);
    const stats = storedTripStats ? JSON.parse(storedTripStats) : {};
    setEditForm({
      name: user.name || '',
      email: user.email || '',
      favoriteDestination: stats.favoriteDestination || 'Not set',
      travelStyle: 'Adventure Seeker',
      budgetRange: '₹20,000 - ₹50,000'
    });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('userData');
    localStorage.removeItem('tripStats');
    localStorage.removeItem('isAuthenticated');
    navigate('/');
  };

  const handleEditProfile = () => {
    // If it's a guest user, allow them to update their profile
    if (userData.isGuest === true) {
      const newName = prompt("Enter your name:", userData.name);
      const newEmail = prompt("Enter your email:", userData.email);
      
      if (newName && newEmail) {
        const updatedUserData = {
          ...userData,
          name: newName,
          email: newEmail
        };
        
        localStorage.setItem('userData', JSON.stringify(updatedUserData));
        setUserData(updatedUserData);
        alert("Profile updated successfully!");
      }
    } else {
      // Open edit modal for registered users
      setIsEditing(true);
    }
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    
    // Update user data
    const updatedUserData = {
      ...userData,
      name: editForm.name,
      email: editForm.email
    };
    
    // Update trip stats
    const updatedTripStats = {
      ...tripStats,
      favoriteDestination: editForm.favoriteDestination
    };
    
    // Save to localStorage
    localStorage.setItem('userData', JSON.stringify(updatedUserData));
    localStorage.setItem('tripStats', JSON.stringify(updatedTripStats));
    
    // Update state
    setUserData(updatedUserData);
    setTripStats(updatedTripStats);
    setIsEditing(false);
    
    alert("Profile updated successfully!");
  };

  const handleCancelEdit = () => {
    // Reset form to original values
    setEditForm({
      name: userData.name || '',
      email: userData.email || '',
      favoriteDestination: tripStats.favoriteDestination || 'Not set',
      travelStyle: 'Adventure Seeker',
      budgetRange: '₹20,000 - ₹50,000'
    });
    setIsEditing(false);
  };

  if (!userData) {
    return <div className="loading">Loading profile...</div>;
  }

  // Check if user is a guest
  const isGuest = userData.isGuest === true;

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-avatar">
          <div className="avatar-circle">
            {userData.name.charAt(0).toUpperCase()}
          </div>
        </div>
        <div className="profile-info">
          <h1 className="profile-name">{userData.name}</h1>
          {!isGuest && <p className="profile-email">{userData.email}</p>}
          {!isGuest && <p className="profile-join-date">Member since {userData.joinDate}</p>}
          {isGuest && <p className="profile-email">Guest Account - Sign up to save your data</p>}
        </div>
        <div className="profile-actions">
          {isGuest ? (
            <button 
              className="edit-profile-btn" 
              onClick={() => {
                // Clear guest data and redirect to signup
                localStorage.removeItem('userData');
                localStorage.removeItem('tripStats');
                localStorage.removeItem('isAuthenticated');
                navigate('/');
              }}
            >
              Sign Up Now
            </button>
          ) : (
            <button className="edit-profile-btn" onClick={handleEditProfile}>
              Edit Profile
            </button>
          )}
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      <div className="profile-stats">
        <div className="stat-card">
          <div className="stat-number">{tripStats.totalTrips}</div>
          <div className="stat-label">Total Trips</div>
        </div>
        {!isGuest && (
          <>
            <div className="stat-card">
              <div className="stat-number">{tripStats.upcomingTrips}</div>
              <div className="stat-label">Upcoming Trips</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{tripStats.completedTrips}</div>
              <div className="stat-label">Completed Trips</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">₹{tripStats.totalExpenses.toLocaleString()}</div>
              <div className="stat-label">Total Expenses</div>
            </div>
          </>
        )}
        {isGuest && (
          <div className="stat-card">
            <div className="stat-number">📋</div>
            <div className="stat-label">Sign up to track more stats</div>
          </div>
        )}
      </div>

      <div className="profile-sections">
        {!isGuest && (
          <>
            <div className="profile-section">
              <h3>Travel Preferences</h3>
              <div className="preference-item">
                <span className="preference-label">Favorite Destination:</span>
                <span className="preference-value">{tripStats.favoriteDestination}</span>
              </div>
              <div className="preference-item">
                <span className="preference-label">Travel Style:</span>
                <span className="preference-value">{editForm.travelStyle}</span>
              </div>
              <div className="preference-item">
                <span className="preference-label">Budget Range:</span>
                <span className="preference-value">{editForm.budgetRange}</span>
              </div>
            </div>

            <div className="profile-section">
              <h3>Recent Activity</h3>
              <div className="activity-item">
                <div className="activity-icon">🗺️</div>
                <div className="activity-content">
                  <div className="activity-title">Browsed Goa destinations</div>
                  <div className="activity-time">2 hours ago</div>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-icon">💰</div>
                <div className="activity-content">
                  <div className="activity-title">Added expense: Hotel booking</div>
                  <div className="activity-time">1 day ago</div>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-icon">🤖</div>
                <div className="activity-content">
                  <div className="activity-title">Chatted with travel assistant</div>
                  <div className="activity-time">3 days ago</div>
                </div>
              </div>
            </div>

            <div className="profile-section">
              <h3>Achievement Badges</h3>
              <div className="badges-container">
                <div className="badge">
                  <div className="badge-icon">🎯</div>
                  <div className="badge-name">First Trip</div>
                </div>
                <div className="badge">
                  <div className="badge-icon">💎</div>
                  <div className="badge-name">Budget Master</div>
                </div>
                <div className="badge coming-soon">
                  <div className="badge-icon">🌟</div>
                  <div className="badge-name">Explorer</div>
                </div>
              </div>
            </div>
          </>
        )}
        
        {isGuest && (
          <div className="profile-section">
            <h3>Welcome, Guest!</h3>
            <p style={{ textAlign: "center", color: "#666", fontSize: "16px", lineHeight: "1.6" }}>
              You're browsing as a guest. Sign up to unlock:<br/>
              • Personal trip history<br/>
              • Expense tracking<br/>
              • Travel preferences<br/>
              • Achievement badges<br/>
              • And much more!
            </p>
          </div>
        )}
      </div>

      {/* Edit Profile Modal */}
      {isEditing && (
        <div className="edit-modal-overlay">
          <div className="edit-modal">
            <h3>Edit Profile</h3>
            <form onSubmit={handleSaveProfile}>
              <div className="form-group">
                <label>Name:</label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Favorite Destination:</label>
                <input
                  type="text"
                  value={editForm.favoriteDestination}
                  onChange={(e) => setEditForm({...editForm, favoriteDestination: e.target.value})}
                  placeholder="e.g., Goa, Paris, Tokyo"
                />
              </div>
              
              <div className="form-group">
                <label>Travel Style:</label>
                <select
                  value={editForm.travelStyle}
                  onChange={(e) => setEditForm({...editForm, travelStyle: e.target.value})}
                >
                  <option value="Adventure Seeker">Adventure Seeker</option>
                  <option value="Cultural Explorer">Cultural Explorer</option>
                  <option value="Relaxation Focused">Relaxation Focused</option>
                  <option value="Budget Traveler">Budget Traveler</option>
                  <option value="Luxury Traveler">Luxury Traveler</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Budget Range:</label>
                <select
                  value={editForm.budgetRange}
                  onChange={(e) => setEditForm({...editForm, budgetRange: e.target.value})}
                >
                  <option value="₹10,000 - ₹25,000">₹10,000 - ₹25,000</option>
                  <option value="₹20,000 - ₹50,000">₹20,000 - ₹50,000</option>
                  <option value="₹50,000 - ₹1,00,000">₹50,000 - ₹1,00,000</option>
                  <option value="₹1,00,000+">₹1,00,000+</option>
                </select>
              </div>
              
              <div className="form-actions">
                <button type="submit" className="save-btn">Save Changes</button>
                <button type="button" onClick={handleCancelEdit} className="cancel-btn">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
