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
  
  const hasFinishedRef = useRef(false);

  const [biosDate, setBiosDate] = useState("XX/XX/XXXX");
  
  const [progress, setProgress] = useState(0);
  const [bootLog, setBootLog] = useState<string[]>([]);

const bootLines = [
    "LOADING NOMAI TRANSLATOR...",      
    "ATTUNING DREAM NAIL...",          
    "CALIBRATING SIGNALSCOPE...",       
    "SUMMONING SPECTRAL STEED...",      
    "EQUIPPING VOID HEART...",         
    "SYNCING ASH TWIN PROJECT...",      
    "TOUCHING GRACE...",                
    "MAPPING HALLOWNEST...",           
    "RESTORING GREAT RUNES...",        
    "SYSTEM OPTIMIZATION: 99%",
    "READY TO LAUNCH."
  ];

  useEffect(() => {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0'); 
    const year = now.getFullYear();
    setBiosDate(`${day}/${month}/${year}`);
  }, []);

  useGSAP(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }

        const random = Math.random();
        let increment = 0;

        if (random > 0.9) increment = 15;      
        else if (random > 0.7) increment = 5;  
        else if (random > 0.3) increment = 1;  
        else increment = 0;                    

        const next = prev + increment;
        return next > 100 ? 100 : next;
      });
    }, 80);

    return () => clearInterval(interval);
  }, { scope: containerRef });

  const { contextSafe } = useGSAP({ scope: containerRef });

  useEffect(() => {
    const logIndex = Math.floor((progress / 100) * (bootLines.length - 1));
    if (bootLines[logIndex] && !bootLog.includes(bootLines[logIndex])) {
      setBootLog((prev) => [...prev, bootLines[logIndex]].slice(-6));
    }

    if (progress === 100 && !hasFinishedRef.current) {
      hasFinishedRef.current = true; 
      runExitAnimation();
    }
  }, [progress]);

  const runExitAnimation = contextSafe(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({
      onComplete: () => {
        onComplete();
      }
    });

    tl.to({}, { duration: 0.5 }); 

    tl.to(containerRef.current, {
      yPercent: -100,
      duration: 0.8,
      ease: "power4.inOut"
    });
  });

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-[100] bg-black flex flex-col justify-between p-8 md:p-12 font-mono text-white select-none cursor-wait"
    >
      <div className="flex justify-between items-start text-xs text-white/40 uppercase tracking-widest">
        <div>
          DASIUSP_OS v.2.0.2.5<br/>
          MEMORY: 42TB OK<br/>
          CPU: HYPE CORE 4Ghz<br/>
          STORAGE: 8PB SSD NVMe
        </div>

        <div className="text-right">
          BIOS DATE: {biosDate}<br/>
          SECURE BOOT: DISABLED
        </div>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl px-4">
        <div className="flex justify-between items-end mb-2">
           <span className="text-sm md:text-base text-white/70 animate-pulse">
             {progress < 100 ? "LOADING ASSETS..." : "SYSTEM READY"}
           </span>
           <span className="text-6xl md:text-9xl font-bold tracking-tighter text-white tabular-nums">
             {progress}%
           </span>
        </div>
        
        <div className="w-full h-2 md:h-4 border border-white/20 p-[2px]">
           <div 
             ref={barRef}
             className="h-full bg-white transition-all duration-100 ease-linear"
             style={{ width: `${progress}%` }}
           ></div>
        </div>
      </div>

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