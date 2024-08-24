// src/components/LandingPage.tsx
import React from 'react';
import NavBar from './navbar';

const LandingPage: React.FC = () => {
  const [darkMode, setDarkMode] = React.useState(false);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div className={darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}>
      <NavBar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <header className="flex flex-col items-center justify-center h-screen bg-cover bg-center" style={{ backgroundImage: "url('your-hero-image-url.jpg')" }}>
        <h1 className="text-5xl font-bold mb-4">Find Your Dream Job or Freelancer</h1>
        <p className="text-lg mb-8">Connecting talented professionals with top companies.</p>
        <a href="#get-started" className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600">Get Started</a>
      </header>
      <section id="get-started" className="py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">How It Works</h2>
          <div className="flex flex-col md:flex-row justify-around">
            <div className="md:w-1/3 p-4">
              <h3 className="text-xl font-semibold mb-2">Find Talent</h3>
              <p>Search for the best freelancers for your project.</p>
            </div>
            <div className="md:w-1/3 p-4">
              <h3 className="text-xl font-semibold mb-2">Hire Professionals</h3>
              <p>Hire the perfect candidate for your job.</p>
            </div>
            <div className="md:w-1/3 p-4">
              <h3 className="text-xl font-semibold mb-2">Get Work Done</h3>
              <p>Get your projects completed with high quality.</p>
            </div>
          </div>
        </div>
      </section>
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 FreelanceHub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
