"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState, useSyncExternalStore, type ChangeEvent, type FormEvent } from "react";
import { contact, profile, type Accent } from "../data";
import Icon from "./Icon";
import { EASE, fadeUp, scaleIn, stagger } from "./motion";
import { AnimatedHeading } from "./ui";

export default function Contact() {
  const reduce = useReducedMotion();
  const { availability, panel } = contact;

  return (
    <section id="contact" className="relative flex w-full flex-col overflow-hidden">
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <motion.span
          className="absolute top-[10%] -right-[10%] h-[600px] w-[600px] rounded-full bg-primary/5 mix-blend-screen blur-[120px]"
          animate={reduce ? undefined : { opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.span
          className="absolute bottom-[15%] left-[20%] h-[460px] w-[460px] rounded-full bg-secondary/5 mix-blend-screen blur-[100px]"
          animate={reduce ? undefined : { opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 12, delay: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="tech-grid absolute inset-0 opacity-50" />
      </div>

      <motion.div
        variants={stagger(0.1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-15%" }}
        className="section-x relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-start gap-10 py-16 @3xl:gap-12 @3xl:py-section-gap @5xl:grid-cols-12"
      >
        <div className="flex max-w-2xl min-w-0 flex-col gap-8 @3xl:gap-10 @5xl:col-span-5 @5xl:max-w-none">
          <div className="flex flex-col gap-6">
            <motion.div variants={fadeUp} className="flex items-center gap-3">
              <span className="h-px w-8 bg-primary" />
              <span className="font-mono text-label-caps tracking-widest text-primary uppercase">{contact.eyebrow}</span>
            </motion.div>
            <AnimatedHeading
              segments={contact.headline}
              highlight="gradient"
              blockLines
              className="font-display text-[clamp(2.1rem,5.5cqw,3rem)] leading-[1.05] font-bold tracking-tight text-on-surface @5xl:text-[clamp(2.1rem,3.6cqw,3rem)]"
            />
            <motion.p variants={fadeUp} className="max-w-md text-body-md leading-relaxed text-on-surface-variant">
              {contact.body}
            </motion.p>
            <motion.div variants={fadeUp} className="glass flex w-fit items-center gap-3 rounded-full px-4 py-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-tertiary opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-tertiary shadow-glow-dot" />
              </span>
              <span className="font-mono text-label-caps whitespace-nowrap text-on-surface uppercase">{availability.label}</span>
              <span className="hidden font-mono text-code-sm whitespace-nowrap text-on-surface-variant opacity-60 sm:inline">
                / {availability.detail}
              </span>
            </motion.div>
          </div>
          <ContactLinks />
        </div>

        <motion.div variants={scaleIn} className="@container/card relative min-w-0 @5xl:col-span-7">
          <div className="pointer-events-none absolute -inset-4 z-0 rounded-[2rem] bg-linear-to-br from-primary/20 via-surface-container/50 to-secondary/10 opacity-50 blur-xl" />
          <div className="relative z-10 flex flex-col overflow-hidden rounded-3xl border border-outline-variant/30 bg-surface-container-low/80 shadow-2xl backdrop-blur-2xl @2xl/card:flex-row">
            <div className="relative h-52 w-full shrink-0 bg-surface-dim @2xl/card:h-auto @2xl/card:w-[34%]">
              <Image
                src={profile.portrait.src}
                alt={profile.portrait.alt}
                fill
                sizes="(min-width: 1024px) 300px, 100vw"
                className="object-cover object-[50%_8%] brightness-90 contrast-125 grayscale transition-all duration-700 hover:brightness-100 hover:contrast-100 hover:grayscale-0 @2xl/card:object-[50%_25%]"
              />
              <div className="pointer-events-none absolute inset-0 z-10 bg-linear-to-t from-surface-container-low via-transparent to-surface-container-low/50 mix-blend-multiply" />
              <span className="absolute top-4 left-4 z-20 flex items-center gap-2 rounded-lg border border-outline-variant/20 bg-surface/50 px-3 py-1.5 backdrop-blur-md">
                <span className="h-2 w-2 animate-pulse rounded-full bg-tertiary" />
                <span className="font-mono text-label-caps whitespace-nowrap text-tertiary uppercase">{panel.status}</span>
              </span>
              <span className="absolute bottom-4 left-4 z-20 font-mono text-code-sm text-on-surface-variant">{panel.caption}</span>
            </div>
            <ContactForm />
          </div>
        </motion.div>
      </motion.div>

      <Footer />
    </section>
  );
}

const socialAccent: Record<Accent, { text: string; border: string; tint: string }> = {
  primary: { text: "group-hover:text-primary", border: "hover:border-primary/50", tint: "group-hover:bg-primary/20" },
  secondary: { text: "group-hover:text-secondary", border: "hover:border-secondary/50", tint: "group-hover:bg-secondary/20" },
  tertiary: { text: "group-hover:text-tertiary", border: "hover:border-tertiary/50", tint: "group-hover:bg-tertiary/20" },
};

function ContactLinks() {
  const reduce = useReducedMotion();

  return (
    <div className="flex flex-col gap-4">
      {contact.links.map((l) => (
        <motion.a
          key={l.href}
          href={l.href}
          variants={fadeUp}
          whileHover={reduce ? undefined : { y: -4 }}
          transition={{ duration: 0.4, ease: EASE }}
          data-spotlight
          className="group relative overflow-hidden rounded-2xl border border-outline-variant/30 bg-surface-container/60 p-4 backdrop-blur-xl transition-colors duration-300 hover:border-primary/50 hover:bg-surface-container-high @3xl:p-5"
        >
          <span className="pointer-events-none absolute inset-0 bg-linear-to-r from-primary/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <div className="relative z-10 flex items-center gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-surface-container-highest text-on-surface-variant transition-all duration-300 group-hover:bg-primary group-hover:text-on-primary group-hover:shadow-glow">
              <Icon name={l.icon} size={20} strokeWidth={1.75} />
            </span>
            <span className="flex min-w-0 flex-col">
              <span className="mb-1 font-mono text-label-caps text-on-surface-variant uppercase">{l.eyebrow}</span>
              <span className="text-sm break-words text-on-surface transition-colors group-hover:text-primary @md:text-[15px]">{l.value}</span>
            </span>
            <Icon
              name="arrowRight"
              size={18}
              className="ml-auto hidden shrink-0 text-outline-variant transition-all duration-300 group-hover:translate-x-1 group-hover:text-primary @md:block"
            />
          </div>
        </motion.a>
      ))}
      <div className="grid grid-cols-2 gap-4">
        {contact.socials.map((s) => {
          const a = socialAccent[s.accent];
          return (
            <motion.a
              key={s.label}
              href={s.href}
              target={s.external ? "_blank" : undefined}
              rel="noreferrer"
              download={s.external ? undefined : true}
              variants={fadeUp}
              whileHover={reduce ? undefined : { y: -4 }}
              transition={{ duration: 0.4, ease: EASE }}
              data-spotlight
              className={`group flex min-w-0 flex-col items-center justify-center gap-3 rounded-2xl border border-outline-variant/30 bg-surface-container/60 p-4 backdrop-blur-xl transition-colors duration-300 hover:bg-surface-container-high @3xl:p-5 ${a.border}`}
            >
              <span
                className={`flex h-10 w-10 items-center justify-center rounded-full bg-surface-container-highest text-on-surface-variant transition-colors duration-300 ${a.tint} ${a.text}`}
              >
                <Icon name={s.icon} size={18} strokeWidth={1.75} />
              </span>
              <span className="flex w-full min-w-0 flex-col items-center gap-1">
                <span className={`font-mono text-label-caps text-on-surface-variant uppercase transition-colors ${a.text}`}>{s.label}</span>
                <span className="max-w-full truncate font-mono text-[12px] text-on-surface-variant opacity-60">{s.handle}</span>
              </span>
            </motion.a>
          );
        })}
      </div>
    </div>
  );
}

const fieldClass =
  "w-full rounded-lg border border-outline-variant/50 bg-black/30 px-4 py-3 text-body-md text-on-surface placeholder:text-on-surface-variant/40 transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20";
const labelClass =
  "font-mono text-label-caps uppercase tracking-widest text-on-surface-variant transition-colors group-focus-within:text-primary";

const emptyForm = { name: "", email: "", projectType: "", message: "" };

/** Posts the form to /api/contact, which relays it over Gmail SMTP. */
function ContactForm() {
  const reduce = useReducedMotion();
  const { fields, projectTypes, note, submit, sending, success } = contact.form;
  const [values, setValues] = useState(emptyForm);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState<string | null>(null);
  const [typeError, setTypeError] = useState(false);
  const sent = status === "sent";

  const update = (key: keyof typeof emptyForm) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setValues((v) => ({ ...v, [key]: e.target.value }));

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!values.projectType) {
      setTypeError(true);
      return;
    }
    setStatus("sending");
    setError(null);
    const company = (new FormData(e.currentTarget).get("company") as string | null) ?? "";
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, company }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error ?? "Something went wrong. Please try again.");
      }
      setStatus("sent");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setStatus("idle");
    }
  };

  const reset = () => {
    setValues(emptyForm);
    setStatus("idle");
    setError(null);
    setTypeError(false);
  };

  return (
    <div className="@container/form relative min-w-0 grow p-6 @3xl:p-8">
      <form onSubmit={onSubmit} className="flex flex-col gap-5 @3xl:gap-6">
        {/* Honeypot for bots; hidden from people and assistive tech. */}
        <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
        <div className="grid grid-cols-1 gap-5 @md/form:grid-cols-2 @md/form:gap-4">
          <div className="group flex flex-col gap-2">
            <label className={labelClass} htmlFor="contact-name">
              {fields.name.label}
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              required
              autoComplete="name"
              value={values.name}
              onChange={update("name")}
              placeholder={fields.name.placeholder}
              className={fieldClass}
            />
          </div>
          <div className="group flex flex-col gap-2">
            <label className={labelClass} htmlFor="contact-email">
              {fields.email.label}
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              value={values.email}
              onChange={update("email")}
              placeholder={fields.email.placeholder}
              className={fieldClass}
            />
          </div>
        </div>
        <fieldset className="flex flex-col gap-3">
          <legend className={`${labelClass} mb-3`}>{fields.projectType.label}</legend>
          <div role="radiogroup" aria-label={fields.projectType.label} className="flex flex-wrap gap-2">
            {projectTypes.map((t) => {
              const selected = values.projectType === t.value;
              return (
                <button
                  key={t.value}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => {
                    setValues((v) => ({ ...v, projectType: t.value }));
                    setTypeError(false);
                  }}
                  className={`rounded-full border px-3.5 py-2 text-[13px] transition-all duration-200 ${
                    selected
                      ? "border-primary/60 bg-primary/15 text-primary shadow-glow-soft"
                      : "border-outline-variant/60 bg-black/20 text-on-surface-variant hover:border-outline hover:text-on-surface"
                  }`}
                >
                  {t.label}
                </button>
              );
            })}
          </div>
          {typeError && <p className="font-mono text-code-sm text-error">Pick the closest match to continue.</p>}
        </fieldset>
        <div className="group flex flex-col gap-2">
          <label className={labelClass} htmlFor="contact-message">
            {fields.message.label}
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={4}
            required
            value={values.message}
            onChange={update("message")}
            placeholder={fields.message.placeholder}
            className={`${fieldClass} resize-none`}
          />
        </div>
        {error && (
          <p role="alert" className="font-mono text-code-sm text-error">
            {error}
          </p>
        )}
        <div className="mt-2 flex flex-col items-stretch gap-4 @md/form:flex-row @md/form:items-center @md/form:justify-between">
          <span className="hidden items-center gap-2 font-mono text-code-sm text-on-surface-variant/60 @md/form:flex">
            <Icon name="send" size={14} strokeWidth={1.75} />
            {note}
          </span>
          <motion.button
            type="submit"
            disabled={status === "sending"}
            whileTap={reduce ? undefined : { scale: 0.97 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="group relative w-full overflow-hidden rounded-lg bg-primary px-8 py-3 font-mono whitespace-nowrap text-label-caps tracking-widest text-on-primary uppercase shadow-glow transition-all duration-300 hover:shadow-glow-lg disabled:cursor-wait disabled:opacity-70 @md/form:w-auto"
          >
            <span className="pointer-events-none absolute inset-0 translate-y-full bg-white/20 transition-transform duration-300 ease-out group-hover:translate-y-0" />
            <span className="relative z-10 flex items-center justify-center gap-2 transition-all group-hover:gap-3">
              {status === "sending" ? sending : submit}
              <Icon name={status === "sending" ? "send" : "arrowRight"} size={16} strokeWidth={2} />
            </span>
          </motion.button>
        </div>
      </form>

      <AnimatePresence>
        {sent && (
          <motion.div
            initial={{ opacity: 0, scale: reduce ? 1 : 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-surface-container-low/95 p-6 text-center backdrop-blur-xl"
          >
            <span className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-tertiary/20 text-tertiary">
              <Icon name="check" size={28} strokeWidth={2} />
            </span>
            <h3 className="mb-2 font-display text-2xl text-on-surface">{success.title}</h3>
            <p aria-live="polite" className="max-w-sm text-body-md text-on-surface-variant">
              {success.body}
            </p>
            <button
              type="button"
              onClick={reset}
              className="mt-8 rounded-lg border border-outline-variant px-6 py-2 font-mono text-label-caps tracking-widest text-on-surface uppercase transition-colors hover:border-primary hover:bg-surface-container"
            >
              {success.reset}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Footer() {
  // No year on the server, so the page stays prerenderable; the client fills it in.
  const year = useSyncExternalStore(
    () => () => {},
    () => new Date().getFullYear(),
    () => null,
  );

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: EASE }}
      className="section-x relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-4 border-t border-outline-variant/30 py-8 text-center @2xl:flex-row @2xl:text-left"
    >
      <p className="font-mono text-code-sm text-on-surface-variant opacity-60">
        © {year ?? ""} {contact.footer.note}
      </p>
      <a
        href="#home"
        className="group flex items-center gap-2 font-mono text-label-caps tracking-widest text-on-surface-variant uppercase transition-colors hover:text-primary"
      >
        {contact.footer.backToTop}
        <Icon name="chevronUp" size={14} strokeWidth={2} className="transition-transform duration-300 group-hover:-translate-y-1" />
      </a>
    </motion.footer>
  );
}
