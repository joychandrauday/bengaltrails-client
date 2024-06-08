import React, { useContext, useState } from "react";
import { FaHeart } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../Provider/Provider";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
const PackageCard = ({ pack }) => {
  const navigate = useNavigate();
  const handleViewPackageClick = (id) => {
    navigate(`/package/${id}`);
  };
  const axiosSecure = useAxiosSecure();
  const [isAddedToWishlist, setIsAddedToWishlist] = useState(false);

  const { user } = useContext(AuthContext); // Get user information from context

  const handleAddToWishlist = async () => {
    if (!user) {
      toast("Please log in to add to your wishlist.");
      return;
    }

    try {
      // Assuming you have an endpoint to add to wishlist
      await axiosSecure.post(`/bucket-list`, {
        pack: pack,
        email:user?.email
      });
      setIsAddedToWishlist(true);
      toast("Added to your wishlist!");
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      // Optionally, show an error notification to the user
      toast("Failed to add to wishlist.");
    }
  };
  return (
    <div>
      <div
        className="card p-0 w-96 bg-base-100 shadow-xl rounded-none"
      >
        <figure className="h-56 rounded-none">
          <img
            src={
              pack.tourFeaturedPhoto ||
              "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
            }
            alt={pack.packageName}
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
            <h2 className="card-title">{pack.packageName}</h2>
            <div className="badge badge-outline">{pack.tourType}</div>
          </div>
          <p className="text-left">{pack.aboutTour.slice(0,150)}...</p>
          <div className="card-actions">
            <div className="capitalize font-bold text-xl">
              price: <span className="font-extrabold">{pack.price} BDT</span>
            </div>
          </div>
          <button
            onClick={() => handleViewPackageClick(pack._id)}
            className="btn btn-primary rounded-none bg-primary hover:bg-secondary border-none text-white"
          >
            View Package
          </button>
        </div>
      </div>
    </div>
  );
};

export default PackageCard;
