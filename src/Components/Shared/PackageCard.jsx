import React from "react";
import { FaHeart } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
const PackageCard = ({ pack }) => {
  const navigate=useNavigate()
  const handleViewPackageClick=(id)=>{
    navigate(`/package/${id}`)
  }
  return (
    <div>
      <div
        key={pack._id}
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
          <Link className="p-4 text-xl bg-primary rounded text-white btn absolute top-2 right-2">
            <FaHeart></FaHeart>
          </Link>
        </figure>
        <div className="card-body pt-4">
          <div className="flex items-center gap-2">
            <h2 className="card-title">{pack.packageName}</h2>
            <div className="badge badge-outline">{pack.tourType}</div>
          </div>
          <p className="text-left">{pack.aboutTour}</p>
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
