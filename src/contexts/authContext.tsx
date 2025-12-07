import { createContext, useContext, useEffect, useState } from "react";
import { getMe } from "../services/auth";

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      getMe()
        .then((res) => {
          setUser(res.data);
          localStorage.setItem("user", JSON.stringify(res.data));
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
