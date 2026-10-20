"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useRef, type CSSProperties } from "react";
import { work, type Accent } from "../data";
import Icon from "./Icon";
import { EASE, fadeUp, stagger } from "./motion";
import { AnimatedHeading, MagneticButton, useMediaQuery } from "./ui";

type Project = (typeof work.projects)[number];

const projectAccent: Record<Accent, { text: string; dot: string; wash: string }> = {
  primary: { text: "text-primary", dot: "bg-primary", wash: "from-primary/10" },
  secondary: { text: "text-secondary", dot: "bg-secondary", wash: "from-secondary/10" },
  tertiary: { text: "text-tertiary", dot: "bg-tertiary", wash: "from-tertiary/10" },
};

export default function Work() {
  return (
    <section id="work" className="relative flex w-full flex-col pb-16 @3xl:pb-section-gap">
      <div className="pointer-events-none absolute top-[10%] right-[5%] h-[400px] w-[400px] rounded-full bg-primary/5 mix-blend-screen blur-[100px]" />
      <motion.div
        variants={stagger(0.1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-15%" }}
        className="section-x py-16 @3xl:py-section-gap"
      >
        <div className="flex flex-col items-start justify-between gap-8 @2xl:flex-row @2xl:items-end">
          <div className="relative max-w-2xl">
            <motion.span
              variants={fadeUp}
              className="mb-6 flex h-8 w-8 items-center justify-center rounded-full border border-outline-variant/40 bg-surface-container/20 text-on-surface-variant backdrop-blur-md"
            >
              <Icon name="folder" size={16} strokeWidth={1.75} />
            </motion.span>
            <AnimatedHeading
              segments={work.headline}
              highlight="italic"
              className="mb-4 font-display text-[clamp(2.1rem,6cqw,3.6rem)] leading-tight font-bold tracking-tight text-on-surface"
            />
            <motion.p variants={fadeUp} className="max-w-lg text-body-md leading-relaxed text-on-surface-variant">
              {work.body}
            </motion.p>
          </div>
          <motion.span
            variants={fadeUp}
            className="hidden rotate-180 font-mono text-label-caps tracking-widest text-on-surface-variant uppercase opacity-50 [writing-mode:vertical-rl] @2xl:block"
          >
            {work.eyebrow}
          </motion.span>
        </div>
      </motion.div>

      <ProjectStack />

      <div className="section-x relative z-10 flex w-full justify-center py-12 @3xl:py-16">
        <MagneticButton href={work.cta.href} variant="secondary" className="w-full sm:w-auto" download>
          {work.cta.label}
          <Icon name="arrowRight" size={18} className="text-primary transition-transform duration-300 group-hover:translate-x-1" />
        </MagneticButton>
      </div>

      <hr className="mx-auto my-8 h-px w-full max-w-6xl border-0 bg-outline-variant/30" />
      <TrackRecord />
      <Credentials />
    </section>
  );
}

function ProjectStack() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <div ref={ref} className="relative w-full">
      {work.projects.map((p, i) => (
        <ProjectCard key={p.id} project={p} index={i} total={work.projects.length} progress={scrollYProgress} />
      ))}
    </div>
  );
}

