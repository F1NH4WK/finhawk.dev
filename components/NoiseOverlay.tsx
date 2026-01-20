export default function NoiseOverlay() {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-50 opacity-[0.08] mix-blend-overlay">
      <div 
        className="w-[200%] h-[200%] absolute top-[-50%] left-[-50%] animate-noise"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: "150px 150px"
        }}
      ></div>
      
      {/* Adicionando a animação no style global ou tailwind config, 
          mas aqui vai um style inline para facilitar o copy-paste */}
      <style jsx>{`
        @keyframes noise {
          0% { transform: translate(0, 0); }
          10% { transform: translate(-5%, -5%); }
          20% { transform: translate(-10%, 5%); }
          30% { transform: translate(5%, -10%); }
          40% { transform: translate(-5%, 15%); }
          50% { transform: translate(-10%, 5%); }
          60% { transform: translate(15%, 0); }
          70% { transform: translate(0, 10%); }
          80% { transform: translate(-15%, 0); }
          90% { transform: translate(10%, 5%); }
          100% { transform: translate(5%, 0); }
        }
        .animate-noise {
          animation: noise 0.2s infinite steps(10); 
        }
      `}</style>
    </div>
  );
}