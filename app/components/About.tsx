"use client";

import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { useState, type ReactNode } from "react";
import { about, profile, type Accent } from "../data";
import Icon from "./Icon";
import { EASE, fadeUp, stagger } from "./motion";
import { AnimatedHeading } from "./ui";

export default function About() {
  return (
    <section
      id="about"
      className="section-x relative mt-16 flex w-full flex-col gap-12 pb-16 @3xl:mt-section-gap @3xl:gap-section-gap @3xl:pb-section-gap"
    >
      <motion.div
        variants={stagger(0.1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-15%" }}
        className="grid grid-cols-1 items-center gap-10 @4xl:min-h-[560px] @4xl:grid-cols-12 @4xl:gap-gutter"
      >
        <div className="relative z-10 flex flex-col justify-center @4xl:col-span-5">
          <AnimatedHeading
            segments={about.headline}
            highlight="glow"
            blockLines
            className="mb-6 font-display text-[clamp(2.1rem,6.5cqw,3.6rem)] leading-[1.05] font-bold tracking-tight text-on-surface @4xl:text-[clamp(2.1rem,4.4cqw,3.6rem)]"
          />
          <motion.p variants={fadeUp} className="max-w-xl border-l border-outline-variant pl-4 text-body-md text-on-surface-variant">
            {about.body}
          </motion.p>
        </div>
        <div className="@xl:hidden">
          <PortraitCard />
        </div>
        <div className="hidden @xl:block @4xl:col-span-7">
          <PracticeDiagram />
        </div>
      </motion.div>
      <Principles />
    </section>
  );
}

const SIZE = 400;
const C = SIZE / 2;
const ORBIT = 132;
const NODE_R = 22;
const CORE_R = 34;

const nodeColors: Record<Accent, { dot: string; line: string; ring: string }> = {
  primary: { dot: "fill-primary-fixed", line: "stroke-primary", ring: "stroke-primary/60" },
  secondary: { dot: "fill-secondary-fixed", line: "stroke-secondary", ring: "stroke-secondary/60" },
  tertiary: { dot: "fill-tertiary-fixed", line: "stroke-tertiary", ring: "stroke-tertiary/60" },
};

const draw: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  show: (delay = 0) => ({
    pathLength: 1,
    opacity: 1,
    transition: { pathLength: { duration: 1.1, ease: EASE, delay }, opacity: { duration: 0.3, delay } },
  }),
};

/** Triangle of practice areas around a monogram core; lines draw in and a hovered node highlights its spoke. */
function PracticeDiagram() {
  const reduce = useReducedMotion();
  const [hovered, setHovered] = useState<string | null>(null);
  const { nodes, center, spinSeconds } = about.diagram;

  const points = nodes.map((n, i) => {
    const angle = ((-90 + (360 / nodes.length) * i) * Math.PI) / 180;
    const x = C + ORBIT * Math.cos(angle);
    const y = C + ORBIT * Math.sin(angle);
    return { ...n, x, y, labelY: y < C ? y - NODE_R - 12 : y + NODE_R + 22 };
  });
  const outline = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ") + " Z";

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-15%" }}
      className="group relative flex items-center justify-center rounded-[40px] border border-outline-variant/40 bg-white/3 p-8 shadow-glow-soft backdrop-blur-xl"
    >
      <div className="pointer-events-none absolute inset-0 rounded-[40px] bg-primary/15 opacity-20 blur-3xl transition-opacity duration-700 group-hover:opacity-40" />
      <div className="relative aspect-square w-full max-w-[500px]">
        <svg
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          className="h-full w-full overflow-visible"
          role="img"
          aria-label={`Practice map: ${nodes.map((n) => n.label).join(", ")}`}
        >
          <defs>
            <filter id="node-glow">
              <feGaussianBlur stdDeviation="4" result="blurred" />
              <feMerge>
                <feMergeNode in="blurred" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <motion.path
            d={outline}
            variants={draw}
            custom={0.1}
            fill="rgba(255,255,255,0.02)"
            strokeDasharray="4 4"
            strokeWidth="2"
            className="stroke-outline-variant/70"
          />
          {points.map((p, i) => {
            const on = hovered === p.id;
            return (
              <motion.path
                key={`spoke-${p.id}`}
                d={`M ${p.x} ${p.y} L ${C} ${C}`}
                variants={draw}
                custom={0.3 + i * 0.12}
                strokeWidth={on ? 4 : 1}
                className={`transition-all duration-500 ${on ? nodeColors[p.accent].line : "stroke-outline-variant"} ${hovered && !on ? "opacity-20" : "opacity-100"}`}
              />
            );
          })}
          {points.map((p, i) => (
            <motion.g
              key={p.id}
              variants={{
                hidden: { opacity: 0, scale: 0.5 },
                show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: EASE, delay: 0.6 + i * 0.12 } },
              }}
              whileHover={reduce ? undefined : { scale: 1.12 }}
              onHoverStart={() => setHovered(p.id)}
              onHoverEnd={() => setHovered(null)}
              onFocus={() => setHovered(p.id)}
              onBlur={() => setHovered(null)}
              tabIndex={0}
              className="cursor-pointer [transform-box:fill-box] [transform-origin:center]"
            >
              <circle
                cx={p.x}
                cy={p.y}
                r={NODE_R}
                strokeWidth="2"
                className={`fill-surface-container-high transition-colors duration-300 ${hovered === p.id ? nodeColors[p.accent].ring : "stroke-outline-variant"}`}
              />
              <circle cx={p.x} cy={p.y} r="4" filter="url(#node-glow)" className={nodeColors[p.accent].dot} />
              <text
                x={p.x}
                y={p.labelY}
                textAnchor="middle"
                className={`font-mono text-label-caps tracking-widest uppercase transition-colors duration-300 ${hovered === p.id ? "fill-on-surface" : "fill-on-surface-variant"}`}
              >
                {p.label}
              </text>
            </motion.g>
          ))}
          <motion.g
            variants={{
              hidden: { opacity: 0, scale: 0.6 },
              show: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: EASE, delay: 0.2 } },
            }}
            className="[transform-box:fill-box] [transform-origin:center]"
          >
            <motion.circle
              cx={C}
              cy={C}
              r={CORE_R + 13}
              fill="none"
              strokeDasharray="2 4"
              strokeWidth="1"
              className="stroke-primary opacity-30 [transform-box:fill-box] [transform-origin:center]"
              animate={reduce ? undefined : { rotate: 360 }}
              transition={{ duration: spinSeconds, ease: "linear", repeat: Infinity }}
            />
            <circle cx={C} cy={C} r={CORE_R} strokeWidth="4" filter="url(#node-glow)" className="fill-primary stroke-primary/20" />
            <text x={C} y={C + 8} textAnchor="middle" className="fill-on-primary font-display text-[24px] font-bold">
              {center}
            </text>
          </motion.g>
        </svg>
      </div>
    </motion.div>
  );
}

