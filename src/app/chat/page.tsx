"use client";
import ChatBox from "../../components/ChatBox";
import MessageInput from "../../components/MessageInput";
import Link from "next/link";
import '../../index.css';
const ChatPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-6">
    
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Chat</h1>
      
      
      <nav className="mb-6">
        <Link
          href="/"
          className="text-blue-600 hover:text-blue-800 mx-2 font-medium"
        >
          Home
        </Link>
        |
        <Link
          href="/profile"
          className="text-blue-600 hover:text-blue-800 mx-2 font-medium"
        >
          Profile
        </Link>
      </nav>
      
      
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-4">
        <ChatBox />
      </div>
      
      
      <div className="w-full max-w-4xl mt-4">
        <MessageInput />
      </div>
    </div>
  );
};

export default ChatPage;