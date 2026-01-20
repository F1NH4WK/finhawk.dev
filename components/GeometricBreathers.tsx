"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function GeometricBreathers() {
  const containerRef = useRef(null);
  const items = new Array(12).fill(null);

  useGSAP(() => {
    const shapes = gsap.utils.toArray(".geo-breather");

    const animateShape = (element) => {
      if (!element) return;
      const randomX = gsap.utils.random(5, 95);
      const randomY = gsap.utils.random(5, 95);
      const baseScale = gsap.utils.random(0.4, 1.2);
      const startRotation = gsap.utils.random(-180, 180);

      gsap.set(element, {
        left: `${randomX}%`,
        top: `${randomY}%`,
        xPercent: -50, 
        yPercent: -50, 
        scale: 0,      
        opacity: 0,
        rotation: startRotation
      });

      const tl = gsap.timeline({
        onComplete: () => animateShape(element)
      });

      // Pop in
      tl.to(element, {
        scale: baseScale,
        opacity: gsap.utils.random(0.1, 0.3), // Opacidade sutil no escuro
        duration: gsap.utils.random(1, 2),
        ease: "back.out(1.7)"
      });

      // Breathe
      tl.to(element, {
        scale: baseScale * 1.1,
        rotation: `+=${gsap.utils.random(-30, 30)}`,
        duration: gsap.utils.random(2, 4),
        ease: "sine.inOut",
        yoyo: true,
        repeat: gsap.utils.random(1, 2, 1)
      });

      // Fade out
      tl.to(element, {
        scale: 0,
        opacity: 0,
        rotation: `+=${gsap.utils.random(-60, 60)}`,
        duration: 1.2,
        ease: "power3.in"
      });
    };

    shapes.forEach((shape) => {
      gsap.delayedCall(gsap.utils.random(0, 5), () => animateShape(shape));
    });

  }, { scope: containerRef });

  // MUDANÇA: Cores dos SVGs para BRANCO
  const getShape = (index) => {
    // Use 'vector-effect-non-scaling-stroke' para bordas nítidas mesmo com scale
    const strokeClass = "stroke-white stroke-[2px] fill-none vector-effect-non-scaling-stroke";
    const fillClass = "fill-white stroke-none";
    
    const type = index % 5; 

    switch (type) {
      case 0: // Círculo
        return (
          <svg viewBox="0 0 100 100" className="w-28 h-28">
            <circle cx="50" cy="50" r="48" className={strokeClass} />
          </svg>
        );
      case 1: // X
        return (
          <svg viewBox="0 0 100 100" className="w-20 h-20">
            <line x1="10" y1="10" x2="90" y2="90" className={strokeClass} />
            <line x1="90" y1="10" x2="10" y2="90" className={strokeClass} />
          </svg>
        );
      case 2: // Grid
        return (
          <svg viewBox="0 0 100 100" className="w-16 h-16 opacity-70">
             <rect x="0" y="0" width="45" height="45" className={fillClass} />
             <rect x="55" y="0" width="45" height="45" className={strokeClass} />
             <rect x="0" y="55" width="45" height="45" className={strokeClass} />
             <rect x="55" y="55" width="45" height="45" className={fillClass} />
          </svg>
        );
      case 3: // Triângulo
        return (
          <svg viewBox="0 0 100 100" className="w-32 h-32">
            <polygon points="50,5 95,95 5,95" className={strokeClass} />
          </svg>
        );
      case 4: // Mira
        return (
           <svg viewBox="0 0 100 100" className="w-24 h-24">
             <circle cx="50" cy="50" r="40" className={strokeClass} />
             <line x1="50" y1="5" x2="50" y2="95" className={strokeClass} />
             <line x1="5" y1="50" x2="95" y2="50" className={strokeClass} />
           </svg>
        );
      default: return null;
    }
  };

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0">
      {items.map((_, i) => (
        <div key={i} className="geo-breather absolute opacity-0 will-change-transform">
          {getShape(i)}
        </div>
      ))}
    </div>
  );
}