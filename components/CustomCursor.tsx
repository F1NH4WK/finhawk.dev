"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const lineV = useRef(null);
  const lineH = useRef(null);

  useGSAP(() => {
    // Otimização: quickSetter é muito mais rápido para seguir o mouse
    const xSet = gsap.quickSetter(cursorRef.current, "x", "px");
    const ySet = gsap.quickSetter(cursorRef.current, "y", "px");

    // Movimento
    const moveCursor = (e) => {
      xSet(e.clientX);
      ySet(e.clientY);
    };

    // Efeitos de Interação (Hover)
    const onHover = () => {
      // Vira um "X" e aumenta
      gsap.to(cursorRef.current, { rotation: 45, scale: 1.5, duration: 0.2, ease: "power2.out" });
    };

    const onLeave = () => {
      // Volta a ser "+"
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
      {/* AQUI ESTÁ A MÁGICA:
        Injetamos CSS global para matar o cursor padrão em TUDO (*),
        inclusive links e botões que costumam forçar o cursor de volta.
      */}
      <style global jsx>{`
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