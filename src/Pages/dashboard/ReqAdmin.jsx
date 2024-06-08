import React, { useContext } from "react";
import { AuthContext } from "../../Provider/Provider";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const ReqAdmin = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const {
    data: newBieGuide = {},
    refetch,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["email"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user?email=${user?.email}`);
      return res.data;
    },
  });
  const handleReqAdmin = (id) => {
    axiosSecure
      .patch(`/users/${id}`, {
        guide: "pending",
        reqGuide: true,
      })
      .then((response) => {
        if (response.data.modifiedCount > 0) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "You applied to be a tour guide.",
            showConfirmButton: true,
          });
          refetch()
        }

      })
      .catch((error) => toast("Error updating book numbers:", error));
  };
  console.log(newBieGuide);
  return (
    <div className="">
      <div className="wrap bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% min-h-screen flex items-center justify-center">
        <div className="hero min-h-screen">
          <div className="hero-content text-center">
            {newBieGuide?.reqGuide === false ? (
              <div className="max-w-md">
                <h1 className="text-5xl text-white  font-bold">
                  Hello {user.displayName}.
                </h1>
                <p className="py-6 capitalize text-xl">
                  request to admin to be a travel guide.a vast profession with
                  diversity.
                </p>
                <button
                  onClick={() => handleReqAdmin(newBieGuide?._id)}
                  className="btn btn-primary bg-primary border-none rounded-none capitalize w-full"
                >
                  request now
                </button>
              </div>
            ) : (
              <div className="max-w-md">
                <ul className="steps steps-vertical">
                  <li className="step step-primary">Request Submitted.</li>
                  <li className="step step-primary">
                    <div className="flex items-center gap-1">
                      {newBieGuide.guide === "pending" ? (
                        <div>
                          Pending{" "}
                          <div className="badge badge-warning badge-xs"></div>
                        </div>
                      ) : newBieGuide.guide === "rejected" ? (
                        <div>
                          rejected{" "}
                          <div className="badge badge-accent badge-xs"></div>
                        </div>
                      ) : (
                        <div>Congratulations!!.You are a guide now </div>
                      )}
                    </div>
                  </li>
                  {/* {newBieGuide.guide !== "rejected" ? (
                    <li className="step step-primary">rejected</li>
                  ) :newBieGuide.guide === "pending" ? (
                    ''
                  ) :(
                    <li className="step step-primary">
                      Congratulations!!.You are a guide now{" "}
                    </li>
                  )}
                  {/* {
                    newBieGuide.guide==='approved'?
                    :''
                  } */}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReqAdmin;
