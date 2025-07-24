import React, { useContext, useEffect, useState } from 'react';
import { FaHome, FaSignOutAlt } from 'react-icons/fa';
import { MdPeopleAlt } from "react-icons/md";
import { ImProfile } from "react-icons/im";
import { RiSendPlaneFill } from "react-icons/ri";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { IoPersonAdd } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { IoChatboxEllipsesSharp } from "react-icons/io5";
import ChatBox from '../components/chatBox.jsx';
import Investor from './investor.jsx';
import Entreprenuer from './entreprenuer.jsx';
import { AppContext } from '../context/AppContext.jsx';
import { toast } from 'react-toastify';
import axios from 'axios';

function Dashboard() {
  const { handleLogOut, token, backEndURL, profile, collabs, fetchMyRequests,
    myRequests, setConnectionMap, activeChat } = useContext(AppContext);

  const [activeSection, setActiveSection] = useState('dashboard');

  const respondToRequest = async (connectionId, status, targetId) => {
    try {
      const { data } = await axios.post(backEndURL + '/api/connection/respond', {
        connectionId: connectionId,
        status: status
      });
      if (data.success) {
        toast.success(data?.message);
        console.log(data?.message);
        setConnectionMap(prev => ({
          ...prev,
          [targetId]: status,
          [profile._id]: status
        }));
        // Optionally remove from myRequests list after response
        await fetchMyRequests();
      } else {
        toast.error(data.message);
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.message || "Failed in respond to request");
    }
  };


  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">

      {/* Topbar for lg screens */}
      <header className="fixed left-64 w-full z-50 bg-gray-900 px-4 py-3 hidden sm:flex items-center  border-b border-gray-800">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveSection('dashboard')}>
          <FaHome className="text-2xl text-orange-500" />
          <div className="text-2xl font-bold text-orange-500">Dashboard</div>
        </div>
      </header>

      {/* Topbar for lg screens */}
      <header className="fixed  w-full bg-gray-800 px-4 py-3 flex items-center  border-b border-gray-800">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveSection('dashboard')}>
          <FaHome className="text-2xl text-orange-500" />
          <div className="text-2xl font-bold text-orange-500">Dashboard</div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="hidden md:flex flex-col w-64 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white p-4 fixed h-screen">
          <nav className="flex flex-col gap-6 mt-4">
            <a href="/profile" className="flex items-center text-xl gap-3 hover:text-orange-500">
              <ImProfile /> Profile
            </a>
            <button onClick={() => setActiveSection('connections')} className="flex items-center gap-3 text-xl hover:text-orange-500 text-left">
              <MdPeopleAlt />
              {profile.role === 'investor' ? 'Entrepreneurs' : 'Investors'}
            </button>
            <button onClick={() => { setActiveSection('requests'); fetchMyRequests(); }} className="flex items-center gap-3 text-xl hover:text-orange-500 text-left">
              <RiSendPlaneFill /> Collab Requests
            </button>
            <button onClick={handleLogOut} className={`flex items-center gap-3 text-xl hover:text-orange-500 mt-auto ${token ? 'cursor-pointer' : 'pointer-events-none'}`}>
              <FaSignOutAlt /> Logout
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 md:ml-64 px-4 py-6 sm:pt-20 pt-24  w-full">
          {/* DASHBOARD */}
          {activeSection === 'dashboard' && (
            <div className="flex flex-col sm:flex-row gap-4">
              <div onClick={() => { setActiveSection('connections');  }} className="bg-white text-black px-6 py-4 rounded-xl shadow-md hover:shadow-lg transition w-full sm:w-1/3 cursor-pointer">
                <h1 className='text-[22px] text-orange-500 font-bold flex items-center gap-2 mb-1'>
                  <FaMoneyBillTrendUp className='text-2xl' />
                  {profile.role === 'investor' ? 'Interested Entrepreneurs' : 'Interested Investors'}
                </h1>
                <p className='text-gray-500 mt-2'>Accepted Collaborations</p>
                <span className='text-3xl font-bold'>{collabs.length}</span>
              </div>

              <div onClick={() => { setActiveSection('requests');  }} className="bg-white text-black px-6 py-4 rounded-xl shadow-md hover:shadow-lg transition w-full sm:w-1/3 cursor-pointer">
                <h1 className='text-[22px] text-orange-500 font-bold flex items-center gap-2 mb-1'>
                  <IoPersonAdd />
                  Collab Requests
                </h1>
                <p className='text-gray-500 mt-2'>{profile.role === 'investor' ? 'Pending entrepreneur messages' : 'Pending investor messages'}</p>
                <span className='text-3xl font-bold'>{myRequests.length}</span>
              </div>

              <div className='bg-white text-black px-6 py-4 rounded-xl shadow-md hover:shadow-lg transition w-full sm:w-1/3 cursor-pointer'>
                <a href="/profile" className="text-[22px] text-orange-500 font-bold flex items-center gap-2 mb-1">
                  <CgProfile /> My Profile
                </a>
                <p className='text-gray-500 mt-2'>Keep your profile updated</p>
                <span className='text-2xl sm:text-3xl font-bold'>{profile.profileCompleted ? 'Completed' : 'Pending'}</span>
              </div>
            </div>
          )}

          {/* CONNECTIONS */}
          {activeSection === 'connections' && (
            profile.role === 'investor' ? <Investor setActiveSection={setActiveSection} /> : <Entreprenuer setActiveSection={setActiveSection} />
          )}

          {/* REQUESTS */}
          {activeSection === 'requests' && (
            <div className='flex flex-col gap-4'>
              <h1 className='text-orange-500 text-3xl font-bold'>Collaboration Requests</h1>
              {myRequests.length === 0 ? (
                <p className='text-gray-400'>No pending requests</p>
              ) : (
                myRequests.map((req, idx) => (
                  <div key={idx} className='bg-white text-black rounded p-4 shadow border border-orange-200'>
                    <div className='flex items-start justify-between flex-wrap'>
                      <h2 className='text-xl font-bold mb-2'>
                        {req?.from?.name?.charAt(0).toUpperCase() + req?.from?.name?.slice(1)} wants to collaborate
                      </h2>
                      <div className='flex gap-3 mt-2 sm:mt-0'>
                        <button onClick={() => respondToRequest(req._id, 'accepted', req?.to._id)} className='bg-green-600 text-white px-6 py-2 rounded hover:bg-green-500'>
                          Accept
                        </button>
                        <button onClick={() => respondToRequest(req._id, 'rejected', req?.to._id)} className='bg-red-600 text-white px-6 py-2 rounded hover:bg-red-500'>
                          Reject
                        </button>
                      </div>
                    </div>
                    <div className='mt-3 space-y-1 text-gray-700'>
                      <p><strong>Email:</strong> {req?.from?.email}</p>
                      <p><strong>Bio:</strong> {req?.from?.bio || 'N/A'}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* ChatBox */}
          {activeSection === 'chatbox' && (
            <ChatBox
              receiver={activeChat?.user}
              connectionId={activeChat?.connectionId}
            />
          )}

        </main>
        
      </div>
    </div>

  );
}

export default Dashboard;
