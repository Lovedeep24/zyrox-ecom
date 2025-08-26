import React, { useState } from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselNavigation,
  CarouselIndicator,
  CarouselItem,
} from '@/components/ui/carousel';
import { RippleButton } from "@/components/ui/ripple-button";
import axios from "axios";
import { Badge } from "@/components/ui/badge";
import { Button } from '@/components/ui/button-1';
import { ListCheckIcon} from 'lucide-react';
import { useToast } from './ui/toast-1';
import Image from "next/image"
import  { ProductInfo } from "@/components/AddProduct"
import { ProductSize } from '@/components/AddProduct';
import { Label } from "@/components/ui/field"
interface childProps{
  product: ProductInfo
  sizes:ProductSize[]
  urls: string[];
  setProductInfo: React.Dispatch<React.SetStateAction<ProductInfo>>;
  setSizes: React.Dispatch<React.SetStateAction<ProductSize[]>>;
  setUrls: React.Dispatch<React.SetStateAction<string[]>>;
}


export default function ProductPreview({product, sizes, urls,setProductInfo,setSizes,setUrls}:childProps) {
  const { showToast } = useToast();
  const[finalizeProduct,setFinalizeProduct]=useState<boolean>(false)
  const [loading,setLoading]=useState<boolean>(false)

  const validateProductInfo = (productInfo: ProductInfo) => {
  if (!productInfo.name.trim()) {
    showToast("Product name is required!","warning","bottom-right");
    return false;
  } else if (!productInfo.description.trim()) {
    showToast("Product description is required!","warning","bottom-right");
    return false;
  } else if (productInfo.price <= 0) {
    showToast("Price must be greater than 0!","warning","bottom-right");
    return false;
  } else if (productInfo.images.length === 0) {
    showToast("Please upload at least one product image!","warning","bottom-right");
    return false;
  } else if (!productInfo.material.trim()) {
    showToast("Material is required!","warning","bottom-right");
    return false;
  } else if (!productInfo.category.trim()) {
    showToast("Category is required!","warning","bottom-right");
    return false;
  } else if (!productInfo.gender.trim()) {
    showToast("Gender is required!","warning","bottom-right");
    return false;
  } else if (!productInfo.brand.trim()) {
    showToast("Brand is required!","warning","bottom-right");
    return false;
  } else if (productInfo.availableStock <= 0) {
    showToast("Available stock must be greater than 0!","warning","bottom-right");
    return false;
  }
  return true;
};
 const finalizeProductInfo = () => {
  const totalStock = sizes.reduce((acc, size) => acc + size.units, 0);
  setProductInfo((prev) => ({
    ...prev,
    images: urls,
    size: sizes,
    availableStock: totalStock,
  }));
  console.log(product);
  if (validateProductInfo(product)) {
      showToast("Product finalized successfully!","success","bottom-right");
        setFinalizeProduct(true);
    }
};

const resetAll=()=>{
  setProductInfo({
    name: "",
    description: "",
    price: 0,
    size: [{ label: "", units: 0 }],
    images: [],
    material: "",
    category: "",
    gender: "",
    brand: "",
    tags: [],
    availableStock: 0,
    isOnSale: false,
    salePercent: 0,
  });
  setSizes([  { label: "S", units: 0 },
  { label: "M", units: 0 },
  { label: "L", units: 0 },
  { label: "XL", units: 0 },
  { label: "XXL", units: 0 },
]);
  setUrls([]);
}
const launchProduct = async(product:ProductInfo)=>{
  console.log("entered launch")
  setLoading(true)
  try {
    const res = await axios.post("http://localhost:5000/addProduct",{
            name:product.name,
            description:product.description,
            price:product.price,
            size:product.size,
            material:product.material,
            category:product.category,
            gender:product.gender,
            brand:product.brand,
            availableStock:product.availableStock ,
            isOnSale : product.isOnSale,
            salePercent:product.salePercent
    })
    console.log(res)
    if(res.status == 201)
    {
      showToast("Product is Live!","success","bottom-right")
      resetAll();
    }
    else if(res.status === 400)
    {
      showToast("Some data is missing","error","bottom-left")
    }
    else if(res.status === 500)
    {
      showToast("We are working on it try again later","error","bottom-right")
    }
    return setLoading(false)
  } catch (error) {
    showToast("Something went wrong try again","error","bottom-right")
    setLoading(false)
  }

}
  return (
<div className='flex flex-col h-full w-full items-center '>
    <h3 className="text-4xl font-medium font-sans">Product Overview</h3>
   <div className='flex gap-2 w-full h-full '>

    <div className='relative w-[40%] p-2 '>
    <Carousel>
    <CarouselContent>
     {urls.length>0 ? (urls.map((url, index) => (
        <CarouselItem key={index} className="p-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800">
              <Image
                src={url}
                alt={`Product Image ${index + 1}`}
                fill
                className="object-cover rounded-2xl"
              />
            </div>
          </CarouselItem>
        ))) :(
           <CarouselItem className="p-4">
            <div className="flex aspect-square rounded-2xl items-center text-center justify-center align-middle overflow-hidden border border-zinc-200 dark:border-zinc-800">
            <p  className="text-lg text-muted-foreground">No image uploaded yet</p>
            </div>
          </CarouselItem>
        )}
      </CarouselContent>
      <CarouselNavigation alwaysShow />
      <CarouselIndicator />
    </Carousel>
    </div>

<div className="w-[50%] h-[95%] p-6 bg-white dark:bg-zinc-900 rounded-xl shadow-md flex gap-6">
  {/* Left: Product Info */}
  <div className="flex-1  flex flex-col gap-3">
    <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 ">
      {product.name}
    </h2>
    <h3 className="text-xl text-gray-700 dark:text-gray-300">Brand: {product.brand}</h3>
    <div className="flex gap-4 flex-wrap">
      <Label className="text-lg text-gray-600 dark:text-gray-400">Category: {product.category}</Label>
      <Label className="text-lg text-gray-600 dark:text-gray-400">Material: {product.material}</Label>
      <Label className="text-lg text-gray-600 dark:text-gray-400">Gender: <Badge  className={`p-1 w-15 text-sm ${product.gender ==="Male"
      ? "bg-blue-100 text-blue-900" : product.gender === "Female" ? "bg-pink-100 text-pink-900" :product.gender === "Unisex" ? "bg-purple-100 text-purple-900" : "bg-gray-100 text-gray-800"
        }`} variant="outline">{product.gender}</Badge></Label>
      <Label className="text-lg text-gray-600 dark:text-gray-400">On Sale: <Badge  className={`p-1 w-12 text-sm ${product.isOnSale
      ? "bg-green-100 text-green-800"
      : "bg-gray-100 text-gray-800"
        }`} variant="outline">{product.isOnSale ? "Yes" : "No"}</Badge>
        </Label>
    </div>
    <p className="mt-2 text-lg text-gray-600 dark:text-gray-400 break-words">
      <span className="font-medium text-lg">Description: </span>
      {product.description}
    </p>

    <div className="flex gap-6 mt-4">
      <Label className="text-lg text-gray-600 dark:text-gray-400">Original Price: {product.price}</Label>
      <Label className="text-lg text-gray-600 dark:text-gray-400">Discounted Price: {product.isOnSale ? `$${product.price - (product.price * product.salePercent / 100)}` : "N/A"}</Label>
    </div>
     <div className="flex items-center gap-4 w-[60%]">
      {finalizeProduct ? (<RippleButton onDoubleClick={()=>launchProduct(product)} className='w-full bg-black text-white' disabled={!finalizeProduct} rippleColor="#ADD8E6">Live Product</RippleButton>):
      (<Button variant="primary" className='w-full' onClick={finalizeProductInfo}>
        <ListCheckIcon/>
        {loading?"finalizing...":"Finalize Product"}
      </Button>)
        }
    </div>
  </div>

  {/* Right: Sizes */}
    <div className="w-40 flex flex-col items-center gap-4 p-4 bg-gray-50 dark:bg-zinc-800 rounded-lg shadow-sm">
      <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">Sizes</h3>
      <div className="flex flex-col gap-3 w-full">
        {sizes.map((size) => (
          <div key={size.label} className="flex items-center justify-between w-full">
            <div className="w-10 h-10 rounded-full border border-gray-300 dark:border-zinc-700 flex items-center justify-center text-sm font-medium text-gray-700 dark:text-gray-200">
              {size.label}
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-400">{size.units} units</span>
          </div>
        ))}
       </div>
    </div>
  </div>
 </div> 
</div>
)}