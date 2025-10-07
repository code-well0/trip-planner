import React, { useState } from "react";
import { useTheme } from "../contexts/ThemeContext";
import {
    FaPlus,
    FaTrash,
    FaEdit,
    FaSuitcase,
    FaTshirt,
    FaHeartbeat,
    FaLaptop,
    FaBath,
    FaStar,
    FaFilePdf,
    FaFileAlt,
    FaCheck,
    FaCircle,
    FaDownload,
} from "react-icons/fa";

export default function PackingChecklist() {
    const { theme } = useTheme();
    const [sections, setSections] = useState([
        {
            id: 1,
            title: "Travel Essentials",
            icon: <FaSuitcase className="text-2xl" />,
            color: "from-blue-500 to-cyan-500",
            items: [
                { id: 1, name: "Passport / ID", packed: false, essential: true },
                { id: 2, name: "Travel tickets (flight, train, etc.)", packed: false, essential: true },
                { id: 3, name: "Wallet with cash and cards", packed: false, essential: true },
                { id: 4, name: "Travel insurance", packed: false, essential: true },
                { id: 5, name: "Copies of important documents", packed: false, essential: true },
                { id: 6, name: "Itinerary / booking confirmations", packed: false },
            ],
        },
        {
            id: 2,
            title: "Clothing",
            icon: <FaTshirt className="text-2xl" />,
            color: "from-pink-500 to-rose-500",
            items: [
                { id: 7, name: "T-shirts / tops", packed: false },
                { id: 8, name: "Pants / shorts / skirts", packed: false },
                { id: 9, name: "Undergarments", packed: false },
                { id: 10, name: "Socks", packed: false },
                { id: 11, name: "Sleepwear", packed: false },
                { id: 12, name: "Light jacket / sweater", packed: false },
                { id: 13, name: "Comfortable shoes", packed: false },
                { id: 14, name: "Flip-flops / sandals", packed: false },
                { id: 15, name: "Swimsuit", packed: false },
            ],
        },
        {
            id: 3,
            title: "Toiletries",
            icon: <FaBath className="text-2xl" />,
            color: "from-emerald-500 to-teal-500",
            items: [
                { id: 16, name: "Toothbrush & toothpaste", packed: false },
                { id: 17, name: "Hairbrush / comb", packed: false },
                { id: 18, name: "Shampoo & conditioner (travel size)", packed: false },
                { id: 19, name: "Soap / body wash", packed: false },
                { id: 20, name: "Deodorant", packed: false },
                { id: 21, name: "Razor", packed: false },
                { id: 22, name: "Sunscreen", packed: false },
                { id: 23, name: "Moisturizer / lip balm", packed: false },
                { id: 24, name: "Feminine hygiene products", packed: false },
            ],
        },
        {
            id: 4,
            title: "Health & Safety",
            icon: <FaHeartbeat className="text-2xl" />,
            color: "from-red-500 to-orange-500",
            items: [
                { id: 25, name: "Prescription medications", packed: false, essential: true },
                { id: 26, name: "Painkillers / allergy meds", packed: false },
                { id: 27, name: "Band-aids / first aid kit", packed: false },
                { id: 28, name: "Hand sanitizer", packed: false },
                { id: 29, name: "Face masks", packed: false },
                { id: 30, name: "Insect repellent", packed: false },
            ],
        },
        {
            id: 5,
            title: "Electronics",
            icon: <FaLaptop className="text-2xl" />,
            color: "from-purple-500 to-indigo-500",
            items: [
                { id: 31, name: "Mobile phone + charger", packed: false, essential: true },
                { id: 32, name: "Power bank", packed: false },
                { id: 33, name: "Headphones / earbuds", packed: false },
                { id: 34, name: "Travel adapter (if abroad)", packed: false },
                { id: 35, name: "Camera", packed: false },
                { id: 36, name: "E-reader / book", packed: false },
            ],
        },
        {
            id: 6,
            title: "Other Useful Items",
            icon: <FaStar className="text-2xl" />,
            color: "from-yellow-500 to-amber-500",
            items: [
                { id: 37, name: "Sunglasses", packed: false },
                { id: 38, name: "Hat / cap", packed: false },
                { id: 39, name: "Reusable water bottle", packed: false },
                { id: 40, name: "Travel pillow", packed: false },
                { id: 41, name: "Snacks", packed: false },
                { id: 42, name: "Tote bag / foldable shopping bag", packed: false },
                { id: 43, name: "Small backpack / day bag", packed: false },
                { id: 44, name: "Ziplock bags / packing cubes", packed: false },
                { id: 45, name: "Notepad & pen", packed: false },
            ],
        },
    ]);

    const [activeSection, setActiveSection] = useState(sections[0]);
    const [search, setSearch] = useState("");
    const [showItemModal, setShowItemModal] = useState(false);
    const [showSectionModal, setShowSectionModal] = useState(false);
    const [newItemName, setNewItemName] = useState("");
    const [newSectionName, setNewSectionName] = useState("");

    const totalItems = activeSection.items.length;
    const packedItems = activeSection.items.filter((i) => i.packed).length;
    const progress = totalItems ? Math.round((packedItems / totalItems) * 100) : 0;

    const overallTotal = sections.reduce((sum, section) => sum + section.items.length, 0);
    const overallPacked = sections.reduce((sum, section) => sum + section.items.filter(i => i.packed).length, 0);
    const overallProgress = overallTotal ? Math.round((overallPacked / overallTotal) * 100) : 0;

    const toggleItem = (itemId) => {
        setSections((prev) =>
            prev.map((section) =>
                section.id === activeSection.id
                    ? {
                        ...section,
                        items: section.items.map((item) =>
                            item.id === itemId ? { ...item, packed: !item.packed } : item
                        ),
                    }
                    : section
            )
        );
        setActiveSection((prev) => ({
            ...prev,
            items: prev.items.map((item) =>
                item.id === itemId ? { ...item, packed: !item.packed } : item
            ),
        }));
    };

    const markAll = (packed) => {
        setSections((prev) =>
            prev.map((section) =>
                section.id === activeSection.id
                    ? {
                        ...section,
                        items: section.items.map((item) => ({ ...item, packed })),
                    }
                    : section
            )
        );
        setActiveSection((prev) => ({
            ...prev,
            items: prev.items.map((item) => ({ ...item, packed })),
        }));
    };

    const addItem = () => {
        if (!newItemName.trim()) return;
        const newItem = {
            id: Date.now(),
            name: newItemName,
            packed: false,
        };
        setSections((prev) =>
            prev.map((section) =>
                section.id === activeSection.id
                    ? { ...section, items: [...section.items, newItem] }
                    : section
            )
        );
        setActiveSection((prev) => ({
            ...prev,
            items: [...prev.items, newItem],
        }));
        setNewItemName("");
        setShowItemModal(false);
    };

    const addSection = () => {
        if (!newSectionName.trim()) return;
        const newSection = {
            id: Date.now(),
            title: newSectionName,
            icon: <FaStar className="text-2xl" />,
            color: "from-gray-500 to-slate-500",
            items: [],
        };
        setSections((prev) => [...prev, newSection]);
        setActiveSection(newSection);
        setNewSectionName("");
        setShowSectionModal(false);
    };

    const filteredItems = activeSection.items.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
    );

    const exportText = () => {
        const text = sections
            .map(
                (s) =>
                    `${s.title}\n${s.items
                        .map((i) => `- [${i.packed ? "x" : " "}] ${i.name}`)
                        .join("\n")}`
            )
            .join("\n\n");
        const blob = new Blob([text], { type: "text/plain" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "packing-checklist.txt";
        link.click();
    };

    const exportPDF = () => {
        window.print();
    };

    return (
        <div className={`min-h-screen p-4 font-sans transition-colors duration-500 ${theme === "dark"
                ? "bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white"
                : "bg-gradient-to-br from-gray-100 via-slate-100 to-gray-100 text-gray-900"
            }`}>
            {/* Animated Background Elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-pink-500/10 rounded-full blur-2xl animate-pulse delay-500"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto">
                {/* Header with Overall Progress */}
                <div className="text-center mb-12">
                    <div className="relative inline-block">
                        <h1 className={`text-6xl font-bol text-transparent mb-4 transition-colors duration-500
                ${theme === "dark"
                                ? "bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text"
                                : "bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 bg-clip-text"
                            }`}>
                            PackMaster
                        </h1>
                        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600/20 to-pink-600/20 rounded-lg blur"></div>
                    </div>
                    <p className={`text-xl  mb-6 
                         ${theme === "dark"
                            ? "text-gray-300"
                            : "text-gray-900"}`}>
                        Your Ultimate Travel Companion</p>
                    {/* Overall Progress Ring */}
                    <div className="flex justify-center mb-8">
                        <div className="relative w-32 h-32">
                            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                                <circle
                                    cx="50"
                                    cy="50"
                                    r="40"
                                    stroke={theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}
                                    strokeWidth="6"
                                    fill="none"
                                />
                                <circle
                                    cx="50"
                                    cy="50"
                                    r="40"
                                    stroke={`url(#gradient-${theme})`}
                                    strokeWidth="6"
                                    fill="none"
                                    strokeDasharray={`${overallProgress * 2.51} 251`}
                                    className="transition-all duration-1000 ease-out"
                                />
                                <defs>
                                    {theme === "dark" ? (
                                        <linearGradient id="gradient-dark" x1="0%" y1="0%" x2="100%" y2="0%">
                                            <stop offset="0%" stopColor="#06b6d4" />
                                            <stop offset="50%" stopColor="#8b5cf6" />
                                            <stop offset="100%" stopColor="#ec4899" />
                                        </linearGradient>
                                    ) : (
                                        <linearGradient id="gradient-light" x1="0%" y1="0%" x2="100%" y2="0%">
                                            <stop offset="0%" stopColor="#3b82f6" />
                                            <stop offset="50%" stopColor="#10b981" />
                                            <stop offset="100%" stopColor="#f59e0b" />
                                        </linearGradient>
                                    )}
                                </defs>
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span
                                    className={`text-2xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"
                                        }`}
                                >
                                    {overallProgress}%
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className={theme === "dark" ? "text-gray-400" : "text-gray-700"}>
                        <span className={`text-2xl font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                            {overallPacked}
                        </span>{" "}
                        of{" "}
                        <span className={`text-2xl font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                            {overallTotal}
                        </span>{" "}
                        items packed
                    </div>

                </div>

                {/* Floating Action Panel */}
                <div className="fixed top-1/2 right-6 transform -translate-y-1/2 z-50 space-y-4">
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 shadow-2xl">
                        <div className="flex flex-col gap-3">
                            <button
                                onClick={() => setShowItemModal(true)}
                                className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg"
                                title="Add Item"
                            >
                                <FaPlus />
                            </button>
                            <button
                                onClick={() => setShowSectionModal(true)}
                                className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg"
                                title="Add Section"
                            >
                                <FaPlus />
                            </button>
                            <button
                                onClick={exportPDF}
                                className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg"
                                title="Export PDF"
                            >
                                <FaFilePdf />
                            </button>
                            <button
                                onClick={exportText}
                                className="w-12 h-12 bg-gradient-to-r from-gray-500 to-slate-500 rounded-xl flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg"
                                title="Export Text"
                            >
                                <FaFileAlt />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Category Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {sections.map((section) => {
                        const packedCount = section.items.filter((i) => i.packed).length;
                        const sectionProgress = section.items.length ? (packedCount / section.items.length) * 100 : 0;

                        return (
                            <div
                                key={section.id}
                                className={`group cursor-pointer transition-all duration-300 hover:scale-105 ${activeSection.id === section.id ? 'ring-2 ring-white/50 ring-offset-2 ring-offset-transparent' : ''
                                    }`}
                                onClick={() => setActiveSection(section)}
                            >
                                <div className={`relative bg-gradient-to-br ${section.color} rounded-3xl p-6 shadow-2xl overflow-hidden`}>
                                    {/* Animated Background Pattern */}
                                    <div className="absolute inset-0 opacity-10">
                                        <div className="absolute top-0 right-0 w-24 h-24 bg-white rounded-full -translate-y-12 translate-x-12"></div>
                                        <div className="absolute bottom-0 left-0 w-16 h-16 bg-white rounded-full translate-y-8 -translate-x-8"></div>
                                    </div>

                                    <div className="relative z-10">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-3">
                                                {section.icon}
                                            </div>
                                            <div className="text-right">
                                                <div className="text-2xl font-bold text-white">{Math.round(sectionProgress)}%</div>
                                                <div className="text-white/80 text-sm">{packedCount}/{section.items.length}</div>
                                            </div>
                                        </div>

                                        <h3 className="text-xl font-bold text-white mb-4">{section.title}</h3>

                                        {/* Mini Progress Bar */}
                                        <div className="w-full bg-white/20 rounded-full h-2 mb-2">
                                            <div
                                                className="bg-white rounded-full h-2 transition-all duration-700 ease-out"
                                                style={{ width: `${sectionProgress}%` }}
                                            />
                                        </div>

                                        {/* Status Indicator */}
                                        <div className="flex items-center gap-2">
                                            {sectionProgress === 100 ? (
                                                <div className="flex items-center gap-1 text-white">
                                                    <FaCheck className="text-green-300" />
                                                    <span className="text-sm font-medium">Complete</span>
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-1 text-white/80">
                                                    <FaCircle className="text-yellow-300" />
                                                    <span className="text-sm">In Progress</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Active Section Details */}
                <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl">
                    {/* Section Header */}
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-4">
                            <div className={`bg-gradient-to-br ${activeSection.color} rounded-2xl p-4`}>
                                {activeSection.icon}
                            </div>
                            <div>
                                <h2
                                    className={`text-3xl font-bold transition-colors duration-500 ${theme === "dark" ? "text-white" : "text-gray-900"
                                        }`}
                                >
                                    {activeSection.title}
                                </h2>
                                <p
                                    className={`transition-colors duration-500 ${theme === "dark" ? "text-gray-400" : "text-gray-700"
                                        }`}
                                >
                                    {packedItems} of {totalItems} items packed
                                </p>
                            </div>

                        </div>

                        {/* Search and Actions */}
                        <div className="flex items-center gap-4">
                            <input
                                type="text"
                                placeholder="Search items..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className={`backdrop-blur-sm rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors duration-500 ${theme === "dark"
                                        ? "bg-white/10 border border-white/20 text-white placeholder-gray-400"
                                        : "bg-gray-100 border border-gray-300 text-gray-900 placeholder-gray-500"
                                    }`}
                            />

                            <div className="flex gap-2">
                                <button
                                    onClick={() => markAll(true)}
                                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl transition-colors"
                                >
                                    ✓ All
                                </button>
                                <button
                                    onClick={() => markAll(false)}
                                    className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-xl transition-colors"
                                >
                                    ✗ None
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-8">
                        <div
                            className={`w-full rounded-full h-3 overflow-hidden transition-colors duration-500 ${theme === "dark" ? "bg-white/10" : "bg-gray-300"
                                }`}
                        >
                            <div
                                className={`h-full bg-gradient-to-r ${activeSection.color} transition-all duration-700 ease-out`}
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>


                    {/* Items Grid */}
                    <div className="grid gap-4">
                        {filteredItems.map((item, index) => (
                            <div
                                key={item.id}
                                className={`group relative rounded-2xl p-4 transition-all duration-300 ${item.packed ? 'opacity-75' : ''
                                    } ${theme === "dark"
                                        ? "bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20"
                                        : "bg-gray-100 border border-gray-300 hover:bg-gray-200"
                                    }`}
                                style={{
                                    animationDelay: `${index * 50}ms`,
                                    animation: 'slideInUp 0.6s ease-out forwards'
                                }}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div
                                            className={`relative w-6 h-6 rounded-lg border-2 cursor-pointer transition-all duration-300 ${item.packed
                                                    ? `bg-gradient-to-r ${activeSection.color} border-transparent`
                                                    : theme === "dark"
                                                        ? "border-white/30 hover:border-white/50"
                                                        : "border-gray-400 hover:border-gray-500"
                                                }`}
                                            onClick={() => toggleItem(item.id)}
                                        >
                                            {item.packed && (
                                                <FaCheck className="absolute inset-0 m-auto text-white text-xs" />
                                            )}
                                        </div>

                                        <span
                                            className={`text-lg transition-all duration-300 ${item.packed
                                                    ? theme === "dark" ? 'text-gray-400 line-through' : 'text-gray-500 line-through'
                                                    : theme === "dark" ? 'text-white' : 'text-gray-900'
                                                }`}
                                        >
                                            {item.name}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        {item.essential && (
                                            <span className="bg-red-500/80 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full border border-red-400/50">
                                                Essential
                                            </span>
                                        )}
                                        <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                                            <button className="text-blue-400 hover:text-blue-300 transition-colors">
                                                <FaEdit />
                                            </button>
                                            <button className="text-red-400 hover:text-red-300 transition-colors">
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {filteredItems.length === 0 && (
                            <div className="text-center py-12">
                                <p className={theme === "dark" ? "text-gray-400 text-xl" : "text-gray-700 text-xl"}>
                                    No items found
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Modals */}
                {showItemModal && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                        <div className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/20 w-96">
                            <h3 className="text-2xl font-bold text-white mb-6">Add New Item</h3>
                            <input
                                type="text"
                                value={newItemName}
                                onChange={(e) => setNewItemName(e.target.value)}
                                placeholder="Item name"
                                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 mb-6"
                            />
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setShowItemModal(false)}
                                    className="flex-1 px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-xl transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={addItem}
                                    className="flex-1 px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white rounded-xl transition-all"
                                >
                                    Add Item
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {showSectionModal && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                        <div className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/20 w-96">
                            <h3 className="text-2xl font-bold text-white mb-6">Add New Section</h3>
                            <input
                                type="text"
                                value={newSectionName}
                                onChange={(e) => setNewSectionName(e.target.value)}
                                placeholder="Section name"
                                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 mb-6"
                            />
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setShowSectionModal(false)}
                                    className="flex-1 px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-xl transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={addSection}
                                    className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white rounded-xl transition-all"
                                >
                                    Add Section
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
        </div>
    );
}