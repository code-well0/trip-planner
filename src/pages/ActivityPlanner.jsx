import React, { useState } from "react";
import "./ActivityPlanner.css";

function ActivityPlanner() {
  const [destination, setDestination] = useState("");
  const [activity, setActivity] = useState("");
  const [activities, setActivities] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState("");

  const handleAddActivity = () => {
    if (activity.trim() === "") return;
    setActivities([
      ...activities,
      { id: Date.now(), text: activity }
    ]);
    setActivity("");
  };

  const handleDelete = (id) => {
    setActivities(activities.filter(a => a.id !== id));
  };

  const handleEdit = (id, text) => {
    setEditId(id);
    setEditValue(text);
  };

  const handleEditSave = (id) => {
    setActivities(
      activities.map(a => 
        a.id === id ? { ...a, text: editValue } : a
      )
    );
    setEditId(null);
    setEditValue("");
  };

  return (
    <div className="activity-planner-container">
      <h2>Activity Planner</h2>
      <div className="destination-input">
        
          
          <input
            type="text"
            value={destination}
            onChange={e => setDestination(e.target.value)}
            placeholder="Destination"
          />
       
      </div>
      <div className="add-activity">
        <input
          type="text"
          value={activity}
          onChange={e => setActivity(e.target.value)}
          placeholder="Activity"
        />
        <button onClick={handleAddActivity}>Add</button>
      </div>
      <ul className="activity-list">
        {activities.map(({ id, text }) => (
          <li key={id}>
            {editId === id ? (
              <>
                <input
                  type="text"
                  value={editValue}
                  onChange={e => setEditValue(e.target.value)}
                />
                <button onClick={() => handleEditSave(id)}>Save</button>
                <button onClick={() => setEditId(null)}>Cancel</button>
              </>
            ) : (
              <>
                <span>{text}</span>
                <button onClick={() => handleEdit(id, text)}>Edit</button>
                <button onClick={() => handleDelete(id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ActivityPlanner;