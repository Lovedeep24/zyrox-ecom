"use client"

import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from './toast-1';
import axios from "axios"
import { setUser} from "../hooks/redux/userSlice";

export default function OtpData({mode,setmode,email,setOtpdialog,onOpenChange,sendOtp}:any) {
  const dispatch = useDispatch();
  const { showToast } = useToast();
  const [otp, setOtp] = useState(["", "", "", ""])
  const [timeLeft, setTimeLeft] = useState(60)
  const [canResend, setCanResend] = useState(false)
  const[isLoading,setisLoading]=useState(false);

  // Countdown timer
  useEffect(() => {
    if (timeLeft <= 0) {
      setCanResend(true)
      return
    }
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
    return () => clearTimeout(timer)
  }, [timeLeft])

  const handleChange = (value: string, index: number) => {
    if (/^\d?$/.test(value)) {
      const updated = [...otp]
      updated[index] = value
      setOtp(updated)
      if (value && index < otp.length - 1) {
        const nextInput = document.getElementById(`otp-${index + 1}`)
        nextInput?.focus()
      }
    }
  }

  
  const handleVerify = async() => {
    console.log(mode,email);
    if (otp.every((d) => d !== "")) {
      setisLoading(true);
      try {
        const res= await axios.post("http://localhost:5000/verify-otp",{email:email,otp:otp.join(""),mode:mode});
        console.log(res.data);
        if(res.status === 200)
        {
          setisLoading(false);
          if(mode == "forgot")
          {
            setOtpdialog(false)
            setmode("newpassword")
          }
          else
          {
            const {token,user}=res.data
            setOtpdialog(false)
            localStorage.setItem("token", token);
            dispatch(setUser({ ...user, token, isLoggedIn: true }));
            setmode("signup")
            onOpenChange(false);
          }
        }
      } catch (error:any) {
        setisLoading(false);
        if(error.response.status === 402)
        {
          showToast(" OTP expired .","warning","top-right");
        }
        else if(error.response.status === 404)
        {
          showToast("OTP missing, Retry","warning","top-right");
        }
        else if(error.response.status  === 400)
        {
          showToast("Invalid OTP","error","top-right");
        }
        else{
          showToast("Its from us. Please try again after some time.","error","top-right");
          console.error("OTP not verified", error);
        }
      }
    } else {
      showToast(" Please enter the complete OTP.","error","top-right");
      return
    }
  }

  const handleResend = () => {
    sendOtp();
    setOtp(["", "", "", ""])
    setTimeLeft(60)
    setCanResend(false)
    document.getElementById("otp-0")?.focus()
  }

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0")
    const s = (seconds % 60).toString().padStart(2, "0")
    return `${m}:${s}`
  }

  return (
    <div>
        {/* OTP Inputs */}
        <div className="flex justify-center gap-3 mb-4">
          {otp.map((digit, idx) => (
            <Input
              key={idx}
              id={`otp-${idx}`}
              value={digit}
              onChange={(e) => handleChange(e.target.value, idx)}
              className="w-14 h-14 text-center text-lg font-medium rounded-md border border-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary"
              maxLength={1}
            />
          ))}
        </div>

        {/* Timer */}
        {!canResend && (
          <p className="text-center text-xs text-muted-foreground mb-2">
            You can resend OTP in <strong>{formatTime(timeLeft)}</strong>
          </p>
        )}

        {/* Buttons */}
        <div className="flex flex-col gap-2">
          <Button className="w-full" onClick={handleVerify}>
            {isLoading ? "Verifying..." : "Verify OTP"}
          </Button>

          <Button
            variant="outline"
            className="w-full flex justify-between items-center"
            onClick={handleResend}
            disabled={!canResend}
          >
            {canResend ? "Send Again" : "Resend OTP"}
            {!canResend && (
              <span className="text-xs text-muted-foreground">{formatTime(timeLeft)}</span>
            )}
          </Button>
          <p className="mt-3 text-center text-sm text-muted-foreground">Incorrect email?<span className="cursor-pointer hover:underline" onClick={()=>{setOtpdialog(false); mode == "forgot" ? setmode("forgot") : setmode("loginotp")}}> change it</span></p>
        </div>

</div>
  )
}