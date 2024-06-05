import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AddPackage = () => {
  const { register, handleSubmit, control, setValue, getValues } = useForm();
  const [galleryItems, setGalleryItems] = useState([]);
  const [tourPlanItems, setTourPlanItems] = useState([]);
  const axiosSecure = useAxiosSecure();

  const onSubmit = async (data) => {
    console.log(data);
    // You can send the form data to your backend or process it as needed
    const menuRes = await axiosSecure.post("/packages", data);
    console.log(menuRes.data);
    if (menuRes.data.insertedId) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your Item has been added.",
        showConfirmButton: true,
      });
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "something went wrong..",
        showConfirmButton: true,
      });
    }
  };

  const addGalleryItem = () => {
    setGalleryItems([...galleryItems, ""]);
  };

  const removeGalleryItem = (index) => {
    const updatedItems = galleryItems.filter((item, i) => i !== index);
    setGalleryItems(updatedItems);
  };

  const addTourPlanItem = () => {
    setTourPlanItems([...tourPlanItems, ""]);
  };

  const removeTourPlanItem = (index) => {
    const updatedItems = tourPlanItems.filter((item, i) => i !== index);
    setTourPlanItems(updatedItems);
  };

  return (
    <div className="bg-basic-bg bg-center bg-cover min-h-screen flex items-center justify-center py-12">
      <div className="wrap ">
        <h1 className="text-3xl font-bold text-center capitalize text-white mb-8">
          add a package
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full mx-auto">
          <div className="flex gap-4 ">
            <div className="basis-1/2">
              <div className="mb-4 ">
                <label htmlFor="packageName" className="block text-white">
                  Package Name
                </label>
                <input
                  type="text"
                  id="packageName"
                  {...register("packageName")}
                  className="mt-1 px-4 py-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="tourFeaturedPhoto" className="block text-white">
                  Tour Featured Photo
                </label>
                <input
                  type="text"
                  id="tourFeaturedPhoto"
                  {...register("tourFeaturedPhoto")}
                  className="mt-1 px-4 py-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="price" className="block text-white">
                  Price
                </label>
                <input
                  type="number"
                  id="price"
                  {...register("price")}
                  className="mt-1 px-4 py-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="tourType" className="block text-white">
                  Tour Type
                </label>
                <select
                  id="tourType"
                  {...register("tourType")}
                  className="mt-1 px-4 py-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                >
                  <option value="wildlife">Wildlife</option>
                  <option value="culture">Culture</option>
                  <option value="walking">walking</option>
                  <option value="culture">Culture</option>
                  <option value="airride">airride</option>
                  <option value="sports">sports</option>
                </select>
              </div>
            </div>
            <div className="basis-1/2">
              <div className="mb-4">
                <label htmlFor="gallery" className="block text-white">
                  Gallery
                </label>
                {galleryItems.map((item, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <input
                      type="text"
                      {...register(`gallery[${index}]`)}
                      className="mt-1 px-4 py-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => removeGalleryItem(index)}
                      className="ml-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:bg-red-600"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addGalleryItem}
                  className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                >
                  Add Gallery Item
                </button>
              </div>
              <div className="mb-4">
                <label htmlFor="tourPlan" className="block text-white">
                  Tour Plan
                </label>
                {tourPlanItems.map((item, index) => (
                  <div key={index} className="flex flex-col mb-2">
                    <input
                      type="text"
                      {...register(`tourPlan[${index}].day`)}
                      placeholder={`Day ${index + 1}`}
                      className="mt-1 px-4 py-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                    />
                    <textarea
                      {...register(`tourPlan[${index}].activities`)}
                      placeholder="Activities"
                      className="mt-1 px-4 py-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => removeTourPlanItem(index)}
                      className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:bg-red-600"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addTourPlanItem}
                  className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                >
                  Add Tour Plan Item
                </button>
              </div>
              <div className="mb-4">
                <label htmlFor="aboutTour" className="block text-white">
                  About Tour
                </label>
                <textarea
                  id="aboutTour"
                  {...register("aboutTour")}
                  className="mt-1 px-4 py-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="bg-primary w-full btn hover:bg-blue-700 text-white font-bold py-2 px-4 focus:outline-none rounded-none focus:shadow-outline border-none"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPackage;
