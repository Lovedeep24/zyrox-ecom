"use client"
import React, { useEffect } from 'react'
import { useSelector } from "react-redux";
import { RootState } from "@/components/hooks/redux/store";
import { useState } from 'react';
import AuthDialog from './auth-dialog';
import ProfileDropdwon from './ProfileDropdown';
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [openDialog,setOpenDialog]=useState(false);
  const[openAuth,setOpenAuth]=useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const { user, isLoggedIn } = useSelector((state: RootState) => state.user);
  return (
    <div className={`fixed top-0 left-0 z-20 w-full transition-all duration-500 ${
          scrolled ? "  bg-[#0C1929]/90" : "  "
        }`}
        >
        <div className="w-[90%] mx-auto p-4 text-white flex justify-between">
          <span className="font-bold">Logo</span>
          <p>ZYROX</p>
          <div className="space-x-4 ">
            {isLoggedIn ?  <ProfileDropdwon
            openDialog={openDialog}
            onOpenDialogChange={setOpenDialog}
          /> :<button className='cursor-pointer' onClick={()=>setOpenAuth(true)}>Login/Signup</button>}
          </div>
        </div>
        <AuthDialog open={openAuth} onOpenChange={setOpenAuth} />
      </div>
  )
}
