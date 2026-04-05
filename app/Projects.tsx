'use client';

import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

const projects = [
  {
    id: 1,
    title: "SaaS HRMS Portal",
    category: "Full-Stack SaaS Application",
    tech: ["MERN Stack", "JWT", "Cloudinary", "Nodemailer", "Multer"],
    features: [
      "Multi-company Isolated Environments",
      "Role-based Access (Owner, Admin, Employee)",
      "Attendance & Leave Management System",
      "Job Module with Resume Upload",
      "Real-time Notification System"
    ],
    image: "/projects/project1.png",
    liveDemo: "https://hrms-frontend-rosy-omega.vercel.app/",
    github: "https://github.com/Bilal-Raza-BR/HRMS-Frontend"
  },
  {
    id: 2,
    title: "Full-Stack E-Commerce",
    category: "MERN Stack Development",
    tech: ["React", "Node.js", "MongoDB", "Cloudinary", "Bcrypt.js"],
    features: [
      "Secure User & Admin Dashboards",
      "Product CRUD with Image Upload",
      "Order System with Unique Tracking",
      "Persistent Cart & Secure Checkout",
      "JWT Protected Private Routes"
    ],
    image: "/projects/project2.png",
    liveDemo: "https://e-commerce-frontend-seven-lyart.vercel.app/",
    github: "https://github.com/Bilal-Raza-BR/E-Commerce-frontend"
  },
  {
    id: 3,
    title: "Event Booking Platform",
    category: "Booking & Workflow System",
    tech: ["React", "Node.js", "Express.js", "MongoDB"],
    features: [
      "User Request Submission Workflow",
      "Admin Approval/Rejection System",
      "Real-time Appointment Tracking",
      "Secure Admin Authentication",
      "Personal Booking Status Check"
    ],
    image: "/projects/project3.png",
    liveDemo: "https://event-booking-frontend-zeta.vercel.app/",
    github: "https://github.com/Bilal-Raza-BR/Event-Booking-frontend"
  },
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
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 20 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const rotateX = useTransform(ySpring, [-0.5, 0.5], ['10deg', '-10deg']);
  const rotateY = useTransform(xSpring, [-0.5, 0.5], ['-10deg', '10deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setIsHovered(true);
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
    setIsHovered(false);
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
      className="relative h-[450px] rounded-2xl bg-zinc-900/50 border border-[#10b981]/20 shadow-2xl shadow-black/40 group"
    >
      <div style={{ transform: 'translateZ(60px)', transformStyle: 'preserve-3d' }} className="absolute inset-5 flex flex-col justify-between pointer-events-auto">
        <div className="relative h-1/2 w-full mb-4 overflow-hidden rounded-lg">
          <img src={project.image} alt={project.title} className="w-full h-full object-cover shadow-lg transition-transform duration-500 group-hover:scale-110" />
          
          {/* Features Overlay */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm p-4 flex flex-col justify-center"
              >
                <h4 className="text-[#10b981] text-xs font-bold uppercase mb-2">Key Features</h4>
                <ul className="space-y-1">
                  {project.features.map((feature, idx) => (
                    <li key={idx} className="text-white text-xs flex items-start gap-2">
                      <span className="text-[#10b981]">▹</span> {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div>
          <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{project.title}</h3>
          <p className="text-sm text-[#10b981] font-medium mb-3 uppercase tracking-wider">{project.category}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tech?.map((t, i) => (
              <span key={i} className="text-[10px] px-2 py-1 rounded-md bg-[#10b981]/10 text-[#10b981] border border-[#10b981]/20 font-medium">
                {t}
              </span>
            ))}
          </div>
        </div>
        <div className="flex gap-3 mt-auto relative z-50">
          <a
            href={project.liveDemo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center bg-gradient-to-r from-[#10b981] to-[#34d399] text-white font-bold px-4 py-2.5 rounded-xl text-sm hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-[#10b981]/20"
          >
            Live Demo
          </a>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center bg-white/5 border border-white/10 backdrop-blur-sm text-white px-4 py-2.5 rounded-xl text-sm hover:bg-white/10 hover:border-white/20 transition-all"
          >
            GitHub
          </a>
        </div>
      </div>
      
      {/* Hover glow effect background */}
      <div className="absolute inset-0 rounded-2xl bg-[#10b981]/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </motion.div>
  );
};

export default Projects;