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
        <div className={`p-8 min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300 ${theme}`}>
            <div className="max-w-3xl mx-auto flex flex-col h-[calc(100vh-120px)] rounded-xl shadow-lg bg-white dark:bg-gray-800 transition-colors duration-300">
                {/* Chat header */}
                <div className="flex items-center p-4 border-b border-gray-200 dark:border-gray-700">
                    <FaRobot className="text-blue-500 text-2xl mr-2" />
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white">AI Assistant</h2>
                </div>

                {/* Message list */}
                <div className="flex-grow overflow-y-auto p-4 space-y-4" style={{ WebkitOverflowScrolling: 'touch' }}>
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`flex items-start space-x-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            {msg.sender === 'bot' && <FaRobot className="text-blue-500 text-lg flex-shrink-0 mt-1" />}
                            <div className={`p-3 rounded-xl max-w-xs md:max-w-md break-words ${
                                msg.sender === 'user'
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white'
                            }`}>
                                {msg.sender === 'bot' ? (
                                    <div className="text-sm leading-relaxed">
                                        <ReactMarkdown 
                                            components={{
                                                p: ({ children }) => <p className="mb-2 last:mb-0 text-gray-800 dark:text-gray-200">{children}</p>,
                                                strong: ({ children }) => <strong className="font-semibold text-gray-900 dark:text-gray-100">{children}</strong>,
                                                em: ({ children }) => <em className="italic text-gray-700 dark:text-gray-300">{children}</em>,
                                                code: ({ children }) => <code className="bg-gray-300 dark:bg-gray-600 px-1 py-0.5 rounded text-xs font-mono text-gray-900 dark:text-gray-100">{children}</code>,
                                                pre: ({ children }) => <pre className="bg-gray-300 dark:bg-gray-600 p-2 rounded overflow-x-auto text-xs font-mono text-gray-900 dark:text-gray-100 mb-2">{children}</pre>,
                                                ul: ({ children }) => <ul className="list-disc list-inside mb-2 text-gray-800 dark:text-gray-200">{children}</ul>,
                                                ol: ({ children }) => <ol className="list-decimal list-inside mb-2 text-gray-800 dark:text-gray-200">{children}</ol>,
                                                li: ({ children }) => <li className="mb-1">{children}</li>,
                                                h1: ({ children }) => <h1 className="text-lg font-bold mb-2 text-gray-900 dark:text-gray-100">{children}</h1>,
                                                h2: ({ children }) => <h2 className="text-base font-bold mb-2 text-gray-900 dark:text-gray-100">{children}</h2>,
                                                h3: ({ children }) => <h3 className="text-sm font-bold mb-1 text-gray-900 dark:text-gray-100">{children}</h3>,
                                                blockquote: ({ children }) => <blockquote className="border-l-4 border-gray-400 dark:border-gray-500 pl-2 italic mb-2 text-gray-700 dark:text-gray-300">{children}</blockquote>
                                            }}
                                        >
                                            {msg.text}
                                        </ReactMarkdown>
                                    </div>
                                ) : (
                                    <p>{msg.text}</p>
                                )}
                            </div>
                            {msg.sender === 'user' && <FaUser className="text-gray-500 text-lg flex-shrink-0 mt-1" />}
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex justify-start items-start space-x-2">
                            <FaRobot className="text-blue-500 text-lg flex-shrink-0 mt-1" />
                            <div className="p-3 rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white">
                                <Loader2 size={24} className="animate-spin" />
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Message input form */}
                <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 dark:border-gray-700 flex space-x-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-grow px-4 py-3 rounded-full border border-gray-300 dark:border-gray-700 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-200 disabled:bg-gray-400"
                    >
                        <FaPaperPlane />
                    </button>
                </form>
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
        </div>
    );
};

export default ChatBot;
