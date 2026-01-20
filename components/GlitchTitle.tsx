"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function GlitchTitle({ text = "SYSTEM_DARK" }) {
  const containerRef = useRef(null);
  const mainTextRef = useRef(null);
  const glitchTextRef1 = useRef(null);
  const glitchTextRef2 = useRef(null);
  
  // Linhas decorativas
  const lineTopRef = useRef(null);
  const lineBottomRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 3 });

    // Função de Glitch Intenso
    const doGlitch = () => {
      const gTl = gsap.timeline();

      // Ativa clones e move aleatoriamente
      gTl.to([glitchTextRef1.current, glitchTextRef2.current], {
        opacity: 1,
        duration: 0.1
      })
      .to([glitchTextRef1.current, glitchTextRef2.current], {
        x: () => gsap.utils.random(-15, 15),
        y: () => gsap.utils.random(-5, 5),
        scaleX: () => gsap.utils.random(0.9, 1.1),
        duration: 0.05,
        repeat: 5,
        yoyo: true,
        ease: "rough({ template: none.out, strength: 1, points: 20, taper: 'none', randomize: true, clamp: false})"
      })
      .to([glitchTextRef1.current, glitchTextRef2.current], {
        opacity: 0,
        x: 0, y: 0,
        duration: 0
      });

      // Anima as linhas decorativas junto com o texto
      gTl.to([lineTopRef.current, lineBottomRef.current], {
        width: () => gsap.utils.random(80, 120) + "%",
        opacity: () => gsap.utils.random(0.5, 1),
        duration: 0.05,
        repeat: 5,
        yoyo: true
      }, "<");

      return gTl;
    };

    tl.add(doGlitch(), "+=1");

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative inline-block py-8 px-4">
      {/* Linhas Técnicas Estilo HUD */}
      <div ref={lineTopRef} className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-white/50" />
      <div ref={lineBottomRef} className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-white/50" />
      
      <div className="relative z-10 font-black italic tracking-tighter mix-blend-lighten">
        {/* Texto Principal */}
        <h1 ref={mainTextRef} className="text-7xl md:text-9xl text-white relative z-20 font-teko">
          {text}
        </h1>

        {/* Clone de Glitch 1 (Ciano / Azulado) */}
        <h1 ref={glitchTextRef1} className="absolute top-0 left-0 w-full h-full text-[#00ffff] opacity-0 z-10 mix-blend-screen pointer-events-none translate-x-1">
          {text}
        </h1>

        {/* Clone de Glitch 2 (Vermelho) */}
        <h1 ref={glitchTextRef2} className="absolute top-0 left-0 w-full h-full text-[#ff0000] opacity-0 z-10 mix-blend-screen pointer-events-none -translate-x-1">
          {text}
        </h1>
      </div>
      
      <div className="absolute -right-4 -top-4 font-mono text-xs text-red-500 font-bold tracking-widest">ERR_01</div>
    </div>
  );
}