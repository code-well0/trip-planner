import React, { useEffect, useState } from "react";
import Loader from "./components/Loader";
import SkeletonCard from "./components/SkeletonCard";
import TripCard from "../components/TripCard"; // already existing component

const TripsList = () => {
  const [loading, setLoading] = useState(true);
  const [trips, setTrips] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchTrips() {
      setLoading(true);
      setError("");
      try {
        const res = await fetch("/api/trips"); // <-- adjust endpoint
        if (!res.ok) throw new Error("Network error");
        const data = await res.json();
        setTrips(data);
      } catch (err) {
        setError("Failed to load trips");
      } finally {
        setLoading(false);
      }
    }
    fetchTrips();
  }, []);

  if (loading) {
    return (
      <div>
        <Loader size={60} />
        <SkeletonCard lines={4} />
        <SkeletonCard lines={4} />
      </div>
    );
  }

  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      {trips.map((trip) => (
        <TripCard key={trip.id} trip={trip} />
      ))}
    </div>
  );
};

export default TripsList;
