import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import BlogCard from '../../../Components/Shared/BlogCard';

const TravelStoriesSection = () => {
    const axiosSecure = useAxiosSecure();
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
            <h1 className="font-extrabold container mx-auto text-center capitalize text-4xl text-primary">travel stories by user</h1>
            <div className="grid lg:grid-cols-3 gap-2">
                {
                    travelStories.slice(0,3).map((blog)=>(

                        <BlogCard key={blog._id} blog={blog}></BlogCard>
                    ))
                }
            </div>
        </div>
    );
};

export default TravelStoriesSection;