import { QUIZZES } from './quizzes'
import { pick } from '../i18n'

function M(ru, en, tg) {
  return { ru, en, tg }
}

export const LESSON_LOCALE = {
  1: { title: M('Что такое компьютер?', 'What is a computer?', 'Компютер чист?'), description: M('Компьютер принимает данные, обрабатывает их и выдаёт результат.', 'A computer takes data, processes it, and gives a result.', 'Компютер маълумотро мегирад, коркард мекунад ва натиҷа медиҳад.') },
  2: { title: M('Из чего состоит компьютер?', 'What is a computer made of?', 'Компютер аз чӣ иборат аст?'), description: M('Системный блок, периферия и главные платы внутри.', 'The case, peripherals, and the main boards inside.', 'Блоки система, дастгоҳҳои беруна ва платаҳои асосӣ.') },
  3: { title: M('CPU, RAM, GPU и накопитель', 'CPU, RAM, GPU and storage', 'CPU, RAM, GPU ва диск'), description: M('Четыре героя производительности.', 'Four pillars of performance.', 'Чор қисми суръат.') },
  4: { title: M('Как компьютер выполняет команды?', 'How does a computer run commands?', 'Компютер фармонҳоро чӣ гуна иҷро мекунад?'), description: M('От бита до программы: двоичный мир и тактовый ритм.', 'From bits to programs: binary and clock cycles.', 'Аз бит то барнома: ҷаҳони дуӣ.') },
  5: { title: M('ОС, файлы и программы', 'OS, files and programs', 'СО, файлҳо ва барномаҳо'), description: M('ОС — дирижёр железа и программ.', 'The OS conducts hardware and programs.', 'СО оҳан ва барномаҳоро идора мекунад.') },
  6: { title: M('Что такое программирование?', 'What is programming?', 'Барномасозӣ чист?'), description: M('Мы объясняем компьютеру алгоритм понятным языком.', 'We explain an algorithm to the computer in a precise language.', 'Мо алгоритмро ба компютер бо забони дақиқ мефаҳмонем.') },
  7: { title: M('Переменные и типы данных', 'Variables and data types', 'Тағйирёбандаҳо ва намудҳои маълумот'), description: M('Коробки с именами: числа, строки, логика.', 'Named boxes: numbers, strings, booleans.', 'Қуттиҳои номдор: адад, сатр, мантиқ.') },
  8: { title: M('if / else и логика', 'if / else and logic', 'if / else ва мантиқ'), description: M('Программа выбирает ветку.', 'The program chooses a branch.', 'Барнома як шохаро интихоб мекунад.') },
  9: { title: M('Циклы и функции', 'Loops and functions', 'Циклҳо ва функсияҳо'), description: M('Повторение и переиспользование кода.', 'Repeat work and reuse code.', 'Такрор ва аз нав истифодаи код.') },
  10: { title: M('Как работает сайт и браузер', 'How websites and browsers work', 'Сомона ва браузер чӣ гуна кор мекунанд'), description: M('Адрес, запрос, HTML, отрисовка.', 'Address, request, HTML, rendering.', 'Суроға, дархост, HTML, кашидан.') },
  11: { title: M('HTML — первая страница', 'HTML — first page', 'HTML — саҳифаи аввал'), description: M('Теги, скелет документа, заголовок и текст.', 'Tags, document skeleton, heading and text.', 'Тегҳо, скелети ҳуҷҷат, сарлавҳа ва матн.') },
  12: { title: M('HTML — структура сайта', 'HTML — site structure', 'HTML — сохтори сомона'), description: M('nav, section, списки, ссылки, формы.', 'nav, section, lists, links, forms.', 'nav, section, рӯйхат, пайванд, форма.') },
  13: { title: M('CSS — цвета, шрифты и блоки', 'CSS — colors, fonts and boxes', 'CSS — ранг, ҳарф ва блокҳо'), description: M('Внешность отделяем от структуры.', 'Looks are separate from structure.', 'Намуд аз сохтор ҷудо аст.') },
  14: { title: M('CSS — Flexbox, Grid и адаптив', 'CSS — Flexbox, Grid and responsive', 'CSS — Flexbox, Grid ва адаптив'), description: M('Ряды, сетки и разные ширины экрана.', 'Rows, grids and different screen widths.', 'Қатор, тӯр ва паҳнои гуногуни экран.') },
  15: { title: M('CSS — интерфейс и анимации', 'CSS — UI and animation', 'CSS — интерфейс ва аниматсия'), description: M('Стекло, свечение, движение.', 'Glass, glow, motion.', 'Шиша, нур, ҳаракат.') },
  16: { title: M('JavaScript — логика страницы', 'JavaScript — page logic', 'JavaScript — мантиқи саҳифа'), description: M('Переменные в браузере и реакция на клик.', 'Variables in the browser and click reactions.', 'Тағйирёбандаҳо дар браузер ва реаксия ба клик.') },
  17: { title: M('JavaScript — DOM и формы', 'JavaScript — DOM and forms', 'JavaScript — DOM ва формаҳо'), description: M('Находим элементы и читаем поля.', 'Find elements and read fields.', 'Элементҳоро ёбед ва майдонҳоро хонед.') },
  18: { title: M('Как устроены игры?', 'How are games built?', 'Бозиҳо чӣ гуна сохта мешаванд?'), description: M('Игровой цикл, состояние, ввод.', 'Game loop, state, input.', 'Сикли бозӣ, ҳолат, вуруд.') },
  19: { title: M('Canvas и игровая графика', 'Canvas and game graphics', 'Canvas ва графикаи бозӣ'), description: M('Рисуем прямоугольники и круг игрока.', 'Draw rectangles and a player circle.', 'Росткунҷа ва доираи бозигарро кашед.') },
  20: { title: M('Своя 2D-игра', 'Your own 2D game', 'Бозии 2D-и худ'), description: M('Движение, клавиши, столкновения, очки.', 'Movement, keys, collisions, score.', 'Ҳаракат, клавиш, бархӯрд, ҳисоб.') },
  21: { title: M('Большой игровой проект', 'Big game project', 'Лоиҳаи калони бозӣ'), description: M('Start, враги, HP, уровни, Game Over.', 'Start, enemies, HP, levels, Game Over.', 'Start, душманҳо, HP, сатҳҳо, Game Over.') },
  22: { title: M('Python с нуля', 'Python from zero', 'Python аз сифр'), description: M('print, переменные, отступы.', 'print, variables, indentation.', 'print, тағйирёбандаҳо, фосилаҳо.') },
  23: { title: M('Условия, циклы и функции в Python', 'Conditions, loops and functions in Python', 'Шарт, цикл ва функсия дар Python'), description: M('if, for, while, def.', 'if, for, while, def.', 'if, for, while, def.') },
  24: { title: M('Списки, словари и модули', 'Lists, dictionaries and modules', 'Рӯйхат, луғат ва модулҳо'), description: M('Коллекции данных в Python.', 'Data collections in Python.', 'Маҷмӯаҳои маълумот дар Python.') },
  25: { title: M('Большой Python-проект', 'Big Python project', 'Лоиҳаи калони Python'), description: M('Консольное мини-приложение заметок.', 'A console mini notes app.', 'Барномаи хурди ёддоштҳо.') },
  26: { title: M('Что такое Backend?', 'What is a backend?', 'Backend чист?'), description: M('Сервер, запрос, ответ, JSON.', 'Server, request, response, JSON.', 'Сервер, дархост, ҷавоб, JSON.') },
  27: { title: M('Свой Backend', 'Your own backend', 'Backend-и худ'), description: M('Node.js, Express, GET POST PUT DELETE.', 'Node.js, Express, GET POST PUT DELETE.', 'Node.js, Express, GET POST PUT DELETE.') },
  28: { title: M('Что такое база данных?', 'What is a database?', 'Пойгоҳи додаҳо чист?'), description: M('Таблица, строка, столбец, ID, SQL.', 'Table, row, column, ID, SQL.', 'Ҷадвал, сатр, сутун, ID, SQL.') },
  29: { title: M('Backend + база данных', 'Backend + database', 'Backend + пойгоҳи додаҳо'), description: M('CRUD: создать, прочитать, изменить, удалить.', 'CRUD: create, read, update, delete.', 'CRUD: сохтан, хондан, иваз, нест.') },
  30: { title: M('Финальный проект', 'Final project', 'Лоиҳаи ниҳоӣ'), description: M('Собери полный цикл: аккаунт, API, база, интерфейс.', 'Build the full cycle: account, API, database, UI.', 'Сикли пурра: ҳисоб, API, пойгоҳ, интерфейс.') },
}

