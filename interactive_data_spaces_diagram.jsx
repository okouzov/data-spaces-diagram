import React, { useEffect, useMemo, useState } from "react";
import { assertDiagramData, connections, copy, edgeId, getNodes, getStageFlow, iconPaths } from "./diagram-data.js";

if (typeof console !== "undefined") {
  assertDiagramData();
}

function classNames(...values) {
  return values.filter(Boolean).join(" ");
}

function Icon({ name, className = "h-5 w-5", strokeWidth = 2 }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={iconPaths[name] || iconPaths.database} />
    </svg>
  );
}

function MotionFade({ children, className = "" }) {
  return <div className={className}>{children}</div>;
}

function Node({ nodeKey, node, active, onClick }) {
  const exchange = nodeKey === "exchange";
  return (
    <button
      type="button"
      onClick={() => onClick(nodeKey)}
      className={classNames(
        "absolute z-20 -translate-x-1/2 -translate-y-1/2 rounded-2xl border p-2.5 text-left backdrop-blur transition-all duration-300 hover:scale-[1.04]",
        exchange ? "w-52 xl:w-56" : "w-40 xl:w-44",
        exchange
          ? active
            ? "scale-[1.06] border-lime-200/90 bg-green-100/20 shadow-2xl shadow-lime-500/30"
            : "border-lime-200/25 bg-green-950/20 hover:border-lime-200/50 hover:bg-green-900/25"
          : active
            ? "scale-[1.06] border-white/80 bg-white/20 shadow-2xl shadow-cyan-500/20"
            : "border-white/10 bg-slate-900/55 hover:border-white/40 hover:bg-white/10"
      )}
      style={{ left: `${node.x}%`, top: `${node.y}%` }}
    >
      <div className="flex items-center gap-2">
        <div
          className={classNames(
            "grid h-8 w-8 shrink-0 place-items-center rounded-xl",
            exchange && active
              ? "bg-lime-100 text-green-950"
              : active
                ? "bg-white text-slate-950"
                : "bg-white/10 text-cyan-100"
          )}
        >
          <Icon name={node.icon} className="h-[18px] w-[18px]" />
        </div>
        <div className="min-w-0">
          <div className={classNames("text-xs font-semibold leading-tight xl:text-sm", exchange ? "whitespace-nowrap text-lime-200" : "text-white")}>{node.label}</div>
          <div className={classNames("mt-0.5 text-[10px] leading-tight text-slate-300 xl:text-[11px]", exchange && "whitespace-nowrap")}>{node.subtitle}</div>
          {node.note ? <div className="mt-0.5 whitespace-nowrap text-[8.5px] font-semibold leading-tight text-slate-300">{node.note}</div> : null}
        </div>
      </div>
    </button>
  );
}

