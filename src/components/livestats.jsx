import React from 'react';
import { FaUserTie, FaRocket, FaHandshake } from 'react-icons/fa';

function LiveStats() {

  const stats = [
    {
      id: 1,
      icon: <FaRocket className="text-4xl text-white" />,
      label: "Verified Startups",
      value: "120+",
    },
    {
      id: 2,
      icon: <FaUserTie className="text-4xl text-white" />,
      label: "Active Investors",
      value: "85+",
    },
    {
      id: 3,
      icon: <FaHandshake className="text-4xl text-white" />,
      label: "Connections Made",
      value: "250+",
    },
  ];

  return (
    <div className="py-12">

      <h2 className="text-center text-3xl sm:text-4xl font-bold text-gray-100 mb-10">
        Live Stats on <span className="text-orange-500">Business Nexus</span>
      </h2>

      <div className="max-w-6xl mx-auto grid gap-8 grid-cols-1 sm:grid-cols-3 px-6">
        {stats.map((item) => (
          <div key={item.id} className="bg-gray-700 shadow-inner shadow-gray-500 rounded-lg p-6 text-center border-t-4 border-b-4 border-orange-500">
            <div className="mb-6 flex justify-center">{item.icon}</div>
            <h3 className="text-4xl font-bold text-orange-500 animate-fade">{item.value}</h3>  
            <p className="text-gray-200 text-xl mt-4">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LiveStats;