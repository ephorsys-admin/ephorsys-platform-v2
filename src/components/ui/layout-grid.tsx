"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

type Card = {
  id: number;
  content: React.ReactNode;
  className: string;
  thumbnail: string;
};

export const LayoutGrid = ({ cards }: { cards: Card[] }) => {
  const [selected, setSelected] = useState<Card | null>(null);

  const handleClick = (card: Card) => {
    setSelected(card);
  };

  const handleOutsideClick = () => {
    setSelected(null);
  };

  return (
    <div className="w-full h-full px-4 md:px-10 py-4 grid grid-cols-1 md:grid-cols-3 max-w-7xl mx-auto gap-4 relative">
      {cards.map((card, i) => (
        <div key={i} className={cn(card.className, "min-h-55 md:min-h-65")}>
          <div
            onClick={() => handleClick(card)}
            className="relative overflow-hidden rounded-xl cursor-pointer h-full w-full group"
          >
            <img
              src={card.thumbnail}
              height="500"
              width="500"
              className="object-cover object-center absolute inset-0 h-full w-full transition duration-300 group-hover:scale-105"
              alt="thumbnail"
            />
          </div>
        </div>
      ))}

      {/* Modal Overlay */}
      <AnimatePresence>
        {selected && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={handleOutsideClick}
              className="fixed inset-0 bg-black z-40 cursor-pointer"
            />

            {/* Modal Card */}
            <motion.div
              key="modal"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="fixed inset-0 z-50 flex items-start justify-center px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 pt-35 md:pt-30 lg:pt-28 pb-6"
              onClick={handleOutsideClick}
            >
              <div
                className="relative w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl rounded-2xl overflow-hidden shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={selected.thumbnail}
                  className="w-full h-auto max-h-[70vh] md:max-h-[60vh] lg:max-h-[70vh] object-cover object-center"
                  alt="selected"
                />
                {/* Content overlay at bottom */}
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6">
                  {selected.content}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};