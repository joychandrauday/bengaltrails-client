import React, { useContext, useState } from "react";
import { FaBreadSlice, FaHome, FaShoppingCart } from "react-icons/fa";
import { FaBangladeshiTakaSign, FaBars, FaClock, FaHouseChimneyUser, FaSpoon, FaUser, FaUserAstronaut, FaUsers } from "react-icons/fa6";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { IoExit } from "react-icons/io5";
import { BsArrowLeft, BsArrowLeftCircle } from "react-icons/bs";
import { IoMdArrowDropleftCircle } from "react-icons/io";
import useAdmin from "../../Hooks/useAdmin";
import { GiForkKnifeSpoon, GiSpoon } from "react-icons/gi";
import { AuthContext } from "../../Provider/Provider";

const Dashboard = () => {
  //admin management
  const [isAdmin]= useAdmin();
  // const isAdmin= true;
  const { logOut } = useContext(AuthContext);
  // const navigate =useNavigate()
  const {user}=useContext(AuthContext)
  return (
    <div className="">
      <div className="">
        <Outlet></Outlet>
      </div>
      <div className="drawer">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <label
            htmlFor="my-drawer"
            className="left-0 drawer-button text-2xl p-4 top-2  cursor-pointer fixed"
          >
            <FaBars className="text-second"/>
          </label>
        </div>
        <div className="drawer-side">
          <div className="min-h-screen w-80 p-4 backdrop-blur-lg">
            <label
              htmlFor="my-drawer"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu dashMenu p-4 w-80 min-h-full text-base-content">
              {
                isAdmin?<>

                  <li>
                    <NavLink to={"/dashboard/admin-home"}>
                      <FaHouseChimneyUser /> Admin Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={"/dashboard/add-item"}>
                    <GiForkKnifeSpoon /> Add Food Item
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={"/dashboard/food-management"}>
                      <FaSpoon /> Manage Food
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={"/dashboard/users"}>
                    <FaUserAstronaut /> User Management
                    </NavLink>
                  </li>
                  <div className="divider"></div>
                
                </>:''

              }
              <li>
                <NavLink to={"/dashboard/user-home"}>
                  <FaHome /> User Home
                </NavLink>
              </li>
              <li>
                <NavLink to={"/dashboard/profile"}>
                  <FaUser /> User Profile
                </NavLink>
              </li>
              <li>
                <NavLink to={"/dashboard/cart"}>
                  <FaShoppingCart /> My Cart
                </NavLink>
              </li>
              <li>
                <NavLink to={"payment"}>
                  <FaBangladeshiTakaSign /> Payment
                </NavLink>
              </li>
              <li>
                <NavLink to={"payment-history"}>
                  <FaClock /> Payment History 
                </NavLink>
              </li>

              <div className="divider"></div>
              <li>
                <NavLink to={"/"}>
                  <FaHome /> Home
                </NavLink>
              </li>
              <li>
                <NavLink to={"/shop/salad"}>
                  <FaBreadSlice /> Menu
                </NavLink>
              </li>
              
            </ul>

            <div className="divider"></div>
            <div className="flex justify-between">
              <Link to={'/'} onClick={() => logOut()}  className="flex gap-2 capitalize font-bold">
                log out <IoExit className="text-3xl" />
              </Link>
              {/* Close button inside the drawer */}
              <label htmlFor="my-drawer" className="cursor-pointer text-xl absolute top-3 right-3">
              <IoMdArrowDropleftCircle className="text-3xl" />
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
