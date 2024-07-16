"use client";

import { auth } from "@/firebase";
import { closeLoginModal, closeSignUpModal } from "@/redux/slices/modalSlice";
import { signOutUser } from "@/redux/slices/userSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { signOut } from "firebase/auth";
import Image from "next/image";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

function SidebarUserInfo() {
  const dispatch: AppDispatch = useDispatch();
  
  const user = useSelector((state: RootState) => state.user)

  async function handleSignOut() {
    await signOut(auth);

    dispatch(signOutUser());
    dispatch(closeSignUpModal());
    dispatch(closeLoginModal());
  }

  return (
    <div className="absolute bottom-3 flex items-center justify-start space-x-2 xl:p-3 xl:pe-6 hover:bg-gray-500 hover:bg-opacity-10 rounded-full cursor-pointer transition w-fit xl:w-[240px]" onClick={() => handleSignOut()}>
      <Image
        src={"/assets/profile-pic.png"}
        width={36}
        height={36}
        alt="Profile Picture"
        className="w-9 h-9 rounded-full"
      />

      <div className="hidden xl:flex flex-col text-sm max-w-40" >
        <span className="font-bold whitespace-nowrap text-ellipsis overflow-hidden">{user.name}</span>
        <span className="text-gray-500 whitespace-nowrap text-ellipsis oveflow-hidden">@{user.username}</span>
      </div>
    </div>
  );
}

export default SidebarUserInfo;
