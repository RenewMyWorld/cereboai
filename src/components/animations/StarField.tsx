import React, { useEffect, useRef } from 'react';

const StarField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const stars: Star[] = [];
    const numStars = 200;

    class Star {
      x: number;
      y: number;
      z: number;
      xPrev: number;
      yPrev: number;

      constructor() {
        this.x = (Math.random() - 0.5) * canvas.width;
        this.y = (Math.random() - 0.5) * canvas.height;
        this.z = Math.random() * canvas.width;
        this.xPrev = this.x;
        this.yPrev = this.y;
      }

      update() {
        this.xPrev = this.x;
        this.yPrev = this.y;
        this.z -= 0.5;
        
        if (this.z <= 0) {
          this.z = canvas.width;
          this.x = (Math.random() - 0.5) * canvas.width;
          this.y = (Math.random() - 0.5) * canvas.height;
          this.xPrev = this.x;
          this.yPrev = this.y;
        }

        const sx = (this.x / this.z) * canvas.width;
        const sy = (this.y / this.z) * canvas.height;
        
        this.x = sx;
        this.y = sy;
      }

      draw() {
        const sx = this.x + canvas.width / 2;
        const sy = this.y + canvas.height / 2;
        const r = (1 - this.z / canvas.width) * 2;
        
        ctx!.beginPath();
        ctx!.strokeStyle = `rgba(255, 255, 255, ${1 - this.z / canvas.width})`;
        ctx!.lineWidth = r;
        ctx!.moveTo(this.xPrev + canvas.width / 2, this.yPrev + canvas.height / 2);
        ctx!.lineTo(sx, sy);
        ctx!.stroke();
      }
    }

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    for (let i = 0; i < numStars; i++) {
      stars.push(new Star());
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      stars.forEach(star => {
        star.update();
        star.draw();
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none opacity-40"
    />
  );
};

export default StarField;