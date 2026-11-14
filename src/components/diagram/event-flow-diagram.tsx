"use client";

import { m, useInView, useReducedMotion } from "motion/react";
import { Pause, Play, RotateCcw } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import type { EventFlow, FlowKey } from "@/lib/content";
import { cn } from "@/lib/utils";

const W = 104;
const H = 56;
const SPEED = 280; // px per second
type Pt = [number, number];

function routeLength(r: Pt[]) {
  return r.slice(1).reduce((s, p, i) => s + Math.hypot(p[0] - r[i]![0], p[1] - r[i]![1]), 0);
}
const stepMs = (r: Pt[]) => Math.max(1100, (routeLength(r) / SPEED) * 1000 + 450);

function Packet({ route, color, id }: { route: Pt[]; color: string; id: string }) {
  const total = routeLength(route);
  const dur = total / SPEED;
  let acc = 0;
  const times = route.map((p, i) => {
    if (i > 0) acc += Math.hypot(p[0] - route[i - 1]![0], p[1] - route[i - 1]![1]);
    return total ? acc / total : 0;
  });
  return (
    <m.g
      key={id}
      initial={{ x: route[0]![0], y: route[0]![1], opacity: 0 }}
      animate={{ x: route.map((p) => p[0]), y: route.map((p) => p[1]), opacity: [0, 1, 1, 0] }}
      transition={{
        x: { duration: dur, times, ease: "linear" },
        y: { duration: dur, times, ease: "linear" },
        opacity: { duration: dur, times: [0, 0.08, 0.92, 1], ease: "linear" },
      }}
    >
      <circle r={13} fill={color} opacity={0.18} />
      <circle r={6} fill={color} />
    </m.g>
  );
}

