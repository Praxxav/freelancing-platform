import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'; // Font Awesome Icons for stars
import axios from 'axios';

interface ServiceCardProps {
  titles: string[];
  description: string;
  price: string;
  imageUrl: string;
  rating: number; // Add rating prop
  userId: number; // Add userId prop for payment
  projectId: number; // Add projectId prop for payment
}

const ServiceCard: React.FC<ServiceCardProps> = ({ titles, description, price, imageUrl, rating, userId, projectId }) => {
  const renderStars = () => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex space-x-1 text-yellow-500">
        {Array(fullStars).fill(<FaStar key={`full-${Math.random()}`} />)}
        {hasHalfStar && <FaStarHalfAlt key={`half-${Math.random()}`} />}
        {Array(emptyStars).fill(<FaRegStar key={`empty-${Math.random()}`} />)}
      </div>
    );
  };

  const handleBuyNow = async () => {
    try {
      // Step 1: Create an order by calling your backend API
      const orderResponse = await axios.post('/api/payment/create-order', {
        amount: parseFloat(price.replace(/[^0-9.-]+/g, '')), // Extract amount from price
        currency: 'INR', // Assuming INR currency
        userId: userId,
        projectId: projectId,
      });

      const { orderId } = orderResponse.data;

      // Step 2: Initialize Razorpay and open the checkout form
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID, // Get Razorpay key from .env
        amount: parseFloat(price.replace(/[^0-9.-]+/g, '')) * 100, // Razorpay expects the amount in paise
        currency: 'INR',
        name: 'Pro Connect',
        description: 'Service Payment',
        order_id: orderId, // Pass the order ID returned by backend
        handler: async (response: any) => {
          // Step 3: Verify payment after Razorpay completes the payment
          const verifyResponse = await axios.post('/api/payment/verify', {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            userId: userId,
            projectId: projectId,
          });

          if (verifyResponse.data.status === 'success') {
            alert('Payment Successful');
          } else {
            alert('Payment Verification Failed');
          }
        },
        prefill: {
          name: 'Your Name', // You can prefill these details
          email: 'email@example.com',
        },
        theme: {
          color: '#F37254',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-400 overflow-hidden hover:shadow-2xl transition-shadow duration-300 w-full sm:w-64">
      {/* Ensuring the image is displayed properly */}
      <div className="w-full h-32">
        <img src={imageUrl} alt={titles.join(', ')} className="w-full h-full object-cover" />
      </div>
      <div className="p-4">
        <div className="space-y-1">
          {titles.map((title, index) => (
            <h3 key={index} className="text-md font-semibold">{title}</h3>
          ))}
        </div>
        <p className="text-gray-500 text-sm">{description}</p>
        <p className="text-gray-800 font-bold mb-2 text-sm">{price}</p>
        {renderStars()}
        <button
          onClick={handleBuyNow}
          className="mt-4 bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

const ServicesPage: React.FC = () => {
  const userId = 1; // Replace with actual user ID
  const projectId = 1; // Replace with actual project ID

  return (
    <div className="flex min-h-screen bg-gray-100 p-2">
      <div className="flex-1 min-w-0 p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <ServiceCard 
            titles={["Logo Design", "Minimalist Approach"]}
            description="Creative logos for your brand, focusing on modern, clean design."
            price="$50.00" 
            imageUrl="https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/127707871/original/58036eaa037a90f7230bfc551916036a455c3e4b/design-modern-minimalist-business-logo.jpg"
            rating={4.5}
            userId={userId}
            projectId={projectId}
          />
          <ServiceCard 
            titles={["Database-Redesign","Prisma-ORM"]}
            description="Professional approach to database redesign and ORM integration."
            price="$300.00" 
            imageUrl="https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/192945874/original/45074ea0dfcd30781722c0cc82cdd54355d2102d/do-minimal-logo-design.jpg" 
            rating={4.0}
            userId={userId}
            projectId={projectId}
          />
          <ServiceCard 
            titles={["Content Writing", "SEO Optimized"]}
            description="Researched, SEO-Optimized content for blogs, websites, and more."
            price="$40.00" 
            imageUrl="https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/115533372/original/36a26451dd7876335f8f646d41edf6868bea0a93/do-modern-minimalist-logo-design-for-your-business.jpg" 
            rating={5.0}
            userId={userId}
            projectId={projectId}
          />
          {/* Add more ServiceCard components as needed */}
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
