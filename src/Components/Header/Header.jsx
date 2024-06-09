import { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./header.css";
import { AuthContext } from "../../Provider/Provider";
import { getAuth } from "firebase/auth";
import app from "../../Firebase/firebase.config";
import axios from "axios";
import { AwesomeButton } from "react-awesome-button";
import useAdmin from "../../Hooks/useAdmin";
import useGuide from "../../Hooks/useGuide";

const auth = getAuth(app);
const Header = () => {
  const [isAdmin] = useAdmin();
  const [isGuide] = useGuide();
  // const handleToggle = (e) => {
  //   if (e.target.checked) {
  //     setTheme("dark");
  //   } else {
  //     setTheme("light");
  //   }
  // };
  // const [theme, setTheme] = useState(
  //   localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  // );
  // useEffect(() => {
  //   localStorage.setItem("theme", theme);
  //   const localTheme = localStorage.getItem("theme");
  //   document.querySelector("html").setAttribute("data-theme", localTheme);
  // }, [theme]);
  const { user, logOut } = useContext(AuthContext);
  const navLinks = (
    <>
      <li>
        <NavLink to={"/"}>Home</NavLink>
      </li>
      <li>
        <NavLink to={"/packages"}>Packages</NavLink>
      </li>
      <li>
        <NavLink to={"/blog"}>Blogs</NavLink>
      </li>
      <li>
        <NavLink to={"/about-us"}>About Us</NavLink>
      </li>
      <li>
        <NavLink to={"/contact"}>Contact Us</NavLink>
      </li>
    </>
  );
  return (
    <div className="lg:bg-gradient-to-b from-black lg:bg-transparent  w-full bg-secondary text-white">
      <div className="navbar container lg:pb-12 lg:pt-8 mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={50}
              className="menu  menu-sm dropdown-content mt-4 p-2 shadow bg-primary rounded-box w-44"
            >
              {navLinks}
            </ul>
          </div>
          <NavLink
            to={"/"}
            className="lg:logo p-0 h-0 relative text-xl flex items-center w-full"
          >
            <img
              src="https://i.ibb.co/94N1vNb/Blue-Yellow-Simple-Tour-And-Travel-Logo-3-1.png"
              alt=""
              className="lg:max-w-[250px] max-w-[150px]"
            />
          </NavLink>
        </div>
        
        <div className="navbar justify-end">
          <ul className="menu menu-horizontal hidden lg:flex px-1">{navLinks}</ul>
          {user ? (
            <button
              className="btn rounded-none lg:hidden"
              onClick={() => logOut(auth)}
            >
              Log Out
            </button>
          ) : (
            ""
          )}
          {user ? (
            <div className="dropdown lg:dropdown-hover dropdown-end relative ml-4">
              <div tabIndex={0} role="button" className="m-1">
                <div className="w-12 relative ">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={user.photoURL}
                  />
                  {
                    isGuide ? <div className="badge hover:bg-primary badge-accent gap-1 text-white absolute bottom-0 font-bold right-0"> guide</div>:''
                  }
                  {
                    isAdmin ? <div className="badge hover:bg-primary badge-accent gap-1 text-white absolute right-0 bottom-0 font-bold"> Admin</div>:''
                  }
                </div>
              </div>
              <ul
                tabIndex={50}
                className="dropdown-content z-[99999] menu p-2 shadow absolute w-auto rounded-none right-12 lg:block bg-primary"
              >
                <li>
                  <Link to={'/dashboard'}>Dashboard</Link>
                </li>
                <li>
                  <Link to={'dashboard/my-offers'}>My Offers</Link>
                </li>
                <li>
                  <h1 className="text-gray-300">{user.displayName}</h1>
                </li>
                <li>
                  <h1 className="text-gray-300">{user.email}</h1>
                </li>
                <li>
                  <Link onClick={() => logOut(auth)}>Log Out</Link>
                </li>
              </ul>
            </div>
          ) : (
            <div className="lg:relative absolute lg:right-0 right-16">
              <Link
                to={"/sign-up"}
                className="lg:btn p-3 lg:p-0 lg:bg-primary lg:text-white lg:rounded-none lg:px-7 border-none hover:bg-primary hover:text-gray-300"
              >
                Sign Up
              </Link>
              <Link
                to={"/sign-in"}
                className="lg:btn p-3 lg:p-0 lg:bg-transparent lg:border-primary lg:text-white hover:border-primary lg:rounded-none lg:px-7 hover:bg-primary hover:text-white"
              >
                Sign In
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
