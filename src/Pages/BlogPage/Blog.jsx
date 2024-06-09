import React from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import PageHeader from "../../Components/Shared/PageHeader";
import BlogCard from "../../Components/Shared/BlogCard";


const Blog = () => {
  const navigate = useNavigate();
  const axiosSecure=useAxiosSecure()
  const {
    data: travelStories = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["travelStories"],
    queryFn: async () => {
      const res = await axiosSecure.get("/travelStories");
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
        pageTitle={"travel stories"}
        breadCrumbs={"blog"}
      ></PageHeader>

      <div className="grid justify-items-center lg:grid-cols-3 gap-4 py-12 container mx-auto">
        {travelStories.map((blog) => (
          <BlogCard key={blog?._id} blog={blog}></BlogCard>
        ))}
      </div>
    </div>
  );
};

export default Blog;
