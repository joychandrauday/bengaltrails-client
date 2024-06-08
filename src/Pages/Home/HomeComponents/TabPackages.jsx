import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaHeart } from "react-icons/fa6";
import PackageCard from "../../../Components/Shared/PackageCard";

const TabPackages = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const {
    data: packages = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["packages"],
    queryFn: async () => {
      const res = await axiosSecure.get("/packages");
      return res.data;
    },
  });

  const handleWishlistClick = (packageId) => {
    // Add the package to the user's wishlist logic here
    console.log(`Added package ${packageId} to wishlist`);
  };

  const handleViewPackageClick = (packageId) => {
    navigate(`/packages/${packageId}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-md"></span>
      </div>
    );
  }

  if (isError) {
    return <div>Error fetching packages data</div>;
  }
  console.log(packages);
  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-bold text-center mb-8">Featured Packages</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-center">
        {packages.slice(0, 3).map((pack) => (
          <PackageCard key={pack._id} pack={pack}></PackageCard>
        ))}
      </div>
      <div className="text-center mt-8">
        <button
          onClick={() => navigate("/packages")}
          className="btn btn-secondary bg-secondary border-none text-white rounded-none"
        >
          All Packages
        </button>
      </div>
    </div>
  );
};

export default TabPackages;
