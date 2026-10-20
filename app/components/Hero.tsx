"use client";

import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { hero, profile } from "../data";
import Icon from "./Icon";
import { accentText, EASE, fadeIn, fadeUp, scaleIn, stagger } from "./motion";
import { AnimatedHeading, MagneticButton } from "./ui";

export default function Hero() {
  return (
    <section id="home" className="relative flex min-h-[calc(100svh-4rem)] w-full flex-col overflow-hidden lg:min-h-svh">
      <ParallaxBackground />
      <motion.div
        variants={stagger(0.12, 0.2)}
        initial="hidden"
        animate="show"
        className="section-x relative z-10 mx-auto flex w-full max-w-7xl grow flex-col justify-center gap-10 py-10 @3xl:gap-16 @3xl:py-section-gap"
      >
        <StatusRow />
        <div className="flex w-full flex-col items-start justify-between gap-12 @4xl:flex-row">
          <div className="flex max-w-4xl flex-col gap-6">
            <AnimatedHeading
              as="h1"
              segments={hero.headline}
              className="font-display text-[clamp(2.25rem,8.5cqw,4.25rem)] leading-[1.05] font-bold tracking-tight text-balance text-on-surface"
            />
            <motion.p variants={fadeUp} className="max-w-2xl text-body-md leading-relaxed text-on-surface-variant">
              {hero.subheadline}
            </motion.p>
            <motion.div variants={fadeUp} className="mt-4 flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
              {hero.actions.map((a) => (
                <MagneticButton key={a.label} href={a.href} variant={a.variant} className="w-full sm:w-auto">
                  {a.label}
                </MagneticButton>
              ))}
            </motion.div>
          </div>
          <ScrollBadge />
        </div>
        <Metrics />
      </motion.div>
      <motion.div initial="hidden" animate="show" variants={stagger(0, 1.1)} className="mt-auto">
        <Marquee />
      </motion.div>
    </section>
  );
}

/** Grid, grain and three glow blobs that drift against the pointer. */
function ParallaxBackground() {
  const reduce = useReducedMotion();
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const x = useSpring(px, { stiffness: 40, damping: 20, mass: 0.6 });
  const y = useSpring(py, { stiffness: 40, damping: 20, mass: 0.6 });

  useEffect(() => {
    if (reduce) return;
    const onMove = (e: PointerEvent) => {
      px.set((e.clientX / window.innerWidth) * 2 - 1);
      py.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce, px, py]);

  const aX = useTransform(x, [-1, 1], [40, -40]);
  const aY = useTransform(y, [-1, 1], [30, -30]);
  const bX = useTransform(x, [-1, 1], [-30, 30]);
  const bY = useTransform(y, [-1, 1], [-24, 24]);

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <div className="tech-grid absolute inset-0 opacity-70" />
      <motion.div
        style={{ x: aX, y: aY }}
        className="absolute -top-[20%] -right-[10%] h-[600px] w-[600px] rounded-full bg-primary/10 mix-blend-screen blur-[120px]"
      />
      <motion.div
        style={{ x: bX, y: bY }}
        className="absolute -bottom-[10%] -left-[10%] h-[400px] w-[400px] rounded-full bg-secondary/10 mix-blend-screen blur-[100px]"
      />
      <motion.div
        style={{ x: bX, y: aY }}
        className="absolute top-1/2 left-1/3 h-[320px] w-[320px] rounded-full bg-tertiary/5 mix-blend-screen blur-[110px]"
      />
      <div className="grain absolute inset-0 opacity-25" />
    </div>
  );
}

function formatClock(date: Date, timeZone: string) {
  return {
    time: date.toLocaleTimeString("en-US", { timeZone, hour12: false, hour: "2-digit", minute: "2-digit" }),
    date: date.toLocaleDateString("en-US", { timeZone, day: "2-digit", month: "short", year: "numeric" }).toUpperCase(),
  };
}

