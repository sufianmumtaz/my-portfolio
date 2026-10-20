import type { Variants } from "motion/react";

export const EASE = [0.16, 1, 0.3, 1] as const;

export const stagger = (children = 0.08, delay = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: children, delayChildren: delay } },
});

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.8, ease: EASE } },
};

export const blurWord: Variants = {
  hidden: { opacity: 0, y: "0.4em", filter: "blur(12px)" },
  show: { opacity: 1, y: "0em", filter: "blur(0px)", transition: { duration: 0.9, ease: EASE } },
};

export const reducedWord: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.3 } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: EASE } },
};

export const slideFromLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: EASE } },
};

export const accentText = {
  primary: "text-primary",
  secondary: "text-secondary",
  tertiary: "text-tertiary",
  "primary-container": "text-primary-container",
} as const;
