'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

const projects = [
  { id: 1, title: "E-Commerce Website", category: "MERN Stack (JWT, NodeMailer)", image: "/projects/project1.jpg" },
  { id: 2, title: "Event Booking System", category: "MERN Stack (Admin Panel)", image: "/projects/project2.jpg" },
  { id: 3, title: "Blog Application", category: "React.js & Firebase", image: "/projects/project3.jpg" },
];

const useIsMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    // Ensure this runs only on the client
    const mediaQuery = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const handleResize = () => setIsMobile(mediaQuery.matches);
    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoint]);
  return isMobile;
};

const Projects = () => {
  return (
    <section id="projects" className="relative w-full bg-black py-32 px-6 md:px-12 z-20">
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-white mb-16 text-center"
        >
          Selected Works
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ProjectCard = ({ project }: { project: typeof projects[0] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 20 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const rotateX = useTransform(ySpring, [-0.5, 0.5], ['10deg', '-10deg']);
  const rotateY = useTransform(xSpring, [-0.5, 0.5], ['-10deg', '10deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (isMobile || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: isMobile ? 0 : rotateX,
        rotateY: isMobile ? 0 : rotateY,
        transformStyle: 'preserve-3d'
      }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="relative h-[450px] rounded-2xl bg-gradient-to-br from-[#0f2a44]/50 to-[#0b1320]/50 border border-[#ff6a00]/20 shadow-2xl shadow-black/40"
    >
      <div style={{ transform: 'translateZ(50px)', transformStyle: 'preserve-3d' }} className="absolute inset-5 flex flex-col justify-between">
        <img src={project.image} alt={project.title} className="rounded-lg h-1/2 w-full object-cover shadow-lg" />
        <div>
          <h3 className="text-xl md:text-2xl font-bold text-white mb-1">{project.title}</h3>
          <p className="text-gray-400">{project.category}</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-[#ff6a00]/10 border border-[#ff6a00]/30 backdrop-blur-sm text-[#ff6a00] px-4 py-2 rounded-lg text-sm hover:bg-[#ff6a00]/20 transition-colors">Live Demo</button>
          <button className="bg-[#0f2a44]/50 border border-[#0ea5e9]/30 backdrop-blur-sm text-[#0ea5e9] px-4 py-2 rounded-lg text-sm hover:bg-[#0f2a44] transition-colors">GitHub</button>
        </div>
      </div>
    </motion.div>
  );
};

export default Projects;