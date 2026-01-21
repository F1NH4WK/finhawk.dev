"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// Imports (Componentes existentes)
import GlitchTitle from "@/components/GlitchTitle";
import BreathingShapes from "@/components/BreathingShapes";
import LowFiOverlay from "@/components/LowFiOverlay";
import CustomCursor from "@/components/CustomCursor";
import UserCoordinates from "@/components/UserCoordinates";
import LoadingScreen from "@/components/LoadingScreen";
import ProjectCard from "@/components/ProjectCard";

interface ProjectData {
  title: string;
  description: string;
  techs: string[];
  repoLink: string;
  deployLink?: string; 
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const bgLayerRef = useRef<HTMLDivElement>(null);
  const gridLayerRef = useRef<HTMLDivElement>(null);
  const mainContentRef = useRef<HTMLDivElement>(null);

  const homeSectionRef = useRef<HTMLDivElement>(null);
  const aboutSectionRef = useRef<HTMLDivElement>(null);
  const skillsSectionRef = useRef<HTMLDivElement>(null);
  const projectsSectionRef = useRef<HTMLDivElement>(null);
  const contactSectionRef = useRef<HTMLDivElement>(null);


  const [isLoading, setIsLoading] = useState(true);
  const [isSystemStarted, setIsSystemStarted] = useState(false);

  const projects: ProjectData[] = [
    {
      title: "Semana de SI",
      description: "Website desenvolvido para a Semana de Sistemas de Informação da USP!",
      techs: ["Next.js", "Firebase", "React", "Javascript", "Figma"],
      repoLink: "https://github.com/SSI-Site/Site-SSI",
      deployLink: "https://semanadesi.com"
    },
    {
      title: "Firefox Password Cracker",
      description: "CLI que automatiza a extração e descriptografia de senhas salvas no Firefox usando Python e bibliotecas especializadas.",
      techs: ["Python", "BeautifulSoup"],
      repoLink: "https://github.com",
    },
    {
      title: "Leterizza",
      description: "Landing Page desenvolvida para uma plataforma que democratiza a educação!",
      techs: ["TypeScript", "Figma", "Next.js", "React"],
      repoLink: "https://github.com",
    },
  ];

  const skills = [
    "JavaScript (ES6+)", "TypeScript", "React.js", "Next.js", 
    "CSS 3", "Python 3", "HTML 5", "Node.js", "C", "C++", "Linux", "Git"
  ];

  const socialLinks = [
    { name: "LinkedIn", url: "https://linkedin.com/in/finhawk", label: "CONECTAR PERFIL" },
    { name: "GitHub", url: "https://github.com/F1NH4WK", label: "REPOSITÓRIOS" },
    { name: "Email", url: "mailto:contato@finhawk.dev", label: "ENVIAR MENSAGEM" },
    { name: "WhatsApp", url: "https://wa.me/11956377576", label: "CHAT DIRETO" },
  ];

  useGSAP(() => {
    if (!isLoading && !isSystemStarted) {
      const handleMouseMove = (e: MouseEvent) => {
        const { innerWidth, innerHeight } = window;
        const xPos = (e.clientX / innerWidth - 0.5) * 2;
        const yPos = (e.clientY / innerHeight - 0.5) * 2;

        if (gridLayerRef.current) gsap.to(gridLayerRef.current, { x: xPos * 20, y: yPos * 20, duration: 1 });
        if (bgLayerRef.current) gsap.to(bgLayerRef.current, { x: -xPos * 40, y: -yPos * 40, duration: 1.5 });
        if (homeSectionRef.current) {
          gsap.to(homeSectionRef.current, { 
              x: xPos * 10, y: yPos * 10, rotationY: xPos * 5, rotationX: -yPos * 5, 
              transformPerspective: 1000, duration: 1
          });
        }
      };
      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }
  }, { scope: containerRef, dependencies: [isLoading, isSystemStarted] });

  useGSAP(() => {
    if (!isLoading && mainContentRef.current) {
      gsap.fromTo(mainContentRef.current, 
        { y: 50, opacity: 0, scale: 0.98 },
        { y: 0, opacity: 1, scale: 1, duration: 1.5, ease: "power3.out", delay: 0.2 }
      );
    }
  }, { scope: containerRef, dependencies: [isLoading] });

  const { contextSafe } = useGSAP({ scope: containerRef });

