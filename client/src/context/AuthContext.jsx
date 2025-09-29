import { createContext, useState, useContext, useEffect } from "react";
import axiosClient from "../api/axiosClient";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore user if token exists
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axiosClient
        .get("/auth/me") // backend should return current user info
        .then((res) => {
          setUser(res.data.user);
        })
        .catch(() => {
          localStorage.removeItem("token"); // invalid token
          setUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  // Login function
  const login = async (email, password) => {
    const { data } = await axiosClient.post("/auth/login", { email, password });

    if (data?.token) {
      localStorage.setItem("token", data.token);
      setUser(data.user); // assuming API returns { user, token }
    }

    return data;
  };

   // Register function
  const register = async (name, email, password) => {
    const { data } = await axiosClient.post("/auth/register", {
      name,
      email,
      password,
    });

    if (data?.token) {
      localStorage.setItem("token", data.token);
      setUser(data.user);
    }

    return data;
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook (inside same file for simplicity)
export const useAuth = () => {
  return useContext(AuthContext);
};