function StatusRow() {
  // The clock is only read after mount so the page can still be prerendered.
  const [clock, setClock] = useState<{ time: string; date: string } | null>(null);
  useEffect(() => {
    const tick = () => setClock(formatClock(new Date(), profile.clock.timeZone));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.div variants={fadeUp} className="mt-4 flex w-full flex-wrap items-center justify-between gap-3 opacity-80 @3xl:mt-8 @3xl:gap-4">
      <div className="flex items-center gap-2 rounded-xl border border-outline-variant/30 bg-surface-container-high/50 px-4 py-2 shadow-sm backdrop-blur-md">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-primary shadow-glow-dot" />
        </span>
        <span className="font-mono text-label-caps tracking-widest text-on-surface uppercase">{hero.availability}</span>
      </div>
      <div className="flex items-center gap-4 font-mono text-code-sm text-on-surface-variant">
        <span className="tabular-nums">
          {profile.clock.cityCode} {clock?.time ?? "--:--"}
        </span>
        <span className="opacity-30">/</span>
        <span>{clock?.date ?? " "}</span>
      </div>
    </motion.div>
  );
}

const RING = 2 * Math.PI * 37;

function ScrollBadge() {
  const reduce = useReducedMotion();
  const { text, href, spinSeconds } = hero.scrollBadge;

  return (
    <motion.a
      href={href}
      variants={scaleIn}
      aria-label="Scroll to about"
      className="group relative hidden h-40 w-40 shrink-0 items-center justify-center @4xl:flex"
    >
      <motion.svg
        width="160"
        height="160"
        viewBox="0 0 100 100"
        aria-hidden="true"
        className="absolute z-10 text-on-surface opacity-70 transition-opacity duration-500 group-hover:text-primary group-hover:opacity-100"
        animate={reduce ? undefined : { rotate: 360 }}
        transition={{ duration: spinSeconds, ease: "linear", repeat: Infinity }}
      >
        <defs>
          <path id="scroll-badge-ring" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
        </defs>
        <text fill="currentColor" fontFamily="var(--font-jetbrains-mono), monospace" fontSize="11" fontWeight="700">
          <textPath href="#scroll-badge-ring" startOffset="0%" textLength={RING} lengthAdjust="spacing">
            {text}
          </textPath>
        </text>
      </motion.svg>
      <span className="relative z-20 flex h-16 w-16 items-center justify-center rounded-xl border border-outline-variant/30 bg-surface-container-highest shadow-glow-soft transition-transform duration-500 group-hover:scale-110 group-hover:border-primary/40">
        <motion.span
          animate={reduce ? undefined : { y: [0, 5, 0] }}
          transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
        >
          <Icon name="arrowDown" size={28} strokeWidth={1.75} className="text-primary" />
        </motion.span>
      </span>
    </motion.a>
  );
}

function parseMetric(value: string) {
  const m = value.match(/^(\D*)(\d+(?:\.\d+)?)(.*)$/);
  return m ? { prefix: m[1], number: Number(m[2]), suffix: m[3], decimals: (m[2].split(".")[1] || "").length } : null;
}

/** Counts a numeric metric up from zero the first time it scrolls into view. */
function Counter({ value, className }: { value: string; className: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  const reduce = useReducedMotion();
  const parsed = parseMetric(value);
  const [display, setDisplay] = useState(parsed && !reduce ? `${parsed.prefix}0${parsed.suffix}` : value);

  useEffect(() => {
    if (!parsed || reduce || !inView) return;
    const controls = animate(0, parsed.number, {
      duration: 1.6,
      ease: EASE,
      onUpdate: (v) => setDisplay(`${parsed.prefix}${v.toFixed(parsed.decimals)}${parsed.suffix}`),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, value, reduce]);

  return (
    <span ref={ref} className={className}>
      {parsed && !reduce ? display : value}
    </span>
  );
}

function Metrics() {
  const reduce = useReducedMotion();
  return (
    <motion.div variants={stagger(0.1)} className="mt-6 grid w-full grid-cols-2 gap-3 @3xl:mt-8 @3xl:grid-cols-4 @3xl:gap-4">
      {hero.metrics.map((m) => (
        <motion.div
          key={m.label}
          variants={fadeUp}
          whileHover={reduce ? undefined : { y: -6 }}
          transition={{ duration: 0.4, ease: EASE }}
          data-spotlight
          className="group relative flex flex-col overflow-hidden rounded-2xl border border-outline-variant/20 bg-surface-container/30 p-4 backdrop-blur-md transition-colors hover:border-primary/30 hover:bg-surface-container-high/40 @3xl:p-6"
        >
          <span className="pointer-events-none absolute -top-10 -left-10 h-24 w-24 rounded-full bg-primary/20 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
          {m.icon && (
            <span className="absolute top-0 right-0 p-3 text-on-surface-variant opacity-20 transition-opacity duration-500 group-hover:opacity-100">
              <Icon name={m.icon} size={20} strokeWidth={2} />
            </span>
          )}
          <Counter
            value={m.value}
            className={`mb-1 block origin-left font-display text-[clamp(1.5rem,5cqw,2.5rem)] leading-tight font-bold tabular-nums transition-transform duration-500 group-hover:scale-105 @3xl:mb-2 ${accentText[m.accent as keyof typeof accentText]}`}
          />
          <span className="font-mono text-label-caps leading-snug text-on-surface-variant uppercase">{m.label}</span>
        </motion.div>
      ))}
    </motion.div>
  );
}

function Marquee() {
  const { items, separator, speedSeconds, label } = hero.marquee;
  const row = (hidden?: boolean) => (
    <div
      aria-hidden={hidden || undefined}
      className="flex shrink-0 items-center gap-8 px-4 font-display text-headline-md font-bold tracking-widest whitespace-nowrap text-on-surface-variant uppercase opacity-60 md:gap-16 md:px-8 md:text-headline-lg-mobile"
    >
      {items.map((item) => (
        <span key={item} className="flex items-center gap-8 md:gap-16">
          <span className="cursor-default transition-colors duration-300 hover:text-primary hover:opacity-100">{item}</span>
          <span className="text-sm text-outline-variant/50">{separator}</span>
        </span>
      ))}
    </div>
  );

  return (
    <motion.div
      variants={fadeIn}
      style={{ "--marquee-duration": `${speedSeconds}s` } as CSSProperties}
      className="relative z-10 mt-auto w-full overflow-hidden border-y border-outline-variant/20 bg-surface-container-lowest/80 py-4 backdrop-blur-md md:py-6"
    >
      <p className="mb-3 text-center font-mono text-label-sm tracking-widest text-on-surface-variant uppercase opacity-70 md:hidden">
        {label}
      </p>
      <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-24 bg-linear-to-r from-surface-container-lowest to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-24 bg-linear-to-l from-surface-container-lowest to-transparent" />
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {row()}
        {row(true)}
      </div>
    </motion.div>
  );
}
