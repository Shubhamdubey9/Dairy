import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthProvider from "./context/AuthProvider.jsx";
import Navbar from "./components/Navbar.jsx";
import Home from "./page/HomePage.jsx";
import Footer from "./components/Footer.jsx";
import Product from "./page/Product.jsx";
import Signup from "./Auth.js/Signup.jsx";
import Login from "./Auth.js/Login.jsx";
import { useContext, useEffect } from "react";
import authContext from "./context/authContext.jsx";
import axios from "./api/axios.js";
import MilkEntry from "./page/MilkEntry.jsx";
import User from "./page/user.jsx";
import Dashboard from "./Dashboard/Dashboard.jsx";

function AppContent() {
  const {fetchUser } = useContext(authContext);

  
  useEffect(() => {
    fetchUser();    
  }, []);
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/users" element={<User />} />
        <Route path="/products" element={<Product />} />
        <Route path="/milk" element={<MilkEntry />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* Add more routes as needed */}
      </Routes>
      <Footer />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
