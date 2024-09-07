import React, { useState } from 'react';
import { FaExchangeAlt, FaUpload, FaUser, FaCog, FaSignOutAlt, FaShoppingCart } from 'react-icons/fa'; // Importing icons from react-icons

export const TopNav: React.FC = () => {
  const [isSellerMode, setIsSellerMode] = useState(false); // State to manage mode
  const [timeoutMessage, setTimeoutMessage] = useState<string | null>(null); // State to manage timeout message

  const handleModeChange = () => {
    setIsSellerMode(prevMode => !prevMode); // Toggle mode

    // Set a timeout to display a message or perform an action after 3 seconds
    setTimeout(() => {
      setTimeoutMessage("You are now in Seller Mode!");
      setTimeout(() => {
        setTimeoutMessage(null); // Clear message after 3 seconds
      }, 3000);
    }, 3000);
  };

  const handleUploadGigs = () => {
    // Logic to redirect to the 'gig' page
    window.location.href = "/gig";
  };

  return (
    <nav className="flex justify-between items-center py-4 px-6 bg-white shadow-md border-b border-gray-200">
      <div className="text-2xl font-bold text-gray-800">
        <a href="/">Pro Connect</a>
      </div>
      <div className="flex items-center space-x-6">
        <button 
          onClick={handleModeChange} 
          className="flex items-center text-gray-700 hover:text-green-600 focus:outline-none transition duration-300"
        >
          {isSellerMode ? (
            <>
              <FaShoppingCart className="text-xl mr-2" />
              <span className="font-medium">Switch to Buyer Mode</span>
            </>
          ) : (
            <>
              <FaExchangeAlt className="text-xl mr-2" />
              <span className="font-medium">Switch to Seller Mode</span>
            </>
          )}
        </button>
        <a href="/Profile" className="flex items-center text-gray-700 hover:text-green-600 font-medium transition duration-300">
          <FaUser className="text-xl mr-2" />
          Profile
        </a>
        <a href="/Settings" className="flex items-center text-gray-700 hover:text-green-600 font-medium transition duration-300">
          <FaCog className="text-xl mr-2" />
          Settings
        </a>
        {isSellerMode && ( // Conditionally render button based on mode
          <button 
            onClick={handleUploadGigs} 
            className="flex items-center bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 focus:outline-none transition duration-300"
          >
            <FaUpload className="text-xl mr-2" />
            <span className="font-medium">Upload Gigs</span>
          </button>
        )}
        <button className="flex items-center bg-gray-800 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-700 focus:outline-none transition duration-300">
          <FaSignOutAlt className="text-xl mr-2" />
          Logout
        </button>
      </div>
      {timeoutMessage && (
        <div className="absolute top-0 right-0 mt-4 mr-6 bg-green-100 text-green-800 px-4 py-2 rounded-lg shadow-md">
          {timeoutMessage}
        </div>
      )}
    </nav>
  );
};

export default TopNav;
