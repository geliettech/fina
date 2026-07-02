import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router";
import { signOut } from "firebase/auth"
import { auth } from "../../config/firebase"


const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const storedUser = JSON.parse(localStorage.getItem("auth") || "null");
  const [user, setUser] = useState(storedUser);
  const navigate = useNavigate();


  const login = (userData) => {
    setUser(userData);
  };


  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      navigate("/");
      localStorage.clear();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);