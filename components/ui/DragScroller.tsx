"use client";

import { useRef, useState, type PointerEvent, type ReactNode } from "react";

/**
 * Drag-to-scroll horizontal rail with the reference's yellow "DRAG" cursor follower.
 *
 * Hand-rolled on pointer events rather than GSAP's Draggable, which is a paid Club
 * plugin (see docs/ARCHITECTURE.md "Using GSAP correctly"). Because it drives native
 * `scrollLeft` rather than a transform, keyboard scrolling, trackpad swipe, and
 * scroll-snap all keep working for free — the drag is purely additive.
 */
export function DragScroller({
  children,
  className = "",
  label = "Drag",
}: {
  children: ReactNode;
  className?: string;
  label?: string;
}) {
  const railRef = useRef<HTMLDivElement>(null);
  const dragState = useRef({ startX: 0, startScroll: 0, moved: false });
  const [isDragging, setIsDragging] = useState(false);
  const [cursor, setCursor] = useState<{ x: number; y: number } | null>(null);

  function onPointerDown(event: PointerEvent<HTMLDivElement>) {
    // Mouse only — touch already has native momentum scrolling that this would fight.
    if (event.pointerType !== "mouse") return;
    const rail = railRef.current;
    if (!rail) return;

    dragState.current = {
      startX: event.clientX,
      startScroll: rail.scrollLeft,
      moved: false,
    };
    setIsDragging(true);
    rail.setPointerCapture(event.pointerId);
  }

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    const rail = railRef.current;
    if (!rail) return;

    const bounds = rail.getBoundingClientRect();
    setCursor({ x: event.clientX - bounds.left, y: event.clientY - bounds.top });

    if (!isDragging) return;
    const dx = event.clientX - dragState.current.startX;
    if (Math.abs(dx) > 3) dragState.current.moved = true;
    rail.scrollLeft = dragState.current.startScroll - dx;
  }

  function endDrag(event: PointerEvent<HTMLDivElement>) {
    const rail = railRef.current;
    if (rail?.hasPointerCapture(event.pointerId)) {
      rail.releasePointerCapture(event.pointerId);
    }
    setIsDragging(false);
  }

  return (
    <div className="relative">
      <div
        ref={railRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerLeave={() => setCursor(null)}
        // Suppress the click that follows a drag so cards don't navigate mid-swipe.
        onClickCapture={(event) => {
          if (dragState.current.moved) {
            event.preventDefault();
            event.stopPropagation();
          }
        }}
        className={`no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 ${
          isDragging ? "cursor-grabbing select-none" : "cursor-grab"
        } ${className}`}
      >
        {children}
      </div>

      {/* Cursor follower. Decorative — the rail is fully usable without a mouse. */}
      {cursor ? (
        <span
          aria-hidden
          style={{ left: cursor.x, top: cursor.y }}
          className={`pointer-events-none absolute z-10 hidden -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-accent font-mono text-caption font-semibold uppercase tracking-widest text-on-accent transition-[width,height] duration-micro ease-standard lg:flex ${
            isDragging ? "h-20 w-20" : "h-16 w-16"
          }`}
        >
          {label}
        </span>
      ) : null}
    </div>
  );
}
