import React from 'react'
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="bg-green-600 text-white mt-12">
      <div className="container mx-auto px-4 py-8 grid md:grid-cols-3 gap-6">
        {/* About */}
        <div>
          <h2 className="font-bold text-xl mb-2">Dairy System</h2>
          <p>
            Providing fresh dairy products directly from farm to your home.
            Quality you can trust!
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="font-bold text-xl mb-2">Quick Links</h2>
          <ul>
            <li>
              <Link to="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link to="/products" className="hover:underline">
                Products
              </Link>
            </li>
            <li>
              <Link to="/sales" className="hover:underline">
                Sales
              </Link>
            </li>
            <li>
              <Link to="/dashboard" className="hover:underline">
                Dashboard
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h2 className="font-bold text-xl mb-2">Contact</h2>
          <p>Email: info@dairysystem.com</p>
          <p>Phone: +91 9876543210</p>
          <p>Address: 123 Milk Street, Farmville</p>
        </div>
      </div>

      {/* Bottom */}
      <div className="bg-green-700 text-center py-4 mt-4">
        <p>
          &copy; {new Date().getFullYear()} Dairy System. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer