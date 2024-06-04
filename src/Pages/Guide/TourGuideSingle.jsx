import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import Rating from "react-rating";
import { FaStar } from "react-icons/fa";
import { AuthContext } from "../../Provider/Provider";
import { BsStarFill } from "react-icons/bs";

const TourGuideSingle = () => {
  const {user}=useContext(AuthContext)
  const { guideId } = useParams();
  const [guide, setGuideDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm();
  const [rating, setRating] = useState(0);

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

  useEffect(() => {
    if (guideId) {
      fetchGuideDetails();
    }
  }, [guideId]);

  const onSubmit = async (data) => {
    try {
      data.rating = rating;
      data.userName = user.displayName; // Replace with actual user name
      data.userImage = user.photoUrl; // Replace with actual user image URL
      const response = await axiosSecure.post(`/guide/${guideId}/reviews`, data);
      if (response.data.success) {
        Swal.fire({
          title: "Success!",
          text: "Your review has been submitted.",
          icon: "success",
          confirmButtonText: "OK",
        });
        fetchGuideDetails();
        reset();
        setRating(0);
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      Swal.fire({
        title: "Error!",
        text: "An error occurred while submitting your review. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

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

  return (
    <div className="pt-32 flex items-center justify-center min-h-screen container mx-auto">
      <div className="card bg-primary text-white">
        <div className="wrap text-center relative">
        <div className="wrapper w-44 mx-auto relative">
            <div className="avatar">
              <div className="w-44 rounded-full">
                {guide?.imageUrl && (
                  <img
                    src={guide.imageUrl}
                    alt={guide.guideName}
                    className="w-44 mx-auto"
                  />
                )}
              </div>
            </div>

            <div className="badge badge-accent bg-black text-yellow-400 border-none absolute  capitalize badge-lg font-bold right-4 text-[15px] shadow  ">
              <BsStarFill></BsStarFill> {guide.averageRating}
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
                <div key={language} className="badge badge-warning">
                  {language}
                </div>
              ))}
            </div>
            <div className="divider lg:divider-horizontal divider-warning"></div>
            <div className="social">
              <div className="share flex items-center justify-center gap-2">
                <h1 className="capitalize font-bold ">have speciality in:</h1>
                {guide.specialties.map((special) => (
                  <div key={special} className="badge badge-warning">
                    {special}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="divider divider-warning pt-24 pb-4">Ratings and Reviews</div>
        <div className="p-4">
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex flex-row-reverse items-center justify-start gap-4 w-4/5
            ">
              <div className="basis-1/2">
                <label className="block mb-2 font-semibold">Rating</label>
                <Rating
                  emptySymbol={<FaStar className="text-gray-300 text-xl" />}
                  fullSymbol={<FaStar className="text-yellow-500 text-xl" />}
                  initialRating={rating}
                  onChange={(rate) => setRating(rate)}
                />
              </div>
              <div className="basis-1/2">
                <label className="block mb-2 font-semibold">Review</label>
                <textarea
                  className="textarea bg-black textarea-bordered w-full"
                  {...register("review", { required: true })}
                ></textarea>
              </div>
            </div>
            <button
              disabled={!user}
              type="submit"
              className="btn btn-primary shadow shadow-black border bg-primary rounded-none border-none text-white"
            >
              Submit Review
            </button>
            <br></br>
            {!user ? (
              <PrivateRoute>
                <Link
                  to={"/sign-in"}
                  className="text-yellow-400 link font-bold uppercase"
                >
                  you need to log in first to post review.
                </Link>
              </PrivateRoute>
            ) : (
              ""
            )}
          </form>
          <div className="mt-8">
            <h4 className="text-lg font-semibold">Average Rating: {guide.averageRating}</h4>
            <h4 className="text-lg font-semibold">Existing Reviews</h4>
            {guide.reviews && guide.reviews.length > 0 ? (
              <ul className="space-y-4 mt-4">
                {guide.reviews.map((review) => (
                  <li key={review._id} className="border p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <img
                        src={review.userImage}
                        alt={review.userName}
                        className="w-8 h-8 rounded-full mr-2"
                      />
                      <span className="font-bold">{review.userName}</span>
                    </div>
                    <div className="flex items-center mb-2">
                      <span className="font-bold">{review.rating} Star{review.rating > 1 && "s"}</span>
                    </div>
                    <p>{review.review}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4">No reviews yet. Be the first to review!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourGuideSingle;
