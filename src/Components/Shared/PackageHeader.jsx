import React from "react";
import { BiCalendar, BiCommentDetail, BiSlider } from "react-icons/bi";
import { FaBangladeshiTakaSign } from "react-icons/fa6";

const BlogHeader = ({
  bgImg,
  packageTitle,
  price,
  type
}) => {
  return (
    <div
      className="bg-primary pb-12  pt-32 h-96 flex items-center justify-center"
      style={{
        backgroundImage: `linear-gradient(rgba(57, 53, 53, 0.8), rgba(57, 53, 53, 0.8)),url(${bgImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
      }}
    >
      <div className="wrapper ">
        <h1 className="text-white font-bold capitalize text-4xl">
          {packageTitle}
        </h1>
        <div className="flex items-center justify-center pt-4">
          <div className="wrapper flex items-center">
            
            <div className="date flex items-center gap-2 text-white font-bold text-accent text-2xl">
              <FaBangladeshiTakaSign className="text-2xl"></FaBangladeshiTakaSign> {price} bdt
            </div>
            <div className="divider lg:divider-horizontal divider-warning "></div>
            <div className="date flex items-center gap-2 text-white font-bold text-accent text-2xl">
              <BiSlider className="text-2xl"></BiSlider>{" "}
              {type}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogHeader;
