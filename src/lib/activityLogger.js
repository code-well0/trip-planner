import { db, auth } from "../firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  setDoc,
  increment,
} from "firebase/firestore";

/**
 * Log a user activity to Firestore for the profile's Recent Activity feed.
 * Also updates aggregate stats on the user's profile document.
 *
 * @param {"trip_planned" | "expense_added" | "ai_chat" | "itinerary_created" | "blog_posted" | "place_visited"} type
 * @param {string} description - Human-readable description e.g. "Planned a trip to Paris"
 * @param {object} [meta] - Optional extra metadata
 */
export const logActivity = async (type, description, meta = {}) => {
  const user = auth.currentUser;
  if (!user) return;

  try {
    const activitiesCol = collection(db, "users", user.uid, "activities");
    await addDoc(activitiesCol, {
      type,
      description,
      meta,
      createdAt: serverTimestamp(),
    });
  } catch (err) {
    console.warn("Failed to log activity:", err);
  }
};

/**
 * Increment a stat counter on the user's profile document.
 * e.g. incrementStat("tripsPlanned", 1)
 *
 * @param {string} field - The Firestore field name on the user doc
 * @param {number} value - The amount to increment by (default 1)
 */
export const incrementStat = async (field, value = 1) => {
  const user = auth.currentUser;
  if (!user) return;

  try {
    const userDocRef = doc(db, "users", user.uid);
    await setDoc(userDocRef, { [field]: increment(value) }, { merge: true });
  } catch (err) {
    console.warn("Failed to increment stat:", err);
  }
};
