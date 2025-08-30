"use client";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import Component from '@/components/ui/text-marque';
import AnimatedSections from "@/components/ui/animated-sections-1";
import CategoriesTeam from "@/components/CategoriesTeam";
import Categories from "@/components/Categories";
import HotCategories from "@/components/HotCategories";
export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
    <div className="h-screen w-full overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute  w-full h-full object-cover overflow-hidden"
      >
        <source src="/video/intro.mp4" type="video/mp4" />
      </video>

      <div
        className={`fixed top-0 left-0 z-20 w-full transition-all duration-500 ${
          scrolled ? "  bg-[#0C1929]/90" : "  "
        }`}
        >
        <div className="w-[90%] mx-auto p-4 text-white flex justify-between">
          <span className="font-bold">Logo</span>
          <p>ZYROX</p>
          <div className="space-x-4 ">
            <a href="#">Login/Signup</a>
          </div>
        </div>
      </div>
       <div className="absolute inset-0 flex flex-col items-center justify-end pb-20 text-center z-10 text-white">
          <h1 className="text-3xl md:text-5xl font-bold drop-shadow-lg">
            Empower Your Journey
          </h1>
          <p className="mt-2 w-[60%] text-lg md:text-xl drop-shadow">
            This is where culture meets Football.
          </p>
          <button className="mt-6 px-6 py-3 bg-transparent text-white border-2  shadow-lg transition">
            SHOP NOW
          </button>
        </div>
      </div>

         <HotCategories/>
      {/* <div className="hidden  sm:flex flex-col bg-[#F6F7F4] items-center justify-center h-90 w-full ">
        <div className="flex w-[15%] h-[30%] flex-col items-center justify-end relative bg-no-repeat bg-contain bg-center"  style={{ backgroundImage: "url('https://fulltimestore.in/cdn/shop/files/Untitled_design.png?v=1748178404&width=2000')" }}>
          <p className=" text-xl font-bold ">BE REAL YOU</p>
        </div>
        <p className="text-[#6A6A69] text-base w-[80%] mt-3 text-center">
          Football is more than just a sport, it&apos;s a passion, a community, and a way of life. In recent years, the love for football has been growing rapidly across India, reaching fans, where the spirit and enthusiasm for the game are just as powerful.
        </p>
      </div> */}
      
      <div className="h-screen w-full">
        <AnimatedSections />
      </div>
      
      {/* <div className="flex items-center justify-center h-170 w-full relative bg-no-repeat bg-cover bg-center"   style={{ backgroundImage: "url('https://i.pinimg.com/1200x/3e/d7/37/3ed7377fd5aa54f282a93329396564f6.jpg')" }}>
               <div className="relative text-center text-white px-4">
                 <h1 className="text-3xl sm:text-6xl font-medium mb-4">
                   CLEARANCE SALE
                 </h1>
                 <p className="text-sm sm:text-lg  mb-6">
                   Score top jerseys and gear at unbeatable prices. Limited stock, limited time grab yours before they’re gone!
                 </p>
                 <button className="px-3 py-1 sm:px-6 sm:py-3 bg-transparent text-white border font-semibold  hover:underline">
                   Shop Now  <ArrowRight className="inline-block ml-1" />
                 </button>
               </div>
        </div> */}
        <div className='h-[80px] sm:h-[180px] grid place-content-center'>
         <Component
          delay={500}
          baseVelocity={-3}
          clasname='font-semibold tracking-[0.04em] '
          >
            EXPLORE COLLECTIONS
          </Component>
        </div>
        <div className="w-full sm:flex items-center justify-center h-150 ">
          <div className="group relative flex items-center justify-center w-full sm:w-[50%] h-[50%] sm:h-full p-2 overflow-hidden">
              <div
                className="absolute inset-0 bg-no-repeat bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{
                  backgroundImage:
                    "url('https://i.pinimg.com/736x/b6/af/e5/b6afe5d08008cdbd792f2754a49df5ce.jpg')",
                }}
              ></div>
             <p className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 
              text-lg sm:text-2xl cursor-pointer font-medium text-[#0C1929] 
              opacity-100 sm:opacity-0 sm:group-hover:opacity-100 
              transition-opacity duration-300 hover:underline" >
                MENS COLLECTION <ArrowRight className="inline-block ml-2" />
              </p>
          </div>

           <div className="group relative flex items-center justify-center w-full sm:w-[50%] h-[50%] sm:h-full p-2 overflow-hidden">
              <div
                className="absolute inset-0 bg-no-repeat bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{
                  backgroundImage:
                    "url('https://i.pinimg.com/1200x/01/14/93/011493ac5d2c3e62d0fefa0dcf6e0b42.jpg')",
                }}
              ></div>
              <p
                className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 
                  text-lg sm:text-2xl cursor-pointer font-medium text-[#0C1929] 
                  opacity-100 sm:opacity-0 sm:group-hover:opacity-100 
                  transition-opacity duration-300 hover:underline">
                WOMEN COLLECTION <ArrowRight className="inline-block ml-2" />
              </p>
          </div>
      </div>
       <Categories/>
         <CategoriesTeam />
      {/* <div className="h-screen w-full">
        <AnimatedSections />
      </div> */}
      
      <div className="hidden  sm:flex flex-col bg-[#F6F7F4] items-center justify-center h-90 w-full ">
        <div className="flex w-[15%] h-[30%] flex-col items-center justify-end relative bg-no-repeat bg-contain bg-center"  style={{ backgroundImage: "url('https://fulltimestore.in/cdn/shop/files/Untitled_design.png?v=1748178404&width=2000')" }}>
          <p className=" text-xl font-bold ">BE REAL YOU</p>
        </div>
        <p className="text-[#6A6A69] text-base w-[80%] mt-3 text-center">
          Football is more than just a sport, it&apos;s a passion, a community, and a way of life. In recent years, the love for football has been growing rapidly across India, reaching fans, where the spirit and enthusiasm for the game are just as powerful.
        </p>
      </div>
        <div className="flex items-center justify-center h-170 w-full relative bg-no-repeat bg-cover bg-center"   style={{ backgroundImage: "url('https://i.pinimg.com/1200x/3e/d7/37/3ed7377fd5aa54f282a93329396564f6.jpg')" }}>
               <div className="relative text-center text-white px-4">
                 <h1 className="text-3xl sm:text-6xl font-medium mb-4">
                   CLEARANCE SALE
                 </h1>
                 <p className="text-sm sm:text-lg  mb-6">
                   Score top jerseys and gear at unbeatable prices. Limited stock, limited time grab yours before they’re gone!
                 </p>
                 <button className="px-3 py-1 sm:px-6 sm:py-3 bg-transparent text-white border font-semibold  hover:underline">
                   Shop Now  <ArrowRight className="inline-block ml-1" />
                 </button>
               </div>
        </div>
        
      </>
  ); 
}
