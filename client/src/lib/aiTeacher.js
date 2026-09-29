import { pick } from '../i18n/index.js'
import { LESSON_LOCALE } from '../data/localizeLesson'
import { getLesson } from '../data/lessons'

function M(ru, en, tg) {
  return { ru, en, tg }
}

function T(keys, ru, en, tg) {
  return { keys, a: M(ru, en, tg) }
}

const KB = [
  T(
    ['программирован', 'программист', 'кодинг', 'coding', 'programming', 'барномасоз', 'алгоритм', 'algorithm'],
    'Программирование — это способ сказать компьютеру, что делать, обычными точными шагами.\n\nКак это устроено:\n1. Данные. То, с чем работаешь: число, текст, список.\n2. Действия. Проверить условие (if), повторить (цикл), спрятать шаги в функцию.\n3. Результат. То, что появится на экране, в файле или уйдёт на сервер.\n\nЯзыки — разные способы записать одно и то же:\n• JavaScript — сайты и кнопки в браузере\n• Python — учеба, скрипты, сервер\n• HTML — каркас страницы\n• CSS — внешний вид\n• SQL — вопросы к базе данных\n• Git — история изменений кода\n\nПример целиком. Нужно сказать, взрослый ли человек:\n\nfunction canEnter(age) {\n  if (age >= 18) return "можно"\n  return "ещё рано"\n}\nconsole.log(canEnter(16))\n\nНа Python то же самое:\n\ndef can_enter(age):\n    if age >= 18:\n        return "можно"\n    return "ещё рано"\nprint(can_enter(16))\n\nОшибка (баг) — код запустился, но сделал не то, что ты хотел. Её ищут по тексту ошибки и по строке.\n\nЕсли хочешь, дальше разберём одну тему до конца: переменная, if, цикл, функция, сайт или база.',
    'Programming is how you tell a computer what to do, in exact steps.\n\nHow it works:\n1. Data. What you work with: a number, text, a list.\n2. Actions. Check a condition (if), repeat (a loop), hide steps in a function.\n3. Result. What shows on screen, goes into a file, or is sent to a server.\n\nLanguages are different ways to write the same idea:\n• JavaScript — websites and buttons\n• Python — learning, scripts, servers\n• HTML — page structure\n• CSS — look\n• SQL — questions to a database\n• Git — history of the code\n\nFull example. Decide if a person is old enough:\n\nfunction canEnter(age) {\n  if (age >= 18) return "yes"\n  return "not yet"\n}\nconsole.log(canEnter(16))\n\nSame idea in Python:\n\ndef can_enter(age):\n    if age >= 18:\n        return "yes"\n    return "not yet"\nprint(can_enter(16))\n\nA bug means the code ran but did not do what you wanted. You find it from the error text and the line number.\n\nIf you want, we can go deep on one topic next: a variable, if, a loop, a function, a website, or a database.',
    'Барномасозӣ роҳи гуфтан ба компютер аст, ки чӣ кор кунад.\n\n1. Маълумот\n2. Амал: if, цикл, функсия\n3. Натиҷа\n\nJavaScript — сомона, Python — скрипт, HTML — сохтор, CSS — намуд, SQL — пойгоҳ, Git — таърихи код.\n\nfunction canEnter(age) {\n  if (age >= 18) return "можно"\n  return "ещё рано"\n}\n\nАгар хоҳӣ, як мавзӯъро пурра мефаҳмонам.',
  ),
  T(
    ['компьютер', 'computer', 'компютер'],
    'Компьютер принимает данные, обрабатывает их по программе и выдаёт результат: на экран, в файл или в сеть. Он не догадывается — выполняет инструкции по порядку.',
    'A computer takes data, processes it with a program, and returns a result. It does not guess — it follows instructions in order.',
    'Компютер маълумотро мегирад, бо барнома коркард мекунад ва натиҷа медиҳад.',
  ),
  T(
    ['cpu', 'процессор', 'протсессор'],
    'CPU — процессор. Он выполняет команды: сложить, сравнить, перейти дальше. Чем тяжелее программа, тем больше работы у CPU. Данные открытых программ лежат в RAM.',
    'The CPU is the processor. It runs commands: add, compare, jump ahead. Open program data lives in RAM.',
    'CPU протсессор аст. Ӯ фармонҳоро иҷро мекунад. Маълумоти барномаи кушода дар RAM аст.',
  ),
  T(
    ['ram', 'озу', 'оператив', 'хотираи оператив'],
    'RAM — временная память. Пока программа открыта, данные лежат в RAM и читаются быстро. Выключил компьютер — RAM пустая. Файлы навсегда хранит диск (SSD/HDD).',
    'RAM is temporary memory. Open programs live in RAM. After shutdown RAM is empty. Permanent files live on disk.',
    'RAM хотираи муваққатӣ аст. Пас аз хомӯшӣ холӣ мешавад. Файлҳои доимӣ дар диск мемонанд.',
  ),
  T(
    ['gpu', 'видеокарт', 'график'],
    'GPU — видеокарта. Она считает картинку: игры, 3D, видео. Обычная логика программы всё равно идёт через CPU.',
    'The GPU is the graphics card. It computes images. Ordinary program logic still runs on the CPU.',
    'GPU видеокарта аст. Тасвирро ҳисоб мекунад. Мантиқи оддии барнома аз CPU мегузарад.',
  ),
  T(
    ['ssd', 'hdd', 'диск', 'накопител', 'storage'],
    'Диск хранит файлы, когда компьютер выключен. SSD обычно быстрее HDD. Это не RAM: диск не стирается при выключении.',
    'A disk keeps files when the computer is off. An SSD is usually faster than an HDD. This is not RAM.',
    'Диск файлҳоро ҳангоми хомӯшӣ нигоҳ медорад. Ин RAM нест.',
  ),
  T(
    ['windows', 'linux', 'macos', 'операцион', 'системаи амалиёт'],
    'Операционная система (Windows, macOS, Linux) запускает программы, раздаёт память и показывает окна. Терминал — текстовое окно для команд ОС.',
    'An operating system starts programs, hands out memory, and shows windows. A terminal is a text window for OS commands.',
    'Системаи амалиётӣ барномаҳоро оғоз мекунад. Терминал равзанаи матнӣ барои фармонҳост.',
  ),
  T(
    ['переменн', 'variable', 'тағйирёбанда', 'const', 'let ', 'var '],
    'Переменная — имя для значения.\nПример JS:\nlet score = 0\nscore = score + 1\nconst нельзя назначить заново. Python: score = 0. Знак = кладёт значение, это не «равно» из математики.',
    'A variable is a name for a value.\nJS example:\nlet score = 0\nscore = score + 1\nconst cannot be assigned again. Python: score = 0. = stores a value; it is not math equality.',
    'Тағйирёбанда ном барои қимат аст.\nlet score = 0\nАломати = қиматро мегузорад.',
  ),
  T(
    ['тип данных', 'string', 'boolean', 'число', 'булев', 'строка', 'integer', 'float', 'nan'],
    'Тип говорит, что можно делать со значением. Число: 2+2=4. Строка: "2"+"2"="22". Boolean: true/false. В JS 5 === "5" это false — типы разные.',
    'A type says what you can do with a value. Numbers: 2+2=4. Strings: "2"+"2"="22". Boolean: true/false. In JS 5 === "5" is false — different types.',
    'Намуд мегӯяд, бо қимат чӣ кор кардан мумкин. Адад: 2+2=4. Сатр: "2"+"2"="22".',
  ),
  T(
    ['оператор', 'сравнен', '===', '==', 'присваиван', '&&', '||', 'логик'],
    'Оператор — знак действия. = кладёт значение. === сравнивает значение и тип. && — «и», || — «или», ! — «не». В JS лучше ===, а не ==.',
    'An operator is an action sign. = stores. === compares value and type. && and, || or, ! not. In JS prefer === over ==.',
    'Оператор аломати амал аст. = мегузорад, === муқоиса мекунад. && ва, || ё.',
  ),
  T(
    ['if', 'else', 'услови', 'branch', 'шарт'],
    'if выполняет код, только когда условие true. else — «иначе».\nПример JS:\nif (age >= 18) {\n  console.log("ok")\n} else {\n  console.log("no")\n}\nЧастая ошибка: if (age = 18) — одно = записывает, а не проверяет. Нужно ===.',
    'if runs only when the condition is true. else is otherwise.\nJS example:\nif (age >= 18) {\n  console.log("ok")\n} else {\n  console.log("no")\n}\nCommon bug: if (age = 18) stores instead of checking. Use ===.',
    'if танҳо вақте кор мекунад, ки шарт true аст. Хато: if (age = 18) — як = мегузорад. Лозим ===.',
  ),
  T(
    ['цикл', 'loop', 'while', 'for ', 'repeat', 'такрор'],
    'Цикл повторяет код.\nПример JS:\nfor (let i = 0; i < 3; i++) {\n  console.log(i)\n}\nПечатает 0, 1, 2.\nPython:\nfor i in range(3):\n    print(i)\nЕсли условие while никогда не станет false — цикл зависнет.',
    'A loop repeats code.\nJS:\nfor (let i = 0; i < 3; i++) {\n  console.log(i)\n}\nPrints 0, 1, 2.\nPython:\nfor i in range(3):\n    print(i)\nIf a while condition never becomes false, the loop hangs.',
    'Цикл кодро такрор мекунад.\nfor (let i = 0; i < 3; i++) console.log(i)\nАгар шарти while false нашавад — цикл меистад.',
  ),
  T(
    ['функци', 'function', 'return', 'def ', 'параметр', 'аргумент', 'method', 'метод'],
    'Функция — кусок кода с именем, который вызывают много раз. Параметр — имя входа, аргумент — значение.\nПример JS:\nfunction sum(a, b) {\n  return a + b\n}\nsum(2, 3) // 5\nPython:\ndef sum(a, b):\n    return a + b\nБез return снаружи будет undefined (JS) или None (Python).',
    'A function is a named piece of code you call many times.\nJS:\nfunction sum(a, b) {\n  return a + b\n}\nsum(2, 3) // 5\nPython:\ndef sum(a, b):\n    return a + b\nWithout return you get undefined (JS) or None (Python).',
    'Функсия қисми номдори код аст.\nfunction sum(a, b) { return a + b }\nsum(2, 3) // 5',
  ),
  T(
    ['массив', 'array', 'список', 'list', 'рӯйхат', 'index', 'индекс', 'push', 'pop'],
    'Массив (в Python список) хранит значения по порядку. Индекс с 0.\nПример JS:\nconst items = ["cpu", "ram"]\nitems.push("ssd")\nitems[0] // "cpu"\nPython: items.append("ssd"), len(items).',
    'An array (Python list) stores values in order. Index starts at 0.\nJS:\nconst items = ["cpu", "ram"]\nitems.push("ssd")\nitems[0] // "cpu"',
    'Массив қиматҳоро бо тартиб нигоҳ медорад. Индекс аз 0. items[0] — якум.',
  ),
  T(
    ['объект', 'object', 'словар', 'dictionary', 'dict', 'луғат', 'ключ', 'key', 'json'],
    'Объект (в Python словарь) — пары «ключ → значение».\nПример JS:\nconst user = { name: "Ada", xp: 10 }\nuser.name // "Ada"\nJSON — такой же вид текстом для сервера: {"ok": true}.',
    'An object (Python dict) stores key → value pairs.\nJS:\nconst user = { name: "Ada", xp: 10 }\nuser.name // "Ada"\nJSON is that shape as text for a server.',
    'Объект ҷуфти калид → қимат аст.\nconst user = { name: "Ada" }',
  ),
  T(
    ['класс', 'class', 'ооп', 'oop', 'наследован', 'инкапсул', 'полиморф', 'объектно'],
    'Класс — чертёж, объект — готовая вещь.\nПример JS:\nclass Player {\n  constructor(name) {\n    this.name = name\n    this.hp = 100\n  }\n}\nconst p = new Player("Ada")\nНаследование берёт поля родителя. Инкапсуляция прячет детали.',
    'A class is a blueprint, an object is a finished thing.\nJS:\nclass Player {\n  constructor(name) {\n    this.name = name\n    this.hp = 100\n  }\n}\nconst p = new Player("Ada")',
    'Класс нақша, объект чизи тайёр аст. const p = new Player("Ada")',
  ),
  T(
    ['рекурс', 'recursion', 'рекурси'],
    'Рекурсия — функция вызывает сама себя, пока не дойдёт до простого случая.\nПример:\nfunction fact(n) {\n  if (n <= 1) return 1\n  return n * fact(n - 1)\n}\nБез базы (n <= 1) будет ошибка стека.',
    'Recursion is a function calling itself until a simple case.\nfunction fact(n) {\n  if (n <= 1) return 1\n  return n * fact(n - 1)\n}\nWithout a base case the stack overflows.',
    'Рекурсия функсия худро даъват мекунад. База (n <= 1) ҳатмист.',
  ),
  T(
    ['ошибк', 'баг', 'bug', 'debug', 'дебаг', 'exception', 'try', 'catch', 'синтаксис', 'syntax', 'хато'],
    'Ошибка — программа остановилась или сделала не то. Синтаксис: скобка/кавычка/отступ — код не запустился. Логика: запустился, но ответ неверный. Читай текст ошибки: файл и строка. Отладка: console.log / print промежуточных значений.',
    'An error means the program stopped or did the wrong thing. Syntax: missing bracket/quote/indent. Logic: runs but wrong answer. Read the error: file and line. Debug with console.log / print.',
    'Хато яъне барнома истод ё нодуруст кор кард. Матни хаторо хон: файл ва сатр.',
  ),
  T(
    ['область видимости', 'scope', 'замыкан', 'closure', 'global', 'глобальн'],
    'Область видимости — где имя переменной видно. Внутри функции снаружи не видно. Замыкание — внутренняя функция помнит переменные внешней.',
    'Scope is where a variable name is visible. Inside a function is hidden outside. A closure remembers outer variables.',
    'Соҳаи дидан ҷоест, ки ном дида мешавад. Closure тағйирёбандаҳои беруниро дар ёд нигоҳ медорад.',
  ),
  T(
    ['html', 'тег', 'tag', 'dom', 'семантик'],
    'HTML — структура страницы: заголовки, абзацы, кнопки.\nПример:\n<body>\n  <h1>Привет</h1>\n  <button>Старт</button>\n</body>\nDOM — дерево тегов в браузере. CSS — вид, JS — поведение.',
    'HTML is page structure.\nExample:\n<body>\n  <h1>Hello</h1>\n  <button>Start</button>\n</body>\nDOM is the tag tree. CSS is look, JS is behavior.',
    'HTML сохтори саҳифа аст. CSS намуд, JS рафтор.',
  ),
  T(
    ['css', 'flex', 'grid', 'padding', 'margin', 'style', 'адаптив', 'media', 'селектор'],
    'CSS задаёт вид. .card — класс, #logo — id.\npadding внутри, margin снаружи.\nПример:\n.card {\n  display: flex;\n  gap: 8px;\n  padding: 12px;\n}\n@media меняет стили на узком экране.',
    'CSS sets the look. .card is a class, #logo an id.\npadding inside, margin outside.\n.card {\n  display: flex;\n  gap: 8px;\n}',
    'CSS намудро медиҳад. padding дарун, margin берун. Flex элементҳоро дар сатр мегузорад.',
  ),
  T(
    ['javascript', 'js ', 'скрипт', 'скрипти'],
    'JavaScript оживляет страницу и может работать на сервере (Node.js).\nПример:\nconsole.log(2 + 2)\nОткрой консоль браузера (F12), чтобы увидеть вывод. Имена Score и score — разные.',
    'JavaScript brings pages to life and can run on a server (Node.js).\nconsole.log(2 + 2)\nOpen the browser console (F12). Score and score are different names.',
    'JavaScript саҳифаро зинда мекунад. console.log(2 + 2). Консол: F12.',
  ),
  T(
    ['queryselector', 'addeventlistener', 'onclick', 'событи', 'event', 'клик', 'preventdefault', 'input.value', 'textcontent'],
    'Чтобы страница реагировала:\nconst btn = document.querySelector("#ok")\nbtn.addEventListener("click", () => {\n  alert("hi")\n})\ntextContent меняет текст, input.value читает поле. Для формы нужен event.preventDefault(), иначе страница перезагрузится.',
    'To make a page react:\nconst btn = document.querySelector("#ok")\nbtn.addEventListener("click", () => {\n  alert("hi")\n})\nUse preventDefault on forms or the page reloads.',
    'document.querySelector("#ok") ва addEventListener("click", ...). Барои форма preventDefault лозим аст.',
  ),
  T(
    ['promise', 'async', 'await', 'асинхрон', 'fetch', 'callback', 'колбэк'],
    'Асинхронный код ждёт сеть, не замораживая страницу.\nПример:\nasync function load() {\n  const res = await fetch("/api/items")\n  const data = await res.json()\n  console.log(data)\n}\nawait только внутри async. Ошибку ловят try/catch.',
    'Async code waits for the network without freezing the page.\nasync function load() {\n  const res = await fetch("/api/items")\n  const data = await res.json()\n}\nawait only works inside async.',
    'async/await шабакаро интизор мешавад. await танҳо дар дохили async.',
  ),
  T(
    ['map', 'filter', 'reduce', 'foreach', 'стрелочн', 'arrow'],
    'Методы массива:\nmap — новый массив: nums.map(n => n * 2)\nfilter — оставить подходящие: nums.filter(n => n > 0)\nreduce — одно значение: nums.reduce((s, n) => s + n, 0)\nn => n * 2 — короткая функция.',
    'Array methods:\nmap builds a new array: nums.map(n => n * 2)\nfilter keeps matches: nums.filter(n => n > 0)\nreduce folds to one value.\nn => n * 2 is a short function.',
    'map массиви нав месозад. filter мувофиқҳоро мемонад. n => n * 2 функсияи кӯтоҳ аст.',
  ),
  T(
    ['python', 'питон', 'пайтон', 'print', 'отступ', 'indent', 'range', 'pip'],
    'Python читается почти как английский.\nПример:\nname = "Ada"\nprint("hi", name)\nfor i in range(3):\n    print(i)\nБлок — 4 пробела. Забыл отступ — IndentationError. pip install имя ставит библиотеку.',
    'Python reads almost like English.\nname = "Ada"\nprint("hi", name)\nfor i in range(3):\n    print(i)\nBlocks use 4 spaces. pip install name adds a library.',
    'Python:\nprint("hi")\nfor i in range(3):\n    print(i)\nБлок бо 4 фосила.',
  ),
  T(
    ['git', 'гит', 'commit', 'коммит', 'branch', 'ветк', 'github', 'merge', 'push', 'clone'],
    'Git хранит историю кода.\ngit add файл\ngit commit -m "добавил вход"\ngit push\nВетка — отдельная линия работы. GitHub хранит копию в интернете. git clone скачивает, git pull забирает чужие коммиты.',
    'Git stores code history.\ngit add file\ngit commit -m "add login"\ngit push\nA branch is a separate line of work. GitHub hosts a copy. git clone downloads, git pull fetches.',
    'Git таърихи кодро нигоҳ медорад. git add, git commit -m "...", git push.',
  ),
  T(
    ['backend', 'сервер', 'server', 'api', 'http', 'rest', 'endpoint', 'express', 'node', 'статус', '404', 'cors'],
    'Сайт = браузер + сервер. Браузер шлёт HTTP, сервер отвечает JSON.\nGET читает, POST создаёт, PUT обновляет, DELETE удаляет.\nПример: GET /api/users → 200 и список.\n404 — не найдено, 500 — сервер упал. API — договор адресов и формата.',
    'A site is browser + server. The browser sends HTTP, the server answers JSON.\nGET reads, POST creates, PUT updates, DELETE removes.\nExample: GET /api/users → 200 and a list.\n404 not found, 500 server error.',
    'API шартномаи суроғаҳост. GET мехонад, POST месозад. 200 хуб, 404 ёфт нашуд.',
  ),
  T(
    ['sql', 'баз', 'database', 'select', 'insert', 'update', 'delete', 'where', 'join', 'crud', 'пойгоҳ', 'таблиц', 'primary'],
    'База — таблицы: строки и столбцы.\nПример:\nSELECT name FROM users WHERE age >= 18;\nINSERT добавляет, UPDATE меняет, DELETE удаляет.\nБез WHERE UPDATE/DELETE заденет все строки. Пароль хранят хешем.',
    'A database is tables of rows and columns.\nSELECT name FROM users WHERE age >= 18;\nINSERT adds, UPDATE changes, DELETE removes.\nWithout WHERE, UPDATE/DELETE hits every row.',
    'Пойгоҳ ҷадвалҳост.\nSELECT name FROM users WHERE age >= 18;\nБе WHERE ҳамаи сатрҳоро мегирад.',
  ),
  T(
    ['frontend', 'фронтенд', 'fullstack', 'фулстек', 'клиент', 'сайт', 'website', 'веб', 'сомона'],
    'Frontend — HTML/CSS/JS в браузере. Backend — сервер и база. Full stack — обе части.\nЦепочка: клик → запрос → сервер → база → JSON → экран обновился.',
    'Frontend is HTML/CSS/JS in the browser. Backend is server and database. Full stack is both.\nFlow: click → request → server → database → JSON → screen updates.',
    'Frontend браузер, Backend сервер. Занҷир: пахш → дархост → сервер → пойгоҳ → экран.',
  ),
  T(
    ['react', 'компонент', 'usestate', 'props', 'hook', 'jsx'],
    'React собирает экран из компонентов.\nПример:\nfunction Counter() {\n  const [n, setN] = useState(0)\n  return <button onClick={() => setN(n + 1)}>{n}</button>\n}\nProps — вход от родителя. State — данные, которые меняет сам компонент.',
    'React builds screens from components.\nfunction Counter() {\n  const [n, setN] = useState(0)\n  return <button onClick={() => setN(n + 1)}>{n}</button>\n}\nProps come from the parent. State is changed by the component itself.',
    'React аз компонентҳо экран месозад. useState ҳолатро нигоҳ медорад.',
  ),
  T(
    ['фреймворк', 'framework', 'библиотек', 'library', 'npm', 'пакет', 'модул', 'import', 'export'],
    'Библиотека — готовый код под задачу, ты вызываешь её. Фреймворк задаёт каркас и вызывает твой код. npm install имя / pip install имя ставят пакет. import берёт из файла, export отдаёт.',
    'A library is ready code you call. A framework calls your code. npm install / pip install add a package. import takes from a file, export gives it out.',
    'Китобхона коди тайёр аст. npm install / pip install баста мегузорад.',
  ),
  T(
    ['терминал', 'командн', 'terminal', 'cli', 'консол', 'powershell', 'bash'],
    'Терминал — окно текстовых команд.\ncd папка — зайти\ndir или ls — список файлов\nnode file.js / python file.py — запуск\nnpm run dev — сайт для разработки\nОшибку читай снизу вверх.',
    'A terminal is a text-command window.\ncd folder — enter\ndir or ls — list files\nnode file.js / python file.py — run\nnpm run dev — start the site\nRead errors from the bottom up.',
    'Терминал равзанаи фармонҳост. cd, ls/dir, node file.js, python file.py.',
  ),
  T(
    ['безопасност', 'парол', 'хеш', 'xss', 'инъекц', 'cookie', 'session', 'https'],
    'Пароль хранят хешем, не открытым текстом. HTTPS шифрует дорогу. Чужой текст нельзя вставлять как HTML. Запросы к базе — с параметрами, не склейкой строки. Секретный ключ не кладут в код браузера.',
    'Store passwords as hashes, not plain text. HTTPS encrypts the road. Do not insert foreign text as HTML. Use parameterized database queries. Do not put secrets in browser code.',
    'Рамзро ҳамчун ҳеш нигоҳ дор. HTTPS роҳро рамзгузорӣ мекунад. Калиди махфиро дар браузер нагузор.',
  ),
  T(
    ['игр', 'game', 'canvas', 'столкновен', 'кадр', 'sprite'],
    'Игра — цикл кадров: ввод → обновить координаты → столкновения → нарисовать. На canvas (0,0) слева сверху, y вниз. Состояние: x, y, hp, score.',
    'A game is a frame loop: input → update → collisions → draw. On canvas (0,0) is top-left, y grows down. State: x, y, hp, score.',
    'Бозӣ цикли кадрҳост: вуруд → навсозӣ → бархӯрд → кашидан.',
  ),
  T(
    ['xp', 'devcoin', 'монет', 'уровен', 'level', 'streak', 'сери'],
    'XP растёт за части и целый урок. Уровень считается от XP. DevCoins — монеты магазина, для учёбы не обязательны. Серия растёт, если заниматься в соседние дни.',
    'XP grows for lesson parts and whole lessons. Level comes from XP. DevCoins are shop coins, not required to study. Streak grows on neighboring days.',
    'XP барои дарсҳо меафзояд. DevCoins тангаҳои мағоза аст.',
  ),
]

