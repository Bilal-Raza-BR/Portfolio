 'use client';

import { useTransform, motion, MotionValue } from 'framer-motion';

interface OverlayProps {
  scrollYProgress: MotionValue<number>;
}

const Overlay = ({ scrollYProgress }: OverlayProps) => {

  // Animations define kar rahe hain (Opacity aur Y-position)
  const opacity1 = useTransform(scrollYProgress, [0, 0.2, 0.3], [1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.3], [0, -50]);

  const opacity2 = useTransform(scrollYProgress, [0.2, 0.35, 0.5, 0.6], [0, 1, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.2, 0.6], [50, -50]);

  const opacity3 = useTransform(scrollYProgress, [0.5, 0.65, 0.8, 0.9], [0, 1, 1, 0]);
  const y3 = useTransform(scrollYProgress, [0.5, 0.9], [50, -50]);

  return (
    <div className="absolute top-0 left-0 w-full h-full z-30 pointer-events-none">
      {/* Section 1: Intro */}
      <div className="sticky top-0 h-screen flex items-center justify-center">
        <motion.div style={{ opacity: opacity1, y: y1 }} className="text-center px-4">
          <h1 className="text-5xl md:text-8xl font-bold text-white tracking-tighter">Muhammad Bilal Raza</h1>
          <p className="text-xl md:text-2xl text-white mt-4"> MERN Stack Developer.</p>
        </motion.div>
      </div>

      {/* Section 2: Left Aligned */}
      <div className="sticky top-0 h-screen flex items-center justify-start px-6 md:px-20">
        <motion.div style={{ opacity: opacity2, y: y2 }} className="max-w-lg">
          <h2 className="text-3xl md:text-6xl font-bold text-white leading-tight">
            I build scalable full-stack applications.
          </h2>
        </motion.div>
      </div>

      {/* Section 3: Right Aligned */}
      <div className="sticky top-0 h-screen flex items-center justify-end px-6 md:px-20">
        <motion.div style={{ opacity: opacity3, y: y3 }} className="max-w-lg text-right">
          <h2 className="text-3xl md:text-6xl font-bold text-white leading-tight">
            From robust APIs to dynamic UIs.
          </h2>
        </motion.div>
      </div>
    </div>
  );
};

export default Overlay;