'use client';

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import VideoScroll from "./VideoScroll";
import Overlay from "./Overlay";
import Scene from "./Scene";
import Navbar from "./Navbar";
import Loader from "./Loader";
import { useScroll } from "framer-motion";

const About = dynamic(() => import("./About"));
const Projects = dynamic(() => import("./Projects"));
const Skills = dynamic(() => import("./Skills"));
const Education = dynamic(() => import("./Education"));
const Certificates = dynamic(() => import("./Certificates"));
const Contact = dynamic(() => import("./Contact"));
const Footer = dynamic(() => import("./Footer"));

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  return (
    <main className="min-h-screen relative">
      {!isLoaded && <Loader />}
      <Navbar />
      <Scene />
      <div ref={containerRef} className="relative h-[500vh]">
        <VideoScroll scrollYProgress={scrollYProgress} setLoaded={setIsLoaded} />
        <Overlay scrollYProgress={scrollYProgress} />
      </div>
      <div className="relative overflow-x-hidden">
        <About />
        <Skills />
        <Education />
        <Certificates />
        <Projects />
        <Contact />
      </div>
      <Footer />
    </main>
  );
}
