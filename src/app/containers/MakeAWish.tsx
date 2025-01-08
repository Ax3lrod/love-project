"use client";

import React, { useState } from "react";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { StarsBackground } from "@/components/ui/stars-background";
import { motion, AnimatePresence } from "framer-motion";
import { TypewriterEffect } from "@/components/ui/typewritter-effect";
import clsx from "clsx";

const words = [
  {
    text: "Let's make a wish to the shooting stars!",
  },
];

const FloatingWish = ({ text }: { text: string }) => {
  const randomX = 1 + Math.random() * 99;

  return (
    <motion.div
      initial={{ y: 0, opacity: 1, x: randomX }}
      animate={{
        y: -window.innerHeight,
        opacity: 0,
        scale: 0.8,
      }}
      transition={{
        duration: 10,
        ease: "easeOut",
      }}
      className={clsx(
        "absolute bottom-0 text-lg text-yellow-500 pointer-events-none",
        "left-[${randomX}%]"
      )}
      style={{
        textShadow: "0 0 10px rgba(244, 63, 94, 0.5)",
      }}
    >
      ✨ {text} ✨
    </motion.div>
  );
};

export default function MakeAWish() {
  const [wish, setWish] = useState("");
  const [wishes, setWishes] = useState<Wish[]>([]);

  interface Wish {
    id: number;
    text: string;
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!wish.trim()) return;

    setWishes((prev: Wish[]) => [...prev, { id: Date.now(), text: wish }]);
    setWish("");

    setTimeout(() => {
      setWishes((prev: Wish[]) => prev.filter((w) => w.id !== wishes.length));
    }, 4000);
  };

  return (
    <BackgroundBeamsWithCollision>
      <StarsBackground />
      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-4/5 max-w-[400px]"
      >
        <TypewriterEffect
          words={words}
          className="sm:mb-6 mb-2 sm:text-2xl text-lg"
        />

        <div className="relative">
          <input
            type="text"
            value={wish}
            onChange={(e) => setWish(e.target.value)}
            placeholder="What do you wish for?"
            className="w-full border-b-2 border-white bg-transparent text-white placeholder-white/80 focus:outline-none  transition-all text-2xl"
          />

          <button
            type="submit"
            className="mt-4 w-full px-6 py-3 rounded-lg border-2 border-white text-white font-medium text-2xl  focus:outline-none focus:ring-2  focus:ring-offset-2 focus:ring-offset-black/30 transition-all"
          >
            Make A Wish!
          </button>
        </div>
      </form>

      <AnimatePresence>
        {wishes.map((wish) => (
          <FloatingWish key={wish.id} text={wish.text} />
        ))}
      </AnimatePresence>
    </BackgroundBeamsWithCollision>
  );
}
