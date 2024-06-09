import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "../Pages/Root/Root";
import Error from "../Pages/ErrorPage/Error";

import Home from "../Pages/Home/Home";
import SignIn from "../Pages/Sign In/SignIn";
import SignUp from "../Pages/SignUp/SignUp";
import PrivateRoute from "./../Private Route/PrivateRoute";
import Blog from "../Pages/BlogPage/Blog";
import SingleBlogPage from "../Pages/BlogPage/SingleBlogPage";
import TypeWisePackage from "../Pages/Package/TypeWisePackage";
import PackageDetails from "../Pages/Package/PackageDetails";
import TourGuideSingle from "../Pages/Guide/TourGuideSingle";
import Dashboard from "../Pages/dashboard/Dashboard";
import AdminHome from "../Pages/dashboard/AdminHome";
import AdminRoute from './../Pages/dashboard/AdminRoute';
import AllUsers from "../Pages/dashboard/AllUsers";
import UserProfile from "../Pages/dashboard/UserProfile copy";
import AddPackage from "../Pages/dashboard/AddPackage";
import Bookings from "../Pages/dashboard/Bookings";
import BucketList from "../Pages/dashboard/BucketList";
import ReqAdmin from "../Pages/dashboard/ReqAdmin";
import GuideAssignedTour from "../Pages/dashboard/GuideAssignedTour";
import ManageGuide from "../Pages/dashboard/ManageGuide";
import AllPackages from "../Pages/AllPackages/AllPackages";
import MyOffer from './../Pages/dashboard/MyOffer';
import Contact from "../Pages/Contact/Contact";
import About from "../Pages/About us/About";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <Error></Error>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/blog",
        element: <Blog></Blog>,
      },
      {
        path: "/packages",
        element: <AllPackages></AllPackages>,
      },
      {
        path: "/contact",
        element: <Contact></Contact>,
      },
      {
        path: "/about-us",
        element: <About></About>,
      },
      {
        path: "/story/:id",
        element: <SingleBlogPage></SingleBlogPage>,
      },
      {
        path: "/tourType/:name",
        element: <TypeWisePackage></TypeWisePackage>,
      },
      {
        path: "/package/:id",
        element: (
          <PrivateRoute>
            <PackageDetails></PackageDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "/sign-in",
        element: <SignIn></SignIn>,
      },
      {
        path: "/guide/:guideId",
        element: <TourGuideSingle></TourGuideSingle>,
      },
      {
        path: "/sign-up",
        element: <SignUp></SignUp>,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      {
        path: "admin-home",
        element: <AdminHome></AdminHome>,
      },
      {
        path: "profile",
        element: <UserProfile></UserProfile>,
      },
      {
        path: "bookings",
        element: <Bookings></Bookings>,
      },
      {
        path: "bucket-list",
        element: <BucketList></BucketList>,
      },
      {
        path: "my-offers",
        element: <MyOffer></MyOffer>,
      },
      {
        path: "request-admin",
        element: <ReqAdmin></ReqAdmin>,
      },
      {
        path: "assigned",
        element: <GuideAssignedTour></GuideAssignedTour>,
      },
      {
        path: "add-package",
        element: <AdminRoute><AddPackage></AddPackage></AdminRoute>,
      },
      {
        path: "guide",
        element: <AdminRoute><ManageGuide></ManageGuide></AdminRoute>,
      },
      {
        path: "users",
        element: (
          <AdminRoute>
            <AllUsers></AllUsers>
          </AdminRoute>
        ),
      },
      {
        path: "user-home",
        element: (
          <AdminRoute>
            <UserProfile></UserProfile>
          </AdminRoute>
        ),
      },
    ],
  },
]);

export default router;
