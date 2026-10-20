"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { Fragment, useEffect, useRef, useState, type ComponentProps, type PointerEvent, type ReactNode } from "react";
import type { HeadlineSegment } from "../data";
import { blurWord, EASE, reducedWord, stagger } from "./motion";

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);
  return matches;
}

export function Monogram({ initials, className = "h-10 w-10" }: { initials: string; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`${className} relative grid place-items-center rounded-xl border border-primary/30 bg-primary/10 shadow-glow-soft`}
    >
      <span className="font-display text-[0.85em] leading-none font-bold tracking-tight text-primary">{initials}</span>
      <span className="absolute -right-0.5 -bottom-0.5 h-1.5 w-1.5 rounded-full bg-tertiary shadow-glow-dot" />
    </span>
  );
}

const highlightStyles = {
  glow: "text-primary drop-shadow-[0_0_15px_rgba(62,230,176,0.4)]",
  italic: "italic text-primary",
  gradient: "gradient-flow",
};

const headingTags = { h1: motion.h1, h2: motion.h2 };

/** Headline whose words blur-and-rise in; a highlighted segment gets a plate, glow, italic or gradient treatment. */
export function AnimatedHeading({
  segments,
  highlight = "plate",
  blockLines = false,
  as = "h2",
  className = "",
}: {
  segments: HeadlineSegment[];
  highlight?: "plate" | keyof typeof highlightStyles;
  blockLines?: boolean;
  as?: keyof typeof headingTags;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const word = reduce ? reducedWord : blurWord;
  const Tag = headingTags[as];

  const words = (segment: HeadlineSegment, key: number, extra = "") =>
    segment.text.split(" ").map((w, i) => (
      // The space sits outside the inline-block; inside it would collapse at the box edge.
      <Fragment key={`${key}-${i}`}>
        <motion.span variants={word} className={`inline-block ${extra}`}>
          {w}
        </motion.span>{" "}
      </Fragment>
    ));

  return (
    <Tag variants={stagger(0.06)} className={className}>
      {segments.map((segment, i) => {
        const content =
          segment.highlight && highlight === "plate" ? (
            <motion.span
              variants={word}
              whileHover={reduce ? undefined : { rotate: 0, scale: 1.02 }}
              transition={{ duration: 0.4 }}
              className="mx-1 inline-block -rotate-1 rounded-xl border border-primary/20 bg-primary/5 px-3 text-primary italic shadow-glow backdrop-blur-sm"
            >
              {segment.text}
            </motion.span>
          ) : (
            words(segment, i, segment.highlight && highlight !== "plate" ? highlightStyles[highlight] : "")
          );
        return blockLines ? (
          <span key={i} className="block">
            {content}
          </span>
        ) : (
          <span key={i}>{content}</span>
        );
      })}
    </Tag>
  );
}

const buttonVariants = {
  primary: "bg-primary text-on-primary border-transparent hover:bg-primary-fixed shadow-glow hover:shadow-glow-lg",
  secondary:
    "bg-surface-container/50 text-on-surface border-outline-variant/30 backdrop-blur-md hover:bg-surface-container-high hover:border-primary/40",
  ghost: "bg-transparent text-primary border-transparent hover:bg-primary/10",
};

/** Pill button that leans toward the cursor and sweeps a shine across on hover. */
export function MagneticButton({
  variant = "primary",
  className = "",
  strength = 10,
  children,
  ...props
}: Omit<ComponentProps<typeof motion.a>, "children"> & {
  variant?: keyof typeof buttonVariants;
  strength?: number;
  children: ReactNode;
}) {
  const reduce = useReducedMotion();
  const coarse = useMediaQuery("(pointer: coarse)");
  const ref = useRef<HTMLAnchorElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 260, damping: 18, mass: 0.4 });
  const y = useSpring(my, { stiffness: 260, damping: 18, mass: 0.4 });

  const onMove = (e: PointerEvent<HTMLAnchorElement>) => {
    if (reduce || coarse || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width - 0.5) * strength * 2);
    my.set(((e.clientY - r.top) / r.height - 0.5) * strength);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.a
      ref={ref}
      style={{ x, y }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      whileTap={reduce ? undefined : { scale: 0.96 }}
      transition={{ duration: 0.3, ease: EASE }}
      className={[
        "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl border",
        "px-8 py-4 font-mono text-label-caps tracking-widest uppercase",
        "transition-colors duration-300",
        buttonVariants[variant],
        className,
      ].join(" ")}
      {...props}
    >
      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.a>
  );
}