function Diagram({ step, nodes, setSelectedNode, label }) {
  const stageFlow = getStageFlow(step);
  const activeEdgeKeys = new Set(stageFlow.activeConnections.map(([from, to]) => edgeId(from, to)));
  const activeDirections = new Map(stageFlow.activeConnections.map(([from, to]) => [edgeId(from, to), [from, to]]));
  const beanEdgeKeys = new Set(stageFlow.beanFlows.map(([from, to]) => edgeId(from, to)));
  const beanDirections = new Map(stageFlow.beanFlows.map(([from, to]) => [edgeId(from, to), [from, to]]));
  const exchangeAccentEdges = new Set([
    edgeId("provider", "exchange"),
    edgeId("exchange", "consumer"),
    edgeId("exchange", "audit"),
  ]);
  const activeNodeKeys = new Set(step.focus);
  stageFlow.activeConnections.forEach(([from, to]) => {
    activeNodeKeys.add(from);
    activeNodeKeys.add(to);
  });
  stageFlow.beanFlows.forEach(([from, to]) => {
    activeNodeKeys.add(from);
    activeNodeKeys.add(to);
  });
  const getPoint = (key) => [nodes[key].x, nodes[key].y];
  const getPath = (from, to) => {
    const [x1, y1] = getPoint(from);
    const [x2, y2] = getPoint(to);
    if (edgeId(from, to) === edgeId("provider", "policy")) {
      return from === "provider"
        ? `M${x1},${y1} C34,35 66,32 ${x2},${y2}`
        : `M${x1},${y1} C66,32 34,35 ${x2},${y2}`;
    }
    if (edgeId(from, to) === edgeId("consumer", "identity")) {
      return from === "consumer"
        ? `M${x1},${y1} C70,34 40,32 ${x2},${y2}`
        : `M${x1},${y1} C40,32 70,34 ${x2},${y2}`;
    }
    return `M${x1},${y1} L${x2},${y2}`;
  };

  return (
    <div className="relative h-full min-h-0 overflow-hidden rounded-[1.7rem] border border-white/10 bg-[radial-gradient(circle_at_50%_30%,rgba(56,189,248,0.22),transparent_32%),radial-gradient(circle_at_85%_75%,rgba(168,85,247,0.22),transparent_30%),linear-gradient(135deg,#020617,#0f172a_50%,#111827)] p-4 shadow-2xl">
      <style>{`
        @keyframes pulseHalo { 0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: .45; } 50% { transform: translate(-50%, -50%) scale(1.08); opacity: .75; } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes dashMove { to { stroke-dashoffset: -24; } }
      `}</style>

      <div className="absolute left-5 top-4 z-30 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[11px] font-medium text-cyan-100 backdrop-blur">
        {label}
      </div>

      <svg className="pointer-events-none absolute inset-0 z-[12] h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="activeLine" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="50%" stopColor="#a78bfa" />
            <stop offset="100%" stopColor="#f472b6" />
          </linearGradient>
          <linearGradient id="exchangeLine" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#22c55e" />
            <stop offset="55%" stopColor="#a3e635" />
            <stop offset="100%" stopColor="#fde047" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="0.9" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {connections.map(([from, to], index) => {
          const currentEdge = edgeId(from, to);
          const active = activeEdgeKeys.has(currentEdge);
          const showBean = beanEdgeKeys.has(currentEdge);
          const activeDirection = activeDirections.get(currentEdge) || [from, to];
          const path = active ? getPath(activeDirection[0], activeDirection[1]) : getPath(from, to);
          const beanDirection = beanDirections.get(currentEdge) || [from, to];
          const beanPath = getPath(beanDirection[0], beanDirection[1]);
          const persistentBase = currentEdge === edgeId("governance", "provider");
          const exchangeAccent = active && exchangeAccentEdges.has(currentEdge);
          return (
            <g key={`${from}-${to}-${index}`}>
              {persistentBase && active ? (
                <path d={path} fill="none" stroke="rgba(148,163,184,0.18)" strokeWidth="0.35" opacity="0.55" />
              ) : null}
              <path
                d={path}
                fill="none"
                stroke={active ? (exchangeAccent ? "url(#exchangeLine)" : "url(#activeLine)") : "rgba(148,163,184,0.18)"}
                strokeWidth={active ? 0.7 : 0.35}
                strokeDasharray={active ? "2 1.4" : "0"}
                strokeLinecap="round"
                filter={active ? "url(#glow)" : "none"}
                opacity={active ? 0.95 : 0.45}
                style={active ? { animation: "dashMove 1.8s linear infinite" } : undefined}
              />
              {showBean && (
                <circle r="0.9" fill={exchangeAccentEdges.has(currentEdge) ? "#fef9c3" : "#ffffff"} filter="url(#glow)" opacity="0.85">
                  <animateMotion
                    dur="2.2s"
                    repeatCount="indefinite"
                    begin={`${index * 0.08}s`}
                    path={beanPath}
                  />
                  <animate
                    attributeName="opacity"
                    values="0;1;0"
                    dur="2.2s"
                    repeatCount="indefinite"
                    begin={`${index * 0.08}s`}
                  />
                </circle>
              )}
            </g>
          );
        })}
      </svg>

      <div
        className="absolute left-1/2 top-1/2 z-10 h-44 w-44 rounded-full border border-cyan-300/20 bg-cyan-300/5 blur-sm"
        style={{ animation: "pulseHalo 4s ease-in-out infinite" }}
      />

      {Object.entries(nodes).map(([key, node]) => (
        <Node key={key} nodeKey={key} node={node} active={activeNodeKeys.has(key)} onClick={setSelectedNode} />
      ))}
    </div>
  );
}

function StepCard({ step, isActive, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={classNames(
        "group flex h-full min-h-0 w-full items-center overflow-hidden rounded-2xl border p-[7px] text-left transition-all duration-300",
        isActive
          ? "border-white/60 bg-white/15 shadow-lg shadow-cyan-500/10"
          : "border-white/10 bg-white/[0.04] hover:border-white/30 hover:bg-white/[0.08]"
      )}
    >
      <div className="flex items-center gap-3">
        <div className={classNames("grid h-[30px] w-[30px] shrink-0 place-items-center rounded-xl bg-gradient-to-br", step.accent)}>
          <Icon name={step.icon} className="h-4 w-4 text-white" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex min-w-0 items-center justify-between gap-2">
            <h3 className="truncate text-[12px] font-semibold text-white xl:text-[13px]">{step.title}</h3>
            <Icon name="chevron" className={classNames("h-4 w-4 shrink-0 text-slate-400 transition", isActive && "rotate-90 text-white")} />
          </div>
          <p className="mt-0.5 line-clamp-1 text-[10.5px] leading-tight text-slate-300">{step.short}</p>
        </div>
      </div>
    </button>
  );
}

