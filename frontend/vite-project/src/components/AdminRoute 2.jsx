// AdminRoute.jsx
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { getAuth } from "firebase/auth";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";

const AdminRoute = ({ element: Element }) => {
  const [isAdmin, setIsAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    const checkAdmin = async () => {
      if (user) {
        const email = user.email;
        const db = getFirestore();
        const q = query(collection(db, 'users'), where('email', '==', email));
        const querySnapshot = await getDocs(q);
        let adminStatus = false;
        querySnapshot.forEach((doc) => {
          adminStatus = doc.data().isAdmin;
        });
        setIsAdmin(adminStatus);
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    };
    checkAdmin();
  }, [user]);

  if (loading) {
    return <div>Loading...</div>; // Add a loading indicator
  }

  return isAdmin ? <Element /> : <Navigate to="/" replace />;
};

export default AdminRoute;
