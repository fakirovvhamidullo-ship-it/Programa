import { Braces, Database, Gamepad2, Globe, Monitor, Trophy } from 'lucide-react'

function PythonMark({ size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12.2 2.2c-2.7 0-2.6 1.2-2.6 2.7v1.4h5.3v1.8H7.6c-1.8 0-3.4 1.1-3.4 3.3 0 2.1 1.3 3.2 3.4 3.2h1.4v-2c0-1.3 1.1-2.4 2.6-2.4h5.1c1.5 0 2.6-.9 2.6-2.5 0-2.6-1.4-5.5-7.1-5.5z"
        fill="currentColor"
      />
      <path
        d="M11.8 21.8c2.7 0 2.6-1.2 2.6-2.7v-1.4H9.1v-1.8h7.3c1.8 0 3.4-1.1 3.4-3.3 0-2.1-1.3-3.2-3.4-3.2h-1.4v2c0 1.3-1.1 2.4-2.6 2.4H7.3c-1.5 0-2.6.9-2.6 2.5 0 2.6 1.4 5.5 7.1 5.5z"
        fill="currentColor"
        opacity="0.55"
      />
      <circle cx="9.4" cy="4.5" r="0.8" fill="var(--bg, #070b14)" />
      <circle cx="14.6" cy="19.5" r="0.8" fill="var(--bg, #070b14)" />
    </svg>
  )
}

const ICONS = {
  computer: Monitor,
  programming: Braces,
  web: Globe,
  games: Gamepad2,
  backend: Database,
  final: Trophy,
}

export function BlockIcon({ id, size = 18 }) {
  const Icon = ICONS[id]
  return (
    <span className="block-icon" aria-hidden="true">
      {id === 'python' || !Icon ? <PythonMark size={size} /> : <Icon size={size} strokeWidth={2.15} />}
    </span>
  )
}
