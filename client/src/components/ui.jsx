export function Button({ children, variant = 'primary', className = '', ...props }) {
  return (
    <button className={`btn ${variant} ${className}`} {...props}>
      {children}
    </button>
  )
}

export function Card({ children, className = '', ...props }) {
  return (
    <div className={`glass ${className}`} {...props}>
      {children}
    </div>
  )
}

export function ProgressBar({ value }) {
  return (
    <div className="progress" aria-valuenow={value}>
      <i style={{ '--w': `${Math.max(0, Math.min(100, value))}%` }} />
    </div>
  )
}

export function Modal({ open, title, children, onClose }) {
  if (!open) return null
  return (
    <div className="modal-back" onClick={onClose}>
      <Card className="modal" onClick={(e) => e.stopPropagation()}>
        {title && <h3>{title}</h3>}
        {children}
      </Card>
    </div>
  )
}

export function AvatarView({ user, progress, size = 84 }) {
  const map = { default: '🧑‍💻', fox: '🦊', bot: '🤖', star: '🌟' }
  const av = progress.equipped?.avatar || 'default'
  const frame = progress.equipped?.frame || 'none'
  const fx = progress.equipped?.effect
  const letter = (user?.username || '?')[0].toUpperCase()
  return (
    <div
      className={`avatar ${frame === 'frame-gold' ? 'gold' : ''} ${frame === 'frame-neon' ? 'neon' : ''} ${fx === 'fx-spark' ? 'spark' : ''}`}
      style={{ width: size, height: size, fontSize: size / 2.4 }}
    >
      {av === 'default' ? letter : map[av.replace('avatar-', '')] || letter}
    </div>
  )
}

export function StatCard({ label, value, icon }) {
  return (
    <Card className="stat">
      <span>
        {icon} {label}
      </span>
      <b>{value}</b>
    </Card>
  )
}
