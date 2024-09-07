import React, { useState } from 'react';

interface SidebarProps {
  services: string[];
  onApplyFilter: (selectedServices: string[]) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ services, onApplyFilter }) => {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const handleCheckboxChange = (service: string) => {
    setSelectedServices((prevSelected) =>
      prevSelected.includes(service)
        ? prevSelected.filter((s) => s !== service)
        : [...prevSelected, service]
    );
  };

  const handleApply = () => {
    onApplyFilter(selectedServices);
  };

  return (
    <div className="w-64 h-full bg-white text-black p-4 max-h-screen overflow-y-auto">
      <h3 className="text-lg font-semibold mb-4">Filter by Services</h3>
      <div className="space-y-2">
        {services.map((service, index) => (
          <div key={index} className="flex items-center space-x-2">
            <input
              type="checkbox"
              id={service}
              checked={selectedServices.includes(service)}
              onChange={() => handleCheckboxChange(service)}
              className="form-checkbox h-4 w-4 text-gray-700"
            />
            <label htmlFor={service} className="text-sm">
              {service}
            </label>
          </div>
        ))}
      </div>
      <button
        onClick={handleApply}
        className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
      >
        Apply
      </button>
    </div>
  );
};
