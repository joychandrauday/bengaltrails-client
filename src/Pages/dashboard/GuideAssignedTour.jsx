import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useGuide from "../../Hooks/useGuide";
import { FaCheck, FaTimes } from "react-icons/fa";
import Swal from "sweetalert2";
import { AuthContext } from "../../Provider/Provider";

const GuideAssignedTour = () => {
  const user = useContext(AuthContext);
  const email=user?.user.email
  const axiosSecure = useAxiosSecure();

  const { refetch, data: bookings = [], isLoading, isError } = useQuery({
    queryKey: ["bookings", email],
    queryFn: async () => {
      if (email) {
        const res = await axiosSecure.get(`/booking-by-guide/${email}`);
        return res.data;
      }
      return [];
    },
    enabled: !!email, // Ensure the query runs only when email is available
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching bookings</div>;
  }
  console.log(user.user);
  const handleAccept = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to accept this booking.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, accept it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/bookings/${id}`, { status: "accepted" }).then((res) => {
          if (res.data?.modifiedCount > 0) {
            refetch();
            Swal.fire("Accepted!", "The booking has been accepted.", "success");
          } else {
            Swal.fire("Error", "Some error occurred.", "error");
          }
        });
      }
    });
  };

  const handleReject = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to reject this booking.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, reject it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/bookings/${id}`, { status: "rejected" }).then((res) => {
          if (res.data?.modifiedCount > 0) {
            refetch();
            Swal.fire("Rejected!", "The booking has been rejected.", "success");
          } else {
            Swal.fire("Error", "Some error occurred.", "error");
          }
        });
      }
    });
  };

  return (
    <div className="flex min-h-screen items-start pt-24 justify-center bg-gradient-to-r from-primary to-gray-400">
      <div className="w-4/5">
        <h1 className="font-bold text-white mb-12 text-3xl capitalize">
          My Booking List
        </h1>
        <div className="wrap">
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>Index</th>
                  <th>Package</th>
                  <th>Price</th>
                  <th>Featured</th>
                  <th>Tourist</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((book, index) => (
                  <tr key={book._id}>
                    <th>{index + 1}</th>
                    <td>{book.packageName}</td>
                    <td>{book.price} BDT</td>
                    <td>
                      <img src={book.tourFeaturedPhoto} alt="Featured" className="w-20 h-20 object-cover" />
                    </td>
                    <td>{book.touristName}</td>
                    <td>{book.tourDate.split('T')[0]}</td>
                    <td>{book.status}</td>
                    <td>
                      <button
                        disabled={book.status ==='accepted'}
                        className={book.status !=='accepted'?"bg-green-500 text-white p-2 rounded-md":"bg-green-500 text-white p-2 rounded-md opacity-25 cursor-not-allowed"}
                        onClick={() => handleAccept(book._id)}
                      >
                        <FaCheck />
                      </button>
                      <button
                        disabled={book.status ==='accepted'}
                        className={book.status !=='accepted'?"bg-red-500 text-white p-2 rounded-md":"bg-red-500 text-white p-2 rounded-md opacity-25 cursor-not-allowed"}
                        onClick={() => handleReject(book._id)}
                      >
                        <FaTimes />
                      </button>
                    </td>
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

export default GuideAssignedTour;
