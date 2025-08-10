import React, { useState, useRef, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";

function ChatBot() {
  const { theme } = useTheme();
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const chatContainerRef = useRef(null);

  const handleSend = async () => {
    if (!message.trim()) return;

    const newChat = [...chat, { sender: "user", text: message }];
    setChat(newChat);
    setMessage("");

    setIsTyping(true);

    try {
      let chatHistory = [];
      chatHistory.push({ role: "user", parts: [{ text: message }] });
      const payload = { contents: chatHistory };
      const apiKey = "";
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      
      let botResponseText = "An error occurred."; 
      if (result.candidates && result.candidates.length > 0 &&
        result.candidates[0].content && result.candidates[0].content.parts &&
        result.candidates[0].content.parts.length > 0) {
        botResponseText = result.candidates[0].content.parts[0].text;
      }

      setIsTyping(false);
      setChat([...newChat, { sender: "bot", text: botResponseText }]);
    } catch (err) {
      console.error(err);
      setIsTyping(false);
      setChat([...newChat, { sender: "bot", text: "⚠️ Error getting response." }]);
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chat, isTyping]);

  return (
    <div className={`flex items-center justify-center min-h-screen p-4 transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-950' : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'}`}>
      <div className="w-full max-w-lg overflow-hidden bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-2xl rounded-2xl">
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-white rounded-full bg-opacity-20">
              <span className="text-xl">🤖</span>
            </div>
            <div>
              <h1 className="text-xl font-semibold text-white">AI Travel Assistant</h1>
              <p className="text-sm text-blue-100">Online</p>
            </div>
          </div>
        </div>

        {/* Chat Container */}
        <div
          ref={chatContainerRef}
          className="px-4 py-4 space-y-4 overflow-y-auto h-96 bg-gray-50 dark:bg-gray-900 chat-container"
        >
          {chat.length === 0 && (
            <div className="py-8 text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500">
                <span className="text-2xl">💬</span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Start a conversation with your travel assistant!</p>
            </div>
          )}

          {chat.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              } opacity-0 animate-fadeIn`}
            >
              <div className={`flex items-start space-x-2 max-w-xs ${
                msg.sender === "user" ? "flex-row-reverse space-x-reverse" : ""
              }`}>
                {/* Avatar */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs flex-shrink-0 ${
                  msg.sender === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300"
                }`}>
                  {msg.sender === "user" ? "👤" : "�"}
                </div>

                {/* Message Bubble */}
                <div
                  className={`px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                    msg.sender === "user"
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-tr-md"
                      : "bg-white dark:bg-gray-700 text-gray-800 dark:text-white border border-gray-200 dark:border-gray-600 rounded-tl-md"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start opacity-0 animate-fadeIn">
              <div className="flex items-start max-w-xs space-x-2">
                {/* Bot Avatar */}
                <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 text-xs text-gray-700 dark:text-gray-300 bg-gray-300 dark:bg-gray-600 rounded-full">
                  🤖
                </div>

                {/* Typing Bubble */}
                <div className="px-4 py-3 text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 shadow-sm rounded-2xl rounded-tl-md">
                  <div className="flex items-center space-x-1">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                      <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                      <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                    </div>
                    <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">AI is thinking...</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="px-4 py-4 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="relative flex-1">
              <input
                type="text"
                className="w-full px-4 py-3 pr-12 text-sm placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200 border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSend();
                }}
              />
              <button
                className="absolute flex items-center justify-center w-8 h-8 text-sm text-white transition-all duration-200 transform -translate-y-1/2 rounded-full shadow-md right-2 top-1/2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleSend}
                disabled={!message.trim() || isTyping}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatBot;

