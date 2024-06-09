import React, { useContext } from "react";
import '../dashboard/styles.css'
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { FaBowlFood, FaDollarSign, FaListCheck } from "react-icons/fa6";
import { AuthContext } from "../../Provider/Provider";

const AdminHome = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { data: stats } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-stats");
      return res.data;
    },
  });
  return (
    <div>
      <div className="mainpage min-h-screen flex items-center justify-center">
        <h1 className="font-bold text-5xl capitalize text-white">welcome <span className="text-yellow-400">{user?.displayName}</span></h1>
      </div>
      <div className="min-h-screen statAdmin flex items-center">
        <div className="container mx-auto text-center">
          <div className="stats shadow justify-center content-center">
            <div className="stat">
              <div className="stat-figure text-secondary">
                <FaBowlFood className="text-3xl"></FaBowlFood>
              </div>
              <div className="stat-title">Food Items</div>
              <div className="stat-value">{stats?.menu}+</div>
              <div className="stat-desc">Jan 1st - Feb 1st</div>
            </div>

            <div className="stat">
              <div className="stat-figure text-secondary">
                <FaListCheck className="text-3xl"></FaListCheck>
              </div>
              <div className="stat-title">Total Order</div>
              <div className="stat-value">{stats?.orders}+</div>
              <div className="stat-desc">↗︎ 400 (22%)</div>
            </div>

            <div className="stat">
              <div className="stat-figure text-secondary">
                <FaDollarSign className="text-3xl"></FaDollarSign>
              </div>
              <div className="stat-title">New Registers</div>
              <div className="stat-value">{stats?.revenue ? stats.revenue.toFixed(2) : '0.00'}</div>
              <div className="stat-desc">↘︎ 90 (14%)</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
