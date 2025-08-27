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
  },
  {
    name: "JOGGERS",
    img: "https://shopfootball.in/cdn/shop/files/TheRoyalsJoggers1.jpg?v=1742334118&width=1080",
  },
  {
    name: "WINTERWEAR",
    img: "https://shopfootball.in/cdn/shop/files/Sky_Blues_Hoodie_1.jpg?v=1732552979&width=1080",
  },
];

export default function Categories() {
  return (
    <div className="w-full flex flex-col p-3 h-120 sm:h-170  ">
      {/* Header */}
      <div className="p-4 flex h-[8%] text-2xl sm:text-3xl md:text-4xl justify-end cursor-pointer font-semibold w-full">
        {/* <p className="hover:underline">FOR YOU</p> */}
        <p className="hover:underline flex items-center">
          Explore all <ArrowRight className="ml-2 size-6 sm:size-8 md:size-10" />
        </p>
      </div>

      {/* Carousel */}
      <div className="relative h-full w-full flex items-center justify-center overflow-x-auto hide-scrollbar">
        <div className="flex gap-6 px-4 py-6 w-[95%] snap-x h-full snap-mandatory hide-scrollbar overflow-x-scroll">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              className="relative border group rounded-2xl overflow-hidden hide-scrollbar flex-shrink-0 snap-center cursor-pointer 
              w-[70%] sm:w-[27%] h-[80%] sm:h-full"
            >
              <div className="overflow-hidden h-full w-full hide-scrollbar">
                <Image
                  src={cat.img}
                  alt={cat.name}
                  width={700}
                  height={300}
                  className=" w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="absolute text-nowrap bottom-6 left-1/2 -translate-x-1/2  text-white px-3 py-1 flex items-center text-sm sm:text-xl font-medium group-hover:underline transition-transform duration-300 ">
                {cat.name}
                <ArrowRight className=" size-6" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
