import { type CSSProperties } from "react";

interface AfricaMapGraphicProps {
  className?: string;
  style?: CSSProperties;
}

export default function AfricaMapGraphic({ className, style }: AfricaMapGraphicProps) {
  return (
    <div
      className={`relative flex items-center justify-center select-none pointer-events-none ${className || ""}`}
      style={style}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 540 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto max-w-full drop-shadow-[0_0_40px_rgba(154,106,255,0.28)]"
      >
        <defs>
          {/* Dot matrix pattern */}
          <pattern
            id="africa-grid-dots"
            x="0"
            y="0"
            width="13"
            height="13"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="6.5" cy="6.5" r="1.5" fill="#a77bfb" opacity="0.68" />
          </pattern>

          {/* Denser accent dots pattern */}
          <pattern
            id="africa-grid-dots-accent"
            x="0"
            y="0"
            width="26"
            height="26"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="13" cy="13" r="2.2" fill="#cbb2fe" opacity="0.85" />
          </pattern>

          {/* Africa continent fill gradient */}
          <linearGradient id="africa-fill-grad" x1="15%" y1="10%" x2="85%" y2="90%">
            <stop offset="0%" stopColor="#431c84" stopOpacity="0.45" />
            <stop offset="50%" stopColor="#280f55" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#14062e" stopOpacity="0.55" />
          </linearGradient>

          {/* Arc gradient for glowing connecting lines */}
          <linearGradient id="arc-purple-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#cbb2fe" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#9a6aff" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#e2d2ff" stopOpacity="0.9" />
          </linearGradient>

          {/* Radial node glow */}
          <radialGradient id="node-glow-grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="35%" stopColor="#bfa1ff" stopOpacity="0.8" />
            <stop offset="70%" stopColor="#8c52ff" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#8c52ff" stopOpacity="0" />
          </radialGradient>

          {/* Soft blur for outer aura */}
          <filter id="africa-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* Clip path defining the authentic boundary of Africa + Madagascar */}
          <clipPath id="africa-continent-clip">
            <path d="M 148,58 C 165,48 190,38 215,32 C 225,28 238,38 232,52 C 222,72 235,82 255,85 C 275,88 305,75 330,78 C 345,80 365,72 375,82 C 382,90 375,108 385,125 C 395,142 418,168 425,188 C 432,208 458,212 485,218 C 492,220 495,232 488,245 C 475,270 455,295 442,320 C 430,345 422,370 415,395 C 408,420 395,445 382,470 C 368,495 355,515 342,532 C 330,548 312,558 295,558 C 278,558 262,545 255,528 C 248,510 248,485 245,460 C 242,435 240,405 240,375 C 240,345 232,328 220,312 C 208,295 192,282 175,280 C 155,278 135,272 115,275 C 95,278 78,272 65,255 C 52,238 42,218 40,198 C 38,178 52,162 65,145 C 78,128 92,112 108,98 C 122,85 138,70 148,58 Z M 445,415 C 455,435 452,465 440,495 C 430,520 418,532 410,530 C 402,528 408,505 418,475 C 428,445 435,420 445,415 Z" />
          </clipPath>
        </defs>

        {/* Outer ambient blur aura */}
        <g filter="url(#africa-glow)" opacity="0.45">
          <path
            d="M 148,58 C 165,48 190,38 215,32 C 225,28 238,38 232,52 C 222,72 235,82 255,85 C 275,88 305,75 330,78 C 345,80 365,72 375,82 C 382,90 375,108 385,125 C 395,142 418,168 425,188 C 432,208 458,212 485,218 C 492,220 495,232 488,245 C 475,270 455,295 442,320 C 430,345 422,370 415,395 C 408,420 395,445 382,470 C 368,495 355,515 342,532 C 330,548 312,558 295,558 C 278,558 262,545 255,528 C 248,510 248,485 245,460 C 242,435 240,405 240,375 C 240,345 232,328 220,312 C 208,295 192,282 175,280 C 155,278 135,272 115,275 C 95,278 78,272 65,255 C 52,238 42,218 40,198 C 38,178 52,162 65,145 C 78,128 92,112 108,98 C 122,85 138,70 148,58 Z"
            fill="none"
            stroke="#9a6aff"
            strokeWidth="8"
          />
        </g>

        {/* Clipped Africa body with gradient & dot matrix */}
        <g clipPath="url(#africa-continent-clip)">
          {/* Subtle translucent dark violet gradient base */}
          <rect x="0" y="0" width="540" height="600" fill="url(#africa-fill-grad)" />

          {/* Primary matrix dots */}
          <rect x="0" y="0" width="540" height="600" fill="url(#africa-grid-dots)" />

          {/* Secondary brighter accent dots layer */}
          <rect x="0" y="0" width="540" height="600" fill="url(#africa-grid-dots-accent)" />
        </g>

        {/* Precise Continent Border Line with soft violet illumination */}
        <path
          d="M 148,58 C 165,48 190,38 215,32 C 225,28 238,38 232,52 C 222,72 235,82 255,85 C 275,88 305,75 330,78 C 345,80 365,72 375,82 C 382,90 375,108 385,125 C 395,142 418,168 425,188 C 432,208 458,212 485,218 C 492,220 495,232 488,245 C 475,270 455,295 442,320 C 430,345 422,370 415,395 C 408,420 395,445 382,470 C 368,495 355,515 342,532 C 330,548 312,558 295,558 C 278,558 262,545 255,528 C 248,510 248,485 245,460 C 242,435 240,405 240,375 C 240,345 232,328 220,312 C 208,295 192,282 175,280 C 155,278 135,272 115,275 C 95,278 78,272 65,255 C 52,238 42,218 40,198 C 38,178 52,162 65,145 C 78,128 92,112 108,98 C 122,85 138,70 148,58 Z"
          fill="none"
          stroke="#b993ff"
          strokeWidth="1.6"
          strokeOpacity="0.7"
        />

        {/* Madagascar border */}
        <path
          d="M 445,415 C 455,435 452,465 440,495 C 430,520 418,532 410,530 C 402,528 408,505 418,475 C 428,445 435,420 445,415 Z"
          fill="none"
          stroke="#b993ff"
          strokeWidth="1.6"
          strokeOpacity="0.7"
        />

        {/* ================================================================= */}
        {/* Curved Glowing Interconnecting Network Arcs                       */}
        {/* ================================================================= */}
        {/* Arc: West Africa (Côte d'Ivoire/Ghana) to East Africa (Kenya) */}
        <path
          d="M 120,275 Q 260,195 420,335"
          fill="none"
          stroke="url(#arc-purple-grad)"
          strokeWidth="2.2"
          strokeDasharray="6 3"
          opacity="0.9"
        />

        {/* Arc: Nigeria to Kenya */}
        <path
          d="M 185,272 Q 300,240 420,335"
          fill="none"
          stroke="url(#arc-purple-grad)"
          strokeWidth="1.8"
          opacity="0.8"
        />

        {/* Arc: West Africa corridor (Côte d'Ivoire/Ghana to South Africa) */}
        <path
          d="M 120,275 Q 185,420 305,505"
          fill="none"
          stroke="url(#arc-purple-grad)"
          strokeWidth="2.2"
          strokeDasharray="6 3"
          opacity="0.85"
        />

        {/* Arc: East Africa (Kenya) to South Africa */}
        <path
          d="M 420,335 Q 395,430 305,505"
          fill="none"
          stroke="url(#arc-purple-grad)"
          strokeWidth="2.2"
          opacity="0.88"
        />

        {/* Arc: North Africa (Cairo) to Kenya */}
        <path
          d="M 355,95 Q 405,210 420,335"
          fill="none"
          stroke="url(#arc-purple-grad)"
          strokeWidth="1.8"
          strokeDasharray="5 3"
          opacity="0.75"
        />

        {/* Arc: Northwest Africa (Morocco) to West Africa */}
        <path
          d="M 135,75 Q 95,175 120,275"
          fill="none"
          stroke="url(#arc-purple-grad)"
          strokeWidth="1.8"
          opacity="0.75"
        />

        {/* ================================================================= */}
        {/* Strategic Business Hub Nodes with Concentric Glowing Halos        */}
        {/* ================================================================= */}
        {/* Hub 1: Côte d'Ivoire & Ghana (West Hub) */}
        <g transform="translate(120, 275)">
          <circle cx="0" cy="0" r="18" fill="url(#node-glow-grad)" opacity="0.65" />
          <circle cx="0" cy="0" r="9" fill="#1b0838" stroke="#a77bfb" strokeWidth="2" />
          <circle cx="0" cy="0" r="4.5" fill="#ffffff" />
        </g>

        {/* Hub 2: Nigeria (West Hub - Lagos / Abuja) */}
        <g transform="translate(185, 272)">
          <circle cx="0" cy="0" r="22" fill="url(#node-glow-grad)" opacity="0.75" />
          <circle cx="0" cy="0" r="10" fill="#1b0838" stroke="#cbb2fe" strokeWidth="2.2" />
          <circle cx="0" cy="0" r="5" fill="#ffffff" />
        </g>

        {/* Hub 3: Kenya (East Hub - Nairobi) */}
        <g transform="translate(420, 335)">
          <circle cx="0" cy="0" r="22" fill="url(#node-glow-grad)" opacity="0.75" />
          <circle cx="0" cy="0" r="10" fill="#1b0838" stroke="#cbb2fe" strokeWidth="2.2" />
          <circle cx="0" cy="0" r="5" fill="#ffffff" />
        </g>

        {/* Hub 4: South Africa (Southern Hub - Johannesburg) */}
        <g transform="translate(305, 505)">
          <circle cx="0" cy="0" r="20" fill="url(#node-glow-grad)" opacity="0.7" />
          <circle cx="0" cy="0" r="9.5" fill="#1b0838" stroke="#a77bfb" strokeWidth="2" />
          <circle cx="0" cy="0" r="4.5" fill="#ffffff" />
        </g>

        {/* Hub 5: North Africa (Cairo) */}
        <g transform="translate(355, 95)">
          <circle cx="0" cy="0" r="16" fill="url(#node-glow-grad)" opacity="0.6" />
          <circle cx="0" cy="0" r="8" fill="#1b0838" stroke="#a77bfb" strokeWidth="1.8" />
          <circle cx="0" cy="0" r="3.5" fill="#ffffff" />
        </g>

        {/* Hub 6: Northwest Africa (Casablanca / Morocco) */}
        <g transform="translate(135, 75)">
          <circle cx="0" cy="0" r="15" fill="url(#node-glow-grad)" opacity="0.55" />
          <circle cx="0" cy="0" r="7.5" fill="#1b0838" stroke="#a77bfb" strokeWidth="1.8" />
          <circle cx="0" cy="0" r="3.5" fill="#ffffff" />
        </g>
      </svg>
    </div>
  );
}
