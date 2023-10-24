import { useState, useEffect } from "react";
import { auth } from "../firebase/config";

const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setUser({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        token: await user.getIdToken(),
      });
    });
    return () => unsubscribe();
  }, []);

  return user;
};

export default useAuth;
