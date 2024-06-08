import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/Provider";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";

const Bookings = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const email = user?.email;
  const { refetch, data: bookings = [] } = useQuery({
    queryKey: ["bookings"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/booking?email=${email}`);
      return res.data;
    },
  });
  // useEffect(() => {
  //   const fetchbooking = async () => {
  //     try {
  //       const response = await axiosSecure.get();
  //       setbooking(response.data);
  //     } catch (error) {
  //       console.error("Error fetching booking:", error);
  //     }
  //   };

  //   if (email) {
  //     fetchbooking();
  //   }
  // }, [user]);
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
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/bookings/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: "the booking has been deleted.",
                icon: "success",
              });
            } else {
              Swal.fire({
                title: "Error",
                text: "Some Error occured.",
                icon: "error",
              });
            }
          })
          .catch((error) => {
            console.error("Error deleting book:", error);
            Swal.fire({
              title: "Error",
              text: "An error occurred while deleting the book.",
              icon: "error",
            });
          });
      }
    });
  };
  return (
    <div>
      <div className="min-h-screen flex items-start py-12 justify-center bg-gradient-to-r from-primary to-gray-400">
        <div className="wrap">
          <h1 className="font-bold text-white mb-12 text-3xl capitalize">
            My booking List
          </h1>
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr className="text-white">
                  <th>Index</th>
                  <th>Feature Image</th>
                  <th>Package Name</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking, index) => (
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
                    <td>
                      <div className="text-sm opacity-50">
                        {booking.status}{" "}
                        <div className="badge badge-warning badge-xs"></div>
                      </div>
                    </td>
                    <th className="flex items-center gap-2">
                      <button
                        disabled={booking.status!=='pending'}
                        className="btn btn-circle btn-outline btn-sm "
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
