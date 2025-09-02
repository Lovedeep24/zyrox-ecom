"use client"
import React, { useMemo, useState } from "react";
import ProductTemplate from "./ProductTemplate";
import { Checkbox } from "@/components/ui/animate-checkbox";
import { MinimalToggle} from "@/components/ui/toggle"
import { AnimatedModal } from '@/components/ui/animated-modal';
import {SlidersHorizontal } from 'lucide-react';
import { DualRangeSlider } from '@/components/ui/dual-range-slider';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const ProductListing: React.FC = () => {
  
  const sampleProducts = [
    {
      id: 1,
      name: "Nike Mercurial Vapor 15",
      price: 2000,
      onSale: true,
      salePercent: 20,
      availableStock: 10,
      images: [
        "https://i.pinimg.com/1200x/cc/ad/b3/ccadb34ebb286294341846b7132fd019.jpg",
        "https://i.pinimg.com/736x/d3/cd/06/d3cd064a8f5051a97602109ea0371fe9.jpg",
      ],
      category: "shoes",
      gender:"male",
      createdAt: "2025-08-20T10:00:00Z",
    },
    {
      id: 2,
      name: "Adidas Predator Elite",
      price: 1700,
      onSale: false,
      availableStock: 10,
      images: [
        "https://i.pinimg.com/1200x/cc/ad/b3/ccadb34ebb286294341846b7132fd019.jpg",
        "https://i.pinimg.com/736x/d3/cd/06/d3cd064a8f5051a97602109ea0371fe9.jpg",
      ],
      category: "shoes",
      gender:"male",
      createdAt: "2025-08-10T14:00:00Z",
    },
    {
      id: 3,
      name: "Puma Ultra Ultimate",
      price: 1599,
      onSale: true,
      availableStock: 10,
      salePercent: 15,
      images: [
        "https://i.pinimg.com/1200x/cc/ad/b3/ccadb34ebb286294341846b7132fd019.jpg",
        "https://i.pinimg.com/736x/d3/cd/06/d3cd064a8f5051a97602109ea0371fe9.jpg",
      ],
      category: "boots",
      gender:"male",
      createdAt: "2025-07-01T09:30:00Z",
    },
    {
      id: 4,
      name: "Puma Ultra Ultimate",
      price: 1000,
      onSale: true,
      salePercent: 15,
      availableStock:0,
      images: [
        "https://i.pinimg.com/1200x/cc/ad/b3/ccadb34ebb286294341846b7132fd019.jpg",
        "https://i.pinimg.com/736x/d3/cd/06/d3cd064a8f5051a97602109ea0371fe9.jpg",
      ],
      category: "boots",
      gender:"male",
      createdAt: "2025-07-01T09:30:00Z",
    },
    {
      id: 5,
      name: "Puma Ultra Ultimate",
      price: 700,
      onSale: true,
      salePercent: 15,
      availableStock: 10,
      gender:"female",
      images: [
        "https://i.pinimg.com/1200x/cc/ad/b3/ccadb34ebb286294341846b7132fd019.jpg",
        "https://i.pinimg.com/736x/d3/cd/06/d3cd064a8f5051a97602109ea0371fe9.jpg",
      ],
      category: "boots",
      createdAt: "2025-06-01T09:30:00Z",
      inStock: false,
    },
    {
      id: 6,
      name: "Puma Ultra Ultimate",
      price: 2500,
      onSale: false,
      salePercent: 0,
      images: [
        "https://i.pinimg.com/1200x/cc/ad/b3/ccadb34ebb286294341846b7132fd019.jpg",
        "https://i.pinimg.com/736x/d3/cd/06/d3cd064a8f5051a97602109ea0371fe9.jpg",
      ],
      category: "boots",
      gender:"female",
      createdAt: "2025-07-01T09:30:00Z",
      availableStock: 10,
    },
    {
      id: 7,
      name: "Puma Ultra Ultimate",
      price: 1150,
      onSale: true,
      salePercent: 25,
      images: [
        "https://i.pinimg.com/1200x/cc/ad/b3/ccadb34ebb286294341846b7132fd019.jpg",
        "https://i.pinimg.com/736x/d3/cd/06/d3cd064a8f5051a97602109ea0371fe9.jpg",
      ],
      category: "boots",
      gender:"female",
      createdAt: "2025-04-01T09:30:00Z",
      availableStock: 10,
    },
    {
      id: 8,
      name: "Puma Ultra Ultimate",
      price: 500,
      onSale: true,
      salePercent: 15,
      images: [
        "https://i.pinimg.com/1200x/cc/ad/b3/ccadb34ebb286294341846b7132fd019.jpg",
        "https://i.pinimg.com/736x/d3/cd/06/d3cd064a8f5051a97602109ea0371fe9.jpg",
      ],
      category: "boots",
      gender:"male",
      createdAt: "2025-05-01T09:30:00Z",
      availableStock: 0,
    },
    {
      id: 9,
      name: "Puma Ultra Ultimate",
      price: 400,
      onSale: false,
      salePercent: 0,
      images: [
        "https://i.pinimg.com/1200x/cc/ad/b3/ccadb34ebb286294341846b7132fd019.jpg",
        "https://i.pinimg.com/736x/d3/cd/06/d3cd064a8f5051a97602109ea0371fe9.jpg",
      ],
      category: "shoes",
      gender:"female",
      createdAt: "2025-03-04T09:30:00Z",
      availableStock: 0,
    },
  ];
   const [inStockOnly, setInStockOnly] = useState(false);
   const[isOnsale,setIsOnSale]=useState<boolean>(false);  
   const [values, setValues] = useState([0, 3000]);
   const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
   const[selectedGender,setSelectedGender]=useState<string[]>([]);
   const categories = ["Jersy","Shoes", "T-shirt","Shorts","Jacket","Combo","Sweatshirt", "Accessories", "Football","Oversized","Vintage","Classic","joggers"];
   const genders=["male","female","unisex"];

  const handleCategoryChange = (category: string, checked: boolean) => {
    setSelectedCategories((prev) => {
      if (checked) {
        return [...prev, category];
      } else {
        return prev.filter((c) => c !== category);
      }
    });
  };
  const handleGenderChange = (gender: string, checked: boolean) => {
    setSelectedGender((prev) => {
      if (checked) {
        return [...prev, gender];
      } else {
        return prev.filter((g) => g !== gender);
      }
    });
  };
   const handleToggle = () => {
      setInStockOnly((prev) => !prev); 
    };
     const handleSaleToggle = () => {
      setIsOnSale((prev) => !prev);
    };

  const filteredProducts = useMemo(() => {
    let result = [...sampleProducts];
    if (inStockOnly) {
      result = result.filter((p) => p.availableStock > 0);
    }
    if (values[0] !== 0) {
      result = result.filter((p) => p.price >= values[0]);
    }
    if (values[1] !== 3000) {
      result = result.filter((p) => p.price <= values[1]);
    }
    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.category));
    }
    if (selectedGender.length>0) {
      result = result.filter((p) => selectedGender.includes(p.gender));
    }
    if(isOnsale){
      result = result.filter((p)=>p.onSale === true)
    }
    return result;
  }, [inStockOnly, selectedCategories,selectedGender, sampleProducts,isOnsale,values]);
  return (
    <div className="w-full h-screen flex flex-col items-end">
      <div className="w-full h-[60%] shrink-0">

      </div>
    <div className="flex-1 flex  w-full bg-[#F2F2F2]">
      <div className="hidden sm:flex sticky sm:flex-col items-center top-0 h-screen w-[25%]">
        <h2 className="text-2xl font-bold p-5 flex w-full items-center gap-2"><span><SlidersHorizontal/></span>Filters</h2>
        <div className="sm:flex sm:flex-col w-[90%] hidden p-2 gap-3">
            <Accordion type="single" collapsible className="w-full ">
               <AccordionItem value="item-1">
                <AccordionTrigger className="text-[15px] font-bold text-gray-900">Category</AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col pl-5 gap-2">
                    {categories.map((category) => (
                      <div key={category} className="flex items-center gap-2">
                        <Checkbox
                          className="data-[state=checked]:border-[#0C1929] data-[state=checked]:bg-[#0C1929] data-[state=checked]:text-white data-[state=unchecked]:bg-gray-200"
                          onCheckedChange={(checked) =>
                            handleCategoryChange(category, checked as boolean)
                          }
                          checked={selectedCategories.includes(category)}
                        />
                        <label>{category}</label>
                      </div>
                    ))}
                   </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-[15px] font-bold text-gray-900">Gender</AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col pl-5 gap-2">
                    {genders.map((gen) => (
                      <div key={gen} className="flex items-center gap-2">
                        <Checkbox
                          className="data-[state=checked]:border-[#0C1929] data-[state=checked]:bg-[#0C1929] data-[state=checked]:text-white data-[state=unchecked]:bg-gray-200"
                          onCheckedChange={(checked) =>
                            handleGenderChange(gen, checked as boolean)
                          }
                          checked={selectedGender.includes(gen)}
                        />
                        <label>{gen}</label>
                      </div>
                    ))}
                   </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-[15px] font-bold text-gray-900">Price(Rs.)</AccordionTrigger>
                <AccordionContent>
                 <div className="w-full h-auto p-5 flex flex-col ">
                     <DualRangeSlider
                      label={(value) => value}
                      value={values}
                      onValueChange={setValues}
                      min={0}
                      max={3000}
                      step={1}/>
                  </div>
                </AccordionContent>
              </AccordionItem>
               <AccordionItem value="item-4" className="py-3">
                <div className="flex items-center justify-between gap-4 p-1 text-center xl:gap-8">
                      <span className="text-[15px] font-bold text-gray-900">In stock only</span>
                      <MinimalToggle tabIndex={0} onClick={handleToggle} />
                  </div>
                </AccordionItem>
                <AccordionItem value="item-5" className="py-3">
                  <div className="flex items-center justify-between gap-4 p-1 text-center xl:gap-8">
                    <span className="text-[15px] font-bold text-gray-900">On sale Products</span>
                    <MinimalToggle tabIndex={0} onClick={handleSaleToggle} />
                  </div>
                </AccordionItem>
            </Accordion>
        </div>
      </div>
      <div className=" w-full sm:w-[75%]  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 p-15">
        {filteredProducts.length > 0 ? (filteredProducts.map((product) => (
          <ProductTemplate  key={product.id} {...product} />
        ))) : (
          <div>No products found matching your filters</div>
        )}
      </div> 
{/* <<------------------------------------------------F O R   M O B I L E----------------------------------------------------------------- */}
       <div className="sm:hidden w-[90%] fixed bottom-4 right-4 z-50">
         <AnimatedModal 
           trigger={<>Filters <SlidersHorizontal className="inline ml-1" size={16} /></>}
           title="Filters">
           <div className="space-y-4">
          <Accordion type="single" collapsible className="w-full ">
               <AccordionItem value="item-1">
                <AccordionTrigger className="text-[15px] font-bold text-gray-900">Category</AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col pl-5 gap-2">
                    {categories.map((category) => (
                      <div key={category} className="flex items-center gap-2">
                        <Checkbox
                          className="data-[state=checked]:border-[#0C1929] data-[state=checked]:bg-[#0C1929] data-[state=checked]:text-white data-[state=unchecked]:bg-gray-200"
                          onCheckedChange={(checked) =>
                            handleCategoryChange(category, checked as boolean)
                          }
                          checked={selectedCategories.includes(category)}
                        />
                        <label>{category}</label>
                      </div>
                    ))}
                   </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-[15px] font-bold text-gray-900">Gender</AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col pl-5 gap-2">
                    {genders.map((gen) => (
                      <div key={gen} className="flex items-center gap-2">
                        <Checkbox
                          className="data-[state=checked]:border-[#0C1929] data-[state=checked]:bg-[#0C1929] data-[state=checked]:text-white data-[state=unchecked]:bg-gray-200"
                          onCheckedChange={(checked) =>
                            handleGenderChange(gen, checked as boolean)
                          }
                          checked={selectedGender.includes(gen)}
                        />
                        <label>{gen}</label>
                      </div>
                    ))}
                   </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-[15px] font-bold text-gray-900">Price(Rs.)</AccordionTrigger>
                <AccordionContent>
                 <div className="w-full h-auto p-5 flex flex-col ">
                     <DualRangeSlider
                      label={(value) => value}
                      value={values}
                      onValueChange={setValues}
                      min={0}
                      max={3000}
                      step={1}/>
                  </div>
                </AccordionContent>
              </AccordionItem>
               <AccordionItem value="item-4" className="py-3">
                <div className="flex items-center justify-between gap-4 p-1 text-center xl:gap-8">
                      <span className="text-[15px] font-bold text-gray-900">In stock only</span>
                      <MinimalToggle tabIndex={0} onClick={handleToggle} />
                  </div>
                </AccordionItem>
                <AccordionItem value="item-5" className="py-3">
                  <div className="flex items-center justify-between gap-4 p-1 text-center xl:gap-8">
                    <span className="text-[15px] font-bold text-gray-900">On sale Products</span>
                    <MinimalToggle tabIndex={0} onClick={handleSaleToggle} />
                  </div>
                </AccordionItem>
            </Accordion>
          </div>
        </AnimatedModal>
      </div> 
      </div>
      
    </div>
  );
};

export default ProductListing;
