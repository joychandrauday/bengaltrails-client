import React from "react";
import { CiLocationArrow1 } from "react-icons/ci";
import { FaHeart, FaLocationArrow, FaLocationPin, FaLocationPinLock } from "react-icons/fa6";
import { SlCalender } from "react-icons/sl";
import { Link } from "react-router-dom";

const BlogCard = ({blog}) => {
    const handleViewPost=(id)=>{
        console.log(id);
    }
    const {_id, title, author, date, destination, featureImage, content, images, tags, excerpt, comments}=blog;
    console.log(blog
        
    );
  return (
    <div>
      <div
        className="card p-0 w-96 bg-base-100 shadow-xl rounded-none"
      >
        <figure className="h-56 rounded-none">
          <img
            src={
                featureImage ||
              "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
            }
            alt={title}
          />
          <Link className="p-4 text-xl bg-primary rounded text-white btn absolute top-2 right-2">
            <FaHeart></FaHeart>
          </Link>
        </figure>
        <div className="card-body pt-4">
          <div className="flex items-center gap-2">
            <h2 className="card-title">{title}</h2>
          </div>
          <p className="text-left">{excerpt}</p>
          <div className="flex items-center justify-between">
            <div className="destination">
                <h1 className="font-bold flex items-center gap-2"><FaLocationArrow></FaLocationArrow>{destination}</h1>
            </div>
            <div className="destination">
                <h1 className="font-bold flex items-center gap-2"><SlCalender></SlCalender>{date}</h1>
            </div>

          </div>
          <div className="card-actions">
            <div className="capitalize font-bold text-xl">
              price: <span className="font-extrabold">{} BDT</span>
            </div>
          </div>
          <button
            onClick={() => handleViewPost(_id)}
            className="btn btn-primary rounded-none bg-primary hover:bg-secondary border-none text-white"
          >
            View Package
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
