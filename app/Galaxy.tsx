'use client';

import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  radius: number;
  baseOpacity: number;
  twinkleSpeed: number;
  twinklePhase: number;
  layer: number; // 0 = far/slow, 1 = mid, 2 = near/fast (parallax depth)
}

type FloaterType = 'ship';

interface Floater {
  type: FloaterType;
  x: number;
  y: number;
  vx: number;
  vy: number;
  scale: number;
  rotation: number;
  rotationSpeed: number;
  bobPhase: number;
}

const LAYER_SPEEDS = [0.02, 0.05, 0.1]; // parallax multiplier per layer

const spawnFloater = (type: FloaterType, width: number, height: number): Floater => {
  const fromLeft = Math.random() > 0.5;
  const speed = Math.random() * 0.2 + 0.08;
  return {
    type,
    x: fromLeft ? -80 : width + 80,
    y: Math.random() * height * 0.85 + height * 0.05,
    vx: fromLeft ? speed : -speed,
    vy: (Math.random() - 0.5) * 0.03,
    scale: Math.random() * 0.5 + 0.55,
    rotation: (Math.random() - 0.5) * 0.4,
    rotationSpeed: (Math.random() - 0.5) * 0.0008,
    bobPhase: Math.random() * Math.PI * 2,
  };
};

const drawShip = (ctx: CanvasRenderingContext2D, s: number, facing: 1 | -1) => {
  ctx.save();
  ctx.scale(facing, 1);

  const trail = ctx.createLinearGradient(-30 * s, 0, -8 * s, 0);
  trail.addColorStop(0, 'rgba(16, 185, 129, 0)');
  trail.addColorStop(1, 'rgba(120, 200, 255, 0.5)');
  ctx.fillStyle = trail;
  ctx.beginPath();
  ctx.moveTo(-8 * s, -3 * s);
  ctx.lineTo(-30 * s, 0);
  ctx.lineTo(-8 * s, 3 * s);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = 'rgba(210, 218, 226, 0.8)';
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
  ctx.lineWidth = 1 * s;
  ctx.beginPath();
  ctx.moveTo(14 * s, 0);
  ctx.lineTo(-6 * s, -5 * s);
  ctx.lineTo(-8 * s, -2.5 * s);
  ctx.lineTo(-8 * s, 2.5 * s);
  ctx.lineTo(-6 * s, 5 * s);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = 'rgba(160, 175, 190, 0.7)';
  ctx.beginPath();
  ctx.moveTo(-4 * s, -3 * s);
  ctx.lineTo(-10 * s, -9 * s);
  ctx.lineTo(-6 * s, -3 * s);
  ctx.closePath();
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(-4 * s, 3 * s);
  ctx.lineTo(-10 * s, 9 * s);
  ctx.lineTo(-6 * s, 3 * s);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = 'rgba(120, 200, 255, 0.7)';
  ctx.beginPath();
  ctx.arc(6 * s, 0, 2.2 * s, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
};

const Galaxy = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const floatersRef = useRef<Floater[]>([]);
  const scrollRef = useRef(0);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const buildStars = (width: number, height: number) => {
      const fieldHeight = height * 4;
      const density = 0.00012;
      const count = Math.floor(width * fieldHeight * density);
      const stars: Star[] = [];
      for (let i = 0; i < count; i++) {
        const layer = Math.floor(Math.random() * LAYER_SPEEDS.length);
        stars.push({
          x: Math.random() * width,
          y: Math.random() * fieldHeight,
          radius: layer === 2 ? Math.random() * 1.8 + 0.9 : layer === 1 ? Math.random() * 1.3 + 0.6 : Math.random() * 0.9 + 0.35,
          baseOpacity: Math.random() * 0.5 + 0.55,
          twinkleSpeed: Math.random() * 0.02 + 0.005,
          twinklePhase: Math.random() * Math.PI * 2,
          layer,
        });
      }
      starsRef.current = stars;
    };

    const SHIP_COUNT = 13;

    const buildFloaters = (width: number, height: number) => {
      const ships: Floater[] = [];
      for (let i = 0; i < SHIP_COUNT; i++) {
        const f = spawnFloater('ship', width, height);
        // stagger initial x so they don't all enter from the edge at once
        f.x = Math.random() * (width + 160) - 80;
        ships.push(f);
      }
      floatersRef.current = ships;
    };

    const resize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildStars(width, height);
      if (floatersRef.current.length === 0) buildFloaters(width, height);
    };

    const onScroll = () => {
      scrollRef.current = window.scrollY;
    };

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };

    let t = 0;
    const draw = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      ctx.clearRect(0, 0, width, height);

      const gx = width * 0.5 + Math.sin(t * 0.0002) * width * 0.2;
      const gy = height * 0.4 + Math.cos(t * 0.00015) * height * 0.15;
      const nebula = ctx.createRadialGradient(gx, gy, 0, gx, gy, Math.max(width, height) * 0.6);
      nebula.addColorStop(0, 'rgba(16, 185, 129, 0.06)');
      nebula.addColorStop(0.5, 'rgba(16, 185, 129, 0.02)');
      nebula.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = nebula;
      ctx.fillRect(0, 0, width, height);

      const stars = starsRef.current;
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        const parallaxY = (s.y - scrollRef.current * LAYER_SPEEDS[s.layer]) % (height * 4);
        const wrappedY = ((parallaxY % (height * 4)) + height * 4) % (height * 4);
        if (wrappedY > height + 20) continue;

        const twinkle = Math.sin(t * s.twinkleSpeed + s.twinklePhase) * 0.35 + 0.65;
        const opacity = s.baseOpacity * twinkle;

        ctx.beginPath();
        ctx.arc(s.x, wrappedY, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity.toFixed(3)})`;
        ctx.fill();
      }

      const REPEL_RADIUS = 160;
      const REPEL_STRENGTH = 3.2;
      const mouse = mouseRef.current;

      const floaters = floatersRef.current;
      for (let i = 0; i < floaters.length; i++) {
        const f = floaters[i];
        f.x += f.vx;
        f.y += f.vy + Math.sin(t * 0.01 + f.bobPhase) * 0.05;
        f.rotation += f.rotationSpeed;

        // flee from the cursor when it gets close
        const dx = f.x - mouse.x;
        const dy = f.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < REPEL_RADIUS) {
          const force = ((REPEL_RADIUS - dist) / REPEL_RADIUS) * REPEL_STRENGTH;
          const nx = dist === 0 ? 1 : dx / dist;
          const ny = dist === 0 ? 0 : dy / dist;
          f.x += nx * force;
          f.y += ny * force;
        }

        if (f.x < -100 || f.x > width + 100) {
          floaters[i] = spawnFloater(f.type, width, height);
          continue;
        }
        if (f.y < -60) f.y = -60;
        if (f.y > height + 60) f.y = height + 60;

        ctx.save();
        ctx.translate(f.x, f.y);
        ctx.rotate(f.rotation);
        ctx.shadowColor = 'rgba(255,255,255,0.25)';
        ctx.shadowBlur = 6;

        drawShip(ctx, f.scale, f.vx > 0 ? 1 : -1);

        ctx.restore();
      }

      t += 1;
      rafRef.current = requestAnimationFrame(draw);
    };

    resize();
    scrollRef.current = window.scrollY;
    window.addEventListener('resize', resize);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseleave', onMouseLeave);
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-screen -z-10 pointer-events-none bg-[#03040a]"
      aria-hidden="true"
    />
  );
};

export default Galaxy;