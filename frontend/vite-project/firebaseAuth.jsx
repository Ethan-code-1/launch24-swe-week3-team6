import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { firebaseConfig } from "./firebase"; // ensure you have the correct path

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

// Sign up function
const signUp = async (email, password, username) => {
  
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    await setDoc(doc(db, "users", user.uid), {
      email: email,
      name: username,
      createdAt: new Date(),
      isAdmin: false
    });
    return user;
  
};

// Login function
const login = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// Logout function
const logout = () => {
  return signOut(auth);
};

export { auth, signUp, login, logout };
