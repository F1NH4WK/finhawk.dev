"use client";

import { useState, useEffect } from "react";

interface LocationData {
  lat: string | number;
  lon: string | number;
  city: string;
  country: string;
  latDir: string;
  lonDir: string;
}

export default function UserCoordinates() {
  const [locationData, setLocationData] = useState<LocationData>({
    lat: "00.0000",
    lon: "00.0000",
    city: "SEARCHING...",
    country: "---",
    latDir: "N",
    lonDir: "W"
  });
  
  const [loading, setLoading] = useState(true);
  const [errorMode, setErrorMode] = useState(false);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response1 = await fetch("https://ipapi.co/json/");
        if (response1.ok) {
          const data = await response1.json();
          if (data.latitude && data.longitude) {
            processLocation(data.latitude, data.longitude, data.city, data.country_code);
            return;
          }
        }
        throw new Error("API 1 falhou");
      } catch (err) {
        try {
          await new Promise(r => setTimeout(r, 200)); 
          const response2 = await fetch("https://ipwho.is/");
          if (response2.ok) {
            const data = await response2.json();
            if (data.success) {
              processLocation(data.latitude, data.longitude, data.city, data.country_code);
              return;
            }
          }
          throw new Error("API 2 falhou");
        } catch (err2) {
          handleError();
        }
      }
    };

    const processLocation = (lat: number, lon: number, city: string, country: string) => {
      setTimeout(() => {
        setLocationData({
          lat: Math.abs(lat).toFixed(4),
          lon: Math.abs(lon).toFixed(4),
          latDir: lat >= 0 ? "N" : "S",
          lonDir: lon >= 0 ? "E" : "W",
          city: city ? city.toUpperCase() : "UNKNOWN",
          country: country ? country : "---"
        });
        setLoading(false);
      }, 1000);
    };

    const handleError = () => {
      setTimeout(() => {
        setLocationData({
          lat: "XX.XXXX",
          lon: "XX.XXXX",
          city: "ENCRYPTED",
          country: "UNK",
          latDir: "?",
          lonDir: "?"
        });
        setLoading(false);
        setErrorMode(true);
      }, 500);
    };

    fetchLocation();
  }, []);

  return (
    <div className="font-mono text-[10px] md:text-xs text-white/60 leading-tight">
      <div className="flex flex-col items-end">
        <div className="flex items-center gap-2 mb-1">
          <span className={`w-2 h-2 rounded-full ${
            loading ? "bg-yellow-500 animate-ping" : 
            errorMode ? "bg-red-500 animate-pulse" : "bg-green-500 shadow-[0_0_8px_#22c55e]"
          }`}></span>
          <span className={`tracking-widest font-bold ${errorMode ? "text-red-500" : ""}`}>
            {loading ? "TRIANGULATING SIGNAL..." : errorMode ? "SIGNAL MASKED / VPN" : "TARGET LOCKED"}
          </span>
        </div>

        <div className={`flex flex-col items-end transition-opacity duration-1000 ${loading ? "opacity-0" : "opacity-80"}`}>
          <div>
            <span className="text-white/40 mr-2">LAT:</span> 
            {locationData.lat}° {locationData.latDir}
          </div>
          <div>
            <span className="text-white/40 mr-2">LNG:</span> 
            {locationData.lon}° {locationData.lonDir}
          </div>
          <div className={`mt-1 font-bold ${errorMode ? "text-gray-500" : "text-red-500"}`}>
            [{locationData.city}, {locationData.country}]
          </div>
        </div>
      </div>
    </div>
  );
}