function ViewButton({ active, children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={classNames(
        "rounded-full px-3.5 py-2 text-xs font-medium transition xl:text-sm",
        active ? "bg-white text-slate-950" : "bg-white/10 text-slate-200 hover:bg-white/15"
      )}
    >
      {children}
    </button>
  );
}

export default function InteractiveDataSpacesDiagram() {
  const [language, setLanguage] = useState("en");
  const [activeStep, setActiveStep] = useState(0);
  const [selectedNode, setSelectedNode] = useState("provider");
  const [view, setView] = useState("journey");
  const [playing, setPlaying] = useState(false);

  const content = copy[language];
  const steps = content.steps;
  const nodes = useMemo(() => getNodes(language), [language]);
  const step = steps[activeStep];
  const selected = nodes[selectedNode] || nodes.provider;

  useEffect(() => {
    if (!playing) return undefined;
    const timer = window.setInterval(() => {
      setActiveStep((value) => (value + 1) % steps.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [playing, steps.length]);

  const toggleLanguage = () => {
    setLanguage((value) => (value === "en" ? "bg" : "en"));
  };

  return (
    <main className="grid min-h-screen place-items-center bg-slate-950 p-3 text-white">
      <section
        className="flex max-h-[calc(100vh-1.5rem)] max-w-[calc(100vw-1.5rem)] flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_12%_8%,rgba(34,211,238,0.18),transparent_26%),radial-gradient(circle_at_95%_30%,rgba(217,70,239,0.16),transparent_24%),linear-gradient(135deg,#07111f,#101827_52%,#121821)] p-4 shadow-2xl"
        style={{
          aspectRatio: "16 / 9",
          width: "min(calc(100vw - 1.5rem), calc((100vh - 1.5rem) * 16 / 9))",
        }}
        lang={language}
      >
        <header className="mb-4 flex shrink-0 flex-col gap-3 rounded-[1.5rem] border border-white/10 bg-white/[0.05] p-4 backdrop-blur md:flex-row md:items-center md:justify-between">
          <div className="min-w-0">
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-300/10 px-3 py-1 text-[11px] font-medium text-cyan-100">
              <Icon name="activity" className="h-3.5 w-3.5" /> {content.badge}
            </div>
            <h1 className="truncate text-2xl font-bold tracking-tight xl:text-3xl">{content.title}</h1>
            <p className="mt-1 max-w-4xl text-xs leading-5 text-slate-300 xl:text-sm">{content.tagline}</p>
          </div>

          <div className="flex shrink-0 flex-wrap justify-end gap-2">
            {Object.entries(content.views).map(([id, label]) => (
              <ViewButton key={id} active={view === id} onClick={() => setView(id)}>
                {label}
              </ViewButton>
            ))}
            <button
              type="button"
              onClick={toggleLanguage}
              aria-label={content.languageToggleAria}
              className="inline-flex items-center gap-2 rounded-full border border-cyan-200/40 bg-cyan-200/10 px-3.5 py-2 text-xs font-semibold text-cyan-50 transition hover:bg-cyan-200/20 xl:text-sm"
            >
              <Icon name="languages" className="h-4 w-4" />
              {content.languageToggle}
            </button>
          </div>
        </header>

        {view === "journey" && (
          <MotionFade className="grid min-h-0 flex-1 items-stretch gap-4 lg:grid-cols-[minmax(0,1.55fr)_minmax(310px,0.85fr)]">
            <section className="min-h-0">
              <Diagram step={step} nodes={nodes} setSelectedNode={setSelectedNode} label={content.diagramBadge} />
            </section>

            <aside className="flex min-h-0 flex-col rounded-[1.7rem] border border-white/10 bg-white/[0.05] p-3.5 backdrop-blur">
              <div className="flex h-[166px] shrink-0 flex-col overflow-hidden">
                <div className="mb-2.5 flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.18em] text-cyan-200">{content.stepEyebrow}</p>
                    <h2 className="mt-1 text-lg font-bold leading-tight text-white">{step.title}</h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => setPlaying((value) => !value)}
                    className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-3.5 py-2 text-xs font-semibold text-slate-950 transition hover:bg-cyan-100 xl:text-sm"
                  >
                    <Icon name={playing ? "pause" : "play"} className="h-4 w-4" />
                    {playing ? content.pause : content.play}
                  </button>
                </div>
                <div className={classNames("mb-2.5 h-1.5 rounded-full bg-gradient-to-r", step.accent)} />
                <p className="text-[13px] font-medium text-cyan-100">{step.actor}</p>
                <p className="mt-1.5 text-[12.5px] leading-[1.42] text-slate-300">{step.detail}</p>
              </div>

              <div
                className="mt-2.5 grid min-h-0 flex-1 gap-1.5 overflow-hidden"
                style={{ gridTemplateRows: `repeat(${steps.length}, minmax(0, 1fr))` }}
              >
                {steps.map((item) => (
                  <StepCard
                    key={item.id}
                    step={item}
                    isActive={item.id === activeStep}
                    onClick={() => setActiveStep(item.id)}
                  />
                ))}
              </div>
            </aside>
          </MotionFade>
        )}

        {view === "layers" && (
          <MotionFade className="grid min-h-0 flex-1 gap-4 lg:grid-cols-[1fr_1fr]">
            <section className="min-h-0 overflow-hidden rounded-[1.7rem] border border-white/10 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.2),transparent_35%),linear-gradient(135deg,#020617,#111827)] p-5 shadow-2xl">
              <p className="text-[11px] uppercase tracking-[0.18em] text-cyan-200">{content.layersEyebrow}</p>
              <h2 className="mt-2 text-2xl font-bold leading-tight xl:text-3xl">{content.layersTitle}</h2>
              <p className="mt-2 max-w-xl text-xs leading-5 text-slate-300 xl:text-sm xl:leading-6">{content.layersIntro}</p>
              <div className="mt-5 grid gap-3">
                {content.layers.map((layer) => (
                  <div key={layer.title} className="rounded-2xl border border-white/10 bg-white/[0.06] p-3">
                    <div className="flex items-start gap-3">
                      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-white text-slate-950">
                        <Icon name={layer.icon} className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">{layer.title}</h3>
                        <p className="mt-1 text-xs leading-5 text-slate-300 xl:text-sm">{layer.text}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="grid min-h-0 content-center gap-3 rounded-[1.7rem] border border-white/10 bg-white/[0.05] p-5 backdrop-blur">
              {content.buildingBlocks.map(([title, text], index) => (
                <div key={title} className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/70 p-4">
                  <div className="absolute right-4 top-3 text-5xl font-black text-white/[0.04]">0{index + 1}</div>
                  <h3 className="text-base font-semibold text-cyan-100 xl:text-lg">{title}</h3>
                  <p className="mt-1 max-w-xl text-xs leading-5 text-slate-300 xl:text-sm">{text}</p>
                </div>
              ))}
            </section>
          </MotionFade>
        )}

        {view === "roles" && (
          <MotionFade className="grid min-h-0 flex-1 gap-4 lg:grid-cols-[1.25fr_0.75fr]">
            <section className="min-h-0 overflow-hidden rounded-[1.7rem] border border-white/10 bg-white/[0.05] p-5 backdrop-blur">
              <h2 className="text-2xl font-bold">{content.rolesTitle}</h2>
              <p className="mt-2 text-xs leading-5 text-slate-300 xl:text-sm xl:leading-6">{content.rolesIntro}</p>
              <div className="mt-4 grid gap-2 overflow-y-auto pr-1 sm:grid-cols-2">
                {Object.entries(nodes).map(([key, node]) => {
                  const active = key === selectedNode;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setSelectedNode(key)}
                      className={classNames(
                        "rounded-2xl border p-3 text-left transition",
                        active ? "border-cyan-200 bg-cyan-200/15" : "border-white/10 bg-white/[0.04] hover:border-white/30"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div className={classNames("grid h-10 w-10 shrink-0 place-items-center rounded-2xl", active ? "bg-white text-slate-950" : "bg-white/10 text-cyan-100")}>
                          <Icon name={node.icon} className="h-5 w-5" />
                        </div>
                        <div className="min-w-0">
                          <h3 className="truncate text-sm font-semibold text-white">{node.label}</h3>
                          <p className="text-[11px] leading-tight text-slate-300">{node.subtitle}</p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>

            <section className="min-h-0 overflow-y-auto rounded-[1.7rem] border border-white/10 bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,0.18),transparent_35%),linear-gradient(135deg,#020617,#111827)] p-5 shadow-2xl">
              <div className="grid h-14 w-14 place-items-center rounded-3xl bg-white text-slate-950">
                <Icon name={selected.icon} className="h-7 w-7" />
              </div>
              <h2 className="mt-4 text-2xl font-bold leading-tight xl:text-3xl">{selected.label}</h2>
              <p className="mt-1 text-sm text-cyan-100">{selected.subtitle}</p>
              <p className="mt-4 text-xs leading-5 text-slate-300 xl:text-sm xl:leading-6">
                {content.roleDescriptions[selectedNode]}
              </p>
              <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                <p className="text-[11px] uppercase tracking-[0.18em] text-cyan-200">{content.presenterNoteLabel}</p>
                <p className="mt-2 text-xs leading-5 text-slate-300 xl:text-sm xl:leading-6">{content.presenterNote}</p>
              </div>
            </section>
          </MotionFade>
        )}
      </section>
    </main>
  );
}
