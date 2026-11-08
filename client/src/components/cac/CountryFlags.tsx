// Vector SVG flags for country cards with rounded corners and authentic designs

export function NigeriaFlag({ className = "w-11 h-8 rounded-md shadow-sm" }: { className?: string }) {
  return (
    <svg viewBox="0 0 36 26" className={className} aria-hidden="true">
      <defs>
        <clipPath id="flag-ng-cac">
          <rect width="36" height="26" rx="5" />
        </clipPath>
      </defs>
      <g clipPath="url(#flag-ng-cac)">
        <rect width="12" height="26" fill="#008751" />
        <rect x="12" width="12" height="26" fill="#FFFFFF" />
        <rect x="24" width="12" height="26" fill="#008751" />
      </g>
    </svg>
  );
}

export function GhanaFlag({ className = "w-11 h-8 rounded-md shadow-sm" }: { className?: string }) {
  return (
    <svg viewBox="0 0 36 26" className={className} aria-hidden="true">
      <defs>
        <clipPath id="flag-gh-cac">
          <rect width="36" height="26" rx="5" />
        </clipPath>
      </defs>
      <g clipPath="url(#flag-gh-cac)">
        <rect width="36" height="8.67" fill="#EF3340" />
        <rect y="8.67" width="36" height="8.66" fill="#FFD100" />
        <rect y="17.33" width="36" height="8.67" fill="#009739" />
        {/* Black 5-pointed star centered at (18, 13) */}
        <polygon
          points="18,9.5 19.3,12.2 22.3,12.4 20,14.4 20.7,17.3 18,15.7 15.3,17.3 16,14.4 13.7,12.4 16.7,12.2"
          fill="#000000"
        />
      </g>
    </svg>
  );
}

export function KenyaFlag({ className = "w-11 h-8 rounded-md shadow-sm" }: { className?: string }) {
  return (
    <svg viewBox="0 0 36 26" className={className} aria-hidden="true">
      <defs>
        <clipPath id="flag-ke-cac">
          <rect width="36" height="26" rx="5" />
        </clipPath>
      </defs>
      <g clipPath="url(#flag-ke-cac)">
        <rect width="36" height="7.5" fill="#000000" />
        <rect y="7.5" width="36" height="1.5" fill="#FFFFFF" />
        <rect y="9" width="36" height="8" fill="#BB0000" />
        <rect y="17" width="36" height="1.5" fill="#FFFFFF" />
        <rect y="18.5" width="36" height="7.5" fill="#006600" />
        {/* Maasai shield and crossed spears */}
        <line x1="12" y1="6" x2="24" y2="20" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="24" y1="6" x2="12" y2="20" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
        <ellipse cx="18" cy="13" rx="3.5" ry="7" fill="#BB0000" stroke="#000000" strokeWidth="0.8" />
        <ellipse cx="18" cy="13" rx="1.4" ry="7" fill="#FFFFFF" />
        <circle cx="18" cy="13" r="1.1" fill="#000000" />
      </g>
    </svg>
  );
}

export function CoteDIvoireFlag({ className = "w-11 h-8 rounded-md shadow-sm" }: { className?: string }) {
  return (
    <svg viewBox="0 0 36 26" className={className} aria-hidden="true">
      <defs>
        <clipPath id="flag-ci-cac">
          <rect width="36" height="26" rx="5" />
        </clipPath>
      </defs>
      <g clipPath="url(#flag-ci-cac)">
        <rect width="12" height="26" fill="#FF8200" />
        <rect x="12" width="12" height="26" fill="#FFFFFF" />
        <rect x="24" width="12" height="26" fill="#009E60" />
      </g>
    </svg>
  );
}
