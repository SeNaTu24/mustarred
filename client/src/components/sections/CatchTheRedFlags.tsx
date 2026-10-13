import { useCallback, useEffect, useRef, useState, type CSSProperties, type KeyboardEvent as ReactKeyboardEvent, type MutableRefObject, type PointerEvent as ReactPointerEvent } from "react";
import { useReducedMotion } from "framer-motion";
import {
    DatabaseZap,
    Droplets,
    FileCheck2,
    FileWarning,
    LockKeyholeOpen,
    ShieldCheck,
    type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useModal } from "@/contexts/ModalContext";
import { trackEvent } from "@/lib/analytics";

const ROUND_DURATION_MS = 15_000;
const RISK_PENALTY_MS = 2_000;
const RUNNER_X_RATIO = 0.22;
const PLAYER_SIZE = 32;
const ENTITY_SIZE = 36;
const PLAYER_HALF_WIDTH = PLAYER_SIZE * 0.43;
const ENTITY_HALF_WIDTH = ENTITY_SIZE * 0.4;
const GROUND_OFFSET_PX = 28;
const JUMP_IMPULSE_PX_PER_SECOND = 690;
const GRAVITY_PX_PER_SECOND_SQUARED = 1_900;
const RUNNER_SPEED_PX_PER_SECOND = 245;
const REDUCED_MOTION_SPEED_PX_PER_SECOND = 205;
const RISK_CONTACT_COOLDOWN_MS = 800;

const gameTheme = {
    "--game-control": "#8ccdb7",
    "--game-risk": "#e39a8e",
    "--game-field": "rgba(13, 5, 32, 0.74)",
    "--game-grid": "rgba(197, 192, 232, 0.08)",
} as CSSProperties;

type GamePhase = "idle" | "playing" | "paused" | "success" | "timeout";
type ControlId = "shield" | "verified-document" | "protected-data";
type HazardId = "data-leak" | "security-weakness" | "missed-requirement";
type Encounter =
    | { atMs: number; kind: "control"; id: ControlId }
    | { atMs: number; kind: "risk"; id: HazardId }
    | { atMs: number; kind: "recovery" };
type RunnerEntity = {
    instanceId: string;
    id: ControlId | HazardId;
    kind: "control" | "risk";
    label: string;
    icon: LucideIcon;
    x: number;
};

const CONTROL_ORDER: ControlId[] = ["shield", "verified-document", "protected-data"];
const CONTROL_DETAILS: Record<ControlId, { label: string; icon: LucideIcon }> = {
    shield: { label: "Shield control", icon: ShieldCheck },
    "verified-document": { label: "Verified document", icon: FileCheck2 },
    "protected-data": { label: "Protected data", icon: DatabaseZap },
};
const RISK_DETAILS: Record<HazardId, { label: string; icon: LucideIcon }> = {
    "data-leak": { label: "Data leak", icon: Droplets },
    "security-weakness": { label: "Security weakness", icon: LockKeyholeOpen },
    "missed-requirement": { label: "Missed requirement", icon: FileWarning },
};

// Every early pickup and obstacle has a fixed, reachable lane. Three late
// recovery windows offer any controls that the player missed on the first pass.
const ENCOUNTERS: Encounter[] = [
    { atMs: 450, kind: "risk", id: "data-leak" },
    { atMs: 2_150, kind: "control", id: "shield" },
    { atMs: 3_850, kind: "risk", id: "security-weakness" },
    { atMs: 5_550, kind: "control", id: "verified-document" },
    { atMs: 7_250, kind: "risk", id: "missed-requirement" },
    { atMs: 8_950, kind: "control", id: "protected-data" },
    { atMs: 10_450, kind: "recovery" },
    { atMs: 11_400, kind: "recovery" },
    { atMs: 12_250, kind: "recovery" },
];

const JUMP_KEYS = new Set(["space", "arrowup", "w"]);

