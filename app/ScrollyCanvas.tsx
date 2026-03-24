'use client';

import { useRef, useEffect } from 'react';
import { MotionValue } from 'framer-motion';

interface ScrollyCanvasProps {
  images: HTMLImageElement[];
  frameIndex: MotionValue<number>;
}

const ScrollyCanvas = ({ images, frameIndex }: ScrollyCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!images.length || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (!context) return;

    let renderRequestId: number;

    const render = () => {
      const currentFrameIndex = Math.round(frameIndex.get());
      const img = images[currentFrameIndex];
      
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
      // Mobile fix: Agar width same hai (sirf address bar aane/jane se height badli hai), 
      // to resize mat karo. Is se zoom in/out effect ruk jayega.
      if (window.innerWidth === canvas.width) return;

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
  }, [images, frameIndex]);

  return (
    <div className="sticky top-0 h-screen w-full overflow-hidden z-0">
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
};

export default ScrollyCanvas;