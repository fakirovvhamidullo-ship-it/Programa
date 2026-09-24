function Cover({ id, children }) {
  return (
    <svg viewBox="0 0 360 168" className="illu" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-shine`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.55" />
          <stop offset="0.45" stopColor="#fff" stopOpacity="0.05" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
      {children}
    </svg>
  )
}

export function Illu({ type }) {
  if (type === 'computer') {
    return (
      <Cover id="computer">
        <ellipse cx="180" cy="96" rx="120" ry="36" fill="var(--ink-cyan)" opacity="0.18" />
        <rect x="78" y="28" width="204" height="96" rx="16" fill="var(--cover-panel)" stroke="var(--ink-cyan)" strokeWidth="2.5" />
        <rect x="92" y="42" width="176" height="68" rx="8" fill="var(--cover-deep)" />
        <rect x="104" y="54" width="86" height="10" rx="5" fill="var(--ink-cyan)" />
        <rect x="104" y="72" width="58" height="8" rx="4" fill="var(--ink-violet)" opacity="0.9" />
        <rect x="104" y="88" width="72" height="8" rx="4" fill="var(--ink-green)" opacity="0.85" />
        <rect x="214" y="54" width="40" height="40" rx="10" fill="var(--ink-green)" opacity="0.9" />
        <rect x="148" y="124" width="64" height="8" rx="4" fill="var(--cover-ink)" opacity="0.55" />
        <rect x="128" y="136" width="104" height="8" rx="4" fill="var(--ink-cyan)" opacity="0.7" />
        <rect className="cover-shine" x="78" y="28" width="204" height="96" rx="16" fill="url(#computer-shine)" />
      </Cover>
    )
  }
  if (type === 'programming') {
    return (
      <Cover id="programming">
        <ellipse cx="250" cy="40" rx="46" ry="28" fill="var(--ink-violet)" opacity="0.2" />
        <rect x="36" y="22" width="288" height="124" rx="18" fill="var(--cover-panel)" stroke="var(--ink-violet)" strokeWidth="2.5" />
        <circle cx="58" cy="44" r="5" fill="#fb7185" />
        <circle cx="76" cy="44" r="5" fill="var(--ink-gold)" />
        <circle cx="94" cy="44" r="5" fill="var(--ink-green)" />
        <text x="56" y="78" fill="var(--ink-violet)" fontFamily="ui-monospace, monospace" fontSize="16">
          {'> let skill = 0'}
        </text>
        <text x="56" y="104" fill="var(--ink-cyan)" fontFamily="ui-monospace, monospace" fontSize="16">
          {'> skill += 1'}
        </text>
        <text x="56" y="130" fill="var(--ink-green)" fontFamily="ui-monospace, monospace" fontSize="16">
          {'> console.log(skill)'}
        </text>
        <rect className="cover-shine" x="36" y="22" width="288" height="124" rx="18" fill="url(#programming-shine)" />
      </Cover>
    )
  }
  if (type === 'web') {
    return (
      <Cover id="web">
        <ellipse cx="90" cy="130" rx="70" ry="22" fill="var(--ink-green)" opacity="0.16" />
        <rect x="42" y="18" width="276" height="132" rx="16" fill="var(--cover-panel)" stroke="var(--ink-green)" strokeWidth="2.5" />
        <rect x="42" y="18" width="276" height="28" rx="16" fill="var(--cover-deep)" />
        <rect x="42" y="34" width="276" height="12" fill="var(--cover-deep)" />
        <circle cx="64" cy="32" r="5" fill="#fb7185" />
        <circle cx="82" cy="32" r="5" fill="var(--ink-gold)" />
        <circle cx="100" cy="32" r="5" fill="var(--ink-green)" />
        <rect x="128" y="24" width="168" height="16" rx="8" fill="var(--cover-soft)" />
        <rect x="58" y="60" width="150" height="14" rx="7" fill="var(--ink-cyan)" />
        <rect x="58" y="82" width="110" height="8" rx="4" fill="var(--cover-ink)" opacity="0.35" />
        <rect x="58" y="108" width="112" height="26" rx="8" fill="var(--ink-green)" opacity="0.85" />
        <rect x="184" y="60" width="114" height="74" rx="12" fill="var(--cover-deep)" stroke="var(--ink-cyan)" />
        <rect className="cover-shine" x="42" y="18" width="276" height="132" rx="16" fill="url(#web-shine)" />
      </Cover>
    )
  }
  if (type === 'games') {
    return (
      <Cover id="games">
        <ellipse cx="180" cy="96" rx="130" ry="40" fill="var(--ink-pink)" opacity="0.18" />
        <rect x="78" y="48" width="204" height="86" rx="40" fill="var(--cover-panel)" stroke="var(--ink-pink)" strokeWidth="2.5" />
        <rect x="108" y="74" width="28" height="8" rx="3" fill="var(--ink-pink)" />
        <rect x="118" y="64" width="8" height="28" rx="3" fill="var(--ink-pink)" />
        <circle cx="214" cy="78" r="8" fill="var(--ink-cyan)" />
        <circle cx="236" cy="96" r="8" fill="var(--ink-gold)" />
        <circle cx="214" cy="114" r="8" fill="var(--ink-green)" />
        <circle cx="192" cy="96" r="8" fill="var(--ink-violet)" />
        <rect className="cover-shine" x="78" y="48" width="204" height="86" rx="40" fill="url(#games-shine)" />
      </Cover>
    )
  }
  if (type === 'python') {
    return (
      <Cover id="python">
        <ellipse cx="180" cy="88" rx="110" ry="48" fill="var(--ink-gold)" opacity="0.16" />
        <path
          d="M118 46h62c22 0 28 14 28 28v18H132c-20 0-28-10-28-24 0-14 4-22 14-22z"
          fill="var(--ink-gold)"
        />
        <path
          d="M242 122h-62c-22 0-28-14-28-28V76h76c20 0 28 10 28 24 0 14-4 22-14 22z"
          fill="var(--ink-blue)"
        />
        <circle cx="146" cy="68" r="6" fill="var(--cover-deep)" />
        <circle cx="214" cy="104" r="6" fill="var(--cover-deep)" />
        <circle cx="148" cy="66" r="2" fill="#fff" />
        <circle cx="216" cy="102" r="2" fill="#fff" />
      </Cover>
    )
  }
  if (type === 'backend') {
    return (
      <Cover id="backend">
        <ellipse cx="180" cy="130" rx="90" ry="18" fill="var(--ink-orange)" opacity="0.16" />
        <g stroke="var(--ink-orange)" strokeWidth="2.5">
          <ellipse cx="180" cy="46" rx="78" ry="18" fill="#fdba74" />
          <path d="M102 46v22c0 10 35 18 78 18s78-8 78-18V46" fill="var(--cover-panel)" />
          <ellipse cx="180" cy="84" rx="78" ry="18" fill="var(--ink-orange)" />
          <path d="M102 84v22c0 10 35 18 78 18s78-8 78-18V84" fill="var(--cover-panel)" />
          <ellipse cx="180" cy="122" rx="78" ry="16" fill="var(--ink-orange)" opacity="0.75" />
        </g>
        <ellipse className="cover-shine" cx="180" cy="46" rx="78" ry="18" fill="url(#backend-shine)" />
      </Cover>
    )
  }
  return (
    <Cover id="final">
      <ellipse cx="180" cy="120" rx="70" ry="16" fill="var(--ink-gold)" opacity="0.2" />
      <path d="M150 58h60l-8 36h-44z" fill="var(--ink-gold)" />
      <path d="M138 58c0-16 18-28 42-28s42 12 42 28" fill="none" stroke="var(--ink-gold)" strokeWidth="8" strokeLinecap="round" />
      <rect x="156" y="98" width="48" height="10" rx="4" fill="var(--ink-gold)" />
      <rect x="142" y="110" width="76" height="12" rx="4" fill="var(--ink-gold)" opacity="0.75" />
      <polygon points="180,28 186,46 204,46 190,56 196,74 180,64 164,74 170,56 156,46 174,46" fill="#fff" opacity="0.95" />
      <path className="cover-shine" d="M150 58h60l-8 36h-44z" fill="url(#final-shine)" />
    </Cover>
  )
}
