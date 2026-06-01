"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface FlickeringGridProps {
  squareSize?: number;
  gridGap?: number;
  flickerChance?: number;
  color?: string;
  maxOpacity?: number;
  className?: string;
}

export function FlickeringGrid({
  squareSize = 4,
  gridGap = 6,
  flickerChance = 0.3,
  color = "oklch(0.75 0.15 180)",
  maxOpacity = 0.2,
  className,
}: FlickeringGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Resolve any CSS color string → [r, g, b] via the browser's CSS engine
    const resolveRGB = (str: string): [number, number, number] => {
      const el = document.createElement("div");
      el.style.cssText = `color:${str};position:absolute;visibility:hidden`;
      document.body.appendChild(el);
      const computed = getComputedStyle(el).color;
      document.body.removeChild(el);
      const m = computed.match(/\d+/g);
      return m ? [+m[0], +m[1], +m[2]] : [0, 200, 185];
    };

    const [r, g, b] = resolveRGB(color);

    type Sq = { x: number; y: number; o: number; t: number };
    let squares: Sq[] = [];
    let raf: number;

    const init = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      squares = [];
      const cols = Math.ceil(canvas.width  / (squareSize + gridGap));
      const rows = Math.ceil(canvas.height / (squareSize + gridGap));
      for (let c = 0; c < cols; c++) {
        for (let row = 0; row < rows; row++) {
          const o = Math.random() * maxOpacity;
          squares.push({ x: c * (squareSize + gridGap), y: row * (squareSize + gridGap), o, t: o });
        }
      }
    };

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const sq of squares) {
        if (Math.random() < flickerChance / 60) sq.t = Math.random() * maxOpacity;
        sq.o += (sq.t - sq.o) * 0.12;
        ctx.fillStyle = `rgba(${r},${g},${b},${sq.o.toFixed(3)})`;
        ctx.fillRect(sq.x, sq.y, squareSize, squareSize);
      }
      raf = requestAnimationFrame(tick);
    };

    const ro = new ResizeObserver(init);
    ro.observe(canvas);
    init();
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [squareSize, gridGap, flickerChance, color, maxOpacity]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn("absolute inset-0 w-full h-full pointer-events-none", className)}
    />
  );
}
