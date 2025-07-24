import React, { useContext, useState } from 'react';
import axios from 'axios';
import { IoMdClose } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext.jsx";

function Login() {


    const { backEndURL, token, setToken } = useContext(AppContext);

    //console.log(token);
    const [state, setState] = useState('Register');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState(localStorage.getItem('role') || ''); // pre-fill from storage
    const [showLoginForm, setShowLoginForm] = useState(true);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // Save role in localStorage
            localStorage.setItem('role', role);

            if (state == 'Login') {
                console.log('login invoked');
                const { data } = await axios.post(backEndURL + '/api/user/login', { email, password });
                if (data.success) {
                    toast.success("Login successfully");
                    toast.info("Please complete your profile to proceed.");
                    setTimeout(() => navigate("/profile"), 2000);
                    setToken(data.token);
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('role',data.user.role);
                    console.log('token at login', token);
                    console.log('role at login', role);
                } else {
                    console.log('Error', data.message);
                    toast.error(data.message);
                }
            }
            else {
                const { data } = await axios.post(backEndURL + '/api/user/register', { name, email, password, role });
                if (data.success) {
                    toast.success("Registered successfully");
                    toast.info("Please complete your profile to proceed.");
                    console.log('Data at register\n',data);
                    setTimeout(() => {
                        navigate("/profile");
                    }, 2000);
                    setToken(data.token);
                    localStorage.setItem('token',data.token);
                } else {
                    console.log('Error', data.message);
                    toast.error(data.message);
                }
            }

        } catch (error) {
            console.log(error.message);
            setError(error.message);
            toast.error(error.message);
        }
    };

    return (
        <div className='relative'>

            {showLoginForm &&

                <div className=" fixed inset-0 z-50 bg-black bg-opacity-50  flex items-center justify-center">

                    <div className="relative w-full max-w-md bg-white mx-2 sm:mx-0  rounded shadow-lg p-6 animate-fade-in">
                        <button
                            onClick={() => { setShowLoginForm(false); navigate('/'); }}
                            className="absolute top-2 right-2 text-gray-700 hover:text-orange-500 text-xl font-bold"
                        >
                            <IoMdClose className='sm:text-xl text-lg' />
                        </button>
                        <h2 className="text-2xl font-bold text-center text-orange-500 mb-6">
                            {state == 'Register' ? 'Create New Account' : 'Welcome Back to continue'}<br />
                        </h2>

                        <form onSubmit={handleLogin} className="space-y-4">

                            {state == 'Register' && <>
                                {/* Role Selector */}
                                <div>
                                    <label className="block text-gray-700 font-medium mb-1">Select Role</label>
                                    <select
                                        value={role} onChange={(e) => {setRole(e.target.value); localStorage.setItem('role',e.target.value);}} className="w-full border  border-gray-300 rounded  px-4 py-2">
                                        <option value="">-- Select --</option>
                                        <option value="entrepreneur">Entrepreneur</option>
                                        <option value="investor">Investor</option>
                                    </select>
                                </div>
                                {/* Name */}
                                <div>
                                    <label className='block text-gray-700 font-medium mb-1'>Name</label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder='Enter your name' className='w-full border border-gray-300 rounded px-4 py-2 outline-none '
                                    />
                                </div>
                            </>}

                            {/* Email */}
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email" className="w-full border border-gray-300 rounded px-4 py-2 outline-none " />
                            </div>

                            {/* Password */}
                            <div>
                                <label className="block text-gray-700 font-medium mb-1">Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password" className="w-full border border-gray-300 rounded px-4 py-2 outline-none" required
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded transition">
                                {state == 'Login' ? 'Login' : 'Sign up'}
                            </button>

                            <p className="text-center text-sm text-gray-500 mt-4">
                                {state === 'Register' ? (
                                    <>
                                        Already have an account?{' '}
                                        <span
                                            onClick={() => setState('Login')}
                                            className="text-orange-500 hover:underline cursor-pointer font-medium"
                                        >
                                            Login here
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        New here?{' '}
                                        <span
                                            onClick={() => setState('Register')}
                                            className="text-orange-500 hover:underline cursor-pointer font-medium"
                                        >
                                            Sign up
                                        </span>
                                    </>
                                )}
                            </p>

                        </form>
                    </div>
                </div>
            }
        </div>

    );
}

export default Login;
