import React, { useContext } from "react";
import { AuthContext } from "../../Provider/Provider";

const ReqAdmin = () => {
  const { user } = useContext(AuthContext);
  const handleReqAdmin=(email)=>{
    console.log(email);
  }
  return (
    <div className="">
      <div className="wrap bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% min-h-screen flex items-center justify-center">
        <div className="hero min-h-screen">
          <div className="hero-content text-center">
            <div className="max-w-md">
              <h1 className="text-5xl text-white  font-bold">Hello {user.displayName}.</h1>
              <p className="py-6 capitalize text-xl">
                request to admin to be a travel guide.a vast profession with diversity.
              </p>
              <button onClick={()=>handleReqAdmin(user.email)} className="btn btn-primary bg-primary border-none rounded-none capitalize w-full">request now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReqAdmin;
