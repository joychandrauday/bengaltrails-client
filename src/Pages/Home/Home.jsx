import React, { useContext, useEffect, useState } from "react";

// import required modules
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../../Provider/Provider";
import { IoBicycleSharp } from "react-icons/io5";
import { RiChatQuoteFill } from "react-icons/ri";

import ReactPlayer from "react-player";
import { Link } from "react-router-dom";
import TourAndTravelGuide from "./HomeComponents/TourAndTravelGuide";

const Home = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Bengal Trails: the trails must be faced.</title>
      </Helmet>
      <div className="home-slider h-screen overflow-hidden">
        <div className="video-container ">
          <ReactPlayer
            url="https://www.youtube.com/watch?v=IxF55qB4CuQ"
            playing
            loop
            muted
            width="100%"
            height="116vh"
            className="video-iframe"
          />
        </div>
        <div className="content absolute w-full top-0 min-h-screen flex items-center justify-center bg-black bg-opacity-30 text-white">
          <div className="wrapper text-center">
            <h1 className="text-5xl capitalize w-4/5 mx-auto font-bold">
              make your next tour hasselfree with us.
            </h1>
            <p className="my-4 text-[18px]">
              Your Ultimate Travel Guide to Hidden Gems and Famous Landmarks
            </p>
            <div className="">
              <Link className="btn bg-accent text-black border-none rounded-none capitalize mx-1">
                <IoBicycleSharp className="text-xl" />
                explore now.
              </Link>
              <Link className="btn bg-accent text-black border-none rounded-none capitalize mx-1">
                <RiChatQuoteFill className="text-xl" />
                get a quote
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="tourismAndTravelGuide py-24">
        <TourAndTravelGuide></TourAndTravelGuide>
      </div>
      <div className="py-12">
        
      </div>
    </div>
  );
};

export default Home;
