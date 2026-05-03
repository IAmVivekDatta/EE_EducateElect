import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/10.10.0/firebase-analytics.js';
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
} from 'https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js';
import {
    getFirestore,
    doc,
    setDoc,
    getDoc,
    increment,
    updateDoc,
} from 'https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js';

const firebaseConfig = {
    apiKey: 'AIzaSyDCkPGlqgmtPn69jrC2qCaAaJYtHOitA28',
    authDomain: 'election-process-edu-ea1c6.firebaseapp.com',
    projectId: 'election-process-edu-ea1c6',
    storageBucket: 'election-process-edu-ea1c6.firebasestorage.app',
    messagingSenderId: '572954791716',
    appId: '1:572954791716:web:a4835ef64d9e531d682db1',
    measurementId: 'G-4XP1CTEY5E',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);

const provider = new GoogleAuthProvider();

export const loginWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, provider);
        return result.user;
    } catch (error) {
        console.error('Error signing in with Google:', error);
        throw error;
    }
};

export const logoutGoogle = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        console.error('Error signing out:', error);
    }
};

export const trackApiUsage = async (userId) => {
    if (!userId) return;
    const userRef = doc(db, 'users', userId);
    try {
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
            await updateDoc(userRef, {
                apiCalls: increment(1),
            });
        } else {
            await setDoc(
                userRef,
                {
                    apiCalls: 1,
                },
                { merge: true }
            );
        }
    } catch (e) {
        console.error('Error tracking API usage:', e);
    }
};

export const saveUserApiKey = async (userId, apiKey) => {
    if (!userId) return;
    const userRef = doc(db, 'users', userId);
    try {
        await setDoc(
            userRef,
            {
                geminiApiKey: apiKey,
            },
            { merge: true }
        );
    } catch (e) {
        console.error('Error saving API key to Firestore:', e);
    }
};

export const getUserApiKey = async (userId) => {
    if (!userId) return null;
    const userRef = doc(db, 'users', userId);
    try {
        const docSnap = await getDoc(userRef);
        if (docSnap.exists() && docSnap.data().geminiApiKey) {
            return docSnap.data().geminiApiKey;
        }
        return null;
    } catch (e) {
        console.error('Error getting API key from Firestore:', e);
        return null;
    }
};
