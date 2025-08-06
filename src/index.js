import data from "./data"; // Update the path if needed
import Card from "./Card"; // Assume you have a card component
import "./TripRecommender.css";

const themes = [
  "Historical Place",
  "Spiritual Trip",
  "Adventure Trip",
  "Family-friendly",
  "Solo Travel",
  "Budget Travel",
];

const Index = () => {
  return (
    <div className="theme-container">
      <h1 className="heading">Explore Theme-Based Trips</h1>
      
      {themes.map((theme) => {
        const filteredTrips = data.filter((trip) =>
          trip.themeTags.includes(theme)
        );

        if (filteredTrips.length === 0) return null;

        return (
          <div key={theme} className="theme-section">
            <h2 className="theme-title">{theme}</h2>
            <div className="trip-grid">
              {filteredTrips.map((trip) => (
                <Card key={trip.id} trip={trip} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Index;
