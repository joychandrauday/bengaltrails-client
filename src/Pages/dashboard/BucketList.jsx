import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/Provider";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const BucketList = () => {
  const { user } = useContext(AuthContext);
  const [bucket, setbucket] = useState([]);
  const axiosSecure = useAxiosSecure();
  const email = user?.email;
  useEffect(() => {
    const fetchBucket = async () => {
      try {
        const response = await axiosSecure.get(`/bucket-lists?email=${email}`);
        setbucket(response.data);
      } catch (error) {
        console.error("Error fetching bucket:", error);
      }
    };

    if (email) {
      fetchBucket();
    }
  }, [user]);
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      const res =axiosSecure.delete(`/bucket-lists/${id}`)
      if (res.deletedCount > 0) {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        }
       
      }
    });
  };
  return (
    <div className="min-h-screen flex items-start py-12 justify-center bg-gradient-to-r from-primary to-gray-400">
      <div className="wrap">
        <h1 className="font-bold text-white mb-12 text-3xl capitalize">
          My Bucket List
        </h1>
        <div className="">
          <table className="table w-11/12 mx-auto">
            {/* head */}
            <thead>
              <tr className="text-white">
                <th>Index</th>
                <th>Feature Image</th>
                <th>Package Name</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {bucket.map((booking, index) => (
                <tr key={booking._id} className="text-white">
                  <th className="w-12">{index + 1}</th>
                  <td>
                    <div className="w-32">
                      <img
                        src={booking.pack.tourFeaturedPhoto}
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </td>
                  <td>
                    <div>
                      <div className="font-bold w-44">
                        {booking.pack.packageName}
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="text-sm opacity-50">
                      {booking.pack.price} BDT
                    </div>
                  </td>
                  <th className="flex items-center gap-2">
                    <button
                      className="btn btn-circle btn-outline btn-sm"
                      onClick={() => handleDelete(booking._id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                    <Link
                      to={`/package/${booking.pack._id}`}
                      className="btn rounded-none bg-primary border-none text-white btn-accent"
                    >
                      Book Now
                    </Link>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BucketList;
