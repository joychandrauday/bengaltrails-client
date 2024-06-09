import React, { useEffect, useState } from "react";
import PageHeader from "../../Components/Shared/PageHeader";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useParams } from "react-router-dom";
import PackageCard from "../../Components/Shared/PackageCard";

const TypeWisePackage = () => {
  const [typeWise, setTypeWise] = useState();
  const axiosSecure = useAxiosSecure();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const type = useParams();
  useEffect(() => {
    const fetchTypeWise = async () => {
      try {
        const response = await axiosSecure.get(`/tourType/${type.name}`);
        setTypeWise(response.data);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    fetchTypeWise();
  }, []);
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-md"></span>
      </div>
    );
  }

  if (error) {
    return <div>Error fetching travel stories data: {error.message}</div>;
  }
  return (
    <div>
      <PageHeader
        pageTitle={`all package in ${type.name}`}
        breadCrumbs={`tourType/${type.name}`}
      ></PageHeader>
      <div className="grid lg:grid-cols-3 gap-4 py-12 container mx-auto">
        {typeWise.map((pack) => (
          <PackageCard key={pack?._id} pack={pack}></PackageCard>
        ))}
      </div>
    </div>
  );
};

export default TypeWisePackage;
