"use client";

import React, { forwardRef, useMemo } from "react";
import { Uniform } from "three";
import { Effect } from "postprocessing";

// 1. O Shader (A matemática visual)
// Fragment Shader: Calcula a distância do pixel atual até o mouse e distorce a UV.
const fragmentShader = `
  uniform vec2 uMouse;
  uniform float uVelo;
  uniform float uStrength;

  void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
    // Calcula a distância entre o pixel atual e o mouse
    float dist = distance(uv, uMouse);
    
    // Cria uma área de efeito circular (raio 0.25)
    // O smoothstep suaviza as bordas do círculo
    float decay = smoothstep(0.25, 0.0, dist);
    
    // Direção da distorção (do centro do mouse para fora)
    vec2 dir = normalize(uv - uMouse);
    
    // Calcula a nova posição do pixel (UV distorcido)
    // Misturamos um pouco de aberração cromática (separar R, G, B) baseado na velocidade
    vec2 distortedUV = uv - dir * decay * uStrength;
    
    // Lê a cor da textura na posição distorcida
    vec4 color = texture2D(inputBuffer, distortedUV);

    // Efeito extra: Separação de cores (RGB Shift) nas bordas da distorção
    float rgbShift = decay * uStrength * 0.5;
    float r = texture2D(inputBuffer, distortedUV + vec2(rgbShift, 0.0)).r;
    float g = texture2D(inputBuffer, distortedUV).g;
    float b = texture2D(inputBuffer, distortedUV - vec2(rgbShift, 0.0)).b;

    outputColor = vec4(r, g, b, 1.0);
  }
`;

// 2. A Classe de Efeito do PostProcessing
class DistortionEffectImpl extends Effect {
  constructor({ strength = 0.2 }) {
    super("DistortionEffect", fragmentShader, {
      uniforms: new Map([
        ["uMouse", new Uniform(new Float32Array([0.5, 0.5]))],
        ["uStrength", new Uniform(strength)],
        ["uVelo", new Uniform(0)]
      ]),
    });
  }

  update(renderer, inputBuffer, deltaTime) {
    // Nada complexo aqui, atualizamos via React
  }
}

// 3. O Componente React para usar no Canvas
const MouseDistortion = forwardRef(({ strength = 0.15 }, ref) => {
  const effect = useMemo(() => new DistortionEffectImpl({ strength }), [strength]);
  return <primitive ref={ref} object={effect} dispose={null} />;
});

export default MouseDistortion;