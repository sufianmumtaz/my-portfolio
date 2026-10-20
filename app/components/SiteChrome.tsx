"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { nav, profile, sidebar } from "../data";
import Icon from "./Icon";
import { EASE, fadeUp, slideFromLeft, stagger } from "./motion";
import { Monogram } from "./ui";

/** Fixed portrait sidebar, mobile header, right-side dock and mobile tab bar, all tracking the active section. */
export default function SiteChrome() {
  const [active, setActive] = useState(nav[0].id);

  useEffect(() => {
    const sections = nav.map((n) => document.getElementById(n.id)).filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        const top = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (top) setActive(top.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // One listener drives the cursor light on every [data-spotlight] card.
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const card = (e.target as Element | null)?.closest<HTMLElement>("[data-spotlight]");
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty("--spot-x", `${e.clientX - r.left}px`);
      card.style.setProperty("--spot-y", `${e.clientY - r.top}px`);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  const activeLabel = nav.find((n) => n.id === active)?.label;

  return (
    <>
      <ScrollProgress />
      <Sidebar />
      <MobileHeader title={activeLabel} />
      <div
        aria-hidden="true"
        className="fixed inset-y-0 right-0 z-40 hidden w-24 border-l border-outline-variant/30 bg-surface-container-lowest lg:block"
      />
      <Dock active={active} onSelect={setActive} />
      <TabBar active={active} onSelect={setActive} />
    </>
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-linear-to-r from-primary via-secondary to-tertiary"
    />
  );
}

function Sidebar() {
  const reduce = useReducedMotion();
  const { spotlight, socials } = sidebar;

  return (
    <motion.aside
      variants={reduce ? undefined : slideFromLeft}
      initial="hidden"
      animate="show"
      className="fixed top-0 left-0 z-50 hidden h-screen w-[300px] flex-col xl:w-[360px] 2xl:w-sidebar-width overflow-hidden border-r border-outline-variant/30 bg-surface-container-lowest lg:flex"
    >
      <motion.div
        className="sidebar-portrait absolute inset-0 z-0"
        initial={{ scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.4, ease: EASE }}
      >
        <Image src={profile.portrait.src} alt={profile.portrait.alt} fill
          priority
          sizes="400px"
          className="origin-[50%_0%] scale-125 object-cover"
        />
      </motion.div>
      <div className="sidebar-scrim absolute inset-0 z-1" />
      <div className="grain absolute inset-0 z-2 opacity-40" />

      <motion.div
        variants={stagger(0.12, 0.3)}
        initial="hidden"
        animate="show"
        className="relative z-10 flex h-full flex-col justify-between p-8 2xl:p-container-padding"
      >
        <motion.div variants={fadeUp} className="flex flex-col gap-stack-gap">
          <div className="flex items-center gap-4">
            <Monogram initials={profile.initials} className="h-10 w-10" />
            <span className="font-display text-xl tracking-tight text-primary xl:text-2xl">{profile.name}</span>
          </div>
          <p className="font-mono text-label-caps text-secondary uppercase">{profile.role}</p>
        </motion.div>

        <div className="flex flex-col gap-6">
          <motion.div
            variants={fadeUp}
            whileHover={reduce ? undefined : { y: -4 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="glass rounded-xl p-5 shadow-glow-soft xl:p-6"
          >
            <p className="mb-2 font-mono text-label-caps text-on-surface-variant uppercase">{spotlight.eyebrow}</p>
            <h3 className="mb-4 font-display text-lg xl:text-xl">{spotlight.title}</h3>
            <a
              href={spotlight.cta.href}
              className="inline-flex rounded-xl border border-outline-variant/50 px-6 py-2 font-mono text-label-caps tracking-widest uppercase transition-all duration-300 hover:border-primary hover:bg-primary hover:text-on-primary hover:shadow-glow"
            >
              {spotlight.cta.label}
            </a>
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4 text-on-surface-variant">
            {socials.map((s, i) => (
              <span key={s.label} className="flex items-center gap-4">
                {i > 0 && <span className="opacity-20">/</span>}
                <a
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="relative font-mono text-label-caps uppercase transition-colors after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-primary after:transition-all after:duration-300 hover:text-primary hover:after:w-full"
                >
                  {s.label}
                </a>
              </span>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </motion.aside>
  );
}

function MobileHeader({ title }: { title?: string }) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE }}
      className="fixed top-0 z-40 w-full border-b border-outline-variant/30 bg-surface-container-low/90 backdrop-blur-xl lg:hidden"
    >
      <div className="flex h-16 items-center justify-between px-margin-mobile">
        <div className="flex min-w-0 items-center gap-3">
          <Monogram initials={profile.initials} className="h-8 w-8 shrink-0" />
          <span className="truncate font-display text-headline-md text-on-surface">{title || profile.name}</span>
        </div>
        <span className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full border border-outline-variant/50">
          <Image
            src={profile.portrait.src}
            alt={profile.portrait.alt}
            fill
            sizes="64px"
            className="origin-[50%_18%] scale-250 object-cover"
          />
        </span>
      </div>
    </motion.header>
  );
}

type NavProps = { active: string; onSelect: (id: string) => void };

function Dock({ active, onSelect }: NavProps) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <motion.nav
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: EASE, delay: 0.6 }}
      aria-label="Section navigation"
      className="fixed top-1/2 right-4 z-50 hidden -translate-y-1/2 flex-col gap-2 rounded-xl border border-outline-variant/30 bg-surface-container-high/40 p-2 backdrop-blur-xl lg:flex"
    >
      {nav.map((item) => {
        const isActive = item.id === active;
        return (
          <a
            key={item.id}
            href={`#${item.id}`}
            aria-label={item.label}
            aria-current={isActive ? "page" : undefined}
            onClick={() => onSelect(item.id)}
            onMouseEnter={() => setHovered(item.id)}
            onMouseLeave={() => setHovered(null)}
            className="relative flex h-12 w-12 items-center justify-center rounded-xl transition-colors"
          >
            {isActive && (
              <motion.span
                layoutId="dock-active"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
                className="absolute inset-0 rounded-xl bg-primary shadow-glow"
              />
            )}
            <Icon
              name={item.icon}
              size={20}
              strokeWidth={1.75}
              className={`relative z-10 transition-colors ${isActive ? "text-on-primary" : "text-on-surface-variant hover:text-on-surface"}`}
            />
            <AnimatePresence>
              {hovered === item.id && (
                <motion.span
                  initial={{ opacity: 0, x: 8, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 8, scale: 0.9 }}
                  transition={{ duration: 0.2, ease: EASE }}
                  className="pointer-events-none absolute right-full mr-4 rounded-xl border border-outline-variant/30 bg-surface-container-highest px-3 py-1.5 font-mono text-label-caps whitespace-nowrap text-on-surface uppercase"
                >
                  {item.label}
                </motion.span>
              )}
            </AnimatePresence>
          </a>
        );
      })}
    </motion.nav>
  );
}

