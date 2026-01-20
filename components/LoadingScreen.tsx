"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [bootLog, setBootLog] = useState<string[]>([]);

  // Textos aleatórios para parecer que o sistema está carregando módulos
  const bootLines = [
    "INITIALIZING KERNEL...",
    "LOADING MEMORY MODULES...",
    "VERIFYING ENCRYPTION KEYS...",
    "CONNECTING TO NEURAL NET...",
    "MOUNTING FILE SYSTEM...",
    "ALLOCATING RESOURCES...",
    "BYPASSING SECURITY PROTOCOLS...",
    "SYSTEM OPTIMIZATION: 99%",
    "RENDERING GRAPHICS ENGINE...",
    "READY TO LAUNCH."
  ];

  useGSAP(() => {
    // Animação de entrada dos textos
    const tl = gsap.timeline();

    // Simulação do progresso (0 a 100%)
    const interval = setInterval(() => {
      setProgress((prev) => {
        // Lógica de "stutter": às vezes carrega rápido, às vezes trava
        const increment = Math.random() > 0.8 ? 15 : 2; 
        const next = prev + increment;

        if (next >= 100) {
          clearInterval(interval);
          return 100;
        }
        return next;
      });
    }, 100);

    return () => clearInterval(interval);
  }, { scope: containerRef });

  // Efeito para adicionar linhas de log baseado no progresso
  useEffect(() => {
    const logIndex = Math.floor((progress / 100) * bootLines.length);
    if (bootLines[logIndex] && !bootLog.includes(bootLines[logIndex])) {
      setBootLog((prev) => [...prev, bootLines[logIndex]].slice(-6)); // Mantém apenas as últimas 6 linhas
    }

    // SE ACABOU (100%)
    if (progress === 100) {
      // Pequeno delay para ler "100%" e depois animar a saída
      const timer = setTimeout(() => {
        if (!containerRef.current) return;
        
        // Animação de Saída "Curtain Up"
        gsap.to(containerRef.current, {
          yPercent: -100, // Desliza para cima
          duration: 0.8,
          ease: "power4.inOut",
          onComplete: onComplete // Avisa a Home que acabou
        });
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [progress, onComplete]); // Dependências corrigidas

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-[100] bg-black flex flex-col justify-between p-8 md:p-12 font-mono text-white select-none cursor-wait"
    >
      {/* Topo: Informações do Sistema */}
      <div className="flex justify-between items-start text-xs text-white/40 uppercase tracking-widest">
        <div>
          FINHAWK_OS v.2.0.4<br/>
          MEMORY: 64TB OK<br/>
          CPU: QUANTUM CORE
        </div>
        <div className="text-right">
          BIOS DATE: 20/01/2026<br/>
          SECURE BOOT: DISABLED
        </div>
      </div>

      {/* Centro: Porcentagem Gigante */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl px-4">
        <div className="flex justify-between items-end mb-2">
           <span className="text-sm md:text-base text-white/70 animate-pulse">LOADING ASSETS...</span>
           <span className="text-6xl md:text-9xl font-bold tracking-tighter text-white">
             {progress}%
           </span>
        </div>
        
        {/* Barra de Progresso */}
        <div className="w-full h-2 md:h-4 border border-white/20 p-[2px]">
           <div 
             ref={barRef}
             className="h-full bg-white transition-all duration-75 ease-out"
             style={{ width: `${progress}%` }}
           ></div>
        </div>
      </div>

      {/* Rodapé: Logs de Boot */}
      <div className="text-xs md:text-sm text-white/60 h-32 flex flex-col justify-end overflow-hidden">
        {bootLog.map((line, i) => (
          <div key={i} className="mb-1">
            <span className="text-green-500 mr-2">➜</span>
            {line}
          </div>
        ))}
        {progress < 100 && (
          <span className="animate-pulse">_</span>
        )}
      </div>
    </div>
  );
}