"use client";
import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useFirebase } from "../context/FirebaseContext";
import { AiOutlineSend, AiOutlineCloseCircle } from "react-icons/ai"; 
import "../index.css";

const MessageInput = ({ user }: { user: any }) => {
  const { db } = useFirebase();
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = async () => {
    if (!message.trim()) return;
    setIsLoading(true);
    setError(null);

    try {
      await addDoc(collection(db, "messages"), {
        uid: user.uid,
        text: message,
        timestamp: serverTimestamp(),
      });
      setMessage(""); 
    } catch (error) {
      setError("Failed to send message. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-6 p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg shadow-xl max-w-lg mx-auto mt-6 border border-gray-200">
      
      <h2 className="text-xl font-semibold text-gray-800">Chat with Us</h2>

      
      <div className="relative w-full">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="w-full p-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg shadow-md transition-all duration-200"
        />
      
        {message && (
          <button
            onClick={() => setMessage("")}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            aria-label="Clear message"
          >
            <AiOutlineCloseCircle size={24} />
          </button>
        )}
      </div>

      
      <button
        onClick={sendMessage}
        className={`w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium text-lg rounded-md shadow-md hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:opacity-50 ${
          isLoading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={!message.trim() || isLoading}
      >
        {isLoading ? "Sending..." : <><AiOutlineSend size={20} /> <span>Send</span></>}
      </button>

    
      {error && (
        <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
      )}

      
    
    </div>
  );
};

export default MessageInput;
