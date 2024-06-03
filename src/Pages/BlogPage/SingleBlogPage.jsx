import React from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const SingleBlogPage = () => {
  const { id } = useParams(); // Destructure the id from useParams
  const axiosSecure = useAxiosSecure();

  const {
    data: story = {},
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["story", id], // Include id in queryKey for caching
    queryFn: async () => {
      const res = await axiosSecure.get(`/story/${id}`);
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
    return <div>Error fetching story data</div>;
  }

  console.log(story);

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-3xl mx-auto">
        <img
          src={story.featureImage}
          alt={story.title}
          className="w-full h-auto rounded-lg mb-4"
        />
        <h1 className="text-3xl font-bold mb-4">{story.title}</h1>
        <p className="text-lg mb-4">by {story.author} on {story.date}</p>
        <div className="prose max-w-none">
          {story.content}
        </div>
        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-2">Comments</h2>
          {story.comments && story.comments.length > 0 ? (
            story.comments.map(comment => (
              <div key={comment.date} className="mb-4">
                <p className="font-semibold">{comment.user}</p>
                <p>{comment.comment}</p>
                <p className="text-sm text-gray-500">{comment.date}</p>
              </div>
            ))
          ) : (
            <p>No comments yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleBlogPage;
