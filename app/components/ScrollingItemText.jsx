import { React, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrlItemText () {
  const titleRef = useRef(null); // Separate ref for h1
  const paragraphRef = useRef(null); // Separate ref for p

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            end: "top 30%",
            scrub: true,
          },
        }
      );

      gsap.fromTo(
        paragraphRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: paragraphRef.current,
            start: "top 85%",
            end: "top 35%",
            scrub: true,
          },
        }
      );
    });

    return () => ctx.revert(); // Cleanup on unmount
  }, []);

  return (
    <div className="h-screen flex items-center justify-center bg-black">
      <div className="text-center text-white">
        <h1
          ref={titleRef}
          className="text-2xl md:text-4xl font-bold text-gray-300"
        >
          Reach Your Peak  Pyko Watches
        </h1>
        <p
          ref={paragraphRef}
          className="mt-2 text-lg md:text-xl text-orange-500"
        >
          Embody ambition and creativity, empowering those who strive for more and embrace their unique style.
        </p>
      </div>
    </div>
  );
};

 