const PART_TITLES = {
  theory: M('Теория', 'Theory', 'Назария'),
  interactive: M('Интерактив', 'Interactive', 'Интерактив'),
  practice: M('Практика', 'Practice', 'Машқ'),
  quiz: M('Тест', 'Quiz', 'Тест'),
}

export function localizeLesson(lesson, lang = 'ru') {
  if (!lesson) return lesson
  const loc = LESSON_LOCALE[lesson.id]
  const questions = (QUIZZES[lesson.id] || []).map((q) => ({
    q: pick(q.q, lang),
    options: q.options.map((o) => pick(o, lang)),
    correct: q.correct,
    explain: pick(q.explain, lang),
  }))
  return {
    ...lesson,
    title: loc ? pick(loc.title, lang) : lesson.title,
    description: loc ? pick(loc.description, lang) : lesson.description,
    parts: lesson.parts.map((part) => {
      const title = pick(PART_TITLES[part.type] || part.title, lang) || part.title
      if (part.type === 'quiz') {
        return { ...part, title, questions: questions.length ? questions : part.questions }
      }
      if (part.type === 'theory') {
        const intro = loc ? pick(loc.description, lang) : ''
        return {
          ...part,
          title,
          heading: part.heading,
          sections: [intro ? { callout: intro } : null, ...(part.sections || [])].filter(Boolean),
        }
      }
      return { ...part, title }
    }),
  }
}

export function localizeLessons(lessons, lang) {
  return lessons.map((l) => localizeLesson(l, lang))
}
