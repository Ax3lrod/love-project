"use client";

import React, { useState, useEffect } from "react";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import { FlipWords } from "@/components/ui/flip-words";
import HeartCanvas from "@/components/HeartCanvas";

export default function Hero() {
  const [elapsedTime, setElapsedTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [years, setYears] = useState(0);

  useEffect(() => {
    const targetDate = new Date("2024-01-09T00:00:00Z");

    const updateElapsedTime = () => {
      const now = new Date();
      const diff = now.getTime() - targetDate.getTime();

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setElapsedTime({ days, hours, minutes, seconds });
      const yearsPassed = Math.abs(
        now.getFullYear() - targetDate.getFullYear()
      );
      setYears(yearsPassed);
    };

    updateElapsedTime();
    const interval = setInterval(updateElapsedTime, 1000);

    return () => clearInterval(interval);
  }, []);

  const name = [
    "Fio",
    "Sayangku",
    "Cintaku",
    "My Universe",
    "My Wonderwall",
    "the Love of my Life",
    "My Everything",
  ];

  return (
    <section className="w-full lg:h-screen min-h-screen text-white flex lg:flex-row flex-col-reverse justify-center items-center lg:overflow-hidden max-lg:pb-10">
      {/* Background */}
      <ShootingStars />
      <StarsBackground />

      {/* Content */}
      <section className=";g:w-[40%] w-full flex flex-col lg:pl-10 sm:px-12 px-7">
        <div className="flex flex-col">
          <div className="flex mb-2">
            <p className="sm:text-4xl text-2xl">Hey,</p>
            <FlipWords
              words={name}
              duration={5000}
              className="sm:text-4xl text-2xl"
            />
          </div>
          <p className="text-lg">
            Ever since i fell for you {years} year ago, I&apos;ve always knew
            that you are THE ONE and I&apos;m not exaggerating. I don&apos;t
            know how I got sooo lucky to meet you but I&apos;m really glad it
            happened. It&apos;s like, right then, it all suddenly makes sense.
            All of it. Everything that has happened to me has led me to you. You
            are the greatest thing that have ever happened to me y&apos;know.
            It&apos;s crazy that we have made it this far. Well, It&apos;s not a
            surprise since we really loved each other very much ❤️. But really,
            I&apos;m so happy and I&apos;m really proud of us. So let&apos;s
            keep this party going forever shall we? I can&apos;t wait to see
            what the universe holds for us in the future. Whatever it is,
            I&apos;m ready, beause I&apos;ll have you by my side. Thank you Fio,
            for crashing into my life and making it awesome. I love you
            eternally.
          </p>
          <p className="text-lg mt-5">Sincerely, Your Rockstar</p>
        </div>
      </section>

      {/* Timer */}
      <section className="lg:w-3/5 w-full flex flex-col justify-center items-center relative lg:mb-28 sm:mb-20 mb-10">
        {/* Heart */}
        <div className="relative z-0 w-full flex justify-center max-xl:hidden">
          <HeartCanvas componentWidth={850} brushWidth={10} />
        </div>
        <div className="relative z-0 w-full flex justify-center max-lg:hidden xl:hidden">
          <HeartCanvas componentWidth={700} brushWidth={10} />
        </div>
        <div className="relative z-0 w-full flex justify-center max-sm:hidden lg:hidden">
          <HeartCanvas componentWidth={600} brushWidth={10} />
        </div>
        <div className="relative z-0 w-full flex justify-center sm:hidden">
          <HeartCanvas componentWidth={380} brushWidth={10} />
        </div>

        <div className="flex flex-col items-center z-10 sm:gap-10 absolute">
          <p className="xl:text-6xl lg:text-4xl text-3xl sm:block hidden">
            {String(elapsedTime.days).padStart(2, "0")}
            <span className="lg:text-2xl text-lg sm:text-xl w-1/4">
              days
            </span>{" "}
            {String(elapsedTime.hours).padStart(2, "0")}
            <span className="lg:text-2xl text-lg sm:text-xl w-1/4">
              hours
            </span>{" "}
            {String(elapsedTime.minutes).padStart(2, "0")}
            <span className="lg:text-2xl text-lg sm:text-xl w-1/4">
              minutes
            </span>{" "}
            {String(elapsedTime.seconds).padStart(2, "0")}
            <span className="lg:text-2xl text-lg sm:text-xl w-1/4">
              seconds
            </span>{" "}
          </p>
          <p className="text-3xl sm:hidden">
            {String(elapsedTime.days).padStart(2, "0")} :{" "}
            {String(elapsedTime.hours).padStart(2, "0")} :{" "}
            {String(elapsedTime.minutes).padStart(2, "0")} :{" "}
            {String(elapsedTime.seconds).padStart(2, "0")}
          </p>
          <p className="xl:text-3xl text-lg lg:text-2xl">
            May our love last forever...
          </p>
        </div>
      </section>
    </section>
  );
}
