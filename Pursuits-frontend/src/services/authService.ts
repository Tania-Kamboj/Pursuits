import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail
} from "firebase/auth";
import { auth } from "@/config/firebase";

export const authService = {
  // ✅ Firebase Register
  register: async (name: string, email: string, password: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    // User ka naam set karo
    await updateProfile(userCredential.user, {
      displayName: name
    });
    
    return userCredential.user;
  },

  // ✅ Firebase Login
  login: async (email: string, password: string) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  },

  // ✅ Firebase Forgot Password
  forgotPassword: async (email: string) => {
    await sendPasswordResetEmail(auth, email);
  }
};