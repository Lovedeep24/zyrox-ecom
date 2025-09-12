"use client"

import { useState, useId, JSX } from "react"
import { Button } from "@/components/ui/button"
import axios from "axios"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import OtpData from "@/components/ui/otp-operations"
import AnimatedSections from "@/components/ui/animated-sections-login";
import { UserPlus, LogIn, Mail, KeyRound,MoveLeft } from "lucide-react";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff } from "lucide-react"
  type AuthDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}
export default function AuthDialog({ open, onOpenChange }: AuthDialogProps)  {
  const [mode, setMode] = useState<"signup" | "login" | "forgot" | "loginotp" |"final" |"newpassword" | "verifyotp">("signup")
  const [showPassword, setShowPassword] = useState(false)
  const[email,setEmail]=useState("")
  const[password,setPassword]=useState("")
  const[name,setName]=useState("")
  const[otpdialog,setOtpdialog]=useState(false)

  const titles: Record<string, string> = {
  signup: "Sign Up",
  login: "Login",
  forgot: "Forgot Password",
  loginotp: "Login with OTP",
  final: "All done",
  newpassword: "Set New Password",
  verifyotp: "Verify OTP"
};

const descriptions: Record<string, (email?: string) => string> = {
  signup: ()=> "We just need a few details to get you started.",
  login: ()=>"Enter your credentials to log in.",
  forgot: ()=>"No worries, we will send you reset instructions.",
  verifyotp: (email)=>`We sent a code to ${email ?? ""}`,
  loginotp: ()=>"Enter your email to receive a one-time password.",
  final:()=> "You are all set! You can now log in.",
  newpassword:()=>"Set a new password"
};

const icons: Record<string, JSX.Element> = {
  signup: <UserPlus className="h-10 w-10 " />,
  login: <LogIn className="h-10 w-10" />,
  forgot: <Mail className="h-10 w-10" />,
  reset: <KeyRound className="h-10 w-10" />,
  loginotp: <Mail className="h-10 w-10" />,
  final: <UserPlus className="h-10 w-10" />,
  newpassword:<KeyRound className="h-10 w-10" />,
  verifyotp:<Mail className="h-10 w-10" />
};
  const id = useId()

  const togglePassword = () => setShowPassword(!showPassword)

  const handleSignup = async() => {
    console.log("Signing up with:", { name, email, password });
    if(!name || !email || !password) {
      alert("Please fill all the fields");
      return;
    }
    try {
      const res = await axios.post("http://localhost:5000/signup", { name, email, password });
      console.log("Signup successful:", res.data);
    } catch (error:any) {
      console.error("Signup failed:", error.response.data);
    }
  };

  const handleLogin = async() => {
    console.log("Logging in with:", { email, password });
    try {
      const res = await axios.post("http://localhost:5000/login", { email, password });
      console.log("Login successful:", res.data);
    } catch (error:any) {
      console.error("Login failed:", error.response.data);
    }
  };


  const sendOtp = async() => {
    console.log("entered send otp")
    try {
      const res= await axios.post("http://localhost:5000/send-otp",{email});
      if(res.status === 200)
      {
        console.log("otp sent")
        setOtpdialog(true)
      }
    } catch (error) {
      console.error("OTP NOT SENT:", error);
    }

  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[80%] sm:w-full !rounded-2xl flex">
        <div className="object-cover rounded-sm overflow-hidden hidden sm:flex md:w-[55%] ">
            <AnimatedSections/>
        </div>

        <div className="w-[100%] sm:w-[40%] flex flex-col items-center justify-center ">
          <div className="flex w-[70%] flex-col items-center gap-2"
           aria-describedby={undefined}>
            <DialogHeader className="w-full">
             <span className=" rounded-lg w-fit hidden sm:block">{otpdialog ? <Mail className="h-10 w-10" /> : icons[mode]}</span>
              <DialogTitle className="text-lg sm:text-2xl">
                {otpdialog ? "Verify OTP" : titles[mode]}
              </DialogTitle>
              <DialogDescription className="text-xs font-medium sm:text-sm text-muted-foreground">
                {otpdialog ? `We sent a code to ${email}` : descriptions[mode](email)}
              </DialogDescription>
            </DialogHeader>
           </div>
        <div className="mt-4 space-y-4 w-full sm:w-[70%]">
           {mode === "signup" && (
            <div className="space-y-4">
               <div className="*:not-first:mt-2">
                 <Label htmlFor={`${id}-name`}>Full name</Label>
                 <Input
                   id={`${id}-name`}
                   placeholder="Matt Welsh"
                   type="text"
                   required
                   className="rounded-lg"
                   value={name} onChange={(e)=>setName(e.target.value)}
                 />
               </div>

                <div className="*:not-first:mt-2">
                  <Label htmlFor={`${id}-email`}>Email</Label>
                  <Input
                    id={`${id}-email`}
                    placeholder="hi@yourgmail.com"
                    type="email"
                    required
                    className="rounded-lg"
                    value={email} onChange={(e)=>setEmail(e.target.value)}
                  />
                </div>
                <div className="relative">
                  <Label htmlFor={`${id}-password`}>Password</Label>
                  <Input
                    id={`${id}-password`}
                    placeholder="Enter your password"
                    type={showPassword ? "text" : "password"}
                    required
                    className="rounded-lg pr-10"
                    value={password} onChange={(e)=>setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={togglePassword}
                    className="absolute right-3 top-[38px] text-muted-foreground"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              <Button type="button" className="w-full rounded-lg" onClick={handleSignup}>
                 Sign up
              </Button>
             <div className="gap-25 text-center">
              Already have an account?{" "}
              <button className="underline cursor-pointer " onClick={()=>setMode("login")}>
                Login
              </button>

               <p className="text-muted-foreground text-center text-xs mt-2">
                 By signing up you agree to our{" "}
                 <a className="underline hover:no-underline" href="#">
                   Terms
                 </a>
                 .
               </p>
            </div>
            </div>
          )}


          {mode == "login" &&(
            <div className="space-y-4">
                <div className="*:not-first:mt-2">
                  <Label htmlFor={`${id}-email`}>Email</Label>
                  <Input
                    id={`${id}-email`}
                    placeholder="hi@yourgmail.com"
                    type="email"
                    required
                    className="rounded-lg"
                    value={email} onChange={(e)=>setEmail(e.target.value)}
                  />
                </div>

                <div className="relative">
                  <Label htmlFor={`${id}-password`}>Password</Label>
                  <Input
                    id={`${id}-password`}
                    placeholder="Enter your password"
                    type={showPassword ? "text" : "password"}
                    required
                    className="rounded-lg pr-10"
                    value={password} onChange={(e)=>setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={togglePassword}
                    className="absolute right-3 top-[38px] text-muted-foreground"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                  <span className="text-muted-foreground text-xs cursor-pointer hover:underline" onClick={()=>{setMode("forgot")}}>Forgot password?</span>
                </div>
                <Button type="button" className="w-full rounded-lg" onClick={handleLogin}>
                   Login
                </Button>
   
                 <div className=" w-full before:bg-border after:bg-border flex items-center gap-3 before:h-px before:flex-1 after:h-px after:flex-1 ">
                   <span className="text-muted-foreground text-xs">Or</span>
                 </div>
                 <Button variant="outline" className="w-full rounded-lg" onClick={()=>{setMode("loginotp")}}>
                   Login using OTP
                 </Button>
                 <div className="w-full text-xs sm:text-md text-center p-2">
                Don&apos;t have an account?{" "}
                 <button className="underline cursor-pointer" onClick={()=>setMode("signup")}>
                   Sign Up
                 </button>
         
               </div>
            </div>
          )}

      {!otpdialog && (mode == "forgot" || mode == "loginotp") &&(
            <div className="space-y-4">
                <div className="*:not-first:mt-2">
                  <Label htmlFor={`${id}-email`}>Email</Label>
                  <Input
                    id={`${id}-email`}
                    placeholder="hi@yourgmail.com"
                    type="email"
                    required
                    className="rounded-lg"
                    value={email} onChange={(e)=>setEmail(e.target.value)}
                  />
                </div>
                <Button onClick={sendOtp} type="button" className="w-full rounded-lg">
                   Send OTP
                </Button>
                <div className="text-muted-foreground text-sm text-center">
                  <span onClick={()=>{setMode("login")}} className="cursor-pointer hover:underline"><MoveLeft className="inline h-5 w-5  pb-0.5 mr-2"/>Back to Login</span>
               </div>
            </div>
          )}
          {otpdialog && (
            <OtpData mode={mode} email={email} setmode={setMode} setOtpdialog={setOtpdialog} onOpenChange={onOpenChange} sendOtp={sendOtp}/>
          )}
          </div>
        </div>
        
      </DialogContent>
    </Dialog>
  )
}
