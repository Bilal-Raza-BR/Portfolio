'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

const About = () => {
  return (
    <section id="about" className="relative w-full bg-black py-20 md:py-32 px-6 md:px-12 z-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <h2 className="text-sm font-bold tracking-widest text-[#0ea5e9] uppercase mb-3">About Me</h2>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Muhammad Bilal Raza
          </h1>
          <h3 className="text-2xl md:text-3xl font-medium text-[#0ea5e9] mb-6">MERN Stack Developer</h3>
          
          <p className="text-gray-400 leading-relaxed text-lg mb-8">
            Dedicated and enthusiastic web developer with hands-on experience in building real-world projects using the MERN stack. Currently pursuing intermediate education while actively applying and expanding technical skills through self-driven development work. Known for a strong work ethic, quick learning, and the ability to adapt to new technologies. Committed to delivering high-quality solutions and collaborating effectively within team environments.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="flex flex-col items-start md:items-end"
        >
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="#contact" passHref>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0px 0px 25px rgba(255, 106, 0, 0.5)" }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-[#ff6a00] to-[#ff8c32] text-white font-bold py-4 px-10 rounded-full transition-all shadow-[0_0_20px_rgba(255,106,0,0.2)]"
              >
                Hire Me
              </motion.button>
            </Link>
            <a href="/Bilal-Raza.pdf" download="Bilal-Raza.pdf" className="block">
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "rgba(14, 165, 233, 0.1)" }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-transparent border border-[#0ea5e9]/30 text-[#0ea5e9] font-bold py-4 px-10 rounded-full transition-all backdrop-blur-sm"
              >
                Download Resume
              </motion.button>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;