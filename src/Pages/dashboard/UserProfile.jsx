import React, { useContext } from 'react';
import { AuthContext } from '../../Provider/Provider';


const UserProfile = () => {
    const {user,logOut}=useContext(AuthContext)
    return (
        <div className='min-h-screen '>
            <div className="flex items-center justify-center gap-4">
                <div className="p-4 flex items-center justify-center flex-col text-center gap-4">
                    <img src={user?.photoURL} className='w-3/5 rounded-full' alt="" />
                    <h1 className="uppercase text-xl font-bold">{user?.displayName}</h1>
                    <h1 className=" text-sm font-bold">{user?.email}</h1>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;