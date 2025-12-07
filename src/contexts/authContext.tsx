import { createContext, useContext, useEffect, useState } from "react";
import { getMe } from "../services/auth";

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState(() => {
  try {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  } catch (err) {
    console.warn("Failed to parse user from localStorage", err);
    localStorage.removeItem("user"); // clean bad value
    return null;
  }});

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token) {
        getMe()
        .then((res) => {
          const fetchedUser = res.user; 
          if (fetchedUser) {
            setUser(fetchedUser);
            localStorage.setItem("user", JSON.stringify(fetchedUser));
          } else {
            setUser(null);
            localStorage.removeItem("user");
          }
        })
        .catch(() => {
          setUser(null);
          localStorage.clear();
        })
        .finally(() => setLoading(false));
    } else {
        setUser(null);
        setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
