import { https } from "firebase-functions";
import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getMessaging } from "firebase-admin/messaging";

initializeApp();

const db = getFirestore();
const messaging = getMessaging();

// Cloud Function to send a push notification
export const sendPushNotification = https.onCall(async (data, context) => {
  const { token, title, body } = data;

  if (!token || !title || !body) {
    throw new Error("Missing required fields");
  }

  const message = {
    notification: {
      title,
      body,
    },
    token,
  };

  try {
    await messaging.send(message);
    return { success: true };
  } catch (error) {
    console.error("Error sending notification:", error);
    throw new Error("Notification failed");
  }
});

// Cloud Function to store new messages in Firestore
export const storeNewMessage = https.onCall(async (data, context) => {
  const { userId, messageText } = data;

  if (!userId || !messageText) {
    throw new Error("Missing required fields");
  }

  try {
    await db.collection("messages").add({
      uid: userId,
      text: messageText,
      timestamp: new Date(),
    });
    return { success: true };
  } catch (error) {
    console.error("Error storing message:", error);
    throw new Error("Failed to store message");
  }
});
