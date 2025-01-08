import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

export const Meteors = ({
  number,
  className,
}: {
  number?: number;
  className?: string;
}) => {
  const [screenWidth, setScreenWidth] = useState(0);
  const [screenHeight, setScreenHeight] = useState(0);

  // Update the screen width on the client side
  useEffect(() => {
    setScreenWidth(window.innerWidth); // Safe to use window here
    setScreenHeight(window.innerHeight);
  }, []);

  const meteors = new Array(number || 20).fill(true);

  return (
    <>
      {meteors.map((_, idx) => (
        <span
          key={"meteor" + idx}
          className={cn(
            "animate-meteor-effect absolute z-0 h-0.5 w-0.5 rounded-[9999px] bg-slate-500 shadow-[0_0_0_1px_#ffffff10] rotate-[215deg]",
            "before:content-[''] before:absolute before:top-1/2 before:transform before:-translate-y-[50%] before:w-[50px] before:h-[1px] before:bg-gradient-to-r before:from-[#64748b] before:to-transparent",
            className
          )}
          style={{
            top: Math.random() * screenHeight + "px", // Start slightly above the screen
            left: Math.random() * screenWidth + "px", // Spread across the full screen width
            animationDelay: Math.random() * 0.6 + 0.2 + "s", // Random delay between 0.2s and 0.8s
            animationDuration: Math.random() * 8 + 2 + "s", // Random duration between 2s and 10s
          }}
        ></span>
      ))}
    </>
  );
};
