import React from "react";
import Image from "next/image";
interface ProductProps {
  id: string | number;
  name: string;
  price: number;
  onSale?: boolean;
  salePercent?: number;
  images: string[];
}

const ProductTemplate: React.FC<ProductProps> = ({ id, name, price, onSale = false, salePercent = 0, images }) => {
  const discountedPrice = onSale ? (price - (price * salePercent) / 100).toFixed(2) : price.toFixed(2);

  return (
   <div
  key={id}
  className="group flex flex-col items-center justify-center  bg-[#FBFAF8] rounded-md shadow-sm overflow-hidden 
             border cursor-pointer transition hover:shadow-md
             w-full max-w-[315px]  h-[470px]" >
  <div className="relative w-full h-[80%] overflow-hidden ">
        <Image
          src={images[0]}
          alt={name}
          // fill
          height={200}
          width={200}
         className="absolute w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
        />
          <Image
            src={images[1]}
            alt={`${name} alt`}
            // fill
             height={200}
          width={200}
            className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
        {onSale && (
    <span className="absolute top-3 left-3 bg-gray-50 text-black text-[8px] px-2 py-1 rounded-sm shadow font-bold">
      SAVE {salePercent}%
    </span>
  )}
      </div>

  {/* Info */}
  <div className=" w-full p-5 h-[20%]">
    <h3 className="text-[12px] font-bold text-gray-900">{name}</h3>
    <div className="mt-1 text-[10px] font-medium">
      {onSale ? (
        <div className="flex gap-2 items-center">
          <span className="text-red-700">Rs.{discountedPrice}</span>
          <span className="text-gray-400 line-through ">Rs.{price.toFixed(2)}</span>
        </div>
      ) : (
        <span className="text-gray-800  ">Rs.{price.toFixed(2)}</span>
      )}
    </div>
  </div>
</div>

  );
};
export default ProductTemplate;
