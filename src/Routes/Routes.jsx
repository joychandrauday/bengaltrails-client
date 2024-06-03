import React from 'react';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Root from '../Pages/Root/Root';
import Error from '../Pages/ErrorPage/Error';

import Home from '../Pages/Home/Home';
import SignIn from '../Pages/Sign In/SignIn';
import SignUp from '../Pages/SignUp/SignUp';
import PrivateRoute from './../Private Route/PrivateRoute';
import Blog from '../Pages/BlogPage/Blog';
import SingleBlogPage from '../Pages/BlogPage/SingleBlogPage';
import TypeWisePackage from '../Pages/Package/TypeWisePackage';
import PackageDetails from '../Pages/Package/PackageDetails';

const router = createBrowserRouter([
    {
      path: "/",
      element: <Root></Root>,
      errorElement:<Error></Error>,
      children: [
        {
          path: "/",
          element: <Home></Home>
        },
        {
          path: "/blog",
          element: <Blog></Blog>
        },
        {
          path: "/story/:id",
          element: <SingleBlogPage></SingleBlogPage>
          
        },
        {
          path: "/tourType/:name",
          element: <TypeWisePackage></TypeWisePackage>
        },
        {
          path: "/package/:id",
          element: <PackageDetails></PackageDetails>
        },
        {
          path: "/sign-in",
          element: <SignIn></SignIn>,
        },
        {
          path: "/guides/:name",
          element: <SignIn></SignIn>,
        },
        {
          path: "/sign-up",
          element: <SignUp></SignUp>,
        },
      ],
    },
  ]);

export default router;