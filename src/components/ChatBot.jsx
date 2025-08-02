import { useEffect, useState, useRef } from "react";
import { FaRobot, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "👋 Hello! How can I help you today?", fromUser: false },
  ]);
  const [input, setInput] = useState("");

  const messagesEndRef = useRef(null);
  const audioRef = useRef(null);

  // 👇 Auto open chatbot after 2s IF not manually closed
  useEffect(() => {
    const hasClosed = localStorage.getItem("chatbotClosed");
    if (!hasClosed) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  // 👇 Scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMessage = input.trim();
    const reply = getReply(userMessage);
    setMessages((prev) => [
      ...prev,
      { text: userMessage, fromUser: true },
      { text: reply, fromUser: false },
    ]);
    setTimeout(() => audioRef.current?.play(), 200);
    setInput("");
  };

  const handleToggle = () => {
    const nextState = !isOpen;
    setIsOpen(nextState);
    if (!nextState) {
      localStorage.setItem("chatbotClosed", "true"); // user closed it
    }
  };

  const getReply = (msg) => {
    const text = msg.toLowerCase();
    if (text.includes("hello") || text.includes("hi"))
      return "Hello! 👋 How can I help you?";
    if (text.includes("project"))
      return "You can check my projects section above 👨‍💻";
    if (text.includes("contact"))
      return "Scroll to the bottom to find my contact info 📞";
    if (text.includes("github"))
      return "Visit my GitHub: https://github.com/paresh954";
    return "Sorry, I didn't understand that. Try: hello, project, contact, github.";
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Toggle Button */}
      <button
        onClick={handleToggle}
        className="bg-[#ff69b4] text-white p-3 rounded-full shadow-xl hover:bg-[#d63384] transition-all"
      >
        {isOpen ? <FaTimes /> : <FaRobot />}
      </button>

      {/* Chatbox */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="mt-3 w-72 sm:w-80 h-96 bg-white border border-pink-200 rounded-2xl shadow-xl p-4 flex flex-col"
          >
            <div className="flex items-center gap-2 text-[#ff69b4] font-semibold text-lg mb-3">
              <FaRobot /> PareshBot
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto text-sm text-[#444] bg-[#fff4f8] p-3 rounded mb-3 space-y-2">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`p-2 rounded-md max-w-[75%] ${
                    msg.fromUser
                      ? "bg-pink-100 text-right ml-auto"
                      : "bg-gray-100 text-left"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type your message..."
                className="w-full px-3 py-2 border border-pink-300 rounded text-sm"
              />
              <button
                onClick={handleSend}
                className="bg-[#ff69b4] text-white px-3 rounded text-sm"
              >
                Send
              </button>
            </div>
            <audio ref={audioRef} src="/soundpopup.mp3" preload="auto" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatBot;
