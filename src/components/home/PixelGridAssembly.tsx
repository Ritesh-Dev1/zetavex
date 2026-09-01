'use client';

import React, { useEffect, useRef, useState } from 'react';

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
}

export default function PixelGridAssembly() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [assembled, setAssembled] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = 240);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = Math.min(260, Math.max(180, width * 0.28));
      initParticles();
    };

    window.addEventListener('resize', handleResize);

    const particles: Particle[] = [];
    const colors = ['#FF5500', '#FF3366', '#FF8C00', '#1C1917', '#38BDF8', '#10B981'];

    function initParticles() {
      particles.length = 0;
      const text = 'INNOVATE · DEVELOP · DELIVER';

      // Temporary offscreen canvas to sample text pixel positions
      const offCanvas = document.createElement('canvas');
      offCanvas.width = width;
      offCanvas.height = height;
      const offCtx = offCanvas.getContext('2d');
      if (!offCtx) return;

      const fontSize = Math.max(16, Math.min(38, width / 20));
      offCtx.font = `900 ${fontSize}px Inter, sans-serif`;
      offCtx.fillStyle = '#FF5500';
      offCtx.textAlign = 'center';
      offCtx.textBaseline = 'middle';
      offCtx.fillText(text, width / 2, height / 2);

      const imgData = offCtx.getImageData(0, 0, width, height).data;
      const step = width < 640 ? 5 : 4; // grid sample gap

      for (let y = 0; y < height; y += step) {
        for (let x = 0; x < width; x += step) {
          const index = (y * width + x) * 4;
          const alpha = imgData[index + 3];

          if (alpha > 128) {
            // Scattered starting position
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * (width * 0.6) + 100;
            const startX = width / 2 + Math.cos(angle) * distance;
            const startY = height / 2 + Math.sin(angle) * distance;

            const isAccent = Math.random() > 0.6;
            const color = isAccent 
              ? (Math.random() > 0.5 ? '#FF5500' : '#FF3366') 
              : '#1C1917';

            particles.push({
              x: startX,
              y: startY,
              targetX: x,
              targetY: y,
              size: step - 1.2,
              color,
              speed: 0.04 + Math.random() * 0.05,
              opacity: 0.1,
              isWordmark: true,
            });
          }
        }
      }

      // Add a few floating ambient background grid points
      const ambientCount = 35;
      for (let i = 0; i < ambientCount; i++) {
        const tx = Math.random() * width;
        const ty = Math.random() * height;
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          targetX: tx,
          targetY: ty,
          size: 2.5,
          color: '#DCD8CF',
          speed: 0.02,
          opacity: 0.4,
          isWordmark: false,
        });
      }
    }

    initParticles();

    let mouseX = -1000;
    let mouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    const context = ctx;
    let progress = 0;
    function render() {
      if (!context) return;
      context.clearRect(0, 0, width, height);
      progress += 0.01;

      let allSettled = true;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Smooth ease-in-out towards target grid location
        const dx = p.targetX - p.x;
        const dy = p.targetY - p.y;
        p.x += dx * p.speed;
        p.y += dy * p.speed;

        if (p.opacity < 0.95) {
          p.opacity += 0.03;
        }

        if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
          allSettled = false;
        }

        // Mouse displacement effect
        const distToMouse = Math.hypot(p.x - mouseX, p.y - mouseY);
        let renderX = p.x;
        let renderY = p.y;
        if (distToMouse < 60) {
          const repelAngle = Math.atan2(p.y - mouseY, p.x - mouseX);
          const force = (60 - distToMouse) / 60;
          renderX += Math.cos(repelAngle) * force * 20;
          renderY += Math.sin(repelAngle) * force * 20;
        }

        context.fillStyle = p.color;
        context.globalAlpha = p.opacity;

        // Draw pixel rounded square
        context.beginPath();
        if (context.roundRect) {
          context.roundRect(renderX - p.size / 2, renderY - p.size / 2, p.size, p.size, 1);
        } else {
          context.rect(renderX - p.size / 2, renderY - p.size / 2, p.size, p.size);
        }
        context.fill();
      }

      if (allSettled && !assembled) {
        setAssembled(true);
      }

      animationFrameId = requestAnimationFrame(render);
    }

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative w-full flex flex-col items-center justify-center my-2 select-none">
      <div className="w-full max-w-4xl relative overflow-hidden rounded-2xl bg-[#F4F1EA]/60 border border-[#EBE8E1] p-3 shadow-inner">
        <div className="absolute top-2 left-3 flex items-center gap-1.5 z-10">
          <span className="w-2 h-2 rounded-full bg-[#FF5500] animate-pulse" />
          <span className="text-[10px] font-mono tracking-widest text-[#78716C] uppercase">
            Signature Pixel Grid Assembly Engine
          </span>
        </div>
        <canvas
          ref={canvasRef}
          className="w-full cursor-crosshair block"
          title="Interactive Pixel Grid - Move cursor over wordmark"
        />
      </div>
    </div>
  );
}
