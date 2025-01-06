"use client";
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { useFirebase } from "../context/FirebaseContext";
import "../index.css";

const ChatBox = () => {
  const { db } = useFirebase();
  const [messages, setMessages] = useState<any>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "messages"), (snapshot) => {
      setMessages(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribe();
  }, [db]);

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white rounded-lg shadow-lg h-96 overflow-auto relative">
      
      <div className="space-y-4">
        {messages.length > 0 ? (
          messages.map((msg: { id: string; uid: string; text: string }) => (
            <div
              key={msg.id}
              className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg shadow-sm"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-600">
                {msg.uid.slice(0, 1).toUpperCase()}
              </div>
              <div>
                <p className="text-sm text-gray-600">
                  <strong className="text-gray-800">{msg.uid}</strong>
                </p>
                <p className="text-gray-800">{msg.text}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No messages yet...</p>
        )}
      </div>
    </div>
  );
};

export default ChatBox;
