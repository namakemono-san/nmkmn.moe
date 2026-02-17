import { useState } from "react";
import { AVATAR_URL } from "../constants";

function SplashScreen({ onEnter }: { onEnter: () => void }) {
  const [fading, setFading] = useState(false);

  const handleClick = () => {
    setFading(true);
    setTimeout(onEnter, 600);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex cursor-pointer flex-col items-center justify-center bg-black transition-opacity duration-500 ${fading ? "opacity-0 pointer-events-none" : "opacity-100"}`}
      onClick={handleClick}
    >
      <div className="absolute inset-0 bg-linear-to-br from-blue-900/30 via-black to-cyan-900/20" />

      <div className="relative flex flex-col items-center gap-6">
        <img
          src={AVATAR_URL}
          alt="なまけもの (namakemono)"
          className="h-24 w-24 rounded-full border-2 border-white/10 shadow-lg animate-float"
        />
        <h1 className="text-2xl font-bold tracking-tight text-white/90">
          なまけもの (namakemono)
        </h1>
        <p className="animate-pulse text-sm text-white/40">
          Click anywhere to enter
        </p>
      </div>
    </div>
  );
}

export default SplashScreen;