const HOW = [
  {
    keys: ['как написать for', 'как сделать for', 'написать цикл', 'сделать цикл', 'how to write a for', 'how do i write a for', 'цикли for'],
    a: M(
      'Цикл for по шагам:\n1. Заведи счётчик: let i = 0\n2. Условие продолжения: i < 3\n3. Шаг: i++\n4. Внутри тела пиши действие\n\nJavaScript:\nfor (let i = 0; i < 3; i++) {\n  console.log(i)\n}\n\nPython:\nfor i in range(3):\n    print(i)\n\nПечатает 0, 1, 2. Если нужно повторять, пока условие true — бери while.',
      'A for loop step by step:\n1. Counter: let i = 0\n2. Keep going while i < 3\n3. Step: i++\n4. Put the action in the body\n\nJavaScript:\nfor (let i = 0; i < 3; i++) {\n  console.log(i)\n}\n\nPython:\nfor i in range(3):\n    print(i)\n\nPrints 0, 1, 2. Use while when you stop on a condition, not a count.',
      'Цикли for:\nfor (let i = 0; i < 3; i++) {\n  console.log(i)\n}\nPython:\nfor i in range(3):\n    print(i)',
    ),
  },
  {
    keys: ['как написать функц', 'как сделать функц', 'написать функц', 'how to write a function', 'how do i write a function'],
    a: M(
      'Функция по шагам:\n1. Дай имя\n2. Перечисли входы в скобках\n3. Напиши тело\n4. Верни результат через return\n\nJavaScript:\nfunction sum(a, b) {\n  return a + b\n}\nconsole.log(sum(2, 3))\n\nPython:\ndef sum(a, b):\n    return a + b\nprint(sum(2, 3))',
      'A function step by step:\n1. Name it\n2. List inputs in parentheses\n3. Write the body\n4. return the result\n\nJavaScript:\nfunction sum(a, b) {\n  return a + b\n}\n\nPython:\ndef sum(a, b):\n    return a + b',
      'Функсия:\nfunction sum(a, b) { return a + b }\ndef sum(a, b):\n    return a + b',
    ),
  },
  {
    keys: ['как сделать кнопку', 'клик по кнопке', 'обработчик клика', 'how to make a button', 'addEventListener'],
    a: M(
      'Кнопка с кликом:\n1. В HTML: <button id="ok">Старт</button>\n2. В JS найди её\n3. Повесь событие click\n\nconst btn = document.querySelector("#ok")\nbtn.addEventListener("click", () => {\n  console.log("нажато")\n})\n\nЕсли кнопки «нет» — проверь id и что скрипт стоит после HTML.',
      'A button with a click:\n1. HTML: <button id="ok">Start</button>\n2. Find it in JS\n3. Listen for click\n\nconst btn = document.querySelector("#ok")\nbtn.addEventListener("click", () => {\n  console.log("pressed")\n})',
      'Тугма:\n<button id="ok">Старт</button>\ndocument.querySelector("#ok").addEventListener("click", () => {\n  console.log("пахш")\n})',
    ),
  },
  {
    keys: ['как сделать массив', 'создать список', 'how to make an array', 'how to create a list'],
    a: M(
      'Массив / список:\n\nJavaScript:\nconst nums = [1, 2, 3]\nnums.push(4)\nconsole.log(nums[0])\n\nPython:\nnums = [1, 2, 3]\nnums.append(4)\nprint(nums[0])\n\nИндекс с 0: первый элемент — [0].',
      'Array / list:\n\nJavaScript:\nconst nums = [1, 2, 3]\nnums.push(4)\n\nPython:\nnums = [1, 2, 3]\nnums.append(4)\n\nIndex starts at 0.',
      'Массив:\nconst nums = [1, 2, 3]\nnums.push(4)\nИндекс аз 0.',
    ),
  },
  {
    keys: ['как сделать запрос', 'как вызвать api', 'fetch запрос', 'how to call an api', 'how to use fetch'],
    a: M(
      'Запрос к API:\n\nasync function load() {\n  try {\n    const res = await fetch("/api/items")\n    const data = await res.json()\n    console.log(data)\n  } catch (e) {\n    console.log("сеть упала", e)\n  }\n}\n\nGET читает. Для создания обычно POST с телом JSON.',
      'An API request:\n\nasync function load() {\n  try {\n    const res = await fetch("/api/items")\n    const data = await res.json()\n    console.log(data)\n  } catch (e) {\n    console.log("network failed", e)\n  }\n}',
      'Дархости API:\nconst res = await fetch("/api/items")\nconst data = await res.json()',
    ),
  },
  {
    keys: ['как написать select', 'sql запрос', 'как выбрать из таблицы', 'how to write select'],
    a: M(
      'SQL SELECT:\nSELECT name, age\nFROM users\nWHERE age >= 18\nORDER BY name;\n\nSELECT — какие столбцы, FROM — таблица, WHERE — фильтр. Без WHERE берётся почти всё.',
      'SQL SELECT:\nSELECT name, age\nFROM users\nWHERE age >= 18\nORDER BY name;\n\nSELECT columns, FROM table, WHERE filter.',
      'SQL:\nSELECT name FROM users WHERE age >= 18;',
    ),
  },
]

