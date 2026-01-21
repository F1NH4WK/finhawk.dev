"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const GLITCH_CHARS = "!<>-_\\/[]{}—=+*^?#________";

export default function GlitchTitle({ text = "FINHAWK" }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mainTextRef = useRef<HTMLHeadingElement | null>(null);
  const glitchTextRef1 = useRef<HTMLHeadingElement | null>(null);
  const glitchTextRef2 = useRef<HTMLHeadingElement | null>(null);
  
  const lineTopRef = useRef<HTMLDivElement | null>(null);
  const lineBottomRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    gsap.set([lineTopRef.current, lineBottomRef.current], {
      width: "100%",
      opacity: 1
    });

    const tl = gsap.timeline({ repeat: -1, repeatDelay: 2 + Math.random() * 3 });

    const scrambleText = () => {
      if (!mainTextRef.current) return;
      const chars = text.split("");
      const scrambled = chars.map((char) => {
        if (char === " ") return " ";
        return Math.random() > 0.5 ? GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)] : char;
      }).join("");
      mainTextRef.current.innerText = scrambled;
    };

    const resetText = () => {
      if(mainTextRef.current) mainTextRef.current.innerText = text;
    };


    const randomClipPath = () => {
      const slice1 = Math.floor(Math.random() * 30);
      const slice2 = Math.floor(Math.random() * 30) + 30;
      const slice3 = Math.floor(Math.random() * 30) + 60;
      return `polygon(
        0 ${slice1}%, 100% ${slice1}%, 100% ${slice1 + Math.random() * 10}%, 0 ${slice1 + Math.random() * 10}%,
        0 ${slice2}%, 100% ${slice2}%, 100% ${slice2 + Math.random() * 10}%, 0 ${slice2 + Math.random() * 10}%,
        0 ${slice3}%, 100% ${slice3}%, 100% ${slice3 + Math.random() * 10}%, 0 ${slice3 + Math.random() * 10}%
      )`;
    };

    const doGlitch = () => {
      const gTl = gsap.timeline({
        onComplete: resetText 
      });

      gTl.to([glitchTextRef1.current, glitchTextRef2.current], {
        opacity: 1,
        duration: 0.05
      });

      const loops = 10;
      for (let i = 0; i < loops; i++) {
        gTl.to(containerRef.current, {
          onStart: scrambleText,
          skewX: gsap.utils.random(-20, 20), 
          duration: 0.05,
          ease: "power4.inOut"
        });

        gTl.to([glitchTextRef1.current, glitchTextRef2.current], {
          x: () => gsap.utils.random(-20, 20),
          y: () => gsap.utils.random(-10, 10),
          scale: () => gsap.utils.random(0.95, 1.05),
          clipPath: () => randomClipPath(),
          duration: 0.05,
        }, "<");
      }

      gTl.to([glitchTextRef1.current, glitchTextRef2.current], {
        opacity: 0,
        x: 0, y: 0,
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        duration: 0
      });
      
      gTl.to(containerRef.current, {
        skewX: 0,
        duration: 0.1,
        ease: "elastic.out(1, 0.5)"
      });

      gTl.to([lineTopRef.current, lineBottomRef.current], {
        width: "100%",
        opacity: 1,
        clearProps: "top,transform", 
        duration: 0.1
      }, "<");

      gTl.to([lineTopRef.current, lineBottomRef.current], {
        width: () => gsap.utils.random(80, 120) + "%",
        opacity: () => gsap.utils.random(0.3, 0.8),
        top: () => gsap.utils.random(10, 90) + "%", 
        duration: 0.05,
        repeat: 8,
        yoyo: true,
        ease: "rough"
      }, 0);

      return gTl;
    };

    tl.add(doGlitch(), "+=0.5");

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative inline-block py-8 px-4 perspective-[500px]">
      <div ref={lineTopRef} className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[2px] bg-red-500/80 shadow-[0_0_10px_red] will-change-transform" />
      <div ref={lineBottomRef} className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[2px] bg-cyan-500/80 shadow-[0_0_10px_cyan] will-change-transform" />
      
      <div className="relative z-10 font-black italic tracking-tighter mix-blend-lighten">
        <h1 ref={mainTextRef} className="text-7xl md:text-9xl text-white relative z-20 font-teko select-none">
          {text}
        </h1>
        <h1 ref={glitchTextRef1} className="absolute top-0 left-0 w-full h-full text-[#00ffff] opacity-0 z-10 mix-blend-screen pointer-events-none translate-x-1 font-teko">
          {text}
        </h1>
        <h1 ref={glitchTextRef2} className="absolute top-0 left-0 w-full h-full text-[#ff0000] opacity-0 z-10 mix-blend-screen pointer-events-none -translate-x-1 font-teko">
          {text}
        </h1>
      </div>
      
      <div className="absolute -right-6 -top-6 font-mono text-[10px] text-red-500 font-bold tracking-widest border border-red-500/30 p-1">
        ERR_0X42
      </div>
      <div className="absolute -left-6 bottom-0 font-mono text-[10px] text-cyan-500 font-bold tracking-widest rotate-90 origin-bottom-left opacity-60">
        SYS_FAILURE
      </div>
    </div>
  );
}