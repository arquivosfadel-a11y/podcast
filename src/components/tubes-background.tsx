"use client";

import { useEffect, useRef } from "react";

type Props = {
  initialColors?: string[];
  lightColors?: string[];
  lightIntensity?: number;
  enableRandomizeOnClick?: boolean;
};

export function TubesBackground({
  initialColors = ["#7c3aed", "#f97316", "#1e40af"],
  lightColors   = ["#a855f7", "#fb923c", "#ff008a", "#60aed5"],
  lightIntensity = 180,
  enableRandomizeOnClick = false,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const appRef    = useRef<any>(null);

  useEffect(() => {
    let removeClick: (() => void) | null = null;
    let destroyed = false;

    (async () => {
      const mod = await import(
        /* webpackIgnore: true */
        "https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js"
      );
      const TubesCursorCtor = (mod as any).default ?? mod;

      if (!canvasRef.current || destroyed) return;

      const app = TubesCursorCtor(canvasRef.current, {
        tubes: {
          colors: initialColors,
          lights: {
            intensity: lightIntensity,
            colors: lightColors,
          },
        },
      });

      appRef.current = app;

      if (enableRandomizeOnClick) {
        const randomColors = (count: number) =>
          Array.from({ length: count }, () =>
            "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0")
          );

        const handler = () => {
          app.tubes.setColors(randomColors(initialColors.length));
          app.tubes.setLightsColors(randomColors(lightColors.length));
        };
        document.body.addEventListener("click", handler);
        removeClick = () => document.body.removeEventListener("click", handler);
      }
    })();

    return () => {
      destroyed = true;
      if (removeClick) removeClick();
      try {
        appRef.current?.dispose?.();
        appRef.current = null;
      } catch {}
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
    />
  );
}
