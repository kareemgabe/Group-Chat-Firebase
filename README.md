

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

UI Fonts: Geist Sans and Geist Mono from Google Fonts

Styling: Tailwind CSS or custom CSS classes (depending on project setup)


Prerequisites
Node.js and npm installed

Firebase project set up

Installation
Clone the repository:

git clone https://github.com/your-repo/group-chat.git
cd group-chat
Install dependencies:

npm install
Create a .env file in the root directory and add your Firebase configuration:

NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
Set up Firebase:

Go to the Firebase Console and enable Authentication (Phone Number provider).

Set up Firestore and create a collection named messages.

Enable Firebase Cloud Messaging for push notifications.

Deploy Cloud Functions:

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
