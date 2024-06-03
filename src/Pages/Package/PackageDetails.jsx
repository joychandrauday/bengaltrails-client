import React, { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

import useAxiosSecure from "../../Hooks/useAxiosSecure";
import PackageHeader from "../../Components/Shared/PackageHeader";
import { Gallery } from "react-grid-gallery";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ReactModal from "react-modal";
import { AuthContext } from "../../Provider/Provider";

const PackageDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const user = useContext(AuthContext); // Assuming you have an AuthContext providing user info
  const [bookingDate, setBookingDate] = useState(new Date());
  const [selectedGuide, setSelectedGuide] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
    const navigate=useNavigate()
  const {
    data: packageSingle = {},
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["packageSingle", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/package/${id}`);
      return res.data;
    },
  });

  const { data: guides = [] } = useQuery({
    queryKey: ["guides"],
    queryFn: async () => {
      const res = await axiosSecure.get("/guides");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-md"></span>
      </div>
    );
  }

  if (isError) {
    return <div>Error fetching package data</div>;
  }

  const {
    packageName = "",
    gallery = [],
    tourFeaturedPhoto = "",
    aboutTour = "",
    tourPlan = [],
    price = "",
    tourType = "",
  } = packageSingle;

  const images = gallery.map((img) => ({
    src: img,
    width: 320,
    height: 174,
    caption: "Image Caption Here", // Adjust caption as needed
  }));

  const handleBookNow = () => {
    setModalIsOpen(true);
  };

  const handleConfirmBooking = () => {
    // Handle booking confirmation (e.g., send booking details to the server)
    setModalIsOpen(false);
  };

  return (
    <div>
      <PackageHeader
        packageTitle={packageName}
        bgImg={tourFeaturedPhoto}
        price={price}
        type={tourType}
      />
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Gallery</h2>
          <Gallery images={images} />
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">About the Tour</h2>
          <p>{aboutTour}</p>
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Tour Plan</h2>
          <ul>
            {tourPlan.map((plan, index) => (
              <li key={index} className="mb-2">
                <strong>Day {plan.day}:</strong> {plan.activities}
              </li>
            ))}
          </ul>
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Tour Guides</h2>
          <ul className="list-none p-0 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {guides.map((guide) => (
              <li
                key={guide._id}
                className="cursor-pointer"
                onClick={() => navigate(`${guide.profileUrl}`)}
              >
                <div className="border rounded-lg p-4 text-center">
                  <img
                    src={guide.imageUrl}
                    alt={guide.name}
                    className="w-24 h-24 rounded-full mx-auto mb-2"
                  />
                  <p className="font-semibold">{guide.name}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Booking Form</h2>
          <form className="space-y-4">
            <div>
              <label className="block mb-2 font-semibold">Package Name</label>
              <input
                type="text"
                value={packageName}
                readOnly
                className="input input-bordered w-full"
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold">Tourist Name</label>
              <input
                type="text"
                value={user?.displayName}
                readOnly
                className="input input-bordered w-full"
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold">Tourist Email</label>
              <input
                type="email"
                value={user.email}
                readOnly
                className="input input-bordered w-full"
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold">Tourist Image</label>
              <input
                type="text"
                value={user.image}
                readOnly
                className="input input-bordered w-full"
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold">Price</label>
              <input
                type="text"
                value={price}
                readOnly
                className="input input-bordered w-full"
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold">Tour Date</label>
              <ReactDatePicker
                selected={bookingDate}
                onChange={(date) => setBookingDate(date)}
                className="input input-bordered w-full"
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold">
                Tour Guide Name
              </label>
              <select
                value={selectedGuide}
                onChange={(e) => setSelectedGuide(e.target.value)}
                className="select select-bordered w-full"
              >
                <option value="" disabled>
                  Select a guide
                </option>
                {guides.map((guide) => (
                  <option key={guide._id} value={guide.name}>
                    {guide.name}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="button"
              onClick={handleBookNow}
              className="btn btn-primary w-full"
            >
              Book Now
            </button>
          </form>
        </div>
      </div>
      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Confirm Booking"
        className="Modal"
        overlayClassName="Overlay"
      >
        <h2>Confirm your Booking</h2>
        <button onClick={handleConfirmBooking} className="btn btn-success">
          Confirm
        </button>
        <button
          onClick={() => setModalIsOpen(false)}
          className="btn btn-danger"
        >
          Cancel
        </button>
        <a href="/my-bookings" className="btn btn-link mt-2">
          Go to My Bookings
        </a>
      </ReactModal>
    </div>
  );
};

export default PackageDetails;
