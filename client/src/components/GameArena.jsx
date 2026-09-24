import { useEffect, useRef, useState } from 'react'
import { Button } from './ui'

function beep(ctx, f) {
  if (!ctx) return
  const o = ctx.createOscillator()
  const g = ctx.createGain()
  o.frequency.value = f
  g.gain.value = 0.05
  o.connect(g)
  g.connect(ctx.destination)
  o.start()
  o.stop(ctx.currentTime + 0.08)
}

export function GameArena({ mode = 'full', onWin }) {
  const ref = useRef(null)
  const [ui, setUi] = useState({ state: 'start', score: 0, hp: 3, level: 1 })
  const data = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    const keys = {}
    let audio
    const reset = () => {
      data.current = {
        state: 'play',
        score: 0,
        hp: 3,
        level: 1,
        inv: 0,
        player: { x: 40, y: 160, w: 22, h: 22, vx: 0, vy: 0 },
        coins: [{ x: 300, y: 80, r: 8 }],
        enemies: [{ x: 420, y: 40, w: 18, h: 18, vy: 1.4 }],
      }
      setUi({ state: 'play', score: 0, hp: 3, level: 1 })
    }
    const down = (e) => {
      keys[e.key] = true
      if (data.current?.state === 'start' && e.key === 'Enter') reset()
      if (data.current?.state === 'over' && e.key === 'Enter') reset()
    }
    const up = (e) => {
      keys[e.key] = false
    }
    window.addEventListener('keydown', down)
    window.addEventListener('keyup', up)
    data.current = { state: 'start' }

    let raf
    const loop = () => {
      const W = canvas.width
      const H = canvas.height
      ctx.fillStyle = '#050a14'
      ctx.fillRect(0, 0, W, H)
      ctx.strokeStyle = 'rgba(110,231,255,.15)'
      for (let x = 0; x < W; x += 32) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, H)
        ctx.stroke()
      }
      const d = data.current
      if (!d || d.state === 'start') {
        ctx.fillStyle = '#6ee7ff'
        ctx.font = '28px Outfit, sans-serif'
        ctx.fillText('DEVHUB ARENA', 180, 120)
        ctx.fillStyle = '#93a0c0'
        ctx.font = '16px Outfit, sans-serif'
        ctx.fillText('Enter или кнопка Start · стрелки / WASD', 140, 160)
      } else if (d.state === 'over') {
        ctx.fillStyle = '#fb7185'
        ctx.font = '28px Outfit, sans-serif'
        ctx.fillText('GAME OVER', 220, 130)
        ctx.fillStyle = '#fff'
        ctx.font = '16px Outfit, sans-serif'
        ctx.fillText('Счёт ' + d.score + '  ·  Enter = Restart', 190, 170)
      } else {
        const p = d.player
        p.vx = (keys.ArrowRight || keys.d ? 1 : 0) - (keys.ArrowLeft || keys.a ? 1 : 0)
        p.vy = (keys.ArrowDown || keys.s ? 1 : 0) - (keys.ArrowUp || keys.w ? 1 : 0)
        const sp = 2.6 + d.level * 0.3
        p.x = Math.max(0, Math.min(W - p.w, p.x + p.vx * sp))
        p.y = Math.max(0, Math.min(H - p.h, p.y + p.vy * sp))
        d.inv = Math.max(0, d.inv - 1)
        d.enemies.forEach((en) => {
          en.y += en.vy * (1 + d.level * 0.15)
          if (en.y > H) {
            en.y = -20
            en.x = Math.random() * (W - 20)
          }
          if (aabb(p, en) && d.inv === 0) {
            d.hp -= 1
            d.inv = 60
            beep(audio, 200)
            if (d.hp <= 0) d.state = 'over'
          }
        })
        d.coins.forEach((c) => {
          if (Math.hypot(p.x + 11 - c.x, p.y + 11 - c.y) < 22) {
            d.score += 10
            c.x = 40 + Math.random() * (W - 80)
            c.y = 40 + Math.random() * (H - 80)
            beep(audio, 880)
            if (d.score > 0 && d.score % 50 === 0) {
              d.level += 1
              d.enemies.push({ x: Math.random() * W, y: -10, w: 16, h: 16, vy: 1.2 + Math.random() })
            }
            if (mode === 'trainer' && d.score >= 30) onWin?.()
            if (mode === 'full' && d.score >= 80) onWin?.()
          }
          ctx.fillStyle = '#facc15'
          ctx.beginPath()
          ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2)
          ctx.fill()
        })
        ctx.fillStyle = d.inv ? '#ffffff' : '#6ee7ff'
        ctx.fillRect(p.x, p.y, p.w, p.h)
        ctx.fillStyle = '#f472b6'
        d.enemies.forEach((en) => ctx.fillRect(en.x, en.y, en.w, en.h))
        ctx.fillStyle = '#e8eefc'
        ctx.font = '14px Outfit, sans-serif'
        ctx.fillText(`SCORE ${d.score}   HP ${d.hp}   LVL ${d.level}`, 16, 22)
        setUi({ state: d.state, score: d.score, hp: d.hp, level: d.level })
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('keydown', down)
      window.removeEventListener('keyup', up)
    }
  }, [mode])

  return (
    <div>
      <canvas ref={ref} className="game" width={640} height={320} />
      <div className="row mt">
        <Button
          onClick={() => {
            try {
              audio = new (window.AudioContext || window.webkitAudioContext)()
            } catch {
              /* */
            }
            const c = ref.current
            c?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }))
            data.current = {
              state: 'play',
              score: 0,
              hp: 3,
              level: 1,
              inv: 0,
              player: { x: 40, y: 160, w: 22, h: 22, vx: 0, vy: 0 },
              coins: [{ x: 300, y: 80, r: 8 }],
              enemies: [{ x: 420, y: 40, w: 18, h: 18, vy: 1.4 }],
            }
          }}
        >
          Start / Restart
        </Button>
        <span className="muted">
          Счёт {ui.score} · HP {ui.hp} · ур. {ui.level}
        </span>
      </div>
    </div>
  )
}

function aabb(a, b) {
  return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y
}
