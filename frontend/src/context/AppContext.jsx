import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export const AppContext = createContext();


export const AppContextProvider = ({ children }) => {
  const backend = import.meta.env.VITE_BACKEND_URL;
  //const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [showUserLogin, setShowUserLogin] = useState(false);

  

  // ------------------ FETCH USER ------------------
  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/user/is-auth");

      if (data.success) {
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (err) {
      setUser(null);
    }
  };

// ------------------ INITIAL LOAD ------------------
  useEffect(() => {
    fetchUser();
  }, []);
  
  

  const value = {
    user,
    setUser,
    showUserLogin,
    setShowUserLogin,
    backend,
    axios,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);