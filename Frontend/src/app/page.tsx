"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
    <div className="h-screen w-screen overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute  w-full h-full object-cover"
      >
        <source src="/video/intro.mp4" type="video/mp4" />
      </video>

      <nav
        className={`fixed top-0 left-0 w-full transition-all duration-500 ${
          scrolled ? "  bg-black/70" : "  "
        }`}
        >
        <div className="max-w-6xl mx-auto p-4 text-white flex justify-between">
          <span className="font-bold">Logo</span>
          <p>ZYROX</p>
          <div className="space-x-4">
            <a href="#">Home</a>
            <a href="#">About</a>
          </div>
        </div>
      </nav>
       <div className="absolute inset-0 flex flex-col items-center justify-end pb-20 text-center z-10 text-white">
          <h1 className="text-3xl md:text-5xl font-bold drop-shadow-lg">
            Empower Your Journey
          </h1>
          <p className="mt-2 w-[60%] text-lg md:text-xl drop-shadow">
            This is where culture meets Football.
          </p>
          <button className="mt-6 px-6 py-3 bg-transparent text-white border-2 rounded-lg shadow-lg transition">
            SHOP NOW
          </button>
        </div>
    </div>

      <div className="flex items-center justify-center h-70 w-screen border-2">
        <p className="text-black text-base w-[80%]  text-center">
          Football is more than just a sport, it's a passion, a community, and a way of life. In recent years, the love for football has been growing rapidly across India, reaching fans not only in major cities but also in tier 3 and tier 4 towns, where the spirit and enthusiasm for the game are just as powerful.
        </p>
      </div>
      <div className="flex items-center justify-center h-150 w-screen border-2">
          <button className="bg-black text-white py-2 px-4 rounded">CLEARANCE SALE</button>
      </div>
      <div>
        
      </div>
      </>
  );
}
