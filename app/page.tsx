"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import GlitchTitle from "@/components/GlitchTitle";
import BreathingShapes from "@/components/BreathingShapes";
import LowFiOverlay from "@/components/LowFiOverlay";
import CustomCursor from "@/components/CustomCursor";
import UserCoordinates from "@/components/UserCoordinates";

export default function Home() {
  // 1. Tipagem correta dos Refs para TypeScript
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Refs para as camadas de parallax
  const bgLayerRef = useRef<HTMLDivElement>(null); // Formas geométricas (Fundo)
  const gridLayerRef = useRef<HTMLDivElement>(null); // Grid pontilhado
  const contentLayerRef = useRef<HTMLDivElement>(null); // Texto principal

  useGSAP(() => {
    // LÓGICA DE PARALLAX (Sem Three.js)
    // 2. Tipagem do evento 'e' como MouseEvent
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      
      // Calcula a posição do mouse relativa ao centro (-1 a 1)
      const xPos = (e.clientX / innerWidth - 0.5) * 2;
      const yPos = (e.clientY / innerHeight - 0.5) * 2;

      // 3. Verificações de segurança (opcionais, mas boas para TS estrito)
      if (gridLayerRef.current) {
        gsap.to(gridLayerRef.current, {
          x: xPos * 20,
          y: yPos * 20,
          duration: 1,
          ease: "power2.out"
        });
      }

      if (bgLayerRef.current) {
        gsap.to(bgLayerRef.current, {
          x: -xPos * 40,
          y: -yPos * 40,
          duration: 1.5,
          ease: "power2.out"
        });
      }

      if (contentLayerRef.current) {
        gsap.to(contentLayerRef.current, {
          x: xPos * 10,
          y: yPos * 10,
          rotationY: xPos * 5, // Leve inclinação 3D CSS
          rotationX: -yPos * 5,
          transformPerspective: 1000, // Necessário para rotação 3D
          duration: 1,
          ease: "power2.out"
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, { scope: containerRef });

  return (
    <main 
      ref={containerRef} 
      className="min-h-screen bg-[#050505] text-white p-4 md:p-8 flex flex-col relative overflow-hidden font-sans selection:bg-red-500 selection:text-black"
    >
      
      {/* 1. Efeitos de Tela (Granulado + Scanlines + Cursor) */}
      <CustomCursor />
      <LowFiOverlay />

      <div className="border-[1px] border-white/20 flex-grow w-full h-full relative flex flex-col justify-between p-6 md:p-12 z-10 backdrop-blur-[2px]">
        
        {/* --- HEADER --- */}
        <header className="flex justify-between items-start z-50 mix-blend-difference">
          <div className="font-mono text-sm font-bold tracking-[0.2em] border-l-2 border-red-600 pl-3">
            SOFTWARE<br/>ENGINEER
          </div>
          <div className="w-4 h-4 bg-red-600 animate-pulse rounded-full shadow-[0_0_15px_rgba(255,0,0,0.8)]"></div>
        </header>


        {/* --- ÁREA CENTRAL (COM PARALLAX) --- */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          
          {/* Camada Parallax 1: GRID DE FUNDO */}
          <div ref={gridLayerRef} className="absolute inset-[-10%] w-[120%] h-[120%] opacity-20 pointer-events-none">
             {/* Grid Radial SVG simples via CSS */}
             <div className="w-full h-full bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:40px_40px] opacity-50"></div>
          </div>

          {/* Camada Parallax 2: FORMAS RESPIRANDO */}
          <div ref={bgLayerRef} className="absolute inset-[-10%] w-[120%] h-[120%] z-0 pointer-events-none">
            <BreathingShapes />
          </div>

          {/* Camada Parallax 3: CONTEÚDO PRINCIPAL (TÍTULO) */}
          <div ref={contentLayerRef} className="z-30 pointer-events-auto">
             <GlitchTitle text="FINHAWK" />
             
             {/* Botão Call to Action */}
             <div className="mt-8 flex justify-center">
                <button className="group relative px-8 py-3 bg-transparent border border-white text-white font-mono uppercase tracking-widest text-sm overflow-hidden hover:text-black transition-colors duration-300">
                  <span className="relative z-10">Iniciar Sistema</span>
                  <div className="absolute inset-0 bg-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-0"></div>
                </button>
             </div>
          </div>

        </div>


        {/* --- FOOTER --- */}
        <footer className="flex justify-between items-end z-20 font-mono text-[10px] md:text-xs uppercase tracking-widest w-full pointer-events-none">
           {/* Lado Esquerdo: Info do Sistema */}
           <div className="text-white/40">
             SYSTEM: ONLINE <br/>
             V.1.0.4_BETA
           </div>

           {/* Lado Direito: Coordenadas do Usuário */}
           <div className="text-right">
             <UserCoordinates />
           </div>
        </footer>

      </div>
    </main>
  );
}