import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { FaCheck, FaHiking, FaTrashAlt, FaUserCog } from "react-icons/fa";
import Swal from "sweetalert2";
import Select from "react-select";
import { FaCross } from "react-icons/fa6";
import { RxCrossCircled } from "react-icons/rx";
import { IoMdCheckmarkCircle } from "react-icons/io";

const ManageGuide = () => {
  const axiosSecure = useAxiosSecure();

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { refetch, data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/reqGuide");
      return res.data;
    },
  });

  const usersPerPage = 10;
  const totalPages = Math.ceil(users.length / usersPerPage);

  const filterUser = users.filter((user) => {
    const matchesSearchTerm =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSearchTerm;
  });

  const handleReject = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/users/${id}`, {
            role: "user",
            status: "rejected",
            guide: "none",
            reqGuide: true,
          })
          .then((res) => {
            if (res.data?.modifiedCount > 0) {
              refetch();
              Swal.fire({
                title: "rejected as tour guide!",
                text: "the guide request has been canceled.",
                icon: "success",
              });
            } else {
              Swal.fire({
                title: "Error",
                text: "Some Error occured.",
                icon: "error",
              });
            }
          })
          .catch((error) => {
            console.error("Error rejecting book:", error);
            Swal.fire({
              title: "Error",
              text: "An error occurred while making the user admin.",
              icon: "error",
            });
          });
      }
    });
  };

  const handleMakeGuide = (id,email,name) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, make him a guide.",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/users/${id}`, {
            role: "guide",
            guide: "approved",
            reqGuide: true,
          })
          .then((res) => {
            if (res.data?.modifiedCount > 0) {
              refetch();
              axiosSecure.post('/guides',{
                guideEmail: email,
                guideName: name
              })
              Swal.fire({
                title: "made guide!",
                text: "the user has been made an guide.",
                icon: "success",
              });
            } else {
              Swal.fire({
                title: "Error",
                text: "Some Error occured.",
                icon: "error",
              });
            }
          })
          .catch((error) => {
            console.error("Error deleting book:", error);
            Swal.fire({
              title: "Error",
              text: "An error occurred while making the user admin.",
              icon: "error",
            });
          });
      }
    });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * usersPerPage;
  const currentUsers = filterUser.slice(startIndex, startIndex + usersPerPage);

  return (
    <div className="bg-newsletter bg-cover bg-fixed bg-no-repeat bg-center pb-12 text-white min-h-screen">
      <div className="flex w-4/5 pt-16 mx-auto justify-center items-center">
        <h1 className="basis-2/3 capitalize font-bold lg:text-3xl text-xl">all guide request.</h1>
        <h1 className="basis-1/3 capitalize font-bold lg:text-3xl text-xl">
          total guide request ({users?.length})
        </h1>
      </div>
        <div className="flex justify-center items-center gap-4">
          <input
            type="text"
            placeholder="Search by name or email"
            className="input rounded-none border-none bg-black w-full max-w-xs mr-4"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      <div className="overflow-x-auto w-4/5 mx-auto">
        <table className="table text-white w-full text-xl text-left">
          <thead>
            <tr className="text-white">
              <th>Index</th>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user, index) => (
              <tr key={user._id}>
                <th>{startIndex + index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.guide === "pending" ? (
                    <div className="text-gray-400">
                      Pending
                      <div className="badge badge-xs badge-warning"></div>
                    </div>
                  ) : user.guide === "approved" ? (
                    <div className="text-gray-400">
                      Approved
                      <div className="badge badge-xs badge-warning"></div>
                    </div>
                  ) : user.guide === "rejected" ? (
                    <div className="text-gray-400">
                      Rejected
                      <div className="badge badge-xs badge-accent"></div>
                    </div>
                  ) : (
                    <div className="text-gray-400">
                      None
                      <div className="badge badge-xs badge-accent"></div>
                    </div>
                  )}
                </td>

                <td className="gap-2 flex text-xl">
                  <button
                    data-tip="reject"
                    disabled={user.guide !== "pending"}
                    className={
                      user.guide !== "pending"
                        ? "text-gray-400 opacity-50 cursor-not-allowed"
                        : "bg-transparent tooltip tooltip-top "
                    }
                    onClick={() => handleReject(user?._id)}
                  >
                    <RxCrossCircled className="text-white text-3xl hover:text-primary  "></RxCrossCircled>
                  </button>
                  <button
                    data-tip="approve"
                    disabled={user.guide !== "pending"}
                    className={
                      user.guide !== "pending"
                        ? "text-gray-400 opacity-50 cursor-not-allowed"
                        : "bg-transparent tooltip tooltip-top "
                    }
                    onClick={() => handleMakeGuide(user?._id,user.email,user.name)}
                  >
                    <IoMdCheckmarkCircle className="text-3xl hover:text-warning  "></IoMdCheckmarkCircle>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-center mt-4">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              className={`btn mx-1 ${page === currentPage ? "btn-active" : ""}`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageGuide;