export default function EventFlowDiagram({
  data,
  className,
}: {
  data: EventFlow;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const inView = useInView(wrapRef, { margin: "100px" });
  const [flowKey, setFlowKey] = useState<FlowKey>("success");
  const [active, setActive] = useState(0);
  const [run, setRun] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [selected, setSelected] = useState<string>("kafka");

  const flow = data.flows[flowKey];
  const step = flow.steps[active] ?? flow.steps[0]!;
  const animate = playing && inView && !reduce;
  const nodeById = useMemo(
    () => Object.fromEntries(data.nodes.map((n) => [n.id, n])),
    [data.nodes],
  );

  useEffect(() => {
    if (!animate) return;
    let cancelled = false;
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
    (async () => {
      for (let i = active; i < flow.steps.length && !cancelled; i++) {
        setActive(i);
        await sleep(stepMs(flow.steps[i]!.route));
      }
      if (cancelled) return;
      await sleep(900);
      if (cancelled) return;
      setActive(0);
      setRun((r) => r + 1);
    })();
    return () => {
      cancelled = true;
    };
    // `active` intentionally omitted: the loop owns it while playing.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animate, flowKey, run]);

  const pick = (k: FlowKey) => {
    setFlowKey(k);
    setActive(0);
    setRun((r) => r + 1);
  };
  const touched = (n: { x: number; y: number }) =>
    [...step.route, ...(step.branch ?? [])].some(
      (p) => Math.abs(p[0] - n.x) <= W / 2 + 4 && Math.abs(p[1] - n.y) <= H / 2 + 12,
    );
  const packetColor =
    step.fail || step.dead ? "var(--danger)" : step.retry ? "var(--warn)" : "var(--accent)";
  const sel = nodeById[selected];

  return (
    <div ref={wrapRef} className={cn("card p-4 sm:p-6", className)}>
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <div
          role="group"
          aria-label="Choose a message flow"
          className="flex rounded-full border border-border p-1"
        >
          {(Object.keys(data.flows) as FlowKey[]).map((k) => (
            <button
              key={k}
              type="button"
              aria-pressed={flowKey === k}
              onClick={() => pick(k)}
              className={cn(
                "rounded-full px-3 py-1.5 text-sm transition-colors",
                flowKey === k ? "bg-accent text-accent-fg" : "text-muted hover:text-fg",
              )}
            >
              {data.flows[k].label}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setPlaying((p) => !p)}
          aria-label={playing ? "Pause animation" : "Play animation"}
          className="inline-flex size-9 items-center justify-center rounded-full border border-border text-muted hover:border-accent hover:text-accent"
        >
          {playing && !reduce ? (
            <Pause className="size-4" aria-hidden />
          ) : (
            <Play className="size-4" aria-hidden />
          )}
        </button>
        <button
          type="button"
          onClick={() => {
            setActive(0);
            setRun((r) => r + 1);
            setPlaying(true);
          }}
          aria-label="Replay flow"
          className="inline-flex size-9 items-center justify-center rounded-full border border-border text-muted hover:border-accent hover:text-accent"
        >
          <RotateCcw className="size-4" aria-hidden />
        </button>
      </div>

      <div className="hidden md:block">
        <svg
          viewBox="0 0 850 310"
          role="group"
          aria-label="Event-driven architecture: clients, API gateway, producer service, Kafka, idempotent consumer, Redis, PostgreSQL and a dead-letter queue. Select a node for details; the numbered steps below describe the message flow."
          className="h-auto w-full"
        >
          {/* edges */}
          <g className="stroke-border" strokeWidth={2} fill="none">
            {data.edges.map(([a, b]) => {
              const A = nodeById[a]!;
              const B = nodeById[b]!;
              return <line key={`${a}-${b}`} x1={A.x} y1={A.y} x2={B.x} y2={B.y} />;
            })}
            <polyline points="632,82 632,34 62,34 62,82" strokeDasharray="5 6" />
          </g>
          <text x={347} y={24} textAnchor="middle" className="fill-muted font-mono" fontSize={11}>
            WebSocket / STOMP push
          </text>

          {/* nodes */}
          {data.nodes.map((n) => {
            const on = touched(n);
            const bad = on && ((step.fail && n.id === "consumer") || (step.dead && n.id === "dlq"));
            const warn = on && step.retry && n.id === "consumer";
            const stroke = bad
              ? "var(--danger)"
              : warn
                ? "var(--warn)"
                : on
                  ? "var(--accent)"
                  : selected === n.id
                    ? "var(--muted)"
                    : "var(--border)";
            return (
              <g
                key={n.id}
                role="button"
                tabIndex={0}
                aria-pressed={selected === n.id}
                aria-label={`${n.label}: ${n.sub}`}
                onClick={() => setSelected(n.id)}
                onKeyDown={(e) =>
                  (e.key === "Enter" || e.key === " ") && (e.preventDefault(), setSelected(n.id))
                }
                className="cursor-pointer outline-none [&:focus-visible>rect]:stroke-[3]"
                transform={`translate(${n.x - W / 2} ${n.y - H / 2})`}
              >
                <rect
                  width={W}
                  height={H}
                  rx={12}
                  className="fill-elevated"
                  stroke={stroke}
                  strokeWidth={on ? 2.5 : 1.5}
                />
                <text
                  x={W / 2}
                  y={24}
                  textAnchor="middle"
                  className="fill-fg font-semibold"
                  fontSize={14}
                >
                  {n.label}
                </text>
                <text x={W / 2} y={41} textAnchor="middle" className="fill-muted" fontSize={11}>
                  {n.sub}
                </text>
              </g>
            );
          })}

          {/* moving message packets */}
          {animate ? (
            <g aria-hidden="true">
              <Packet
                id={`${flowKey}-${run}-${active}-a`}
                route={step.route as Pt[]}
                color={packetColor}
              />
              {step.branch ? (
                <Packet
                  id={`${flowKey}-${run}-${active}-b`}
                  route={step.branch as Pt[]}
                  color={packetColor}
                />
              ) : null}
            </g>
          ) : null}
        </svg>
      </div>

      {sel ? (
        <p className="mt-2 hidden rounded-xl bg-accent-soft px-4 py-3 text-sm text-muted md:block">
          <strong className="text-fg">{sel.label}.</strong> {sel.desc}
        </p>
      ) : null}

      <ol className="mt-4 grid gap-2 md:grid-cols-2">
        {flow.steps.map((s, i) => (
          <li key={s.text}>
            <button
              type="button"
              aria-current={i === active ? "step" : undefined}
              onClick={() => {
                setPlaying(false);
                setActive(i);
              }}
              className={cn(
                "flex w-full items-start gap-3 rounded-xl border px-3 py-2.5 text-left text-sm transition-colors",
                i === active
                  ? "border-accent bg-accent-soft text-fg"
                  : "border-border text-muted hover:text-fg",
              )}
            >
              <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-border font-mono text-xs text-fg">
                {i + 1}
              </span>
              {s.text}
            </button>
          </li>
        ))}
      </ol>
      <p className="mt-4 text-xs text-muted">
        Simplified, illustrative model of the event-driven pattern behind DMX, not a literal
        production topology.
      </p>
    </div>
  );
}
