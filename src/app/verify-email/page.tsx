"use client";
import axios from "axios";
import Link from "next/link";
// import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";

function VerifyEmail() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);

  const verifyEmail = async () => {
    try {
      const response = await axios.post("/api/users/verify-email", { token });
      if (response.data.success) {
        setVerified(true);
      }
    } catch (error: any) {
      console.log("Some error has occured.");
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
    // Next Js related code
    // const { query }: any = router;
    // setToken(query.token);
  }, []);

  return (
    <div className="bg-black/[0.96]  items-center min-h-screen py-2 text-white h-screen w-screen flex flex-col justify-center gap-3 ">
      <h1 className="text-4xl">Verify Email</h1>
      <button
        className="border border-white p-3 rounded-lg font-medium"
        onClick={verifyEmail}
      >
        Click Here
      </button>
      {verified ? (
        <div className="flex flex-col items-center justify-center gap-3 text-base md:text-3xl text-green-300 font-bold p-3 w-[45%] h-[30%] border border-white rounded-lg">
          <h1>You Have Verified Your Account Successfully</h1>
          <button className="border border-white p-3 rounded-lg font-medium">
            <Link href={"/login"}>Login</Link>
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-3 text-base md:text-3xl text-red-700 font-bold p-3 w-[45%] h-[30%] border border-white rounded-lg">
          <h1>Your Account is Not Verified Please click on Verify Button</h1>
        </div>
      )}
    </div>
  );
}

export default VerifyEmail;
