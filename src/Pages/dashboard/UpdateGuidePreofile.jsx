import React, { useContext } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../Provider/Provider";

const UpdateGuideProfile = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const email = user?.email;
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // useFieldArray hooks for dynamic fields
  const {
    fields: languageFields,
    append: appendLanguage,
    remove: removeLanguage,
  } = useFieldArray({
    control,
    name: "languages",
  });
  const {
    fields: specialtyFields,
    append: appendSpecialty,
    remove: removeSpecialty,
  } = useFieldArray({
    control,
    name: "specialties",
  });
  const {
    fields: educationFields,
    append: appendEducation,
    remove: removeEducation,
  } = useFieldArray({
    control,
    name: "education",
  });
  const {
    fields: skillFields,
    append: appendSkill,
    remove: removeSkill,
  } = useFieldArray({
    control,
    name: "skills",
  });
  const {
    fields: workExperienceFields,
    append: appendWorkExperience,
    remove: removeWorkExperience,
  } = useFieldArray({
    control,
    name: "workExperience",
  });

  const onSubmit = async (data) => {

    const res = axiosSecure.patch(`guides/${guide._id}`, data);
    
  };

  const {
    data: guide = {},
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["guide", email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/guide?email=${email}`);
      return res.data;
    },
    enabled: !!email, // Only run the query if email exists
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-md"></span>
      </div>
    );
  }

  if (isError) {
    return <div>Error fetching guide data</div>;
  }

  // Set default values for the form
  const defaultValues = {
    guideName: guide.guideName || "",
    profileUrl: guide.profileUrl || "",
    experience: guide.experience || "",
    languages: guide.languages || [""], // Ensure at least one field
    specialties: guide.specialties || [""], // Ensure at least one field
    bio: guide.bio || "",
    imageUrl: guide.imageUrl || "",
    contactDetails: {
      email: guide.contactDetails?.email || "",
      phone: guide.contactDetails?.phone || "",
      address: guide.contactDetails?.address || "",
    },
    education: guide.education || [""], // Ensure at least one field
    skills: guide.skills || [""], // Ensure at least one field
    workExperience: guide.workExperience || [""], // Ensure at least one field
  };

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
                defaultValue={defaultValues.guideName}
                {...register("guideName", { required: true })}
                className={`w-full p-2 border ${
                  errors.guideName ? "border-red-500" : "border-gray-300"
                } rounded`}
              />
              {errors.guideName && (
                <p className="text-red-500 text-sm">Guide name is required</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700">Profile URL</label>
              <input
                type="text"
                defaultValue={defaultValues.profileUrl}
                {...register("profileUrl", { required: true })}
                className={`w-full p-2 border ${
                  errors.profileUrl ? "border-red-500" : "border-gray-300"
                } rounded`}
              />
              {errors.profileUrl && (
                <p className="text-red-500 text-sm">Profile URL is required</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700">Languages</label>
              <div className="space-y-2">
                {languageFields.map((field, index) => (
                  <div key={field.id} className="flex items-center">
                    <input
                      type="text"
                      defaultValue={field.value}
                      {...register(`languages.${index}`, { required: true })}
                      className={`w-full p-2 border ${
                        errors.languages && errors.languages[index]
                          ? "border-red-500"
                          : "border-gray-300"
                      } rounded`}
                      placeholder="Language"
                    />
                    <button
                      type="button"
                      className="ml-2 bg-red-500 text-white px-2 py-1 rounded"
                      onClick={() => removeLanguage(index)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className="mt-2 bg-blue-500 text-white px-2 py-1 rounded"
                  onClick={() => appendLanguage({ value: "" })}
                >
                  Add Language
                </button>
              </div>
              {errors.languages && (
                <p className="text-red-500 text-sm">Languages are required</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700">Specialties</label>
              <div className="space-y-2">
                {specialtyFields.map((field, index) => (
                  <div key={field.id} className="flex items-center">
                    <input
                      type="text"
                      defaultValue={field.value}
                      {...register(`specialties.${index}`, { required: true })}
                      className={`w-full p-2 border ${
                        errors.specialties && errors.specialties[index]
                          ? "border-red-500"
                          : "border-gray-300"
                      } rounded`}
                      placeholder="Specialty"
                    />
                    <button
                      type="button"
                      className="ml-2 bg-red-500 text-white px-2 py-1 rounded"
                      onClick={() => removeSpecialty(index)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className="mt-2 bg-blue-500 text-white px-2 py-1 rounded"
                  onClick={() => appendSpecialty({ value: "" })}
                >
                  Add Specialty
                </button>
              </div>
              {errors.specialties && (
                <p className="text-red-500 text-sm">Specialties are required</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700">Bio</label>
              <textarea
                defaultValue={defaultValues.bio}
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
                defaultValue={defaultValues.imageUrl}
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
                defaultValue={email}
                readOnly
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
                defaultValue={defaultValues.contactDetails.phone}
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
                defaultValue={defaultValues.contactDetails.address}
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
              <div className="space-y-2">
                {educationFields.map((field, index) => (
                  <div key={field.id} className="flex items-center">
                    <input
                      type="text"
                      defaultValue={field.degree}
                      {...register(`education.${index}.degree`, {
                        required: true,
                      })}
                      className={`w-full p-2 border ${
                        errors.education && errors.education[index]
                          ? "border-red-500"
                          : "border-gray-300"
                      } rounded`}
                      placeholder="Degree"
                    />
                    <input
                      type="text"
                      defaultValue={field.university}
                      {...register(`education.${index}.university`, {
                        required: true,
                      })}
                      className={`w-full p-2 border ${
                        errors.education && errors.education[index]
                          ? "border-red-500"
                          : "border-gray-300"
                      } rounded`}
                      placeholder="University"
                    />
                    <input
                      type="text"
                      defaultValue={field.year}
                      {...register(`education.${index}.year`, {
                        required: true,
                      })}
                      className={`w-full p-2 border ${
                        errors.education && errors.education[index]
                          ? "border-red-500"
                          : "border-gray-300"
                      } rounded`}
                      placeholder="Year"
                    />
                    <button
                      type="button"
                      className="ml-2 bg-red-500 text-white px-2 py-1 rounded"
                      onClick={() => removeEducation(index)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className="mt-2 bg-blue-500 text-white px-2 py-1 rounded"
                  onClick={() =>
                    appendEducation({ degree: "", university: "", year: "" })
                  }
                >
                  Add Education
                </button>
              </div>
              {errors.education && (
                <p className="text-red-500 text-sm">Education is required</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700">Skills</label>
              <div className="space-y-2">
                {skillFields.map((field, index) => (
                  <div key={field.id} className="flex items-center">
                    <input
                      type="text"
                      defaultValue={field.value}
                      {...register(`skills.${index}`, { required: true })}
                      className={`w-full p-2 border ${
                        errors.skills && errors.skills[index]
                          ? "border-red-500"
                          : "border-gray-300"
                      } rounded`}
                      placeholder="Skill"
                    />
                    <button
                      type="button"
                      className="ml-2 bg-red-500 text-white px-2 py-1 rounded"
                      onClick={() => removeSkill(index)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className="mt-2 bg-blue-500 text-white px-2 py-1 rounded"
                  onClick={() => appendSkill({ value: "" })}
                >
                  Add Skill
                </button>
              </div>
              {errors.skills && (
                <p className="text-red-500 text-sm">Skills are required</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700">Work Experience</label>
              <div className="space-y-2">
                {workExperienceFields.map((field, index) => (
                  <div key={field.id} className="flex items-center">
                    <input
                      type="text"
                      defaultValue={field.position}
                      {...register(`workExperience.${index}.position`, {
                        required: true,
                      })}
                      className={`w-full p-2 border ${
                        errors.workExperience && errors.workExperience[index]
                          ? "border-red-500"
                          : "border-gray-300"
                      } rounded`}
                      placeholder="Position"
                    />
                    <input
                      type="text"
                      defaultValue={field.organization}
                      {...register(`workExperience.${index}.organization`, {
                        required: true,
                      })}
                      className={`w-full p-2 border ${
                        errors.workExperience && errors.workExperience[index]
                          ? "border-red-500"
                          : "border-gray-300"
                      } rounded`}
                      placeholder="Organization"
                    />
                    <input
                      type="text"
                      defaultValue={field.duration}
                      {...register(`workExperience.${index}.duration`, {
                        required: true,
                      })}
                      className={`w-full p-2 border ${
                        errors.workExperience && errors.workExperience[index]
                          ? "border-red-500"
                          : "border-gray-300"
                      } rounded`}
                      placeholder="Duration"
                    />
                    <button
                      type="button"
                      className="ml-2 bg-red-500 text-white px-2 py-1 rounded"
                      onClick={() => removeWorkExperience(index)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className="mt-2 bg-blue-500 text-white px-2 py-1 rounded"
                  onClick={() =>
                    appendWorkExperience({
                      position: "",
                      organization: "",
                      duration: "",
                    })
                  }
                >
                  Add Work Experience
                </button>
              </div>
              {errors.workExperience && (
                <p className="text-red-500 text-sm">
                  Work Experience is required
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateGuideProfile;
