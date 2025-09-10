"use client";
import Navbar from "@/components/Navbar";
import { ReactNode } from "react";
interface LayoutProps {
  children: ReactNode;
}
import React from "react";

export default function Layout({ children }: LayoutProps) {
  return (
    <div>
       <Navbar/>
       <main>{children}</main>
    </div>
  );
};