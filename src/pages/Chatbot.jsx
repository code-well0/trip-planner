import React, { useState, useRef, useEffect } from "react";
import { FaPaperPlane, FaRobot, FaUser } from "react-icons/fa";
import { useTheme } from '../contexts/ThemeContext';
import { Loader2 } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";

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
            // Placeholder for Gemini API call
            // In a real application, you would make an API call to a model
            let chatHistory = [];
            chatHistory.push({ role: "user", parts: [{ text: input }] });
            const payload = { contents: chatHistory };
            const apiKey = "";
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const result = await response.json();
            const botResponse = result.candidates[0].content.parts[0].text;

            setTimeout(() => {
                const botMessage = { text: botResponse, sender: 'bot' };
                setMessages(prevMessages => [...prevMessages, botMessage]);
                setIsLoading(false);
            }, 500); // Simulate typing delay
        } catch (error) {
            console.error("Error fetching AI response:", error);
            const errorMessage = { text: "Sorry, I'm having trouble connecting right now. Please try again later.", sender: 'bot' };
            setMessages(prevMessages => [...prevMessages, errorMessage]);
            setIsLoading(false);
        }
    };

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
                                <p>{msg.text}</p>
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
