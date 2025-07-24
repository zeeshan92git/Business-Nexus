import React from 'react';
import { PiHandshakeFill } from "react-icons/pi";
import { BiSolidLabel } from "react-icons/bi";
import Footer from "../components/footer.jsx";
const About = () => {
  return (
    <>
      <section id="about" className="py-20 px-6 text-white">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">

          {/* Icon / Image Section */}
          <div className="flex justify-center md:w-1/2">
            <div className="bg-white rounded-full p-8 shadow-lg animate-pulse-slow">
              <PiHandshakeFill className="text-orange-500 text-7xl" />
            </div>
          </div>

          {/* Text Section */}
          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-4xl sm:text-5xl font-bold text-orange-500 mb-4">
              About Business Nexus
            </h2>

            <p className="text-lg sm:text-xl text-gray-300 mb-6 leading-relaxed">
              Business Nexus is a professional networking hub built to empower visionaries.
              Whether you're an aspiring entrepreneur or an experienced investor, our platform enables you to connect, collaborate,
              and build meaningful partnerships in real-time.
            </p>

            <ul className="text-base sm:text-lg text-gray-400 space-y-2 font-medium">
              <li className='flex gap-2 items-center'><BiSolidLabel className='text-green-500 text-xl' /> Register as an Entrepreneur or Investor</li>
              <li className='flex gap-2 items-center'><BiSolidLabel className='text-green-500 text-xl' /> Explore verified profiles and business ideas</li>
              <li className='flex gap-2 items-center'><BiSolidLabel className='text-green-500 text-xl' /> Send collaboration requests seamlessly</li>
              <li className='flex gap-2 items-center'><BiSolidLabel className='text-green-500 text-xl' />Chat in real-time with potential partners</li>
            </ul>
          </div>

        </div>
      </section>
      <Footer />
    </>
  );
};

export default About;
