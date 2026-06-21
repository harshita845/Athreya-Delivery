import React, { useEffect, useState } from "react";
import LogoImage from "../../assets/Logo.png";

const SplashScreen = ({ onFinished }) => {
  const [percentage, setPercentage] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // 1. Percentage counter (1 second duration)
    const duration = 1000;
    const interval = 10;
    const step = 100 / (duration / interval);
    let current = 0;
    
    const timer = setInterval(() => {
      current += step;
      if (current >= 100) {
        setPercentage(100);
        clearInterval(timer);
      } else {
        setPercentage(Math.floor(current));
      }
    }, interval);

    // 2. Start exit animation at 1.4s
    const exitAnimTimeout = setTimeout(() => {
      setIsExiting(true);
    }, 1400);

    // 3. Complete and unmount splash screen at 1.8s
    const exitTimeout = setTimeout(() => {
      if (onFinished) onFinished();
    }, 1800);

    return () => {
      clearInterval(timer);
      clearTimeout(exitAnimTimeout);
      clearTimeout(exitTimeout);
    };
  }, [onFinished]);

  return (
    <div
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#070b19] select-none overflow-hidden font-sans transition-all duration-400 ease-out-expo ${
        isExiting ? "opacity-0 -translate-y-10 scale-95 pointer-events-none" : "opacity-100 translate-y-0 scale-100"
      }`}
    >
      {/* Premium background decorative blur blobs */}
      <div className="absolute w-[350px] h-[350px] sm:w-[500px] sm:h-[500px] rounded-full bg-[#3a2a83]/15 blur-[120px] -top-20 -left-20 pointer-events-none animate-pulse duration-[6s]" />
      <div className="absolute w-[350px] h-[350px] sm:w-[500px] sm:h-[500px] rounded-full bg-[#f15a24]/10 blur-[120px] -bottom-20 -right-20 pointer-events-none animate-pulse duration-[8s]" />
      
      {/* Grid lines pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)] pointer-events-none" />

      {/* Main Content Area */}
      <div className="flex flex-col items-center gap-6 z-10 text-center px-4 max-w-sm sm:max-w-md w-full">
        {/* Logo Container with glassmorphic backdrop - CSS animated */}
        <div 
          className="relative w-40 h-40 sm:w-52 sm:h-52 rounded-[2rem] bg-white/[0.03] backdrop-blur-md border border-white/10 shadow-[0_20px_50px_rgba(58,42,131,0.25)] flex items-center justify-center p-4 group overflow-hidden animate-logo-entry"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-[#3a2a83]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <img
            src={LogoImage}
            alt="Athreya Delivery Logo"
            className="w-full h-full object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.3)]"
          />
          
          {/* Logo sweep light effect */}
          <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white/10 opacity-40 shadow-2xl animate-[shimmer_2s_infinite]" />
        </div>

        {/* Brand Text */}
        <div className="flex flex-col gap-1.5 mt-2 animate-text-entry">
          <h1 className="text-2xl sm:text-3xl font-[1000] tracking-[0.12em] uppercase text-white flex items-center justify-center gap-2 drop-shadow-md animate-text-glow">
            <span className="text-white">ATHREYA</span>
            <span className="text-[#f15a24] bg-gradient-to-r from-[#f15a24] to-[#f97316] bg-clip-text text-transparent">DELIVERY</span>
          </h1>
          <p className="text-[10px] sm:text-xs font-black tracking-[0.35em] text-[#3a2a83] uppercase opacity-90">
            Freshness Guaranteed
          </p>
        </div>

        {/* Loader Section */}
        <div className="w-48 sm:w-56 flex flex-col items-center gap-3 mt-8 animate-fade-in">
          {/* Progress Bar Track */}
          <div className="relative w-full h-[3px] bg-white/10 rounded-full overflow-hidden">
            <div
              className="absolute left-0 top-0 h-full w-full bg-gradient-to-r from-[#3a2a83] via-[#8253d6] to-[#f15a24] origin-left rounded-full animate-progress-scale"
            />
          </div>
          {/* Progress Count */}
          <span className="text-[10px] sm:text-xs font-black tracking-widest text-white/50 uppercase leading-none">
            Loading {percentage}%
          </span>
        </div>
      </div>

      <style>{`
        .ease-out-expo {
          transition-timing-function: cubic-bezier(0.19, 1, 0.22, 1);
        }
        .animate-logo-entry {
          animation: logoEntry 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        .animate-text-entry {
          animation: textEntry 0.5s cubic-bezier(0.25, 1, 0.5, 1) 0.3s both;
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out 0.5s both;
        }
        .animate-progress-scale {
          animation: progressScale 1.0s cubic-bezier(0.25, 1, 0.5, 1) 0.4s forwards;
          transform-origin: left;
        }
        .animate-text-glow {
          animation: textGlow 1.2s ease-in-out infinite alternate;
        }
        @keyframes logoEntry {
          0% { opacity: 0; transform: scale(0.8); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes textEntry {
          0% { opacity: 0; transform: translateY(15px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes progressScale {
          0% { transform: scaleX(0); }
          100% { transform: scaleX(1); }
        }
        @keyframes textGlow {
          0% { text-shadow: 0 0 5px rgba(241, 90, 36, 0.2); }
          100% { text-shadow: 0 0 20px rgba(241, 90, 36, 0.6), 0 0 30px rgba(58, 42, 131, 0.4); }
        }
        @keyframes shimmer {
          0% { left: -150%; }
          100% { left: 150%; }
        }
      `}</style>
    </div>
  );
};

export default SplashScreen;
