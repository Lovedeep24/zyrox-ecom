import dbConnect from "@lib/dbConnect";
import Product from "@lib/models/Product";
import { NextResponse } from "next/server";
export async function POST(req) {
  const { name,description,price,size,material,category,gender,brand,tags,availableStock,isOnSale,salePercent} = await req.json();
  if(!name || !price || !description || size.length === 0 || !material || !category || !gender || !brand || !tags || !availableStock ) {
    return NextResponse.json({ message: "All fields are required" }, { status: 404 });
  }

  try {
    await dbConnect();
    const product = new Product({
    name,
    price,
    description,
    size,
    material,
    category,
    gender,
    brand,
    tags,
    availableStock,
    isOnSale,
    salePercent
  });

  await product.save();
  if (!product) {
    return NextResponse.json({ message: "Failed to add product" }, { status: 400 });
  }
  return NextResponse.json({ message: "Product added successfully" }, { status: 200 });
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }

}