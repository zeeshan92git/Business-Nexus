import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios';

function Investor({ setActiveSection }) {

  const { token, backEndURL, getOppositeUsers, profile, collabs, connectionMap, fetchProfile,
    fetchMyRequests, fetchAcceptedConnections, setConnectionMap, setActiveChat, acceptedConnections } = useContext(AppContext);

  const handleSendRequest = async (currentUser, selectedUser) => {
    try {
      const { data } = await axios.post(backEndURL + '/api/connection/request', { from: currentUser, to: selectedUser });
      if (data.success) {
        toast.success(data?.message);
        console.log(data?.message);
        console.log('sender & receiver', currentUser, selectedUser);
        setConnectionMap(prev => ({
          ...prev,
          [selectedUser]: 'pending',
          [currentUser]: 'pending'
        }));
      }
      else {
        toast.error(data?.message);
        console.log(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.message || "Failed to send request");
    }
  };

  const getConnectionIdForUser = (userId) => {
    console.log('accConn at investor.jsx', acceptedConnections);
    const match = acceptedConnections.find(
      conn =>
        (conn.from._id === userId && conn.to._id === profile._id) ||
        (conn.to._id === userId && conn.from._id === profile._id)
    );
    return match?._id;
  };

  return (
    <div className="min-h-screen sm:mb-0 mb-10">

      <h2 className="sm:text-3xl text-xl font-bold text-orange-500 sm:mb-8 mb-4 text-center">Verified Entrepreneurs</h2>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

        {collabs.map((c, idx) => (

          <div key={idx}
            className="bg-gray-100  rounded-xl p-4 border border-orange-100 flex flex-col items-start gap-3 min-h-[200px]">

            <h3 className="text-xl font-semibold text-black mb-1">
              {c.name?.charAt(0).toUpperCase() + c.name?.slice(1)} <span className="text-sm text-gray-500">({c.role?.charAt(0).toUpperCase() + c.role?.slice(0).toLowerCase()})</span>
            </h3>

            <p className="text-orange-600 font-medium">{c.startupName}</p>
            <p className="text-sm text-gray-600  line-clamp-3">{c.startupDescription}</p>

            <div className="space-y-3 text-sm text-gray-700">
              <p><span className="font-semibold">Funding Needed:</span> {c.fundingNeed || 'N/A'}</p>
              <p>
                <span className="font-semibold">Pitch Deck:</span>{' '}
                <a href={c.pitchDeckURL} target="_blank" rel="noopener noreferrer"
                  className="text-blue-600 underline hover:text-blue-800">View Deck
                </a>
              </p>
            </div>

            <div className="flex gap-2">
              {connectionMap[c._id] === 'none' || !connectionMap[c._id] ? (

                <button onClick={() => handleSendRequest(profile._id, c._id)}
                  className="bg-green-600 hover:bg-white hover:text-green-600 border hover:border-green-500 text-white px-4 py-2 rounded-md text-sm">
                  Send Request
                </button>

              ) : connectionMap[c._id] === 'pending' ? (
                <>
                  <div className='flex items-center justify-between gap-4'>
                    <button disabled
                      className="bg-orange-600 text-white px-4 py-2 rounded-md text-sm cursor-not-allowed">
                      Pending
                    </button>
                    <button onClick={async () => { await fetchAcceptedConnections(); await fetchMyRequests(); }}
                      className="bg-green-500 text-white px-4 py-2 rounded-md text-sm">
                      Check Request Status
                    </button>
                  </div>

                </>
              ) : connectionMap[c._id] === 'accepted' ? (
                <>
                  <div className='flex items-center justify-between gap-4'>
                    <p className="border border-green-600 text-white bg-green-600 font-normal px-4 py-2 rounded text-sm">
                      Accepted
                    </p>
                    <button
                      onClick={async () => {
                        const connId = getConnectionIdForUser(c._id);
                        console.log('connId obtained at Investor.jsx', connId);
                        setActiveChat({ user: c, connectionId: connId });
                        setActiveSection('chatbox'); await fetchAcceptedConnections();
                      }}
                      className="border border-gray-600 text-gray-600 font-normal hover:bg-gray-600 hover:text-white px-4 py-2 rounded-md text-sm">
                      Send Message
                    </button>
                  </div>
                </>
              ) : null
              }
            </div>

          </div>
        ))}

      </div>

    </div>

  )
}

export default Investor;
