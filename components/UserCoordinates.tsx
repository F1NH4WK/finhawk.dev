"use client";

import { useState, useEffect } from "react";

export default function UserCoordinates() {
  const [locationData, setLocationData] = useState({
    lat: "00.0000",
    lon: "00.0000",
    city: "SEARCHING...",
    country: "---"
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Usamos a API gratuita do ipapi.co (não precisa de chave para baixo volume)
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => {
        // Pequeno delay artificial para parecer "processamento de dados"
        setTimeout(() => {
          setLocationData({
            lat: data.latitude ? data.latitude.toFixed(4) : "UNKNOWN",
            lon: data.longitude ? data.longitude.toFixed(4) : "UNKNOWN",
            city: data.city ? data.city.toUpperCase() : "UNKNOWN",
            country: data.country_code ? data.country_code : "---"
          });
          setLoading(false);
        }, 1500);
      })
      .catch(() => {
        // Fallback caso o bloqueador de anúncios bloqueie a API
        setLocationData({
          lat: "ERR_404",
          lon: "ERR_404",
          city: "CLOAKED",
          country: "N/A"
        });
        setLoading(false);
      });
  }, []);

  return (
    <div className="font-mono text-[10px] md:text-xs text-white/60 leading-tight">
      <div className="flex flex-col items-end">
        {/* Status de Rastreamento */}
        <div className="flex items-center gap-2 mb-1">
          <span className={`w-2 h-2 rounded-full ${loading ? "bg-yellow-500 animate-ping" : "bg-green-500"}`}></span>
          <span className="tracking-widest font-bold">
            {loading ? "TRIANGULATING SIGNAL..." : "TARGET LOCKED"}
          </span>
        </div>

        {/* Dados de Coordenada */}
        <div className="flex flex-col items-end opacity-80">
          <div>
            <span className="text-white/40 mr-2">LAT:</span> 
            {locationData.lat}° N
          </div>
          <div>
            <span className="text-white/40 mr-2">LNG:</span> 
            {locationData.lon}° W
          </div>
          <div className="mt-1 text-red-500 font-bold">
            [{locationData.city}, {locationData.country}]
          </div>
        </div>
      </div>
    </div>
  );
}