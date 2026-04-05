'use client';

import { motion } from "framer-motion";

const Loader = () => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black overflow-hidden">

      {/* Background Glow */}
      <div className="absolute w-[400px] h-[400px] bg-emerald-500/20 blur-[120px] rounded-full"></div>

      <div className="flex flex-col items-center gap-8">

        {/* Text Reveal */}
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="text-3xl md:text-5xl font-bold tracking-widest text-white"
          >
            BILAL RAZA
          </motion.h1>
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="text-sm tracking-[0.4em] text-gray-400 uppercase"
        >
          Creative Developer
        </motion.p>

        {/* Animated Line */}
        <div className="relative w-[220px] h-[2px] bg-gray-800 overflow-hidden rounded-full">
          <motion.div
            className="absolute top-0 left-0 h-full w-[40%] bg-emerald-400"
            animate={{ x: ["-100%", "250%"] }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

      </div>
    </div>
  );
};

export default Loader;