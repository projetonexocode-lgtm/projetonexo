"use client";

import { Pause, Play } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { HERO_SLIDES } from "@/lib/images";
import { HERO_CYCLE_MS } from "@/lib/motion";

export function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const wasCycling = useRef(false);
  const [slide, setSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [ready, setReady] = useState(false);
  const [inView, setInView] = useState(true);
  const [pageVisible, setPageVisible] = useState(true);
  const [epoch, setEpoch] = useState(0);

  useEffect(() => {
    setReady(true);

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotion = () => setReduceMotion(motion.matches);
    syncMotion();
    motion.addEventListener("change", syncMotion);

    const syncVisibility = () =>
      setPageVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", syncVisibility);

    const node = rootRef.current;
    const observer = node
      ? new IntersectionObserver(
          ([entry]) => setInView(entry.isIntersecting),
          { threshold: 0.35 },
        )
      : null;
    if (node && observer) observer.observe(node);

    return () => {
      motion.removeEventListener("change", syncMotion);
      document.removeEventListener("visibilitychange", syncVisibility);
      observer?.disconnect();
    };
  }, []);

  const cycling =
    ready && !paused && !reduceMotion && inView && pageVisible;

  useEffect(() => {
    if (cycling && !wasCycling.current) setEpoch((value) => value + 1);
    wasCycling.current = cycling;
  }, [cycling]);

  useEffect(() => {
    if (!cycling) return undefined;
    const timer = window.setTimeout(() => {
      setSlide((current) => (current + 1) % HERO_SLIDES.length);
    }, HERO_CYCLE_MS);
    return () => window.clearTimeout(timer);
  }, [cycling, slide, epoch]);

  return (
    <section
      ref={rootRef}
      id="top"
      className="relative flex min-h-[min(88vh,860px)] items-end overflow-hidden bg-ink"
    >
      {HERO_SLIDES.map((item, index) => (
        <div
          key={item.src}
          aria-hidden={index !== slide}
          className={`nx-hero-slide absolute inset-0 ${
            index === slide ? "is-active" : ""
          }`}
        >
          <Image
            src={item.src}
            alt={item.alt}
            fill
            priority={index === 0}
            sizes="100vw"
            className="object-cover"
          />
        </div>
      ))}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-ink/40" />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-ink/80 via-ink/45 to-transparent" />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-ink/75 via-transparent to-ink/25" />

      <p className="pointer-events-none absolute top-[max(1.5rem,env(safe-area-inset-top))] right-[max(1.5rem,env(safe-area-inset-right))] z-10 hidden max-w-[min(46vw,320px)] text-right font-mono type-label leading-relaxed text-cream sm:block">
        {HERO_SLIDES[slide].label}
      </p>

      <div className="relative z-10 mx-auto w-full max-w-6xl pb-16 pl-[max(1.25rem,env(safe-area-inset-left))] pr-[max(1.25rem,env(safe-area-inset-right))] sm:pb-20 sm:pl-[max(2rem,env(safe-area-inset-left))] sm:pr-[max(2rem,env(safe-area-inset-right))]">
        <h1 className="max-w-[19ch] font-display text-[clamp(1.85rem,8vw,2.4rem)] leading-[1.05] text-cream sm:text-6xl lg:text-[5.25rem]">
          Gestão de obras com <span className="text-gold">rigor</span> de
          projeto.
        </h1>
        <p className="mt-6 max-w-[65ch] text-base leading-[1.7] tracking-[0.01em] text-sand sm:text-lg">
          Remodelação, construção e reabilitação de imóveis. Sede em Lisboa e
          Área Metropolitana, com obras em todo o território nacional.
        </p>
        <div className="mt-10 flex flex-wrap gap-3.5">
          <WhatsAppButton serviceLabel="os vossos serviços" variant="cream">
            Falar por WhatsApp
          </WhatsAppButton>
          <a
            href="#galeria"
            className="inline-flex min-h-12 items-center gap-2.5 rounded-full border border-gold/60 px-6 text-sm tracking-wide text-sand transition-colors hover:bg-gold/15"
          >
            Ver a obra
          </a>
        </div>
        <div className="mt-10 flex flex-wrap items-center">
          <div
            className="-ml-2 flex flex-wrap"
            role="group"
            aria-label="Imagens do hero"
          >
            {HERO_SLIDES.map((item, index) => (
              <button
                key={item.src}
                type="button"
                onClick={() => setSlide(index)}
                aria-label={`Ver imagem ${index + 1}: ${item.label}`}
                aria-current={index === slide ? true : undefined}
                className="flex size-11 touch-manipulation items-center justify-center rounded-full"
              >
                <span className="relative block h-0.5 w-7 overflow-hidden rounded-full bg-cream/30">
                  {index === slide && ready && !reduceMotion ? (
                    <span
                      key={`${slide}-${epoch}`}
                      className="nx-hero-progress absolute inset-y-0 left-0 w-full rounded-full bg-gold"
                      style={{
                        animationDuration: `${HERO_CYCLE_MS}ms`,
                        animationPlayState: cycling ? "running" : "paused",
                      }}
                    />
                  ) : index === slide ? (
                    <span className="absolute inset-0 rounded-full bg-gold" />
                  ) : null}
                </span>
              </button>
            ))}
          </div>
          {ready && !reduceMotion ? (
            <button
              type="button"
              aria-pressed={paused}
              aria-label={paused ? "Reproduzir imagens" : "Pausar imagens"}
              onClick={() => setPaused((value) => !value)}
              className="ml-1 inline-flex size-11 items-center justify-center rounded-full text-sand transition-colors hover:text-cream"
            >
              {paused ? (
                <Play className="size-4" fill="currentColor" aria-hidden="true" />
              ) : (
                <Pause className="size-4" fill="currentColor" aria-hidden="true" />
              )}
            </button>
          ) : null}
        </div>
      </div>
    </section>
  );
}