/** Sticky card that shrinks and dims as the next card slides over it. */
function ProjectCard({
  project,
  index,
  total,
  progress,
}: {
  project: Project;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const reduce = useReducedMotion();
  const desktop = useMediaQuery("(min-width: 1280px)");
  const accent = projectAccent[project.accent];
  const isLast = index === total - 1;
  const flip = index % 2 === 1;
  const range = [index / total, (index + 1) / total];
  const scale = useTransform(progress, range, [1, isLast || reduce ? 1 : 0.94]);
  const dim = useTransform(progress, range, [0, isLast || reduce ? 0 : 0.5]);

  return (
    <div
      // The stacking offset only applies once cards are sticky; otherwise it would shift them onto the next block.
      className="section-x relative flex w-full items-center justify-center py-3 md:py-4 xl:sticky xl:top-(--stack-top) xl:min-h-[70vh] xl:py-container-padding"
      style={{ "--stack-top": `calc(6rem + ${index * 2}rem)`, zIndex: index + 1 } as CSSProperties}
    >
      <motion.article
        style={desktop ? { scale } : undefined}
        className="group relative w-full max-w-6xl overflow-hidden rounded-3xl border border-outline-variant/40 bg-surface-container-high shadow-2xl shadow-black/50 backdrop-blur-xl transition-shadow duration-700 hover:shadow-glow @3xl:rounded-[36px]"
      >
        {desktop && (
          <motion.span style={{ opacity: dim }} className="pointer-events-none absolute inset-0 z-30 bg-surface-container-lowest" />
        )}
        <div className={`flex h-full flex-col @4xl:min-h-[460px] ${flip ? "@4xl:flex-row-reverse" : "@4xl:flex-row"}`}>
          <div className="relative z-10 flex flex-1 flex-col justify-between p-6 @3xl:p-10 @5xl:p-14">
            <span
              className={`pointer-events-none absolute inset-0 bg-linear-to-br ${accent.wash} to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
            />
            <div className="relative">
              <div className="mb-6 flex flex-wrap items-center gap-3 @3xl:mb-8">
                <span className="rounded-xl border border-outline-variant/40 bg-surface-container px-3 py-1 font-mono text-code-sm text-on-surface-variant">
                  {project.index}
                </span>
                <span className={`h-1 w-1 animate-pulse rounded-full ${accent.dot}`} />
                <span className={`font-mono text-label-caps tracking-widest uppercase ${accent.text}`}>{project.category}</span>
              </div>
              <h3 className="mb-4 font-display text-[clamp(1.75rem,4.5cqw,2.5rem)] leading-tight font-semibold text-on-surface @3xl:mb-5">{project.title}</h3>
              <p className="mb-6 max-w-lg text-body-md text-on-surface-variant @3xl:mb-8">{project.body}</p>
            </div>
            <div className="relative flex flex-wrap gap-2">
              {project.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-xl border border-outline-variant/40 bg-surface-container-low px-4 py-2 font-mono text-label-caps text-on-surface transition-colors duration-300 hover:border-primary/40"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
          <ProjectPipeline project={project} accent={accent} flip={flip} />
        </div>
      </motion.article>
    </div>
  );
}

/** The project's core flow as connected nodes, with a pulse travelling down the line. */
function ProjectPipeline({
  project,
  accent,
  flip,
}: {
  project: Project;
  accent: (typeof projectAccent)[Accent];
  flip: boolean;
}) {
  return (
    <div
      className={`relative flex flex-1 items-center justify-center overflow-hidden border-t border-outline-variant/40 bg-surface-container-lowest p-6 @3xl:p-10 @4xl:border-t-0 ${flip ? "@4xl:border-r" : "@4xl:border-l"}`}
    >
      <div className={`absolute inset-0 bg-linear-to-br ${accent.wash} to-transparent`} />
      <div className="tech-grid absolute inset-0 opacity-60" />
      <span
        aria-hidden="true"
        className="numeral-outline pointer-events-none absolute right-6 bottom-5 font-display text-[88px] leading-none font-bold tracking-tight opacity-70 @4xl:right-8 @4xl:bottom-6 @4xl:text-[104px]"
      >
        {project.index}
      </span>

      <motion.div
        variants={stagger(0.08, 0.15)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-10%" }}
        className="relative w-full max-w-xs"
      >
        <p className="mb-4 font-mono text-label-caps tracking-widest text-on-surface-variant/70 uppercase">System pipeline</p>
        <ol className="relative flex flex-col gap-2.5">
          <span aria-hidden="true" className="absolute top-4 bottom-4 left-[15px] w-px bg-outline-variant/60">
            <span className={`pipeline-dot absolute -left-[3px] h-[7px] w-[7px] rounded-full ${accent.dot} shadow-glow-dot`} />
          </span>
          {project.pipeline.map((step, i) => (
            <motion.li
              key={step}
              variants={{
                hidden: { opacity: 0, x: -12 },
                show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE } },
              }}
              className="relative flex items-center gap-3"
            >
              <span
                className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-outline-variant/60 bg-surface-container-high font-mono text-[11px] ${accent.text}`}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="rounded-lg border border-outline-variant/40 bg-surface-container/80 px-3 py-1.5 text-sm text-on-surface backdrop-blur-sm transition-colors duration-300 group-hover:border-outline-variant/70">
                {step}
              </span>
            </motion.li>
          ))}
        </ol>
      </motion.div>
    </div>
  );
}

const roleAccent: Record<string, { dot: string; text: string; border: string }> = {
  primary: { dot: "bg-primary", text: "text-primary", border: "group-hover:border-primary" },
  secondary: { dot: "bg-secondary", text: "text-secondary", border: "group-hover:border-secondary" },
  tertiary: { dot: "bg-tertiary", text: "text-tertiary", border: "group-hover:border-tertiary" },
  neutral: { dot: "bg-surface-variant", text: "text-on-surface-variant", border: "group-hover:border-outline" },
};

