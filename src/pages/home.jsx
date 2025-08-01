import React, { useContext } from 'react';
import Faqs from '../components/faqs';
import { FaHandshake, FaLightbulb, FaRocket } from 'react-icons/fa';
import Footer from '../components/footer.jsx';
import LiveStats from '../components/livestats.jsx';
import { AppContext } from '../context/AppContext.jsx';
import { Link } from 'react-router-dom';

function Home() {
    const { token } = useContext(AppContext);
    return (
        <>
            <section className="sm:py-20  sm:px-6 p-6 bg-gray-900 text-white">
                {/* Tagline & Intro */}
                <div className="max-w-5xl mx-auto text-center mb-16">
                    <h1 className="text-4xl sm:text-5xl font-bold text-orange-500 leading-tight mb-4">
                        Bridging Dreams with Capital
                    </h1>
                    <p className="text-lg sm:text-xl text-white max-w-3xl mx-auto italic">
                        Business Nexus connects passionate entrepreneurs with visionary investors.
                        Build impactful partnerships, secure funding, and bring your ideas to life — all in one place.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex justify-center gap-4 mt-8">

                        <Link
                            to="/login"
                            className={`px-6 py-3 bg-orange-500 text-white font-semibold rounded hover:bg-orange-600 transition ${token ? 'pointer-events-none' : 'cursor-pointer'}`}>
                            Get Started
                        </Link>
                        <Link
                            to="/about"
                            className="px-6 py-3 bg-orange-500 text-white font-semibold rounded hover:bg-orange-600 transition">
                            Learn more
                        </Link>
                    </div>
                </div>

                {/* Feature Highlights */}
                <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
                    <div className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-orange-500 transition">
                        <FaHandshake className="text-orange-500 text-4xl mb-4 mx-auto" />
                        <h3 className="text-xl font-bold mb-2 text-center text-orange-500">Meaningful Connections</h3>
                        <p className="text-gray-300 text-center">
                            Discover and connect with entrepreneurs or investors who align with your vision and goals.
                        </p>
                    </div>

                    <div className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-orange-500 transition">
                        <FaLightbulb className="text-orange-500 text-4xl mb-4 mx-auto" />
                        <h3 className="text-xl font-bold mb-2 text-center text-orange-500">Pitch Your Idea</h3>
                        <p className="text-gray-300 text-center">
                            Showcase your startup concept, receive investor interest, and gain valuable feedback.
                        </p>
                    </div>

                    <div className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-orange-500 transition">
                        <FaRocket className="text-orange-500 text-4xl mb-4 mx-auto" />
                        <h3 className="text-xl font-bold mb-2 text-center text-orange-500">Accelerate Growth</h3>
                        <p className="text-gray-300 text-center">
                            Collaborate, fund, and scale your startup with real-time tools and a trusted network.
                        </p>
                    </div>
                </div>

            </section>
            <LiveStats />
            <Faqs />
            <Footer />
        </>
    );
}

export default Home;
