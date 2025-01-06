"use client";
import { useFirebase } from "../../context/FirebaseContext";
import Link from "next/link";
import { AiOutlineHome, AiOutlineMessage } from "react-icons/ai"; 
import '../../index.css';

const ProfilePage = () => {
  const { auth } = useFirebase();
  const user = auth.currentUser;

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-xl space-y-8">
     
      <h1 className="text-3xl font-bold text-center text-gray-800">Profile</h1>
      
      
      <nav className="flex justify-center space-x-4 text-lg">
        <Link href="/" className="flex items-center space-x-2 text-blue-600 hover:text-blue-800">
          <AiOutlineHome size={20} />
          <span>Home</span>
        </Link>
        <span>|</span>
        <Link href="/chat" className="flex items-center space-x-2 text-blue-600 hover:text-blue-800">
          <AiOutlineMessage size={20} />
          <span>Chat</span>
        </Link>
      </nav>

      
      {user ? (
        <div className="space-y-6 bg-white p-6 rounded-lg shadow-md text-gray-700">
          <p className="flex items-center space-x-2">
            <strong className="font-semibold">UID:</strong>
            <span className="break-all">{user.uid}</span>
          </p>
          <p className="flex items-center space-x-2">
            <strong className="font-semibold">Email:</strong>
            <span>{user.email || "Not provided"}</span>
          </p>
        </div>
      ) : (
        <p className="text-center text-gray-600">Please sign in to view your profile.</p>
      )}
    </div>
  );
};

export default ProfilePage;
