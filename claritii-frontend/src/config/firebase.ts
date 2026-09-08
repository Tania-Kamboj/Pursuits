import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

// ✅ Yahan apni Firebase Console ki REAL keys paste karo
const firebaseConfig = {
  apiKey: "AIzaSyD...", // Firebase Console se copy karo
  authDomain: "claritii-xxxxx.firebaseapp.com",
  projectId: "claritii-xxxxx",
  storageBucket: "claritii-xxxxx.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Google Login Function
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    
    // Backend ko user data bhejo
    const response = await fetch('http://localhost:5000/api/v1/auth/social-login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: user.displayName,
        email: user.email,
        provider: 'google',
        providerId: user.uid // Note: backend me humne providerId manga tha
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