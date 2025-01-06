

Readme
Group Chat Application
This is a real-time group chat application built with Next.js and Firebase. It allows users to sign in with their phone numbers, send messages, and view messages from other users in real-time.

Features
Phone Number Authentication using Firebase Authentication

Real-time Messaging with Firestore

Push Notifications via Firebase Cloud Messaging

Serverless Cloud Functions for handling backend logic

Modern and responsive UI with Next.js

Tech Stack
Frontend: Next.js (React)

Backend: Firebase (Firestore, Authentication, Cloud Functions)


Styling: Tailwind CSS 

Prerequisites
Node.js and npm installed

Firebase project set up

Installation
Clone the repository:

git clone https://github.com/kareemgabe/Group-Chat-Firebase/tree/main
Install dependencies:

npm install



cd cloud-functions
npm install
firebase deploy --only functions
Start the development server:

npm run dev
Open http://localhost:3000 in your browser.

Usage
Sign in with your phone number.

Enter the OTP sent to your phone to authenticate.

Send and view messages in the group chat.

Cloud Functions
sendPushNotification
Sends push notifications to users when a new message is posted.

Input: token, title, body

Output: Success or error response

storeNewMessage
Stores new messages in Firestore.

Input: userId, messageText

Output: Success or error response





.env.local

NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyDbJNvqp-VBEnqg68_TyviRSEGpCJw8fQs
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=group-chat-ea04d.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=group-chat-ea04d
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=group-chat-ea04d.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=109635220288
NEXT_PUBLIC_FIREBASE_APP_ID=1:109635220288:web:62408f383f6c2da0d100a5



