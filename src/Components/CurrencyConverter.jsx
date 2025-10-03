import { useState, useEffect } from "react";

export default function CurrencyConverter() {
  const [fromCurrency, setFromCurrency] = useState("EUR");
  const [toCurrency, setToCurrency] = useState("USD");
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const currencies = [
    { code: "USD", name: "United States Dollar" },
    { code: "EUR", name: "Euro" },
    { code: "INR", name: "Indian Rupee" },
    { code: "GBP", name: "British Pound" },
    { code: "JPY", name: "Japanese Yen" },
    { code: "AUD", name: "Australian Dollar" },
    { code: "CAD", name: "Canadian Dollar" },
  ];

  // Dark mode
  const [darkMode, setDarkMode] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  useEffect(() => {
    const html = document.documentElement;
    if (darkMode) html.classList.add("dark");
    else html.classList.remove("dark");
  }, [darkMode]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e) => setDarkMode(e.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Convert currency using API
  useEffect(() => {
    const convert = async () => {
      if (!amount || Number(amount) <= 0) {
        setResult("");
        setError(null);
        return;
      }

      if (fromCurrency === toCurrency) {
        setResult(Number(amount).toFixed(2));
        setError(null);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
        );

        if (!res.ok) throw new Error(`API error: ${res.status}`);

        const data = await res.json();

        if (data.rates && data.rates[toCurrency] !== undefined && typeof data.rates[toCurrency] === "number") {
          setResult((Number(amount) * data.rates[toCurrency]).toFixed(2));
        } else {
          setError("Conversion failed.");
          setResult("");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch conversion rate.");
        setResult("");
      } finally {
        setLoading(false);
      }
    };

    convert();
  }, [amount, fromCurrency, toCurrency]);

  return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-6 transition-colors duration-300 pt-24 pb-24 -mt-20">
            <div className="flex flex-col lg:flex-row gap-8 w-full max-w-6xl">
        {/* Converter Card */}
        <div className="flex-1 rounded-3xl shadow-lg p-8 flex flex-col gap-6 bg-indigo-500 dark:bg-indigo-900 text-white transition-colors duration-300">
          <h2 className="text-3xl font-bold text-center">Currency Converter</h2>

          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="w-full px-5 py-4 rounded-full focus:outline-none focus:ring-2 bg-gray-200 text-gray-900 border border-gray-300 focus:ring-indigo-200 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-indigo-400 transition-colors duration-300"
          />

          <input
            type="text"
            value={loading ? "Converting..." : result}
            readOnly
            placeholder="Converted amount"
            className="w-full px-5 py-4 rounded-full focus:outline-none bg-gray-200 text-gray-900 border border-gray-300 dark:bg-gray-700 dark:text-white dark:border-gray-600 transition-colors duration-300"
          />

          <div className="flex justify-between items-center mt-2">
            <button
              className="flex-1 mr-2 px-5 py-3 rounded-full font-semibold bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
              onClick={() => {
                const nextIndex =
                  (currencies.findIndex((c) => c.code === fromCurrency) + 1) %
                  currencies.length;
                setFromCurrency(currencies[nextIndex].code);
              }}
            >
              {fromCurrency}
            </button>

            <button
              className="px-4 py-3 rounded-full font-bold bg-gray-400 text-gray-900 dark:bg-gray-600 dark:text-white hover:bg-gray-500 dark:hover:bg-gray-500 transition-colors duration-200"
              onClick={() => {
                const temp = fromCurrency;
                setFromCurrency(toCurrency);
                setToCurrency(temp);
              }}
            >
              ⇆
            </button>

            <button
              className="flex-1 ml-2 px-5 py-3 rounded-full font-semibold bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
              onClick={() => {
                const nextIndex =
                  (currencies.findIndex((c) => c.code === toCurrency) + 1) %
                  currencies.length;
                setToCurrency(currencies[nextIndex].code);
              }}
            >
              {toCurrency}
            </button>
          </div>

          {error && <p className="text-red-400 text-center mt-2">{error}</p>}
        </div>

        {/* Currency Details */}
        <div className="flex-1 rounded-3xl shadow-lg p-8 bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white transition-colors duration-300">
          <h3 className="text-2xl font-bold mb-4 text-center">Currency Details</h3>
          <ul className="space-y-2 max-h-[400px] overflow-y-auto">
            {currencies.map((c) => (
              <li
                key={c.code}
                className="flex justify-between px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded-lg transition-colors duration-300"
              >
                <span className="font-semibold">{c.code}</span>
                <span>{c.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}