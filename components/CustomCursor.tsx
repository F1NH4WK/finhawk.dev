"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function CustomCursor() {
  // 1. Tipagem dos Refs (Importante para TS)
  const cursorRef = useRef<HTMLDivElement>(null);
  const lineV = useRef<HTMLDivElement>(null);
  const lineH = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 2. Verificação de segurança: garante que o elemento existe antes de animar
    if (!cursorRef.current) return;

    // Otimização: quickSetter
    const xSet = gsap.quickSetter(cursorRef.current, "x", "px");
    const ySet = gsap.quickSetter(cursorRef.current, "y", "px");

    // 3. Tipagem do evento 'e' como MouseEvent
    const moveCursor = (e: MouseEvent) => {
      xSet(e.clientX);
      ySet(e.clientY);
    };

    // Efeitos de Interação (Hover)
    const onHover = () => {
      gsap.to(cursorRef.current, { rotation: 45, scale: 1.5, duration: 0.2, ease: "power2.out" });
    };

    const onLeave = () => {
      gsap.to(cursorRef.current, { rotation: 0, scale: 1, duration: 0.2, ease: "power2.out" });
    };

    const onClickDown = () => {
      gsap.to(cursorRef.current, { scale: 0.8, duration: 0.1 });
    };

    const onClickUp = () => {
      gsap.to(cursorRef.current, { scale: 1.5, duration: 0.1 }); 
    };

    // Listeners Globais
    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", onClickDown);
    window.addEventListener("mouseup", onClickUp);

    // Detectar Hover em links/botões
    const links = document.querySelectorAll("a, button, .pointer-events-auto, input, textarea");
    
    links.forEach((link) => {
      link.addEventListener("mouseenter", onHover);
      link.addEventListener("mouseleave", onLeave);
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", onClickDown);
      window.removeEventListener("mouseup", onClickUp);
      
      links.forEach((link) => {
        link.removeEventListener("mouseenter", onHover);
        link.removeEventListener("mouseleave", onLeave);
      });
    };
  }, { scope: cursorRef });

  return (
    <>
      {/* Atenção: 'jsx' e 'global' são props específicas do Next.js/styled-jsx.
        O TypeScript pode reclamar delas dependendo da configuração do projeto, 
        mas o código vai compilar e funcionar.
      */}
      <style jsx global>{`
        * {
          cursor: none !important;
        }
      `}</style>

      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference will-change-transform"
        style={{ transform: "translate(-50%, -50%)" }} 
      >
        <div className="relative flex items-center justify-center w-8 h-8">
          {/* Linha Vertical */}
          <div ref={lineV} className="absolute w-[1px] h-full bg-white origin-center" />
          {/* Linha Horizontal */}
          <div ref={lineH} className="absolute w-full h-[1px] bg-white origin-center" />
        </div>
      </div>
    </>
  );
}