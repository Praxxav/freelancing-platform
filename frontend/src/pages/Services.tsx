import React from 'react';
import {TopNav} from "../component/ui/TopNav"

interface ServiceCardProps {
  titles: string[];
  description: string;
  price: string;
  imageUrl: string;
}

 const ServiceCard: React.FC<ServiceCardProps> = ({ titles, description, price, imageUrl }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-400 overflow-hidden hover:shadow-2xl transition-shadow duration-300">
      <img src={imageUrl} alt={titles.join(', ')} className="w-full h-48 object-cover" />
      <div className="p-4">
        <div className="space-y-1">
          {titles.map((title, index) => (
            <h3 key={index} className="text-lg font-semibold">{title}</h3>
          ))}
        </div>
        <p className="text-gray-500">{description}</p>
        <p className="text-gray-800 font-bold">{price}</p>
      </div>
    </div>
  );
};

const ServicesPage: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      <div className="fixed top-0 left-0 w-64 h-full bg-gray-800 text-white">
       
      </div>
      <div className="ml-64 flex-1 flex flex-col">
        <div className="fixed top-0 left-64 right-0 bg-white shadow-md z-10">
          <TopNav />
        </div>
        <main className="flex-1 mt-16 p-6 bg-gray-100">
          <div className="grid grid-cols-3 gap-6">
            <ServiceCard 
              titles={["Logo Design", "Minimalist Approach"]}
              description="Creative logos for your brand, focusing on modern, clean design."
              price="$50.00" 
              imageUrl="https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/127707871/original/58036eaa037a90f7230bfc551916036a455c3e4b/design-modern-minimalist-business-logo.jpg" 
            />
            <ServiceCard 
              titles={["Web Development", "Responsive Websites"]}
              description="Professional and responsive websites tailored for your business needs."
              price="$300.00" 
              imageUrl="https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/192945874/original/45074ea0dfcd30781722c0cc82cdd54355d2102d/do-minimal-logo-design.jpg" 
            />
            <ServiceCard 
              titles={["Content Writing", "SEO Optimized"]}
              description="Well-researched, SEO-friendly content for blogs, websites, and more."
              price="$40.00" 
              imageUrl="https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/115533372/original/36a26451dd7876335f8f646d41edf6868bea0a93/do-modern-minimalist-logo-design-for-your-business.jpg" 
            />
            {/* Add more ServiceCard components here */}
          </div>
          {children}
        </main>
      </div>
    </div>
  );
};

export default ServicesPage;
