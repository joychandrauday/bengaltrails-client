import React from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import PageHeader from "../../Components/Shared/PageHeader";
import BlogHeader from "../../Components/Shared/BlogHeader";
import { Gallery } from "react-grid-gallery";

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

  // Ensure story.author exists before destructuring its properties
  const author = story.author || {};
  const { name, image } = author;
  const commentNum = story.comments.length;

  // Map images for the Gallery component
  const images = story.images.map((img) => ({
    src: img,
    width: 320,
    height: 174,
    caption: "Image Caption Here", // Adjust caption as needed
  }));

  return (
    <div className="">
      <BlogHeader
        blogTitle={story.title}
        bgImg={story.featureImage}
        author={name} // Use author name
        authorImg={image} // Use author image
        date={story.date}
        comments={commentNum}
      />
      <div className="flex items-start gap-4 container mx-auto pt-8">
        <div className="basis-2/3 ">
          <div className=" ">
            <h1 className="text-3xl font-bold mb-4">{story.title}</h1>
            <div className="prose text-[16px] max-w-none">{story.content}</div>
            <div className="">
              <img
                src={story.featureImage}
                alt={story.title}
                className="my-4 w-3/5"
              />
            </div>
            <div className="mt-6">
              <h2 className="text-2xl font-semibold mb-2">Comments</h2>
              {story.comments && story.comments.length > 0 ? (
                story.comments.map((comment) => (
                  <div key={comment.date} className="mb-4">
                    <div className="flex items-center gap-2">
                      <img
                        src={comment.userImage}
                        alt="user"
                        className="w-12"
                      />
                      <p className="font-semibold">{comment.user}</p>
                    </div>
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
        <div className="basis-1/3">
          <h1 className="capitalize font-bold text-xl">more photos from the gallery</h1>
          <Gallery images={images} />
        </div>
      </div>
    </div>
  );
};

export default SingleBlogPage;
