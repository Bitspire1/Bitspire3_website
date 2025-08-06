"use client";
import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";


const logos = [
  { src: "/Nextjs.svg", alt: "Next.js Logo", useBrightness: false },
  { src: "/React.svg", alt: "React Logo", useBrightness: true },
  { src: "/TypeScript.svg", alt: "TypeScript Logo", useBrightness: false },
  { src: "/Vercel_logo.svg", alt: "Vercel Logo", useBrightness: false },
  { src: "/Tailwind_CSS.svg", alt: "Tailwind CSS Logo", useBrightness: true },
  { src: "/Vite.svg", alt: "Vite Logo", useBrightness: true },
  { src: "/Stripe.svg", alt: "Stripe Logo", useBrightness: false },
];

const LOGO_WIDTH = 140; // 80px image + 60px gap

const Technology: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [logoCount, setLogoCount] = useState(logos.length * 8);
  const [positions, setPositions] = useState<number[]>([]);
  
  // Animation state
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
	// Calculate how many logos are needed to fill the container + buffer
	const updateLogoCount = () => {
	  const containerWidth = containerRef.current?.offsetWidth || 2200;
	  const minCount = Math.ceil(containerWidth / LOGO_WIDTH) + logos.length * 5;
	  setLogoCount(minCount);
	  setPositions(Array.from({ length: minCount }, (_, i) => i * LOGO_WIDTH));
	};
	updateLogoCount();
	window.addEventListener("resize", updateLogoCount);
	return () => window.removeEventListener("resize", updateLogoCount);
  }, []);

  useEffect(() => {
	let animationFrame: number;
	const animate = () => {
	  setPositions((prev) => {
		return prev.map((pos) => {
		  let newPos = pos - 0.4; // zmniejszona prędkość
		  if (newPos < -LOGO_WIDTH) {
			// Move logo to the right side
			const maxPos = Math.max(...prev);
			newPos = maxPos + LOGO_WIDTH;
		  }
		  return newPos;
		});
	  });
	  animationFrame = requestAnimationFrame(animate);
	};
	
	// Start animation only if visible and not in reduced motion
	if (visible && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
	  animationFrame = requestAnimationFrame(animate);
	}
	
	return () => {
	  if (animationFrame) {
		cancelAnimationFrame(animationFrame);
	  }
	};
  }, [visible, logoCount]);

  useEffect(() => {
	if (visible) return;
	const node = sectionRef.current;
	if (!node) return;
	const observer = new window.IntersectionObserver(
	  ([entry]) => {
		if (entry.isIntersecting) {
		  setVisible(true);
		  observer.disconnect();
		}
	  },
	  { threshold: 0.15 }
	);
	observer.observe(node);
	return () => observer.disconnect();
  }, [visible]);

  return (
	<section
	  ref={sectionRef}
	  className={`w-full py-8 px-0 relative overflow-hidden
		transition-all duration-700 ease-[cubic-bezier(.4,0,.2,1)] will-change-transform will-change-opacity
		${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
	  `}
	>
	  <div className="w-full">
		<div
		  className="relative mx-auto h-20 flex items-center overflow-hidden"
		  style={{
			maxWidth: '1600px',
			WebkitMaskImage:
			  'linear-gradient(to right, transparent 0px, black 64px, black calc(100% - 64px), transparent 100%)',
			maskImage:
			  'linear-gradient(to right, transparent 0px, black 64px, black calc(100% - 64px), transparent 100%)'
		  }}
		  ref={containerRef}
		>
		  <div className="absolute left-0 top-0 w-full h-full" style={{ pointerEvents: "none" }}>
			{positions.map((pos, i) => {
			  const { src, alt, useBrightness } = logos[i % logos.length];
			  return (
				<span
				  key={i}
				  role="listitem"
				  className="marquee-item"
				  style={{
					position: "absolute",
					left: `${pos}px`,
					top: "50%",
					transform: "translateY(-50%)",
					width: "80px",
					display: "flex",
					justifyContent: "center"
				  }}
				>
				  <Image
					src={src}
					alt={alt}
					width={80}
					height={60}
					className={`h-12 w-auto object-contain ${
					  useBrightness 
						? "grayscale brightness-200 contrast-75 opacity-70"
						: "brightness-0 invert opacity-60"
					}`}
					loading="lazy"
					sizes="80px"
				  />
				</span>
			  );
			})}
		  </div>
		</div>
	  </div>
	</section>
  );
};


export default Technology;

