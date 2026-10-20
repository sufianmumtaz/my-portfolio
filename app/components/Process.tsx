"use client";

import { motion, useReducedMotion } from "motion/react";
import { process } from "../data";
import Icon from "./Icon";
import { EASE, fadeUp, stagger } from "./motion";
import { MagneticButton } from "./ui";

/** Four-step delivery process joined by a line that draws in, ending in a call to action. */
export default function Process() {
  const reduce = useReducedMotion();

  return (
    <section aria-labelledby="process-title" className="section-x relative py-16 @3xl:py-section-gap">
      <motion.div
        variants={stagger(0.1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-15%" }}
      >
        <motion.div variants={fadeUp} className="mb-4 flex items-center gap-4">
          <span className="font-mono text-label-caps tracking-widest text-primary uppercase">{process.eyebrow}</span>
          <span className="h-px w-12 bg-outline-variant" />
        </motion.div>
        <motion.h2
          id="process-title"
          variants={fadeUp}
          className="mb-10 max-w-2xl font-display text-[clamp(1.75rem,4.6cqw,2.75rem)] leading-tight font-bold tracking-tight text-balance text-on-surface @3xl:mb-14"
        >
          {process.title}
        </motion.h2>

        <ol className="relative grid grid-cols-1 gap-4 @2xl:grid-cols-2 @5xl:grid-cols-4 @5xl:gap-6">
          {/* Connector behind the step icons, only when the steps sit in one row. */}
          <motion.span
            aria-hidden="true"
            initial={{ scaleX: reduce ? 1 : 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: EASE, delay: 0.3 }}
            className="pointer-events-none absolute top-[3.25rem] right-[12%] left-[12%] hidden h-px origin-left bg-linear-to-r from-primary/60 via-secondary/50 to-tertiary/60 @5xl:block"
          />
          {process.steps.map((step, i) => (
            <motion.li
              key={step.title}
              variants={fadeUp}
              data-spotlight
              className="group relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-outline-variant/40 bg-surface-container/50 p-6 backdrop-blur-md transition-colors duration-300 hover:border-primary/40 @4xl:p-7"
            >
              <div className="flex items-center justify-between">
                <span className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border border-outline-variant/50 bg-surface-container-high text-primary shadow-glow-soft transition-all duration-300 group-hover:border-primary/60 group-hover:shadow-glow">
                  <Icon name={step.icon} size={22} strokeWidth={1.75} />
                </span>
                <span className="font-mono text-code-sm text-on-surface-variant/60">
                  Step {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="font-display text-xl text-on-surface transition-colors group-hover:text-primary">{step.title}</h3>
              <p className="text-[15px] leading-relaxed text-on-surface-variant">{step.body}</p>
            </motion.li>
          ))}
        </ol>

        <motion.div
          variants={fadeUp}
          className="mt-8 flex flex-col items-start justify-between gap-5 rounded-2xl border border-primary/20 bg-linear-to-r from-primary/10 via-surface-container/40 to-secondary/10 p-6 @2xl:flex-row @2xl:items-center @3xl:mt-10 @4xl:p-8"
        >
          <div>
            <p className="font-display text-xl text-on-surface @4xl:text-2xl">Have a product in mind?</p>
            <p className="mt-1 text-on-surface-variant">Tell me about it. I&apos;ll reply with an approach, a timeline and the next steps.</p>
          </div>
          <MagneticButton href="#contact" className="w-full shrink-0 @2xl:w-auto">
            Start a Project
            <Icon name="arrowRight" size={16} strokeWidth={2} />
          </MagneticButton>
        </motion.div>
      </motion.div>
    </section>
  );
}
