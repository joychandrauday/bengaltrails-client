import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { FaHiking, FaTrashAlt, FaUserCog } from "react-icons/fa";
import Swal from "sweetalert2";
import Select from "react-select";

const customStyles = {
  control: (baseStyles, state) => ({
    ...baseStyles,
    backgroundColor: "#FFF000",
    color: "black",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? "#FFD700" : "#FFF000", // Different background color for selected option
    color: state.isSelected ? "black" : "black", // Text color for selected option
    "&:hover": {
      backgroundColor: "#FFD700", // Background color when hovering
      color: "black", // Text color when hovering
    },
  }),
  singleValue: (provided, state) => ({
    ...provided,
    color: "black", // Text color for single value
  }),
};

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [searchByRole, setSearchByRole] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { refetch, data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-users");
      return res.data;
    },
  });

  const roleOptions = [
    { value: "user", label: "User" },
    { value: "admin", label: "Admin" },
    { value: "guide", label: "Guide" },
  ];

  const usersPerPage = 10;
  const totalPages = Math.ceil(users.length / usersPerPage);

  const filterUser = users.filter((user) => {
    const matchesSearchTerm =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = searchByRole ? user.role === searchByRole.value : true;

    return matchesSearchTerm && matchesRole;
  });

  const handleDelete = (id) => {
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
          .delete(`/users/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: "the user has been deleted.",
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
              text: "An error occurred while deleting the book.",
              icon: "error",
            });
          });
      }
    });
  };

  const handleMakeAdmin = (id) => {
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
          .patch(`users/${id}`,{
            role:'admin',
            guide:'none',
            reqGuide: false
          })
          .then((res) => {
            if (res.data?.modifiedCount > 0) {
              refetch();
              Swal.fire({
                title: "made admin!",
                text: "the user has been made an admin.",
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
  const handleMakeGuide = (id) => {
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
          .patch(`users/${id}`,{
            role:'guide',
            guide:'approved',
            reqGuide: true
          })
          .then((res) => {
            if (res.data?.modifiedCount > 0) {
              refetch();
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
        <h1 className="basis-2/3 capitalize font-bold lg:text-3xl text-xl">all users</h1>
        <h1 className="basis-1/3 capitalize font-bold lg:text-3xl text-xl">
          total users({users?.length})
        </h1>
      </div>
      <div className="flex items-center justify-center gap-4">
        <Select
          options={roleOptions}
          placeholder="Filter by role"
          isClearable
          onChange={(option) => setSearchByRole(option)}
          className="w-full max-w-xs"
          value={searchByRole}
          styles={customStyles}
        />
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
            <tr>
              <th>Index</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user, index) => (
              <tr key={user._id}>
                <th>{startIndex + index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td className="gap-2 flex">
                  <button
                  disabled={user.role === "admin"}
                    className="btn btn-warning bg-transparent"
                    onClick={() => handleDelete(user?._id)}
                  >
                    <FaTrashAlt className="text-white text-xl"></FaTrashAlt>
                  </button>
                  <button
                    data-tip="make admin"
                    disabled={user.role === "admin"}
                    className="btn btn-warning bg-transparent tooltip tooltip-top"
                    onClick={() => handleMakeAdmin(user?._id)}
                  >
                    <FaUserCog className="text-white text-xl" />
                   
                  </button>
                  <button
                    data-tip="make guide"
                    disabled={user.role === "admin" || user.role === "guide" }
                    className="btn btn-warning bg-transparent tooltip tooltip-top"
                    onClick={() => handleMakeGuide(user?._id)}
                  >
                    <FaHiking className="text-white text-xl" />
                   
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

export default AllUsers;
