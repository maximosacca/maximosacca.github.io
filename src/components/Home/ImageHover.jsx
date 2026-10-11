import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const LAYERS = 10;
const DURATION = 0.8;
const STAGGER = 0.1;
const EASE = "power2.inOut";
const SCALE_STEP = 0.06; // cuánto se achica cada capa
const FOLLOW = 0.15; // intensidad del parallax

// Color: la capa base en grises, las de arriba cada vez más a color
const getFilter = (i) => {
  if (i === 0) return "grayscale(1)";
  const ci = Math.min(i * 0.15, 1);
  return `grayscale(${1 - ci}) saturate(${1 + ci * 0.5})`;
};

export default function ImageHover({ src, alt = "" }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const layers = Array.from(container.querySelectorAll(".image-layer"));

    const ctx = gsap.context(() => {
      layers.forEach((layer, i) => {
        layer.style.filter = getFilter(i);
      });

      // estado de reposo: solo se ve la capa base
      gsap.set(layers, {
        scale: (i) => (i === 0 ? 1 : 0.95),
        opacity: (i) => (i === 0 ? 1 : 0),
      });

      // al hacer hover, las capas aparecen una tras otra, cada una más chica
      const timeline = gsap.timeline({ paused: true }).to([...layers].reverse(), {
        scale: (i, target) =>
          Math.max(1 - SCALE_STEP * layers.indexOf(target), 0),
        opacity: 1,
        duration: DURATION,
        ease: EASE,
        stagger: STAGGER,
      });

      // parallax: las capas de arriba se mueven más que las de abajo
      const quickTos = layers.slice(1).map((layer, k) => {
        const i = k + 1;
        const sv = 1 - SCALE_STEP * i;
        return {
          mult: sv > 0 ? (1 - sv) * 3 + 0.2 : 1,
          xTo: gsap.quickTo(layer, "x", { duration: 0.6, ease: "power3" }),
          yTo: gsap.quickTo(layer, "y", { duration: 0.6, ease: "power3" }),
        };
      });

      const onEnter = () => timeline.play();

      const onLeave = () => {
        timeline.reverse();
        quickTos.forEach(({ xTo, yTo }) => {
          xTo(0);
          yTo(0);
        });
      };

      const onMove = (e) => {
        const r = container.getBoundingClientRect();
        const rx = (e.clientX - r.left) / r.width - 0.5;
        const ry = (e.clientY - r.top) / r.height - 0.5;
        quickTos.forEach(({ xTo, yTo, mult }) => {
          xTo(rx * 2 * r.width * FOLLOW * mult);
          yTo(ry * 2 * r.height * FOLLOW * mult);
        });
      };

      container.addEventListener("mouseenter", onEnter);
      container.addEventListener("mouseleave", onLeave);
      container.addEventListener("mousemove", onMove);

      return () => {
        container.removeEventListener("mouseenter", onEnter);
        container.removeEventListener("mouseleave", onLeave);
        container.removeEventListener("mousemove", onMove);
      };
    }, container);

    return () => ctx.revert();
  }, [src]);

  return (
    <div
      ref={containerRef}
      className="image-container"
      role="img"
      aria-label={alt}
    >
      {Array.from({ length: LAYERS }, (_, i) => (
        <div
          key={i}
          className="image-layer"
          aria-hidden="true"
          style={{ backgroundImage: `url(${src})` }}
        />
      ))}
    </div>
  );
}