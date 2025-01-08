/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import React, { useRef } from "react";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";
import NextImage from "next/image";
import { StarsBackground } from "@/components/ui/stars-background";
import { Meteors } from "@/components/ui/meteors";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { motion, useScroll, useTransform } from "framer-motion";
import clsx from "clsx";

export default function Slideshow() {
  // Sample image data
  const images = [
    {
      src: "/images/slideshow/1.jpg",
      tooltip: "This was the day when i asked you out 😱",
      width: 800,
      height: 800,
      padding: "p-10",
    },
    {
      src: "/images/slideshow/2.jpg",
      tooltip: "This was our first date 🥰",
      width: 400,
      height: 400,
      padding: "p-8",
    },
    {
      src: "/images/slideshow/3.jpg",
      tooltip: "Awkwaaaaaaaaaaaard",
      width: 300,
      height: 300,
      padding: "p-8",
    },
    {
      src: "/images/slideshow/4.jpg",
      tooltip: "Kita imut disini. Dan gw lumayan cakep",
      width: 700,
      height: 700,
      padding: "p-10",
    },
    {
      src: "/images/slideshow/5.jpg",
      tooltip: "Having fun with you tanpa menyadari kontak hilang",
      width: 700,
      height: 700,
      padding: "p-10",
    },
    {
      src: "/images/slideshow/6.jpg",
      tooltip: "Foto studio pertama kita anjay",
      width: 300,
      height: 300,
      padding: "p-8",
    },
  ];

  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={containerRef} className="relative h-[400vh]">
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
        <StarsBackground />
        <Meteors number={20} />

        {images.map((image, index) => {
          const isLastImage = index === images.length - 1;
          const progressRange = 1 / images.length;
          const start = progressRange * index;
          const end = start + progressRange;

          // Modify x transform for the last image
          const x = useTransform(
            scrollYProgress,
            [
              start,
              start + progressRange * 0.4,
              end - progressRange * 0.4,
              end,
            ],
            isLastImage
              ? ["100%", "0%", "0%", "0%"] // Last image stays at center
              : ["100%", "0%", "0%", "-100%"] // Other images slide out to left
          );

          // Modify opacity for last image
          const opacity = useTransform(
            scrollYProgress,
            [
              start,
              start + progressRange * 0.4,
              end - progressRange * 0.4,
              end,
            ],
            isLastImage
              ? [0, 1, 1, 1] // Last image stays visible
              : [0, 1, 1, 0] // Other images fade out
          );

          return (
            <motion.div
              key={index}
              style={{
                position: "absolute",
                x,
                opacity,
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <motion.div
                style={{
                  width: "auto",
                  perspective: "1000px",
                }}
              >
                <CardContainer className="hover:cursor-pointer">
                  <CardBody
                    className={clsx(
                      "bg-gray-50 border-1 border-black rounded-xl dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.5]",
                      image.padding
                    )}
                  >
                    <CardItem translateZ="70" className="">
                      <AnimatedTooltip tooltipContent={image.tooltip}>
                        <NextImage
                          src={image.src}
                          alt={`Image ${index + 1}`}
                          quality={100}
                          width={image.width}
                          height={image.height}
                          className="max-sm:w-full"
                        />
                      </AnimatedTooltip>
                    </CardItem>
                  </CardBody>
                </CardContainer>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
