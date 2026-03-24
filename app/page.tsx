'use client';

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import ScrollyCanvas from "./ScrollyCanvas";
import Overlay from "./Overlay";
import Scene from "./Scene";
import Navbar from "./Navbar";
import Loader from "./Loader";
import { useScroll, useTransform } from "framer-motion";

const About = dynamic(() => import("./About"));
const Projects = dynamic(() => import("./Projects"));
const Skills = dynamic(() => import("./Skills"));
const Education = dynamic(() => import("./Education"));
const Certificates = dynamic(() => import("./Certificates"));
const Contact = dynamic(() => import("./Contact"));
const Footer = dynamic(() => import("./Footer"));

const frameCount = 75;

export default function Home() {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const images: HTMLImageElement[] = [];
    let loadedCount = 0;

    const handleLoad = () => {
      loadedCount++;
      if (loadedCount === frameCount) {
        imagesRef.current = images;
        setImagesLoaded(true);
      }
    };

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      const frameStr = i.toString().padStart(2, '0');
      img.src = `/sequence/frame_${frameStr}_delay-0.066s.png`;
      img.onload = handleLoad;
      img.onerror = handleLoad; // Prevent hanging on network error
      images.push(img);
    }
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, frameCount - 1]);

  return (
    <main className="min-h-screen">
      {!imagesLoaded && <Loader />}
      <Navbar />
      <Scene />
      <div ref={containerRef} className="relative h-[500vh]">
        <ScrollyCanvas images={imagesRef.current} frameIndex={frameIndex} />
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
