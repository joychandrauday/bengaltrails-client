import React from "react";
import { Link } from "react-router-dom";

import {  FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa6";

const TabOverView = () => {
  return (
    <section className="company-overview">
      <div className="container flex items-center gap-4">
        <div className="basis-1/2">
          <img
            src="https://i.ibb.co/3WDShF4/Blue-Yellow-Simple-Tour-And-Travel-Logo.png"
            alt=""
            className="w-3/6 mx-auto rounded-md shadow-md shadow-black"
          />
          <div className="flex gap-4 items-center justify-center text-2xl mt-4">
            <Link className="p-2 bg-primary rounded text-white">
              <FaFacebookF></FaFacebookF>
            </Link>
            <Link className="p-2 bg-primary rounded text-white">
              <FaTwitter></FaTwitter>
            </Link>
            <Link className="p-2 bg-primary rounded text-white">
              <FaInstagram></FaInstagram>
            </Link>
            <Link className="p-2 bg-primary rounded text-white">
              <FaYoutube></FaYoutube>
            </Link>
          </div>
        </div>
        <div className="basis-1/2">
          <p className="section-description  text-left">
            Welcome to Bengal Trails, your comprehensive resource for exploring
            the wonders of Bangladesh. Our mission is to help travelers discover
            both famous landmarks and hidden gems, ensuring a rich and
            unforgettable travel experience.
          </p>

          <div className="video-container ">
            <div className="video-wrapper">
              <iframe
                src="https://www.youtube.com/embed/KwMFojLPvk0?si=SDPseCp1bwnwuYXO"
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-[500px] h-[300px]"
                title="Discover Bangladesh"
              ></iframe>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .company-overview {
          padding: 40px 20px;
        }
        .container {
          max-width: 1200px;
          margin: 0 auto;
          text-align: center;
        }
        .section-title {
          font-size: 2.5em;
          margin-bottom: 20px;
          color: #50c878;
        }
        .section-description {
          font-size: 1.2em;
          margin-bottom: 40px;
          color: #333;
        }
        .video-container {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
      `}</style>
    </section>
  );
};

export default TabOverView;
