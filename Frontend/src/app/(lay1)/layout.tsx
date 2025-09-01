"use client";
import { ReactNode } from "react";
interface LayoutProps {
  children: ReactNode;
}
import React from "react";
import {useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { 
  LayoutDashboard, 
  PlusCircle, 
  Package, 
  Users, 
  MessageSquare, 
  LogOut 
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function Layout({ children }: LayoutProps) {
  return (
    <div>
       <main>{children}</main>
    </div>
  );
};
