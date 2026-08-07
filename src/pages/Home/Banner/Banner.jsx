import React, { useState, useEffect, useRef } from "react";
import { Users, GraduationCap, Award, TrendingUp } from "lucide-react";
import heroBg from "../../../assets/Campus Culture/6.png"; 

// Custom Counter Component without any npm packages
const AnimatedCounter = ({ targetNumber, duration = 2000 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp = null;
    let animationFrame;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // Easing function for smooth stop
      const easeOutQuad = (t) => t * (2 - t);
      
      setCount(Math.floor(easeOutQuad(progress) * targetNumber));

      if (progress < 1) {
        animationFrame = window.requestAnimationFrame(step);
      }
    };

    animationFrame = window.requestAnimationFrame(step);

    return () => window.cancelAnimationFrame(animationFrame);
  }, [targetNumber, duration]);

  return <span>{count.toLocaleString()}</span>;
};

const Banner = () => {
  const [inView, setInView] = useState(false);
  const statsRef = useRef(null);

  // Intersection Observer to trigger counting on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const stats = [
    {
      icon: <Users className="w-7 h-7 text-cyan-400" />,
      numericValue: 5000,
      suffix: "+",
      label: "STUDENTS",
      borderColor: "border-cyan-500",
    },
    {
      icon: <GraduationCap className="w-7 h-7 text-amber-400" />,
      numericValue: 50,
      suffix: "+",
      label: "TEACHERS",
      borderColor: "border-amber-400",
    },
    {
      icon: <Award className="w-7 h-7 text-cyan-400" />,
      numericValue: 22,
      suffix: "+",
      label: "YEARS EXPERIENCE",
      borderColor: "border-cyan-500",
    },
    {
      icon: <TrendingUp className="w-7 h-7 text-amber-400" />,
      numericValue: 95,
      suffix: "%",
      label: "PASS RATE",
      borderColor: "border-amber-400",
    },
  ];

  return (
    <div className="relative h-full pt-24 mb-24 min-h-screen flex flex-col justify-between">
      {/* Background Image Container with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-[2px]" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-11/12 md:w-5/6 mx-auto px-3 md:px-6 pt-16 md:pt-20 pb-16 flex-1 flex flex-col justify-center">
        <div className="max-w-2xl">
          {/* Badge */}
          <span className="inline-block bg-amber-400 text-slate-950 font-extrabold text-xs uppercase px-3.5 py-1.5 rounded-full tracking-wider mb-6 shadow-md">
            Est. 2004
          </span>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-4 leading-tight">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 bg-clip-text text-transparent">
              Ideal Commerce College
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-slate-300 text-sm sm:text-base md:text-lg mb-8 leading-relaxed">
            Empowering Students for a Better Future through rigorous academic tradition,
            cutting-edge research, and a community built on integrity.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 sm:gap-4">
            <button className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-sm sm:text-base px-6 sm:px-8 py-3 rounded-xl transition-all shadow-lg shadow-cyan-500/20 cursor-pointer">
              Apply Now
            </button>
            <button className="border border-slate-700 hover:border-slate-500 bg-slate-900/60 text-white font-bold text-sm sm:text-base px-6 sm:px-8 py-3 rounded-xl transition-all backdrop-blur-md cursor-pointer">
              Explore Departments
            </button>
          </div>
        </div>
      </div>

      {/* Overlapping Bottom Stat Cards */}
      <div ref={statsRef} className="relative z-20 w-11/12 md:w-5/6 mx-auto px-3 md:px-6 -mb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`bg-slate-900/90 backdrop-blur-md p-5 sm:p-6 rounded-2xl shadow-2xl text-center flex flex-col items-center justify-center border border-slate-800 border-b-4 ${stat.borderColor} transition-transform hover:-translate-y-1`}
            >
              <div className="mb-2 p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                {stat.icon}
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {inView ? (
                  <>
                    <AnimatedCounter targetNumber={stat.numericValue} />
                    {stat.suffix}
                  </>
                ) : (
                  `0${stat.suffix}`
                )}
              </h3>
              <p className="text-[10px] sm:text-xs font-extrabold text-slate-400 tracking-widest uppercase mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Banner;