import React from "react";
import { FaHeart, FaLocationDot, FaUserPen } from "react-icons/fa6";
import { SlCalender } from "react-icons/sl";
import { Link } from "react-router-dom";

const BlogCard = ({blog}) => {
    
    const {_id, title, author, date, destination, featureImage, content, images, tags, excerpt, comments}=blog;
  
  return (
    <div key={_id}>
      <div
        className="card p-0 w-96 bg-base-100 shadow-xl rounded-none border"
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
            <h2 className="card-title font-bold ">{title}</h2>
          </div>
          <p className="text-left">{excerpt}</p>
          <div className="flex items-center justify-between">
            <div className="destination">
                <h1 className="font-bold text-xl flex items-center gap-2"><FaLocationDot />{destination}</h1>
            </div>
            <div className="destination">
                <h1 className="font-bold flex items-center gap-2"><SlCalender></SlCalender>{date}</h1>
            </div>

          </div>
          <div className="flex items-start justify-between">
            <div className="destination ">
                <h1 className="flex items-center gap-2 font-extrabold"><FaUserPen></FaUserPen> {author}</h1>
            </div>
            <div className="destination ">
                <h1 className="font-bold items-center">{tags.map((tag)=><div className="badge badge-sm badge-outline m-[2px]">{tag}</div>)}</h1>
            </div>
          </div>
          
          <Link
            className="btn btn-primary rounded-none bg-primary hover:bg-secondary border-none text-white capitalize"
            to={`/story/${_id}`}
          >
            read story
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
