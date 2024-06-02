import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div
      style={{
        backgroundImage:
          "url('https://i.ibb.co/St2K5g6/drew-murphy-P2-M1-Nj9-YJfo-unsplash.jpg')",
        backgroundPosition: "center center",
        backgroundSize: "cover",
      }}
      className="min-h-screen flex items-start p-12 justify-start "
    >
      <Helmet>
        <title>Error | page not found.</title>
      </Helmet>
      <div className="wrapper bg-primary p-4 rounded" >
        <div className="">
          <img
            src="https://i.ibb.co/J2SjmV8/output-onlinegiftools.gif"
            alt=""
            className="w-44 mx-auto rounded "
          />
        </div>
        <h1 className="capitalize font-extrabold text-3xl text-white py-3">
          Error 404 | destination not found.
        </h1>
        <Link
          to={"/"}
          className="btn bg-primary shadow-2xl shadow-black border-none text-white capitalize font-bold rounded-none w-full"
        >
          back to home
        </Link>
      </div>
    </div>
  );
};

export default Error;
