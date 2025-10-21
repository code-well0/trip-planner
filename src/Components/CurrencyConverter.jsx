import { useState, useEffect } from "react";

export default function CurrencyConverter() {
  const [fromCurrency, setFromCurrency] = useState("EUR");
  const [toCurrency, setToCurrency] = useState("USD");
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const currencies = [
    { code: "AED", name: "United Arab Emirates Dirham" },
    { code: "AFN", name: "Afghan Afghani" },
    { code: "ALL", name: "Albanian Lek" },
    { code: "AMD", name: "Armenian Dram" },
    { code: "ANG", name: "Netherlands Antillean Guilder" },
    { code: "AOA", name: "Angolan Kwanza" },
    { code: "ARS", name: "Argentine Peso" },
    { code: "AUD", name: "Australian Dollar" },
    { code: "AZN", name: "Azerbaijani Manat" },
    { code: "BAM", name: "Bosnia-Herzegovina Convertible Mark" },
    { code: "BBD", name: "Barbadian Dollar" },
    { code: "BDT", name: "Bangladeshi Taka" },
    { code: "BGN", name: "Bulgarian Lev" },
    { code: "BHD", name: "Bahraini Dinar" },
    { code: "BIF", name: "Burundian Franc" },
    { code: "BMD", name: "Bermudian Dollar" },
    { code: "BND", name: "Brunei Dollar" },
    { code: "BOB", name: "Bolivian Boliviano" },
    { code: "BRL", name: "Brazilian Real" },
    { code: "BSD", name: "Bahamian Dollar" },
    { code: "BTN", name: "Bhutanese Ngultrum" },
    { code: "BWP", name: "Botswana Pula" },
    { code: "BYN", name: "Belarusian Ruble" },
    { code: "CAD", name: "Canadian Dollar" },
    { code: "CDF", name: "Congolese Franc" },
    { code: "CHF", name: "Swiss Franc" },
    { code: "CLP", name: "Chilean Peso" },
    { code: "CNY", name: "Chinese Yuan" },
    { code: "COP", name: "Colombian Peso" },
    { code: "CRC", name: "Costa Rican Colón" },
    { code: "CUP", name: "Cuban Peso" },
    { code: "CVE", name: "Cape Verdean Escudo" },
    { code: "CZK", name: "Czech Koruna" },
    { code: "DJF", name: "Djiboutian Franc" },
    { code: "DKK", name: "Danish Krone" },
    { code: "DOP", name: "Dominican Peso" },
    { code: "DZD", name: "Algerian Dinar" },
    { code: "EGP", name: "Egyptian Pound" },
    { code: "ERN", name: "Eritrean Nakfa" },
    { code: "ETB", name: "Ethiopian Birr" },
    { code: "EUR", name: "Euro" },
    { code: "FJD", name: "Fijian Dollar" },
    { code: "FKP", name: "Falkland Islands Pound" },
    { code: "FOK", name: "Faroese Króna" },
    { code: "GBP", name: "British Pound" },
    { code: "GEL", name: "Georgian Lari" },
    { code: "GGP", name: "Guernsey Pound" },
    { code: "GHS", name: "Ghanaian Cedi" },
    { code: "GIP", name: "Gibraltar Pound" },
    { code: "GMD", name: "Gambian Dalasi" },
    { code: "GNF", name: "Guinean Franc" },
    { code: "GTQ", name: "Guatemalan Quetzal" },
    { code: "GYD", name: "Guyanese Dollar" },
    { code: "HKD", name: "Hong Kong Dollar" },
    { code: "HNL", name: "Honduran Lempira" },
    { code: "HRK", name: "Croatian Kuna" },
    { code: "HTG", name: "Haitian Gourde" },
    { code: "HUF", name: "Hungarian Forint" },
    { code: "IDR", name: "Indonesian Rupiah" },
    { code: "ILS", name: "Israeli New Shekel" },
    { code: "IMP", name: "Isle of Man Pound" },
    { code: "INR", name: "Indian Rupee" },
    { code: "IQD", name: "Iraqi Dinar" },
    { code: "IRR", name: "Iranian Rial" },
    { code: "ISK", name: "Icelandic Króna" },
    { code: "JEP", name: "Jersey Pound" },
    { code: "JMD", name: "Jamaican Dollar" },
    { code: "JOD", name: "Jordanian Dinar" },
    { code: "JPY", name: "Japanese Yen" },
    { code: "KES", name: "Kenyan Shilling" },
    { code: "KGS", name: "Kyrgyzstani Som" },
    { code: "KHR", name: "Cambodian Riel" },
    { code: "KID", name: "Kiribati Dollar" },
    { code: "KMF", name: "Comorian Franc" },
    { code: "KRW", name: "South Korean Won" },
    { code: "KWD", name: "Kuwaiti Dinar" },
    { code: "KYD", name: "Cayman Islands Dollar" },
    { code: "KZT", name: "Kazakhstani Tenge" },
    { code: "LAK", name: "Lao Kip" },
    { code: "LBP", name: "Lebanese Pound" },
    { code: "LKR", name: "Sri Lankan Rupee" },
    { code: "LRD", name: "Liberian Dollar" },
    { code: "LSL", name: "Lesotho Loti" },
    { code: "LYD", name: "Libyan Dinar" },
    { code: "MAD", name: "Moroccan Dirham" },
    { code: "MDL", name: "Moldovan Leu" },
    { code: "MGA", name: "Malagasy Ariary" },
    { code: "MKD", name: "Macedonian Denar" },
    { code: "MMK", name: "Myanmar Kyat" },
    { code: "MNT", name: "Mongolian Tögrög" },
    { code: "MOP", name: "Macanese Pataca" },
    { code: "MRU", name: "Mauritanian Ouguiya" },
    { code: "MUR", name: "Mauritian Rupee" },
    { code: "MVR", name: "Maldivian Rufiyaa" },
    { code: "MWK", name: "Malawian Kwacha" },
    { code: "MXN", name: "Mexican Peso" },
    { code: "MYR", name: "Malaysian Ringgit" },
    { code: "MZN", name: "Mozambican Metical" },
    { code: "NAD", name: "Namibian Dollar" },
    { code: "NGN", name: "Nigerian Naira" },
    { code: "NIO", name: "Nicaraguan Córdoba" },
    { code: "NOK", name: "Norwegian Krone" },
    { code: "NPR", name: "Nepalese Rupee" },
    { code: "NZD", name: "New Zealand Dollar" },
    { code: "OMR", name: "Omani Rial" },
    { code: "PAB", name: "Panamanian Balboa" },
    { code: "PEN", name: "Peruvian Sol" },
    { code: "PGK", name: "Papua New Guinean Kina" },
    { code: "PHP", name: "Philippine Peso" },
    { code: "PKR", name: "Pakistani Rupee" },
    { code: "PLN", name: "Polish Złoty" },
    { code: "PYG", name: "Paraguayan Guarani" },
    { code: "QAR", name: "Qatari Riyal" },
    { code: "RON", name: "Romanian Leu" },
    { code: "RSD", name: "Serbian Dinar" },
    { code: "RUB", name: "Russian Ruble" },
    { code: "RWF", name: "Rwandan Franc" },
    { code: "SAR", name: "Saudi Riyal" },
    { code: "SBD", name: "Solomon Islands Dollar" },
    { code: "SCR", name: "Seychellois Rupee" },
    { code: "SDG", name: "Sudanese Pound" },
    { code: "SEK", name: "Swedish Krona" },
    { code: "SGD", name: "Singapore Dollar" },
    { code: "SHP", name: "Saint Helena Pound" },
    { code: "SLE", name: "Sierra Leonean Leone" },
    { code: "SOS", name: "Somali Shilling" },
    { code: "SRD", name: "Surinamese Dollar" },
    { code: "SSP", name: "South Sudanese Pound" },
    { code: "STN", name: "São Tomé and Príncipe Dobra" },
    { code: "SYP", name: "Syrian Pound" },
    { code: "SZL", name: "Swazi Lilangeni" },
    { code: "THB", name: "Thai Baht" },
    { code: "TJS", name: "Tajikistani Somoni" },
    { code: "TMT", name: "Turkmenistani Manat" },
    { code: "TND", name: "Tunisian Dinar" },
    { code: "TOP", name: "Tongan Paʻanga" },
    { code: "TRY", name: "Turkish Lira" },
    { code: "TTD", name: "Trinidad and Tobago Dollar" },
    { code: "TVD", name: "Tuvaluan Dollar" },
    { code: "TWD", name: "New Taiwan Dollar" },
    { code: "TZS", name: "Tanzanian Shilling" },
    { code: "UAH", name: "Ukrainian Hryvnia" },
    { code: "UGX", name: "Ugandan Shilling" },
    { code: "USD", name: "United States Dollar" },
    { code: "UYU", name: "Uruguayan Peso" },
    { code: "UZS", name: "Uzbekistani Som" },
    { code: "VES", name: "Venezuelan Bolívar" },
    { code: "VND", name: "Vietnamese Đồng" },
    { code: "VUV", name: "Vanuatu Vatu" },
    { code: "WST", name: "Samoan Tala" },
    { code: "XAF", name: "Central African CFA Franc" },
    { code: "XCD", name: "East Caribbean Dollar" },
    { code: "XOF", name: "West African CFA Franc" },
    { code: "XPF", name: "CFP Franc" },
    { code: "YER", name: "Yemeni Rial" },
    { code: "ZAR", name: "South African Rand" },
    { code: "ZMW", name: "Zambian Kwacha" },
    { code: "ZWL", name: "Zimbabwean Dollar" },
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

        if (
          data.rates &&
          data.rates[toCurrency] !== undefined &&
          typeof data.rates[toCurrency] === "number"
        ) {
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
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100">
            Currency Converter
          </h2>

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
            <div className="flex flex-col flex-1 mr-2 mt-10">
              <span className="text-sm font-medium mb-1 text-center text-gray-900 dark:text-gray-300">
                From
              </span>
              <select
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
                className="flex-1 mr-2 px-5 py-3 rounded-full font-semibold bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200 text-center"
              >
                {currencies.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.code}
                  </option>
                ))}
              </select>
            </div>

            <button
              className="px-4 py-3 rounded-full font-bold bg-gray-400 text-gray-900 dark:bg-gray-600 dark:text-white hover:bg-gray-500 dark:hover:bg-gray-500 transition-colors duration-200 mt-10"
              style={{ marginTop: "3.5rem" }}
              onClick={() => {
                const temp = fromCurrency;
                setFromCurrency(toCurrency);
                setToCurrency(temp);
              }}
            >
              ⇆
            </button>

            <div className="flex flex-col flex-1 mr-2 mt-10">
              <span className="text-sm font-medium mb-1 text-center text-gray-900 dark:text-gray-300">
                To
              </span>
              <select
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
                className="flex-1 ml-2 px-5 py-3 rounded-full font-semibold bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200 text-center"
              >
                {currencies.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.code}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {error && <p className="text-red-400 text-center mt-2">{error}</p>}
        </div>

        {/* Currency Details */}
        <div className="flex-1 rounded-3xl shadow-lg p-8 bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white transition-colors duration-300">
          <h3 className="text-2xl font-bold mb-4 text-center  text-gray-800 dark:text-gray-100">
            Currency Details
          </h3>
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
