import React from "react";
import PageHeader from "../../Components/Shared/PageHeader";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import PackageCard from "../../Components/Shared/PackageCard";

const AllPackages = () => {
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
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
  return (
    <div>
      <PageHeader
        pageTitle={"all travel packages."}
        breadCrumbs={"packages"}
      ></PageHeader>

      <div className="grid lg:grid-cols-3 gap-4 py-12 container mx-auto">
        {packages.map((pack) => (
          <PackageCard key={pack._id} pack={pack}></PackageCard>
        ))}
      </div>
    </div>
  );
};

export default AllPackages;