function norm(s) {
  return String(s || '')
    .toLowerCase()
    .replace(/ё/g, 'е')
    .replace(/ӣ/g, 'и')
    .replace(/ӯ/g, 'у')
    .replace(/қ/g, 'к')
    .replace(/ҳ/g, 'х')
    .replace(/ҷ/g, 'ч')
    .replace(/ғ/g, 'г')
    .replace(/[“”«»]/g, '"')
    .replace(/функцы|функцие|функцыя|функсия|function\b/g, 'функци')
    .replace(/перемена+|переменка|variable\b/g, 'переменн')
    .replace(/масиф|масив|array\b|list\b|руйхат/g, 'массив')
    .replace(/обьект|обьект|object\b|dictionary\b|лугат/g, 'объект')
    .replace(/цыкл|цикол|сикл|loop\b|давра/g, 'цикл')
    .replace(/питон|пайтон/g, 'python')
    .replace(/джаваскрипт|жс\b/g, 'javascript')
    .replace(/сомона|website\b|site\b/g, 'сайт')
    .replace(/пойгох|database\b/g, 'база')
    .replace(/what is|what's|чист/g, 'что такое')
    .replace(/how do i|how to|how does|чи гуна|чй гуна/g, 'как')
    .replace(/why|чаро/g, 'почему')
    .replace(/explain|расскаж|фахмон|фаҳмон/g, 'объясн')
}

function escapeRe(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function hasKey(text, key) {
  const k = norm(key).trim()
  if (!k) return false
  if (k.length <= 4 || /[+#]/.test(k)) {
    const re = new RegExp(`(?:^|[^a-zа-я0-9#+])${escapeRe(k)}(?:[^a-zа-я0-9#+]|$)`, 'i')
    return re.test(text)
  }
  return text.includes(k)
}

function rank(text) {
  return KB.map((item) => {
    let score = 0
    for (const k of item.keys) {
      if (hasKey(text, k)) score += 24 + k.trim().length
    }
    return { item, score }
  })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
}

function howTo(q, lang) {
  for (const item of HOW) {
    if (item.keys.some((k) => q.includes(norm(k)))) return pick(item.a, lang)
  }
  return ''
}

function splitContrast(q) {
  const patterns = [
    /чем\s+(.+?)\s+отлича\w*\s+от\s+(.+?)(?:\?|$)/,
    /разниц\w*\s+между\s+(.+?)\s+и\s+(.+?)(?:\?|$)/,
    /difference between\s+(.+?)\s+and\s+(.+?)(?:\?|$)/,
    /how is\s+(.+?)\s+different from\s+(.+?)(?:\?|$)/,
    /(.+?)\s+аз\s+(.+?)\s+фар[кқ]/,
    /(.+?)\s+vs\.?\s+(.+?)(?:\?|$)/,
  ]
  for (const re of patterns) {
    const m = q.match(re)
    if (m) return [m[1].trim(), m[2].trim()]
  }
  return null
}

function lessonAnswer(id, lang) {
  const loc = LESSON_LOCALE[id]
  const lesson = getLesson(id)
  if (!loc || !lesson) return ''
  const title = pick(loc.title, lang)
  const desc = pick(loc.description, lang)
  const tip = pick(
    M(
      'Как пройти: 1) прочитай теорию 2) сделай практику по порядку 3) в тесте выбирай смысл, не похожие слова. Если застрял — пришли свой код сюда.',
      'How to pass: 1) read theory 2) do practice in order 3) in the quiz pick meaning, not look-alike words. Stuck? Paste your code here.',
      'Чӣ гуна гузаштан: 1) назария 2) машқ бо тартиб 3) дар тест маъно. Коди худро фирист.',
    ),
    lang,
  )
  return pick(
    M(
      `Урок ${lesson.id}: «${title}».\n${desc}\n\n${tip}`,
      `Lesson ${lesson.id}: “${title}”.\n${desc}\n\n${tip}`,
      `Дарси ${lesson.id}: «${title}».\n${desc}\n\n${tip}`,
    ),
    lang,
  )
}

function walkCode(raw, lang) {
  const lines = String(raw)
    .split(/\n/)
    .map((s) => s.replace(/\s+$/, ''))
  const body = lines.map((s) => s.trim()).filter(Boolean)
  const joined = body.join('\n')
  const looksCode =
    body.some((l) => /^(def |function |class |if |for |while |return |print\(|console\.|const |let |var |<)/.test(l) || /[{};]/.test(l)) ||
    /\bif\s*\([^)]*=/.test(joined)
  if (!looksCode) return ''

  const bugs = []
  const steps = []
  const fix = []
  const addBug = (ru, en, tg) => bugs.push(pick(M(ru, en, tg), lang))
  const addFix = (ru, en, tg) => fix.push(pick(M(ru, en, tg), lang))

  body.forEach((line, i) => {
    const n = i + 1
    if (/\bif\b/.test(line) && line.slice(line.search(/\bif\b/)).replace(/===|!==|==|!=|<=|>=/g, '').includes('=')) {
      addBug(
        `Строка ${n}: в if стоит одно =. Это записывает значение, а не проверяет.`,
        `Line ${n}: if uses a single =. That stores a value instead of checking it.`,
        `Сатри ${n}: дар if як = аст. Ин қимат мегузорад, на месанҷад.`,
      )
      addFix(
        'Исправь на: if (age === 18) { ... } в JavaScript или if age == 18: в Python.',
        'Fix: if (age === 18) { ... } in JavaScript or if age == 18: in Python.',
        'Ислоҳ: if (age === 18) { ... } дар JavaScript ё if age == 18: дар Python.',
      )
    }
    if (/^(if|elif|else|for|while|def|class)\b/.test(line) && !line.includes(':') && !line.includes('{') && !/\(.*\)/.test(line)) {
      addBug(
        `Строка ${n}: после ${line.split(/\s+/)[0]} нет двоеточия. В Python строка должна кончаться на :.`,
        `Line ${n}: after ${line.split(/\s+/)[0]} there is no colon. In Python the line must end with :.`,
        `Сатри ${n}: пас аз ${line.split(/\s+/)[0]} ду нуқта нест.`,
      )
    }
    const quotes = (line.match(/"/g) || []).length + (line.match(/'/g) || []).length
    if (quotes % 2 === 1) {
      addBug(
        `Строка ${n}: кавычка не закрыта.`,
        `Line ${n}: a quote is not closed.`,
        `Сатри ${n}: нохунак пӯшида нест.`,
      )
    }
    if (/^def /.test(line)) steps.push(pick(M(`${n}. Объявление функции Python.`, `${n}. Python function.`, `${n}. Функсияи Python.`), lang))
    else if (/^function |=>/.test(line)) steps.push(pick(M(`${n}. Функция JavaScript.`, `${n}. JavaScript function.`, `${n}. Функсияи JavaScript.`), lang))
    else if (/^if |^elif |^else /.test(line)) steps.push(pick(M(`${n}. Условие.`, `${n}. Condition.`, `${n}. Шарт.`), lang))
    else if (/^for |^while /.test(line)) steps.push(pick(M(`${n}. Цикл.`, `${n}. Loop.`, `${n}. Цикл.`), lang))
    else if (/^return /.test(line)) steps.push(pick(M(`${n}. return — отдать результат.`, `${n}. return — send the result.`, `${n}. return — натиҷа.`), lang))
    else if (/^print\(|console\./.test(line)) steps.push(pick(M(`${n}. Вывод в консоль.`, `${n}. Console output.`, `${n}. Баровард ба консол.`), lang))
    else if (/^(const |let |var )?[A-Za-z_][\w.]*\s*=/.test(line)) steps.push(pick(M(`${n}. Запись в переменную.`, `${n}. Store in a variable.`, `${n}. Ба тағйирёбанда.`), lang))
  })

  const open = (raw.match(/\(/g) || []).length - (raw.match(/\)/g) || []).length
  const braces = (raw.match(/\{/g) || []).length - (raw.match(/\}/g) || []).length
  if (open !== 0) addBug('Число скобок ( и ) не сходится.', 'Counts of ( and ) do not match.', 'Шумораи ( ва ) баробар нест.')
  if (braces !== 0) addBug('Число фигурных скобок { и } не сходится.', 'Counts of { and } do not match.', 'Шумораи { ва } баробар нест.')

  if (!bugs.length && !steps.length) return ''

  const parts = [pick(M('Разбор кода', 'Code walkthrough', 'Таҳлили код'), lang) + ':']
  if (steps.length) parts.push(...steps)
  if (bugs.length) {
    parts.push('', pick(M('Что не так', 'What is wrong', 'Чӣ нодуруст'), lang) + ':')
    parts.push(...bugs.map((b, i) => `${i + 1}) ${b}`))
  } else {
    parts.push('', pick(M('Типичной ошибки не вижу.', 'I do not see a typical mistake.', 'Хатои маъмулиро намебинам.'), lang))
  }
  if (fix.length) {
    parts.push('', pick(M('Как исправить', 'How to fix', 'Чӣ гуна ислоҳ'), lang) + ':')
    parts.push(...fix)
  }
  return parts.join('\n')
}

function followUp(q, history, lang) {
  const prev = [...(history || [])].reverse().find((m) => m.role === 'user' && m.text && !/^(проще|пример|короче|simpler|example|на python|in python|осон)/i.test(m.text.trim()))
  if (!prev) return ''
  const simple = /проще|короче|простыми|simpler|easier|осон/.test(q)
  const example = /пример|example|мисол|покажи код/.test(q)
  const py = /python|пайтон|питон/.test(q)
  const js = /\bjs\b|javascript|на js/.test(q)
  const tiny = q.trim().length < 28 && rank(q).length === 0 && !walkCode(prev.text, lang)
  if (!simple && !example && !py && !js && !tiny) return ''

  const walked = walkCode(prev.text, lang)
  if (walked && (simple || tiny)) return walked

  const hits = rank(norm(`${prev.text} ${py ? 'python' : ''} ${js ? 'javascript' : ''}`))
  const how = howTo(norm(prev.text), lang)
  if (!hits.length && !how) return ''
  const full = how || pick(hits[0].item.a, lang)

  if (simple) {
    const first = full.split(/\n/)[0].split(/(?<=[.!?])\s/)[0]
    return pick(M(`Коротко: ${first}`, `Short: ${first}`, `Кӯтоҳ: ${first}`), lang)
  }
  if (example || py || js) {
    const block = full.split(/\n/).filter((l) => /example|пример|js:|python:|function |def |for |const |let |print\(|console\./i.test(l) || /^\s{2,}/.test(l) || /[{}]/.test(l))
    if (block.length) {
      return pick(M('Пример:\n', 'Example:\n', 'Мисол:\n'), lang) + block.join('\n').replace(/^(Пример|Example|Мисол):\s*/i, '')
    }
    const cut = full.split(/Пример|JS:|Python:|Example:/i)[1]
    if (cut) return pick(M(`Пример:${cut.trim().slice(0, 500)}`, `Example:${cut.trim().slice(0, 500)}`, `Мисол:${cut.trim().slice(0, 500)}`), lang)
  }
  return full
}

function chatLine(q, lang) {
  const t = q.replace(/[!?.,]+/g, ' ').replace(/\s+/g, ' ').trim()
  const short = t.length < 40
  if (short && /^(привет|прив|хай|хей|здравствуй|здрасте|добрый день|добрый вечер|доброе утро|hello|hi|hey|good morning|good evening|салом|ассалом|assalom)/.test(t)) {
    return pick(M('Привет! Что вам нужно?', 'Hi! What do you need?', 'Салом! Ба шумо чӣ лозим?'), lang)
  }
  if (/как дела|как ты|как пожива|how are you|чи хел|чи хал/.test(t)) {
    return pick(
      M('Всё хорошо. Что вам нужно: объяснить тему, разобрать код или помочь с уроком?', 'I am good. What do you need: a topic, your code, or help with a lesson?', 'Хубам. Ба шумо чӣ лозим: мавзӯъ, код ё дарс?'),
      lang,
    )
  }
  if (/^(спасибо|благодарю|thanks|thank you|рахмат)\b/.test(t)) {
    return pick(M('Пожалуйста. Если нужно ещё — просто напишите.', 'You are welcome. If you need more, just write.', 'Марҳамат. Агар боз лозим бошад — нависед.'), lang)
  }
  if (/^(пока|до свидания|bye|goodbye|хайр)\b/.test(t)) {
    return pick(M('До встречи. Когда вернётесь — напишите, что нужно.', 'See you. When you come back, write what you need.', 'То дидор. Вақте баргаштед, нависед чӣ лозим.'), lang)
  }
  if (/кто ты|что ты умеешь|что ты можешь|что можешь|who are you|what can you/.test(t)) {
    return pick(
      M(
        'Я учитель DevHub. Напишите, что вам нужно.\n\nМогу полностью объяснить программирование: переменные, if, циклы, функции, HTML, CSS, JavaScript, Python, сайты, API, базы SQL и Git. Могу разобрать ваш код и показать, где ошибка.',
        'I am the DevHub teacher. Tell me what you need.\n\nI can explain programming in full: variables, if, loops, functions, HTML, CSS, JavaScript, Python, websites, APIs, SQL, and Git. I can also read your code and show the mistake.',
        'Ман муаллими DevHub ҳастам. Нависед, ба шумо чӣ лозим.\n\nБарномасозиро пурра мефаҳмонам ва коди шуморо мехонам.',
      ),
      lang,
    )
  }
  if (/^(что (вам|тебе|мне) нужно|что нужно|help|помощь)\b/.test(t)) {
    return pick(
      M('Напишите тему или пришлите код. Например: «что такое функция», «как работает сайт» или несколько строк программы.', 'Write a topic or paste code. For example: “what is a function”, “how does a website work”, or a few lines of a program.', 'Мавзӯъ нависед ё кодро гузоред. Масалан: «функсия чист».'),
      lang,
    )
  }
  return ''
}

function asChat(text, q, lang) {
  const lead = /программир|кодинг|coding|programming|барнома/.test(q)
    ? pick(M('Хорошо, расскажу полностью.\n\n', 'Sure, here is the full picture.\n\n', 'Хуб, пурра мегӯям.\n\n'), lang)
    : /^(что|как|почему|зачем|расскаж|объясн|what|how|why|explain|чи гуна|чаро)/.test(q) || /что такое|функци|цикл|массив|сайт|база/.test(q)
      ? pick(M('Сейчас объясню.\n\n', 'Here is the explanation.\n\n', 'Ҳозир мефаҳмонам.\n\n'), lang)
      : ''
  return lead + text
}

function fallback(raw, lang) {
  const topic = raw.trim().slice(0, 160)
  return pick(
    M(
      `Пока нет точного термина для «${topic}».\n\nСпроси так:\n• что такое функция / массив / API\n• как написать цикл for\n• или вставь 3–10 строк кода\n\nЯ разберу по строкам и покажу исправление.`,
      `No exact term for “${topic}” yet.\n\nAsk like this:\n• what is a function / array / API\n• how to write a for loop\n• or paste 3–10 lines of code\n\nI will walk through it and show a fix.`,
      `Барои «${topic}» истилоҳи дақиқ нест.\n\nПурс: функсия чист? ё 3–10 сатри кодро гузор.`,
    ),
    lang,
  )
}

export function askTeacher(raw, lang = 'ru', lessonId, history) {
  const q = norm(raw)
  if (!q.trim()) {
    return pick(M('Привет! Что вам нужно?', 'Hi! What do you need?', 'Салом! Ба шумо чӣ лозим?'), lang)
  }

  const hello = chatLine(q, lang)
  if (hello) return hello

  const continued = followUp(q, history, lang)
  if (continued && !/урок\s*\d+|lesson\s*\d+|дарс\s*\d+|текущ|current|ҳозир/.test(q)) {
    return continued
  }

  const walked = walkCode(raw, lang)
  if (walked && (raw.includes('\n') || /[{};]|def |function |console\.|print\(|\bif\s*\(/.test(raw))) {
    return asChat(walked, q, lang)
  }

  const recipe = howTo(q, lang)
  if (recipe) return asChat(recipe, q, lang)

  const current = /текущ|current|ҳозир|хозир|этот урок|this lesson|ин дарс|урок\s*\d+|lesson\s*\d+|дарс\s*\d+/.test(q)
  const idFromText = Number((q.match(/(?:урок|lesson|дарс)\s*(\d+)/) || [])[1])
  if (current || idFromText) {
    const text = lessonAnswer(idFromText || lessonId, lang)
    if (text) return asChat(text, q, lang)
  }

  const contrast = splitContrast(q)
  if (contrast) {
    const left = rank(contrast[0])[0]
    const right = rank(contrast[1])[0]
    if (left && right && left.item !== right.item) {
      const bridge = pick(
        M(
          'Если коротко: это разные вещи, их не подменяют друг другом. Напишите, какую из двух разобрать ещё подробнее.',
          'In short: these are different things. Tell me which one you want in more detail.',
          'Кӯтоҳ: инҳо чизҳои гуногунанд. Нависед, кадомашро боз муфассалтар кунам.',
        ),
        lang,
      )
      return asChat(`${pick(left.item.a, lang)}\n\n${pick(right.item.a, lang)}\n\n${bridge}`, q, lang)
    }
  }

  const hits = rank(q)
  if (hits.length) {
    const main = pick(hits[0].item.a, lang)
    const second = hits[1] && hits[1].score >= hits[0].score * 0.75 ? pick(hits[1].item.a, lang) : ''
    return asChat(second && second !== main ? `${main}\n\n${second}` : main, q, lang)
  }

  if (lessonId) {
    const near = lessonAnswer(lessonId, lang)
    if (near) {
      return asChat(
        pick(
          M(
            `Сначала отвечу по вашему уроку ${lessonId}, а потом можно спросить что угодно.\n\n${near}`,
            `I will start from your lesson ${lessonId}. Then you can ask anything.\n\n${near}`,
            `Аввал дарси ${lessonId}.\n\n${near}`,
          ),
          lang,
        ),
        q,
        lang,
      )
    }
  }

  return asChat(fallback(raw, lang), q, lang)
}
