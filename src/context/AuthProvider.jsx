import { useState, useEffect } from "react";
import axios from "../api/axios";
import AuthContext from "./authContext.jsx";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");

  const fetchUser = async () => {
    try {
      const res = await axios.get("/users/me");
      setUser(res.data.user);
    } catch {
      setUser(null);
    }
  };

  // Fetch all products
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/products");
        setProducts(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };



  useEffect(() => {
    fetchUser();
  }, []);


   // fetch all users (admin)
  const fetchUsers = async () => {
    if (user?.role !== "admin") return; // only admin
    try {
      const res = await axios.get("/users");
      setUsers(res.data || []);
    } catch (err) {
      console.error(err);
      setUsers([]);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const value = {
    user,
    setUser,
    fetchUser,
    fetchProducts,
    products,
    setProducts,
    loading,
    setLoading,
    message,
    setMessage,
    users,
    fetchUsers,
    setUsers,

    
  };
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
