'use client';

import React, { useEffect, useRef, useState } from 'react';
import { COMPANY_INFO } from '@/lib/constants';

interface Particle {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  size: number;
  color: string;
  speed: number;
  opacity: number;
  isWordmark: boolean;
  delay: number;
}

export default function PixelGridAssembly() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [assembled, setAssembled] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let mouseX = -1000;
    let mouseY = -1000;
    let touchActive = false;

    function setupCanvasDimensions() {
      if (!canvas || !containerRef.current) return;
      const isMobile = window.innerWidth < 640;
      
      // Calculate responsive display width strictly within parent bounds
      const parentWidth = containerRef.current.clientWidth || (window.innerWidth - 32);
      width = Math.max(260, Math.min(parentWidth, 900));
      height = isMobile ? 105 : 170;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = '100%';
      canvas.style.maxWidth = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx!.scale(dpr, dpr);
      initParticles();
    }

    function initParticles() {
      particles = [];
      const isMobile = width < 640;

      // Offscreen canvas for precise pixel sampling
      const offCanvas = document.createElement('canvas');
      offCanvas.width = width;
      offCanvas.height = height;
      const offCtx = offCanvas.getContext('2d');
      if (!offCtx) return;

      offCtx.fillStyle = '#000000';
      offCtx.textAlign = 'center';
      offCtx.textBaseline = 'middle';

      if (isMobile) {
        // Two-line layout for crystal-clear mobile rendering of website slogan
        const fontSize = Math.max(14, Math.min(20, Math.floor(width / 17)));
        offCtx.font = `900 ${fontSize}px Inter, -apple-system, sans-serif`;
        
        // Line 1: YOUR VISION,
        offCtx.fillText('YOUR VISION,', width / 2, height / 2 - fontSize * 0.65);
        // Line 2: OUR SOLUTION
        offCtx.fillText('OUR SOLUTION', width / 2, height / 2 + fontSize * 0.65);
      } else {
        // Single-line layout for desktop and tablet
        const fontSize = Math.max(18, Math.min(30, Math.floor(width / 24)));
        offCtx.font = `900 ${fontSize}px Inter, -apple-system, sans-serif`;
        offCtx.fillText('YOUR VISION · OUR SOLUTION', width / 2, height / 2);
      }

      const imgData = offCtx.getImageData(0, 0, width, height).data;
      const step = isMobile ? 4 : 4; // grid sample density

      for (let y = 0; y < height; y += step) {
        for (let x = 0; x < width; x += step) {
          const index = (y * width + x) * 4;
          const alpha = imgData[index + 3];

          if (alpha > 128) {
            // Scattered starting position with auto-write wave delay
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * (width * 0.35) + 30;
            const startX = width / 2 + Math.cos(angle) * distance;
            const startY = height / 2 + Math.sin(angle) * distance;

            const isAccent = Math.random() > 0.45;
            const color = isAccent 
              ? (Math.random() > 0.5 ? '#FF5500' : '#FF3366') 
              : '#1C1917';

            // Wave delay based on horizontal position (auto-writes from left to right)
            const normalizedX = x / width;
            const delay = normalizedX * 24 + Math.random() * 8;

            particles.push({
              x: startX,
              y: startY,
              targetX: x,
              targetY: y,
              size: isMobile ? 2.5 : 3.2,
              color,
              speed: 0.06 + Math.random() * 0.04,
              opacity: 0,
              isWordmark: true,
              delay,
            });
          }
        }
      }

      // Ambient background floating grid dots
      const ambientCount = isMobile ? 10 : 22;
      for (let i = 0; i < ambientCount; i++) {
        const tx = Math.random() * width;
        const ty = Math.random() * height;
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          targetX: tx,
          targetY: ty,
          size: 1.6,
          color: '#EBE8E1',
          speed: 0.015,
          opacity: 0.35,
          isWordmark: false,
          delay: 0,
        });
      }
    }

    // Handle mouse events
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    // Handle touch events on mobile screens
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        touchActive = true;
        const rect = canvas.getBoundingClientRect();
        mouseX = e.touches[0].clientX - rect.left;
        mouseY = e.touches[0].clientY - rect.top;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        mouseX = e.touches[0].clientX - rect.left;
        mouseY = e.touches[0].clientY - rect.top;
      }
    };

    const handleTouchEnd = () => {
      touchActive = false;
      setTimeout(() => {
        mouseX = -1000;
        mouseY = -1000;
      }, 300);
    };

    // Resize listener
    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        setupCanvasDimensions();
      }, 150);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    canvas.addEventListener('touchstart', handleTouchStart, { passive: true });
    canvas.addEventListener('touchmove', handleTouchMove, { passive: true });
    canvas.addEventListener('touchend', handleTouchEnd, { passive: true });

    setupCanvasDimensions();

    let frameCount = 0;
    const context = ctx;

    function render() {
      if (!context) return;
      context.clearRect(0, 0, width, height);
      frameCount++;

      let allSettled = true;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (frameCount > p.delay) {
          // Smooth physics spring towards target position
          const dx = p.targetX - p.x;
          const dy = p.targetY - p.y;
          p.x += dx * p.speed;
          p.y += dy * p.speed;

          if (p.opacity < 0.95) {
            p.opacity += 0.05;
          }

          if (Math.abs(dx) > 0.8 || Math.abs(dy) > 0.8) {
            allSettled = false;
          }
        }

        // Interactive displacement from mouse or touch cursor
        let renderX = p.x;
        let renderY = p.y;
        const distToCursor = Math.hypot(p.x - mouseX, p.y - mouseY);
        const repelRadius = width < 640 ? 38 : 55;

        if (distToCursor < repelRadius) {
          const repelAngle = Math.atan2(p.y - mouseY, p.x - mouseX);
          const force = (repelRadius - distToCursor) / repelRadius;
          renderX += Math.cos(repelAngle) * force * (width < 640 ? 12 : 20);
          renderY += Math.sin(repelAngle) * force * (width < 640 ? 12 : 20);
        }

        // Render pixel block
        if (p.opacity > 0.01) {
          context.fillStyle = p.color;
          context.globalAlpha = p.opacity;

          context.beginPath();
          if (context.roundRect) {
            context.roundRect(renderX - p.size / 2, renderY - p.size / 2, p.size, p.size, 1);
          } else {
            context.rect(renderX - p.size / 2, renderY - p.size / 2, p.size, p.size);
          }
          context.fill();
        }
      }

      if (allSettled && !assembled) {
        setAssembled(true);
      }

      animationFrameId = requestAnimationFrame(render);
    }

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
      if (canvas) {
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseleave', handleMouseLeave);
        canvas.removeEventListener('touchstart', handleTouchStart);
        canvas.removeEventListener('touchmove', handleTouchMove);
        canvas.removeEventListener('touchend', handleTouchEnd);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full max-w-full flex flex-col items-center justify-center my-1 sm:my-3 select-none overflow-hidden">
      <div className="w-full max-w-full relative overflow-hidden rounded-2xl bg-[#F4F1EA]/70 border border-[#EBE8E1] p-2 sm:p-4 shadow-inner">
        <div className="flex items-center justify-between gap-2 mb-1 z-10 px-1">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#FF5500] animate-pulse" />
            <span className="text-[10px] font-mono tracking-wider text-[#78716C] uppercase font-bold">
              Signature Pixel Slogan Engine
            </span>
          </div>
          <span className="text-[9px] font-mono text-[#A8A29E] hidden sm:inline">
            Interactive · Touch &amp; Hover
          </span>
        </div>
        <canvas
          ref={canvasRef}
          className="w-full max-w-full cursor-crosshair block touch-none"
          title="Interactive Pixel Grid - Move cursor or touch to interact"
        />
      </div>
    </div>
  );
}
