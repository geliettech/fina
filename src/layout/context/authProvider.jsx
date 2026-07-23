import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router";
import { signOutUser } from "@/services/auth";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/services/firebase";
import { useEffect } from "react";



const AuthContext = createContext(null);

const normalizeUser = (currentUser) => {
  if (!currentUser) return null;

  return {
    ...currentUser,
    name: currentUser.displayName || currentUser.fullName || "",
    profilePic: currentUser.photoURL || currentUser.profilePic || "",
    userID: currentUser.uid || currentUser.userID || "",
    isAuth: true,
  };
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(normalizeUser(currentUser));
    });

    return unsubscribe;
  }, []);


  const logout = async () => {
    await signOutUser();

    setUser(null);
    navigate("/");
  };


  return (
    <AuthContext.Provider
      value={{
        user,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);