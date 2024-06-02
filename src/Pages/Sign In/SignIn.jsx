import React, { useContext } from "react";
import { FaGoogle } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";

import { AuthContext } from "../../Provider/Provider";
import Swal from "sweetalert2";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import { AwesomeButton } from "react-awesome-button";

import "react-awesome-button/dist/styles.css";
import { BsGoogle } from "react-icons/bs";

const SignIn = () => {
  const location = useLocation();
  const {
    user,
    setUser,
    setReload,
    userSignUp,
    updateUser,
    signInUser,
    loading,
    logOut,
    googleSignIn,
    githubSignIn,
  } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleSignIn = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    signInUser(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user) {
          navigate(location?.state ? location.state : "/");

          Swal.fire({
            position: "center",
            icon: "success",
            title: "You are signed in!!",
            showConfirmButton: true,
          });
        }
        // ...
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
        if (error) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Wrong email or password.",
          });
        }
        // ..
      });
  };
  const handleGoogleLogin = () => {
    googleSignIn()
      .then((res) => {
        navigate(location?.state ? location.state : "/");
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong.",
        });
      });
  };
  return (
    <div className="items-center ">
      <Helmet>
        <title>Sign in to Continue.</title>
      </Helmet>
      <div className="hero bg-basic-bg lg:min-h-screen lg:pt-32">
        {user ? (
          <div className="p-4 backdrop-blur-sm glass">
            <h1
              className="text-3xl font-extrabold uppercase 
          "
            >
              You are already signed in,
              <span className="text-yellow-400">{user.displayName}</span>
            </h1>
          </div>
        ) : (
          <div className="hero-content lg:w-2/5">
            <div className="text-center lg:text-left w-full text-white p-8 rounded">
              <h1 className="text-3xl font-bold text-center">Login now!</h1>
              <form className="" onSubmit={handleSignIn}>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="email"
                    className="input rounded-none "
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    name="password"
                    placeholder="password"
                    className="input rounded-none "
                    required
                  />
                  <div className="flex justify-between items-center">
                    <label className="label">
                      <a
                        href="#"
                        className="label-text-alt link link-hover text-sm text-white capitalize"
                      >
                        Forgot password?
                      </a>
                    </label>
                    <label className="label capitalize">
                      dont have an account?
                      <Link
                        to={"/sign-up"}
                        className="label-text-alt link link-hover text-sm capitalize font-bold text-primary hover:text-white"
                      >
                        register
                      </Link>
                    </label>
                  </div>
                </div>
                <div className="form-control">
                  <button className="btn  bg-primary rounded-none border-none text-white">
                    Login
                  </button>
                </div>
              </form>
              <div className="flex items-center justify-center pt-4 gap-3">
                <hr className="w-36 border-primary"></hr>
                <h1 className="capitalize lg:text-sm text-[12px] text-center font-bold">
                  or, continue with
                </h1>
                <hr className="w-36 border-primary"></hr>
              </div>
              <div className="flex items-center justify-center py-4">
                <BsGoogle className="text-3xl cursor-pointer" onClick={handleGoogleLogin}></BsGoogle>

              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignIn;
