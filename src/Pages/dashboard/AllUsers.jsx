import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { FaTrashAlt, FaUserCog, FaUserEdit, FaUserPlus } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import Swal from "sweetalert2";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });
  
  const handleDelete=(id)=>{
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
        axiosSecure.delete(`/users/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
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
  }
  const handleMakeAdmin=(id)=>{
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
        axiosSecure.patch(`/users/admin/${id}`)
          .then((res) => {
            if (res.data?.modifiedCount > 0) {
              refetch()
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
  }
  return (
    <div className="bg-gradient-to-r to-slate-900 from-primary text-white min-h-screen">
      <div className="flex w-4/5 pt-16 mx-auto justify-center items-center">
        <h1 className="basis-2/3 capitalize font-bold text-3xl">all users</h1>
        <h1 className="basis-1/3 capitalize font-bold text-3xl">
          total users({users?.length})
        </h1>
      </div>
      <div className="overflow-x-auto w-4/5 mx-auto">
        <table className="table text-white w-full text-xl text-left ">
          {/* head */}
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
            {/* row 1 */}
            {users.map((user,index) => 
              <tr key={user._id}>
                <th>{index+1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}
                </td>
                <td className="gap-2 flex">
                  <button className="btn btn-warning bg-transparent" onClick={()=>handleDelete(user?._id)}><FaTrashAlt className="text-white text-xl"></FaTrashAlt></button>
                  <button data-tip="make admin" disabled={user.role === 'admin'} className="btn btn-warning bg-transparent tooltip tooltip-top" onClick={()=>handleMakeAdmin(user?._id)}>{user.role ==='admin'?'admin':<FaUserCog className={user.role ==='admin'?"text-white opacity-25 text-xl": "text-white text-xl"}></FaUserCog>}</button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
