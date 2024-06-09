import React from "react";
import { useForm } from "react-hook-form";
import PageHeader from "../../Components/Shared/PageHeader";

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    alert("Message sent successfully!");
  };

  return (
    <div className="">
      <PageHeader
        pageTitle={'contact us'}
        breadCrumbs={'contact'}
      >

      </PageHeader>
      <div className="grid grid-cols-1 w-4/6 mx-auto py-24 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Get in Touch</h2>
          <p className="text-gray-700">
            Feel free to reach out to us with any questions, comments, or
            concerns. We're here to help!
          </p>
          <p className="text-gray-700">
            <strong>Address:</strong> 1234 Street Name, City, State, ZIP
          </p>
          <p className="text-gray-700">
            <strong>Phone:</strong> (123) 456-7890
          </p>
          <p className="text-gray-700">
            <strong>Email:</strong> contact@example.com
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Send Us a Message</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                {...register("name", { required: true })}
                className={`w-full p-2 border ${
                  errors.name ? "border-red-500" : "border-gray-300"
                } rounded`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">Name is required</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                {...register("email", { required: true })}
                className={`w-full p-2 border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } rounded`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">Email is required</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700">Message</label>
              <textarea
                {...register("message", { required: true })}
                className={`w-full p-2 border ${
                  errors.message ? "border-red-500" : "border-gray-300"
                } rounded`}
                rows="4"
              ></textarea>
              {errors.message && (
                <p className="text-red-500 text-sm">Message is required</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-primary  text-white p-2 rounded-none hover:bg-blue-700 transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
