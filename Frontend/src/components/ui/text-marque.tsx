"use client";
import { useRef, useEffect, forwardRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useTransform,
} from "motion/react";
import { wrap } from "@motionone/utils";
import { cn } from "@/lib/utils";

interface ComponentProps {
  children: string;
  baseVelocity?: number; // constant speed
  clasname?: string;
  delay?: number;
}

const Component = forwardRef<HTMLDivElement, ComponentProps>(
  (
    {
      children,
      baseVelocity = -5, // negative = left, positive = right
      clasname,
      delay = 0,
    },
    ref
  ) => {
    const baseX = useMotionValue(0);
    const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

    const hasStarted = useRef(false);

    useEffect(() => {
      const timer = setTimeout(() => {
        hasStarted.current = true;
      }, delay);

      return () => clearTimeout(timer);
    }, [delay]);

    useAnimationFrame((t, delta) => {
      if (!hasStarted.current) return;

      let moveBy = baseVelocity * (delta / 1000);
      baseX.set(baseX.get() + moveBy);
    });

    return (
      <div
        ref={ref}
        className="overflow-hidden whitespace-nowrap flex flex-nowrap"
      >
        <motion.div
          className="flex whitespace-nowrap gap-70 flex-nowrap"
          style={{ x }}
        >
          <span className={cn(`block text-[4vw]`, clasname)}>{children}</span>
          <span className={cn(`block text-[4vw]`, clasname)}>{children}</span>
          <span className={cn(`block text-[4vw]`, clasname)}>{children}</span>
          <span className={cn(`block text-[4vw]`, clasname)}>{children}</span>
        </motion.div>
      </div>
    );
  }
);

Component.displayName = "Component";

export default Component;