/** Timeline whose gradient line fills in with scroll progress. */
function TrackRecord() {
  const { title, body, roles } = work.trackRecord;
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 60%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 80, damping: 24, restDelta: 0.001 });

  return (
    <motion.div
      variants={stagger(0.1)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10%" }}
      className="section-x mx-auto w-full max-w-7xl py-16 @3xl:py-section-gap"
    >
      <div className="mb-10 flex flex-col items-start justify-between gap-8 @3xl:mb-14 @3xl:flex-row">
        <motion.div variants={fadeUp}>
          <div className="mb-4 flex items-center gap-3">
            <Icon name="timeline" size={24} strokeWidth={1.75} className="text-primary" />
            <h2 className="font-display text-headline-lg-mobile text-on-surface @3xl:text-headline-lg">{title}</h2>
          </div>
          <p className="max-w-md text-body-md text-on-surface-variant">{body}</p>
        </motion.div>
        <motion.div variants={fadeUp} className="relative hidden h-24 w-48 opacity-50 @3xl:block">
          <svg viewBox="0 0 100 40" className="h-full w-full fill-none stroke-primary stroke-[0.5]">
            <motion.path
              d="M0,35 Q15,35 25,25 T50,20 T75,10 T100,5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: EASE }}
            />
            <motion.path
              d="M0,38 Q20,38 30,30 T60,25 T80,15 T100,10"
              strokeLinecap="round"
              className="stroke-secondary opacity-50"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: EASE, delay: 0.2 }}
            />
          </svg>
          <span className="absolute top-[5%] right-0 h-2 w-2 animate-pulse rounded-full bg-primary shadow-glow-dot" />
        </motion.div>
      </div>

      <div ref={ref} className="relative flex flex-col gap-10 pl-4 @3xl:gap-12 @3xl:pl-8">
        <span className="absolute inset-y-0 left-0 w-px bg-outline-variant/40" />
        <motion.span
          style={{ scaleY: fill }}
          className="absolute inset-y-0 left-0 w-px origin-top bg-linear-to-b from-primary via-secondary to-transparent"
        />
        {roles.map((role) => {
          const a = roleAccent[role.accent] ?? roleAccent.neutral;
          return (
            <motion.div key={role.company} variants={fadeUp} className="group relative">
              <span
                className={`absolute top-1 -left-[21px] flex h-10 w-10 items-center justify-center rounded-full border border-outline-variant/40 bg-surface shadow-lg transition-all duration-300 group-hover:shadow-glow-soft @3xl:-left-[37px] ${a.border}`}
              >
                <span className={`h-2 w-2 rounded-full transition-colors ${a.dot}`} />
              </span>
              <div className="flex flex-col items-start gap-4 pl-6 @3xl:pl-12 @4xl:flex-row @4xl:gap-12">
                <div className="w-full pt-2 @4xl:w-1/3">
                  <h4 className="mb-1 font-display text-xl text-on-surface">{role.title}</h4>
                  <div className={`mb-2 font-mono text-label-caps tracking-widest uppercase ${a.text}`}>{role.company}</div>
                  <div className="font-mono text-code-sm text-on-surface-variant opacity-60">{role.period}</div>
                </div>
                <div data-spotlight className="w-full rounded-2xl border border-outline-variant/30 bg-surface-container-low/60 p-5 transition-colors duration-300 group-hover:border-outline-variant/60 group-hover:bg-surface-container @3xl:p-7 @4xl:w-2/3">
                  <p className="text-body-md leading-relaxed text-on-surface-variant">{role.body}</p>
                  {role.tags.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {role.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-lg border border-outline-variant/40 bg-surface px-3 py-1 font-mono text-[11px] text-on-surface-variant"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

const credentialAccent: Record<Accent, string> = {
  primary: "text-primary",
  secondary: "text-secondary",
  tertiary: "text-tertiary",
};

function Credentials() {
  const reduce = useReducedMotion();
  const { eyebrow, title, items } = work.credentials;

  return (
    <motion.div
      variants={stagger(0.1)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10%" }}
      className="section-x relative mt-12 overflow-hidden border-y border-outline-variant/30 bg-surface-container-lowest py-16 @3xl:mt-16 @3xl:py-section-gap"
    >
      <div className="tech-grid pointer-events-none absolute inset-0 opacity-40" />
      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <motion.div variants={fadeUp} className="mb-8 flex items-center gap-4 @3xl:mb-12">
          <span className="rotate-180 font-mono text-label-caps tracking-widest text-on-surface-variant uppercase [writing-mode:vertical-rl]">
            {eyebrow}
          </span>
          <h2 className="font-display text-headline-lg-mobile text-on-surface @3xl:text-headline-lg">{title}</h2>
        </motion.div>
        <div className="grid grid-cols-1 gap-4 @2xl:grid-cols-2 @3xl:gap-6 @5xl:grid-cols-3">
          {items.map((c) => (
            <motion.div
              key={c.title}
              variants={fadeUp}
              whileHover={reduce ? undefined : { y: -6 }}
              transition={{ duration: 0.4, ease: EASE }}
              data-spotlight
              className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-outline-variant/40 bg-surface-container p-6 transition-colors duration-300 hover:border-primary/30 hover:bg-surface-container-high @4xl:p-8"
            >
              <span className="pointer-events-none absolute -top-10 -right-10 h-28 w-28 rounded-full bg-primary/20 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative">
                <Icon name={c.icon} size={24} strokeWidth={1.75} className={`mb-4 block ${credentialAccent[c.accent]}`} />
                <h4 className="mb-2 font-display text-lg text-on-surface">{c.title}</h4>
                <p className="text-sm text-on-surface-variant">{c.subtitle}</p>
              </div>
              <div className="relative mt-8 flex items-end justify-between">
                <span className="font-mono text-code-sm text-on-surface-variant opacity-50">{c.issuer}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