function formatTime(milliseconds: number) {
    return Math.max(0, Math.ceil(milliseconds / 1_000));
}

function EntityGlyph({ kind, icon: Icon, preview = false }: { kind: RunnerEntity["kind"]; icon: LucideIcon; preview?: boolean }) {
    return (
        <span
            className={`flex h-9 w-9 items-center justify-center border ${kind === "control"
                ? "rounded-full border-[color:var(--game-control)]/65 bg-[color:var(--game-control)]/10"
                : "rotate-45 border-[color:var(--game-risk)]/70 bg-[color:var(--game-risk)]/10"}`}
        >
            <Icon
                aria-hidden="true"
                className={`h-[18px] w-[18px] ${kind === "control" ? "text-[color:var(--game-control)]" : "-rotate-45 text-[color:var(--game-risk)]"} ${preview ? "opacity-90" : ""}`}
            />
        </span>
    );
}

function RunnerEntityMarker({
    entity,
    elementRefs,
}: {
    entity: RunnerEntity;
    elementRefs: MutableRefObject<Map<string, HTMLDivElement>>;
}) {
    const markerRef = useRef<HTMLDivElement>(null);
    const Icon = entity.icon;

    useEffect(() => {
        const marker = markerRef.current;
        if (!marker) return;
        elementRefs.current.set(entity.instanceId, marker);
        return () => {
            elementRefs.current.delete(entity.instanceId);
        };
    }, [elementRefs, entity.instanceId]);

    return (
        <div
            ref={markerRef}
            className="absolute left-0 z-10 flex h-9 w-9 items-center justify-center"
            style={{
                bottom: `${GROUND_OFFSET_PX + (entity.kind === "control" ? 12 : 0)}px`,
                transform: `translate3d(${entity.x}px, 0, 0) translateX(-50%)`,
                willChange: "transform",
            }}
            data-runner-entity={entity.instanceId}
            aria-label={entity.label}
            role="img"
        >
            <EntityGlyph kind={entity.kind} icon={Icon} />
        </div>
    );
}

