import React, { useState } from 'react';
import { FaPlus, FaMinus } from "react-icons/fa";
import { FcFaq } from "react-icons/fc";
function Faqs() {

    const nexusQA = [
        {
            question: "What is Business Nexus?",
            answer: "Business Nexus is a platform that connects startups and entrepreneurs with investors, mentors, and growth opportunities."
        },
        {
            question: "Who can join the platform?",
            answer: "Entrepreneurs, early-stage startups, angel investors, venture capitalists, and business mentors are all welcome to join."
        },
        {
            question: "Is there a fee to join Business Nexus?",
            answer: "Basic membership is free for both entrepreneurs and investors. Premium features, like advanced analytics and curated pitch events, may require a subscription."
        },
        {
            question: "How are investors verified on the platform?",
            answer: "All investors undergo a manual verification process where credentials and funding history are reviewed by our team to ensure authenticity."
        },
        {
            question: "How does Business Nexus ensure data privacy?",
            answer: "We use secure servers and encrypted communication to protect user data, and we never share information without consent."
        }
    ];

    const [openIndex, setOpenIndex] = useState(null);

    const handleToggle = (index) => {
        setOpenIndex(prev => prev === index ? null : index);
    };

    return (
        <div className='sm:mx-24 mx-4 mb-4 sm:mt-4 mt-8'>
            <h1 className='flex items-center justify-center gap-2 sm:text-3xl text-xl text-orange-600 font-bold sm:mb-4 mb-6'>Frequently Asked Questions <FcFaq className=''/></h1>
            {nexusQA.map((item, index) => (
                <div key={index} className={`mb-6 ${index === nexusQA.length-1 ? 'border-0' : 'border-b border-gray-700'}  pb-4`}>
                    <div className='flex justify-between items-center cursor-pointer' onClick={() => handleToggle(index)}>
                        <h3 className="text-xl font-semibold text-orange-500">{item.question}</h3>
                        {openIndex === index ? (
                            <FaMinus className='text-orange-500' />
                        ) : (
                            <FaPlus className='text-orange-500' />
                        )}
                    </div>
                    {openIndex === index && (
                        <p className="text-gray-200 mt-2 text-base">{item.answer}</p>
                    )}
                </div>
            ))}
        </div>
    )
}

export default Faqs;