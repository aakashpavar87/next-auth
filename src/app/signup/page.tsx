"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

function SignUp() {
  const [user, setUser] = useState({
    email: "",
    username: "",
    password: "",
  });
  const router = useRouter();
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleChange = (evt: any) => {
    const value = evt.target.value;
    setUser({
      ...user,
      [evt.target.name]: value,
    });
  };

  const onSignUp = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Sign Up Success");
      toast.success("Sign Up Success");
      console.log(response.data);
      router.push("/login");
    } catch (error: any) {
      toast.error(error.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    }
  }, [user]);
  return (
    <div className="w-screen bg-black/[0.96] flex flex-col justify-center items-center min-h-screen py-2 text-white h-screen">
      <h1 className="text-lg text-gray-200 font-semibold">
        {loading ? "Processing ..." : "Sign Up Form"}
      </h1>
      <form
        onSubmit={(e) => e.preventDefault()}
        action=""
        method="post"
        className="flex flex-col gap-4"
      >
        <div className="flex flex-col gap-3 justify-start items-start">
          <label htmlFor="email">Email</label>
          <input
            className="p-2 bg-transparent border border-white> rounded-md"
            value={user.email}
            onChange={handleChange}
            type="email"
            name="email"
            placeholder="Enter Email"
          />
        </div>
        <div className="flex flex-col gap-3 justify-start items-start">
          <label htmlFor="username">Username</label>
          <input
            className="p-2 bg-transparent border border-white> rounded-md"
            value={user.username}
            onChange={handleChange}
            type="text"
            name="username"
            placeholder="Enter User Name"
          />
        </div>
        <div className="flex flex-col gap-3 justify-start items-start">
          <label htmlFor="password">Password</label>
          <input
            className="p-2 bg-transparent border border-white> rounded-md"
            value={user.password}
            onChange={handleChange}
            type="password"
            name="password"
            placeholder="Enter Password"
          />
        </div>
        <div className="flex flex-col gap-3 justify-center items-center">
          <button
            className="border border-white p-3 rounded-lg font-medium"
            onClick={onSignUp}
            disabled={buttonDisabled}
          >
            {buttonDisabled ? "No Sign Up" : "Sign Up"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
