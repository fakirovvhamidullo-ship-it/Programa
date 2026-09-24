import { pick } from '../i18n'
import { LESSON_LOCALE } from '../data/localizeLesson'
import { getLesson } from '../data/lessons'

function M(ru, en, tg) {
  return { ru, en, tg }
}

const KB = [
  {
    keys: ['компьютер', 'computer', 'компютер', 'что такое комп'],
    a: M(
      'Компьютер — машина, которая принимает данные, обрабатывает их по программе и выдаёт результат: на экран, в файл или в сеть. Он не догадывается, а выполняет написанные инструкции.',
      'A computer takes data, processes it with a program, and outputs a result to the screen, a file, or the network. It does not guess — it follows written instructions.',
      'Компютер мошинест, ки маълумотро мегирад, бо барнома коркард мекунад ва натиҷа медиҳад. Ӯ тахмин намекунад — дастури навиштаро иҷро мекунад.',
    ),
  },
  {
    keys: ['cpu', 'процессор', 'протсессор', 'мозг'],
    a: M(
      'CPU — процессор, «мозг». Он выполняет инструкции: сложить, сравнить, перейти к следующей команде. Чем сложнее программа, тем больше работы у CPU.',
      'The CPU is the processor, the “brain”. It runs instructions: add, compare, jump to the next command. Harder programs mean more CPU work.',
      'CPU протсессор, «мағз» аст. Ӯ дастурҳоро иҷро мекунад: ҷамъ, муқоиса, гузаштан ба фармони навбатӣ.',
    ),
  },
  {
    keys: ['ram', 'озу', 'оператив', 'хотираи оператив'],
    a: M(
      'RAM — временная память, «рабочий стол». Пока программа открыта, данные лежат в RAM. После выключения RAM очищается. Файлы навсегда живут на диске (SSD/HDD).',
      'RAM is temporary memory, a “desk”. Open programs live in RAM. After shutdown RAM is empty. Permanent files live on disk (SSD/HDD).',
      'RAM хотираи муваққатӣ, «мизи корӣ» аст. Барномаи кушода дар RAM аст. Пас аз хомӯшӣ холӣ мешавад. Файлҳои доимӣ дар диск мемонанд.',
    ),
  },
  {
    keys: ['gpu', 'видеокарт', 'график'],
    a: M(
      'GPU — видеокарта. Она считает картинку: игры, 3D, иногда нейросети. Экран работает и без мощной GPU, но тяжёлая графика будет тормозить.',
      'The GPU is the graphics card. It computes the image: games, 3D, sometimes neural nets. A screen works without a strong GPU, but heavy graphics will stutter.',
      'GPU видеокарта аст. Тасвирро ҳисоб мекунад: бозӣ, 3D. Бе GPU-и пурқувват экран кор мекунад, вале графикаи вазнин суст мешавад.',
    ),
  },
  {
    keys: ['ssd', 'hdd', 'диск', 'накопител', 'storage'],
    a: M(
      'Диск (SSD или HDD) хранит файлы, когда компьютер выключен. SSD обычно быстрее HDD. Это не RAM: диск не стирается при выключении.',
      'A disk (SSD or HDD) keeps files when the computer is off. SSDs are usually faster than HDDs. This is not RAM: the disk is not wiped on shutdown.',
      'Диск (SSD ё HDD) файлҳоро ҳангоми хомӯшӣ нигоҳ медорад. SSD одатан аз HDD тезтар аст. Ин RAM нест.',
    ),
  },
  {
    keys: ['ос', 'windows', 'linux', 'macos', 'операцион', 'системаи амалиёт'],
    a: M(
      'Операционная система (Windows, macOS, Linux) управляет памятью, файлами, окнами и запускает программы. Без ОС программам было бы очень сложно работать с железом.',
      'An operating system (Windows, macOS, Linux) manages memory, files, windows, and starts programs. Without an OS, programs would struggle to talk to hardware.',
      'Системаи амалиётӣ (Windows, macOS, Linux) хотира, файл ва тирезаҳоро идора мекунад ва барномаҳоро оғоз мекунад.',
    ),
  },
  {
    keys: ['алгоритм', 'algorithm', 'программирован', 'барномасоз'],
    a: M(
      'Программирование — это запись алгоритма (пошагового плана) на языке, который машина выполняет точно. Баг — когда код делает не то, что ты задумал.',
      'Programming is writing an algorithm (a step-by-step plan) in a language the machine follows exactly. A bug is when the code does not do what you intended.',
      'Барномасозӣ навиштани алгоритм (нақшаи қадам ба қадам) бо забон аст, ки мошин дақиқ иҷро мекунад. Хато вақте аст, ки код он чизеро намекунад, ки ту мехостӣ.',
    ),
  },
  {
    keys: ['переменн', 'variable', 'тағйирёбанда', 'тип данных', 'string', 'boolean'],
    a: M(
      'Переменная — имя для значения: let score = 0. Число, строка в кавычках и boolean (true/false) — разные типы. const нельзя повторно присвоить.',
      'A variable is a name for a value: let score = 0. Numbers, quoted strings, and booleans (true/false) are different types. const cannot be reassigned.',
      'Тағйирёбанда ном барои қимат аст: let score = 0. Адад, сатр дар нохунак ва boolean намудҳои гуногунанд. const-ро аз нав гузоштан мумкин нест.',
    ),
  },
  {
    keys: ['if', 'else', 'услови', 'branch', '&&', 'логик'],
    a: M(
      'if выполняется, когда условие true. else — ветка «иначе». && значит «и» (оба true), || — «или». В JS 5 === "5" это false: разные типы.',
      'if runs when the condition is true. else is the otherwise branch. && means and (both true), || means or. In JS, 5 === "5" is false because the types differ.',
      'if вақте кор мекунад, ки шарт true аст. else шохаи «вагарна» аст. && яъне «ва». Дар JS 5 === "5" false аст, чунки намудҳо гуногунанд.',
    ),
  },
  {
    keys: ['цикл', 'loop', 'for', 'while', 'функци', 'function', 'return', 'def'],
    a: M(
      'Цикл повторяет код. Функция — кусок кода с именем и входами. return отдаёт результат наружу. В Python блоки задают отступами, функцию объявляют через def.',
      'A loop repeats code. A function is a named piece of code with inputs. return sends a result back. In Python, blocks use indentation and functions use def.',
      'Цикл кодро такрор мекунад. Функсия қисми номдори код бо вурудҳост. return натиҷаро бармегардонад. Дар Python блокҳо бо фосила, функсия бо def.',
    ),
  },
  {
    keys: ['html', 'тег', 'tag', 'dom', 'body', 'head'],
    a: M(
      'HTML описывает структуру: заголовки, абзацы, кнопки. Видимое кладут в <body>. DOM — дерево этих элементов в памяти браузера. CSS отвечает за вид, JS — за поведение.',
      'HTML describes structure: headings, paragraphs, buttons. Visible content goes in <body>. The DOM is that tree in browser memory. CSS is look, JS is behavior.',
      'HTML сохторро тавсиф мекунад: сарлавҳа, банд, тугма. Мӯҳтавои намоён дар <body> аст. DOM дарахти ҳамин элементҳост. CSS намуд, JS рафтор.',
    ),
  },
  {
    keys: ['css', 'flex', 'grid', 'padding', 'margin', 'style', 'анимац'],
    a: M(
      'CSS — внешний вид. padding — внутри блока, margin — снаружи. .class — точка, #id — решётка. Flex и Grid раскладывают блоки. @media меняет вёрстку на узком экране.',
      'CSS is appearance. padding is inside the box, margin is outside. .class uses a dot, #id uses a hash. Flex and Grid lay out boxes. @media changes layout on a narrow screen.',
      'CSS намуди зоҳирӣ аст. padding дарун, margin берун. .class бо нуқта, #id бо #. Flex ва Grid блокҳоро ҷой мекунанд. @media тарҳро дар экрани тангдаст иваз мекунад.',
    ),
  },
  {
    keys: ['javascript', 'js', 'клик', 'onclick', 'queryselector', 'событи', 'event'],
    a: M(
      'JavaScript оживляет страницу. Находишь элемент (querySelector или getElementById), вешаешь событие click, меняешь textContent или читаешь input.value. Не забудь: форма может перезагрузить страницу — тогда нужен preventDefault.',
      'JavaScript brings the page to life. Find an element (querySelector or getElementById), listen for click, change textContent or read input.value. Forms may reload the page — then use preventDefault.',
      'JavaScript саҳифаро зинда мекунад. Элементро ёб, ҳодисаи click гузор, textContent-ро иваз кун ё input.value-ро хон. Форма саҳифаро аз нав бор карда метавонад — preventDefault лозим мешавад.',
    ),
  },
  {
    keys: ['игр', 'game', 'canvas', 'столкновен', 'aabb', 'кадр', 'sprite'],
    a: M(
      'Игра — цикл: ввод → обновить позиции → проверить столкновения → нарисовать кадр. На canvas y растёт вниз, (0,0) слева сверху. AABB — пересечение прямоугольников. Состояние: x, y, hp, score.',
      'A game is a loop: input → update positions → check collisions → draw. On canvas y grows downward and (0,0) is top-left. AABB is rectangle overlap. State is x, y, hp, score.',
      'Бозӣ цикл аст: вуруд → навсозии ҷой → бархӯрд → кашидан. Дар canvas y ба поён меравад, (0,0) чапи боло. AABB рӯйи ҳам омадани росткунҷаҳост.',
    ),
  },
  {
    keys: ['python', 'print', 'отступ', 'indent', 'range', 'list', 'dict', 'список', 'словар'],
    a: M(
      'Python читается почти как английский. print выводит в консоль. Блоки — отступами, комментарий с #. range(3) это 0,1,2. Список — [], словарь — {"ключ": значение}.',
      'Python reads almost like English. print writes to the console. Blocks use indentation, comments start with #. range(3) is 0,1,2. A list is [], a dict is {"key": value}.',
      'Python қариб мисли англисӣ хонда мешавад. print ба консол менависад. Блокҳо бо фосила, шарҳ бо #. range(3) = 0,1,2. Рӯйхат [], луғат {"калид": қимат}.',
    ),
  },
  {
    keys: ['backend', 'сервер', 'api', 'json', 'http', 'get', 'post', 'express', 'node'],
    a: M(
      'Backend — программа на сервере. Браузер шлёт Request, сервер отвечает Response, часто JSON. GET читает, POST создаёт, PUT обновляет, DELETE удаляет. 404 — не найдено, 200 — ок.',
      'Backend is the server program. The browser sends a Request, the server replies with a Response, often JSON. GET reads, POST creates, PUT updates, DELETE removes. 404 is not found, 200 is ok.',
      'Backend барнома дар сервер аст. Браузер Request мефиристад, сервер Response, аксар JSON. GET мехонад, POST месозад. 404 ёфт нашуд, 200 хуб.',
    ),
  },
  {
    keys: ['sql', 'баз', 'таблиц', 'crud', 'select', 'пойгоҳ', 'database'],
    a: M(
      'База — таблицы: строки (записи) и столбцы (поля). SELECT читает, INSERT создаёт, UPDATE меняет, DELETE удаляет. PRIMARY KEY — уникальный id. Пароли хранят хешем, не открытым текстом. DELETE без WHERE может стереть всё.',
      'A database is tables: rows (records) and columns (fields). SELECT reads, INSERT creates, UPDATE changes, DELETE removes. PRIMARY KEY is a unique id. Store passwords as hashes, not plain text. DELETE without WHERE can wipe everything.',
      'Пойгоҳ ҷадвалҳост: сатрҳо ва сутунҳо. SELECT мехонад, INSERT месозад, UPDATE иваз, DELETE нест. PRIMARY KEY id-и беназир аст. Рамзро ҳамчун ҳеш нигоҳ дор. DELETE бе WHERE ҳамаро пок карда метавонад.',
    ),
  },
  {
    keys: ['завтра', 'tomorrow', 'пагоҳ', 'не прошел', 'не прошёл', 'ошибк', 'попыт', 'fail'],
    a: M(
      'Правило DevHub: 3 ошибки на практике или тесте — урок не засчитан. Завтра можно пройти заново. Следующий урок тоже открывается на следующий день после успеха.',
      'DevHub rule: 3 mistakes in practice or the quiz means the lesson is not passed. You can retry tomorrow. The next lesson also opens the day after a success.',
      'Қоидаи DevHub: 3 хато дар машқ ё тест — дарс ҳисоб намешавад. Пагоҳ аз нав. Дарси навбатӣ низ пас аз муваффақият рӯзи дигар кушода мешавад.',
    ),
  },
  {
    keys: ['xp', 'devcoin', 'монет', 'уровен', 'level'],
    a: M(
      'XP растёт за части урока и за весь день. DevCoins — внутренняя валюта магазина, для прохождения курса не обязательна. Серия (streak) растёт, если учишься день за днём.',
      'XP grows for lesson parts and for finishing the day. DevCoins are a shop currency and are not required to finish the course. Streak grows if you learn day after day.',
      'XP барои қисмҳои дарс ва тамом кардани рӯз зиёд мешавад. DevCoins пули мағоза аст, барои тамом кардани курс ҳатмӣ нест. Силсила рӯз ба рӯз меафзояд.',
    ),
  },
]

