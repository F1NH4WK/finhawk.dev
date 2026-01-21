"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
  
interface BreathingShapesProps {
  parallaxRef?: React.RefObject<HTMLDivElement>; 
}

export default function BreathingShapes({ parallaxRef }: BreathingShapesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const items = new Array(15).fill(null);

  useGSAP(() => {
    const shapes = gsap.utils.toArray(".geo-shape");

    const animateShape = (el: gsap.TweenTarget) => {
      if (!el) return;

      gsap.set(el, {
        xPercent: -50, 
        yPercent: -50,
        left: gsap.utils.random(10, 90) + "%",
        top: gsap.utils.random(10, 90) + "%",
        scale: 0,
        opacity: 0,
        rotation: gsap.utils.random(-180, 180)
      });

      const tl = gsap.timeline({
        onComplete: () => animateShape(el) 
      });

      tl.to(el, {
        scale: gsap.utils.random(0.5, 1.5),
        opacity: gsap.utils.random(0.1, 0.4),
        duration: 1.5,
        ease: "back.out(1.7)"
      });

      tl.to(el, {
        rotation: `+=${gsap.utils.random(-45, 45)}`,
        scale: "+=0.2",
        duration: gsap.utils.random(3, 5),
        yoyo: true,
        repeat: 1,
        ease: "sine.inOut"
      });

      tl.to(el, {
        scale: 0,
        opacity: 0,
        duration: 0.8,
        ease: "power2.in"
      });
    };

    shapes.forEach((shape, i) => {
      gsap.delayedCall(i * 0.5, () => animateShape(shape as gsap.TweenTarget));
    });

  }, { scope: containerRef });
  const getShape = (i: number) => {
    const style = "stroke-white/30 stroke-[1.5px] fill-none vector-effect-non-scaling-stroke";
    const type = i % 4;
    
    if (type === 0) return <circle cx="50" cy="50" r="45" className={style} />;
    if (type === 1) return <polygon points="50,5 95,95 5,95" className={style} />;
    if (type === 2) return <rect x="15" y="15" width="70" height="70" className={style} />;
    if (type === 3) return (
      <g className={style}>
        <line x1="10" y1="10" x2="90" y2="90" />
        <line x1="90" y1="10" x2="10" y2="90" />
      </g>
    );
    return null;
  };

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
      {items.map((_, i) => (
        <div key={i} className="geo-shape absolute w-24 h-24 will-change-transform">
          <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
            {getShape(i)}
          </svg>
        </div>
      ))}
    </div>
  );
}