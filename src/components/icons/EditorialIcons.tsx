import type { ReactNode, SVGProps } from 'react';

/**
 * Editorial Icon Set — Invitique
 * ------------------------------------------------------------------
 * Bespoke hairline iconography drawn specifically for the wedding
 * invitation. Replaces generic lucide line icons (stroke 2, utilitarian
 * geometry) with refined 1.25px strokes, rounded terminals, and softer
 * couture forms so nothing reads as a stock UI template.
 *
 * Every icon shares one 24×24 grid and inherits `currentColor`, so callers
 * keep using `style={{ color: t.accent }}` exactly as before.
 */

interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'children'> {
  size?: number;
  strokeWidth?: number;
}

function Glyph({
  size = 16,
  strokeWidth = 1.25,
  children,
  ...rest
}: IconProps & { children: ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...rest}
    >
      {children}
    </svg>
  );
}

/* ── Wedding-day info ─────────────────────────────────────────── */

export function CalendarGlyph(p: IconProps) {
  return (
    <Glyph {...p}>
      <rect x="3.75" y="5.25" width="16.5" height="15" rx="1.4" />
      <path d="M3.75 9.25h16.5" />
      <path d="M8 3.25v3M16 3.25v3" />
      {/* a small heart marks the day */}
      <path d="M12 16.4c-1.5-1.05-2.6-1.95-2.6-3.05a1.35 1.35 0 0 1 2.6-.5 1.35 1.35 0 0 1 2.6.5c0 1.1-1.1 2-2.6 3.05Z" />
    </Glyph>
  );
}

export function ClockGlyph(p: IconProps) {
  return (
    <Glyph {...p}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.25V12l3.25 2" />
    </Glyph>
  );
}

export function PinGlyph(p: IconProps) {
  return (
    <Glyph {...p}>
      <path d="M12 21.25c0 0 6.5-5.9 6.5-11.1A6.5 6.5 0 1 0 5.5 10.15c0 5.2 6.5 11.1 6.5 11.1Z" />
      <circle cx="12" cy="9.6" r="2.35" />
    </Glyph>
  );
}

export function CompassGlyph(p: IconProps) {
  return (
    <Glyph {...p}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M15.4 8.6l-1.6 4.5-4.5 1.6 1.6-4.5 4.5-1.6Z" />
    </Glyph>
  );
}

/* ── RSVP / guests ───────────────────────────────────────────── */

export function PersonGlyph(p: IconProps) {
  return (
    <Glyph {...p}>
      <circle cx="12" cy="8.25" r="3.4" />
      <path d="M5.5 19.25c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6" />
    </Glyph>
  );
}

export function PhoneGlyph(p: IconProps) {
  return (
    <Glyph {...p}>
      <path d="M8.4 4.5l1.7 3.4-1.7 1.9a11 11 0 0 0 4.8 4.8l1.9-1.7 3.4 1.7v3.1c0 .9-.74 1.6-1.62 1.5C12.6 22.1 4.9 14.4 4.4 6.62 4.34 5.74 5.04 5 5.9 5h2.5Z" />
    </Glyph>
  );
}

/* ── Account / gift ──────────────────────────────────────────── */

export function EnvelopeGlyph(p: IconProps) {
  return (
    <Glyph {...p}>
      <rect x="3.75" y="6" width="16.5" height="12" rx="1.4" />
      <path d="M4.4 7l6.55 5.1a1.7 1.7 0 0 0 2.1 0L19.6 7" />
    </Glyph>
  );
}

/* ── Guestbook ───────────────────────────────────────────────── */

export function PenGlyph(p: IconProps) {
  return (
    <Glyph {...p}>
      <path d="M16.6 4.4l3 3L9.1 17.9l-3.95 1 1-3.95L16.6 4.4Z" />
      <path d="M14.6 6.4l3 3" />
    </Glyph>
  );
}

/* ── Decorative / sentiment ──────────────────────────────────── */

export function HeartGlyph({ filled, ...p }: IconProps & { filled?: boolean }) {
  return (
    <Glyph {...p} fill={filled ? 'currentColor' : 'none'}>
      <path d="M12 20.2C5.8 16.1 3.4 12.5 3.4 9.3A4 4 0 0 1 12 7.05 4 4 0 0 1 20.6 9.3c0 3.2-2.4 6.8-8.6 10.9Z" />
    </Glyph>
  );
}

/* Quatrefoil bloom — the divider centerpiece (symmetric 4-petal flower) */
export function BloomGlyph(p: IconProps) {
  return (
    <Glyph {...p}>
      <path d="M12 12C10.3 10.3 10.3 7.5 12 6 13.7 7.5 13.7 10.3 12 12Z" />
      <path d="M12 12C13.7 10.3 16.5 10.3 18 12 16.5 13.7 13.7 13.7 12 12Z" />
      <path d="M12 12C13.7 13.7 13.7 16.5 12 18 10.3 16.5 10.3 13.7 12 12Z" />
      <path d="M12 12C10.3 13.7 7.5 13.7 6 12 7.5 10.3 10.3 10.3 12 12Z" />
      <circle cx="12" cy="12" r="0.7" fill="currentColor" stroke="none" />
    </Glyph>
  );
}

/* ── Utility / navigation ────────────────────────────────────── */

export function ShareGlyph(p: IconProps) {
  return (
    <Glyph {...p}>
      <path d="M12 14.5V4M8.6 7.4L12 4l3.4 3.4" />
      <path d="M6.5 12v6.2A1.3 1.3 0 0 0 7.8 19.5h8.4a1.3 1.3 0 0 0 1.3-1.3V12" />
    </Glyph>
  );
}

export function CopyGlyph(p: IconProps) {
  return (
    <Glyph {...p}>
      <rect x="8.5" y="8.5" width="11" height="11" rx="1.4" />
      <path d="M15.5 8.5V6A1.5 1.5 0 0 0 14 4.5H6A1.5 1.5 0 0 0 4.5 6v8A1.5 1.5 0 0 0 6 15.5h2.5" />
    </Glyph>
  );
}

export function CheckGlyph(p: IconProps) {
  return (
    <Glyph {...p}>
      <path d="M4.5 12.5l4.8 4.8L19.5 6.5" />
    </Glyph>
  );
}

export function ChevronDownGlyph(p: IconProps) {
  return (
    <Glyph {...p}>
      <path d="M6.5 9.5L12 15l5.5-5.5" />
    </Glyph>
  );
}

export function ChevronRightGlyph(p: IconProps) {
  return (
    <Glyph {...p}>
      <path d="M9.5 6.5L15 12l-5.5 5.5" />
    </Glyph>
  );
}

export function ArrowLeftGlyph(p: IconProps) {
  return (
    <Glyph {...p}>
      <path d="M19 12H5M11 6l-6 6 6 6" />
    </Glyph>
  );
}

export function ArrowRightGlyph(p: IconProps) {
  return (
    <Glyph {...p}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </Glyph>
  );
}

export function ChevronLeftGlyph(p: IconProps) {
  return (
    <Glyph {...p}>
      <path d="M14.5 6.5L9 12l5.5 5.5" />
    </Glyph>
  );
}
