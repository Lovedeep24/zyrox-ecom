import React from "react";
import ProductTemplate from "./ProductTemplate";

const ProductListing: React.FC = () => {
  const sampleProducts = [
    {
      id: 1,
      name: "Nike Mercurial Vapor 15",
      price: 199.99,
      onSale: true,
      salePercent: 20,
      images: [
       "https://i.pinimg.com/1200x/cc/ad/b3/ccadb34ebb286294341846b7132fd019.jpg",
      "https://i.pinimg.com/736x/d3/cd/06/d3cd064a8f5051a97602109ea0371fe9.jpg",
      ],
    },
    {
      id: 2,
      name: "Adidas Predator Elite",
      price: 179.99,
      onSale: false,
      images: [
       "https://i.pinimg.com/1200x/cc/ad/b3/ccadb34ebb286294341846b7132fd019.jpg",
       "https://i.pinimg.com/736x/d3/cd/06/d3cd064a8f5051a97602109ea0371fe9.jpg",
      ],
    },
    {
      id: 3,
      name: "Puma Ultra Ultimate",
      price: 159.99,
      onSale: true,
      salePercent: 15,
      images: [
        "https://i.pinimg.com/1200x/cc/ad/b3/ccadb34ebb286294341846b7132fd019.jpg",
      "https://i.pinimg.com/736x/d3/cd/06/d3cd064a8f5051a97602109ea0371fe9.jpg",
      ],
    },
        {
      id: 4,
      name: "Puma Ultra Ultimate",
      price: 159.99,
      onSale: true,
      salePercent: 15,
      images: [
       "https://i.pinimg.com/1200x/cc/ad/b3/ccadb34ebb286294341846b7132fd019.jpg",
      "https://i.pinimg.com/736x/d3/cd/06/d3cd064a8f5051a97602109ea0371fe9.jpg",
      ],
    },
        {
      id: 5,
      name: "Puma Ultra Ultimate",
      price: 159.99,
      onSale: true,
      salePercent: 15,
      images: [
      "https://i.pinimg.com/1200x/cc/ad/b3/ccadb34ebb286294341846b7132fd019.jpg",
      "https://i.pinimg.com/736x/d3/cd/06/d3cd064a8f5051a97602109ea0371fe9.jpg",
      ],
    },
        {
      id: 6,
      name: "Puma Ultra Ultimate",
      price: 159.99,
      onSale: true,
      salePercent: 15,
      images: [
        "https://i.pinimg.com/1200x/cc/ad/b3/ccadb34ebb286294341846b7132fd019.jpg",
      "https://i.pinimg.com/736x/d3/cd/06/d3cd064a8f5051a97602109ea0371fe9.jpg",
      ],
    },
        {
      id: 7,
      name: "Puma Ultra Ultimate",
      price: 159.99,
      onSale: true,
      salePercent: 15,
      images: [
       "https://i.pinimg.com/1200x/cc/ad/b3/ccadb34ebb286294341846b7132fd019.jpg",
      "https://i.pinimg.com/736x/d3/cd/06/d3cd064a8f5051a97602109ea0371fe9.jpg",
      ],
    },
        {
      id: 8,
      name: "Puma Ultra Ultimate",
      price: 159.99,
      onSale: true,
      salePercent: 15,
      images: [
       "https://i.pinimg.com/1200x/cc/ad/b3/ccadb34ebb286294341846b7132fd019.jpg",
      "https://i.pinimg.com/736x/d3/cd/06/d3cd064a8f5051a97602109ea0371fe9.jpg",
      ],
    },    {
      id: 9,
      name: "Puma Ultra Ultimate",
      price: 159.99,
      onSale: true,
      salePercent: 15,
      images: [
       "https://i.pinimg.com/1200x/cc/ad/b3/ccadb34ebb286294341846b7132fd019.jpg",
      "https://i.pinimg.com/736x/d3/cd/06/d3cd064a8f5051a97602109ea0371fe9.jpg",
      ],
    },
        {
      id: 10,
      name: "Puma Ultra Ultimate",
      price: 159.99,
      onSale: true,
      salePercent: 15,
      images: [
       "https://i.pinimg.com/1200x/cc/ad/b3/ccadb34ebb286294341846b7132fd019.jpg",
      "https://i.pinimg.com/736x/d3/cd/06/d3cd064a8f5051a97602109ea0371fe9.jpg",
      ],
    }
  ];

  return (
    <div className="w-full h-screen flex flex-col items-end">
      <div className="w-full h-[60%] border-2 border-red-900 shrink-0">

      </div>
      <div className="flex-1 w-full bg-[#F2F2F2]">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10  p-5">
        {sampleProducts.map((product) => (
          <ProductTemplate  key={product.id} {...product} />
        ))}
      </div>  
      </div>
      
    </div>
  );
};

export default ProductListing;
