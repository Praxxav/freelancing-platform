import React from 'react';
import ServicesPage from "../component/ui/ServicesCard";
import { TopNav } from "../component/ui/TopNav";
import { Sidebar } from "../component/ui/Sidebar";

export const Services: React.FC = () => {
  // List of services for filtering in the Sidebar
  const servicesList = ["Web Development", "Logo Design", "Content Writing","Web & App Design",
   " Writing & Translation",
    "Music & Audio",
    "Business",
    "Consulting",
    "AI Services"];

  // Filter handling for the sidebar (can be extended)
  const handleApplyFilter = (selectedServices: string[]) => {
    // Logic for applying the filter based on selected services
    console.log('Selected Services:', selectedServices);
  };

  return (
    <div className=''>
      {/* Top Navigation */}
      <TopNav />

      <div className="flex">
        {/* Sidebar for filtering services */}
        <Sidebar services={servicesList} onApplyFilter={handleApplyFilter} />

        {/* Main content area */}
        
        <ServicesPage children={undefined} />

      </div>
    
    </div>
  );
};

export default Services;
