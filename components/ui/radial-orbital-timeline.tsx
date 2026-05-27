"use client";
import { useState, useEffect, useRef } from "react";
import { ArrowRight, Link, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TimelineItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: React.ComponentType<any>;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending";
  energy: number;
}

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
}

export default function RadialOrbitalTimeline({
  timelineData,
}: RadialOrbitalTimelineProps) {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({});
  const [viewMode] = useState<"orbital">("orbital");
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
  const [centerOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({});
      setActiveNodeId(null);
      setPulseEffect({});
      setAutoRotate(true);
    }
  };

  const toggleItem = (id: number) => {
    setExpandedItems((prev) => {
      const newState = { ...prev };
      Object.keys(newState).forEach((key) => {
        if (parseInt(key) !== id) newState[parseInt(key)] = false;
      });
      newState[id] = !prev[id];

      if (!prev[id]) {
        setActiveNodeId(id);
        setAutoRotate(false);
        const relatedItems = getRelatedItems(id);
        const newPulse: Record<number, boolean> = {};
        relatedItems.forEach((relId) => { newPulse[relId] = true; });
        setPulseEffect(newPulse);
        centerViewOnNode(id);
      } else {
        setActiveNodeId(null);
        setAutoRotate(true);
        setPulseEffect({});
      }
      return newState;
    });
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (autoRotate && viewMode === "orbital") {
      timer = setInterval(() => {
        setRotationAngle((prev) => Number(((prev + 0.25) % 360).toFixed(3)));
      }, 50);
    }
    return () => { if (timer) clearInterval(timer); };
  }, [autoRotate, viewMode]);

  const centerViewOnNode = (nodeId: number) => {
    if (!nodeRefs.current[nodeId]) return;
    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
    const targetAngle = (nodeIndex / timelineData.length) * 360;
    setRotationAngle(270 - targetAngle);
  };

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radius = 180;
    const radian = (angle * Math.PI) / 180;
    const x = radius * Math.cos(radian) + centerOffset.x;
    const y = radius * Math.sin(radian) + centerOffset.y;
    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.max(0.35, Math.min(1, 0.35 + 0.65 * ((1 + Math.sin(radian)) / 2)));
    return { x, y, angle, zIndex, opacity };
  };

  const getRelatedItems = (itemId: number): number[] => {
    const item = timelineData.find((i) => i.id === itemId);
    return item ? item.relatedIds : [];
  };

  const isRelatedToActive = (itemId: number): boolean => {
    if (!activeNodeId) return false;
    return getRelatedItems(activeNodeId).includes(itemId);
  };

  const getStatusStyles = (status: TimelineItem["status"]): string => {
    switch (status) {
      case "completed":   return "text-white bg-accent border-accent";
      case "in-progress": return "text-accent bg-accent/10 border-accent/40";
      case "pending":     return "text-ink/50 bg-black/05 border-ink/20";
      default:            return "text-ink/50 bg-black/05 border-ink/20";
    }
  };

  return (
    <div
      className="w-full h-[520px] flex flex-col items-center justify-center overflow-hidden"
      ref={containerRef}
      onClick={handleContainerClick}
    >
      <div className="relative w-full max-w-4xl h-full flex items-center justify-center">
        <div
          className="absolute w-full h-full flex items-center justify-center"
          ref={orbitRef}
          style={{
            perspective: "1000px",
            transform: `translate(${centerOffset.x}px, ${centerOffset.y}px)`,
          }}
        >
          {/* Centre orb */}
          <div className="absolute w-14 h-14 rounded-full flex items-center justify-center z-10"
               style={{ background: "linear-gradient(135deg, #6366F1 0%, #4338CA 100%)" }}>
            <div className="absolute w-[72px] h-[72px] rounded-full border border-accent/30 animate-ping opacity-60" />
            <div className="absolute w-[88px] h-[88px] rounded-full border border-accent/15 animate-ping opacity-40"
                 style={{ animationDelay: "0.6s" }} />
            <div className="w-7 h-7 rounded-full bg-white/90 backdrop-blur-md shadow-sm" />
          </div>

          {/* Orbit ring */}
          <div className="absolute w-[380px] h-[380px] rounded-full border border-black/[0.07]" />
          {/* Dashed accent ring */}
          <svg className="absolute w-[380px] h-[380px]" viewBox="0 0 380 380"
               style={{ animation: "spin-cw 60s linear infinite" }}>
            <circle cx="190" cy="190" r="188" fill="none"
                    stroke="rgba(99,102,241,0.12)" strokeWidth="1"
                    strokeDasharray="6 14" strokeLinecap="round" />
          </svg>

          {timelineData.map((item, index) => {
            const position = calculateNodePosition(index, timelineData.length);
            const isExpanded = expandedItems[item.id];
            const isRelated = isRelatedToActive(item.id);
            const isPulsing = pulseEffect[item.id];
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                ref={(el) => { nodeRefs.current[item.id] = el; }}
                className="absolute transition-all duration-700 ease-out cursor-pointer"
                style={{
                  transform: `translate(${position.x}px, ${position.y}px)`,
                  zIndex: isExpanded ? 200 : position.zIndex,
                  opacity: isExpanded ? 1 : position.opacity,
                }}
                onClick={(e) => { e.stopPropagation(); toggleItem(item.id); }}
              >
                {/* Energy glow */}
                {isPulsing && (
                  <div
                    className="absolute rounded-full animate-pulse"
                    style={{
                      background: "radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%)",
                      width: `${item.energy * 0.5 + 40}px`,
                      height: `${item.energy * 0.5 + 40}px`,
                      left: `-${(item.energy * 0.25)}px`,
                      top:  `-${(item.energy * 0.25)}px`,
                    }}
                  />
                )}

                {/* Node button */}
                <div className={[
                  "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300",
                  isExpanded
                    ? "scale-150 shadow-lg shadow-accent/25 border-accent text-white"
                    : isRelated
                    ? "border-accent/60 bg-accent/10 text-accent animate-pulse"
                    : "border-black/15 bg-white text-accent shadow-sm hover:border-accent/40 hover:shadow-md",
                ].join(" ")}
                  style={isExpanded ? { background: "linear-gradient(135deg,#6366F1,#4338CA)" } : {}}
                >
                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                  <Icon {...({ size: 16 } as any)} />
                </div>

                {/* Label */}
                <div className={[
                  "absolute top-12 left-1/2 -translate-x-1/2 whitespace-nowrap",
                  "text-[11px] font-semibold tracking-wide transition-all duration-300",
                  isExpanded ? "text-ink scale-110" : "text-ink/55",
                ].join(" ")}>
                  {item.title}
                </div>

                {/* Expanded popup card */}
                {isExpanded && (
                  <Card className="absolute top-20 left-1/2 -translate-x-1/2 w-64 bg-white/95 backdrop-blur-lg border border-black/[0.08] shadow-xl shadow-black/[0.08] overflow-visible">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-px h-3 bg-accent/40" />
                    <CardHeader className="pb-2 pt-4 px-4">
                      <div className="flex justify-between items-center">
                        <Badge className={`px-2 text-[10px] ${getStatusStyles(item.status)}`}>
                          {item.status === "completed" ? "COMPLETE"
                            : item.status === "in-progress" ? "IN PROGRESS"
                            : "PENDING"}
                        </Badge>
                        <span className="text-[10px] font-mono text-ink/35">{item.date}</span>
                      </div>
                      <CardTitle className="text-[13px] font-semibold text-ink mt-2 leading-snug">
                        {item.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-[12px] text-ink/60 px-4 pb-4">
                      <p className="leading-relaxed">{item.content}</p>

                      <div className="mt-3 pt-3 border-t border-black/06">
                        <div className="flex justify-between items-center text-[11px] mb-1.5">
                          <span className="flex items-center gap-1 text-ink/50">
                            <Zap size={9} /> Energy
                          </span>
                          <span className="font-mono text-accent">{item.energy}%</span>
                        </div>
                        <div className="w-full h-1 bg-black/06 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-700"
                            style={{
                              width: `${item.energy}%`,
                              background: "linear-gradient(90deg, #6366F1, #4338CA)",
                            }}
                          />
                        </div>
                      </div>

                      {item.relatedIds.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-black/06">
                          <div className="flex items-center gap-1 mb-2">
                            <Link size={9} className="text-ink/40" />
                            <h4 className="text-[10px] uppercase tracking-wider font-medium text-ink/40">
                              Connected
                            </h4>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {item.relatedIds.map((relId) => {
                              const rel = timelineData.find((i) => i.id === relId);
                              return (
                                <Button
                                  key={relId}
                                  variant="outline"
                                  size="sm"
                                  className="h-6 px-2 py-0 text-[11px] rounded-full border-accent/25 bg-accent/04 hover:bg-accent/10 text-accent hover:text-accent-dark transition-all"
                                  onClick={(e) => { e.stopPropagation(); toggleItem(relId); }}
                                >
                                  {rel?.title}
                                  <ArrowRight size={8} className="ml-1 opacity-60" />
                                </Button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
