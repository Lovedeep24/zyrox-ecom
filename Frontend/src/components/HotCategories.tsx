import { ArrowRight } from "lucide-react";
import Image from "next/image";

const categories = [
  {
    name: "VINTAGE",
    img: "https://shopfootball.in/cdn/shop/files/BlaugranaCurvesVintage1.jpg?v=1752767525&width=1080",
  },
  {
    name: "CLASSIC",
    img: "https://shopfootball.in/cdn/shop/files/Son1.jpg?v=1748089594&width=1080",
  },
  {
    name: "LEATHER JACKET",
    img: "https://shopfootball.in/cdn/shop/files/Argentina5.jpg?v=1728707313&width=1080",
  },
  {
    name: "MOMENTS",
    img: "https://shopfootball.in/cdn/shop/files/TheSpecialOne-1.jpg?v=1738753324&width=1080",
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
            <div className="relative group rounded-3xl h-[35%] sm:h-full w-full sm:w-[40%] overflow-hidden">
                <Image
                    src={categories[0].img}
                    alt={categories[0].name}
                     height={300}
                    width={300}
                    className="w-full h-full object-cover rounded-2xl transform transition-transform duration-500 group-hover:scale-110"
                />
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2  text-white px-3 py-1 rounded-md text-2xl text-nowrap group-hover:underline font-medium">
                    {categories[0].name}
                  </div>
            </div>
            
            <div className="sm:h-full h-[65%] w-full sm:w-[60%] grid grid-cols-2 gap-4 ">
              {categories.map((category, index) => (
                <div
                  key={index}
                  className="relative  rounded-2xl overflow-hidden group">
                  <Image
                    src={category.img}
                    alt={category.name}
                    height={300}
                    width={300}
                    className="w-full h-full object-cover rounded-2xl transform transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2  text-white px-3 py-1 rounded-md text-2xl text-nowrap group-hover:underline font-medium">
                    {category.name}
                  </div>
                </div>
              ))}
            </div>

      </div>
    </div>
  );
}
