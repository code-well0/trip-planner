import React, { useState, useRef, useEffect } from "react";
import { FaPaperPlane, FaRobot, FaUser } from "react-icons/fa";
import { useTheme } from '../contexts/ThemeContext';
import { Loader2 } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import ReactMarkdown from 'react-markdown';

// The Chatbot component for interacting with an AI assistant
function ChatBot() {
    const { theme } = useTheme();
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    // Scroll to the bottom of the chat window on new messages
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // Handle sending a message to the AI
    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = { text: input, sender: 'user' };
        setMessages(prevMessages => [...prevMessages, userMessage]);
        setInput("");
        setIsLoading(true);

        try {
            // Corrected: Call your own backend API
            const response = await fetch('https://trip-planner-backend-bw79.onrender.com/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: input })
            });

            // Handle non-OK responses from your server
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Server error occurred');
            }

            const result = await response.json();
            const botResponse = result.reply;

            setTimeout(() => {
                const botMessage = { text: botResponse, sender: 'bot' };
                setMessages(prevMessages => [...prevMessages, botMessage]);
                setIsLoading(false);
            }, 500); // Simulate typing delay
        } catch (error) {
            console.error("Error fetching AI response from server:", error);
            const errorMessage = { text: `Sorry, there was a problem: ${error.message}`, sender: 'bot' };
            setMessages(prevMessages => [...prevMessages, errorMessage]);
            setIsLoading(false);
        }
    };

    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

    return (
        <div className={`h-screen relative overflow-hidden ${theme}`}>
            {/* Travel Background Image */}
            <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3840&q=80')`,
                    backgroundSize: '120%'
                }}
            />
            
            {/* Content Overlay */}
            <div className="relative z-10 p-6 h-screen flex items-center justify-center">
                <div className="w-full max-w-4xl mx-auto">
                    {/* Modern Chat Container */}
                    <div className="backdrop-blur-xl bg-white/10 dark:bg-gray-900/20 border border-white/20 dark:border-gray-700/30 rounded-3xl shadow-2xl overflow-hidden">
                        {/* Chat header with glassmorphism effect */}
                        <div className="flex items-center p-6 border-b border-white/20 dark:border-gray-700/30 bg-white/5 backdrop-blur-sm">
                            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mr-4 shadow-lg">
                                <FaRobot className="text-white text-xl" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-white drop-shadow-lg">Travel AI Assistant</h2>
                                <p className="text-white/80 text-sm">Your intelligent travel companion</p>
                            </div>
                        </div>

                        {/* Message list with modern styling */}
                        <div className="h-[500px] overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
                            {messages.length === 0 && (
                                <div className="text-center py-12">
                                    <div className="p-4 bg-white/10 backdrop-blur-sm rounded-2xl inline-block mb-4">
                                        <FaRobot className="text-white text-4xl" />
                                    </div>
                                    <p className="text-white/80 text-lg font-medium">Start your travel conversation!</p>
                                    <p className="text-white/60 text-sm mt-2">Ask me anything about your next adventure</p>
                                </div>
                            )}
                            
                            {messages.map((msg, index) => (
                                <div
                                    key={index}
                                    className={`flex items-start space-x-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
                                >
                                    {msg.sender === 'bot' && (
                                        <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex-shrink-0 shadow-lg">
                                            <FaRobot className="text-white text-sm" />
                                        </div>
                                    )}
                                    <div className={`p-4 rounded-2xl max-w-xs md:max-w-md break-words shadow-xl ${
                                        msg.sender === 'user'
                                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white border border-blue-500/30'
                                            : 'bg-white/20 dark:bg-gray-800/40 text-white backdrop-blur-sm border border-white/20'
                                    } transition-all duration-300 hover:scale-105`}>
                                        {msg.sender === 'bot' ? (
                                            <div className="text-sm leading-relaxed">
                                                <ReactMarkdown 
                                                    components={{
                                                        p: ({ children }) => <p className="mb-2 last:mb-0 text-white/90">{children}</p>,
                                                        strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
                                                        em: ({ children }) => <em className="italic text-white/80">{children}</em>,
                                                        code: ({ children }) => <code className="bg-black/20 px-2 py-1 rounded text-xs font-mono text-white/90">{children}</code>,
                                                        pre: ({ children }) => <pre className="bg-black/20 p-3 rounded-lg overflow-x-auto text-xs font-mono text-white/90 mb-2">{children}</pre>,
                                                        ul: ({ children }) => <ul className="list-disc list-inside mb-2 text-white/90">{children}</ul>,
                                                        ol: ({ children }) => <ol className="list-decimal list-inside mb-2 text-white/90">{children}</ol>,
                                                        li: ({ children }) => <li className="mb-1">{children}</li>,
                                                        h1: ({ children }) => <h1 className="text-lg font-bold mb-2 text-white">{children}</h1>,
                                                        h2: ({ children }) => <h2 className="text-base font-bold mb-2 text-white">{children}</h2>,
                                                        h3: ({ children }) => <h3 className="text-sm font-bold mb-1 text-white">{children}</h3>,
                                                        blockquote: ({ children }) => <blockquote className="border-l-4 border-white/30 pl-3 italic mb-2 text-white/80">{children}</blockquote>
                                                    }}
                                                >
                                                    {msg.text}
                                                </ReactMarkdown>
                                            </div>
                                        ) : (
                                            <p className="font-medium">{msg.text}</p>
                                        )}
                                    </div>
                                    {msg.sender === 'user' && (
                                        <div className="p-2 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex-shrink-0 shadow-lg">
                                            <FaUser className="text-white text-sm" />
                                        </div>
                                    )}
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex justify-start items-start space-x-3 animate-pulse">
                                    <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex-shrink-0 shadow-lg">
                                        <FaRobot className="text-white text-sm" />
                                    </div>
                                    <div className="p-4 rounded-2xl bg-white/20 dark:bg-gray-800/40 text-white backdrop-blur-sm border border-white/20 shadow-xl">
                                        <Loader2 size={20} className="animate-spin" />
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Modern message input form */}
                        <form onSubmit={handleSendMessage} className="p-6 border-t border-white/20 dark:border-gray-700/30 bg-white/5 backdrop-blur-sm">
                            <div className="flex space-x-4 items-end">
                                <div className="flex-grow relative">
                                    <input
                                        type="text"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        placeholder="Ask about destinations, planning tips, or travel advice..."
                                        className="w-full px-6 py-4 rounded-2xl border-2 border-white/20 bg-white/10 backdrop-blur-sm text-white placeholder-white/60 focus:outline-none focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300 text-base"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 shadow-xl hover:shadow-2xl transform hover:scale-105 active:scale-95"
                                >
                                    <FaPaperPlane className="text-lg" />
                                </button>
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
                .animate-fade-in {
                    animation: fadeIn 0.5s ease-in-out;
                }
                
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
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
};

export default ChatBot;