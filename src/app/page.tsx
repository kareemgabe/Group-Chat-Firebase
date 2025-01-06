// "use client";
// import { useEffect, useState } from "react";
// import { useFirebase } from "../context/FirebaseContext";
// import ChatBox from "../components/ChatBox";
// import SignIn from "../components/SignIn";
// import Link from "next/link";

// const ChatApp = () => {
//   const { auth } = useFirebase();
//   const [user, setUser] = useState<any>(null);

//   useEffect(() => {
//     auth.onAuthStateChanged((currentUser) => setUser(currentUser));
//   }, [auth]);

//   const handleSignInSuccess = (user: any) => {
//     setUser(user);
//   };

//   return (
//     <div>
//       {!user ? (
//         <SignIn onSignInSuccess={handleSignInSuccess} />
//       ) : (
//         <div>
//           <h1>Group Chat</h1>
//           <nav>
//             <Link href="/chat">Chat</Link> | <Link href="/profile">Profile</Link>
//           </nav>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChatApp;



"use client";
import { useEffect, useState } from "react";
import { useFirebase } from "../context/FirebaseContext";
import ChatBox from "../components/ChatBox";
import SignIn from "../components/SignIn";
import Link from "next/link";
import '../index.css';
const ChatApp = () => {
  const { auth } = useFirebase();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Firebase onAuthStateChanged listener for user authentication
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    // Clean up the listener when the component is unmounted
    return () => unsubscribe();
  }, [auth]);

  const handleSignInSuccess = (user: any) => {
    setUser(user);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
      {!user ? (
        <SignIn onSignInSuccess={handleSignInSuccess} />
      ) : (
        <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-lg space-y-6">
          <h1 className="text-2xl font-semibold text-center">Group Chat</h1>
          <nav className="text-center">
            <Link href="/chat" className="text-blue-600 hover:underline">
              Chat
            </Link>
            {" | "}
            <Link href="/profile" className="text-blue-600 hover:underline">
              Profile
            </Link>
          </nav>
          <ChatBox />
        </div>
      )}
    </div>
  );
};

export default ChatApp;
