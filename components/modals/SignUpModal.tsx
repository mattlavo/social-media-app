"use client"
import React, { useEffect, useState } from "react";
import { Modal } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { closeSignUpModal, openSignUpModal } from "@/redux/slices/modalSlice";
import { EyeIcon, EyeSlashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { createUserWithEmailAndPassword, onAuthStateChanged, updateProfile } from "firebase/auth";
import { auth } from "@/firebase";
import { signInUser } from "@/redux/slices/userSlice";

export default function SignUpModal() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false)
  const isOpen = useSelector(
    (state: RootState) => state.modals.signUpModalOpen
  );

  const dispatch: AppDispatch = useDispatch()

  async function handleSignUp() {
    const userCredentials = await createUserWithEmailAndPassword(auth, email, password);

    console.log(userCredentials)

    await updateProfile(userCredentials.user, { 
      displayName: name
    }) // sets the username

    dispatch(signInUser(
      {
        name: userCredentials.user.displayName,
        username: userCredentials.user.email!.split('@')[0],
        email: userCredentials.user.email,
        uid: userCredentials.user.uid,
      }
    ))
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if(!currentUser) return;
      
      // Handle Redux Actions
      dispatch(signInUser({
        name: currentUser.displayName,
        username: currentUser.email!.split('@')[0],
        email: currentUser.email,
        uid: currentUser.uid,
      }))
    })

    return unsubscribe
  }, [])

  return (
    <>
      <button
        onClick={
          () => dispatch(openSignUpModal())
        }
        className="w-full h-[48px] md:w-[88px] m d:h-[40px] text-md md:text-sm font-bold bg-white rounded-full outline-none"
      >
        Sign Up
      </button>

      <Modal
        open={isOpen}
        onClose={
          () => dispatch(closeSignUpModal())
        }
        className="flex justify-center items-center"
      >
        <div className="w-full h-full sm:w-[600px] sm:h-fit bg-white sm:rounded-xl">

          <XMarkIcon className="w-7 mt-5 ms-5 cursor-pointer" onClick={() => dispatch(closeSignUpModal())} />
          <div className="pt-10 pb-20 px-4 sm:px-20">
            <h1 className="text-3xl font-bold mb-10">Create your account</h1>
            <div className="w-full space-y-5 mb-10">
              <input onChange={(event) => setName(event.target.value)} value={name} placeholder="Name" className="w-full h-[54px] border border-gray-200 outline-none ps-3 rounded-[4px] focus:border-[#F4AF01] transition" type="text" />
              <input onChange={(event) => setEmail(event.target.value)} value={email} placeholder="Email" className="w-full h-[54px] border border-gray-200 outline-none ps-3 rounded-[4px] focus:border-[#F4AF01] transition" type="email" />
              
              <div className="w-full h-[54px] border border-gray-200  rounded-[4px] focus-within:border-[#F4AF01] transition flex items-center overflow-hidden pr-3">
                <input value={password} onChange={(event) => setPassword(event.target.value)} className="w-full h-full ps-3 outline-none" placeholder="Password" type={showPassword ? "text" : "password"} />
                <div onClick={() => setShowPassword(!showPassword)} className="w-7 h-7 text-gray-400 cursor-pointer">
                  {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
                </div>
              </div>
            </div>

            <button className="bg-[#F4AF01] text-white h-[48px] rounded-full shadow-md mb-5 w-full" onClick={() => handleSignUp()}>
              Sign Up
            </button>
            <span className="mb-5 text-sm text-center block">Or</span>
            <button className="bg-[#F4AF01] text-white h-[48px] rounded-full shadow-md mb-5 w-full">
              Log In as Guest
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}