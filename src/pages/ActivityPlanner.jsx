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

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("activities")) || [];
    setActivities(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem("activities", JSON.stringify(activities));
  }, [activities]);

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
      },
    ]);
    setActivity("");
    setCategory("General");
    setDate("");
  };

  const handleDelete = (id) => {
    setActivities(activities.filter((a) => a.id !== id));
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

  return (
    <div className="activity-planner-container">
      <h2 className="title"> Activity Planner </h2>

      {/* Destination */}
      <div className="destination-input card">
        <label>
          <span>Dream Destination   </span>
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Where are you heading?"
          />
        </label>
      </div>

      {/* Add Activity */}
      <div className="add-activity card">
        <input
          type="text"
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
          placeholder="Add a new activity..."
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option>General</option>
          <option>Adventure</option>
          <option>Food</option>
          <option>Shopping</option>
          <option>Relaxation</option>
        </select>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <button className="btn-add" onClick={handleAddActivity}>
          ➕ Add
        </button>
      </div>

      {/* Activities List */}
      <ul className="activity-list">
        {activities.map(({ id, text, category, date, completed }) => (
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
                />
                <button className="btn-save" onClick={() => handleEditSave(id)}>
                  💾 Save
                </button>
                <button
                  className="btn-cancel"
                  onClick={() => setEditId(null)}
                >
                  ❌ Cancel
                </button>
              </div>
            ) : (
              <div className="activity-content">
                <span className="activity-text">{text}</span>
                {date && <span className="activity-date">📅 {date}</span>}
                <span className={`category-badge ${category.toLowerCase()}`}>
                  {category}
                </span>

                <div className="buttons">
                  <button
                    className="btn-edit"
                    onClick={() => handleEdit(id, text)}
                  >
                    ✏️ Edit
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(id)}
                  >
                    🗑️ Delete
                  </button>
                  <button
                    className="btn-done"
                    onClick={() => toggleCompleted(id)}
                  >
                    {completed ? "↩️ Undo" : "✅ Done"}
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ActivityPlanner;

