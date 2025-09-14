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
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "@/components/hooks/redux/userSlice";
import { LoaderCircle } from "lucide-react";
import OtpData from "@/components/ui/otp-operations"
import AnimatedSections from "@/components/ui/animated-sections-login";
import { UserPlus, LogIn, Mail, KeyRound,MoveLeft } from "lucide-react";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff } from "lucide-react"
import { useToast } from '@/components/ui/toast-1';
  type AuthDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}
export default function AuthDialog({ open, onOpenChange}: AuthDialogProps)  {
  const dispatch = useDispatch();
  const { showToast } = useToast();
  const [mode, setMode] = useState<"signup" | "login" | "forgot" | "loginotp" |"final" |"newpassword" | "verifyotp">("signup")
  const [showPassword, setShowPassword] = useState(false)
  const[email,setEmail]=useState("")
  const[password,setPassword]=useState("")
  const[confirmPassword,setConfirmPassword]=useState("")
  const[name,setName]=useState("")
  const[otpdialog,setOtpdialog]=useState(false)
  const[isLoading,setisLoading]=useState(false);

  const titles: Record<string, string> = {
  signup: "Sign Up",
  login: "Login",
  forgot: "Forgot Password",
  loginotp: "Login with OTP",
  final: "All done",
  newpassword: "New Password",
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
    setisLoading(true)
    console.log("Signing up with:", { name, email, password });
    if(!name || !email || !password) {
      setisLoading(false);
      showToast("Please fill all the fields.","warning","top-right");
      return;
    }
    try {
      const res = await axios.post("http://localhost:5000/signup", { name, email, password });
      console.log("Signup successful:", res.data);
      if(res.status === 200)
      {
        setisLoading(false);
        showToast("Signup successful! Please login.","success","top-right");
      }
      setMode("login");
    } catch (error:any) {
      setisLoading(false);
      if(error.response.status === 409)
      {
      showToast("Email already registered","error","top-right");
      }
      else{
        showToast("Signup Failed","error","top-right");
      }
      console.error("Signup failed:", error.response.data);
    }
  };

  const handleLogin = async() => {
    setisLoading(true)
    if(!email || !password) {
      showToast(" Please fill all the fields.","warning","top-right");
      setisLoading(false)
      return;
    }
    try {
      const res = await axios.post("http://localhost:5000/login", { email, password });
      console.log("Login successful:", res.data);
      if(res.status === 200)
      {
        const{token,user}=res.data
        setisLoading(false);
        showToast("Login successful!","success","top-right");
        localStorage.setItem("token", token);
        dispatch(setUser({ ...user, token}));
        setMode("signup")
        onOpenChange(false);
        return;
      }
    } catch (error:any) {
      setisLoading(false);
      if(error.response.status === 404)
      {
        return showToast("Email not registered","error","top-right")
      }
      if(error.response.status === 401)
      {
        return showToast("Invalid Password","error","top-right")
      }
      else{
         showToast("Something went wrong!","error","top-right");
          return console.error("Login failed:", error.response.data);
      }
    }
  };


  const sendOtp = async() => {
    setisLoading(true);
    console.log("entered send otp")
    try {
      const res= await axios.post("http://localhost:5000/send-otp",{email});
      if(res.status === 200)
      {
        setisLoading(false);
        console.log("otp sent")
        showToast("OTP sent to your email.","success","top-right");
        setOtpdialog(true)
      }
      
    } catch (error:any) {
      setisLoading(false)
      if(error.response.status === 404)
      {
        showToast("Email not registered. Please sign up.","error","top-right");
      }
      else if(error.response.status === 400)
      {
        showToast("Invalid email address.","error","top-right");
      }
      else{
        showToast("OTP not sent. Please try again.","error","top-right");
      }
      console.error("OTP NOT SENT:", error);
    }

  }

  const changePassword = async() => {
    setisLoading(true);
    if(!password || !confirmPassword) {
      showToast(" Please fill all the fields.","warning","top-right");
      setisLoading(false)
      return;
    }
    if(password !== confirmPassword)
    {
      showToast("Passwords do not match.","error","top-right");
      setisLoading(false)
      return;
    }
    console.log("entered change pass")
    try {
      const res= await axios.patch("http://localhost:5000/reset-password",{email,newPassword:password});
      if(res.status === 200)
      {
        setisLoading(false);
        console.log("password changed")
        showToast("Password changed successfully","success","top-right");
        setMode("login")
      }
      
    } catch (error:any) {
      setisLoading(false)
      if(error.response.status === 400)
      {
        showToast("Password could not be changed! Try again.","error","top-right");
      }
      else if(error.response.status === 404)
      {
        showToast("insufficient data!","error","top-right");
      }
      else{
        showToast("Something went wrong!","error","top-right");
      }
      console.error("Password not changed", error);
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
                 {isLoading ? (<><span>Signing up..</span><LoaderCircle/></>) : "Sign Up"}
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
                   {isLoading ? (<><span>Loging in..</span><LoaderCircle/></>) : "Login"}
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
                    {isLoading ? (<><span>Sending OTP..</span><LoaderCircle/></>) : "Send OTP"}
                </Button>
                <div className="text-muted-foreground text-sm text-center">
                  <span onClick={()=>{setMode("login")}} className="cursor-pointer hover:underline"><MoveLeft className="inline h-5 w-5  pb-0.5 mr-2"/>Back to Login</span>
               </div>
            </div>
          )}

          {mode == "newpassword" &&(
            <div className="space-y-4">
                <div className="relative ">
                  <Label htmlFor={`${id}-password`}>New Password</Label>
                  <Input
                    id={`${id}-password`}
                    placeholder="Enter your password"
                    type={"password"}
                    required
                    className="rounded-lg pr-10"
                    value={password} onChange={(e)=>setPassword(e.target.value)}
                  />
                 <Label htmlFor={`${id}-confirm-password`}>Confirm Password</Label>
                  <Input
                    id={`${id}-confirm-password`}
                    placeholder="Confirm your password"
                    type={showPassword ? "password" : "text"}
                    required
                    className="rounded-lg pr-10"
                    value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={togglePassword}
                    className="absolute right-3 top-[93px] text-muted-foreground"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                   {confirmPassword.length > 0 && confirmPassword !== password && (
                      <p className="text-sm text-red-500 mt-1">Passwords do not match</p>
                    )}
                </div>
                
                <Button type="button" className="w-full rounded-lg" onClick={changePassword}>
                   {isLoading ? (<><LoaderCircle/></>) : "Change Password"}
                </Button>
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
