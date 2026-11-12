import { Search, Target, Layers, ClipboardCheck, type LucideIcon } from "lucide-react";
import { engagementStages } from "@/data/servicesPage";

const STAGE_ICONS: Record<string, LucideIcon> = {
    "01": Search,
    "02": Target,
    "03": Layers,
    "04": ClipboardCheck,
};

export default function EngagementProcess() {
    const stageAssess = engagementStages[0];
    const stagePlan = engagementStages[1];
    const stageImplement = engagementStages[2];
    const stageReview = engagementStages[3];

    const IconAssess = STAGE_ICONS[stageAssess.number] || Search;
    const IconPlan = STAGE_ICONS[stagePlan.number] || Target;
    const IconImplement = STAGE_ICONS[stageImplement.number] || Layers;
    const IconReview = STAGE_ICONS[stageReview.number] || ClipboardCheck;

    return (
        <section
            aria-labelledby="engagement-heading"
            className="engagement-section bg-[#f7f6fb] py-16 sm:py-20 lg:py-24 overflow-hidden"
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-12 items-center">
                    {/* Left Column: Eyebrow, Editorial Heading & Intro */}
                    <div className="lg:col-span-5 max-w-xl">
                        <p className="engagement-eyebrow mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#4b3fbc] sm:text-sm">
                            A CLEAR WAY FORWARD
                        </p>
                        <h2
                            id="engagement-heading"
                            className="font-serif text-3xl font-normal tracking-[-0.02em] text-[#0d0821] sm:text-4xl lg:text-[2.65rem] lg:leading-[1.18]"
                        >
                            How we work together
                        </h2>
                        <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#514a61] max-w-md">
                            A structured, practical process that takes you from understanding your needs to clear next steps.
                        </p>
                    </div>

                    {/* Right Column: Workflow Diagram */}
                    <div className="lg:col-span-7">
                        {/* Mobile & Tablet Vertical Timeline (< 1024px) */}
                        <div className="lg:hidden">
                            <ol className="relative max-w-xl">
                                {engagementStages.map((stage, index) => {
                                    const StageIcon = STAGE_ICONS[stage.number] || Search;
                                    const isLast = index === engagementStages.length - 1;

                                    return (
                                        <li
                                            key={stage.number}
                                            className={`relative flex items-start gap-4 sm:gap-5 ${isLast ? "pb-0" : "pb-8 sm:pb-9"}`}
                                        >
                                            {/* Connecting vertical purple line */}
                                            {!isLast && (
                                                <span
                                                    aria-hidden="true"
                                                    className="absolute left-5 sm:left-6 top-11 bottom-0 w-0.5 bg-[#4b3fbc]/25 -translate-x-1/2"
                                                />
                                            )}

                                            {/* Stage Marker (Icon + Number badge) */}
                                            <div
                                                className="relative z-10 flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white border border-[#4b3fbc]/30 shadow-[0_2px_8px_rgba(75,63,188,0.08)] flex items-center justify-center text-[#4b3fbc]"
                                                aria-hidden="true"
                                            >
                                                <StageIcon className="w-5 h-5 sm:w-5 sm:h-5 stroke-[1.75]" />
                                                <span className="stage-badge-number absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#4b3fbc] text-white text-[9px] sm:text-[10px] font-bold flex items-center justify-center font-mono shadow-sm">
                                                    {stage.number}
                                                </span>
                                            </div>

                                            {/* Stage Content */}
                                            <div className="pt-1 min-w-0 flex-1">
                                                <div className="flex items-baseline gap-2">
                                                    <span className="stage-eyebrow text-xs font-bold tracking-[0.14em] uppercase text-[#4b3fbc]">
                                                        {stage.number} —
                                                    </span>
                                                    <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                                                        {stage.title}
                                                    </h3>
                                                </div>
                                                <p className="mt-1 text-sm text-gray-600 leading-relaxed">
                                                    {stage.description}
                                                </p>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ol>
                        </div>

                        {/* Desktop Circular Process Diagram (>= 1024px) */}
                        <div
                            className="hidden lg:grid grid-cols-[minmax(140px,195px)_auto_minmax(140px,195px)] xl:grid-cols-[minmax(188px,218px)_auto_minmax(188px,218px)] grid-rows-[auto_auto_auto] items-center justify-center gap-x-2 xl:gap-x-3 gap-y-2 xl:gap-y-3 max-w-[710px] mx-auto select-none"
                            aria-label="Workflow process diagram"
                        >
                            {/* 01 — Assess (Top: Col 2, Row 1) */}
                            <div className="col-start-2 row-start-1 flex flex-col items-center text-center max-w-[280px] mx-auto pb-1">
                                <span className="stage-eyebrow text-xs font-bold tracking-[0.14em] uppercase text-[#4b3fbc] mb-1">
                                    {stageAssess.number} — {stageAssess.title}
                                </span>
                                <p className="text-xs xl:text-sm text-gray-600 leading-relaxed text-balance">
                                    {stageAssess.description}
                                </p>
                            </div>

                            {/* 04 — Review (Left: Col 1, Row 2) */}
                            <div className="col-start-1 row-start-2 flex flex-col items-end text-right max-w-[195px] xl:max-w-[218px] pr-1.5 xl:pr-2 self-center justify-self-end">
                                <span className="stage-eyebrow text-xs font-bold tracking-[0.14em] uppercase text-[#4b3fbc] mb-1">
                                    {stageReview.number} — {stageReview.title}
                                </span>
                                <p className="text-xs xl:text-sm text-gray-600 leading-relaxed text-balance">
                                    {stageReview.description}
                                </p>
                            </div>

                            {/* Center Circular Diagram Container: Col 2, Row 2 */}
                            <div className="col-start-2 row-start-2 relative w-[240px] h-[240px] xl:w-[272px] xl:h-[272px] mx-auto flex items-center justify-center">
                                {/* SVG Connector Path & Clockwise Directional Arrows */}
                                <svg
                                    viewBox="0 0 280 280"
                                    className="w-full h-full overflow-visible"
                                    aria-hidden="true"
                                >
                                    {/* Thin continuous purple circular connector */}
                                    <circle
                                        cx="140"
                                        cy="140"
                                        r="110"
                                        fill="none"
                                        stroke="#4b3fbc"
                                        strokeWidth="1.5"
                                        strokeOpacity="0.32"
                                    />

                                    {/* Clockwise Directional Arrows along circular arc */}
                                    {/* Arrow 1: Top-Right (between 12:00 and 3:00 at 45°) */}
                                    <g transform="translate(217.78, 62.22) rotate(45)">
                                        <path
                                            d="M -3 -3.5 L 3.5 0 L -3 3.5"
                                            fill="none"
                                            stroke="#4b3fbc"
                                            strokeWidth="1.75"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </g>

                                    {/* Arrow 2: Bottom-Right (between 3:00 and 6:00 at 135°) */}
                                    <g transform="translate(217.78, 217.78) rotate(135)">
                                        <path
                                            d="M -3 -3.5 L 3.5 0 L -3 3.5"
                                            fill="none"
                                            stroke="#4b3fbc"
                                            strokeWidth="1.75"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </g>

                                    {/* Arrow 3: Bottom-Left (between 6:00 and 9:00 at 225°) */}
                                    <g transform="translate(62.22, 217.78) rotate(225)">
                                        <path
                                            d="M -3 -3.5 L 3.5 0 L -3 3.5"
                                            fill="none"
                                            stroke="#4b3fbc"
                                            strokeWidth="1.75"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </g>

                                    {/* Arrow 4: Top-Left (between 9:00 and 12:00 at 315°) */}
                                    <g transform="translate(62.22, 62.22) rotate(315)">
                                        <path
                                            d="M -3 -3.5 L 3.5 0 L -3 3.5"
                                            fill="none"
                                            stroke="#4b3fbc"
                                            strokeWidth="1.75"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </g>

                                    {/* Centre Subtle Mustarred-inspired Brand Mark */}
                                    <circle
                                        cx="140"
                                        cy="140"
                                        r="28"
                                        fill="#f6f4fc"
                                        stroke="#4b3fbc"
                                        strokeWidth="1"
                                        strokeOpacity="0.2"
                                    />
                                    {/* Central 4-point sparkle star */}
                                    <path
                                        d="M 140 130 C 140 135.5 135.5 140 130 140 C 135.5 140 140 144.5 140 150 C 140 144.5 144.5 140 150 140 C 144.5 140 140 135.5 140 130 Z"
                                        fill="#4b3fbc"
                                    />
                                    {/* Accent companion star */}
                                    <path
                                        d="M 148 131 C 148 133.5 146 135.5 143.5 135.5 C 146 135.5 148 137.5 148 140 C 148 137.5 150 135.5 152.5 135.5 C 150 135.5 148 133.5 148 131 Z"
                                        fill="#4b3fbc"
                                        fillOpacity="0.7"
                                    />
                                    {/* Subtle micro star */}
                                    <path
                                        d="M 133 146 C 133 147.5 131.8 148.7 130.3 148.7 C 131.8 148.7 133 149.9 133 151.4 C 133 149.9 134.2 148.7 135.7 148.7 C 134.2 148.7 133 147.5 133 146 Z"
                                        fill="#4b3fbc"
                                        fillOpacity="0.5"
                                    />
                                </svg>

                                {/* Stage 01 Node: Assess (Top — 12:00) */}
                                <div
                                    className="absolute top-[10.7%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
                                    aria-hidden="true"
                                >
                                    <div className="relative w-11 h-11 xl:w-12 xl:h-12 rounded-full bg-white border border-[#4b3fbc]/30 shadow-[0_2px_8px_rgba(75,63,188,0.08)] flex items-center justify-center text-[#4b3fbc]">
                                        <IconAssess className="w-5 h-5 stroke-[1.75]" />
                                        <span className="stage-badge-number absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#4b3fbc] text-white text-[10px] font-bold flex items-center justify-center font-mono shadow-sm">
                                            01
                                        </span>
                                    </div>
                                </div>

                                {/* Stage 02 Node: Plan (Right — 3:00) */}
                                <div
                                    className="absolute top-1/2 left-[89.3%] -translate-x-1/2 -translate-y-1/2 z-10"
                                    aria-hidden="true"
                                >
                                    <div className="relative w-11 h-11 xl:w-12 xl:h-12 rounded-full bg-white border border-[#4b3fbc]/30 shadow-[0_2px_8px_rgba(75,63,188,0.08)] flex items-center justify-center text-[#4b3fbc]">
                                        <IconPlan className="w-5 h-5 stroke-[1.75]" />
                                        <span className="stage-badge-number absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#4b3fbc] text-white text-[10px] font-bold flex items-center justify-center font-mono shadow-sm">
                                            02
                                        </span>
                                    </div>
                                </div>

                                {/* Stage 03 Node: Implement (Bottom — 6:00) */}
                                <div
                                    className="absolute top-[89.3%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
                                    aria-hidden="true"
                                >
                                    <div className="relative w-11 h-11 xl:w-12 xl:h-12 rounded-full bg-white border border-[#4b3fbc]/30 shadow-[0_2px_8px_rgba(75,63,188,0.08)] flex items-center justify-center text-[#4b3fbc]">
                                        <IconImplement className="w-5 h-5 stroke-[1.75]" />
                                        <span className="stage-badge-number absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#4b3fbc] text-white text-[10px] font-bold flex items-center justify-center font-mono shadow-sm">
                                            03
                                        </span>
                                    </div>
                                </div>

                                {/* Stage 04 Node: Review (Left — 9:00) */}
                                <div
                                    className="absolute top-1/2 left-[10.7%] -translate-x-1/2 -translate-y-1/2 z-10"
                                    aria-hidden="true"
                                >
                                    <div className="relative w-11 h-11 xl:w-12 xl:h-12 rounded-full bg-white border border-[#4b3fbc]/30 shadow-[0_2px_8px_rgba(75,63,188,0.08)] flex items-center justify-center text-[#4b3fbc]">
                                        <IconReview className="w-5 h-5 stroke-[1.75]" />
                                        <span className="stage-badge-number absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#4b3fbc] text-white text-[10px] font-bold flex items-center justify-center font-mono shadow-sm">
                                            04
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* 02 — Plan (Right: Col 3, Row 2) */}
                            <div className="col-start-3 row-start-2 flex flex-col items-start text-left max-w-[195px] xl:max-w-[218px] pl-1.5 xl:pl-2 self-center justify-self-start">
                                <span className="stage-eyebrow text-xs font-bold tracking-[0.14em] uppercase text-[#4b3fbc] mb-1">
                                    {stagePlan.number} — {stagePlan.title}
                                </span>
                                <p className="text-xs xl:text-sm text-gray-600 leading-relaxed text-balance">
                                    {stagePlan.description}
                                </p>
                            </div>

                            {/* 03 — Implement (Bottom: Col 2, Row 3) */}
                            <div className="col-start-2 row-start-3 flex flex-col items-center text-center max-w-[340px] mx-auto pt-1">
                                <span className="stage-eyebrow text-xs font-bold tracking-[0.14em] uppercase text-[#4b3fbc] mb-1">
                                    {stageImplement.number} — {stageImplement.title}
                                </span>
                                <p className="text-xs xl:text-sm text-gray-600 leading-relaxed text-balance">
                                    {stageImplement.description}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
