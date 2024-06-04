import React, { useState, useContext } from "react";
import { FaHeart, FaLocationDot, FaUserPen } from "react-icons/fa6";
import { SlCalender } from "react-icons/sl";
import { Link } from "react-router-dom";
import axios from "axios"; // Assuming you're using axios for HTTP requests
import { AuthContext } from "../../Provider/Provider";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
 // Example context for user information

 import { ToastContainer, toast } from 'react-toastify';
 import 'react-toastify/dist/ReactToastify.css';

const BlogCard = ({ blog }) => {
  const {
    _id,
    title,
    author,
    date,
    destination,
    featureImage,
    excerpt,
    tags
  } = blog;
  const axiosSecure=useAxiosSecure();
  const [isAddedToWishlist, setIsAddedToWishlist] = useState(false);

  const { user } = useContext(AuthContext); // Get user information from context

  const handleAddToWishlist = async () => {
    if (!user) {
      toast("Please log in to add to your wishlist.");
      return;
    }

    try {
      // Assuming you have an endpoint to add to wishlist
      await axiosSecure.post(`/bucket-list`, { blogId: _id, email: user.email });
      setIsAddedToWishlist(true);
      toast("Added to your wishlist!");
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      // Optionally, show an error notification to the user
      toast("Failed to add to wishlist.");
    }
  };

  return (
    <div key={_id}>
      <ToastContainer />
      <div className="card p-0 w-96 bg-base-100 shadow-xl rounded-none border">
        <figure className="h-56 rounded-none relative">
          <img
            src={
              featureImage ||
              "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
            }
            alt={title}
          />
          <button
            onClick={handleAddToWishlist}
            className={ isAddedToWishlist ? "bg-secondary p-4 text-xl z-[999999999] rounded text-white btn absolute top-2 right-2" : `p-4 text-xl bg-primary rounded text-white btn absolute top-2 right-2 
            `} 
            
            disabled={isAddedToWishlist}
          >
            <FaHeart />
          </button>
        </figure>
        <div className="card-body pt-4">
          <div className="flex items-center gap-2">
            <h2 className="card-title font-bold">{title}</h2>
          </div>
          <p className="text-left">{excerpt}</p>
          <div className="flex items-center justify-between">
            <div className="destination">
              <h1 className="font-bold text-xl flex items-center gap-2">
                <FaLocationDot />
                {destination}
              </h1>
            </div>
            <div className="destination">
              <h1 className="font-bold flex items-center gap-2">
                <SlCalender />
                {date}
              </h1>
            </div>
          </div>
          <div className="flex items-start justify-between">
            <div className="destination">
              <h1 className="flex items-center gap-2 font-extrabold">
                <FaUserPen /> {author?.name}
              </h1>
            </div>
            <div className="destination">
              <h1 className="font-bold items-center">
                {tags.map((tag) => (
                  <div key={tag} className="badge badge-sm badge-outline m-[2px]">
                    {tag}
                  </div>
                ))}
              </h1>
            </div>
          </div>
          <Link
            className="btn btn-primary rounded-none bg-primary hover:bg-secondary border-none text-white capitalize"
            to={`/story/${_id}`}
          >
            Read Story
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