function norm(s) {
  return String(s || '')
    .toLowerCase()
    .replace(/ё/g, 'е')
}

export function askTeacher(raw, lang = 'ru', lessonId) {
  const q = norm(raw)
  if (!q.trim()) {
    return pick(
      M('Напиши вопрос — например: что такое RAM?', 'Write a question — for example: what is RAM?', 'Савол нависед — масалан: RAM чист?'),
      lang,
    )
  }

  const current = /текущ|current|ҳозир|этот урок|this lesson|ин дарс|урок\s*\d+|lesson\s*\d+|дарс\s*\d+/.test(q)
  const idFromText = Number((q.match(/(?:урок|lesson|дарс)\s*(\d+)/) || [])[1])
  const id = idFromText || (current ? lessonId : lessonId && current ? lessonId : null) || (current ? lessonId : null)

  if (current || idFromText) {
    const loc = LESSON_LOCALE[id] || LESSON_LOCALE[lessonId]
    const lesson = getLesson(id || lessonId)
    if (loc && lesson) {
      const title = pick(loc.title, lang)
      const desc = pick(loc.description, lang)
      const extra = pick(
        M(
          `Сейчас урок ${lesson.id}: «${title}». ${desc} Сначала прочитай теорию, затем собери практику строго по порядку, в тесте выбирай смысл, а не «похожий» вариант. Если не прошёл — завтра заново.`,
          `Current lesson ${lesson.id}: “${title}”. ${desc} Read the theory first, then do practice in strict order. In the quiz pick the real meaning, not a look-alike option. If you fail, retry tomorrow.`,
          `Ҳозир дарс ${lesson.id}: «${title}». ${desc} Аввал назария, баъд машқ ба тартиб. Дар тест маънои дурустро интихоб кун, на варианти «монанд». Агар нагузаштӣ — пагоҳ аз нав.`,
        ),
        lang,
      )
      return extra
    }
  }

  let best = null
  let bestScore = 0
  for (const item of KB) {
    let score = 0
    for (const k of item.keys) {
      if (q.includes(k)) score += k.length
    }
    if (score > bestScore) {
      bestScore = score
      best = item
    }
  }
  if (best && bestScore >= 2) return pick(best.a, lang)

  if (lessonId) {
    const loc = LESSON_LOCALE[lessonId]
    const lesson = getLesson(lessonId)
    if (loc && lesson) {
      return pick(
        M(
          `Я не нашёл точный термин, но ты сейчас на уроке ${lesson.id} «${pick(loc.title, lang)}». ${pick(loc.description, lang)} Спроси конкретнее: CPU, RAM, HTML, if, цикл, Python, API, SQL.`,
          `I could not match a term exactly. You are on lesson ${lesson.id} “${pick(loc.title, lang)}”. ${pick(loc.description, lang)} Ask more specifically: CPU, RAM, HTML, if, loop, Python, API, SQL.`,
          `Истилоҳи дақиқро наёфтам. Ту дар дарси ${lesson.id} «${pick(loc.title, lang)}» ҳастӣ. ${pick(loc.description, lang)} Мушаххастар пурс: CPU, RAM, HTML, if, цикл, Python, API, SQL.`,
        ),
        lang,
      )
    }
  }

  return pick(
    M(
      'Спроси про тему курса: компьютер, RAM, CPU, HTML, CSS, JavaScript, циклы, Python, backend, SQL. Можно написать «объясни текущий урок».',
      'Ask about a course topic: computer, RAM, CPU, HTML, CSS, JavaScript, loops, Python, backend, SQL. You can also write “explain the current lesson”.',
      'Дар бораи мавзуи курс пурс: компютер, RAM, CPU, HTML, CSS, JavaScript, цикл, Python, backend, SQL. Метавонӣ нависӣ «дарси ҳозираро фаҳмон».',
    ),
    lang,
  )
}
