import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyC13zTcOIKiKo_UKQTjWjtV9-V7wDFIy74",
  authDomain: "pursuits-05.firebaseapp.com",
  projectId: "pursuits-05",
  storageBucket: "pursuits-05.firebasestorage.app",
  messagingSenderId: "221945595343",
  appId: "1:221945595343:web:89a9ae8779290be100feba",
  measurementId: "G-70J6D9DN9W"
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