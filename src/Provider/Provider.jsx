import React, { createContext, useEffect, useState } from "react";
import app from "../Firebase/firebase.config";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import axios from "axios";
import useAxiosPublic from "../Hooks/useAxiosPublic";

const auth = getAuth(app);
export const AuthContext = createContext(null);

const googleProvider = new GoogleAuthProvider();
const gitHubProvider = new GithubAuthProvider();

const Provider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [reload, setReload] = useState(false);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();
  const userSignUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const updateUser = (Name, photoURL) => {
    return updateProfile(auth.currentUser, {
      displayName: `${Name}`,
      photoURL: `${photoURL}`,
    });
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      const userEmail= currentUser?.email
      if (currentUser) {
        const userInfo = { email: userEmail };
        axiosPublic.post("/jwt", userInfo).then((res) => {
          if (res.data.token) {
            localStorage.setItem("access-token", res.data.token);
          }
        });
      } else {
        localStorage.removeItem('access-token')
      }
      setLoading(false);
    });
    return () => {
      unSubscribe();
    };
  }, [axiosPublic]);

  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  //googlesign in
  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };
  const githubSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, gitHubProvider);
  };
  //log out
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  const userInfo = {
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
  };
  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};

export default Provider;
