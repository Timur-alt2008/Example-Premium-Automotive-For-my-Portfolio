/** Illustrated map of the fictional district. No real place is shown. */
export function StylizedMap({ className }: { className?: string }) {
  return (
    <div className={['map', className].filter(Boolean).join(' ')}>
      <svg viewBox="0 0 800 520" role="img" aria-label="Схема проезда к студии Example: Example Avenue, 1, въезд с северной стороны">
        <defs>
          <pattern id="map-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M40 0H0v40" fill="none" stroke="rgba(236,233,226,0.05)" />
          </pattern>
          <radialGradient id="map-glow">
            <stop offset="0" stopColor="rgba(251,248,241,0.45)" />
            <stop offset="1" stopColor="rgba(251,248,241,0)" />
          </radialGradient>
        </defs>
        <rect width="800" height="520" fill="#0d0e11" />
        <rect width="800" height="520" fill="url(#map-grid)" />
        <path d="M-20 400 C 160 360, 260 470, 420 430 S 700 330, 820 380 L 820 540 L -20 540 Z" fill="#121a22" />
        <path d="M-20 400 C 160 360, 260 470, 420 430 S 700 330, 820 380" fill="none" stroke="rgba(160,190,215,0.18)" />
        <g fill="#16181c" stroke="rgba(236,233,226,0.06)">
          <rect x="60" y="60" width="150" height="110" />
          <rect x="250" y="40" width="110" height="140" />
          <rect x="560" y="60" width="180" height="90" />
          <rect x="60" y="220" width="120" height="110" />
          <rect x="560" y="200" width="90" height="120" />
          <rect x="680" y="190" width="80" height="100" />
        </g>
        <g fill="none" strokeLinecap="round">
          <path d="M0 200 H800" stroke="#25282e" strokeWidth="22" />
          <path d="M480 0 V520" stroke="#25282e" strokeWidth="18" />
          <path d="M220 0 C 230 120, 210 260, 300 360" stroke="#202227" strokeWidth="12" />
          <path d="M0 200 H800" stroke="rgba(203,182,138,0.35)" strokeWidth="1" strokeDasharray="10 12" />
        </g>
        <rect x="380" y="232" width="170" height="104" fill="#1d1f24" stroke="rgba(203,182,138,0.5)" />
        <path d="M465 232 V214" stroke="rgba(203,182,138,0.8)" strokeWidth="2" />
        <circle cx="465" cy="284" r="70" fill="url(#map-glow)" className="map__glow" />
        <circle cx="465" cy="284" r="7" fill="#fbf8f1" />
        <text x="465" y="364" textAnchor="middle" fill="#f1eee8" fontFamily="Unbounded, sans-serif" fontSize="16" letterSpacing="2">EXAMPLE</text>
        <text x="610" y="190" fill="#a2a5ad" fontFamily="Manrope, sans-serif" fontSize="13">Example Avenue</text>
        <text x="492" y="40" fill="#a2a5ad" fontFamily="Manrope, sans-serif" fontSize="13" transform="rotate(90 492 40)">Сектор 7</text>
        <text x="472" y="208" fill="#cbb68a" fontFamily="Manrope, sans-serif" fontSize="12">въезд</text>
      </svg>
    </div>
  );
}
