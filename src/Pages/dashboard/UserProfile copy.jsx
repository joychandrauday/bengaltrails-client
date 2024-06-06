import React, { useContext } from 'react';
import { AuthContext } from '../../Provider/Provider';
import useGuide from "../../Hooks/useGuide";

const UserProfile = () => {
    const [isGuide]=useGuide()
    
    const {user,logOut}=useContext(AuthContext)
    return (
        <div className='min-h-screen bg-primary flex items-center justify-center gap-4 text-white'>
            <div className="">
                <div className="p-4 flex items-center justify-center flex-col text-center gap-4">
                    <img src={user?.photoURL} className='w-3/5 rounded' alt="" />
                    <h1 className="uppercase text-xl font-bold">{user?.displayName}</h1>
                    <h1 className=" text-sm font-bold">{user?.email}</h1>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;