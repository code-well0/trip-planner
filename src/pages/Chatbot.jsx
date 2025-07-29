
import { useState, useRef, useEffect } from "react";

function ChatBot() {
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
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();
      
      
      setIsTyping(false);
      setChat([...newChat, { sender: "bot", text: data.reply }]);
    } catch (err) {
    
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <span className="text-xl">🤖</span>
            </div>
            <div>
              <h1 className="text-xl font-semibold text-white">AI Travel Assistant</h1>
              <p className="text-blue-100 text-sm">Online</p>
            </div>
          </div>
        </div>

        {/* Chat Container */}
        <div
          ref={chatContainerRef}
          className="h-96 overflow-y-auto bg-gray-50 px-4 py-4 space-y-4"
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: '#cbd5e1 #f1f5f9'
          }}
        >
          {chat.length === 0 && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💬</span>
              </div>
              <p className="text-gray-500 text-sm">Start a conversation with your travel assistant!</p>
            </div>
          )}
          
          {chat.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              } animate-fade-in`}
            >
              <div className={`flex items-start space-x-2 max-w-xs ${
                msg.sender === "user" ? "flex-row-reverse space-x-reverse" : ""
              }`}>
                {/* Avatar */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs flex-shrink-0 ${
                  msg.sender === "user" 
                    ? "bg-blue-600 text-white" 
                    : "bg-gray-300 text-gray-700"
                }`}>
                  {msg.sender === "user" ? "👤" : "🤖"}
                </div>
                
                {/* Message Bubble */}
                <div
                  className={`px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                    msg.sender === "user"
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-tr-md"
                      : "bg-white text-gray-800 border border-gray-200 rounded-tl-md"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            </div>
          ))}
          
          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start animate-fade-in">
              <div className="flex items-start space-x-2 max-w-xs">
                {/* Bot Avatar */}
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs flex-shrink-0 bg-gray-300 text-gray-700">
                  🤖
                </div>
                
                {/* Typing Bubble */}
                <div className="bg-white text-gray-800 border border-gray-200 rounded-2xl rounded-tl-md px-4 py-3 shadow-sm">
                  <div className="flex items-center space-x-1">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                    </div>
                    <span className="text-xs text-gray-500 ml-2">AI is thinking...</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="bg-white border-t border-gray-100 px-4 py-4">
          <div className="flex items-center space-x-3">
            <div className="flex-1 relative">
              <input
                type="text"
                className="w-full border border-gray-300 rounded-full px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm placeholder-gray-500 transition-all duration-200"
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSend();
                }}
              />
              <button
                className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex items-center justify-center text-sm shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
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
      
    
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        
       
        div::-webkit-scrollbar {
          width: 6px;
        }
        
        div::-webkit-scrollbar-track {
          background: #f1f5f9;
        }
        
        div::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 3px;
        }
        
        div::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </div>
  );
}

export default ChatBot;