  const goToAbout = contextSafe(() => {
    setIsSystemStarted(true);
    const tl = gsap.timeline();

    if (homeSectionRef.current) {
      tl.to(homeSectionRef.current, {
        y: -window.innerHeight, opacity: 0, duration: 1.2, ease: "power4.inOut",
        onComplete: () => { if (homeSectionRef.current) gsap.set(homeSectionRef.current, { display: "none" }); }
      });
    }
    if (bgLayerRef.current) tl.to(bgLayerRef.current, { y: -100, scale: 1.1, duration: 1.5 }, "<");
    if (aboutSectionRef.current) {
        gsap.set(aboutSectionRef.current, { display: "flex", y: window.innerHeight, opacity: 0 });
        tl.to(aboutSectionRef.current, { y: 0, opacity: 1, duration: 1.2, ease: "power4.out" }, "-=0.8");
    }
  });

  const goToSkills = contextSafe(() => {
    const tl = gsap.timeline();
    if (aboutSectionRef.current) {
        tl.to(aboutSectionRef.current, {
            x: -window.innerWidth, opacity: 0, duration: 1, ease: "power3.inOut",
            onComplete: () => { if (aboutSectionRef.current) gsap.set(aboutSectionRef.current, { display: "none" }); }
        });
    }
    if (bgLayerRef.current) tl.to(bgLayerRef.current, { x: -50, duration: 1.5 }, "<");
    if (skillsSectionRef.current) {
        gsap.set(skillsSectionRef.current, { display: "flex", x: window.innerWidth, opacity: 0 });
        tl.to(skillsSectionRef.current, { x: 0, opacity: 1, duration: 1, ease: "power3.out" }, "-=0.8");
        const skillItems = skillsSectionRef.current.querySelectorAll(".skill-item");
        tl.fromTo(skillItems, { y: 20, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.05, duration: 0.5 }, "-=0.5");
    }
  });

  const goToProjects = contextSafe(() => {
    const tl = gsap.timeline();
    if (skillsSectionRef.current) {
        tl.to(skillsSectionRef.current, {
            y: -50, opacity: 0, duration: 0.8, ease: "power2.in",
            onComplete: () => { if (skillsSectionRef.current) gsap.set(skillsSectionRef.current, { display: "none" }); }
        });
    }
    if (projectsSectionRef.current) {
        gsap.set(projectsSectionRef.current, { display: "flex", scale: 0.9, opacity: 0 });
        tl.to(projectsSectionRef.current, { scale: 1, opacity: 1, duration: 1, ease: "power3.out" }, "-=0.3");
        const projectCards = projectsSectionRef.current.querySelectorAll(".project-card");
        tl.fromTo(projectCards, { y: 50, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.2, duration: 0.8, ease: "back.out(1.2)" }, "-=0.6");
    }
  });

  const goToContact = contextSafe(() => {
    const tl = gsap.timeline();
    if (projectsSectionRef.current) {
        tl.to(projectsSectionRef.current, {
            y: 100, opacity: 0, filter: "blur(10px)", duration: 0.8, ease: "power2.in",
            onComplete: () => { if (projectsSectionRef.current) gsap.set(projectsSectionRef.current, { display: "none" }); }
        });
    }
    if (contactSectionRef.current) {
        gsap.set(contactSectionRef.current, { display: "flex", scale: 1.2, opacity: 0 });
        tl.to(contactSectionRef.current, { scale: 1, opacity: 1, duration: 1, ease: "circ.out" }, "-=0.4");
        const links = contactSectionRef.current.querySelectorAll(".contact-link");
        tl.fromTo(links, { x: -50, opacity: 0 }, { x: 0, opacity: 1, stagger: 0.1, duration: 0.5 }, "-=0.5");
    }
  });

  const shutdownSystem = contextSafe(() => {
    if (!mainContentRef.current) return;
    const tl = gsap.timeline({ onComplete: () => window.location.reload() });

    tl.to(mainContentRef.current, { filter: "brightness(5) contrast(2)", duration: 0.1, ease: "rough" });
    tl.to(mainContentRef.current, { scaleY: 0.005, scaleX: 1.1, filter: "brightness(10) contrast(1)", duration: 0.2, ease: "power2.in" });
    tl.to(mainContentRef.current, { scaleX: 0, opacity: 0, duration: 0.15, ease: "power4.out" });
  });

