'use client';

import { useRef, useEffect, useCallback } from 'react';
import { MotionValue, useMotionValueEvent } from 'framer-motion';

interface VideoScrollProps {
  scrollYProgress: MotionValue<number>;
  setLoaded: (loaded: boolean) => void;
}

const VideoScroll = ({ scrollYProgress, setLoaded }: VideoScrollProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Scroll position change hone par video ka time update karein
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const video = videoRef.current;
    if (video && video.duration) {
      // Latest progress (0 to 1) ko video duration se multiply karein
      video.currentTime = latest * (video.duration - 0.01);
    }
  });

  // Decoder ko scrub karne k liye ready karne ka tareeqa
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().then(() => {
        videoRef.current?.pause();
      }).catch(() => {});
    }
  }, []);

  // Agar video pehle se load ho chuki ho (cache), to manual check
  useEffect(() => {
    if (videoRef.current && videoRef.current.readyState >= 1) {
      setLoaded(true);
    }
  }, [setLoaded]);

  const handleLoad = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = scrollYProgress.get() * (videoRef.current.duration - 0.01);
      setLoaded(true);
    }
  }, [scrollYProgress, setLoaded]);

  return (
    <div className="sticky top-0 h-screen w-full overflow-hidden z-0 bg-black">
      <video
        ref={videoRef}
        src="/video/hero.mp4" // Folder name update
        muted
        playsInline
        preload="auto"
        onLoadedMetadata={handleLoad}
        onError={() => {
          console.error("Video failed to load at /video/hero.mp4");
          setLoaded(true); // Error par bhi loader hata dein taake site dikhe
        }}
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default VideoScroll;