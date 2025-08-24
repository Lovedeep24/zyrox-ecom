"use client"
import React, { useState } from 'react'
import SliderWithInput from './ui/SliderWithInput';
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import PhotoUpload from './PhotoUpload'
import {
  Stepper,
  StepperContent,
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperNav,
  StepperPanel,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from '@/components/ui/stepper';
import { Check, LoaderCircleIcon } from 'lucide-react';
import { Label } from "@/components/ui/field"
import { MinimalToggle } from "@/components/ui/toggle"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Mars, Venus , Circle} from "lucide-react";
import { useId } from "react";
import {
  Select,
  SelectItem,
  SelectListBox,
  SelectPopover,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from './ui/textfield';


const steps = [
  { title: 'Step 1', description: 'Add Product Details' },
  { title: 'Step 2', description: 'Add Product Pictures' },
  { title: 'Step 3', description: 'Finalise your Product' },
];

export interface ProductSize {
  label: string;
  units: number;
}
export interface ProductInfo {
  name: string;
  description: string;
  price: number;
  size: ProductSize[];
  images:string[]
  material: string;
  category: string;
  gender: string;
  brand: string;
  tags: string[];
  availableStock: number;
  isOnSale: boolean;
  salePercent: number;
}



export default function AddProduct() {
  const[onSale,setOnSale]=useState<boolean>(false)
  const [productInfo, setProductInfo] = useState<ProductInfo>({
    name: "",
    description: "",
    price: 0,
    size: [{ label: "", units: 0 }],
    images:[],
    material: "",
    category: "",
    gender: "",
    brand: "",
    tags: [],
    availableStock: 0,
    isOnSale: false,
    salePercent: 0,
  });
const [sizes, setSizes] = useState<ProductSize[]>([
  { label: "S", units: 0 },
  { label: "M", units: 0 },
  { label: "L", units: 0 },
  { label: "XL", units: 0 },
  { label: "XXL", units: 0 },
]);
const [activeStep, setActiveStep] = useState(1);

  const handleSizeData = (label:string,units:number) => {
      setSizes((prevSizes)=>prevSizes.map((size)=>
        size.label===label?{...size,units}:size
      ));
  }

   const handleProductInfoChange = <K extends keyof ProductInfo>(
    key: K,
    value: ProductInfo[K]
  ) => {
    setProductInfo((prevInfo) => ({
      ...prevInfo,
      [key]: value,
    }));
  };

  const id = useId();

  const items = [
    { value: "1", label: "Male", Icon: Mars },
    { value: "2", label: "Female", Icon: Venus },
    { value: "3", label: "Unisex", Icon: Circle },
  ];

  return (
    <div className='flex flex-col h-screen justify-center items-center'>
      <Stepper
      defaultValue={1}
      value={activeStep}
      onValueChange={(step: number) => setActiveStep(step)}
      indicators={{
        completed: <Check className="size-4" />,
        loading: <LoaderCircleIcon className="size-4 animate-spin" />,
      }}
      className="space-y-8 mt-3"
    >
      <StepperNav>
        {steps.map((step, index) => (
          <StepperItem key={index} step={index + 1} className="relative flex-1 items-start">
            <StepperTrigger className="flex flex-col gap-2.5">
              <StepperIndicator>{index + 1}</StepperIndicator>
              <StepperTitle>{step.title}</StepperTitle>
              <StepperDescription>{step.description}</StepperDescription>
            </StepperTrigger>
            {steps.length > index + 1 && (
              <StepperSeparator className="absolute top-3 inset-x-0 left-[calc(50%+0.875rem)] m-0 group-data-[orientation=horizontal]/stepper-nav:w-[calc(100%-2rem+0.225rem)] group-data-[orientation=horizontal]/stepper-nav:flex-none group-data-[state=completed]/step:bg-primary" />
            )}
          </StepperItem>
        ))}
      </StepperNav>

      <StepperPanel className="text-sm">
        {steps.map((step, index) => (
          <StepperContent key={index} value={index + 1} className="flex items-center justify-center">
            {/* Step {step.title} content */}
          </StepperContent>
        ))}
      </StepperPanel>
    </Stepper>


      <div className='flex w-[80%] border-4 rounded-xl h-[70%] p-5 justify-center gap-5 mt-5'>
        {activeStep === 1 && (
            <div className='flex h-full w-full rounded-xl justify-center'>
          <div className=' flex flex-col gap-5 p-4 w-[45%]'>
            <div className="group relative w-[70%] ">
                    <label
                        htmlFor="productName"
                      className="origin-start absolute top-1/2 block -translate-y-1/2 cursor-text p-3 text-muted-foreground/70 transition-all group-focus-within:pointer-events-none group-focus-within:top-0 group-focus-within:cursor-default group-focus-within:text-xs group-focus-within:font-medium group-focus-within:text-foreground has-[+input:not(:placeholder-shown)]:pointer-events-none has-[+input:not(:placeholder-shown)]:top-0 has-[+input:not(:placeholder-shown)]:cursor-default has-[+input:not(:placeholder-shown)]:text-xs has-[+input:not(:placeholder-shown)]:font-medium has-[+input:not(:placeholder-shown)]:text-foreground">
                      <span className="inline-flex bg-background px-2">Product Name</span>
                    </label>
                    <Input  className="text-lg" id="testName"  type="string" placeholder="" onChange={(e)=>handleProductInfoChange("name",(e.target.value))} />
            </div>
            <div className="group relative w-[70%] ">
                    <label
                        htmlFor="description"
                      className="origin-start absolute top-1/2 block -translate-y-1/2 cursor-text p-3 text-muted-foreground/70 transition-all group-focus-within:pointer-events-none group-focus-within:top-0 group-focus-within:cursor-default group-focus-within:text-xs group-focus-within:font-medium group-focus-within:text-foreground has-[+input:not(:placeholder-shown)]:pointer-events-none has-[+input:not(:placeholder-shown)]:top-0 has-[+input:not(:placeholder-shown)]:cursor-default has-[+input:not(:placeholder-shown)]:text-xs has-[+input:not(:placeholder-shown)]:font-medium has-[+input:not(:placeholder-shown)]:text-foreground">
                      <span className="inline-flex bg-background px-2">Product Description</span>
                    </label>
                    <Input id="description"  type="string" placeholder="" onChange={(e)=>handleProductInfoChange("description",(e.target.value))} />
            </div>
            <div className="group relative w-[70%] ">
                    <label
                        htmlFor="material"
                      className="origin-start absolute top-1/2 block -translate-y-1/2 cursor-text p-3 text-muted-foreground/70 transition-all group-focus-within:pointer-events-none group-focus-within:top-0 group-focus-within:cursor-default group-focus-within:text-xs group-focus-within:font-medium group-focus-within:text-foreground has-[+input:not(:placeholder-shown)]:pointer-events-none has-[+input:not(:placeholder-shown)]:top-0 has-[+input:not(:placeholder-shown)]:cursor-default has-[+input:not(:placeholder-shown)]:text-xs has-[+input:not(:placeholder-shown)]:font-medium has-[+input:not(:placeholder-shown)]:text-foreground">
                      <span className="inline-flex bg-background px-2">Product Material</span>
                    </label>
                    <Input id="material"  type="string" placeholder="" onChange={(e)=>handleProductInfoChange("material",(e.target.value))} />
            </div>
            <div className="group relative w-[70%] ">
                    <label
                        htmlFor="Brandname"
                      className="origin-start absolute top-1/2 block -translate-y-1/2 cursor-text p-3 text-muted-foreground/70 transition-all group-focus-within:pointer-events-none group-focus-within:top-0 group-focus-within:cursor-default group-focus-within:text-xs group-focus-within:font-medium group-focus-within:text-foreground has-[+input:not(:placeholder-shown)]:pointer-events-none has-[+input:not(:placeholder-shown)]:top-0 has-[+input:not(:placeholder-shown)]:cursor-default has-[+input:not(:placeholder-shown)]:text-xs has-[+input:not(:placeholder-shown)]:font-medium has-[+input:not(:placeholder-shown)]:text-foreground">
                      <span className="inline-flex bg-background px-2">Brand name</span>
                    </label>
                    <Input id="Brandname"  type="string" placeholder="" onChange={(e)=>handleProductInfoChange("brand",(e.target.value))} />
            </div>
            <div className="w-[70%] flex justify-between">
              <Label className="text-lg">Category</Label>
              <Select
                className="w-[200px]"
                placeholder="Select Category"
                selectedKey={productInfo.category} // controlled value
                onSelectionChange={(key) =>handleProductInfoChange("category", String(key))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectPopover>
                  <SelectListBox className={"w-[200px]"}>
                    <SelectItem id="jersy">Jersy</SelectItem>
                    <SelectItem id="shorts">Shorts</SelectItem>
                    <SelectItem id="combo">Combo</SelectItem>
                    <SelectItem id="shoes">Shoes</SelectItem>
                    <SelectItem id="football">Football</SelectItem>
                    <SelectItem id="accessories">Accessories</SelectItem>
                  </SelectListBox>
                </SelectPopover>
              </Select>
            </div>
            <div className='flex justify-between w-[70%]'>
              <Label className='text-lg'>Price(Rs.)</Label>
              <Input className="w-[200px] text-md" type='number'></Input>
            </div>
            <div className='flex justify-between w-[70%]'>
              <Label className='text-lg'>ON SALE</Label>
               <MinimalToggle tabIndex={0}  onChange={(e) => {
                  setOnSale(e.target.checked)}}/>
            </div>
            {onSale && (
              <div className='flex justify-between w-[70%]'>
                <Label className='text-lg'>Sale Percent</Label>
                <Input className="w-[200px] text-md" type='number' min={1}></Input>
              </div>
            )}
        </div>
{/* <-------------------------------------------- R I G H T     H A L F --------------------------------------------> */}
        <div className='flex flex-col gap-5 p-4 w-[45%]'>
            <div className="space-y-4 min-w-[300px]">
              <legend className="text-xl font-medium text-foreground">Sizes</legend>
              <div className="space-y-2 flex flex-col justify-between">
                <SliderWithInput
                  minValue={0}
                  maxValue={20}
                  initialValue={[0]}
                  defaultValue={[0]}
                  label="S"
                  onChange={(value) => handleSizeData("S", value)}  
                />
                <SliderWithInput
                  minValue={0}
                  maxValue={20}
                  initialValue={[0]}
                  defaultValue={[0]}
                  label="M"
                   onChange={(value:number) => handleSizeData("M", value)}
                />
                <SliderWithInput
                  minValue={0}
                  maxValue={20}
                  initialValue={[0]}
                  defaultValue={[0]}
                  label="L"
                   onChange={(value:number) => handleSizeData("L", value)}
                />
                 <SliderWithInput
                  minValue={0}
                  maxValue={20}
                  initialValue={[0]}
                  defaultValue={[0]}
                  label="XL"
                   onChange={(value:number) => handleSizeData("XL", value)}
                />
                 <SliderWithInput
                  minValue={0}
                  maxValue={20}
                  initialValue={[0]}
                  defaultValue={[0]}
                  label="XXL"
                   onChange={(value:number) => handleSizeData("XXL", value)}
                />
              </div>
            <Button className="w-full text-lg" variant="outline" onClick={() =>  setSizes(sizes.map(size => ({ ...size, units: 0 })))}>
              <RotateCcw className="-ms-1 me-2 opacity-60" size={20} strokeWidth={2} aria-hidden="true" />
              Reset
            </Button>
            </div>
            <div>
              <legend className="text-lg font-medium text-foreground">Gender</legend>
              <RadioGroup className="flex justify-between w-[500px]" defaultValue="1">
               {items.map((item) => (
                 <div
                   key={`${id}-${item.value}`}
                  className={`relative flex flex-col w-30 gap-4 rounded-lg border p-4 shadow-sm shadow-black/5
                    border-input
                    ${item.label === "Male" ? "bg-blue-100 text-blue-800" : ""}
                    ${item.label === "Female" ? "bg-pink-100 text-pink-800" : ""}
                    ${item.label === "Unisex" ? "bg-green-100 text-green-800" : ""}
                    has-[[data-state=checked]]:border-ring
                  `}
                 >
                   <div className="flex justify-between gap-2 ">
                     <RadioGroupItem
                       id={`${id}-${item.value}`}
                       value={item.value}
                       className="order-1 after:absolute after:inset-0"
                     />
                     <item.Icon className="opacity-60 " size={30} strokeWidth={2} aria-hidden="true" />
                   </div>
                   <Label htmlFor={`${id}-${item.value}`}>{item.label}</Label>
                 </div>
               ))}
              </RadioGroup>
            </div>
          </div>
         </div>
        )}
        {activeStep === 2 &&(
          <PhotoUpload product={productInfo}/>
        )}
      </div>
    </div>
  )
 }
