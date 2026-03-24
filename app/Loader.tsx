'use client';

import { motion } from "framer-motion";

const Loader = () => {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black text-white">
      <motion.div
        className="w-20 h-20 border-4 border-opacity-20 border-[#ff6a00] border-t-[#ff6a00] rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        className="mt-6 text-[#ff6a00] font-mono text-sm tracking-[0.2em] uppercase font-bold"
      >
        Loading Experience...
      </motion.div>
    </div>
  );
};

export default Loader;