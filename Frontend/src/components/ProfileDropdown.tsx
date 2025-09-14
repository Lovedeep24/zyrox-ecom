"use client"

import * as React from "react"
import { useState } from "react"
import { useSelector, useDispatch } from "react-redux";
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownSeparator,
  DropdownTrigger,
} from "@/components/ui/basic-dropdown"
import AuthDialog from "./auth-dialog"
import { RootState } from "@/components/hooks/redux/store";
import { logout } from "@/components/hooks/redux/userSlice";
import { CreditCard, LogOut, Settings, User } from "lucide-react"

type ProfileDialogProps = {
  openDialog: boolean
  onOpenDialogChange: (open: boolean) => void
}

export default function ProfileDropdwon({ openDialog, onOpenDialogChange,}: ProfileDialogProps) {
  const [openAuth, setOpenAuth] = useState(false)
   const dispatch = useDispatch();
  const { isLoggedIn, user } = useSelector((state: RootState) => state.user);

 const handleLogout = () => {
    dispatch(logout());
    localStorage.clear();
  };
  return (
    <>
      <Dropdown open={openDialog} onOpenChange={onOpenDialogChange}>
        {/* 👇 This is the trigger */}
        <DropdownTrigger>
          <button className="flex items-center gap-2 px-3 py-2 cursor-pointer ">
            <User className="h-6 w-6" />
          </button>
        </DropdownTrigger>

        <DropdownContent align="end" className="w-35">
          <DropdownItem className="gap-2" onClick={() => setOpenAuth(true)}>
            <User className="h-4 w-4" />
            Profile
          </DropdownItem>
          <DropdownItem className="gap-2">
            <CreditCard className="h-4 w-4" />
            Billing
          </DropdownItem>
          <DropdownItem className="gap-2">
            <Settings className="h-4 w-4" />
            Settings
          </DropdownItem>
          <DropdownSeparator />
          <DropdownItem className="gap-2" destructive onClick={handleLogout}>
            <LogOut className="h-4 w-4" />
            Log out
          </DropdownItem>
        </DropdownContent>
      </Dropdown>

      {/* Auth Dialog */}
      <AuthDialog open={openAuth} onOpenChange={setOpenAuth} />
    </>
  )
}
