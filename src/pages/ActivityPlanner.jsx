import React, { useState, useEffect } from "react";
import "./ActivityPlanner.css";

function ActivityPlanner() {
  const [destination, setDestination] = useState("");
  const [activity, setActivity] = useState("");
  const [category, setCategory] = useState("General");
  const [date, setDate] = useState("");
  const [activities, setActivities] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [sortBy, setSortBy] = useState("date");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("activities")) || [];
    setActivities(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem("activities", JSON.stringify(activities));
  }, [activities]);

  // Filter and sort activities
  const filteredActivities = activities
    .filter(activity => {
      const matchesSearch = activity.text.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filterCategory === "All" || activity.category === filterCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "date":
          return new Date(a.date) - new Date(b.date);
        case "category":
          return a.category.localeCompare(b.category);
        case "completed":
          return a.completed === b.completed ? 0 : a.completed ? 1 : -1;
        default:
          return 0;
      }
    });

  const handleAddActivity = () => {
    if (activity.trim() === "") return;
    setActivities([
      ...activities,
      {
        id: Date.now(),
        text: activity,
        category,
        date,
        completed: false,
        createdAt: new Date().toISOString(),
      },
    ]);
    setActivity("");
    setCategory("General");
    setDate("");
  };

  const handleDelete = (id) => {
    setActivities(activities.filter((a) => a.id !== id));
  };

  const handleDeleteAll = () => {
    if (window.confirm("Are you sure you want to delete all activities?")) {
      setActivities([]);
    }
  };

  const handleDeleteCompleted = () => {
    if (window.confirm("Are you sure you want to delete all completed activities?")) {
      setActivities(activities.filter((a) => !a.completed));
    }
  };

  const handleEdit = (id, text) => {
    setEditId(id);
    setEditValue(text);
  };

  const handleEditSave = (id) => {
    setActivities(
      activities.map((a) =>
        a.id === id ? { ...a, text: editValue } : a
      )
    );
    setEditId(null);
    setEditValue("");
  };

  const toggleCompleted = (id) => {
    setActivities(
      activities.map((a) =>
        a.id === id ? { ...a, completed: !a.completed } : a
      )
    );
  };

  const markAllCompleted = () => {
    setActivities(activities.map(activity => ({ ...activity, completed: true })));
  };

  const markAllIncomplete = () => {
    setActivities(activities.map(activity => ({ ...activity, completed: false })));
  };

  const categories = ["All", "General", "Adventure", "Food", "Shopping", "Relaxation"];

  return (
    <div className="activity-planner-container">
      <header className="planner-header">
        <h2 className="title">Activity Planner</h2>
        <p className="subtitle">Plan your perfect trip activities</p>
      </header>

      {/* Destination */}
      <div className="destination-input card">
        <label className="input-label">
          <span className="label-text">🌍 Dream Destination</span>
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Where are you heading?"
            className="input-field"
          />
        </label>
      </div>

      {/* Add Activity Form */}
      <div className="add-activity card">
        <div className="form-grid">
          <div className="input-group">
            <label className="input-label">Activity</label>
            <input
              type="text"
              value={activity}
              onChange={(e) => setActivity(e.target.value)}
              placeholder="What do you want to do?"
              className="input-field"
              onKeyPress={(e) => e.key === 'Enter' && handleAddActivity()}
            />
          </div>
          
          <div className="input-group">
            <label className="input-label">Category</label>
            <select 
              value={category} 
              onChange={(e) => setCategory(e.target.value)}
              className="input-field"
            >
              <option value="General">General</option>
              <option value="Adventure">Adventure</option>
              <option value="Food">Food</option>
              <option value="Shopping">Shopping</option>
              <option value="Relaxation">Relaxation</option>
            </select>
          </div>

          <div className="input-group">
            <label className="input-label">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="input-field"
            />
          </div>

          <button className="btn btn-primary btn-add" onClick={handleAddActivity}>
            ➕ Add Activity
          </button>
        </div>
      </div>

      {/* Search and Filter Controls */}
      <div className="controls-card card">
        <div className="controls-grid">
          <div className="input-group">
            <label className="input-label">🔍 Search Activities</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search activities..."
              className="input-field"
            />
          </div>

          <div className="input-group">
            <label className="input-label">Filter by Category</label>
            <select 
              value={filterCategory} 
              onChange={(e) => setFilterCategory(e.target.value)}
              className="input-field"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="input-group">
            <label className="input-label">Sort by</label>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="input-field"
            >
              <option value="date">Date</option>
              <option value="category">Category</option>
              <option value="completed">Completion Status</option>
            </select>
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      {activities.length > 0 && (
        <div className="bulk-actions card">
          <div className="bulk-actions-grid">
            <button className="btn btn-secondary" onClick={markAllCompleted}>
              ✅ Mark All Complete
            </button>
            <button className="btn btn-secondary" onClick={markAllIncomplete}>
              🔄 Mark All Incomplete
            </button>
            <button className="btn btn-danger" onClick={handleDeleteCompleted}>
              🗑️ Delete Completed
            </button>
            <button className="btn btn-danger" onClick={handleDeleteAll}>
              💥 Delete All
            </button>
          </div>
          <div className="stats">
            <span>Total: {activities.length}</span>
            <span>Completed: {activities.filter(a => a.completed).length}</span>
            <span>Pending: {activities.filter(a => !a.completed).length}</span>
          </div>
        </div>
      )}

      {/* Activities List */}
      <div className="activities-section">
        <h3 className="section-title">
          Activities ({filteredActivities.length})
          {searchTerm && ` for "${searchTerm}"`}
          {filterCategory !== "All" && ` in ${filterCategory}`}
        </h3>
        
        {filteredActivities.length === 0 ? (
          <div className="empty-state card">
            <p>No activities found. {searchTerm || filterCategory !== "All" ? "Try adjusting your search or filters." : "Start by adding some activities!"}</p>
          </div>
        ) : (
          <ul className="activity-list">
            {filteredActivities.map(({ id, text, category, date, completed }) => (
              <li
                key={id}
                className={`activity-card card ${completed ? "completed" : ""}`}
              >
                {editId === id ? (
                  <div className="edit-mode">
                    <input
                      type="text"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="edit-input"
                      onKeyPress={(e) => e.key === 'Enter' && handleEditSave(id)}
                    />
                    <div className="edit-actions">
                      <button className="btn btn-success btn-save" onClick={() => handleEditSave(id)}>
                        💾 Save
                      </button>
                      <button className="btn btn-cancel" onClick={() => setEditId(null)}>
                        ❌ Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="activity-content">
                    <div className="activity-main">
                      <div className="activity-header">
                        <span className="activity-text">{text}</span>
                        <span className={`category-badge ${category.toLowerCase()}`}>
                          {category}
                        </span>
                      </div>
                      {date && (
                        <div className="activity-meta">
                          <span className="activity-date">📅 {new Date(date).toLocaleDateString()}</span>
                        </div>
                      )}
                    </div>

                    <div className="activity-actions">
                      <button
                        className="btn btn-icon"
                        onClick={() => handleEdit(id, text)}
                        title="Edit"
                      >
                        ✏️
                      </button>
                      <button
                        className="btn btn-icon btn-danger"
                        onClick={() => handleDelete(id)}
                        title="Delete"
                      >
                        🗑️
                      </button>
                      <button
                        className={`btn btn-icon ${completed ? "btn-warning" : "btn-success"}`}
                        onClick={() => toggleCompleted(id)}
                        title={completed ? "Mark as incomplete" : "Mark as complete"}
                      >
                        {completed ? "↩️" : "✅"}
                      </button>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default ActivityPlanner;