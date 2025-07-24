import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios';

function Entreprenuer({ setActiveSection }) {

    const { token, backEndURL, fetchProfile, profile, getOppositeUsers, collabs, acceptedConnections,
        fetchMyRequests, fetchAcceptedConnections, connectionMap, setConnectionMap, setActiveChat
    } = useContext(AppContext);

    const handleSendRequest = async (currentUser, selectedUser) => {
        try {
            const { data } = await axios.post(backEndURL + '/api/connection/request', {
                from: currentUser,
                to: selectedUser
            });
            if (data.success) {
                toast.success(data?.message);
                console.log(data?.message);
                setConnectionMap(prev => ({
                    ...prev,
                    [selectedUser]: 'pending'
                }));
            }
            else {
                toast.error(data.message);
                console.log(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.message || "Failed to send request");
        }
    };

    const getConnectionIdForUser = (userId) => {
        console.log('accConn at Entreprenuer.jsx', acceptedConnections);
        const match = acceptedConnections.find(
            conn =>
                (conn.from._id === userId && conn.to._id === profile._id) ||
                (conn.to._id === userId && conn.from._id === profile._id)
        );
        return match?._id;
    };

    return (
        <div className="min-h-screen">
            <h2 className="text-3xl font-bold text-orange-500 mb-8 text-center">Verified Investors</h2>
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {collabs.map((inv, idx) => (
                    <div
                        key={idx}
                        className="bg-white  rounded-xl p-5 border border-orange-100 flex flex-col justify-between transition"
                    >
                        <div>
                            <h3 className="text-xl font-bold text-gray-900">
                                {inv.name?.charAt(0).toUpperCase() + inv.name?.slice(1).toLowerCase()}
                                <span className="text-sm text-gray-500">({inv.role?.charAt(0).toUpperCase() + inv.role?.slice(1).toLowerCase()})</span>
                            </h3>
                            <p className="text-sm text-gray-500 mb-2">{inv.email}</p>

                            <p className="text-sm text-gray-700 mt-1">
                                <span className="font-semibold">Bio:</span> {inv.bio || "No bio added"}
                            </p>

                            <p className="text-sm text-gray-700 mt-1">
                                <span className="font-semibold">Interests:</span> {inv.interests || "N/A"}
                            </p>

                            <p className="text-sm text-gray-700 mt-1">
                                <span className="font-semibold">Portfolio:</span>{" "}
                                {inv.portfolio ? (
                                    <a href={`https://${inv.portfolio}`} target="_blank" rel="noreferrer" className="text-blue-600 underline">
                                        {inv.portfolio}
                                    </a>
                                ) : (
                                    "N/A"
                                )}
                            </p>

                            <p className="text-sm text-gray-700 mt-1">
                                <span className="font-semibold">Location:</span> {inv.location}
                            </p>

                            <p className="text-sm text-gray-700 mt-1">
                                <span className="font-semibold">Website:</span>{" "}
                                {inv.website ? (
                                    <a href={`https://${inv.website}`} target="_blank" rel="noreferrer" className="text-blue-600 underline">
                                        {inv.website}
                                    </a>
                                ) : (
                                    "N/A"
                                )}
                            </p>
                        </div>
                        <div className="mt-4 flex gap-2">
                            {connectionMap[inv._id] === 'none' || !connectionMap[inv._id] ? (
                                <button onClick={() => handleSendRequest(profile._id, inv._id)}
                                    className="bg-green-600 hover:bg-white hover:text-green-600 hover:font-bold border hover:border-green-500 text-white px-4 py-2 rounded-md text-sm">
                                    Send Request
                                </button>
                            ) : connectionMap[inv._id] === 'pending' ? (
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
                            ) : connectionMap[inv._id] === 'accepted' ? (
                                <>
                                    <div className='flex items-center justify-between gap-4'>
                                        <p className="border border-green-600 text-white bg-green-600 font-normal px-4 py-2 rounded text-sm">
                                            Accepted
                                        </p>

                                        <button
                                            onClick={async () => {
                                                const connId = getConnectionIdForUser(inv._id);
                                                console.log('connId obtained at entrepreneur.jsx', connId);
                                                setActiveChat({ user: inv, connectionId: connId });
                                                setActiveSection('chatbox'); await fetchAcceptedConnections();
                                            }}
                                            className="border border-gray-600 text-gray-600 font-normal hover:bg-gray-600 hover:text-white px-4 py-2 rounded-md text-sm">
                                            Send Message
                                        </button>
                                    </div>
                                </>
                            ) : null}
                        </div>
                    </div>
                ))}
            </div>
        </div>


    )
}

export default Entreprenuer;