import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { auth } from "../firebase/config";

const login = () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
};
const logout = () => {
  return signOut(auth);
};

export { login, logout };
