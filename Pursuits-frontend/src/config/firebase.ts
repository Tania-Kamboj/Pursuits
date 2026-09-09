import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDfKA4kq3BeasL9ShUHhqnT2JAM-80JQpU",
  authDomain: "claritii-0906.firebaseapp.com",
  projectId: "claritii-0906",
  storageBucket: "claritii-0906.firebasestorage.app",
  messagingSenderId: "683773497600",
  appId: "1:683773497600:web:1f1addc972f9108c4aa3e5",
  measurementId: "G-4EWMT5STNB"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    
    const response = await fetch('http://localhost:5000/api/v1/auth/social-login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: user.displayName,
        email: user.email,
        provider: 'google',
        providerId: user.uid 
      })
    });
    
    const data = await response.json();
    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    
    return data;
  } catch (error) {
    console.error('Google login error:', error);
    throw error;
  }
}