import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyAnoOXzFyestEJ1q1Dw_hxZ01gcqBR1pFw",
    authDomain: "wayfinder-7867c.firebaseapp.com",
    projectId: "wayfinder-7867c",
    storageBucket: "wayfinder-7867c.firebasestorage.app",
    messagingSenderId: "50658069387",
    appId: "1:50658069387:web:a6d057f5be81bbd7b07d8e",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const realtimeDb = getDatabase(app);

export { auth, realtimeDb };
