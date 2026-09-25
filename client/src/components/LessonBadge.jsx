import {
  Binary,
  Blocks,
  Box,
  Braces,
  Check,
  CircuitBoard,
  Code2,
  Cpu,
  Database,
  FileCode,
  Flag,
  FolderOpen,
  Gamepad2,
  Globe,
  Layout,
  LayoutGrid,
  Library,
  ListChecks,
  Lock,
  Monitor,
  MousePointerClick,
  Palette,
  Pencil,
  Repeat,
  Server,
  Sparkles,
  Split,
  StickyNote,
  Table,
  Target,
  Terminal,
  Trophy,
} from 'lucide-react'
import { pick } from '../i18n'

const M = (ru, en, tg) => ({ ru, en, tg })

const BADGES = {
  1: [Monitor, M('Компьютер', 'Computer', 'Компютер')],
  2: [Cpu, M('Устройство', 'Parts', 'Қисмҳо')],
  3: [CircuitBoard, M('CPU и RAM', 'CPU & RAM', 'CPU ва RAM')],
  4: [Binary, M('Команды', 'Commands', 'Фармонҳо')],
  5: [FolderOpen, M('Система', 'System', 'Система')],
  6: [Code2, M('Код', 'Code', 'Код')],
  7: [Box, M('Переменные', 'Variables', 'Тағйирёбанда')],
  8: [Split, M('Условия', 'Conditions', 'Шарт')],
  9: [Repeat, M('Циклы', 'Loops', 'Цикл')],
  10: [Globe, M('Браузер', 'Browser', 'Браузер')],
  11: [FileCode, M('HTML', 'HTML', 'HTML')],
  12: [Layout, M('Структура', 'Structure', 'Сохтор')],
  13: [Palette, M('CSS', 'CSS', 'CSS')],
  14: [LayoutGrid, M('Сетка', 'Grid', 'Тӯр')],
  15: [Sparkles, M('Анимации', 'Motion', 'Аниматсия')],
  16: [Braces, M('JavaScript', 'JavaScript', 'JavaScript')],
  17: [MousePointerClick, M('Кнопки', 'Clicks', 'Тугмаҳо')],
  18: [Gamepad2, M('Игры', 'Games', 'Бозӣ')],
  19: [Pencil, M('Canvas', 'Canvas', 'Canvas')],
  20: [Target, M('2D-игра', '2D game', 'Бозии 2D')],
  21: [Flag, M('Проект', 'Project', 'Лоиҳа')],
  22: [Terminal, M('Python', 'Python', 'Python')],
  23: [ListChecks, M('Логика', 'Logic', 'Мантиқ')],
  24: [Library, M('Данные', 'Data', 'Маълумот')],
  25: [StickyNote, M('Заметки', 'Notes', 'Ёддошт')],
  26: [Server, M('Backend', 'Backend', 'Backend')],
  27: [Blocks, M('Сервер', 'Server', 'Сервер')],
  28: [Database, M('База', 'Database', 'Пойгоҳ')],
  29: [Table, M('CRUD', 'CRUD', 'CRUD')],
  30: [Trophy, M('Финал', 'Final', 'Ниҳоӣ')],
}

export function LessonBadge({ id, lang, done, locked }) {
  const [Icon, names] = BADGES[id] || BADGES[1]
  return (
    <>
      <span className="node-mark">
        <Icon size={22} strokeWidth={2.1} />
      </span>
      <span className="node-name">{pick(names, lang)}</span>
      {done ? (
        <span className="node-state done-mark">
          <Check size={12} strokeWidth={3} />
        </span>
      ) : locked ? (
        <span className="node-state">
          <Lock size={11} strokeWidth={2.4} />
        </span>
      ) : null}
    </>
  )
}
