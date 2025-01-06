"use client";
import { createContext, useContext } from 'react';
import { auth, db } from '../firebase/config';
import { Firestore } from 'firebase/firestore';

const FirebaseContext = createContext<{ auth: any; db: Firestore } | null>(null);

export const FirebaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <FirebaseContext.Provider value={{ auth, db }}>{children}</FirebaseContext.Provider>
  );
};

export const useFirebase = () => {
  const context = useContext(FirebaseContext);
  if (!context) throw new Error('useFirebase must be used within FirebaseProvider');
  return context;
};