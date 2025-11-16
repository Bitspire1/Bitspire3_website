"use client";
import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";


const logos = [
  { src: "/logo/Nextjs.svg", alt: "Next.js Logo", useBrightness: false },
  { src: "/logo/React.svg", alt: "React Logo", useBrightness: true },
  { src: "/logo/TypeScript.svg", alt: "TypeScript Logo", useBrightness: false },
  { src: "/logo/Vercel_logo.svg", alt: "Vercel Logo", useBrightness: false },
  { src: "/logo/Tailwind_CSS.svg", alt: "Tailwind CSS Logo", useBrightness: true },
  { src: "/logo/Vite.svg", alt: "Vite Logo", useBrightness: true },
  { src: "/logo/Stripe.svg", alt: "Stripe Logo", useBrightness: false },
	{ src: "/logo/Docker.svg", alt: "Docker Logo", useBrightness: false },
];

const LOGO_WIDTH = 140; // 80px image + 60px gap
const SPEED = 0.4; // px per frame

const Technology: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
	const [logoCount, setLogoCount] = useState(logos.length * 8);
	// animation state stored in refs to avoid React re-renders on every frame
	const positionsRef = useRef<number[]>([]);
	const rafRef = useRef<number | null>(null);
	const itemsRef = useRef<Array<HTMLSpanElement | null>>([]);
	const lastWidthRef = useRef<number>(0);
	const resizeTimeoutRef = useRef<number | null>(null);
  
  // Animation state
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
		// Calculate how many logos are needed to fill the container + buffer
		const computeCount = () => {
			const vw = window.visualViewport?.width || window.innerWidth || 2200;
			// ignore tiny changes that occur when mobile address bar hides/shows
			if (Math.abs(vw - lastWidthRef.current) < 10 && positionsRef.current.length) return;
			lastWidthRef.current = vw;
			const minCount = Math.ceil(vw / LOGO_WIDTH) + logos.length * 5;
			setLogoCount((prev) => (prev === minCount ? prev : minCount));
			// initialize or preserve a smooth offset
			if (!positionsRef.current.length) {
				positionsRef.current = Array.from({ length: minCount }, (_, i) => i * LOGO_WIDTH);
			} else {
				const base = positionsRef.current[0];
				positionsRef.current = Array.from({ length: minCount }, (_, i) => base + i * LOGO_WIDTH);
			}
		};

		const onResize = () => {
			if (resizeTimeoutRef.current) window.clearTimeout(resizeTimeoutRef.current);
			resizeTimeoutRef.current = window.setTimeout(() => computeCount(), 120) as unknown as number;
		};

		computeCount();
		window.visualViewport?.addEventListener("resize", onResize);
		window.addEventListener("resize", onResize);
		return () => {
			window.visualViewport?.removeEventListener("resize", onResize);
			window.removeEventListener("resize", onResize);
			if (resizeTimeoutRef.current) window.clearTimeout(resizeTimeoutRef.current);
		};
  }, []);

  useEffect(() => {
		// per-frame transform updates (no React state churn)
		const step = () => {
			const arr = positionsRef.current;
			if (!arr.length) {
				rafRef.current = requestAnimationFrame(step);
				return;
			}
			// compute max only once per frame
			let maxPos = -Infinity;
			for (let i = 0; i < arr.length; i++) if (arr[i] > maxPos) maxPos = arr[i];

			for (let i = 0; i < arr.length; i++) {
				let p = arr[i] - SPEED;
				if (p < -LOGO_WIDTH) p = maxPos + LOGO_WIDTH;
				arr[i] = p;
				const el = itemsRef.current[i];
				if (el) el.style.transform = `translate3d(${p}px, -50%, 0)`;
			}
			rafRef.current = requestAnimationFrame(step);
		};

		if (visible && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
			// initialize transforms immediately to avoid flicker
			for (let i = 0; i < positionsRef.current.length; i++) {
				const el = itemsRef.current[i];
				if (el) el.style.transform = `translate3d(${positionsRef.current[i]}px, -50%, 0)`;
			}
			rafRef.current = requestAnimationFrame(step);
		}

		return () => {
			if (rafRef.current) cancelAnimationFrame(rafRef.current);
			rafRef.current = null;
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
			// slide-in animation removed as requested; keep minimal will-change for performance
			className={`w-full py-8 px-0 relative overflow-hidden will-change-transform`}
		>
	  <div className="w-full">
		<div
		  className="relative mx-auto h-20 flex items-center overflow-hidden"
		  style={{
			maxWidth: '1600px',
						minHeight: '5rem',
			WebkitMaskImage:
			  'linear-gradient(to right, transparent 0px, black 64px, black calc(100% - 64px), transparent 100%)',
			maskImage:
			  'linear-gradient(to right, transparent 0px, black 64px, black calc(100% - 64px), transparent 100%)'
		  }}
		  ref={containerRef}
		>
		  <div className="absolute left-0 top-0 w-full h-full" role="list" aria-label="Technologie" style={{ pointerEvents: "none" }}>
			{Array.from({ length: logoCount }).map((_, i) => {
			  const { src, alt, useBrightness } = logos[i % logos.length];
			  return (
				<span
				  key={i}
				  role="listitem"
									ref={(el) => {
										itemsRef.current[i] = el;
									}}
				  className="marquee-item transform-gpu will-change-transform"
				  style={{
					position: "absolute",
					left: 0,
					top: "50%",
					transform: `translate3d(${positionsRef.current[i] ?? i * LOGO_WIDTH}px, -50%, 0)`,
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

