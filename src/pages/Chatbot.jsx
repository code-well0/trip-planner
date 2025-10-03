import React, { useState, useRef, useEffect } from "react";
import { FaPaperPlane, FaRobot, FaUser } from "react-icons/fa";
import { useTheme } from "../contexts/ThemeContext";
import { Loader2 } from "lucide-react";
import { ToastContainer } from "react-toastify";
import ReactMarkdown from "react-markdown";

function ChatBot() {
    const { theme } = useTheme();
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = { text: input, sender: "user" };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsLoading(true);

        try {
            const response = await fetch(
                `${BACKEND_URL}/api/chat`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ message: input }),
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Server error occurred");
            }

            const result = await response.json();
            const botResponse = result.reply;

            setTimeout(() => {
                const botMessage = { text: botResponse, sender: "bot" };
                setMessages((prev) => [...prev, botMessage]);
                setIsLoading(false);
            }, 500);
        } catch (error) {
            const errorMessage = {
                text: `Sorry, there was a problem: ${error.message}`,
                sender: "bot",
            };
            setMessages((prev) => [...prev, errorMessage]);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className={`min-h-screen relative overflow-hidden ${theme}`}>
            {/* Background */}
            <div
                className="absolute inset-0 bg-gradient-to-br from-blue-700 via-purple-800 to-gray-900"
                style={{ opacity: 0.9 }}
            />

            {/* Content */}
            <div className="relative z-10 flex items-center justify-center p-4 sm:p-6 -mt-2">
                <div className="w-full max-w-4xl mx-auto">
                    <div className="backdrop-blur-2xl bg-white/10 dark:bg-gray-900/30 border border-white/20 rounded-3xl shadow-2xl overflow-hidden">
                        {/* Header */}
                        <div className="flex items-center p-5 sm:p-6 border-b border-white/20 bg-white/5">
                            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mr-4 shadow-lg">
                                <FaRobot className="text-white text-2xl" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-white">Travel AI Assistant</h2>
                                <p className="text-white/80 text-sm">
                                    Your intelligent travel companion
                                </p>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="h-[60vh] overflow-y-auto p-4 sm:p-6 space-y-5 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
                            {messages.length === 0 && (
                                <div className="text-center py-12">
                                    <div className="p-5 bg-white/10 backdrop-blur-sm rounded-2xl inline-block mb-4">
                                        <FaRobot className="text-white text-5xl" />
                                    </div>
                                    <p className="text-white/90 text-lg font-medium">
                                        Start your travel conversation!
                                    </p>
                                    <p className="text-white/60 text-sm mt-1">
                                        Ask me anything about your next adventure.
                                    </p>
                                </div>
                            )}

                            {messages.map((msg, i) => (
                                <div
                                    key={i}
                                    className={`flex items-end space-x-3 ${msg.sender === "user" ? "justify-end" : "justify-start"
                                        } fade-in`}
                                >
                                    {msg.sender === "bot" && (
                                        <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-lg flex-shrink-0">
                                            <FaRobot className="text-white text-base" />
                                        </div>
                                    )}
                                    <div
                                        className={`p-4 rounded-2xl max-w-xs sm:max-w-md text-base leading-relaxed shadow-xl transition-transform duration-300 hover:scale-[1.02] ${msg.sender === "user"
                                                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                                                : "bg-white/20 dark:bg-gray-800/40 text-white backdrop-blur-sm border border-white/20"
                                            }`}
                                    >
                                        {msg.sender === "bot" ? (
                                            <ReactMarkdown
                                                components={{
                                                    p: ({ children }) => (
                                                        <p className="mb-2 last:mb-0 text-white/90">
                                                            {children}
                                                        </p>
                                                    ),
                                                }}
                                            >
                                                {msg.text}
                                            </ReactMarkdown>
                                        ) : (
                                            <p className="font-medium">{msg.text}</p>
                                        )}
                                    </div>
                                    {msg.sender === "user" && (
                                        <div className="p-2 bg-gradient-to-r from-green-500 to-teal-600 rounded-full shadow-lg flex-shrink-0">
                                            <FaUser className="text-white text-base" />
                                        </div>
                                    )}
                                </div>
                            ))}

                            {isLoading && (
                                <div className="flex justify-start items-center space-x-3 animate-pulse">
                                    <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-lg">
                                        <FaRobot className="text-white text-base" />
                                    </div>
                                    <div className="p-4 rounded-2xl bg-white/20 dark:bg-gray-800/40 text-white backdrop-blur-sm border border-white/20 shadow-xl">
                                        <Loader2 size={20} className="animate-spin" />
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        {/* Input */}
                        <form
                            onSubmit={handleSendMessage}
                            className="p-4 sm:p-6 border-t border-white/20 bg-white/5"
                        >
                            <div className="flex space-x-3 items-end">
                                <textarea
                                    rows={1}
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter" && !e.shiftKey) {
                                            e.preventDefault();
                                            handleSendMessage(e);
                                        }
                                    }}
                                    placeholder="Type a message… (Shift + Enter for new line)"
                                    className="flex-grow resize-none px-5 py-3 rounded-2xl border-2 border-white/20 bg-white/10 text-white placeholder-white/60 focus:outline-none focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20 text-base"
                                />
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 shadow-xl hover:shadow-2xl transform hover:scale-105 active:scale-95"
                                >
                                    <FaPaperPlane className="text-lg" />
                                </button>
                            </div>

                            {/* 👇 Quick Suggestions */}
                            <div className="mt-4 flex flex-wrap gap-2">
                                {[
                                    "Best places to visit in Paris",
                                    "Suggest a 3-day itinerary for Japan",
                                    "Budget-friendly beaches in India",
                                    "Weather in New York next week",
                                ].map((s, i) => (
                                    <button
                                        key={i}
                                        type="button"
                                        onClick={() => setInput(s)}  // fill the input; or call handleSendMessage directly
                                        className="px-3 py-1.5 rounded-full text-sm bg-white/20 text-white hover:bg-white/30 transition"
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        </form>

                    </div>
                </div>
            </div>

            <ToastContainer
                position="bottom-left"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                pauseOnHover
                draggable
                theme="colored"
            />

            <style jsx>{`
        .fade-in {
          animation: fadeIn 0.4s ease-in-out;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .scrollbar-thin {
          scrollbar-width: thin;
        }
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background-color: rgba(255, 255, 255, 0.2);
          border-radius: 3px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background-color: rgba(255, 255, 255, 0.3);
        }
      `}</style>
        </div>
    );
}

export default ChatBot;
