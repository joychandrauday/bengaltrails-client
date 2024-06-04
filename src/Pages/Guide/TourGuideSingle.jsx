import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const TourGuideSingle = () => {
  const { guideId } = useParams(); // Destructure to extract the guide ID value
  const [guide, setGuideDetails] = useState(null); // Initialize as null for an object
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchGuideDetails = async () => {
      try {
        const response = await axiosSecure.get(`/guide/${guideId}`);
        setGuideDetails(response.data);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    if (guideId) {
      fetchGuideDetails();
    }
  }, [axiosSecure, guideId]); // Add axiosSecure and guideId to the dependency array

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-md"></span>
      </div>
    );
  }

  if (error) {
    return <div>Error fetching guide data</div>;
  }
  console.log(guide);
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="card bg-primary text-white">
        <div className="wrap text-center relative">
          <div className="avatar">
            <div className="w-44 rounded-full">
              {guide?.imageUrl && (
                <img
                  src={guide.imageUrl}
                  alt={guide.guideName}
                  className="w-44 mx-auto "
                />
              )}
            </div>
          </div>
          <div className="badge border-none text-white right-0 capitalize badge-lg font-bold bg-orange-400 absolute">
            {guide.experience}+ experience
          </div>

          <h2 className="text-2xl font-bold ">{guide?.guideName}</h2>
          <p className="w-3/5 mx-auto">{guide?.bio}</p>
          <div className="flex justify-around pt-8 items-center">
            <div className="social flex gap-1 items-center justify-center">
              <h1 className="capitalize font-bold ">fluent in:</h1>
              {guide.languages.map((language) => (
                <div key={language.id} className="badge badge-warning">
                  {language}
                </div>
              ))}
            </div>
            <div className="divider lg:divider-horizontal divider-warning"></div>
            <div className="social">
              <div className="share flex items-center justify-center gap-2">
                <h1 className="capitalize font-bold ">have speciality in:</h1>
                {guide.specialties.map((special) => (
                  <div key={special.id} className="badge badge-warning">
                    {special}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* Add more guide details as needed */}
      </div>
    </div>
  );
};

export default TourGuideSingle;
