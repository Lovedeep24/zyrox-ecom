"use client";
import React from "react";

interface SizeProps {
  label: string;
  units: number;
}

interface SizeSelectorProps {
  sizes: SizeProps[];
}

export default function SizeSelector({ sizes }: SizeSelectorProps) {
  return (
    <div className="flex gap-6 ">
      {sizes.map((size) => (
        <div key={size.label} className="flex flex-col items-center gap-2">
          {/* Circle with size label */}
          <div className="w-10 p-1 h-10 rounded-full border-2 border-gray-500 flex items-center justify-center text-lg font-semibold">
            {size.label}
          </div>
          {/* Units below the circle */}
          <span className="text-sm text-gray-700">{size.units} units</span>
        </div>
      ))}
    </div>
  );
}
