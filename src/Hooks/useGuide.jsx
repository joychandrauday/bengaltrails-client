import React, { useContext } from "react";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../Provider/Provider";

const useAdmin = () => {
  const { user,loading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { data: isGuide,isPending: isGuideLoading } = useQuery({
    queryKey: [user?.email, "isGuide"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/guide/${user.email}`);
      console.log(res.data);
      return res.data?.guide;
    },
  });
  return [isGuide,isGuideLoading];
};

export default useAdmin;