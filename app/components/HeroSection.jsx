'use client';

import {useLayoutEffect, useRef, useEffect} from 'react';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import badgePk2White from '../assets/badge-PK-2-white.png';
import group3 from '../assets/group-3.png';
import watchReference from '../assets/watch-reference.png';
import bg1 from '../assets/bg1.png';
import logoWhite from '../assets/logo-white-2.png';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
  const textRef = useRef(null);
  const textRef2 = useRef(null);
  const taglineRef = useRef(null);
  const watchRef = useRef(null);
  const containerRef = useRef(null);

 
  useEffect(() => {
    if (typeof window !== "undefined") { // Ensures it runs only on client
      const ctx = gsap.context(() => {
        // Initial setup - text starts behind watch
        gsap.set(textRef.current, { zIndex: 0, y: "-1%" });
        gsap.set(textRef2.current, { zIndex: 0, y: "1%" });
  
        // Animation timeline
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
            pin: true,
            pinSpacing: true,
          },
        });
  
        // Animate Reflection Disappearance
        tl.to(textRef2.current, {
          opacity: 0,
          zIndex: 0,
          duration: 0.5,
        });
  
        // Animate PYKO text
        tl.to(textRef.current, {
          y: "-60%",
          scale: 0.6,
          zIndex: 0,
          duration: 1,
        });
  
        // Animate tagline to appear
        tl.to(
          taglineRef.current,
          {
            opacity: 1,
            y: "-100%",
            duration: 0.5,
          },
          "-=1.5"
        );
  
        // Subtle watch animation
        tl.to(
          watchRef.current,
          {
            y: "5%",
            scale: 0.95,
            duration: 2,
          },
          "-=1.5"
        );
      }, containerRef);
  
      return () => ctx.revert(); // Clean up animation on unmount
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen bg-gradient-to-b from-orange-900 to-black 
      flex items-center justify-center overflow-hidden "
      style={{
        backgroundImage: `url(${bg1})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* PYKO Logo (Animated on Scroll) */}
      {/* <h1 ref={textRef} className="absolute text-white text-8xl lg:text-[12rem] font-serif tracking-wide">
        PYKO
      </h1> */}
      <div className="absolute flex flex-col items-center">
        {/* Original Image */}
        <img
          ref={textRef}
          src={logoWhite}
          alt="PYKO Watch"
          className=" w-[800px] h-auto object-contain"
        />

        {/* Mirrored Reflection Image */}
        <img
          ref={textRef2}
          src={logoWhite}
          alt="PYKO Watch Reflection"
          className=" w-[800px] h-auto object-contain opacity-10 scale-y-[-1] -mt-1 blur-[10px]"
        />
      </div>
      
      {/* Watch Image */}
      <div
        ref={watchRef}
        className="relative w-[300px] md:w-[500px] lg:w-[900px] z-10 flex items-center justify-center"
      >
        {/* Using a placeholder for the watch image */}
        <img
          src={watchReference}
          alt="PYKO Watch"
          className="w-[700px] h-auto object-contain"
        />
        
      </div>

      {/* Tagline */}
      <p
        ref={taglineRef}
        className="absolute text-white text-lg lg:text-2xl opacity-0 transform translate-y-8"
        style={{top: 'calc(100% - 120px)'}}
      >
      Time Redesigned.
      </p>
      {/* Floating Icons - Using placeholders */}
      {/* <div className="absolute w-7 md:w-7 top-6 left-6 z-30">
        <img src={group3} alt="Group Icon" className="w-full h-auto" />
      </div>
      <div className="absolute w-12 md:w-16 top-6 right-6 z-30">
        <img src={badgePk2White} alt="Badge PK" className="w-full h-auto" />
      </div> */}
    </div>
  );
}
