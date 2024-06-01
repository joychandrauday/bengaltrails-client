import React, { useContext, useState } from "react";
import { AuthContext } from "../../Provider/Provider";
import { getAuth, signOut } from "firebase/auth";
import app from "../../Firebase/firebase.config";
import Swal from "sweetalert2";
import { Navigate, useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const auth = getAuth(app);
const SignUp = () => {
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
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const formSumit = async (data) => {
    try {
      // Create the user
      const { email, password, Name, photoURL } = data;
      const newUser = await userSignUp(email, password);
      signOut(auth);
      //console.log("User created:", newUser);

      // Update the user profile
      await updateUser(Name, photoURL);
      navigate("/sign-in");
      Swal.fire({
        position: "center",
        icon: "success",
        title: "You are registered!!!",
        text: "now log in to continue",
        showConfirmButton: true,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "The email is already registered. Use another one.",
      });
    }
  };

  return (
    <div className="bg-newsletter bg-center lg:min-h-screen items-center flex p-4">
      <Helmet>
        <title>Sign Up here.</title>
      </Helmet>
      <div className="container mx-auto card max-w-4xl shadow-2xl lg:*:bg-base-100 rounded">
        <h1 className="lg:text-3xl text-2xl px-8 pt-8 capitalize font-bold text-white">
          register your account here
        </h1>
        <form
          className="card-body pt-0 lg:grid grid-cols-2"
          onSubmit={handleSubmit(formSumit)}
        >
          <div className="basis-1/2">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="Name"
                className="input input-bordered"
                required
                {...register("Name")}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Photo URL</span>
              </label>
              <input
                type="text"
                placeholder="Image URL"
                className="input input-bordered"
                required
                {...register("photoURL")}
              />
            </div>
            <label className="label hidden lg:block capitalize ">
              <p>
                already have an account?
                <Link
                  to={"/sign-in"}
                  className="link  link-hover text-purple-950"
                >
                  log in
                </Link>
              </p>
            </label>
          </div>
          <div className="basis-1/2">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                required
                {...register("email")}
              />
            </div>
            <div className="form-control relative">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="password"
                className="input input-bordered"
                {...register("password", {
                  required: {
                    value: true,
                    message: "You Must Input A password.",
                  },
                  minLength: {
                    value: 6,
                    message: "Password must contain least 6 char.",
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
                    message:
                      "Your Password must contain an uppercase and a lowercase.",
                  },
                })}
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 text-xl top-12 cursor-pointer"
              >
                <FaEye />
              </span>

              <div>
                {errors.password && (
                  <p className="text-red-600 capitalize my-2">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>
            <label className="label capitalize ">
              <p>
                already have an account?
                <Link
                  to={"/sign-in"}
                  className="link  link-hover text-purple-950"
                >
                  log in
                </Link>
              </p>
            </label>
            <div className="form-control mt-2">
              <button className="btn hover:text-basic bg-blue-950 w-full text-white capitalize">
                register
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
