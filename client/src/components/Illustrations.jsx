function Badge({ id, color, children }) {
  return (
    <svg viewBox="0 0 360 168" className="illu" aria-hidden="true">
      <defs>
        <radialGradient id={`${id}-glow`} cx="50%" cy="46%" r="50%">
          <stop offset="0" stopColor={color} stopOpacity="0.55" />
          <stop offset="1" stopColor={color} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}-ring`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.7" />
          <stop offset="0.45" stopColor={color} />
          <stop offset="1" stopColor={color} stopOpacity="0.75" />
        </linearGradient>
      </defs>
      <ellipse cx="180" cy="78" rx="110" ry="72" fill={`url(#${id}-glow)`} />
      <circle cx="180" cy="74" r="62" fill="none" stroke={color} strokeWidth="1.5" opacity="0.35" />
      <circle cx="180" cy="74" r="54" fill="var(--cover-panel)" stroke={`url(#${id}-ring)`} strokeWidth="5" />
      <circle cx="180" cy="74" r="44" fill="var(--cover-deep)" />
      <circle cx="180" cy="74" r="44" fill="#fff" opacity="0.06" />
      {children}
      <path d="M156 48c8-10 22-16 36-14" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity="0.35" />
    </svg>
  )
}

function Star({ x, y, color }) {
  return <polygon points={`${x},${y} ${x + 3},${y + 7} ${x + 10},${y + 7} ${x + 4.5},${y + 11.5} ${x + 6.5},${y + 18} ${x},${y + 14} ${x - 6.5},${y + 18} ${x - 4.5},${y + 11.5} ${x - 10},${y + 7} ${x - 3},${y + 7}`} fill={color} opacity="0.9" />
}

export function Illu({ type }) {
  if (type === 'computer') {
    return (
      <Badge id="computer" color="var(--ink-cyan)">
        <rect x="156" y="56" width="48" height="30" rx="5" fill="var(--cover-panel)" stroke="var(--ink-cyan)" strokeWidth="2.2" />
        <rect x="161" y="61" width="22" height="3.5" rx="1.5" fill="var(--ink-cyan)" />
        <rect x="161" y="68" width="14" height="3" rx="1.5" fill="var(--ink-violet)" />
        <rect x="161" y="75" width="18" height="3" rx="1.5" fill="var(--ink-green)" />
        <rect x="188" y="61" width="10" height="10" rx="2" fill="var(--ink-green)" />
        <rect x="174" y="86" width="12" height="3" rx="1" fill="var(--ink-cyan)" />
        <rect x="168" y="89" width="24" height="3" rx="1" fill="var(--ink-cyan)" opacity="0.75" />
        <Star x="118" y="28" color="var(--ink-cyan)" />
      </Badge>
    )
  }
  if (type === 'programming') {
    return (
      <Badge id="programming" color="var(--ink-violet)">
        <path d="M168 58l-16 16 16 16" fill="none" stroke="var(--ink-violet)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M192 58l16 16-16 16" fill="none" stroke="var(--ink-cyan)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M184 54l-8 40" stroke="var(--ink-green)" strokeWidth="3" strokeLinecap="round" />
        <Star x="236" y="30" color="var(--ink-violet)" />
      </Badge>
    )
  }
  if (type === 'web') {
    return (
      <Badge id="web" color="var(--ink-green)">
        <circle cx="180" cy="72" r="20" fill="none" stroke="var(--ink-green)" strokeWidth="2.4" />
        <ellipse cx="180" cy="72" rx="9" ry="20" fill="none" stroke="var(--ink-cyan)" strokeWidth="2" />
        <path d="M160 72h40M164 64h32M164 80h32" stroke="var(--ink-green)" strokeWidth="2" strokeLinecap="round" />
        <Star x="112" y="36" color="var(--ink-green)" />
      </Badge>
    )
  }
  if (type === 'games') {
    return (
      <Badge id="games" color="var(--ink-pink)">
        <rect x="152" y="62" width="56" height="26" rx="13" fill="var(--cover-panel)" stroke="var(--ink-pink)" strokeWidth="2.4" />
        <path d="M164 75h12M170 69v12" stroke="var(--ink-pink)" strokeWidth="2.4" strokeLinecap="round" />
        <circle cx="192" cy="71" r="2.4" fill="var(--ink-cyan)" />
        <circle cx="198" cy="77" r="2.4" fill="var(--ink-gold)" />
        <circle cx="192" cy="83" r="2.4" fill="var(--ink-green)" />
        <Star x="232" y="28" color="var(--ink-pink)" />
      </Badge>
    )
  }
  if (type === 'python') {
    return (
      <Badge id="python" color="var(--ink-gold)">
        <path d="M168 56h18c8 0 12 5 12 11v8h-22c-8 0-12-4-12-10 0-6 1-9 4-9z" fill="var(--ink-gold)" />
        <path d="M192 96h-18c-8 0-12-5-12-11v-8h22c8 0 12 4 12 10 0 6-1 9-4 9z" fill="var(--ink-blue)" />
        <circle cx="176" cy="64" r="2" fill="var(--cover-deep)" />
        <circle cx="184" cy="88" r="2" fill="var(--cover-deep)" />
        <Star x="116" y="32" color="var(--ink-gold)" />
      </Badge>
    )
  }
  if (type === 'backend') {
    return (
      <Badge id="backend" color="var(--ink-orange)">
        <g stroke="var(--ink-orange)" strokeWidth="1.6">
          <ellipse cx="180" cy="58" rx="22" ry="7" fill="#fdba74" />
          <path d="M158 58v10c0 4 10 7 22 7s22-3 22-7V58" fill="var(--cover-panel)" />
          <ellipse cx="180" cy="74" rx="22" ry="7" fill="var(--ink-orange)" />
          <path d="M158 74v10c0 4 10 7 22 7s22-3 22-7V74" fill="var(--cover-panel)" />
          <ellipse cx="180" cy="90" rx="22" ry="6" fill="var(--ink-orange)" opacity="0.8" />
        </g>
        <Star x="230" y="30" color="var(--ink-orange)" />
      </Badge>
    )
  }
  return (
    <Badge id="final" color="var(--ink-gold)">
      <path d="M168 62h24l-3 16h-18z" fill="var(--ink-gold)" />
      <path d="M164 62c0-8 7-14 16-14s16 6 16 14" fill="none" stroke="var(--ink-gold)" strokeWidth="3.5" strokeLinecap="round" />
      <rect x="174" y="80" width="12" height="4" rx="1" fill="var(--ink-gold)" />
      <rect x="168" y="84" width="24" height="4" rx="1" fill="var(--ink-gold)" opacity="0.8" />
      <polygon points="180,48 183,56 191,56 185,61 187,69 180,64 173,69 175,61 169,56 177,56" fill="#fff" />
    </Badge>
  )
}
