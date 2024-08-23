import React from "react";
import { Link } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css"; 

const Footer = () => {
  return (
    <footer className="bg-gray-500 text-white py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-between text-center sm:text-left">
        <div className="w-full sm:w-1/2 lg:w-1/4 mb-6 flex flex-col items-center sm:items-start">
            <Link to={"/"}>
            <img 
              src="/logo.png"
              alt="logo" 
              className="w-16 h-auto mb-4 sm:w-20 lg:w-24 cursor-pointer" 
            />
            <h4 className="font-semibold text-xl mb-4 text-center sm:text-left cursor-pointer">Premium Estate</h4>
            </Link>
            <p className="text-gray-200 text-center sm:text-left">
              Your trusted partner in finding the best real estate properties.
            </p>
          </div>
          <di className="w-full sm:w-1/2 lg:w-1/4 mb-6 px-10">
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul>
              <li className="mb-2">
                <Link to="/about" className="hover:underline">
                  About Us
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/" className="hover:underline">
                  Contact
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/search?searchTerm=" className="hover:underline">
                  Listings
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/" className="hover:underline">
                  FAQ
                </Link>
              </li>
            </ul>
          </di>

     
          <div className="w-full sm:w-1/2 lg:w-1/4 mb-6">
            <h4 className="font-semibold text-lg mb-4">Follow Us</h4>
            <div className="flex justify-center sm:justify-start gap-4">
              <Link to="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-facebook fa-lg"></i>
              </Link>
              <Link to="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-twitter fa-lg"></i>
              </Link>
              <Link to="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-instagram fa-lg"></i>
              </Link>
              <Link to="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-linkedin fa-lg"></i>
              </Link>
            </div>
          </div>

     
          <div className="w-full sm:w-1/2 lg:w-1/4 mb-6">
            <h4 className="font-semibold text-lg mb-4">
              Subscribe to Our Newsletter
            </h4>
            <form>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 mb-4 text-gray-700 border border-gray-300 rounded-lg focus:outline-none"
              />
              <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

     
        <div className="mt-8 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} Premium Estate. All Rights
            Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