export default function CatchTheRedFlags() {
    const { openModal } = useModal();
    const prefersReducedMotion = useReducedMotion() === true;
    const [phase, setPhase] = useState<GamePhase>("idle");
    const phaseRef = useRef<GamePhase>("idle");
    const [remainingMs, setRemainingMs] = useState(ROUND_DURATION_MS);
    const remainingRef = useRef(ROUND_DURATION_MS);
    const [collectedIds, setCollectedIds] = useState<ControlId[]>([]);
    const collectedRef = useRef(new Set<ControlId>());
    const [activeEntities, setActiveEntities] = useState<RunnerEntity[]>([]);
    const entitiesRef = useRef<RunnerEntity[]>([]);
    const entityElementRefs = useRef(new Map<string, HTMLDivElement>());
    const [feedback, setFeedback] = useState("");
    const [announcement, setAnnouncement] = useState("");
    const elapsedRoundMsRef = useRef(0);
    const nextEncounterRef = useRef(0);
    const playerElementRef = useRef<HTMLSpanElement>(null);
    const arenaRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const jumpHeightRef = useRef(0);
    const jumpVelocityRef = useRef(0);
    const pressedJumpKeysRef = useRef(new Set<string>());
    const riskContactsRef = useRef(new Set<string>());
    const lastRiskPenaltyAtRef = useRef(Number.NEGATIVE_INFINITY);

    const changePhase = (nextPhase: GamePhase) => {
        phaseRef.current = nextPhase;
        setPhase(nextPhase);
    };

    const renderPlayer = (jumpHeight: number, elapsedMs: number, reducedMotion: boolean) => {
        const player = playerElementRef.current;
        if (!player) return;
        const runBob = reducedMotion || jumpHeight > 0 ? 0 : Math.sin(elapsedMs / 1_000 * 18) * 1.5;
        const tilt = reducedMotion || jumpHeight > 0 ? 0 : Math.sin(elapsedMs / 1_000 * 18) * 2;
        player.style.transform = `translate3d(-50%, ${-jumpHeight + runBob}px, 0) rotate(${tilt}deg)`;
    };

    const startRound = () => {
        remainingRef.current = ROUND_DURATION_MS;
        setRemainingMs(ROUND_DURATION_MS);
        elapsedRoundMsRef.current = 0;
        nextEncounterRef.current = 0;
        collectedRef.current = new Set();
        setCollectedIds([]);
        entitiesRef.current = [];
        setActiveEntities([]);
        entityElementRefs.current.clear();
        jumpHeightRef.current = 0;
        jumpVelocityRef.current = 0;
        pressedJumpKeysRef.current.clear();
        riskContactsRef.current = new Set();
        lastRiskPenaltyAtRef.current = Number.NEGATIVE_INFINITY;
        setFeedback("");
        setAnnouncement("Challenge started. Jump over the red flags and collect three security controls.");
        changePhase("playing");
    };

    const pauseRound = () => {
        if (phaseRef.current !== "playing") return;
        pressedJumpKeysRef.current.clear();
        jumpVelocityRef.current = 0;
        setRemainingMs(remainingRef.current);
        setFeedback("Game paused while focus is away. Resume when ready.");
        setAnnouncement("Game paused. Resume when ready.");
        changePhase("paused");
    };

    const resumeRound = () => {
        if (phaseRef.current !== "paused") return;
        setFeedback("");
        setAnnouncement("Challenge resumed.");
        changePhase("playing");
    };

    const contactExpert = () => {
        trackEvent("cta_click", {
            event_category: "engagement",
            event_label: "Talk to Expert - Red Flags Game",
        });
        openModal("Talk to an Expert", "Get expert guidance for your compliance needs");
    };

    const triggerJump = useCallback(() => {
        if (phaseRef.current !== "playing" || jumpHeightRef.current > 0.5 || jumpVelocityRef.current > 0) return;
        jumpVelocityRef.current = JUMP_IMPULSE_PX_PER_SECOND;
    }, []);

    useEffect(() => {
        const onWindowBlur = () => pauseRound();
        const onVisibilityChange = () => {
            if (document.visibilityState === "hidden") pauseRound();
        };

        window.addEventListener("blur", onWindowBlur);
        document.addEventListener("visibilitychange", onVisibilityChange);
        return () => {
            window.removeEventListener("blur", onWindowBlur);
            document.removeEventListener("visibilitychange", onVisibilityChange);
        };
    }, []);

    useEffect(() => {
        if (phase !== "playing") return;
        arenaRef.current?.focus({ preventScroll: true });

        let frameId = 0;
        let previousTimestamp: number | null = null;
        let previousUiUpdate = 0;
        let trackOffset = 0;

        const finish = (result: "success" | "timeout") => {
            pressedJumpKeysRef.current.clear();
            jumpVelocityRef.current = 0;
            setRemainingMs(remainingRef.current);
            setFeedback("");
            setAnnouncement(result === "success" ? "Nice work. Risks spotted." : "Time's up. There is more to protect.");
            changePhase(result);
        };

        const tick = (timestamp: number) => {
            if (phaseRef.current !== "playing") return;

            const arena = arenaRef.current;
            if (!arena) {
                frameId = window.requestAnimationFrame(tick);
                return;
            }

            const bounds = arena.getBoundingClientRect();
            if (bounds.width === 0 || bounds.height === 0) {
                frameId = window.requestAnimationFrame(tick);
                return;
            }

            const rawDelta = previousTimestamp === null ? 0 : timestamp - previousTimestamp;
            const deltaMs = Math.min(rawDelta, 50);
            previousTimestamp = timestamp;
            elapsedRoundMsRef.current += rawDelta;
            remainingRef.current = Math.max(0, remainingRef.current - rawDelta);

            const speed = prefersReducedMotion ? REDUCED_MOTION_SPEED_PX_PER_SECOND : RUNNER_SPEED_PX_PER_SECOND;
            const playerX = bounds.width * RUNNER_X_RATIO;
            const playerCenterY = bounds.height - GROUND_OFFSET_PX - PLAYER_SIZE / 2 - jumpHeightRef.current;
            const deltaSeconds = deltaMs / 1_000;

            if (jumpVelocityRef.current > 0 || jumpHeightRef.current > 0) {
                jumpHeightRef.current += jumpVelocityRef.current * deltaSeconds - 0.5 * GRAVITY_PX_PER_SECOND_SQUARED * deltaSeconds * deltaSeconds;
                jumpVelocityRef.current -= GRAVITY_PX_PER_SECOND_SQUARED * deltaSeconds;
                if (jumpHeightRef.current <= 0) {
                    jumpHeightRef.current = 0;
                    jumpVelocityRef.current = 0;
                }
            }
            renderPlayer(jumpHeightRef.current, elapsedRoundMsRef.current, prefersReducedMotion);

            const spawned: RunnerEntity[] = [];
            while (nextEncounterRef.current < ENCOUNTERS.length && ENCOUNTERS[nextEncounterRef.current].atMs <= elapsedRoundMsRef.current) {
                const encounterIndex = nextEncounterRef.current;
                const encounter = ENCOUNTERS[encounterIndex];
                nextEncounterRef.current += 1;

                if (encounter.kind === "recovery") {
                    const missingId = CONTROL_ORDER.find((id) =>
                        !collectedRef.current.has(id)
                        && !entitiesRef.current.some((entity) => entity.kind === "control" && entity.id === id),
                    );
                    if (!missingId) continue;
                    const details = CONTROL_DETAILS[missingId];
                    spawned.push({
                        instanceId: `recovery-${encounterIndex}-${missingId}`,
                        id: missingId,
                        kind: "control",
                        label: details.label,
                        icon: details.icon,
                        x: bounds.width + ENTITY_SIZE,
                    });
                } else if (encounter.kind === "control") {
                    const details = CONTROL_DETAILS[encounter.id];
                    if (collectedRef.current.has(encounter.id)) continue;
                    spawned.push({
                        instanceId: `control-${encounterIndex}-${encounter.id}`,
                        id: encounter.id,
                        kind: "control",
                        label: details.label,
                        icon: details.icon,
                        x: bounds.width + ENTITY_SIZE,
                    });
                } else {
                    const details = RISK_DETAILS[encounter.id];
                    spawned.push({
                        instanceId: `risk-${encounterIndex}-${encounter.id}`,
                        id: encounter.id,
                        kind: "risk",
                        label: details.label,
                        icon: details.icon,
                        x: bounds.width + ENTITY_SIZE,
                    });
                }
            }
            if (spawned.length > 0) {
                entitiesRef.current = [...entitiesRef.current, ...spawned];
                setActiveEntities([...entitiesRef.current]);
            }

            let riskWasHit = false;
            const collectedThisFrame = new Set<ControlId>();
            for (const entity of entitiesRef.current) {
                entity.x -= speed * deltaSeconds;
                const marker = entityElementRefs.current.get(entity.instanceId);
                if (marker) marker.style.transform = `translate3d(${entity.x}px, 0, 0) translateX(-50%)`;

                const entityCenterY = bounds.height - GROUND_OFFSET_PX - ENTITY_SIZE / 2 - (entity.kind === "control" ? 12 : 0);
                const horizontalOverlap = Math.abs(entity.x - playerX) <= PLAYER_HALF_WIDTH + ENTITY_HALF_WIDTH;
                const verticalOverlap = Math.abs(entityCenterY - playerCenterY) <= PLAYER_SIZE / 2 + ENTITY_SIZE / 2;
                if (!horizontalOverlap || !verticalOverlap) continue;

                if (entity.kind === "control") {
                    const controlId = entity.id as ControlId;
                    if (!collectedRef.current.has(controlId)) {
                        collectedRef.current.add(controlId);
                        collectedThisFrame.add(controlId);
                        setCollectedIds([...collectedRef.current]);
                        setFeedback(`Collected ${CONTROL_DETAILS[controlId].label}.`);
                        setAnnouncement(`You collected ${CONTROL_DETAILS[controlId].label}. ${collectedRef.current.size} of 3 controls collected.`);
                    }
                } else if (!riskContactsRef.current.has(entity.instanceId)) {
                    riskContactsRef.current.add(entity.instanceId);
                    if (elapsedRoundMsRef.current - lastRiskPenaltyAtRef.current >= RISK_CONTACT_COOLDOWN_MS) {
                        remainingRef.current = Math.max(0, remainingRef.current - RISK_PENALTY_MS);
                        lastRiskPenaltyAtRef.current = elapsedRoundMsRef.current;
                        riskWasHit = true;
                    }
                }
            }

            if (collectedThisFrame.size > 0) {
                entitiesRef.current = entitiesRef.current.filter((entity) => !(entity.kind === "control" && collectedRef.current.has(entity.id as ControlId)));
                setActiveEntities([...entitiesRef.current]);
                if (collectedRef.current.size === CONTROL_ORDER.length) {
                    finish("success");
                    return;
                }
            }

            if (riskWasHit) {
                setFeedback("Risk spotted. −2 seconds.");
                setAnnouncement("Risk spotted. Two seconds removed.");
            }

            const beforeOffscreenFilter = entitiesRef.current.length;
            entitiesRef.current = entitiesRef.current.filter((entity) => entity.x >= -ENTITY_SIZE);
            if (entitiesRef.current.length !== beforeOffscreenFilter) {
                setActiveEntities([...entitiesRef.current]);
                const liveRiskIds = new Set(entitiesRef.current.filter((entity) => entity.kind === "risk").map((entity) => entity.instanceId));
                riskContactsRef.current = new Set([...riskContactsRef.current].filter((id) => liveRiskIds.has(id)));
            }

            if (!prefersReducedMotion && trackRef.current) {
                trackOffset = (trackOffset + speed * deltaSeconds) % 42;
                trackRef.current.style.backgroundPositionX = `${-trackOffset}px`;
            }

            if (remainingRef.current <= 0) {
                remainingRef.current = 0;
                finish("timeout");
                return;
            }

            if (timestamp - previousUiUpdate >= 100) {
                previousUiUpdate = timestamp;
                setRemainingMs(remainingRef.current);
            }

            frameId = window.requestAnimationFrame(tick);
        };

        frameId = window.requestAnimationFrame(tick);
        return () => window.cancelAnimationFrame(frameId);
    }, [phase, prefersReducedMotion]);

    const onArenaPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
        if (phaseRef.current !== "playing") return;
        if (event.pointerType === "touch") {
            try {
                event.currentTarget.setPointerCapture(event.pointerId);
            } catch {
                // The browser may already have ended this pointer before capture.
            }
        }
        event.currentTarget.focus({ preventScroll: true });
        triggerJump();
    };

    const onArenaKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
        if (phaseRef.current !== "playing") return;
        const key = event.key === " " ? "space" : event.key.toLowerCase();
        if (!JUMP_KEYS.has(key)) return;
        event.preventDefault();
        if (event.repeat || pressedJumpKeysRef.current.has(key)) return;
        pressedJumpKeysRef.current.add(key);
        triggerJump();
    };

    const onArenaKeyUp = (event: ReactKeyboardEvent<HTMLDivElement>) => {
        const key = event.key === " " ? "space" : event.key.toLowerCase();
        if (!JUMP_KEYS.has(key)) return;
        if (phaseRef.current === "playing") event.preventDefault();
        pressedJumpKeysRef.current.delete(key);
    };

    const isResult = phase === "success" || phase === "timeout";
    const previewMarkers = [
        { left: "56%", kind: "control" as const, icon: ShieldCheck, bottom: `${GROUND_OFFSET_PX + 12}px` },
        { left: "80%", kind: "risk" as const, icon: FileWarning, bottom: `${GROUND_OFFSET_PX}px` },
    ];

    return (
        <section
            className="mx-auto w-full max-w-[500px] bg-[#1a0d33]/70 p-4 text-white sm:p-5"
            style={gameTheme}
            aria-label="Catch the Red Flags mini-game"
        >
            <div className="mb-4 flex min-h-[70px] items-center justify-between gap-4">
                {phase === "idle" && (
                    <div />
                )}

                {(phase === "playing" || phase === "paused") && (
                    <>
                        <div>
                            <p className="text-sm font-medium text-[#d7d2f3]">Time remaining</p>
                            <p className="font-mono text-2xl font-semibold tabular-nums text-white" aria-label={`${formatTime(remainingMs)} seconds remaining`}>
                                {formatTime(remainingMs)}<span className="ml-1 text-sm font-sans font-normal text-[#d7d2f3]">sec</span>
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm font-medium text-[#d7d2f3]">Controls</p>
                            <p className="text-lg font-semibold tabular-nums text-white" aria-label={`${collectedIds.length} of ${CONTROL_ORDER.length} controls collected`}>
                                {collectedIds.length}<span className="text-[#d7d2f3]"> / {CONTROL_ORDER.length}</span>
                            </p>
                        </div>
                    </>
                )}

                {isResult && (
                    <div>
                        <h2 className="mb-1 font-sans text-lg font-semibold leading-tight text-white sm:text-xl">
                            {phase === "success" ? "Nice work. Risks spotted." : "Time's up. There is more to protect."}
                        </h2>
                        <p className="text-sm leading-relaxed text-[#d7d2f3]">{phase === "success" ? "You collected the essential controls in time. Real business risks take more than a quick game to assess." : `You collected ${collectedIds.length} of ${CONTROL_ORDER.length} controls. Every business has more to protect.`}</p>
                    </div>
                )}
            </div>

            {!isResult && phase !== "idle" && (
                <div
                    ref={arenaRef}
                    className={`relative h-[264px] w-full overflow-hidden border border-[#a49fe7]/45 outline-none sm:h-[286px] ${phase === "playing" ? "touch-none focus-visible:ring-2 focus-visible:ring-[#d8d5ff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a0d33]" : ""}`}
                    style={{
                        backgroundColor: "var(--game-field)",
                        backgroundImage: "linear-gradient(var(--game-grid) 1px, transparent 1px), linear-gradient(90deg, var(--game-grid) 1px, transparent 1px)",
                        backgroundSize: "24px 24px",
                    }}
                    role={phase === "idle" ? undefined : "group"}
                    aria-label={phase === "idle" ? undefined : "Runner game. Jump over red flags and collect three protective controls."}
                    aria-keyshortcuts="Space ArrowUp W"
                    aria-hidden={phase === "idle" ? true : undefined}
                    tabIndex={phase === "playing" ? 0 : -1}
                    onPointerDown={onArenaPointerDown}
                    onKeyDown={onArenaKeyDown}
                    onKeyUp={onArenaKeyUp}
                    onBlur={(event) => {
                        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) pauseRound();
                    }}
                >
                    <div className="absolute inset-x-0 bottom-[27px] h-px bg-white/25" aria-hidden="true" />
                    <div
                        ref={trackRef}
                        className="absolute inset-x-0 bottom-[20px] h-[3px] opacity-60"
                        style={{
                            backgroundImage: "repeating-linear-gradient(90deg, rgba(197, 192, 232, 0.58) 0px 13px, transparent 13px 42px)",
                            backgroundPositionX: "0px",
                        }}
                        aria-hidden="true"
                    />

                    {phase === "idle" && (
                        <div aria-hidden="true">
                            {previewMarkers.map((marker) => (
                                <div key={`${marker.kind}-${marker.left}`} className="absolute" style={{ left: marker.left, bottom: marker.bottom, transform: "translateX(-50%)" }}>
                                    <EntityGlyph kind={marker.kind} icon={marker.icon} preview />
                                </div>
                            ))}
                        </div>
                    )}

                    {(phase === "idle" || phase === "playing" || phase === "paused") && (
                        <span
                            ref={playerElementRef}
                            className="absolute z-20 flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#d8d5ff] bg-[#1a0d33] text-[#d8d5ff] shadow-[0_0_0_3px_rgba(164,159,231,0.16)]"
                            style={{ left: `${RUNNER_X_RATIO * 100}%`, bottom: `${GROUND_OFFSET_PX}px`, transform: "translate3d(-50%, 0, 0)" }}
                            role={phase === "idle" ? undefined : "img"}
                            aria-label={phase === "idle" ? undefined : "Your runner"}
                        >
                            <ShieldCheck aria-hidden="true" className="h-[18px] w-[18px]" />
                        </span>
                    )}

                    {phase === "playing" && activeEntities.map((entity) => (
                        <RunnerEntityMarker key={entity.instanceId} entity={entity} elementRefs={entityElementRefs} />
                    ))}

                    {phase === "paused" && (
                        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-3 bg-[#0d0520]/90 px-5 text-center">
                            <p className="max-w-[250px] text-sm text-white">Game paused while focus is away. Resume when ready.</p>
                            <Button type="button" onClick={resumeRound} className="rounded-sm shadow-none hover:translate-y-0 hover:shadow-none active:scale-100 motion-reduce:transition-none motion-reduce:transform-none motion-reduce:active:scale-100 focus-visible:ring-[#d8d5ff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a0d33]">
                                Resume
                            </Button>
                        </div>
                    )}
                </div>
            )}

            <div className="mt-3 min-h-[48px]">
                {phase === "idle" && (
                    <Button
                        type="button"
                        onClick={startRound}
                        className="w-full rounded-sm shadow-none hover:translate-y-0 hover:shadow-none active:scale-100 motion-reduce:transition-none motion-reduce:transform-none motion-reduce:active:scale-100 focus-visible:ring-[#d8d5ff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a0d33] sm:w-auto"
                    >
                        PLAY THE CHALLENGE ↗
                    </Button>
                )}

                {(phase === "playing" || phase === "paused") && (
                    <div className="flex min-h-[48px] items-center justify-between gap-3">
                        <p className="text-sm leading-relaxed text-[#d7d2f3]">Space, ↑ or tap to jump.</p>
                        {feedback && <p className="shrink-0 text-sm font-semibold text-[color:var(--game-risk)]" aria-live="polite">{feedback}</p>}
                    </div>
                )}

                {isResult && (
                    <div>
                        <p className="mb-3 text-sm leading-relaxed text-[#d7d2f3]">
                            Every business has its own risk profile. Mustarred helps organisations strengthen their regulatory, compliance and security frameworks.
                        </p>
                        <div className="flex flex-wrap items-center gap-2">
                            <Button type="button" onClick={startRound} className="rounded-sm shadow-none hover:translate-y-0 hover:shadow-none active:scale-100 motion-reduce:transition-none motion-reduce:transform-none motion-reduce:active:scale-100 focus-visible:ring-[#d8d5ff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a0d33]">
                                Play again
                            </Button>
                            <Button type="button" variant="ghost" onClick={contactExpert} className="rounded-sm text-white shadow-none hover:bg-white/10 hover:text-white hover:shadow-none focus-visible:ring-[#d8d5ff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a0d33]">
                                Talk to an Expert ↗
                            </Button>
                        </div>
                    </div>
                )}
            </div>

            <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</p>
        </section>
    );
}
