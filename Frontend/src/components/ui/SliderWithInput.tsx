"use client";

import { useSliderWithInput } from "@/components/ui/use-slider-with-input";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/field"
import { Slider } from "@/components/ui/slider";
import React from "react";

export default function SliderWithInput({
  minValue,
  maxValue,
  initialValue,
  defaultValue,
  label,
  onChange,
}: {
  minValue: number;
  maxValue: number;
  initialValue: number[];
  defaultValue: number[];
  label: string;
  onChange?: (value: number) => void;
}) {
  const {
    sliderValue,
    inputValues,
    validateAndUpdateValue,
    handleInputChange,
    handleSliderChange,
  } = useSliderWithInput({ minValue, maxValue, initialValue, defaultValue });



  return (
    <div className="flex w-full items-center gap-2">
      <Label className="text-sm w-8  text-muted-foreground">{label}</Label>
      <Slider
        className="grow [&>:last-child>span]:rounded "
        value={sliderValue}
        onValueChange={handleSliderChange}
        min={minValue}
        max={maxValue}
        aria-label={label}
      />
      <Input
        className="h-8 w-12 px-2 py-1 text-center"
        type="text"
        inputMode="decimal"
        value={inputValues[0]}
        onChange={(e) => handleInputChange(e, 0)}
        onBlur={() => validateAndUpdateValue(inputValues[0], 0)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            validateAndUpdateValue(inputValues[0], 0);
          }
        }}
        aria-label="Enter value"
      />
    </div>
  );
}

