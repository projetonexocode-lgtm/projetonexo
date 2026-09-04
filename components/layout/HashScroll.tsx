"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

function scrollToHash() {
  const id = window.location.hash.replace(/^#/, "");
  if (!id) return;

  const node = document.getElementById(id);
  if (!node) return;

  const header = document.querySelector("header");
  const offset = (header?.getBoundingClientRect().height ?? 80) + 16;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const top = node.getBoundingClientRect().top + window.scrollY - offset;

  window.scrollTo({ top: Math.max(0, top), behavior: reduce ? "auto" : "smooth" });
}

export function HashScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const frame = window.requestAnimationFrame(scrollToHash);

    function onClick(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const link = target.closest("a");
      if (!link || !link.hash) return;
      const url = new URL(link.href, window.location.href);
      if (url.pathname !== window.location.pathname) return;

      event.preventDefault();
      if (url.hash !== window.location.hash) {
        window.history.pushState(null, "", url.hash);
      }

      const fromMenu = Boolean(link.closest("#menu-mobile"));
      window.setTimeout(scrollToHash, fromMenu ? 400 : 0);
      if (fromMenu) window.setTimeout(scrollToHash, 700);
    }

    window.addEventListener("hashchange", scrollToHash);
    document.addEventListener("click", onClick, true);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("hashchange", scrollToHash);
      document.removeEventListener("click", onClick, true);
    };
  }, [pathname]);

  return null;
}
