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
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import "../Package/style.css";

const PackageDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const navigate = useNavigate();
  console.log(user);
  const [bookingDate, setBookingDate] = useState();
  const [formError, setFormError] = useState(null);
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

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

  console.log("isLoading:", isLoading);
  console.log("isError:", isError);

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
    caption: "Image Caption Here",
  }));

  console.log("modalIsOpen:", modalIsOpen);

  const onSubmit = async (data) => {
    // Handle form submission
    console.log("Form submitted:", data); // Data contains all form values

    // Simulate a successful form submission to the server
    // You can replace this with your actual API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Close the modal
    document.getElementById("my_modal_5").close();

    // Show the confirmation message
    Swal.fire({
      title: "Are you sure?",
      text: "You your booking will be saved!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Book for me",
    }).then(() => {
      axiosSecure
        .post("/bookings", data)
        .then(function (response) {
          if (response.data.insertedId) {
            Swal.fire({
              title: "Booked !",
              text: "Your tour request has been booked. it is now in pending.",
              icon: "success",
            });
          } else {
            Swal.fire({
              position: "center",
              icon: "error",
              title: "Something went wrong.",
              showConfirmButton: true,
            });
          }
        })
        .catch(function (error) {
          console.error("Error borrowing book:", error);
        });
    });
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
          <ul className="list-none p-0 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {guides.map((guide) => (
              <li
                key={guide._id}
                className="cursor-pointer"
                onClick={() => navigate(`/guide/${guide._id}`)}
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
        <div className="mb-8 text-center">
          <button
            onClick={() => document.getElementById("my_modal_5").showModal()}
            className="btn btn-primary bg-primary border-none rounded-none mx-auto w-44 text-white"
          >
            Book Now
          </button>
        </div>
      </div>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}

      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box w-11/12 max-w-2xl p-8">
          <h2 className="text-2xl font-bold">Booking Form</h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
            method="dialog"
          >
            <div>
              <label className="block mb-2 font-semibold">Package Name</label>
              <input
                type="text"
                value={packageName}
                readOnly
                className="input input-bordered w-full"
                {...register("packageName")}
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold">Package Id</label>
              <input
                type="text"
                value={id}
                readOnly
                className="input input-bordered w-full"
                {...register("packageId")}
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold">Tourist Name</label>
              <input
                type="text"
                defaultValue={user?.displayName}
                readOnly
                className="input input-bordered w-full"
                {...register("touristName")}
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold">Tourist Email</label>
              <input
                type="email"
                defaultValue={user.email}
                readOnly
                className="input input-bordered w-full"
                {...register("touristEmail")}
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold">Tourist Image</label>
              <input
                type="text"
                defaultValue={user.photoURL}
                readOnly
                className="input input-bordered w-full"
                {...register("touristImage")}
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold">Price</label>
              <input
                type="text"
                value={price}
                readOnly
                className="input input-bordered w-full"
                {...register("price")}
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold">Featured mage</label>
              <input
                type="text"
                value={tourFeaturedPhoto}
                readOnly
                className="input input-bordered w-full"
                {...register("tourFeaturedPhoto")}
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold">Tour Date</label>
              <ReactDatePicker
                selected={bookingDate}
                onChange={(date) => {
                  setBookingDate(date); // Update local state
                  setValue("tourDate", date); // Update form value using setValue provided by react-hook-form
                }}
                className="input input-bordered w-full"
              />
              {errors.tourDate && (
                <p className="text-red-500">Tour date is required</p>
              )}
            </div>
            <div className="text-black">
              <label className="block mb-2 font-semibold">
                Select A Tour Guide
              </label>
              <select
                {...register("tourGuideId", { required: true })}
                className="select select-bordered w-full"
              >
                <option value="" disabled>
                  Select a guide
                </option>
                {guides.map((guide) => (
                  <option key={guide._id} value={guide._id}>
                    {guide.guideName}
                  </option>
                ))}
              </select>
              {errors.tourGuideId && (
                <p className="text-red-500">Tour guide name is required</p>
              )}
            </div>
            <button
              type="submit"
              className="btn btn-primary w-full bg-primary rounded-none border-none text-white"
            >
              Confirm Booking
            </button>
          </form>
          <p className="py-4">Press ESC key or click on ✕ button to close</p>
        </div>
      </dialog>
    </div>
  );
};

export default PackageDetails;
