export const LEVELS = [
  { level: 1, name: 'Новичок', minXp: 0, title: 'Junior Explorer' },
  { level: 2, name: 'Ученик', minXp: 200, title: 'Apprentice' },
  { level: 3, name: 'Junior', minXp: 500, title: 'Junior Coder' },
  { level: 4, name: 'Developer', minXp: 1000, title: 'Builder' },
  { level: 5, name: 'Advanced', minXp: 1800, title: 'Craftsman' },
  { level: 6, name: 'Specialist', minXp: 2800, title: 'Systems Mind' },
  { level: 7, name: 'Engineer', minXp: 4000, title: 'Engineer' },
  { level: 8, name: 'Architect', minXp: 5500, title: 'Architect' },
  { level: 9, name: 'Lead', minXp: 7500, title: 'Tech Lead' },
  { level: 10, name: 'Master', minXp: 10000, title: 'DevHub Master' },
]

export function getLevel(xp) {
  let current = LEVELS[0]
  for (const lvl of LEVELS) {
    if (xp >= lvl.minXp) current = lvl
  }
  const next = LEVELS.find((l) => l.level === current.level + 1)
  const span = (next?.minXp ?? current.minXp + 1000) - current.minXp
  const into = xp - current.minXp
  return {
    ...current,
    nextXp: next?.minXp ?? null,
    progress: Math.min(100, Math.round((into / span) * 100)),
  }
}

export const BLOCKS = [
  { id: 'computer', index: '01', title: 'Computer', ru: 'Компьютер', emoji: '🖥', color: '#6ee7ff', lessons: [1, 2, 3, 4, 5] },
  { id: 'programming', index: '02', title: 'Programming', ru: 'Программирование', emoji: '🧠', color: '#a78bfa', lessons: [6, 7, 8, 9] },
  { id: 'web', index: '03', title: 'Web', ru: 'Web', emoji: '🌐', color: '#34d399', lessons: [10, 11, 12, 13, 14, 15, 16, 17] },
  { id: 'games', index: '04', title: 'Games', ru: 'Игры', emoji: '🎮', color: '#f472b6', lessons: [18, 19, 20, 21] },
  { id: 'python', index: '05', title: 'Python', ru: 'Python', emoji: '🐍', color: '#facc15', lessons: [22, 23, 24, 25] },
  { id: 'backend', index: '06', title: 'Backend + Database', ru: 'Backend + БД', emoji: '🗄', color: '#fb923c', lessons: [26, 27, 28, 29] },
  { id: 'final', index: '07', title: 'Final Project', ru: 'Финальный проект', emoji: '🏆', color: '#fbbf24', lessons: [30] },
]
