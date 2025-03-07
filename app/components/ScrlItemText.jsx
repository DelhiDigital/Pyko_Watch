import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrlItemText() {
  const textRef = useRef([]);
  const containerRef = useRef(null);
  const orangeBarRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      let ctx = gsap.context(() => {
        // Animate text from bottom to center
        gsap.fromTo(
          textRef.current,
          {
            opacity: 0,
            y: 150, // Starts from bottom
          },
          {
            opacity: 1,
            y: 0, // Moves to center
            duration: 2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 90%",
              end: "top 40%",
              scrub: true,
            },
          }
        );

        // Reveal text gradually (half-hidden initially)
        textRef.current.forEach((el, index) => {
          gsap.fromTo(
            el,
            {
              opacity: 0,
              y: 80,
              backgroundSize: "200% 200%",
              backgroundPosition: "0% 100%",
            },
            {
              opacity: 1,
              y: 0,
              backgroundPosition: "0% 0%",
              duration: 1.5,
              ease: "power2.out",
              scrollTrigger: {
                trigger: el,
                start: "top bottom",
                end: "top 30%",
                scrub: true,
                onUpdate: (self) => {
                  const progress = self.progress * 100;
                  gsap.to(el, {
                    backgroundPosition: `0% ${100 - progress}%`,
                  });
                },
                onLeave: () => gsap.to(el, { color: "#ffffff", duration: 0.5 }),
              },
            }
          );
        });

        // Animate orange bar after text reveal
        gsap.fromTo(
          orangeBarRef.current,
          {
            opacity: 0,
            width: "0%",
          },
          {
            opacity: 1,
            width: "100px", // Adjust size as per design
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 40%",
              end: "top 20%",
              scrub: true,
            },
          }
        );
      }, containerRef);

      return () => ctx.revert(); // Cleanup GSAP context
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-screen flex flex-col items-center justify-center bg-black relative overflow-hidden"
    >
      {/* Scrolling Text Section */}
      <div className="text-center w-[70%] md:w-[50%] lg:w-[40%] leading-[1.4]">
        <p
          ref={(el) => (textRef.current[0] = el)}
          className="text-2xl md:text-3xl font-bold bg-gradient-to-b from-white via-[#FF5F2E] to-black text-transparent bg-clip-text"
        >
          Reach Your Peak – Pyko Watches
        </p>
        <p
          ref={(el) => (textRef.current[1] = el)}
          className="text-xl md:text-2xl font-medium bg-gradient-to-b from-white via-[#FF5F2E] to-black text-transparent bg-clip-text"
        >
          Embody ambition and creativity,
        </p>
        <p
          ref={(el) => (textRef.current[2] = el)}
          className="text-xl md:text-2xl font-medium bg-gradient-to-b from-white via-[#FF5F2E] via-brown-600 to-black text-transparent bg-clip-text"
        >
          Empowering those who strive for more
        </p>
        <p
          ref={(el) => (textRef.current[3] = el)}
          className="text-xl md:text-2xl font-medium bg-gradient-to-b from-white via-[#FF5F2E] via-brown-600 to-black text-transparent bg-clip-text"
        >
          And embrace their unique style.
        </p>
      </div>

      {/* Orange Bar at Bottom */}
      <div
        ref={orangeBarRef}
        className="mt-50 h-6  bg-[#FF5F2E] opacity-0 "
        style={{ width: "150px" }}
      ></div>
    </div>
  );
}