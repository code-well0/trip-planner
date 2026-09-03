import { useState, useEffect, useCallback } from 'react';
import { FaPlane, FaSyncAlt } from 'react-icons/fa';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';

const PriceEstimate = ({ destinationName, originCity = 'Delhi' }) => {
  const [estimate, setEstimate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchEstimate = useCallback(async () => {
    if (!destinationName) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${BACKEND_URL}/api/price-estimate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ destination: destinationName, origin: originCity }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to fetch live price');
      setEstimate(data);
    } catch (err) {
      setError(err.message);
      setEstimate(null);
    } finally {
      setLoading(false);
    }
  }, [destinationName, originCity]);

  useEffect(() => {
    fetchEstimate();
  }, [fetchEstimate]);

  return (
    <div className="mt-4 p-4 rounded-xl border border-dashed border-indigo-300 dark:border-indigo-700 bg-indigo-50 dark:bg-indigo-900/20">
      <div className="flex items-center justify-between mb-2">
        <h4 className="flex items-center gap-2 font-semibold text-indigo-700 dark:text-indigo-300">
          <FaPlane /> Live Flight Estimate (2 travelers)
        </h4>
        <button
          onClick={fetchEstimate}
          disabled={loading}
          className="text-indigo-500 hover:text-indigo-700 disabled:opacity-50"
          title="Refresh live price"
          aria-label="Refresh live price"
        >
          <FaSyncAlt className={loading ? 'animate-spin' : ''} />
        </button>
      </div>

      {loading && (
        <p className="text-sm text-gray-500 dark:text-gray-400">Fetching real-time price from Amadeus...</p>
      )}

      {!loading && estimate && (
        <p className="text-sm text-gray-700 dark:text-gray-300">
          Round-trip flights from <b>{estimate.origin}</b>: {estimate.currency} {estimate.totalFlightPrice.toLocaleString()} total
          {' '}({estimate.currency} {estimate.pricePerPerson.toLocaleString()}/person) &bull; depart {estimate.departureDate}
        </p>
      )}

      {!loading && error && (
        <p className="text-sm text-amber-600 dark:text-amber-400">
          Live price unavailable ({error}). Showing the estimated package price above instead.
        </p>
      )}
    </div>
  );
};

export default PriceEstimate;
