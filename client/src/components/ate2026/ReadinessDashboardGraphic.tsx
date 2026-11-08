import { Shield, Lock, Scale, BrainCircuit, ChevronRight } from "lucide-react";
import { type CSSProperties } from "react";

interface ReadinessDashboardGraphicProps {
  className?: string;
  style?: CSSProperties;
}

const CATEGORIES = [
  {
    id: "security",
    title: "Security",
    subtitle: "Protect your business and data",
    icon: Shield,
    iconBg: "rgba(123, 66, 246, 0.22)",
    iconBorder: "rgba(168, 120, 255, 0.35)",
  },
  {
    id: "privacy",
    title: "Data Privacy",
    subtitle: "Manage personal data responsibly",
    icon: Lock,
    iconBg: "rgba(108, 53, 232, 0.25)",
    iconBorder: "rgba(168, 120, 255, 0.35)",
  },
  {
    id: "legal",
    title: "Legal Compliance",
    subtitle: "Meet key regulatory requirements",
    icon: Scale,
    iconBg: "rgba(91, 33, 182, 0.28)",
    iconBorder: "rgba(168, 120, 255, 0.35)",
  },
  {
    id: "ai",
    title: "AI Governance",
    subtitle: "Use AI safely and responsibly",
    icon: BrainCircuit,
    iconBg: "rgba(123, 66, 246, 0.22)",
    iconBorder: "rgba(168, 120, 255, 0.35)",
  },
] as const;

export default function ReadinessDashboardGraphic({ className, style }: ReadinessDashboardGraphicProps) {
  return (
    <div
      className={`ate2026-dashboard-wrapper relative flex flex-col items-center justify-center select-none ${className || ""}`}
      style={style}
      aria-hidden="true"
    >
      {/* 3D Dashboard Card Window */}
      <div className="ate2026-dashboard-window relative w-full max-w-[540px] rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-[#a878ff]/30 bg-[#160a33]/92 shadow-[0_20px_50px_rgba(10,4,25,0.7),0_0_40px_rgba(123,66,246,0.22)] backdrop-blur-md">
        {/* Window Top Controls (3 dots) */}
        <div className="flex items-center gap-1.5 mb-5 sm:mb-6">
          <span className="w-2.5 h-2.5 rounded-full bg-[#a878ff]/40" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#a878ff]/40" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#a878ff]/40" />
        </div>

        {/* Dashboard Title */}
        <h3 className="text-white font-semibold text-base sm:text-lg tracking-tight mb-5 sm:mb-6">
          Business Readiness Assessment
        </h3>

        {/* Interior Two-Column Grid: Donut Chart on Left, 4 Categories on Right */}
        <div className="grid grid-cols-1 sm:grid-cols-[145px_1fr] md:grid-cols-[165px_1fr] gap-5 sm:gap-6 items-center">
          {/* Segmented Donut Chart with Ascending Bars */}
          <div className="flex items-center justify-center">
            <svg
              viewBox="0 0 180 180"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-32 h-32 sm:w-36 sm:h-36 drop-shadow-[0_0_24px_rgba(140,82,255,0.4)]"
            >
              {/* Segment 1 */}
              <path
                d="M 90 12 A 78 78 0 0 1 153.1 44.15 L 135.3 57.08 A 56 56 0 0 0 90 34 Z"
                fill="#8C52FF"
              />
              {/* Segment 2 */}
              <path
                d="M 157.55 51 A 78 78 0 0 1 161.26 121.73 L 141.16 112.78 A 56 56 0 0 0 138.5 62 Z"
                fill="#6C35E8"
              />
              {/* Segment 3 */}
              <path
                d="M 157.55 129 A 78 78 0 0 1 98.15 167.57 L 95.85 145.69 A 56 56 0 0 0 138.5 118 Z"
                fill="#5522C4"
              />
              {/* Segment 4 */}
              <path
                d="M 90 168 A 78 78 0 0 1 26.9 135.85 L 44.7 122.92 A 56 56 0 0 0 90 146 Z"
                fill="#7B42F6"
              />
              {/* Segment 5 */}
              <path
                d="M 22.45 129 A 78 78 0 0 1 18.74 58.27 L 38.84 67.22 A 56 56 0 0 0 41.5 118 Z"
                fill="#A77BFB"
              />
              {/* Segment 6 */}
              <path
                d="M 22.45 51 A 78 78 0 0 1 81.85 12.43 L 84.15 34.31 A 56 56 0 0 0 41.5 62 Z"
                fill="#CBB2FE"
              />

              {/* Center Ascending Columns */}
              <rect x="73" y="96" width="9" height="18" rx="3" fill="#A77BFB" />
              <rect x="86" y="86" width="9" height="28" rx="3" fill="#CBB2FE" />
              <rect x="99" y="74" width="9" height="40" rx="3" fill="#EDE9FE" />
            </svg>
          </div>

          {/* 4 Category Rows */}
          <div className="flex flex-col gap-2.5 sm:gap-3 w-full">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              return (
                <div
                  key={cat.id}
                  className="flex items-center justify-between gap-3 px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-xl bg-[#231245]/75 border border-[#a878ff]/20 shadow-sm"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{
                        backgroundColor: cat.iconBg,
                        border: `1px solid ${cat.iconBorder}`,
                      }}
                    >
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm font-bold text-white leading-tight">
                        {cat.title}
                      </p>
                      <p className="text-[11px] sm:text-xs text-[#C4BCD7] truncate leading-tight mt-0.5">
                        {cat.subtitle}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#A77BFB] flex-shrink-0" />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Grounding Floor Violet Reflection Glow */}
      <div
        className="ate2026-dashboard-glow pointer-events-none mt-2 w-4/5 h-8 rounded-full"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(138, 85, 255, 0.65), rgba(108, 53, 232, 0.25) 50%, transparent 75%)",
          filter: "blur(14px)",
        }}
      />
    </div>
  );
}
