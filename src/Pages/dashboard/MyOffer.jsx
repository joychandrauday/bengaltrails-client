import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { AuthContext } from "../../Provider/Provider";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import { Transition } from "@headlessui/react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

const MyOffer = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const email = user?.email;

  const { width, height } = useWindowSize();
  const [showOffers, setShowOffers] = useState(false); // State to manage the visibility of offers

  const { isLoading, isError, data: bookings = [], refetch } = useQuery({
    queryKey: ["bookings", email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/booking?email=${email}`);
      return res.data;
    },
    enabled: !!email, // Ensure the query runs only if email is available
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-md"></span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="text-red-500">Error fetching bookings</span>
      </div>
    );
  }

  // Filter bookings to get only the accepted ones
  const acceptedBookings = bookings.filter((booking) => booking.status === "accepted");

  const offers = [
    {
      id: 1,
      title: "Discount on next booking",
      description: "Get a 20% discount on your next booking.",
      img: "https://via.placeholder.com/600x400",
    },
    {
      id: 2,
      title: "Free upgrade to premium package",
      description: "Enjoy a free upgrade to our premium package.",
      img: "https://via.placeholder.com/600x400",
    },
    {
      id: 3,
      title: "Complimentary gift on arrival",
      description: "Receive a complimentary gift on your arrival.",
      img: "https://via.placeholder.com/600x400",
    },
  ];

  return (
    <div className="min-h-screen w-4/5 mx-auto">
      {acceptedBookings.length >= 3 && <Confetti width={width} height={height} className="w-full"/>}
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold mb-4">My Accepted Bookings</h1>
        {acceptedBookings.length === 0 ? (
          <p>No accepted bookings available.</p>
        ) : (
          <table className="table-zebra w-full">
            <thead>
              <tr>
                <th>Index</th>
                <th>Package Name</th>
                <th>Price</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {acceptedBookings.map((booking, index) => (
                <tr key={booking._id} className="text-center">
                  <td>{index + 1}</td>
                  <td>{booking.packageName}</td>
                  <td>{booking.price} BDT</td>
                  <td>{booking.tourDate.split("T")[0]}</td>
                  <td>{booking.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {
            acceptedBookings.length < 3 ? <p className="text-primary font-bold">book least three packages to get exciting offers.</p>:''
        }
        {acceptedBookings.length >= 3 && (
          <div className="text-center">
            <button
              className="bg-primary rounded-none btn text-white capitalize my-4 border-none"
              onClick={() => setShowOffers(!showOffers)} // Toggle the offers visibility
            >
              {showOffers ? (
                <>
                  Hide Special Offers <FaAngleUp className="h-5 w-5 inline" />
                </>
              ) : (
                <>
                  Explore Special Offers <FaAngleDown className="h-5 w-5 inline" />
                </>
              )}
            </button>
          </div>
        )}
        <Transition
          show={showOffers}
          enter="transition-opacity duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="text-center mt-4">
            <h2 className="text-xl font-bold mb-4">Special Offers</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {offers.map((offer) => (
                <div key={offer.id} className="p-4 bg-gray-800 rounded-lg shadow-xl">
                  <img src={offer.img} alt={offer.title} className="rounded-lg mb-4" />
                  <h3 className="text-lg font-bold text-white mb-2">{offer.title}</h3>
                  <p className="text-white">{offer.description}</p>
                  <button className="bg-primary text-white rounded-full py-2 px-6 mt-4 hover:bg-primary-dark transition-all duration-300">
                    Acquire Offer
                  </button>
                </div>
              ))}
            </div>
          </div>
        </Transition>
      </div>
    </div>
  );
};

export default MyOffer;