function PortraitCard() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.6, ease: EASE }}
      className="group relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-outline-variant/30 bg-surface-container-highest shadow-xl"
    >
      <Image
        src={profile.portrait.src}
        alt={profile.portrait.alt}
        fill
        sizes="100vw"
        className="object-cover object-[50%_20%] brightness-90 contrast-110 grayscale transition-all duration-700 group-hover:brightness-100 group-hover:grayscale-0"
      />
      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-background via-background/20 to-transparent" />
      <div className="grain pointer-events-none absolute inset-0 opacity-30" />
      <div className="absolute inset-x-6 bottom-6 flex items-end justify-between gap-4">
        {about.anchorStats.map((s, i) => (
          <div key={s.label} className={`flex flex-col gap-1 ${i > 0 ? "text-right" : ""}`}>
            <span className="font-mono text-label-sm tracking-widest text-on-surface-variant uppercase">{s.label}</span>
            <span className="font-display text-headline-md text-on-surface">{s.value}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export function SectionLabel({ children, accent = "tertiary" }: { children: ReactNode; accent?: Accent }) {
  const color = accent === "primary" ? "text-primary" : accent === "secondary" ? "text-secondary" : "text-tertiary";
  return (
    <motion.div variants={fadeUp} className="mb-stack-gap flex items-center gap-4">
      <span
        className={`rounded-xl border border-outline-variant/40 bg-surface-container-high px-3 py-1 font-mono text-label-caps tracking-[0.2em] uppercase ${color}`}
      >
        {children}
      </span>
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: EASE, delay: 0.2 }}
        className="h-px grow origin-left bg-linear-to-r from-outline-variant to-transparent"
      />
    </motion.div>
  );
}

const principleAccent: Record<Accent, string> = {
  primary: "bg-primary/10 border-primary/30 text-primary",
  secondary: "bg-secondary/10 border-secondary/30 text-secondary",
  tertiary: "bg-tertiary/10 border-tertiary/30 text-tertiary",
};

function Principles() {
  const reduce = useReducedMotion();
  const { label, items } = about.principles;

  return (
    <motion.div
      variants={stagger(0.12)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10%" }}
      className="mt-4 flex flex-col"
    >
      <SectionLabel>{label}</SectionLabel>
      <div className="grid grid-cols-1 gap-4 @2xl:grid-cols-2 @5xl:grid-cols-3 @3xl:gap-gutter">
        {items.map((p, i) => (
          <motion.article
            key={p.title}
            variants={fadeUp}
            whileHover={reduce ? undefined : { y: -8 }}
            transition={{ duration: 0.5, ease: EASE }}
            data-spotlight
            className="group relative flex flex-col overflow-hidden rounded-3xl border border-outline-variant/40 bg-white/2 p-6 shadow-sm backdrop-blur-lg transition-colors duration-500 hover:border-primary/30 hover:bg-white/5 hover:shadow-glow-soft @2xl:last:col-span-2 @4xl:rounded-[32px] @4xl:p-8 @5xl:last:col-span-1"
          >
            <span
              aria-hidden="true"
              className="numeral-outline pointer-events-none absolute top-5 right-6 font-display text-[64px] leading-none font-bold tracking-tight @4xl:top-6 @4xl:right-7 @4xl:text-[72px]"
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="relative z-10 flex h-full flex-col gap-8 @4xl:gap-10">
              <span
                className={`flex h-12 w-12 items-center justify-center rounded-xl border transition-transform duration-500 group-hover:scale-110 ${principleAccent[p.accent]}`}
              >
                <Icon name={p.icon} size={22} strokeWidth={2} />
              </span>
              <div>
                <h3 className="mb-3 font-display text-2xl leading-tight text-on-surface @5xl:mb-4 @5xl:text-[26px]">{p.title}</h3>
                <p className="text-body-md text-on-surface-variant">{p.body}</p>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </motion.div>
  );
}
