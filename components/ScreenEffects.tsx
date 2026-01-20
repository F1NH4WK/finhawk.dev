"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, Noise, Scanline, Vignette } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import MouseDistortion from "@/components/effects/MouseDistortion";

function EffectsLogic() {
  const distortionRef = useRef(null);
  const mouseData = useRef({ target: { x: 0.5, y: 0.5 }, current: { x: 0.5, y: 0.5 } });
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseData.current.target.x = e.clientX / window.innerWidth;
      mouseData.current.target.y = 1.0 - (e.clientY / window.innerHeight);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame((state, delta) => {
    if (distortionRef.current) {
      const ease = 0.1;
      const diffX = mouseData.current.target.x - mouseData.current.current.x;
      const diffY = mouseData.current.target.y - mouseData.current.current.y;
      mouseData.current.current.x += diffX * ease;
      mouseData.current.current.y += diffY * ease;

      distortionRef.current.uniforms.get("uMouse").value[0] = mouseData.current.current.x;
      distortionRef.current.uniforms.get("uMouse").value[1] = mouseData.current.current.y;
      
      const velocity = Math.sqrt(diffX*diffX + diffY*diffY);
      distortionRef.current.uniforms.get("uVelo").value = velocity;
    }
  });

  return (
    <EffectComposer disableNormalPass>
      <MouseDistortion ref={distortionRef} strength={0.4} />

      {/* MUDANÇA: Scanline com blend SCREEN para parecer luz */}
      <Scanline
        blendFunction={BlendFunction.SCREEN} 
        density={1.5}
        opacity={0.12} // Um pouco mais forte para aparecer no escuro
      />
       
      <Noise
        premultiply
        blendFunction={BlendFunction.SCREEN}
        opacity={0.3} 
      />

      <Vignette
        eskil={false}
        offset={0.1}
        darkness={0.6} // Um pouco mais escuro nos cantos
      />
    </EffectComposer>
  );
}

export default function ScreenEffects() {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-50">
      {/* Importante: gl={{ alpha: true }} para o fundo ser transparente */}
      <Canvas gl={{ alpha: true, antialias: false, stencil: false, depth: false }} dpr={[1, 2]}>
        <EffectsLogic />
      </Canvas>
    </div>
  );
}