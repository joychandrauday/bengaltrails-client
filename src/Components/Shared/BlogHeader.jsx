import React from "react";
import { BiCalendar, BiCommentDetail } from "react-icons/bi";

const BlogHeader = ({
  bgImg,
  blogTitle,
  author,
  authorImg,
  date,
  comments,
}) => {
  const { name, image } = author;
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
          {blogTitle}
        </h1>
        <div className="flex items-center justify-center pt-4">
          <div className="wrapper flex items-center">
            <div className="user flex items-center justify-center gap-3">
              <div className="avatar">
                <div className="w-10 rounded-full">
                  <img src={`${authorImg}`} />
                </div>
              </div>
              <h1 className=" text-white text-xl">{`${author}`}</h1>
            </div>
            <div className="divider lg:divider-horizontal divider-warning "></div>
            <div className="date flex items-center gap-2 text-white font-bold text-[15px]">
              <BiCalendar className="text-2xl"></BiCalendar> {date}
            </div>
            <div className="divider lg:divider-horizontal divider-warning "></div>
            <div className="date flex items-center gap-2 text-white font-bold text-[15px]">
              <BiCommentDetail className="text-2xl"></BiCommentDetail>{" "}
              {comments}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogHeader;
