"use client"
import React, { useState } from "react";
import { Modal } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { closeLoginModal, closeSignUpModal, openLoginModal, openSignUpModal } from "@/redux/slices/modalSlice";
import { EyeIcon, EyeSlashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase";

export default function LogInModal() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false)

  const isOpen = useSelector(
    (state: RootState) => state.modals.loginModalOpen
  );

  const dispatch: AppDispatch = useDispatch()

  async function handleLogIn() {
    await signInWithEmailAndPassword(auth, email, password);
  }

  async function handleGuestLogIn() {
    await signInWithEmailAndPassword(auth, 'guest12345@gmail.com', 'guest123');
  }

  return (
    <>
      <button onClick={() => dispatch(openLoginModal())} className="w-full h-[48px] md:w-[88px] md:h-[40px] text-md md:text-sm border-2 border-gray-100 rounded-full text-white font-bold hover:bg-white hover:bg-opacity-25 transition">
          Log In
        </button>

      <Modal
        open={isOpen}
        onClose={
          () => dispatch(closeLoginModal())
        }
        className="flex justify-center items-center"
      >
        <div className="w-full h-full sm:w-[600px] sm:h-fit bg-white sm:rounded-xl outline-none">

          <XMarkIcon className="w-7 mt-5 ms-5 cursor-pointer" onClick={() => dispatch(closeLoginModal())} />
          <div className="pt-10 pb-20 px-4 sm:px-20">
            <h1 className="text-3xl font-bold mb-10">Log in to Busy Bee</h1>
            <div className="w-full space-y-5 mb-10">
              <input value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email" className="w-full h-[54px] border border-gray-200 outline-none ps-3 rounded-[4px] focus:border-[#F4AF01] transition" type="email" />
              
              <div className="w-full h-[54px] border border-gray-200  rounded-[4px] focus-within:border-[#F4AF01] transition flex items-center overflow-hidden pr-3">
                <input value={password} onChange={(event) => setPassword(event.target.value)} className="w-full h-full ps-3 outline-none" placeholder="Password" type={showPassword ? "text" : "password"} />
                <div onClick={() => setShowPassword(!showPassword)} className="w-7 h-7 text-gray-400 cursor-pointer">
                  {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
                </div>
              </div>
            </div>

            <button onClick={() => handleLogIn()} className="bg-[#F4AF01] text-white h-[48px] rounded-full shadow-md mb-5 w-full">
              Log In
            </button>
            <span className="mb-5 text-sm text-center block">Or</span>
            <button className="bg-[#F4AF01] text-white h-[48px] rounded-full shadow-md mb-5 w-full" onClick={() => handleGuestLogIn()}>
              Log In as Guest
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
