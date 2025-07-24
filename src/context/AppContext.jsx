import React, { useState } from 'react';
import axios from 'axios';
import { io } from "socket.io-client";
import { createContext } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
export const AppContext = createContext();

const AppContextProvider = (props) => {

    const backEndURL = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate();
    console.log("URL at context\n", backEndURL);
    const [token, setToken] = useState(() => localStorage.getItem("token") || null);
    const [collabs, setCollabs] = useState([]);

    const [myRequests, setMyRequests] = useState([]);
    const [connectionMap, setConnectionMap] = useState({});
    const [acceptedConnections, setAcceptedConnections] = useState([]);

    const [socket, setSocket] = useState(null);
    const [activeChat, setActiveChat] = useState(null);

    const [profile, setProfile] = useState({
        name: '',
        email: '',
        bio: '',
        location: '',
        website: '',
        startupName: '',
        startupDescription: '',
        pitchDeckURL: '',
        fundingNeed: '',
        portfolio: '',
        interests: ''
    });


    // Fetch profile data
    const fetchProfile = async () => {
        try {
            const { data } = await axios.get(backEndURL + '/api/profile/get',
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (data.success) {
                //toast.success('User profile fetched');
                setProfile(data.data);
                console.log("user data", data.data);
            } else {
                console.log(data.message);
                toast.error(data.message);
            }
        } catch (error) {
            //toast.error("Failed to fetch profile");
            console.log(error.message);
        }
    };
    // handle user logout
    const handleLogOut = async () => {
        console.log('handlelogout invoked');
        try {
            const { data } = await axios.post(backEndURL + '/api/user/logout',
                {}, { headers: { Authorization: `Bearer ${token}` } }
            );

            if (data.success) {
                toast.success('Logout successfully');
                console.log(data.message);
                localStorage.removeItem('token');
                localStorage.removeItem('role');
                setToken(null);
                navigate("/");
            } else {
                console.log(data.message);
                toast.error(data.message);
            }

        } catch (error) {
            toast.error("Failed to LogOut");
            console.log(error.message);
        }
    };
    //handle getOpposite Users
    const getOppositeUsers = async () => {
        try {
            const { data } = await axios.post(backEndURL + '/api/user/getcollab', {},
                { headers: { Authorization: `Bearer ${token}` } });
            if (data.success) {
                //toast.success('Requests fetched successfully');
                setCollabs(data.users);
                console.log(data.users);
            } else {
                toast.error(data.message);
                console.log(data.message);
            }

        } catch (error) {
            toast.error("Failed to fetch requests");
            console.log(error.message);
        }
    };
    //fetch my connections/requests
    const fetchMyRequests = async () => {
        try {
            const { data } = await axios.get(backEndURL + '/api/connection/get',
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (data.success) {
                //toast.success('Connnections fetched successfully');
                const all = data.data;
                console.log(data.data);
                const myId = profile._id;
                const incoming = all.filter(conn => conn.to._id === myId && conn.status === 'pending');
                setMyRequests(incoming);
                // Build the connection map from all connections
                const map = {};
                all.forEach(conn => {
                    const otherUser = conn.from._id === myId ? conn.to._id : conn.from._id;
                    map[otherUser] = conn.status; // 'pending', 'accepted', etc.
                });

                setConnectionMap(map); // this makes it global and reactive

            } else {
                toast.error(data.message);
                console.log(data.message);
            }

        } catch (error) {
            toast.error("Failed to fetch requests");
            console.log(error.message);
        }
    };
    //fetch acepted connections
    const fetchAcceptedConnections = async () => {
        try {
            const { data } = await axios.get(backEndURL + '/api/connection/get', {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (data.success) {
                //toast.success('Accepted connections fetched');
                console.log('accept connections', data);
                const all = data.data;
                const myId = profile._id;
                const accepted = all.filter(conn =>
                    (conn.from._id === myId || conn.to._id === myId) && conn.status === 'accepted');
                setAcceptedConnections(accepted);
            } else {
                toast.error(data.message);
                console.log(data.message);
            }
        } catch (error) {
            toast.error("Failed to fetch accepted connections");
            console.log(error.message);
        }
    };

    //  Connect socket once when token is ready
    useEffect(() => {
        if (token && !socket) {
            const newSocket = io(import.meta.env.VITE_BACKEND_URL);

            newSocket.on("connect", () => {
                console.log("Socket connected:", newSocket.id);
            });

            setSocket(newSocket);

            return () => newSocket.disconnect();
        }
    }, [token]);


    useEffect(() => {
        if (token) {
            fetchProfile().then(() => {
                fetchMyRequests(); // This depends on profile._id being available
                getOppositeUsers();
            });
        }
    }, [token]);

    //  Once socket is ready AND profile is fetched, then join room
    useEffect(() => {
        if (socket && profile?._id) {
            socket.emit("join", profile._id);
            console.log("Joined room with ID:", profile._id);
        }
    }, [socket, profile?._id]);


    const value = {
        backEndURL, token, setToken, profile, setProfile,
        fetchProfile, handleLogOut, getOppositeUsers, collabs, fetchMyRequests,
        myRequests, connectionMap, setConnectionMap, socket, activeChat, setActiveChat,
        fetchAcceptedConnections, acceptedConnections
    };
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
};
export default AppContextProvider;