import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "../api/axios";
import useAuth from "../context/useAuth";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "/users/logout",
        {},
        { withCredentials: true }
      );
      if (response.status === 200) {
        setUser(null);
        navigate("/login");
      }
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const isActive = (path) => location.pathname === path;

  // Links array with conditional admin link
  const links = [
    { name: "Home", path: "/" },
    { name: "Milk Entry", path: "/milk" },
    { name: "Products", path: "/products" },
    { name: "Sales", path: "/sales" },
    { name: "Users", path: "/users" },
  ];
  if (user?.role === "admin") {
    links.push({ name: "Dashboard", path: "/dashboard" });
  }

  return (
    <nav className="bg-green-600 text-white shadow-md relative z-50">
      <div className="container mx-auto flex justify-between items-center p-4 md:p-6">
        {/* Logo */}
        <Link
          to="/"
          className="font-bold text-xl md:text-2xl hover:text-gray-200"
        >
          Dairy System
        </Link>

        {/* Mobile toggle button */}
        <div className="md:hidden">
          <button
            onClick={() => setOpen(!open)}
            className="text-2xl focus:outline-none"
          >
            {open ? "✖" : "☰"}
          </button>
        </div>

        {/* Desktop menu */}
        <ul className="hidden md:flex md:items-center md:gap-6">
          {links.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`px-4 py-2 rounded-md hover:text-gray-200 transition ${
                  isActive(link.path) ? "underline font-bold" : ""
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}

          {user ? (
            <li>
              <button
                className="bg-white text-green-600 px-3 py-1 rounded-lg hover:bg-gray-200 transition"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          ) : (
            <>
              <li>
                <Link
                  to="/login"
                  className="bg-white text-green-600 px-3 py-1 rounded-lg hover:bg-gray-200 transition"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/signup"
                  className="bg-white text-green-600 px-3 py-1 rounded-lg hover:bg-gray-200 transition"
                >
                  Signup
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* Mobile slide-in menu from RIGHT */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-green-600 text-white transform transition-transform duration-300 z-50 shadow-lg ${
          open ? "translate-x-0" : "translate-x-full"
        } md:hidden`}
      >
        <ul className="flex flex-col mt-20 gap-4 px-4">
          {links.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`block px-4 py-2 rounded-md hover:bg-green-700 transition ${
                  isActive(link.path) ? "underline font-bold" : ""
                }`}
                onClick={() => setOpen(false)}
              >
                {link.name}
              </Link>
            </li>
          ))}

          {user ? (
            <li>
              <button
                className="w-full bg-white text-green-600 px-3 py-2 rounded-lg hover:bg-gray-200 transition"
                onClick={() => {
                  handleLogout();
                  setOpen(false);
                }}
              >
                Logout
              </button>
            </li>
          ) : (
            <>
              <li>
                <Link
                  to="/login"
                  className="block w-full bg-white text-green-600 px-3 py-2 rounded-lg hover:bg-gray-200 transition"
                  onClick={() => setOpen(false)}
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/signup"
                  className="block w-full bg-white text-green-600 px-3 py-2 rounded-lg hover:bg-gray-200 transition"
                  onClick={() => setOpen(false)}
                >
                  Signup
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black opacity-30 z-40"
          onClick={() => setOpen(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;
