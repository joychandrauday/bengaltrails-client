import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../Provider/Provider";
import useGuide from '../../Hooks/useGuide'

const UpdateGuideProfile = () => {
  const { user } = useContext(AuthContext);
  const email=user?.email;
  console.log(user.email);
  const axiosSecure = useAxiosSecure();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    alert("Profile updated successfully!");
  };
  const {
    data: guide = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["guide"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/guide?email=${email}`);
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
    return <div>Error fetching packages data</div>;
  }
  console.log(guide);
  return (
    <div className="min-h-screen bg-secondary p-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-6">Update Guide Profile</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-gray-700">Guide Name</label>
              <input
                type="text"
                {...register("guideName", { required: true })}
                className={`w-full p-2 border ${
                  errors.guideName ? "border-red-500" : "border-gray-300"
                } rounded`}
                defaultValue={guide?.guideName}
              />
              {errors.guideName && (
                <p className="text-red-500 text-sm">Guide name is required</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700">Profile URL</label>
              <input
                type="text"
                {...register("profileUrl", { required: true })}
                className={`w-full p-2 border ${
                  errors.profileUrl ? "border-red-500" : "border-gray-300"
                } rounded`}
                defaultValue={guide?.profileUrl}
              />
              {errors.profileUrl && (
                <p className="text-red-500 text-sm">Profile URL is required</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700">Experience</label>
              <input
                type="text"
                {...register("experience", { required: true })}
                className={`w-full p-2 border ${
                  errors.experience ? "border-red-500" : "border-gray-300"
                } rounded`}
                defaultValue={guide?.experience}
              />
              {errors.experience && (
                <p className="text-red-500 text-sm">Experience is required</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700">Languages</label>
              <div className="space-y-2">
                {guide?.languages.map((field, index) => (
                  <div key={field.id} className="flex items-center">
                    <input
                      type="text"
                      defaultValue={field.value}
                      {...register(`languages.${index}`, { required: true })}
                      className={`w-full p-2 border ${errors.languages && errors.languages[index] ? "border-red-500" : "border-gray-300"} rounded`}
                      placeholder="Language"
                    />
                    <button type="button" className="ml-2 bg-red-500 text-white px-2 py-1 rounded" onClick={() => remove(index)}>Remove</button>
                  </div>
                ))}
                <button type="button" className="mt-2 bg-blue-500 text-white px-2 py-1 rounded" onClick={() => append({ value: "" })}>Add Language</button>
              </div>
              {errors.languages && (
                <p className="text-red-500 text-sm">Languages are required</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700">Specialties</label>
              <input
                type="text"
                {...register("specialties", { required: true })}
                className={`w-full p-2 border ${
                  errors.specialties ? "border-red-500" : "border-gray-300"
                } rounded`}
                placeholder="Separate with commas, e.g., Bird Watching Tours, Nature Tours"
              />
              {errors.specialties && (
                <p className="text-red-500 text-sm">Specialties are required</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700">Bio</label>
              <textarea
                {...register("bio", { required: true })}
                className={`w-full p-2 border ${
                  errors.bio ? "border-red-500" : "border-gray-300"
                } rounded`}
                rows="4"
              ></textarea>
              {errors.bio && (
                <p className="text-red-500 text-sm">Bio is required</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700">Image URL</label>
              <input
                type="text"
                {...register("imageUrl", { required: true })}
                className={`w-full p-2 border ${
                  errors.imageUrl ? "border-red-500" : "border-gray-300"
                } rounded`}
              />
              {errors.imageUrl && (
                <p className="text-red-500 text-sm">Image URL is required</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                {...register("contactDetails.email", { required: true })}
                className={`w-full p-2 border ${
                  errors.contactDetails?.email
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded`}
              />
              {errors.contactDetails?.email && (
                <p className="text-red-500 text-sm">Email is required</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700">Phone</label>
              <input
                type="tel"
                {...register("contactDetails.phone", { required: true })}
                className={`w-full p-2 border ${
                  errors.contactDetails?.phone
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded`}
              />
              {errors.contactDetails?.phone && (
                <p className="text-red-500 text-sm">Phone is required</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700">Address</label>
              <input
                type="text"
                {...register("contactDetails.address", { required: true })}
                className={`w-full p-2 border ${
                  errors.contactDetails?.address
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded`}
              />
              {errors.contactDetails?.address && (
                <p className="text-red-500 text-sm">Address is required</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700">Education</label>
              <textarea
                {...register("education", { required: true })}
                className={`w-full p-2 border ${
                  errors.education ? "border-red-500" : "border-gray-300"
                } rounded`}
                placeholder="Format: Degree - University - Year. Separate multiple entries with a semicolon."
                rows="2"
              ></textarea>
              {errors.education && (
                <p className="text-red-500 text-sm">Education is required</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700">Skills</label>
              <input
                type="text"
                {...register("skills", { required: true })}
                className={`w-full p-2 border ${
                  errors.skills ? "border-red-500" : "border-gray-300"
                } rounded`}
                placeholder="Separate with commas, e.g., Biology, Ecology, Bird Watching, Nature Guiding"
              />
              {errors.skills && (
                <p className="text-red-500 text-sm">Skills are required</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700">Work Experience</label>
              <textarea
                {...register("workExperience", { required: true })}
                className={`w-full p-2 border ${
                  errors.workExperience ? "border-red-500" : "border-gray-300"
                } rounded`}
                placeholder="Format: Position - Organization - Duration. Separate multiple entries with a semicolon."
                rows="2"
              ></textarea>
              {errors.workExperience && (
                <p className="text-red-500 text-sm">
                  Work experience is required
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white p-2 rounded-none hover:bg-blue-700 transition-colors"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateGuideProfile;