function TabBar({ active, onSelect }: NavProps) {
  const reduce = useReducedMotion();

  return (
    <motion.nav
      initial={reduce ? undefined : { y: 72 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: EASE, delay: 0.5 }}
      aria-label="Section navigation"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-outline-variant/30 bg-surface-container/90 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl lg:hidden"
    >
      <ul className="flex h-16 items-stretch justify-between px-2">
        {nav.map((item) => {
          const isActive = item.id === active;
          return (
            <li key={item.id} className="flex-1">
              <a
                href={`#${item.id}`}
                aria-current={isActive ? "page" : undefined}
                onClick={() => onSelect(item.id)}
                className="relative flex h-full w-full flex-col items-center justify-center gap-1 rounded-lg"
              >
                {isActive && (
                  <motion.span
                    layoutId="tab-active"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    className="absolute inset-x-1 inset-y-2 rounded-lg border border-primary/20 bg-primary/10 shadow-glow-soft"
                  />
                )}
                <Icon
                  name={item.icon}
                  size={20}
                  strokeWidth={isActive ? 2 : 1.75}
                  className={`relative z-10 transition-colors ${isActive ? "text-primary" : "text-on-surface-variant"}`}
                />
                <span
                  className={`relative z-10 font-mono text-[10px] tracking-wide transition-colors ${isActive ? "text-primary" : "text-on-surface-variant"}`}
                >
                  {item.label}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </motion.nav>
  );
}
