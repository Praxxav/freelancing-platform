import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiMoon, HiSun, HiSearch, HiChevronDown, HiUserAdd } from 'react-icons/hi';

interface NavBarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const suggestions = [
  "Data Entry",
  "Web Development",
  "Graphic Design",
  "Content Writing",
  "Digital Marketing",
  "SEO Optimization",
  "Social Media Management",
  "Translation Services",
  // Add more suggestions here
];

const NavBar: React.FC<NavBarProps> = ({ darkMode, toggleDarkMode }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [findTalentDropdownOpen, setFindTalentDropdownOpen] = useState<boolean>(false);
  const [findWorkDropdownOpen, setFindWorkDropdownOpen] = useState<boolean>(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality here
    console.log('Search query:', searchQuery);
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="text-2xl font-bold">
          <Link to="/">ProConnect</Link>
        </div>
        <div className="flex items-center space-x-4 relative">
          <form onSubmit={handleSearchSubmit} className="relative ml-4">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search..."
              className={`pl-10 pr-4 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-green-500 ${darkMode ? 'bg-white text-gray-900 border-gray-700' : 'bg-white text-gray-900 border-gray-300'}`}
            />
            <HiSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
            {filteredSuggestions.length > 0 && (
              <div className={`absolute left-0 right-0 mt-2 border border-gray-200 rounded-lg max-h-60 overflow-y-auto ${darkMode ? 'bg-white text-gray-900 border-gray-700' : 'bg-white text-gray-900'}`}>
                {filteredSuggestions.map((suggestion, index) => (
                  <Link
                    key={index}
                    to={`/search?query=${encodeURIComponent(suggestion)}`}
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setSearchQuery('')}
                  >
                    {suggestion}
                  </Link>
                ))}
              </div>
            )}
          </form>

          {/* Find Talent Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setFindTalentDropdownOpen(true)}
            onMouseLeave={() => setFindTalentDropdownOpen(false)}
          >
            <button className="flex items-center space-x-1 hover:text-green-500">
              <span>Find Talent</span>
              <HiChevronDown className="text-gray-500" />
            </button>
            {findTalentDropdownOpen && (
              <div className={`absolute right-0 mt-2 border border-gray-200 rounded-lg w-48 ${darkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-900'}`}>
                <Link to="/services/data-entry" className="block px-4 py-2 hover:bg-gray-100">Data Entry</Link>
                <Link to="/services/web-development" className="block px-4 py-2 hover:bg-gray-100">Web Development</Link>
                <Link to="/services/graphic-design" className="block px-4 py-2 hover:bg-gray-100">Graphic Design</Link>
                {/* Add more services here */}
              </div>
            )}
          </div>

          {/* Find Work Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setFindWorkDropdownOpen(true)}
            onMouseLeave={() => setFindWorkDropdownOpen(false)}
          >
            <button className="flex items-center space-x-1 hover:text-green-500">
              <span>Find Work</span>
              <HiChevronDown className="text-gray-500" />
            </button>
            {findWorkDropdownOpen && (
              <div className={`absolute right-0 mt-2 border border-gray-200 rounded-lg w-48 ${darkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-900'}`}>
                <Link to="/work/freelance" className="block px-4 py-2 hover:bg-gray-100">Freelance Jobs</Link>
                <Link to="/work/full-time" className="block px-4 py-2 hover:bg-gray-100">Full-Time Jobs</Link>
                <Link to="/work/part-time" className="block px-4 py-2 hover:bg-gray-100">Part-Time Jobs</Link>
                {/* Add more job types here */}
              </div>
            )}
          </div>

          <Link to="/about" className="hover:text-green-500">About</Link>
          <Link to="/contact" className="hover:text-green-500">Signin</Link>

          {/* Signup Button */}
          <Link to="/signup" className="flex items-center text-green-500">
            <HiUserAdd className="mr-2" />
            Signup
          </Link>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="ml-4 p-2 rounded hover:bg-gray-200"
          >
            {darkMode ? <HiSun size={24} /> : <HiMoon size={24} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
