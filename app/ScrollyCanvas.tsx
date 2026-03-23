'use client';

import { useRef, useEffect, useState } from 'react';
import { useScroll, useTransform } from 'framer-motion';

const ScrollyCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const frameCount = 75; // Total frames: 0 se 74 tak = 75 frames

  // Step 1: Sirf ek baar saari images ko preload karein
  useEffect(() => {
    const images: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      const frameStr = i.toString().padStart(2, '0');
      img.src = `/sequence/frame_${frameStr}_delay-0.066s.png`;
      img.onload = () => {
        loadedCount++;
        // Jab aakhri image bhi load ho jaye, tab state update karein
        if (loadedCount === frameCount) {
          imagesRef.current = images;
          setImagesLoaded(true);
        }
      };
      images.push(img);
    }
  }, []); // Empty array ka matlab hai ke yeh effect sirf ek baar chalega

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, frameCount - 1]);

  // Step 2: Jab images load ho jayein, tab canvas par drawing shuru karein
  useEffect(() => {
    if (!imagesLoaded || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (!context) return;

    let renderRequestId: number;

    const render = () => {
      const currentFrameIndex = Math.round(frameIndex.get());
      const img = imagesRef.current[currentFrameIndex];
      
      if (img) {
        const hRatio = canvas.width / img.width;
        const vRatio = canvas.height / img.height;
        const ratio = Math.max(hRatio, vRatio);
        const centerShift_x = (canvas.width - img.width * ratio) / 2;
        const centerShift_y = (canvas.height - img.height * ratio) / 2;

        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(
          img, 0, 0, img.width, img.height,
          centerShift_x, centerShift_y, img.width * ratio, img.height * ratio
        );
      }
      renderRequestId = 0;
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      if (!renderRequestId) {
        renderRequestId = requestAnimationFrame(render);
      }
    };

    const unsubscribeScroll = frameIndex.onChange(() => {
      if (!renderRequestId) {
        renderRequestId = requestAnimationFrame(render);
      }
    });
    
    window.addEventListener('resize', handleResize);
    
    // Initial render
    handleResize();

    return () => {
      unsubscribeScroll();
      window.removeEventListener('resize', handleResize);
      if (renderRequestId) {
        cancelAnimationFrame(renderRequestId);
      }
    };
  }, [imagesLoaded, frameIndex]); // Yeh effect tab chalega jab imagesLoaded true hoga

  return (
    // z-0 add kiya hai taake yeh Overlay ke neeche rahe
    <div ref={containerRef} className="h-[500vh] w-full relative z-0">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas ref={canvasRef} className="block w-full h-full" />
      </div>
    </div>
  );
};

export default ScrollyCanvas;