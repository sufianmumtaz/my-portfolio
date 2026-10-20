"use client";

import { motion, useReducedMotion } from "motion/react";
import { services } from "../data";
import Icon from "./Icon";
import { EASE, fadeUp, scaleIn, stagger } from "./motion";
import { AnimatedHeading } from "./ui";

type Service = (typeof services.items)[number] & { badge?: boolean; tags?: string[] };

export default function Services() {
  const reduce = useReducedMotion();

  return (
    <section
      id="services"
      className="section-x relative flex w-full flex-col gap-stack-gap py-16 @3xl:py-section-gap @4xl:gap-6"
    >
      <motion.div
        variants={stagger(0.1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-15%" }}
        className="group relative flex flex-col items-start justify-between gap-8 overflow-hidden rounded-2xl border border-outline-variant/40 bg-surface-container p-6 @2xl:flex-row @2xl:items-center @2xl:p-10 @5xl:p-14"
      >
        <div className="pointer-events-none absolute inset-0 z-0 bg-linear-to-br from-primary/10 via-transparent to-transparent opacity-20" />
        <div className="pointer-events-none absolute -top-32 -left-32 h-64 w-64 rounded-full bg-primary/20 blur-[100px] transition-transform duration-1000 group-hover:scale-150" />
        <div className="relative z-10 flex max-w-2xl flex-col gap-5 @3xl:gap-6">
          <motion.div variants={fadeUp} className="flex items-center gap-4">
            <span className="font-mono text-label-caps tracking-widest text-primary uppercase">{services.eyebrow}</span>
            <span className="h-px w-12 bg-outline-variant" />
          </motion.div>
          <AnimatedHeading
            segments={services.headline}
            highlight="italic"
            className="font-display text-[clamp(2.1rem,6cqw,3.6rem)] leading-tight font-bold tracking-tight text-on-surface"
          />
          <motion.p variants={fadeUp} className="max-w-xl text-body-md text-on-surface-variant">
            {services.body}
          </motion.p>
        </div>
        <motion.div
          variants={scaleIn}
          className="relative z-10 hidden h-32 w-32 shrink-0 rounded-full border border-outline-variant/40 shadow-glow-soft transition-colors duration-500 group-hover:border-primary/50 @2xl:block @4xl:h-44 @4xl:w-44"
        >
          <motion.span
            className="absolute inset-4 rounded-full border border-dashed border-outline-variant"
            animate={reduce ? undefined : { rotate: 360 }}
            transition={{ duration: services.emblem.spinSeconds, ease: "linear", repeat: Infinity }}
          />
          <span className="absolute inset-[16%] grid place-items-center overflow-hidden rounded-full border border-outline-variant/40 bg-surface-container-high shadow-glow">
            <span className="grain absolute inset-0 rounded-full opacity-30" />
            <Icon
              name={services.emblem.icon}
              size={40}
              strokeWidth={1.5}
              className="relative z-10 text-primary drop-shadow-[0_0_8px_rgba(62,230,176,0.8)]"
            />
          </span>
        </motion.div>
      </motion.div>

      <motion.div
        variants={stagger(0.1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-10%" }}
        className="grid grid-cols-1 gap-stack-gap @2xl:grid-cols-2 @4xl:gap-6"
      >
        {(services.items as Service[]).map((s, i) => (
          <ServiceCard key={s.title} service={s} index={i} />
        ))}
      </motion.div>
    </section>
  );
}

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const reduce = useReducedMotion();

  return (
    <motion.article
      variants={fadeUp}
      whileHover={reduce ? undefined : { y: -6 }}
      transition={{ duration: 0.4, ease: EASE }}
      data-spotlight
      className="group relative flex flex-col gap-5 overflow-hidden rounded-2xl border border-outline-variant/40 bg-surface-container/50 p-6 backdrop-blur-md transition-all duration-300 hover:border-primary/40 hover:bg-surface-container hover:shadow-glow @4xl:gap-6 @4xl:p-8"
    >
      <span className="pointer-events-none absolute top-0 right-0 h-32 w-32 translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl transition-colors duration-500 group-hover:bg-primary/25" />
      <div className="relative flex items-start justify-between">
        <span className="relative flex h-12 w-12 items-center justify-center rounded-sm border border-outline-variant/40 bg-surface-container-high text-on-surface transition-all duration-300 group-hover:border-primary/50 group-hover:text-primary group-hover:shadow-glow-soft">
          <Icon name={service.icon} size={22} strokeWidth={1.75} />
          {service.badge && (
            <span className="absolute -top-1 -right-1 h-3 w-3 animate-pulse rounded-full bg-primary shadow-glow-dot" />
          )}
        </span>
        <span
          aria-hidden="true"
          className="font-mono text-2xl font-bold text-on-surface-variant opacity-50 transition-all duration-300 group-hover:text-primary group-hover:opacity-80"
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <div className="relative">
        <h3 className="mb-2 font-display text-2xl text-on-surface transition-colors duration-300 group-hover:text-primary">
          {service.title}
        </h3>
        <p className="mb-6 text-body-md text-on-surface-variant">{service.body}</p>
        <ul className="flex flex-col gap-3 font-mono text-code-sm text-on-surface-variant">
          {service.bullets.map((b) => (
            <li key={b} className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary shadow-glow-dot" />
              {b}
            </li>
          ))}
        </ul>
        {service.tags && service.tags.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {service.tags.map((t) => (
              <span
                key={t}
                className="cursor-default rounded-xl border border-outline-variant/40 bg-surface-container-high px-3 py-1 font-mono text-label-caps text-primary transition-all duration-300 hover:border-primary/50 hover:shadow-glow-soft"
              >
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.article>
  );
}
