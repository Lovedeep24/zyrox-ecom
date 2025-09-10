"use client"
import React, { useEffect } from 'react'
import { useState } from 'react';
import {User} from "lucide-react"
import AuthDialog from './auth-dialog';
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div className={`fixed top-0 left-0 z-20 w-full transition-all duration-500 ${
          scrolled ? "  bg-[#0C1929]/90" : "  "
        }`}
        >
        <div className="w-[90%] mx-auto p-4 text-white flex justify-between">
          <span className="font-bold">Logo</span>
          <p>ZYROX</p>
          <div className="space-x-4 ">
            <button className='cursor-pointer border' onClick={() => setOpen(true)}><User/></button>

          </div>
        </div>
         <AuthDialog open={open} onOpenChange={setOpen} />
      </div> 
  )
}
