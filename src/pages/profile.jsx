import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import Footer from '../components/footer';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const inputClass = "w-full p-2 rounded text-black border border-gray-300 focus:outline-none";
  const inputDisabledClass = "w-full p-2 rounded text-white bg-gray-800 border border-gray-600";

  const { backEndURL, token, profile, setProfile } = useContext(AppContext);
  const userRole = localStorage.getItem('role');
  console.log('user role at profile', userRole);
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setEditing(false);
    try {
      const { data } = await axios.put(backEndURL + '/api/profile/update', profile, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (data.success) {
        toast.success("Profile updated successfully");
        setEditing(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to update profile");
      console.error(error);
    }
  };

  return (
    <>
      <div className="text-white max-w-5xl mx-auto mt-10 px-4">
        <h2 className="text-3xl font-bold mb-4 text-center">Your Profile</h2>

        {!token &&
          <p className='text-lg font-medium mt-2 mb-2 text-center'>
            Sign in/up to continue you'r journey  <span onClick={() => navigate("/login")} className='hover:underline cursor-pointer font-normal text-blue-600 hover:text-blue-500'>Click here</span>
          </p>
        }
        <div className="flex flex-col md:flex-row gap-6 border border-white rounded-md p-4 bg-gray-800">

          {/* Left Column (Common Fields) */}
          <div className="flex flex-col  gap-4 w-full md:w-1/2">
            <div>
              <label className="block text-sm font-semibold mb-1">Name</label>
              <input type="text" name="name" value={profile.name} onChange={handleChange} disabled={!editing} className={inputClass} />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Email</label>
              <input type="email" name="email" value={profile.email} disabled className={inputDisabledClass} />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Role</label>
              <input type="text" name="role" value={profile.role?.charAt(0).toUpperCase() + profile.role?.slice(1)} disabled className={inputDisabledClass} />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Bio</label>
              <textarea name="bio" value={profile.bio} maxLength={100} onChange={handleChange} disabled={!editing} className="w-full p-2 rounded resize-none text-black border border-gray-300 focus:outline-none" />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Website</label>
              <input type="text" name="website" value={profile.website} onChange={handleChange} disabled={!editing} className={inputClass} />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Location</label>
              <input type="text" name="location" value={profile.location} onChange={handleChange} disabled={!editing} className={inputClass} />
            </div>
          </div>

          {/* Right Column (Role-specific Fields) */}
          <div className="flex flex-col gap-4 w-full md:w-1/2">
            {profile?.role === "entrepreneur" && (
              <>
                <div>
                  <label className="block text-sm font-semibold mb-1">Startup Name</label>
                  <input type="text" name="startupName" value={profile.startupName} onChange={handleChange} disabled={!editing} className={inputClass} />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-1">Description</label>
                  <input type="text" name="startupDescription" value={profile.startupDescription} onChange={handleChange} disabled={!editing} className={inputClass} />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-1">Pitch Deck URL</label>
                  <input type="text" name="pitchDeckURL" value={profile.pitchDeckURL} onChange={handleChange} disabled={!editing} className={inputClass} />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-1">Funding Req.</label>
                  <input type="text" name="fundingNeed" value={profile.fundingNeed} onChange={handleChange} disabled={!editing} className={inputClass} />
                </div>
              </>
            )}

            {profile?.role === "investor" && (
              <>
                <div>
                  <label className="block text-sm font-semibold mb-1">Portfolio</label>
                  <input type="text" name="portfolio" value={profile.portfolio} onChange={handleChange} disabled={!editing} className={inputClass} />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-1">Interests</label>
                  <input type="text" name="interests" value={profile.interests} onChange={handleChange} disabled={!editing} className={inputClass} />
                </div>
              </>
            )}
          </div>

        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-center gap-4">
          {editing ? (
            <button onClick={handleSave} className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded font-semibold">Save</button>
          ) : (
            <button onClick={() => setEditing(true)} className={`bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded font-semibold ${!token && 'pointer-events-none'} `}>Edit Profile</button>
          )}
        </div>

      </div>
      <Footer/>
    </>

  )
}

export default Profile;
