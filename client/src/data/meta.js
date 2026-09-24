export const ACHIEVEMENTS = [
  { id: 'first-lesson', title: 'Первый урок', desc: 'Заверши первый основной урок', icon: '🎯', xp: 20, coins: 15, check: (p) => p.completedLessons.length >= 1 },
  { id: 'first-code', title: 'Первый код', desc: 'Запусти код в редакторе', icon: '💻', xp: 15, coins: 10, check: (p) => p.flags.firstCode },
  { id: 'first-site', title: 'Первый сайт', desc: 'Заверши HTML-урок 11', icon: '🌐', xp: 25, coins: 20, check: (p) => p.completedLessons.includes(11) },
  { id: 'first-game', title: 'Первая игра', desc: 'Заверши игровой урок 20', icon: '🎮', xp: 30, coins: 25, check: (p) => p.completedLessons.includes(20) },
  { id: 'first-python', title: 'Первый Python-проект', desc: 'Заверши Python-проект (урок 25)', icon: '🐍', xp: 30, coins: 25, check: (p) => p.completedLessons.includes(25) },
  { id: 'first-db', title: 'Первая база данных', desc: 'Заверши урок про SQLite', icon: '🗄', xp: 30, coins: 25, check: (p) => p.completedLessons.includes(28) },
  { id: 'first-backend', title: 'Первый Backend', desc: 'Заверши урок Node.js и Express', icon: '🚀', xp: 30, coins: 25, check: (p) => p.completedLessons.includes(27) },
  { id: 'streak-3', title: 'Искра', desc: 'Серия 3 дня подряд', icon: '✨', xp: 15, coins: 10, check: (p) => p.streak >= 3 },
  { id: 'streak-7', title: 'Неделя огня', desc: 'Серия 7 дней подряд', icon: '🔥', xp: 40, coins: 40, check: (p) => p.streak >= 7 },
  { id: 'xp-1000', title: '1000 XP', desc: 'Набери 1000 опыта', icon: '⭐', xp: 0, coins: 30, check: (p) => p.xp >= 1000 },
  { id: 'all-30', title: 'Все 30 уроков', desc: 'Заверши весь курс DevHub', icon: '🏆', xp: 200, coins: 150, check: (p) => p.completedLessons.length >= 30 },
  { id: 'quiz-master', title: 'Мастер тестов', desc: 'Пройди 10 тестов без ошибок с первого раза', icon: '🧠', xp: 40, coins: 20, check: (p) => (p.flags.perfectQuizzes || 0) >= 10 },
  { id: 'projects-3', title: 'Сборщик проектов', desc: 'Заверши 3 практических проекта', icon: '🛠', xp: 25, coins: 20, check: (p) => p.completedProjects.length >= 3 },
  { id: 'shopper', title: 'Стиль', desc: 'Купи первый предмет в магазине', icon: '🎨', xp: 10, coins: 0, check: (p) => p.ownedItems.length > 0 },
  { id: 'computer-block', title: 'Железо понято', desc: 'Заверши блок Computer', icon: '🖥', xp: 40, coins: 25, check: (p) => [1, 2, 3, 4, 5].every((id) => p.completedLessons.includes(id)) },
]

export const SHOP_ITEMS = [
  { id: 'theme-aurora', type: 'theme', name: 'Aurora', price: 40, desc: 'Бирюзово-фиолетовая тема' },
  { id: 'theme-ember', type: 'theme', name: 'Ember', price: 40, desc: 'Тёплые оранжевые акценты' },
  { id: 'theme-matrix', type: 'theme', name: 'Matrix', price: 50, desc: 'Зелёный терминальный неон' },
  { id: 'avatar-fox', type: 'avatar', name: 'Fox', price: 25, desc: 'Аватар-лис' },
  { id: 'avatar-bot', type: 'avatar', name: 'Bot', price: 25, desc: 'Аватар-робот' },
  { id: 'avatar-star', type: 'avatar', name: 'Nova', price: 25, desc: 'Звёздный аватар' },
  { id: 'frame-gold', type: 'frame', name: 'Gold Frame', price: 35, desc: 'Золотая рамка профиля' },
  { id: 'frame-neon', type: 'frame', name: 'Neon Frame', price: 35, desc: 'Неоновая рамка' },
  { id: 'fx-spark', type: 'effect', name: 'Sparkles', price: 45, desc: 'Искры вокруг аватара' },
  { id: 'editor-dracula', type: 'editor', name: 'Dracula Editor', price: 30, desc: 'Тема редактора кода' },
  { id: 'editor-solar', type: 'editor', name: 'Solar Editor', price: 30, desc: 'Светлая солнечная тема редактора' },
]

export const DAILY_QUESTS = [
  { id: 'part', title: 'Пройди часть урока', coins: 8, flag: 'dailyPart' },
  { id: 'code', title: 'Запусти код', coins: 8, flag: 'dailyCode' },
  { id: 'ref', title: 'Открой справочник', coins: 6, flag: 'dailyRef' },
]
