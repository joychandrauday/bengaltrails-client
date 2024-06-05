import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/Provider";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const Bookings = () => {
  const { user } = useContext(AuthContext);
  const [booking, setbooking] = useState([]);
  const axiosSecure = useAxiosSecure();
  const email = user?.email;
  useEffect(() => {
    const fetchbooking = async () => {
      try {
        const response = await axiosSecure.get(`/booking?email=${email}`);
        setbooking(response.data);
      } catch (error) {
        console.error("Error fetching booking:", error);
      }
    };

    if (email) {
      fetchbooking();
    }
  }, [user]);
  console.log(booking);
  return (
    <div>
      <div className="min-h-screen flex items-start py-12 justify-center bg-gradient-to-r from-primary to-gray-400">
        <div className="wrap">
          <h1 className="font-bold text-white mb-12 text-3xl capitalize">
            My booking List
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
                {booking.map((booking, index) => (
                  <tr key={booking._id} className="text-white">
                    <th className="w-12">{index + 1}</th>
                    <td>
                      <div className="w-32">
                        <img
                          src={booking.tourFeaturedPhoto}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </td>
                    <td>
                      <div>
                        <div className="font-bold w-44">
                          {booking.packageName}
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="text-sm opacity-50">
                        {booking.price} BDT
                      </div>
                    </td>
                    <th className="flex items-center gap-2">
                      <button
                        className="btn btn-circle btn-outline btn-sm"
                        onClick={() => handleDelete(booking?._id)}
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
                        to={`/package/${booking._id}`}
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
    </div>
  );
};

export default Bookings;
