import { BlockIcon } from './BlockIcon'

const COLORS = {
  computer: '#6ee7ff',
  programming: '#a78bfa',
  web: '#34d399',
  games: '#f472b6',
  python: '#facc15',
  backend: '#fb923c',
  final: '#fbbf24',
}

export function Illu({ type }) {
  const id = COLORS[type] ? type : 'computer'
  return (
    <div className="illu cover-badge" style={{ '--accent': COLORS[id] }} aria-hidden="true">
      <BlockIcon id={id} size={42} />
    </div>
  )
}