  return (
    <main 
      ref={containerRef} 
      className="min-h-screen bg-[#050505] text-white p-2 md:p-8 flex flex-col relative overflow-hidden font-sans selection:bg-red-500 selection:text-black"
    >
      <CustomCursor />
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      <div ref={mainContentRef} className="opacity-0 flex-grow w-full h-full relative flex flex-col justify-between transition-none origin-center">
          <LowFiOverlay />
          
          <div className="border-[1px] border-white/20 flex-grow w-full h-full relative flex flex-col justify-between p-4 md:p-12 z-10 backdrop-blur-[2px]">
            
         
            <header className="hidden md:flex justify-between items-start z-50 mix-blend-difference pointer-events-none">
              <div className="font-mono text-sm font-bold tracking-[0.2em] border-l-2 border-red-600 pl-3">
                SOFTWARE<br/>ENGINEER
              </div>
              <div className="w-4 h-4 bg-red-600 animate-pulse rounded-full shadow-[0_0_15px_rgba(255,0,0,0.8)]"></div>
            </header>

  
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
              <div ref={gridLayerRef} className="absolute inset-[-10%] w-[120%] h-[120%] opacity-20 pointer-events-none">
                 <div className="w-full h-full bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:40px_40px] opacity-50"></div>
              </div>
              <div ref={bgLayerRef} className="absolute inset-[-10%] w-[120%] h-[120%] z-0 pointer-events-none">
                <BreathingShapes />
              </div>

              {/* HOME */}
              <div ref={homeSectionRef} className="z-30 relative pointer-events-auto text-center flex flex-col items-center">
                 <GlitchTitle text="FINHAWK" />
                 <div className="mt-8 flex justify-center">
                    <button onClick={goToAbout} className="group relative px-8 py-3 bg-transparent border border-white text-white font-mono uppercase tracking-widest text-sm overflow-hidden hover:text-black transition-colors duration-300">
                      <span className="relative z-10">Iniciar Sistema</span>
                      <div className="absolute inset-0 bg-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-0"></div>
                    </button>
                 </div>
              </div>

              <div ref={aboutSectionRef} className="absolute inset-0 z-40 hidden p-4 overflow-y-auto">
                  <div className="w-full max-w-4xl min-h-full flex flex-col justify-start md:justify-center mx-auto pt-20 pb-24 md:py-0">
                      <div className="bg-black/80 backdrop-blur-md border border-white/20 p-8 md:p-12 relative shadow-[0_0_50px_rgba(0,0,0,0.8)]">
                          <div className="absolute top-0 left-0 w-20 h-[2px] bg-red-600"></div>
                          <div className="absolute bottom-0 right-0 w-20 h-[2px] bg-red-600"></div>

                          <div className="flex flex-col md:flex-row gap-12">
                              <div className="flex-1">
                                  <h4 className="text-red-500 font-mono text-xs tracking-[0.3em] mb-4">// BIO_DATA</h4>
                                  <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white tracking-tighter">QUEM SOU EU</h2>
                                  <div className="text-gray-300 font-mono text-sm leading-relaxed space-y-4 border-l border-white/10 pl-6">
                                      <p>Me chamo <b>EDUARDO</b>, sou um desenvolvedor <b>FULL STACK</b> apaixonado por criar experiências digitais inovadoras e eficientes.</p>
                                      <p>Atualmente, meu foco é aprimorar minhas habilidades em <b>CYBERSEGURANÇA</b>, com foco em <b>PENTESTING</b>, buscando sempre estar à frente das ameaças digitais.</p>
                                  </div>
                              </div>
                              <div className="flex-1 flex flex-col justify-center">
                                  <div className="bg-white/5 border border-white/10 p-6 relative group hover:border-red-500/50 transition-colors duration-300">
                                      <div className="absolute -top-3 -right-3 w-6 h-6 border-t border-r border-red-500"></div>
                                      <h4 className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-3">Academic_Background</h4>
                                      <h3 className="text-2xl font-bold text-white mb-1">Universidade de<br/>São Paulo</h3>
                                      <span className="inline-block px-2 py-1 bg-red-600/20 text-red-500 text-[10px] font-mono border border-red-500/30 mb-4">USP</span>
                                      <div className="space-y-2 font-mono text-xs text-gray-400 mt-2">
                                          <div className="flex justify-between border-b border-white/10 pb-1">
                                              <span>Status:</span><span className="text-white">Graduando</span>
                                          </div>
                                          <div className="flex justify-between border-b border-white/10 pb-1">
                                              <span>Curso:</span><span className="text-white">Sistemas de Informação</span>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                          <div className="mt-10 flex justify-end">
                            <button onClick={goToSkills} className="flex items-center gap-3 text-sm font-mono uppercase hover:text-red-500 transition-colors group">
                                Acessar Habilidades <span className="text-lg">&gt;</span>
                            </button>
                          </div>
                      </div>
                  </div>
              </div>

              <div ref={skillsSectionRef} className="absolute inset-0 z-40 hidden p-4 overflow-y-auto">
                  <div className="w-full max-w-3xl min-h-full flex flex-col justify-start md:justify-center mx-auto pt-20 pb-24 md:py-0">
                      <div className="text-center mb-10">
                          <h4 className="text-red-500 font-mono text-xs tracking-[0.3em] mb-2">// SYSTEM_MODULES</h4>
                          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tighter">ARSENAL TÉCNICO</h2>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                          {skills.map((skill, i) => (
                              <div key={i} className="skill-item bg-white/5 border border-white/10 p-4 text-center hover:bg-white/10 hover:border-red-500/50 transition-all duration-300 cursor-default">
                                  <span className="text-xs font-mono text-gray-400">{skill}</span>
                              </div>
                          ))}
                      </div>
                      <div className="text-center">
                          <button onClick={goToProjects} className="px-6 py-3 bg-transparent border border-red-600 text-red-600 font-bold font-mono text-xs uppercase tracking-widest hover:bg-red-600 hover:text-black transition-all duration-300">
                            [ CARREGAR PROJETOS ]
                          </button>
                      </div>
                  </div>
              </div>

              <div ref={projectsSectionRef} className="absolute inset-0 z-40 hidden p-4 overflow-y-auto">
                  <div className="w-full max-w-6xl min-h-full flex flex-col justify-start md:justify-center items-center mx-auto pt-10 pb-32 md:py-0">
                      <div className="w-full flex justify-between items-end mb-8 border-b border-white/10 pb-4 shrink-0">
                         <div>
                            <h4 className="text-red-500 font-mono text-xs tracking-[0.3em]">// PORTFOLIO_DB</h4>
                            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tighter">PROJETOS SELECIONADOS</h2>
                         </div>
                         <div className="hidden md:block font-mono text-xs text-gray-500">
                             Total Records: {projects.length}
                         </div>
                      </div>

                      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 shrink-0">
                        {projects.map((proj, index) => (
                          <div key={index} className="h-auto md:h-full">
                            <ProjectCard 
                              index={index + 1}
                              title={proj.title}
                              description={proj.description}
                              techs={proj.techs}
                              repoLink={proj.repoLink}
                              deployLink={proj.deployLink}
                            />
                          </div>
                        ))}
                      </div>

                      <div className="mt-12 text-center shrink-0">
                          <button onClick={goToContact} className="text-xs font-mono text-red-500 hover:text-white border-b border-red-500 hover:border-white pb-1 transition-colors">
                              ESTABELECER CONEXÃO &gt;&gt;
                          </button>
                      </div>
                  </div>
              </div>

              <div ref={contactSectionRef} className="absolute inset-0 z-40 hidden p-4 overflow-y-auto">
                  <div className="w-full max-w-2xl min-h-full flex flex-col justify-start md:justify-center items-center mx-auto pt-20 pb-24 md:py-0 text-center">
                      <div className="flex justify-center mb-6">
                          <div className="flex items-end gap-1 h-8">
                             <div className="w-2 h-2 bg-red-600 animate-pulse"></div>
                             <div className="w-2 h-4 bg-red-600/60"></div>
                             <div className="w-2 h-6 bg-red-600/40"></div>
                             <div className="w-2 h-8 bg-red-600/20"></div>
                          </div>
                      </div>
                      <h4 className="text-red-500 font-mono text-xs tracking-[0.5em] mb-4">UPLINK_READY</h4>
                      <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tighter mb-8 glitch-effect">VAMOS CONVERSAR</h2>
                      <p className="text-gray-400 font-mono mb-12 max-w-md mx-auto">
                        Estou disponível para novos projetos, oportunidades de trabalho e colaborações.
                      </p>
                      
                      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 max-w-lg mx-auto mb-16">
                          {socialLinks.map((link, i) => (
                             <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="contact-link group relative p-4 border border-white/20 bg-black/40 hover:bg-white/10 transition-all duration-300 flex items-center justify-between overflow-hidden">
                                <div className="absolute inset-0 w-[2px] bg-red-600 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                                <span className="font-mono text-sm text-gray-300 group-hover:text-white transition-colors pl-2">{link.name}</span>
                                <span className="text-[10px] uppercase tracking-widest text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">[{link.label}]</span>
                             </a>
                          ))}
                      </div>
                      
                      <button onClick={shutdownSystem} className="group px-8 py-3 bg-transparent border border-white text-white font-mono text-xs font-bold uppercase tracking-widest hover:bg-red-600 hover:border-red-600 hover:text-white transition-colors duration-300">
                         ENCERRAR SISTEMA
                      </button>
                  </div>
              </div>

            </div>
            <footer className="hidden md:flex justify-between items-end z-20 font-mono text-[10px] md:text-xs uppercase tracking-widest w-full pointer-events-none">
               <div className="text-white/40">
                  SYSTEM: {isSystemStarted ? 'ENGAGED' : 'READY'} <br/>
                  V.1.0.4_BETA
               </div>
               <div className="text-right"><UserCoordinates /></div>
            </footer>
          </div>
      </div>
    </main>
  );
}