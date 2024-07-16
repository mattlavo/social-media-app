"use client"

import React from "react";
import SignUpModal from "./modals/SignUpModal";
import LogInModal from "./modals/LoginModal";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

function SignUpPrompt() {
  const name = useSelector((state: RootState) => state.user.username);

  return (
    !name &&
    <div className="fixed w-full h-[80px] bg-[#F4AF01] bottom-0 flex justify-center items-center md:space-x-5 lg:justify-between lg:px-20 xl:px-40 2xl:px-80">
      <div className="hidden md:flex flex-col text-white">
        <span className="text-xl font-bold">Don't miss out on the buzz</span>
        <span>People on Busy Bee are always the first to know.</span>
      </div>
      <div className="flex space-x-2 w-full md:w-fit p-3">
        <LogInModal />
        <SignUpModal />
      </div>
    </div>
  );
}

export default SignUpPrompt;
