import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
// https://i.pinimg.com/736x/a4/0d/b5/a40db587124ed37ea2c0f0f47e64951c.jpg
// https://i.pinimg.com/736x/f3/90/e0/f390e0cd005561be43dd42670e236868.jpg
const def= {
  name: "JERSEY",
  img1: "https://i.pinimg.com/736x/a4/0d/b5/a40db587124ed37ea2c0f0f47e64951c.jpg",
  img2: "https://i.pinimg.com/736x/f3/90/e0/f390e0cd005561be43dd42670e236868.jpg",
};
const categories = [
  {
    name: "SHOES",
    img1: "https://i.pinimg.com/1200x/cc/ad/b3/ccadb34ebb286294341846b7132fd019.jpg",
    img2: "https://i.pinimg.com/736x/d3/cd/06/d3cd064a8f5051a97602109ea0371fe9.jpg",
  },
  {
    name: "COMBO",
    img1: "https://i.pinimg.com/1200x/15/ae/98/15ae98312383d9a4c5909ece6f519e53.jpg",
    img2: "https://i.pinimg.com/736x/62/de/ae/62deae0d207fe81d48fa9054f8e8fda9.jpg"
  },
  {
    name: "HOODIES",
    img1: "https://i.pinimg.com/1200x/f4/8f/b0/f48fb0b2a486e56cafb385b6cc680086.jpg",
    img2: "https://i.pinimg.com/1200x/cd/7b/1b/cd7b1ba098fe996484d7e92e30191baa.jpg"
  },
  {
    name: "ACCESSORIES",
    img1: "https://i.pinimg.com/736x/35/43/17/35431744685ab91d33c799982e8d08ff.jpg",
    img2: "https://i.pinimg.com/736x/cd/d3/39/cdd339982ca3b122d097461cb4cb427a.jpg"
  }
];

export default function HotCategories() {
  return (
    <div className="w-full flex flex-col items-center bg-[#F2F2F2] gap-2 sm:gap-10 p-3 h-250  pt-10">
      {/* Header */}
      <div className=" flex h-[8%] text-2xl sm:text-5xl  justify-between  font-semibold w-full">
        {/* <p className="hover:underline">FOR YOU</p> */}
        <p className="flex items-center ml-10">
        Our Hot Categories
        </p>
         <p className="hover:underline flex items-center cursor-pointer">
          Explore <ArrowRight className="ml-2 size-6 sm:size-8  md:size-10" />
        </p>
      </div>

        <div className="flex flex-col sm:flex-row h-[80%] w-[90%] border bg-[#000000] rounded-4xl  p-15 gap-5 items-center justify-center ">
            <div className="relative group rounded-3xl h-[35%] sm:h-full w-full sm:w-[40%] overflow-hidden cursor-pointer">
                 <Image
                  src={def.img1} // first image
                  alt={def.name}
                  height={300}
                  width={300}
                  className="w-full h-full object-cover rounded-2xl transition-opacity duration-500 group-hover:opacity-0"
                />
                <Image
                  src={def.img2} // second image
                  alt={def.name}
                  height={300}
                  width={300}
                  className="absolute inset-0 w-full h-full object-cover rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2  text-white px-3 py-1 rounded-md text-2xl text-nowrap group-hover:underline font-medium">
                    {def.name}
                  </div>
            </div>
            
            <div className="sm:h-full h-[60%] w-full sm:w-[60%] grid grid-cols-2 gap-4 ">
              {categories.map((category, index) => (
                <div
                  key={index}
                  className="relative  rounded-2xl overflow-hidden group cursor-pointer" >
                   <Image
                      src={category.img1} // first image
                      alt={category.name}
                      height={300}
                      width={300}
                      className="w-full h-full object-cover rounded-2xl transition-opacity duration-500 group-hover:opacity-0"
                    />

                    {/* Hover Image */}
                    <Image
                      src={category.img2} // second image
                      alt={category.name}
                      height={300}
                      width={300}
                      className="absolute inset-0 w-full h-full object-cover rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    />
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2  text-white px-3 py-1 rounded-md text-sm sm:text-2xl text-nowrap group-hover:underline font-medium">
                    {category.name}
                  </div>
                </div>
              ))}
            </div>

      </div>
    </div>
  );
}
