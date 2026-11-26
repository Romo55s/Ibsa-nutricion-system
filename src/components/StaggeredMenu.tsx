import React, { useCallback, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useLocation, useNavigate } from "react-router-dom";
import { assets } from "../assets";

export interface StaggeredMenuItem {
  label: string;
  ariaLabel: string;
  link: string;
  onClick?: () => void;
}
export interface StaggeredMenuSocialItem {
  label: string;
  link: string;
}
export interface StaggeredMenuProps {
  position?: "left" | "right";
  colors?: string[];
  items?: StaggeredMenuItem[];
  socialItems?: StaggeredMenuSocialItem[];
  displaySocials?: boolean;
  displayItemNumbering?: boolean;
  className?: string;
  logoUrl?: string;
  menuButtonColor?: string;
  openMenuButtonColor?: string;
  accentColor?: string;
  isFixed: boolean;
  changeMenuColorOnOpen?: boolean;
  closeOnClickAway?: boolean;
  onMenuOpen?: () => void;
  onMenuClose?: () => void;
}

export const StaggeredMenu: React.FC<StaggeredMenuProps> = ({
  position = "right",
  colors = ["var(--color-light)", "var(--color-primary-2)"],
  items = [],
  socialItems = [],
  displaySocials = true,
  displayItemNumbering = true,
  className,
  logoUrl = assets.brand.logoWhite,
  menuButtonColor = "var(--color-primary)",
  openMenuButtonColor = "var(--color-primary)",
  changeMenuColorOnOpen = true,
  accentColor = "var(--color-muted)",
  isFixed = false,
  closeOnClickAway = true,
  onMenuOpen,
  onMenuClose,
}: StaggeredMenuProps) => {
  const [open, setOpen] = useState(false);
  const openRef = useRef(false);
  const location = useLocation();
  const navigate = useNavigate();

  const panelRef = useRef<HTMLDivElement | null>(null);
  const preLayersRef = useRef<HTMLDivElement | null>(null);
  const preLayerElsRef = useRef<HTMLElement[]>([]);

  const line1Ref = useRef<HTMLSpanElement | null>(null);
  const line2Ref = useRef<HTMLSpanElement | null>(null);
  const line3Ref = useRef<HTMLSpanElement | null>(null);

  const openTlRef = useRef<gsap.core.Timeline | null>(null);
  const closeTweenRef = useRef<gsap.core.Tween | null>(null);
  const spinTweenRef = useRef<gsap.core.Timeline | null>(null);
  const colorTweenRef = useRef<gsap.core.Tween | null>(null);

  const toggleBtnRef = useRef<HTMLButtonElement | null>(null);
  const busyRef = useRef(false);

  const itemEntranceTweenRef = useRef<gsap.core.Tween | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const panel = panelRef.current;
      const preContainer = preLayersRef.current;

      if (!panel) return;

      let preLayers: HTMLElement[] = [];
      if (preContainer) {
        preLayers = Array.from(
          preContainer.querySelectorAll(".sm-prelayer")
        ) as HTMLElement[];
      }
      preLayerElsRef.current = preLayers;

      const offscreen = position === "left" ? -100 : 100;
      gsap.set([panel, ...preLayers], { xPercent: offscreen });

      // Initial state for hamburger
      if (line1Ref.current && line2Ref.current && line3Ref.current) {
        gsap.set([line1Ref.current, line2Ref.current, line3Ref.current], {
          transformOrigin: "50% 50%",
        });
        gsap.set(line1Ref.current, { y: 0, rotate: 0 });
        gsap.set(line2Ref.current, { opacity: 1 });
        gsap.set(line3Ref.current, { y: 0, rotate: 0 });
      }

      if (toggleBtnRef.current)
        gsap.set(toggleBtnRef.current, { color: menuButtonColor });
    });
    return () => ctx.revert();
  }, [menuButtonColor, position]);

  const buildOpenTimeline = useCallback(() => {
    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return null;

    openTlRef.current?.kill();
    if (closeTweenRef.current) {
      closeTweenRef.current.kill();
      closeTweenRef.current = null;
    }
    itemEntranceTweenRef.current?.kill();

    const itemEls = Array.from(
      panel.querySelectorAll(".sm-panel-itemLabel")
    ) as HTMLElement[];
    const numberEls = Array.from(
      panel.querySelectorAll(".sm-panel-list[data-numbering] .sm-panel-item")
    ) as HTMLElement[];
    const socialTitle = panel.querySelector(
      ".sm-socials-title"
    ) as HTMLElement | null;
    const socialLinks = Array.from(
      panel.querySelectorAll(".sm-socials-link")
    ) as HTMLElement[];

    const layerStates = layers.map((el) => ({
      el,
      start: Number(gsap.getProperty(el, "xPercent")),
    }));
    const panelStart = Number(gsap.getProperty(panel, "xPercent"));

    if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 });
    if (numberEls.length)
      gsap.set(numberEls, { ["--sm-num-opacity" as any]: 0 });
    if (socialTitle) gsap.set(socialTitle, { opacity: 0 });
    if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    layerStates.forEach((ls, i) => {
      tl.fromTo(
        ls.el,
        { xPercent: ls.start },
        { xPercent: 0, duration: 0.5, ease: "power4.out" },
        i * 0.07
      );
    });

    const lastTime = layerStates.length ? (layerStates.length - 1) * 0.07 : 0;
    const panelInsertTime = lastTime + (layerStates.length ? 0.08 : 0);
    const panelDuration = 0.65;

    tl.fromTo(
      panel,
      { xPercent: panelStart },
      { xPercent: 0, duration: panelDuration, ease: "power4.out" },
      panelInsertTime
    );

    if (itemEls.length) {
      const itemsStartRatio = 0.15;
      const itemsStart = panelInsertTime + panelDuration * itemsStartRatio;

      tl.to(
        itemEls,
        {
          yPercent: 0,
          rotate: 0,
          duration: 1,
          ease: "power4.out",
          stagger: { each: 0.1, from: "start" },
        },
        itemsStart
      );

      if (numberEls.length) {
        tl.to(
          numberEls,
          {
            duration: 0.6,
            ease: "power2.out",
            ["--sm-num-opacity" as any]: 1,
            stagger: { each: 0.08, from: "start" },
          },
          itemsStart + 0.1
        );
      }
    }

    if (socialTitle || socialLinks.length) {
      const socialsStart = panelInsertTime + panelDuration * 0.4;

      if (socialTitle)
        tl.to(
          socialTitle,
          { opacity: 1, duration: 0.5, ease: "power2.out" },
          socialsStart
        );
      if (socialLinks.length) {
        tl.to(
          socialLinks,
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
            ease: "power3.out",
            stagger: { each: 0.08, from: "start" },
            onComplete: () => {
              gsap.set(socialLinks, { clearProps: "opacity" });
            },
          },
          socialsStart + 0.04
        );
      }
    }

    openTlRef.current = tl;
    return tl;
  }, [position]);

  const playOpen = useCallback(() => {
    if (busyRef.current) return;
    busyRef.current = true;
    const tl = buildOpenTimeline();
    if (tl) {
      tl.eventCallback("onComplete", () => {
        busyRef.current = false;
      });
      tl.play(0);
    } else {
      busyRef.current = false;
    }
  }, [buildOpenTimeline]);

  const playClose = useCallback(() => {
    openTlRef.current?.kill();
    openTlRef.current = null;
    itemEntranceTweenRef.current?.kill();

    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return;

    const all: HTMLElement[] = [...layers, panel];
    closeTweenRef.current?.kill();

    const offscreen = position === "left" ? -100 : 100;

    closeTweenRef.current = gsap.to(all, {
      xPercent: offscreen,
      duration: 0.32,
      ease: "power3.in",
      overwrite: "auto",
      onComplete: () => {
        const itemEls = Array.from(
          panel.querySelectorAll(".sm-panel-itemLabel")
        ) as HTMLElement[];
        if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 });

        const numberEls = Array.from(
          panel.querySelectorAll(
            ".sm-panel-list[data-numbering] .sm-panel-item"
          )
        ) as HTMLElement[];
        if (numberEls.length)
          gsap.set(numberEls, { ["--sm-num-opacity" as any]: 0 });

        const socialTitle = panel.querySelector(
          ".sm-socials-title"
        ) as HTMLElement | null;
        const socialLinks = Array.from(
          panel.querySelectorAll(".sm-socials-link")
        ) as HTMLElement[];
        if (socialTitle) gsap.set(socialTitle, { opacity: 0 });
        if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 });

        busyRef.current = false;
      },
    });
  }, [position]);

  const animateIcon = useCallback((opening: boolean) => {
    const l1 = line1Ref.current;
    const l2 = line2Ref.current;
    const l3 = line3Ref.current;
    if (!l1 || !l2 || !l3) return;

    spinTweenRef.current?.kill();

    // Hamburger has 3 lines.
    // To X: Top line rotates 45 and moves down. Bottom line rotates -45 and moves up. Middle fades out.
    // Assuming height of container is ~14px or similar.
    // If using Tailwind `h-[2px]` with gap or flex space-between.

    const tl = gsap.timeline({
      defaults: { duration: 0.4, ease: "power2.out" },
    });

    if (opening) {
      tl.to(l2, { opacity: 0, duration: 0.2 }, 0)
        .to(l1, { y: 6, rotate: 45 }, 0)
        .to(l3, { y: -6, rotate: -45 }, 0);
    } else {
      tl.to(l1, { y: 0, rotate: 0 }, 0)
        .to(l2, { opacity: 1, duration: 0.2, delay: 0.1 }, 0)
        .to(l3, { y: 0, rotate: 0 }, 0);
    }
    spinTweenRef.current = tl;
  }, []);

  const animateColor = useCallback(
    (opening: boolean) => {
      const btn = toggleBtnRef.current;
      if (!btn) return;
      colorTweenRef.current?.kill();
      if (changeMenuColorOnOpen) {
        const targetColor = opening ? openMenuButtonColor : menuButtonColor;
        colorTweenRef.current = gsap.to(btn, {
          color: targetColor,
          delay: 0.18,
          duration: 0.3,
          ease: "power2.out",
        });
      } else {
        gsap.set(btn, { color: menuButtonColor });
      }
    },
    [openMenuButtonColor, menuButtonColor, changeMenuColorOnOpen]
  );

  React.useEffect(() => {
    if (toggleBtnRef.current) {
      if (changeMenuColorOnOpen) {
        const targetColor = openRef.current
          ? openMenuButtonColor
          : menuButtonColor;
        gsap.set(toggleBtnRef.current, { color: targetColor });
      } else {
        gsap.set(toggleBtnRef.current, { color: menuButtonColor });
      }
    }
  }, [changeMenuColorOnOpen, menuButtonColor, openMenuButtonColor]);

  const toggleMenu = useCallback(() => {
    const target = !openRef.current;
    openRef.current = target;
    setOpen(target);

    if (target) {
      onMenuOpen?.();
      playOpen();
    } else {
      onMenuClose?.();
      playClose();
    }

    animateIcon(target);
    animateColor(target);
  }, [playOpen, playClose, animateIcon, animateColor, onMenuOpen, onMenuClose]);

  const closeMenu = useCallback(() => {
    if (openRef.current) {
      openRef.current = false;
      setOpen(false);
      onMenuClose?.();
      playClose();
      animateIcon(false);
      animateColor(false);
    }
  }, [playClose, animateIcon, animateColor, onMenuClose]);

  React.useEffect(() => {
    if (!closeOnClickAway || !open) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node) &&
        toggleBtnRef.current &&
        !toggleBtnRef.current.contains(event.target as Node)
      ) {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeOnClickAway, open, closeMenu]);

  return (
    <div
      className={`sm-scope z-[60] ${isFixed ? "pointer-events-none fixed left-0 top-0 h-screen w-screen overflow-hidden" : "h-full w-full"}`}
    >
      <div
        className={
          (className ? className + " " : "") +
          "staggered-menu-wrapper pointer-events-none relative z-[60] h-full w-full"
        }
        style={
          accentColor
            ? ({ ["--sm-accent" as any]: accentColor } as React.CSSProperties)
            : undefined
        }
        data-position={position}
        data-open={open || undefined}
      >
        <div
          ref={preLayersRef}
          className="sm-prelayers pointer-events-none absolute w-screen bottom-0 right-0 top-0 z-[5]"
          aria-hidden="true"
        >
          {(() => {
            const raw =
              colors && colors.length
                ? colors.slice(0, 4)
                : ["var(--color-light)", "var(--color-primary-2)"];
            let arr = [...raw];
            if (arr.length >= 3) {
              const mid = Math.floor(arr.length / 2);
              arr.splice(mid, 1);
            }
            return arr.map((c, i) => (
              <div
                key={i}
                className="sm-prelayer absolute right-0 top-0 h-full w-full translate-x-0"
                style={{ background: c }}
              />
            ));
          })()}
        </div>

        <header
          className="staggered-menu-header pointer-events-none absolute left-0 top-0 z-20 flex h-20 w-full items-center justify-end bg-transparent px-[var(--page-gutter)]"
          aria-label="Main navigation header"
        >
          <button
            ref={toggleBtnRef}
            className="sm-toggle pointer-events-auto relative inline-flex min-h-11 min-w-11 cursor-pointer items-center justify-end gap-2 bg-transparent text-primary"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            aria-controls="staggered-menu-panel"
            onClick={toggleMenu}
            type="button"
          >
            {/* Close text only visible when open */}
            <span
              className="sm-label overflow-hidden text-sm font-medium uppercase tracking-wider transition-all duration-300 ease-out"
              style={{
                maxWidth: open ? "100px" : "0px",
                opacity: open ? 1 : 0,
              }}
            >
              Cerrar
            </span>

            {/* Custom Hamburger / X Icon */}
            <span className="relative flex h-[14px] w-[18px] flex-col items-center justify-between">
              <span
                ref={line1Ref}
                className="h-[2px] w-full origin-center rounded-full bg-current will-change-transform"
              />
              <span
                ref={line2Ref}
                className="will-change-opacity h-[2px] w-full origin-center rounded-full bg-current"
              />
              <span
                ref={line3Ref}
                className="h-[2px] w-full origin-center rounded-full bg-current will-change-transform"
              />
            </span>
          </button>
        </header>

        <aside
          id="staggered-menu-panel"
          ref={panelRef}
          className="staggered-menu-panel pointer-events-auto absolute right-0 top-0 z-10 flex h-full w-screen flex-col overflow-y-auto bg-white px-[var(--page-gutter)] pb-8 pt-24"
          aria-hidden={!open}
        >
          {logoUrl && (
            <div className="sm-panel-logo absolute left-[var(--page-gutter)] top-6">
              <img
                src={logoUrl}
                alt="Logo"
                className="h-8 w-auto object-contain invert filter"
              />
            </div>
          )}

          <div className="sm-panel-inner mt-2 flex flex-1 flex-col gap-5">
            <ul
              className="sm-panel-list m-0 flex list-none flex-col gap-2 p-0"
              role="list"
              data-numbering={displayItemNumbering || undefined}
            >
              {items && items.length ? (
                items.map((it, idx) => (
                  <li
                    className="sm-panel-itemWrap relative overflow-hidden border-b border-light leading-none"
                    key={it.label + idx}
                  >
                    <a
                      className="sm-panel-item relative transition-colors"
                      href={it.link}
                      tabIndex={open ? undefined : -1}
                      aria-label={it.ariaLabel}
                      data-index={idx + 1}
                      onClick={(e) => {
                        // Si estamos fuera de home y el link es un anchor, navegar a home con el hash
                        if (
                          location.pathname !== "/" &&
                          it.link.startsWith("#")
                        ) {
                          e.preventDefault();
                          navigate(`/${it.link}`);
                          closeMenu();
                        } else if (
                          location.pathname === "/" &&
                          it.link.startsWith("#")
                        ) {
                          e.preventDefault();
                          closeMenu();
                          const element = document.querySelector(it.link);
                          if (element) {
                            const top =
                              element.getBoundingClientRect().top +
                              window.pageYOffset -
                              100;
                            window.scrollTo({ top, behavior: "smooth" });
                          }
                        } else if (it.link.startsWith("/") && !it.link.startsWith("//")) {
                          e.preventDefault();
                          navigate(it.link);
                          closeMenu();
                        } else if (it.onClick) {
                          e.preventDefault();
                          it.onClick();
                          closeMenu();
                        } else {
                          closeMenu();
                        }
                      }}
                    >
                      <span className="sm-panel-itemLabel inline-block will-change-transform [transform-origin:50%_100%]">
                        {it.label}
                      </span>
                    </a>
                  </li>
                ))
              ) : (
                <li
                  className="sm-panel-itemWrap relative overflow-hidden border-b border-light leading-none"
                  aria-hidden="true"
                >
                  <span className="sm-panel-item relative transition-colors">
                    <span className="sm-panel-itemLabel inline-block will-change-transform [transform-origin:50%_100%]">
                      No items
                    </span>
                  </span>
                </li>
              )}
            </ul>

            {displaySocials && socialItems && socialItems.length > 0 && (
              <div
                className="sm-socials mt-auto flex flex-col gap-3 pt-8"
                aria-label="Social links"
              >
                <h3 className="sm-socials-title m-0 text-base font-medium text-muted">
                  Redes sociales
                </h3>
                <ul
                  className="sm-socials-list m-0 flex list-none flex-row flex-wrap items-center gap-4 p-0"
                  role="list"
                >
                  {socialItems.map((s, i) => (
                    <li key={s.label + i} className="sm-socials-item">
                      <a
                        href={s.link}
                        tabIndex={open ? undefined : -1}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="sm-socials-link relative inline-flex min-h-11 items-center text-base font-medium text-primary no-underline transition-[color,opacity] duration-300 ease-linear"
                      >
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </aside>
      </div>

      <style>{`
.sm-scope [data-position='left'] :is(.staggered-menu-panel, .sm-prelayers) {
  right: auto;
  left: 0;
}
.sm-scope .sm-panel-item {
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  padding: .15em .9em .15em 0;
  color: var(--color-primary);
  font-size: clamp(1.625rem, 6vw, 2.75rem);
  font-weight: 500;
  line-height: 1.12;
  letter-spacing: -.04em;
}
.sm-scope .sm-panel-item:focus-visible {
  outline-offset: -2px;
  box-shadow: none;
}
.sm-scope :is(.sm-panel-item, .sm-socials-link):hover {
  color: var(--sm-accent, var(--color-accent));
}
.sm-panel-list[data-numbering] { counter-reset: smItem; }
.sm-panel-list[data-numbering] .sm-panel-item::after {
  counter-increment: smItem;
  content: counter(smItem, decimal-leading-zero);
  position: absolute;
  top: .5em;
  right: 0;
  font: 400 .75rem monospace;
  color: var(--sm-accent, var(--color-muted));
  letter-spacing: 0;
  pointer-events: none;
  opacity: var(--sm-num-opacity, 0);
}
      `}</style>
    </div>
  );
};

export default StaggeredMenu;
