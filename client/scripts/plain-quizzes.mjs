import { writeFileSync } from 'node:fs'

const q = (ru, en, tg, opts, correct, er, ee, et) => ({
  q: { ru, en, tg },
  options: opts.map(([r, e, t]) => ({ ru: r, en: e, tg: t })),
  correct,
  explain: { ru: er, en: ee, tg: et },
})

const QUIZZES = {
  1: [
    q('Компьютер умеет читать твои мысли?', 'Can a computer read your mind?', 'Компютер фикри туро мехонад?', [
      ['Нет. Он делает только написанное', 'No. It only does what is written', 'Не. Танҳо навиштаро мекунад'],
      ['Да, он сам всё понимает', 'Yes, it understands everything', 'Ҳа, худаш ҳамаро мефаҳмад'],
      ['Да, если экран большой', 'Yes, if the screen is big', 'Ҳа, агар экран калон бошад'],
      ['Только ночью', 'Only at night', 'Танҳо шабона'],
    ], 0, 'Написал команду — он её и выполнит. Не догадается.', 'It follows the command. It does not guess.', 'Фармонро навиштӣ — ҳамонро мекунад.'),
    q('Программа — это…', 'A program is…', 'Барнома ин…', [
      ['Список команд по порядку', 'A list of commands in order', 'Рӯйхати фармонҳо ба тартиб'],
      ['Железная коробка', 'A metal box', 'Қуттии оҳанӣ'],
      ['Провод из розетки', 'A wall plug', 'Сими розетка'],
      ['Только обои на экране', 'Only the wallpaper', 'Танҳо тасвири экран'],
    ], 0, 'Программа — это команды. Коробка — это сам компьютер.', 'A program is commands. The box is the computer.', 'Барнома фармонҳост. Қуттӣ худи компютер аст.'),
    q('Чем ты пишешь буквы компьютеру?', 'What do you use to type letters?', 'Бо чӣ ба компютер ҳарф менависӣ?', [
      ['Клавиатурой', 'The keyboard', 'Бо клавиатура'],
      ['Экраном, как ручкой', 'The screen, like a pen', 'Бо экран, мисли қалам'],
      ['Зарядкой', 'The charger', 'Бо зарядка'],
      ['Колонками', 'The speakers', 'Бо баландгӯяк'],
    ], 0, 'Клавиатура вводит текст. Экран только показывает.', 'The keyboard types. The screen only shows.', 'Клавиатура менависад. Экран танҳо нишон медиҳад.'),
    q('Зачем нужен экран?', 'What is the screen for?', 'Экран барои чӣ?', [
      ['Чтобы увидеть ответ', 'To see the answer', 'То ҷавобро бинӣ'],
      ['Чтобы хранить файлы навсегда', 'To keep files forever', 'То файлҳо абадӣ монанд'],
      ['Чтобы питать компьютер', 'To power the computer', 'То компютерро барқ диҳад'],
      ['Чтобы печатать на бумаге', 'To print on paper', 'То дар коғаз чоп кунад'],
    ], 0, 'Экран показывает результат. Файлы живут на диске.', 'The screen shows the result. Files live on the disk.', 'Экран натиҷаро нишон медиҳад. Файлҳо дар диск мемонанд.'),
  ],
  2: [
    q('Что соединяет детали внутри компьютера?', 'What connects the parts inside?', 'Дар дохил қисмҳоро чӣ мепайвандад?', [
      ['Материнская плата', 'The motherboard', 'Платаи модарӣ'],
      ['Обои рабочего стола', 'The wallpaper', 'Тасвири мизи корӣ'],
      ['Имя папки', 'A folder name', 'Номи ҷузвдон'],
      ['Громкость звука', 'The volume', 'Баландии садо'],
    ], 0, 'На этой плате сидят процессор, память и диск.', 'The CPU, memory and disk sit on this board.', 'Протсессор, хотира ва диск дар ҳамин плата мешинанд.'),
    q('Мышь и клавиатура где находятся?', 'Where are the mouse and keyboard?', 'Муш ва клавиатура дар куҷоянд?', [
      ['Внутри батарейки', 'Inside the battery', 'Дар дохили батарея'],
      ['Снаружи. Ими ты управляешь', 'Outside. You control the computer with them', 'Берун. Бо онҳо идора мекунӣ'],
      ['Внутри интернета', 'Inside the internet', 'Дар дохили интернет'],
      ['Только в телефоне', 'Only in a phone', 'Танҳо дар телефон'],
    ], 1, 'Это устройства вокруг компьютера: ты нажимаешь, он слушает.', 'They sit around the computer: you press, it listens.', 'Онҳо дар атрофанд: ту пахш мекунӣ, ӯ гӯш мекунад.'),
    q('Блок питания даёт компьютеру…', 'The power supply gives the computer…', 'Блоки барқ ба компютер … медиҳад', [
      ['Новые игры', 'New games', 'Бозиҳои нав'],
      ['Готовый код', 'Finished code', 'Коди тайёр'],
      ['Электричество', 'Electricity', 'Барқ'],
      ['Пароль от Wi‑Fi', 'The Wi‑Fi password', 'Рамзи Wi‑Fi'],
    ], 2, 'Без электричества компьютер не включится.', 'Without electricity it will not turn on.', 'Бе барқ компютер фурӯзон намешавад.'),
    q('Ноутбук молчит и не включается. Что проверить первым?', 'The laptop is silent and will not start. Check what first?', 'Ноутбук хомӯш аст. Аввал чӣро санҷӣ?', [
      ['Цвет обоев', 'Wallpaper color', 'Ранги тасвир'],
      ['Название папки', 'The folder name', 'Номи ҷузвдон'],
      ['Размер букв', 'Letter size', 'Андозаи ҳарф'],
      ['Зарядку и батарею', 'The charger and the battery', 'Зарядка ва батарея'],
    ], 3, 'Сначала есть ли питание. Потом уже смотри программы.', 'Check power first. Then look at programs.', 'Аввал барқ. Баъд барнома.'),
  ],
  3: [
    q('Выключил компьютер. Что будет с открытым файлом в RAM?', 'You turn the computer off. What happens to an open file in RAM?', 'Компютерро хомӯш кардӣ. Бо файли кушода дар RAM чӣ мешавад?', [
      ['Он пропадёт. RAM забывает после выключения', 'It is gone. RAM forgets after shutdown', 'Нест мешавад. RAM пас аз хомӯшӣ фаромӯш мекунад'],
      ['Он навсегда останется в RAM', 'It stays in RAM forever', 'Дар RAM абадӣ мемонад'],
      ['RAM сама станет диском', 'RAM turns into a disk', 'RAM худаш диск мешавад'],
      ['Файл удвоится', 'The file doubles', 'Файл ду баробар мешавад'],
    ], 0, 'RAM — временный стол. Выключил — стол пустой.', 'RAM is a temporary desk. Turn it off and the desk is empty.', 'RAM мизи муваққатӣ аст. Хомӯш кардӣ — холӣ.'),
    q('Кто выполняет команды программы?', 'Who runs the program commands?', 'Фармонҳои барномаро кӣ иҷро мекунад?', [
      ['Обои', 'The wallpaper', 'Тасвири экран'],
      ['Процессор, его зовут CPU', 'The processor, called the CPU', 'Протсессор, номаш CPU'],
      ['Только колонки', 'Only the speakers', 'Танҳо баландгӯяк'],
      ['Зарядка', 'The charger', 'Зарядка'],
    ], 1, 'CPU считает и выполняет команды. Это мозг.', 'The CPU calculates and runs commands. It is the brain.', 'CPU ҳисоб мекунад ва фармонро иҷро мекунад.'),
    q('Где файл останется после выключения?', 'Where does a file stay after shutdown?', 'Пас аз хомӯшӣ файл дар куҷо мемонад?', [
      ['В воздухе', 'In the air', 'Дар ҳаво'],
      ['Только на экране', 'Only on the screen', 'Танҳо дар экран'],
      ['На диске: SSD или HDD', 'On the disk: SSD or HDD', 'Дар диск: SSD ё HDD'],
      ['В мышке', 'In the mouse', 'Дар муш'],
    ], 2, 'Диск помнит файлы. RAM после выключения пустая.', 'The disk remembers files. RAM is empty after shutdown.', 'Диск файлро ёд дорад. RAM пас аз хомӯшӣ холӣ.'),
    q('Видеокарта (GPU) сильнее всего нужна для…', 'A graphics card (GPU) is most needed for…', 'Видеокарта (GPU) бештар барои … лозим аст', [
      ['Печати чека', 'Printing a receipt', 'Чопи расид'],
      ['Имени папки', 'A folder name', 'Номи ҷузвдон'],
      ['Зарядки телефона', 'Charging a phone', 'Зарядкаи телефон'],
      ['Игр и тяжёлой картинки', 'Games and heavy pictures', 'Бозӣ ва тасвири вазнин'],
    ], 3, 'GPU рисует картинку. Без неё игры тормозят.', 'The GPU draws the picture. Games lag without it.', 'GPU тасвир мекашад. Бе он бозӣ суст мешавад.'),
  ],
  4: [
    q('Бит может быть каким?', 'What can a bit be?', 'Бит чӣ буда метавонад?', [
      ['Любой буквой', 'Any letter', 'Ҳар ҳарф'],
      ['Только 0 или 1', 'Only 0 or 1', 'Танҳо 0 ё 1'],
      ['Только числом 7', 'Only the number 7', 'Танҳо рақами 7'],
      ['Целой фотографией', 'A whole photo', 'Акси пурра'],
    ], 1, 'Бит — самый маленький кусочек: да или нет.', 'A bit is the smallest piece: yes or no.', 'Бит хурдтарин қисм: ҳа ё не.'),
    q('Сколько бит в одном байте?', 'How many bits are in one byte?', 'Дар як байт чанд бит?', [
      ['8', '8', '8'],
      ['2', '2', '2'],
      ['100', '100', '100'],
      ['1', '1', '1'],
    ], 0, '8 маленьких бит вместе — это 1 байт.', '8 small bits together make 1 byte.', '8 бити хурд якҷоя — 1 байт.'),
    q('Откуда процессор берёт программу, чтобы её выполнить?', 'Where does the processor get the program so it can run it?', 'Протсессор барномаро аз куҷо мегирад, то иҷро кунад?', [
      ['С бумаги на столе', 'From paper on the desk', 'Аз коғази рӯи миз'],
      ['Из розетки', 'From the wall socket', 'Аз розетка'],
      ['Из RAM, куда её загрузили с диска', 'From RAM, after it was loaded from the disk', 'Аз RAM, ки аз диск оварданд'],
      ['Из колонок', 'From the speakers', 'Аз баландгӯяк'],
    ], 2, 'Сначала с диска в RAM. Потом CPU читает оттуда.', 'First from disk into RAM. Then the CPU reads it there.', 'Аввал аз диск ба RAM. Баъд CPU аз он ҷо мехонад.'),
    q('Кто в программе решает: это число больше или меньше?', 'Who decides if a number is bigger or smaller?', 'Дар барнома кӣ мегӯяд: адад калонтар аст ё хурдтар?', [
      ['Мышь', 'The mouse', 'Муш'],
      ['Процессор', 'The processor', 'Протсессор'],
      ['Монитор', 'The monitor', 'Монитор'],
      ['Блок питания', 'The power supply', 'Блоки барқ'],
    ], 1, 'Сравнивать числа — работа процессора.', 'Comparing numbers is the processor’s job.', 'Муқоисаи ададҳо кори протсессор аст.'),
  ],
  5: [
    q('Windows, macOS и Linux — это…', 'Windows, macOS and Linux are…', 'Windows, macOS ва Linux ин…', [
      ['Системы, которые запускают программы', 'Systems that start programs', 'Системаҳое, ки барномаро мекушоянд'],
      ['Марки видеокарт', 'Graphics card brands', 'Маркаҳои видеокарта'],
      ['Только игры', 'Only games', 'Танҳо бозиҳо'],
      ['Типы зарядки', 'Charger types', 'Намудҳои зарядка'],
    ], 0, 'Это операционные системы. Они открывают программы и файлы.', 'They are operating systems. They open programs and files.', 'Инҳо системаи амалиётӣ. Барнома ва файлро мекушоянд.'),
    q('Файл — это…', 'A file is…', 'Файл ин…', [
      ['Кусок корпуса', 'A piece of the case', 'Қисми қуттӣ'],
      ['Данные с именем, которые лежат на диске', 'Named data that sits on the disk', 'Маълумоти номдор, ки дар диск меистад'],
      ['Всегда только песня', 'Always only a song', 'Ҳамеша танҳо суруд'],
      ['Пароль от дома', 'The house password', 'Рамзи хона'],
    ], 1, 'У файла есть имя и содержимое: текст, фото или код.', 'A file has a name and contents: text, photo or code.', 'Файл ном ва дарун дорад: матн, акс ё код.'),
    q('Когда появляется процесс?', 'When does a process appear?', 'Раванд кай пайдо мешавад?', [
      ['Когда компьютер выключен', 'When the computer is off', 'Вақте компютер хомӯш аст'],
      ['Когда чистят пыль', 'When you clean dust', 'Вақте чанг тоза мекунӣ'],
      ['Когда ты открыл программу', 'When you open a program', 'Вақте барномаро кушодӣ'],
      ['Когда сменил обои', 'When you change the wallpaper', 'Вақте тасвирро иваз кардӣ'],
    ], 2, 'Открыл программу — система создала процесс. Закрыл — процесс кончился.', 'Open a program and a process starts. Close it and the process ends.', 'Барномаро кушодӣ — раванд оғоз шуд. Пӯшидӣ — тамом.'),
    q('В папке можно держать…', 'A folder can hold…', 'Дар ҷузвдон метавон нигоҳ дошт…', [
      ['Только один файл и больше ничего', 'Only one file and nothing else', 'Танҳо як файл ва дигар ҳеҷ чиз'],
      ['Другие файлы и даже папки', 'Other files and even folders', 'Файлҳои дигар ва ҳатто ҷузвдонҳо'],
      ['Только процессор', 'Only the processor', 'Танҳо протсессор'],
      ['Только зарядку', 'Only a charger', 'Танҳо зарядка'],
    ], 1, 'Папка — коробка. Внутри файлы и другие коробки.', 'A folder is a box. Inside are files and other boxes.', 'Ҷузвдон қуттӣ аст. Дарун файл ва қуттиҳои дигар.'),
  ],
  6: [
    q('Алгоритм простыми словами — это…', 'In plain words, an algorithm is…', 'Алгоритм бо сухани осон ин…', [
      ['Случайные клики', 'Random clicks', 'Кликҳои тасодуфӣ'],
      ['План: сначала это, потом то', 'A plan: first this, then that', 'Нақша: аввал ин, баъд он'],
      ['Название процессора', 'The processor’s name', 'Номи протсессор'],
      ['Картинка на обоях', 'A wallpaper picture', 'Тасвир дар экран'],
    ], 1, 'Сначала шаги. Потом эти шаги пишут кодом.', 'Steps first. Then you write those steps as code.', 'Аввал қадамҳо. Баъд онҳоро код мекунӣ.'),
    q('Баг — это…', 'A bug is…', 'Хато (bug) ин…', [
      ['Красивая новая кнопка', 'A nice new button', 'Тугмаи зебои нав'],
      ['Ошибка: программа делает не то', 'A mistake: the program does the wrong thing', 'Хато: барнома чизи нодуруст мекунад'],
      ['Тип зарядки', 'A charger type', 'Намуди зарядка'],
      ['Сама Windows', 'Windows itself', 'Худи Windows'],
    ], 1, 'Ты хотел одно, код сделал другое. Это баг.', 'You wanted one thing, the code did another. That is a bug.', 'Ту як чиз мехостӣ, код чизи дигар кард.'),
    q('Зачем язык программирования?', 'Why do we need a programming language?', 'Забони барномасозӣ барои чӣ?', [
      ['Чтобы точно сказать компьютеру, что делать', 'To tell the computer exactly what to do', 'То ба компютер дақиқ гӯӣ, чӣ кунад'],
      ['Чтобы заменить розетку', 'To replace the wall socket', 'То розеткаро иваз кунад'],
      ['Чтобы красить корпус', 'To paint the case', 'То қуттиро ранг кунад'],
      ['Чтобы греть стол', 'To heat the desk', 'То мизро гарм кунад'],
    ], 0, 'Слова языка имеют точный смысл. Компьютер их выполняет.', 'The words have an exact meaning. The computer follows them.', 'Калимаҳо маънои дақиқ доранд. Компютер онҳоро иҷро мекунад.'),
    q('Интерпретатор делает что?', 'What does an interpreter do?', 'Интерпретатор чӣ мекунад?', [
      ['Ломает клавиатуру', 'Breaks the keyboard', 'Клавиатураро мешиканад'],
      ['Читает код и сразу выполняет', 'Reads the code and runs it right away', 'Кодро мехонад ва зуд иҷро мекунад'],
      ['Это видеокарта', 'It is a graphics card', 'Ин видеокарта аст'],
      ['Удаляет Windows', 'Deletes Windows', 'Windows-ро нест мекунад'],
    ], 1, 'Так работает Python: строка за строкой.', 'That is how Python works: line by line.', 'Python ҳамин тавр кор мекунад: сатр ба сатр.'),
  ],
  7: [
    q('let x = 5 значит…', 'let x = 5 means…', 'let x = 5 яъне…', [
      ['Создали сервер', 'You created a server', 'Сервер сохтӣ'],
      ['Создали коробку с именем x, внутри число 5', 'You made a box named x with 5 inside', 'Қуттие бо номи x сохтӣ, дарун адади 5'],
      ['Удалили файл', 'You deleted a file', 'Файлро нест кардӣ'],
      ['Включили экран', 'You turned the screen on', 'Экранро фурӯзон кардӣ'],
    ], 1, 'Переменная — имя для значения. x хранит 5.', 'A variable is a name for a value. x holds 5.', 'Тағйирёбанда ном барои қимат аст. x рақами 5-ро нигоҳ медорад.'),
    q('Как записать слово «привет» в коде?', 'How do you write the word “hello” in code?', 'Калимаи «салом»-ро дар код чӣ гуна менависӣ?', [
      ['В кавычках: "привет"', 'In quotes: "hello"', 'Дар нохунак: "салом"'],
      ['Просто числом 5', 'Just as the number 5', 'Танҳо ҳамчун адади 5'],
      ['Словом true', 'As the word true', 'Бо калимаи true'],
      ['Без ничего, как имя папки', 'With nothing, like a folder name', 'Бе чизе, мисли номи ҷузвдон'],
    ], 0, 'Кавычки делают текст. Без кавычек 5 — это число.', 'Quotes make text. Without quotes, 5 is a number.', 'Нохунак матн месозад. Бе нохунак 5 адад аст.'),
    q('true и false — это…', 'true and false are…', 'true ва false ин…', [
      ['Два цвета', 'Two colors', 'Ду ранг'],
      ['Да и нет', 'Yes and no', 'Ҳа ва не'],
      ['Две папки', 'Two folders', 'Ду ҷузвдон'],
      ['Две видеокарты', 'Two graphics cards', 'Ду видеокарта'],
    ], 1, 'Это ответы «да» и «нет». Их спрашивает if.', 'They mean yes and no. if asks them.', 'Инҳо «ҳа» ва «не». if ҳаминро мепурсад.'),
    q('const name = "Ада". Что нельзя?', 'const name = "Ada". What is not allowed?', 'const name = "Ада". Чӣ кор кардан мумкин нест?', [
      ['Прочитать имя', 'Read the name', 'Номро хондан'],
      ['Поменять это имя на другое', 'Change this name to another one', 'Ин номро ба номи дигар иваз кардан'],
      ['Показать имя на экране', 'Show the name on screen', 'Номро дар экран нишон додан'],
      ['Использовать имя в тексте', 'Use the name in text', 'Номро дар матн истифода бурдан'],
    ], 1, 'const записывают один раз. Потом это имя не переписывают.', 'const is written once. You do not rewrite that name.', 'const-ро як бор менависӣ. Баъд ин номро иваз накун.'),
  ],
  8: [
    q('Код внутри if выполняется когда…', 'The code inside if runs when…', 'Код дар дохили if кай кор мекунад?', [
      ['Всегда, даже если условие ложь', 'Always, even if the condition is false', 'Ҳамеша, ҳатто агар шарт дурӯғ бошад'],
      ['Условие правда', 'The condition is true', 'Шарт рост аст'],
      ['На экране есть обои', 'The screen has wallpaper', 'Дар экран тасвир ҳаст'],
      ['Компьютер выключен', 'The computer is off', 'Компютер хомӯш аст'],
    ], 1, 'if значит «если да». Если нет — этот кусок пропускают.', 'if means “if yes”. If no, that piece is skipped.', 'if яъне «агар ҳа». Агар не — ин қисм гузаронида мешавад.'),
    q('Знак && значит…', 'The sign && means…', 'Аломати && яъне…', [
      ['Хватит одного «да»', 'One “yes” is enough', 'Як «ҳа» кифоя аст'],
      ['Нужны оба «да»', 'You need both to be “yes”', 'Ҳар ду бояд «ҳа» бошанд'],
      ['Это цикл', 'It is a loop', 'Ин цикл аст'],
      ['Это выключение', 'It is shutdown', 'Ин хомӯшкунӣ аст'],
    ], 1, '&& — это «и». Оба условия должны быть правдой.', '&& means “and”. Both conditions must be true.', '&& яъне «ва». Ҳар ду шарт бояд рост бошанд.'),
    q('else — это какая ветка?', 'What branch is else?', 'else кадом шоха аст?', [
      ['«Иначе», если if не сработал', '“Otherwise”, when if did not run', '«Вагарна», агар if кор накард'],
      ['Удаление памяти', 'Deleting memory', 'Нест кардани хотира'],
      ['Новый процессор', 'A new processor', 'Протсессори нав'],
      ['Только файл картинки', 'Only a picture file', 'Танҳо файли акс'],
    ], 0, 'if — если да. else — если нет.', 'if is yes. else is no.', 'if ҳа. else не.'),
    q('Число 5 и текст "5" — это одно и то же?', 'Are the number 5 and the text "5" the same?', 'Адади 5 ва матни "5" як чизанд?', [
      ['Да, всегда', 'Yes, always', 'Ҳа, ҳамеша'],
      ['Нет. 5 === "5" это ложь', 'No. 5 === "5" is false', 'Не. 5 === "5" дурӯғ аст'],
      ['Да, если экран белый', 'Yes, if the screen is white', 'Ҳа, агар экран сафед бошад'],
      ['Они ломают компьютер', 'They break the computer', 'Онҳо компютерро мешикананд'],
    ], 1, 'Три знака равно смотрят и на значение, и на тип.', 'Three equals signs check both the value and the type.', 'Се аломати баробарӣ ҳам қимат ва ҳам намудро месанҷад.'),
  ],
  9: [
    q('Зачем цикл?', 'Why do we use a loop?', 'Цикл барои чӣ?', [
      ['Чтобы повторить одно действие много раз', 'To repeat one action many times', 'То як корро бисёр бор такрор кунӣ'],
      ['Чтобы выключить свет в комнате', 'To turn off the room light', 'То чароғи ҳуҷраро хомӯш кунӣ'],
      ['Чтобы сменить монитор', 'To change the monitor', 'То мониторро иваз кунӣ'],
      ['Чтобы стереть диск', 'To wipe the disk', 'То дискро пок кунӣ'],
    ], 0, 'for и while крутят один и тот же кусок кода.', 'for and while repeat the same piece of code.', 'for ва while як қисми кодро такрор мекунанд.'),
    q('return в функции…', 'return in a function…', 'return дар функсия…', [
      ['Стирает функцию', 'Erases the function', 'Функсияро нест мекунад'],
      ['Отдаёт результат тому, кто вызвал', 'Gives the result back to the caller', 'Натиҷаро ба касе, ки даъват кард, медиҳад'],
      ['Открывает чат', 'Opens a chat', 'Чат мекушояд'],
      ['Выключает экран', 'Turns the screen off', 'Экранро хомӯш мекунад'],
    ], 1, 'return a + b отдаёт сумму наружу.', 'return a + b sends the sum back out.', 'return a + b ҷамъро ба берун медиҳад.'),
    q('i++ значит…', 'i++ means…', 'i++ яъне…', [
      ['Убавить 1', 'Subtract 1', '1 кам кардан'],
      ['Прибавить 1', 'Add 1', '1 зиёд кардан'],
      ['Удалить i', 'Delete i', 'i-ро нест кардан'],
      ['Умножить на 10', 'Multiply by 10', 'Ба 10 зарб кардан'],
    ], 1, 'i++ — это то же самое, что i = i + 1.', 'i++ is the same as i = i + 1.', 'i++ ҳамон i = i + 1 аст.'),
    q('В add(2, 3) числа 2 и 3 — это…', 'In add(2, 3), the numbers 2 and 3 are…', 'Дар add(2, 3) рақамҳои 2 ва 3 ин…', [
      ['Обои', 'Wallpaper', 'Тасвири экран'],
      ['Значения, которые отдали функции', 'Values you gave the function', 'Қиматҳое, ки ба функсия додӣ'],
      ['Названия папок', 'Folder names', 'Номҳои ҷузвдон'],
      ['Порты зарядки', 'Charger ports', 'Портҳои зарядка'],
    ], 1, 'Их называют аргументами. Внутри функции это a и b.', 'They are called arguments. Inside the function they are a and b.', 'Онҳоро аргумент мегӯянд. Дар дохил a ва b мешаванд.'),
  ],
  10: [
    q('Браузер — это программа, которая…', 'A browser is a program that…', 'Браузер барномаест, ки…', [
      ['Показывает сайты', 'Shows websites', 'Сомонаҳоро нишон медиҳад'],
      ['Является блоком питания', 'Is the power supply', 'Блоки барқ аст'],
      ['Хранит все файлы диска сама', 'Stores every disk file by itself', 'Худаш ҳамаи файлҳои дискро нигоҳ медорад'],
      ['Заменяет процессор', 'Replaces the processor', 'Протсессорро иваз мекунад'],
    ], 0, 'Ты пишешь адрес. Браузер просит страницу и рисует её.', 'You type an address. The browser asks for the page and draws it.', 'Суроға менависӣ. Браузер саҳифаро меорад ва мекашад.'),
    q('HTML говорит о странице…', 'HTML tells us about the page…', 'HTML дар бораи саҳифа мегӯяд…', [
      ['Какого она цвета', 'What color it is', 'Чӣ ранг дорад'],
      ['Из каких частей она состоит: заголовок, текст, кнопка', 'What parts it has: title, text, button', 'Аз кадом қисмҳо: сарлавҳа, матн, тугма'],
      ['Какой у неё пароль', 'What its password is', 'Рамзаш чист'],
      ['Сколько в ней электричества', 'How much electricity it has', 'Чӣ қадар барқ дорад'],
    ], 1, 'HTML — из чего страница. CSS — как выглядит. JS — что происходит по клику.', 'HTML is what the page is. CSS is how it looks. JS is what happens on click.', 'HTML чист. CSS чӣ гуна менамояд. JS ҳангоми клик чӣ мешавад.'),
    q('DOM — это…', 'The DOM is…', 'DOM ин…', [
      ['Дерево частей страницы в браузере', 'The tree of page parts in the browser', 'Дарахти қисмҳои саҳифа дар браузер'],
      ['Видеокарта', 'A graphics card', 'Видеокарта'],
      ['Пароль Wi‑Fi', 'The Wi‑Fi password', 'Рамзи Wi‑Fi'],
      ['Зарядка', 'A charger', 'Зарядка'],
    ], 0, 'Браузер строит это дерево из HTML и по нему рисует.', 'The browser builds this tree from HTML and paints from it.', 'Браузер ин дарахтро аз HTML месозад ва аз он мекашад.'),
    q('Буква s в https значит…', 'The letter s in https means…', 'Ҳарфи s дар https яъне…', [
      ['Сайт — это игра', 'The site is a game', 'Сомона бозӣ аст'],
      ['Связь с сайтом защищена', 'The link to the site is protected', 'Пайванд бо сомона ҳифз шудааст'],
      ['На странице только картинки', 'The page has only pictures', 'Дар саҳифа танҳо акс'],
      ['Страница сломана', 'The page is broken', 'Саҳифа шикастааст'],
    ], 1, 'https прячет данные между тобой и сайтом.', 'https hides data between you and the site.', 'https маълумотро байни ту ва сомона пинҳон мекунад.'),
  ],
  11: [
    q('Тег h1 на странице — это…', 'The h1 tag on a page is…', 'Теги h1 дар саҳифа ин…', [
      ['Главный заголовок', 'The main title', 'Сарлавҳаи асосӣ'],
      ['Картинка', 'A picture', 'Акс'],
      ['Пароль', 'A password', 'Рамз'],
      ['Таблица в базе', 'A database table', 'Ҷадвал дар пойгоҳ'],
    ], 0, 'h1 — самая важная надпись. Не ставь десять h1 без смысла.', 'h1 is the most important title.', 'h1 муҳимтарин сарлавҳа аст.'),
    q('Текст, который видит человек, кладут в…', 'Text a person sees goes in…', 'Матне, ки одам мебинад, дар … мегузоранд', [
      ['head', 'head', 'head'],
      ['body', 'body', 'body'],
      ['зарядку', 'the charger', 'зарядка'],
      ['процессор', 'the processor', 'протсессор'],
    ], 1, 'head — служебное, его не видно как основной текст. body — то, что на экране.', 'head is hidden info. body is what you see.', 'head пинҳон. body он чизест, ки мебинӣ.'),
    q('Абзац открыли тегом <p>. Чем закрыть?', 'You opened a paragraph with <p>. How do you close it?', 'Банд бо <p> кушода шуд. Бо чӣ мепӯшӣ?', [
      ['</p>', '</p>', '</p>'],
      ['<конец>', '<end>', '<охир>'],
      ['<зарядка>', '<charger>', '<зарядка>'],
      ['Ничем, страница сама поймёт', 'Nothing, the page will guess', 'Бо ҳеҷ чиз, саҳифа худаш мефаҳмад'],
    ], 0, 'Открыл <p> — закрой </p>.', 'Open <p>, close </p>.', '<p> кушодӣ — </p> пӯш.'),
    q('Строка <!DOCTYPE html> в начале файла говорит…', 'The line <!DOCTYPE html> at the start says…', 'Сатри <!DOCTYPE html> дар оғоз мегӯяд…', [
      ['Какой пароль у пользователя', 'The user’s password', 'Рамзи корбар чист'],
      ['Что это обычная HTML-страница', 'That this is a normal HTML page', 'Ки ин саҳифаи оддии HTML аст'],
      ['Сколько памяти в компьютере', 'How much memory the computer has', 'Чӣ қадар хотира дорад'],
      ['Как зовут видеокарту', 'The graphics card name', 'Номи видеокарта чист'],
    ], 1, 'Эту строку пишут в самом верху файла страницы.', 'You write this line at the very top of the page file.', 'Ин сатрро дар болои файл менависӣ.'),
  ],
  12: [
    q('Тег ссылки <a> делает что?', 'What does the link tag <a> do?', 'Теги пайванд <a> чӣ мекунад?', [
      ['По нажатию переходит на другой адрес', 'On click it goes to another address', 'Ҳангоми пахш ба суроғаи дигар меравад'],
      ['Включает питание', 'Turns the power on', 'Барқро мегиронад'],
      ['Считает процессор', 'Counts the processor', 'Протсессорро мешуморад'],
      ['Удаляет папку', 'Deletes a folder', 'Ҷузвдонро нест мекунад'],
    ], 0, 'href — куда идти. Текст внутри — что написано на ссылке.', 'href is where you go. The text inside is what the link says.', 'href куҷо меравӣ. Матни дарун он чизест, ки дар пайванд навишта шудааст.'),
    q('<ul> на странице — это…', '<ul> on a page is…', '<ul> дар саҳифа ин…', [
      ['Список с точками', 'A list with dots', 'Рӯйхат бо нуқтаҳо'],
      ['Зарядка', 'A charger', 'Зарядка'],
      ['Одна большая картинка', 'One big picture', 'Як аксӣ калон'],
      ['Пароль', 'A password', 'Рамз'],
    ], 0, 'ul — весь список. li — один пункт.', 'ul is the whole list. li is one item.', 'ul тамоми рӯйхат. li як банд.'),
    q('Поле <input> нужно чтобы…', 'An <input> field is for…', 'Майдони <input> барои…', [
      ['Человек мог вписать текст', 'A person to type text', 'Одам матн нависад'],
      ['Охлаждать компьютер', 'Cooling the computer', 'Хунук кардани компютер'],
      ['Хранить фильм на диске', 'Storing a movie on disk', 'Нигоҳ доштани филм дар диск'],
      ['Включать розетку', 'Turning on a wall socket', 'Гирондани розетка'],
    ], 0, 'Это поле для имени, пароля или поиска.', 'It is a field for a name, a password or a search.', 'Ин майдон барои ном, рамз ё ҷустуҷӯ.'),
    q('Внизу сайта в footer обычно пишут…', 'At the bottom of a site, the footer usually has…', 'Дар поёни сомона, дар footer, одатан менависанд…', [
      ['Температуру процессора', 'The processor temperature', 'Ҳарорати протсессор'],
      ['Копирайт и мелкие ссылки', 'Copyright and small links', 'Ҳуқуқ ва пайвандҳои хурд'],
      ['Пароль от BIOS', 'The BIOS password', 'Рамзи BIOS'],
      ['Размер батарейки', 'The battery size', 'Андозаи батарея'],
    ], 1, 'Сверху шапка, посередине главное, снизу подвал.', 'Top is the header, middle is the main part, bottom is the footer.', 'Боло сар, мобайн асос, поён пой.'),
  ],
  13: [
    q('CSS меняет…', 'CSS changes…', 'CSS чӣро иваз мекунад?', [
      ['Как страница выглядит: цвет, размер, отступы', 'How the page looks: color, size, space', 'Саҳифа чӣ гуна менамояд: ранг, андоза, фосила'],
      ['Пароль от Wi‑Fi', 'The Wi‑Fi password', 'Рамзи Wi‑Fi'],
      ['Количество электричества', 'The amount of electricity', 'Миқдори барқ'],
      ['Имя процессора', 'The processor name', 'Номи протсессор'],
    ], 0, 'HTML говорит, что это за часть. CSS говорит, какого она цвета.', 'HTML says what the part is. CSS says what color it is.', 'HTML мегӯяд ин чӣ қисм аст. CSS мегӯяд чӣ ранг дорад.'),
    q('padding — это пустое место…', 'padding is empty space…', 'padding ҷои холӣ …', [
      ['Внутри блока, вокруг текста', 'Inside the box, around the text', 'Дар дохили блок, гирди матн'],
      ['Только снаружи, до соседа', 'Only outside, toward the neighbor', 'Танҳо берун, то ҳамсоя'],
      ['В розетке', 'In the wall socket', 'Дар розетка'],
      ['На диске', 'On the disk', 'Дар диск'],
    ], 0, 'padding внутри. margin снаружи, между блоками.', 'padding is inside. margin is outside, between boxes.', 'padding дарун. margin берун, байни блокҳо.'),
    q('Класс карточки в CSS пишут так…', 'A card class in CSS is written…', 'Синфи корт дар CSS чунин навишта мешавад…', [
      ['.card', '.card', '.card'],
      ['#card', '#card', '#card'],
      ['<card>', '<card>', '<card>'],
      ['card()', 'card()', 'card()'],
    ], 0, 'Точка — класс для многих блоков. Решётка # — один id.', 'A dot is a class for many boxes. # is one id.', 'Нуқта синф барои бисёр блок. # як id.'),
    q('margin отодвигает блок…', 'margin pushes a box…', 'margin блокро … мебарад', [
      ['От соседних блоков', 'Away from the neighboring boxes', 'Аз блокҳои ҳамсоя'],
      ['Внутрь текста', 'Into the text', 'Ба даруни матн'],
      ['В базу данных', 'Into the database', 'Ба пойгоҳи додаҳо'],
      ['В зарядку', 'Into the charger', 'Ба зарядка'],
    ], 0, 'margin — зазор между блоками.', 'margin is the gap between boxes.', 'margin фосилаи байни блокҳост.'),
  ],
  14: [
    q('display: flex нужен чтобы…', 'display: flex is used to…', 'display: flex барои…', [
      ['Поставить блоки в ряд или в колонку', 'Put boxes in a row or a column', 'Блокҳоро ба қатор ё сутун гузоштан'],
      ['Включить питание', 'Turn the power on', 'Барқро гирондан'],
      ['Удалить сайт', 'Delete the site', 'Сомонаро нест кардан'],
      ['Сменить пароль Windows', 'Change the Windows password', 'Рамзи Windows-ро иваз кардан'],
    ], 0, 'Flex выстраивает кнопки и карточки ровно.', 'Flex lines buttons and cards up neatly.', 'Flex тугма ва кортҳоро рост мегузорад.'),
    q('@media нужен чтобы…', '@media is used to…', '@media барои…', [
      ['На телефоне страница не разъезжалась', 'The page does not break on a phone', 'Дар телефон саҳифа нашаканад'],
      ['Печатать процессор', 'Print the processor', 'Протсессорро чоп кардан'],
      ['Выключить интернет', 'Turn the internet off', 'Интернетро хомӯш кардан'],
      ['Увеличить батарею', 'Make the battery bigger', 'Батареяро калон кардан'],
    ], 0, 'На узком экране колонки можно поставить одна под другой.', 'On a narrow screen you can stack the columns.', 'Дар экрани танг сутунҳоро зери ҳам мегузорӣ.'),
    q('1fr в сетке значит…', '1fr in a grid means…', '1fr дар тӯр яъне…', [
      ['Один кусок свободного места', 'One share of the free space', 'Як ҳиссаи ҷои холӣ'],
      ['Один файл на диске', 'One file on the disk', 'Як файл дар диск'],
      ['Одну ошибку', 'One mistake', 'Як хато'],
      ['Один бит', 'One bit', 'Як бит'],
    ], 0, '1fr и 1fr — две равные колонки.', '1fr and 1fr are two equal columns.', '1fr ва 1fr ду сутуни баробар.'),
    q('gap ставит…', 'gap sets…', 'gap чӣ мегузорад?', [
      ['Одинаковый промежуток между блоками', 'An even gap between boxes', 'Фосилаи баробар байни блокҳо'],
      ['Громкость колонок', 'Speaker volume', 'Баландии баландгӯяк'],
      ['Скорость процессора', 'Processor speed', 'Суръати протсессор'],
      ['Пароль', 'A password', 'Рамз'],
    ], 0, 'gap — дырка между карточками, без лишних margin.', 'gap is the hole between cards, without extra margin.', 'gap сӯрохи байни кортҳост.'),
  ],
  15: [
    q('transition делает изменение…', 'transition makes a change…', 'transition тағйиротро … мекунад', [
      ['Плавным, не резким', 'Smooth, not sudden', 'Нарм, на ногаҳон'],
      ['Мгновенным всегда', 'Always instant', 'Ҳамеша фаврӣ'],
      ['Только на бумаге', 'Only on paper', 'Танҳо дар коғаз'],
      ['Только в базе данных', 'Only in the database', 'Танҳо дар пойгоҳ'],
    ], 0, 'Например кнопка мягко меняет цвет, когда на неё навели.', 'For example a button softly changes color when you hover.', 'Масалан тугма ҳангоми боло омадан нарм ранг иваз мекунад.'),
    q('box-shadow рисует…', 'box-shadow draws…', 'box-shadow чӣ мекашад?', [
      ['Тень или лёгкое свечение вокруг блока', 'A shadow or a soft glow around the box', 'Соя ё нури нарм гирди блок'],
      ['Новый процессор', 'A new processor', 'Протсессори нав'],
      ['Пароль', 'A password', 'Рамз'],
      ['Файл на диске', 'A file on the disk', 'Файл дар диск'],
    ], 0, 'Лёгкая тень показывает, что карточка чуть выше страницы.', 'A light shadow shows the card sits a bit above the page.', 'Сояи сабук нишон медиҳад, ки корт каме болотар аз саҳифа аст.'),
    q('Анимация на сайте не должна…', 'Animation on a site should not…', 'Аниматсия дар сомона набояд…', [
      ['Мешать читать и нажимать кнопку', 'Block reading and pressing a button', 'Хондан ва пахши тугмаро халал расонад'],
      ['Быть короткой', 'Be short', 'Кӯтоҳ бошад'],
      ['Быть на кнопке', 'Be on a button', 'Дар тугма бошад'],
      ['Плавно двигаться', 'Move smoothly', 'Нарм ҳаракат кунад'],
    ], 0, 'Красиво — хорошо. Если кнопку не нажать, это уже плохо.', 'Pretty is good. If you cannot press the button, that is bad.', 'Зебо хуб аст. Агар тугма пахш нашавад, ин бад аст.'),
    q('Эффект стекла на карточке — это…', 'The glass look on a card is…', 'Намуди шиша дар корт ин…', [
      ['Чуть прозрачный фон и размытие сзади', 'A slightly see-through background and blur behind', 'Заминаи каме шаффоф ва хира аз пушт'],
      ['Новая оперативная память', 'New RAM', 'RAM-и нав'],
      ['Формат диска', 'A disk format', 'Формати диск'],
      ['Выключение экрана', 'Turning the screen off', 'Хомӯш кардани экран'],
    ], 0, 'Сзади размыто, карточка полупрозрачная — как стекло.', 'The back is blurred and the card is partly clear, like glass.', 'Пушт хира, корт нимшаффоф — мисли шиша.'),
  ],
  16: [
    q('JavaScript на странице нужен чтобы…', 'JavaScript on a page is needed to…', 'JavaScript дар саҳифа барои…', [
      ['Реагировать на клик и менять текст', 'React to a click and change the text', 'Ба клик ҷавоб додан ва матнро иваз кардан'],
      ['Только выбрать цвет в CSS', 'Only pick a color in CSS', 'Танҳо ранг дар CSS интихоб кардан'],
      ['Дать электричество', 'Give electricity', 'Барқ додан'],
      ['Заменить клавиатуру', 'Replace the keyboard', 'Клавиатураро иваз кардан'],
    ], 0, 'HTML — что есть на странице. JS — что происходит, когда нажали.', 'HTML is what is on the page. JS is what happens when you click.', 'HTML чист дар саҳифа. JS ҳангоми пахш чӣ мешавад.'),
    q('Клик по кнопке — это…', 'A click on a button is…', 'Клик ба тугма ин…', [
      ['Событие, которое можно послушать', 'An event you can listen for', 'Ҳодисае, ки гӯш кардан мумкин'],
      ['Новый файл на диске', 'A new file on the disk', 'Файли нав дар диск'],
      ['Выключение компьютера', 'Turning the computer off', 'Хомӯш кардани компютер'],
      ['Смена обоев Windows', 'Changing the Windows wallpaper', 'Иваз кардани тасвири Windows'],
    ], 0, 'addEventListener("click") ждёт именно этот клик.', 'addEventListener("click") waits for that click.', 'addEventListener("click") ҳамин кликро интизор мешавад.'),
    q('textContent меняет…', 'textContent changes…', 'textContent чӣро иваз мекунад?', [
      ['Текст, который виден на странице', 'The text you can see on the page', 'Матне, ки дар саҳифа дида мешавад'],
      ['Скорость процессора', 'Processor speed', 'Суръати протсессор'],
      ['Пароль роутера', 'The router password', 'Рамзи роутер'],
      ['Размер диска', 'The disk size', 'Андозаи диск'],
    ], 0, 'Нашёл надпись и записал в неё новый текст.', 'Find the label and put new text in it.', 'Навиштаро ёфтӣ ва матни нав гузоштӣ.'),
    q('let count = 0 на странице хранит…', 'let count = 0 on a page stores…', 'let count = 0 дар саҳифа чӣро нигоҳ медорад?', [
      ['Сколько раз уже нажали', 'How many times you already clicked', 'Чанд бор аллакай пахш кардӣ'],
      ['Адрес дома', 'A home address', 'Суроғаи хона'],
      ['Цвет зарядки', 'The charger color', 'Ранги зарядка'],
      ['Имя видеокарты', 'The graphics card name', 'Номи видеокарта'],
    ], 0, 'Это память страницы. Каждый клик прибавляет 1.', 'This is the page’s memory. Each click adds 1.', 'Ин хотираи саҳифа аст. Ҳар клик 1 илова мекунад.'),
  ],
  17: [
    q('querySelector("#email") ищет…', 'querySelector("#email") looks for…', 'querySelector("#email") чӣро меҷӯяд?', [
      ['Поле, у которого id равен email', 'The field whose id is email', 'Майдоне, ки id-аш email аст'],
      ['Файл на диске с именем email', 'A disk file named email', 'Файл дар диск бо номи email'],
      ['Пароль Windows', 'The Windows password', 'Рамзи Windows'],
      ['Видеокарту', 'The graphics card', 'Видеокарта'],
    ], 0, 'Решётка # значит: найди этот id. Если нет — получишь null.', '# means: find this id. If it is missing, you get null.', '# яъне: ин id-ро ёб. Агар нест — null мегирӣ.'),
    q('value у поля — это…', 'A field’s value is…', 'value-и майдон ин…', [
      ['Текст, который человек вписал', 'The text the person typed', 'Матне, ки одам навишт'],
      ['Цвет рамки', 'The border color', 'Ранги чаҳорчӯба'],
      ['Громкость', 'The volume', 'Баландӣ'],
      ['Заряд батареи', 'The battery charge', 'Заряди батарея'],
    ], 0, 'Не угадывай, что вписали. Прочитай value.', 'Do not guess what they typed. Read value.', 'Тахмин накун. value-ро хон.'),
    q('Обычная кнопка «Отправить» у формы может…', 'A normal “Submit” button on a form can…', 'Тугмаи оддии «Фиристодан» дар форма метавонад…', [
      ['Перезагрузить страницу', 'Reload the page', 'Саҳифаро аз нав кушояд'],
      ['Стереть диск', 'Wipe the disk', 'Дискро пок кунад'],
      ['Выключить CSS навсегда', 'Turn CSS off forever', 'CSS-ро абадӣ хомӯш кунад'],
      ['Сменить процессор', 'Change the processor', 'Протсессорро иваз кунад'],
    ], 0, 'preventDefault() оставляет тебя на странице.', 'preventDefault() keeps you on the page.', 'preventDefault() туро дар саҳифа нигоҳ медорад.'),
    q('Если querySelector вернул null, это значит…', 'If querySelector returns null, it means…', 'Агар querySelector null баргардонад, ин яъне…', [
      ['Такого элемента на странице нет', 'That element is not on the page', 'Чунин элемент дар саҳифа нест'],
      ['Всё отлично, элемент найден', 'All good, the element was found', 'Ҳама хуб, элемент ёфт шуд'],
      ['Интернет выключен', 'The internet is off', 'Интернет хомӯш аст'],
      ['Тебе дали 100 очков', 'You got 100 points', 'Ба ту 100 хол доданд'],
    ], 0, 'Сначала проверь, что элемент есть. Потом читай value.', 'First check the element exists. Then read value.', 'Аввал санҷ, ки элемент ҳаст. Баъд value хон.'),
  ],
  18: [
    q('Пока игра идёт, она снова и снова…', 'While a game runs, it again and again…', 'То бозӣ давом дорад, вай боз ва боз…', [
      ['Читает кнопки, двигает героя и рисует кадр', 'Reads the keys, moves the hero and draws a frame', 'Тугмаҳоро мехонад, қаҳрамонро меҷунбонад ва кадр мекашад'],
      ['Ставит Windows', 'Installs Windows', 'Windows насб мекунад'],
      ['Форматирует диск', 'Formats the disk', 'Дискро формат мекунад'],
      ['Меняет обои', 'Changes the wallpaper', 'Тасвири экранро иваз мекунад'],
    ], 0, 'Это игровой цикл: ввод, движение, удар, рисунок.', 'This is the game loop: input, move, hit, draw.', 'Ин сикли бозӣ: вуруд, ҳаракат, зарба, кашидан.'),
    q('Очки в игре — это…', 'The score in a game is…', 'Ҳисоб дар бозӣ ин…', [
      ['Число, которое растёт, когда собрал монету', 'A number that grows when you collect a coin', 'Ададе, ки ҳангоми гирифтани танга меафзояд'],
      ['Отдельный компьютер', 'A separate computer', 'Компютери алоҳида'],
      ['Цвет фона', 'The background color', 'Ранги замина'],
      ['Пароль', 'A password', 'Рамз'],
    ], 0, 'score — обычное число в памяти игры.', 'score is a normal number in the game’s memory.', 'score адади оддӣ дар хотираи бозӣ аст.'),
    q('В простой игре героя двигают…', 'In a simple game the hero is moved by…', 'Дар бозии осон қаҳрамонро … ҳаракат медиҳад', [
      ['Клавиши', 'The keys', 'Клавишҳо'],
      ['Блок питания', 'The power supply', 'Блоки барқ'],
      ['Файл обоев', 'The wallpaper file', 'Файли тасвир'],
      ['Почта', 'Email', 'Почта'],
    ], 0, 'Нажал стрелку — герой сдвинулся.', 'Press an arrow and the hero moves.', 'Тирро пахш кардӣ — қаҳрамон ҳаракат кард.'),
    q('Если каждый кадр не закрашивать фон…', 'If you do not paint the background every frame…', 'Агар ҳар кадр заминаро ранг накунӣ…', [
      ['Старый герой остаётся следом', 'The old hero stays as a trail', 'Қаҳрамони кӯҳна пай мемонад'],
      ['Игра сама ускоряется правильно', 'The game correctly speeds up by itself', 'Бозӣ худаш дуруст тез мешавад'],
      ['Диск стирается', 'The disk is erased', 'Диск пок мешавад'],
      ['Экран выключается', 'The screen turns off', 'Экран хомӯш мешавад'],
    ], 0, 'Сначала закрась фон, потом нарисуй героя заново.', 'Paint the background first, then draw the hero again.', 'Аввал заминаро ранг кун, баъд қаҳрамонро аз нав каш.'),
  ],
  19: [
    q('На холсте точка (0, 0) находится…', 'On the canvas, point (0, 0) is…', 'Дар холст нуқтаи (0, 0) дар куҷост?', [
      ['В левом верхнем углу', 'In the top-left corner', 'Дар кунҷи чапи боло'],
      ['В центре', 'In the center', 'Дар марказ'],
      ['В правом нижнем углу', 'In the bottom-right corner', 'Дар кунҷи рости поён'],
      ['За экраном', 'Behind the screen', 'Дар паси экран'],
    ], 0, 'Вправо число x больше. Вниз число y больше.', 'To the right, x is bigger. Down, y is bigger.', 'Ба рост x калонтар. Ба поён y калонтар.'),
    q('Число y на холсте растёт…', 'On the canvas, y grows…', 'Дар холст y ба куҷо меафзояд?', [
      ['Вниз', 'Down', 'Ба поён'],
      ['Вверх, как в тетради', 'Up, like in a school notebook', 'Ба боло, мисли дафтар'],
      ['Только влево', 'Only to the left', 'Танҳо ба чап'],
      ['По кругу', 'In a circle', 'Дар гирд'],
    ], 0, 'Это не школьная тетрадь. Ноль сверху, не снизу.', 'This is not a school graph. Zero is at the top, not the bottom.', 'Ин дафтари мактаб нест. Сифр боло аст, на поён.'),
    q('fillRect рисует…', 'fillRect draws…', 'fillRect чӣ мекашад?', [
      ['Прямоугольник', 'A rectangle', 'Росткунҷа'],
      ['Звук', 'A sound', 'Садо'],
      ['Пароль', 'A password', 'Рамз'],
      ['Папку', 'A folder', 'Ҷузвдон'],
    ], 0, 'fillRect(x, y, ширина, высота). Цвет задаёт fillStyle.', 'fillRect(x, y, width, height). fillStyle sets the color.', 'fillRect(x, y, паҳно, баландӣ). Рангро fillStyle медиҳад.'),
    q('getContext("2d") даёт…', 'getContext("2d") gives you…', 'getContext("2d") ба ту чӣ медиҳад?', [
      ['Кисть, которой рисуют на холсте', 'The brush you draw on the canvas with', 'Қалме, ки бо он дар холст мекашӣ'],
      ['Новую Windows', 'A new Windows', 'Windows-и нав'],
      ['Доступ к розетке', 'Access to the wall socket', 'Дастрасӣ ба розетка'],
      ['Список паролей', 'A list of passwords', 'Рӯйхати рамзҳо'],
    ], 0, 'Этой кистью вызывают fillRect и круг.', 'With that brush you call fillRect and a circle.', 'Бо ин қалм fillRect ва доираро мехонӣ.'),
  ],
  20: [
    q('vx у героя — это…', 'A hero’s vx is…', 'vx-и қаҳрамон ин…', [
      ['Скорость влево или вправо', 'Speed left or right', 'Суръат ба чап ё рост'],
      ['Цвет героя', 'The hero’s color', 'Ранги қаҳрамон'],
      ['Имя файла', 'A file name', 'Номи файл'],
      ['Пароль уровня', 'The level password', 'Рамзи сатҳ'],
    ], 0, 'Каждый кадр: x = x + vx.', 'Every frame: x = x + vx.', 'Ҳар кадр: x = x + vx.'),
    q('Два квадрата столкнулись, если…', 'Two squares hit each other if…', 'Ду квадрат бархӯрд мекунанд, агар…', [
      ['Они наложились друг на друга', 'They overlap each other', 'Онҳо рӯйи ҳам омаданд'],
      ['У них одинаковый цвет', 'They have the same color', 'Ранги онҳо як аст'],
      ['Игрок нажал пробел', 'The player pressed space', 'Бозигар пробелро пахш кард'],
      ['На диске мало места', 'The disk is low on space', 'Дар диск ҷо кам аст'],
    ], 0, 'Смотрят пересечение по x и по y.', 'You check the overlap on x and on y.', 'Буришро дар x ва дар y месанҷӣ.'),
    q('requestAnimationFrame нужен чтобы…', 'requestAnimationFrame is used to…', 'requestAnimationFrame барои…', [
      ['Рисовать следующий кадр плавно', 'Draw the next frame smoothly', 'Кадри навбатиро нарм кашидан'],
      ['Установить Windows', 'Install Windows', 'Windows насб кардан'],
      ['Сменить пароль', 'Change the password', 'Рамзро иваз кардан'],
      ['Выключить экран', 'Turn the screen off', 'Экранро хомӯш кардан'],
    ], 0, 'Браузер сам зовёт твою функцию перед новым кадром.', 'The browser calls your function before the next frame.', 'Браузер функсияи туро пеш аз кадри нав даъват мекунад.'),
    q('Герой взял монету. Что делают в коде?', 'The hero took a coin. What do you do in code?', 'Қаҳрамон танга гирифт. Дар код чӣ мекунӣ?', [
      ['Прибавляют очки и убирают монету', 'Add points and remove the coin', 'Ҳол илова мекунӣ ва тангаро мебардорӣ'],
      ['Удаляют всю страницу', 'Delete the whole page', 'Тамоми саҳифаро нест мекунӣ'],
      ['Выключают компьютер', 'Turn the computer off', 'Компютерро хомӯш мекунӣ'],
      ['Меняют язык Windows', 'Change the Windows language', 'Забони Windows-ро иваз мекунӣ'],
    ], 0, 'score становится больше. Монета появляется в новом месте.', 'score goes up. The coin appears in a new place.', 'score зиёд мешавад. Танга дар ҷои нав пайдо мешавад.'),
  ],
  21: [
    q('Экран «игра окончена» показывают когда…', 'The “game over” screen is shown when…', 'Экрани «бозӣ тамом» кай нишон дода мешавад?', [
      ['Жизни кончились', 'The lives are gone', 'Ҷонҳо тамом шуданд'],
      ['Загрузился цвет фона', 'The background color loaded', 'Ранги замина бор шуд'],
      ['Открыли папку', 'You opened a folder', 'Ҷузвдонро кушодӣ'],
      ['Нажали одну стрелку', 'You pressed one arrow', 'Як тирро пахш кардӣ'],
    ], 0, 'hp стало 0 или меньше — это конец.', 'hp is 0 or less. That is the end.', 'hp 0 ё камтар шуд — ин охир аст.'),
    q('Кнопка «заново» должна…', 'The “again” button should…', 'Тугмаи «аз нав» бояд…', [
      ['Вернуть очки, жизни и врагов к началу', 'Put score, lives and enemies back to the start', 'Ҳол, ҷон ва душманҳоро ба оғоз баргардонад'],
      ['Удалить твой аккаунт', 'Delete your account', 'Ҳисоби туро нест кунад'],
      ['Сломать холст навсегда', 'Break the canvas forever', 'Холстро абадӣ шиканад'],
      ['Выключить клавиатуру', 'Turn the keyboard off', 'Клавиатураро хомӯш кунад'],
    ], 0, 'Это новые числа в игре, не перезагрузка всего компьютера.', 'These are new numbers in the game, not a restart of the whole computer.', 'Ин ададҳои нав дар бозӣ, на аз нав оғоз шудани тамоми компютер.'),
    q('После удара герою дают короткое время, когда его нельзя бить. Зачем?', 'After a hit the hero gets a short time when he cannot be hit. Why?', 'Пас аз зарба ба қаҳрамон вақти кӯтоҳ медиҳанд, ки зада наметавонанд. Барои чӣ?', [
      ['Чтобы за один кадр не снять все жизни', 'So one frame does not take all the lives', 'То дар як кадр ҳамаи ҷонҳо нараванд'],
      ['Чтобы ускорить процессор', 'To speed up the processor', 'То протсессор тез шавад'],
      ['Чтобы стереть диск', 'To wipe the disk', 'То диск пок шавад'],
      ['Чтобы сменить обои', 'To change the wallpaper', 'То тасвир иваз шавад'],
    ], 0, 'Иначе враг касается каждый кадр и жизни падают сразу.', 'Otherwise the enemy touches every frame and the lives drop at once.', 'Вагарна душман ҳар кадр мерасад ва ҷонҳо якбора меафтанд.'),
    q('Звук в браузере обычно начинается…', 'Sound in the browser usually starts…', 'Садо дар браузер одатан оғоз мешавад…', [
      ['После клика или клавиши', 'After a click or a key', 'Пас аз клик ё клавиш'],
      ['Сам, ещё до открытия страницы', 'By itself, before the page opens', 'Худ, ҳанӯз пеш аз кушодани саҳифа'],
      ['Из блока питания', 'From the power supply', 'Аз блоки барқ'],
      ['Только если выключить экран', 'Only if you turn the screen off', 'Танҳо агар экранро хомӯш кунӣ'],
    ], 0, 'Браузер ждёт, пока человек нажмёт. Сам звук не включает.', 'The browser waits until a person clicks. It does not start sound alone.', 'Браузер то пахши одам интизор мешавад. Худаш садоро намегиронад.'),
  ],
  22: [
    q('print("Привет") в Python…', 'print("Hello") in Python…', 'print("Салом") дар Python…', [
      ['Показывает текст в консоли', 'Shows text in the console', 'Матнро дар консол нишон медиҳад'],
      ['Красит кнопку на сайте', 'Paints a button on a site', 'Тугмаро дар сомона ранг мекунад'],
      ['Выключает компьютер', 'Turns the computer off', 'Компютерро хомӯш мекунад'],
      ['Создаёт папку Windows', 'Creates a Windows folder', 'Ҷузвдони Windows месозад'],
    ], 0, 'print пишет слова, которые ты видишь в выводе.', 'print writes the words you see in the output.', 'print калимаҳоеро менависад, ки дар натиҷа мебинӣ.'),
    q('В Python новый блок кода сдвигают…', 'In Python a new block of code is moved…', 'Дар Python блоки нави кодро … мебаранд', [
      ['Вправо пробелами', 'To the right with spaces', 'Ба рост бо фосилаҳо'],
      ['Только точкой с запятой', 'Only with a semicolon', 'Танҳо бо нуқта-вергул'],
      ['В другой файл обязательно', 'Into another file, always', 'Ҳатман ба файли дигар'],
      ['На экран мышкой', 'Onto the screen with the mouse', 'Ба экран бо муш'],
    ], 0, 'После двоеточия следующая строка обычно на 4 пробела правее.', 'After a colon, the next line is usually 4 spaces to the right.', 'Баъди : сатри навбатӣ одатан 4 фосила ба рост.'),
    q('name = "Ада" кладёт…', 'name = "Ada" puts…', 'name = "Ада" чӣ мегузорад?', [
      ['Текст в переменную name', 'Text into the variable name', 'Матнро ба тағйирёбандаи name'],
      ['Файл на рабочий стол', 'A file on the desktop', 'Файлро ба мизи корӣ'],
      ['Пароль в браузер', 'A password into the browser', 'Рамзро ба браузер'],
      ['Картинку на экран', 'A picture on the screen', 'Аксро ба экран'],
    ], 0, 'Кавычки — это текст. Без кавычек было бы число.', 'Quotes mean text. Without quotes it would be a number.', 'Нохунак матн аст. Бе нохунак адад мебуд.'),
    q('Комментарий, который Python не выполняет, начинается с…', 'A comment that Python does not run starts with…', 'Шарҳе, ки Python иҷро намекунад, бо … оғоз мешавад', [
      ['#', '#', '#'],
      ['//', '//', '//'],
      ['<p>', '<p>', '<p>'],
      ['???', '???', '???'],
    ], 0, '# Python пропускает. // — это уже стиль JavaScript.', 'Python skips #. // is the JavaScript style.', 'Python # -ро мегузаронад. // услуби JavaScript аст.'),
  ],
  23: [
    q('range(3) даёт числа…', 'range(3) gives the numbers…', 'range(3) ададҳои … медиҳад', [
      ['0, 1 и 2', '0, 1 and 2', '0, 1 ва 2'],
      ['1, 2 и 3', '1, 2 and 3', '1, 2 ва 3'],
      ['Только 3', 'Only 3', 'Танҳо 3'],
      ['Все числа до бесконечности', 'Every number to infinity', 'Ҳамаи ададҳо то беохир'],
    ], 0, 'Счёт начинается с 0 и останавливается перед 3.', 'Counting starts at 0 and stops before 3.', 'Ҳисоб аз 0 оғоз мешавад ва пеш аз 3 меистад.'),
    q('Слово def создаёт…', 'The word def creates…', 'Калимаи def чӣ месозад?', [
      ['Функцию', 'A function', 'Функсия'],
      ['Папку на диске', 'A folder on the disk', 'Ҷузвдон дар диск'],
      ['Кнопку на сайте', 'A button on a site', 'Тугма дар сомона'],
      ['Новый Windows', 'A new Windows', 'Windows-и нав'],
    ], 0, 'def add(a, b): потом внутри return a + b.', 'def add(a, b): then inside, return a + b.', 'def add(a, b): баъд дарун return a + b.'),
    q('else в Python стоит рядом с…', 'In Python, else sits next to…', 'Дар Python else дар назди … меистад', [
      ['if. Это путь «иначе»', 'if. It is the “otherwise” path', 'if. Ин роҳи «вагарна»'],
      ['Только с зарядкой', 'Only with a charger', 'Танҳо бо зарядка'],
      ['Только с тегом <p>', 'Only with the <p> tag', 'Танҳо бо теги <p>'],
      ['Только с папкой', 'Only with a folder', 'Танҳо бо ҷузвдон'],
    ], 0, 'if — если да. else — если нет.', 'if is yes. else is no.', 'if ҳа. else не.'),
    q('Если в функции нет return, она отдаёт…', 'If a function has no return, it gives back…', 'Агар дар функсия return набошад, вай … медиҳад', [
      ['Пустое значение None', 'The empty value None', 'Қимати холии None'],
      ['Всегда число 1', 'Always the number 1', 'Ҳамеша адади 1'],
      ['Пароль', 'A password', 'Рамз'],
      ['Новый файл', 'A new file', 'Файли нав'],
    ], 0, 'return нужен, чтобы отдать ответ наружу.', 'return is needed to send an answer back out.', 'return лозим аст, то ҷавобро ба берун диҳӣ.'),
  ],
  24: [
    q('append добавляет элемент…', 'append adds an item…', 'append элементро … илова мекунад', [
      ['В конец списка', 'To the end of the list', 'Ба охири рӯйхат'],
      ['В начало экрана Windows', 'To the start of the Windows screen', 'Ба оғози экрани Windows'],
      ['В пароль', 'Into the password', 'Ба рамз'],
      ['В зарядку', 'Into the charger', 'Ба зарядка'],
    ], 0, 'Список пишут в квадратных скобках: ["а", "б"].', 'A list is written in square brackets: ["a", "b"].', 'Рӯйхатро дар қавсҳои квадратӣ менависанд: ["а", "б"].'),
    q('Чтобы взять xp из словаря user, пишут…', 'To get xp from the dictionary user, you write…', 'Барои гирифтани xp аз луғати user менависанд…', [
      ['user["xp"]', 'user["xp"]', 'user["xp"]'],
      ['<xp>', '<xp>', '<xp>'],
      ['пароль xp', 'password xp', 'рамзи xp'],
      ['папка xp', 'folder xp', 'ҷузвдони xp'],
    ], 0, 'Словарь хранит пару: имя и значение. Пример {"xp": 10}.', 'A dictionary stores a pair: a name and a value. Example {"xp": 10}.', 'Луғат ҷуфт нигоҳ медорад: ном ва қимат. Масалан {"xp": 10}.'),
    q('len(["а", "б", "в"]) равно…', 'len(["a", "b", "c"]) equals…', 'len(["а", "б", "в"]) баробар аст ба…', [
      ['3', '3', '3'],
      ['1', '1', '1'],
      ['0', '0', '0'],
      ['100', '100', '100'],
    ], 0, 'len считает, сколько элементов внутри.', 'len counts how many items are inside.', 'len мешуморад, чанд элемент дарун аст.'),
    q('import math нужен чтобы…', 'import math is needed to…', 'import math барои…', [
      ['Взять готовые функции, например корень', 'Use ready functions, for example square root', 'Функсияҳои тайёрро гирифтан, масалан реша'],
      ['Выключить компьютер', 'Turn the computer off', 'Компютерро хомӯш кардан'],
      ['Сменить обои', 'Change the wallpaper', 'Тасвирро иваз кардан'],
      ['Удалить клавиатуру', 'Delete the keyboard', 'Клавиатураро нест кардан'],
    ], 0, 'Модуль — готовый код. import его подключает.', 'A module is ready-made code. import connects it.', 'Модул коди тайёр аст. import онро мепайвандад.'),
  ],
  25: [
    q('Список notes в программе заметок хранит…', 'The notes list in a notes program stores…', 'Рӯйхати notes дар барномаи ёддоштҳо чӣро нигоҳ медорад?', [
      ['Все заметки', 'All the notes', 'Ҳамаи ёддоштҳо'],
      ['Только обои', 'Only the wallpaper', 'Танҳо тасвир'],
      ['Только звук', 'Only the sound', 'Танҳо садо'],
      ['Только заряд батареи', 'Only the battery charge', 'Танҳо заряди батарея'],
    ], 0, 'Заметки лежат в списке. Функции его меняют.', 'The notes sit in the list. Functions change it.', 'Ёддоштҳо дар рӯйхат меистанд. Функсияҳо онро иваз мекунанд.'),
    q('Зачем делить программу на функции?', 'Why split a program into functions?', 'Чаро барномаро ба функсияҳо тақсим мекунем?', [
      ['Чтобы каждая делала одно дело и код было легче читать', 'So each one does one job and the code is easier to read', 'То ҳар кадом як кор кунад ва кодро хондан осонтар шавад'],
      ['Чтобы компьютер грелся сильнее', 'So the computer gets hotter', 'То компютер бештар гарм шавад'],
      ['Чтобы стереть отступы', 'To erase the indents', 'То фосилаҳоро пок кунӣ'],
      ['Чтобы удалить все файлы', 'To delete all files', 'То ҳамаи файлҳоро нест кунӣ'],
    ], 0, 'Одна функция добавляет. Другая показывает. Третья считает.', 'One function adds. Another shows. A third counts.', 'Як функсия илова мекунад. Дигаре нишон медиҳад. Сеюм мешуморад.'),
    q('У заметки написано done: False. Это значит…', 'A note says done: False. This means…', 'Дар ёддошт навиштааст done: False. Ин яъне…', [
      ['Дело ещё не сделано', 'The job is not done yet', 'Кор ҳанӯз тамом нашудааст'],
      ['Заметка удалена', 'The note is deleted', 'Ёддошт нест шудааст'],
      ['Это пароль', 'This is a password', 'Ин рамз аст'],
      ['Это цвет кнопки', 'This is a button color', 'Ин ранги тугма аст'],
    ], 0, 'Потом, когда сделаешь дело, можно поставить True.', 'Later, when the job is done, you can set True.', 'Баъд, вақте корро кардӣ, True гузоштан мумкин.'),
    q('Два раза вызвали add. Сколько заметок в списке?', 'You called add twice. How many notes are in the list?', 'Ду бор add-ро даъват кардӣ. Дар рӯйхат чанд ёддошт?', [
      ['2', '2', '2'],
      ['0', '0', '0'],
      ['1', '1', '1'],
      ['10', '10', '10'],
    ], 0, 'Каждый add добавляет одну заметку.', 'Each add adds one note.', 'Ҳар add як ёддошт илова мекунад.'),
  ],
  26: [
    q('Backend — это код, который работает…', 'Backend is code that runs…', 'Backend кодест, ки кор мекунад…', [
      ['На сервере', 'On the server', 'Дар сервер'],
      ['Только в цвете кнопки', 'Only in a button color', 'Танҳо дар ранги тугма'],
      ['В зарядке ноутбука', 'In the laptop charger', 'Дар зарядкаи ноутбук'],
      ['В обоях', 'In the wallpaper', 'Дар тасвир'],
    ], 0, 'Страница в браузере спрашивает. Сервер отвечает.', 'The page in the browser asks. The server answers.', 'Саҳифа дар браузер мепурсад. Сервер ҷавоб медиҳад.'),
    q('JSON — это…', 'JSON is…', 'JSON ин…', [
      ['Текст с данными, например { "xp": 10 }', 'Text with data, for example { "xp": 10 }', 'Матн бо маълумот, масалан { "xp": 10 }'],
      ['Видеокарта', 'A graphics card', 'Видеокарта'],
      ['Обои', 'Wallpaper', 'Тасвир'],
      ['Провод питания', 'A power cable', 'Сими барқ'],
    ], 0, 'Сервер часто отвечает таким текстом. Браузер читает числа и слова из него.', 'The server often answers with this text. The browser reads numbers and words from it.', 'Сервер аксар бо ин матн ҷавоб медиҳад. Браузер аз он адад ва калима мехонад.'),
    q('Зачем база данных?', 'Why do we need a database?', 'Пойгоҳи додаҳо барои чӣ?', [
      ['Чтобы данные не пропали после выключения', 'So data does not disappear after shutdown', 'То пас аз хомӯшӣ маълумот гум нашавад'],
      ['Чтобы красить кнопки', 'To paint buttons', 'То тугмаҳоро ранг кунӣ'],
      ['Чтобы заменить экран', 'To replace the screen', 'То экранро иваз кунӣ'],
      ['Чтобы увеличить звук', 'To make the sound louder', 'То садоро баланд кунӣ'],
    ], 0, 'Память программы пустеет. База пишет на диск и помнит.', 'Program memory becomes empty. A database writes to disk and remembers.', 'Хотираи барнома холӣ мешавад. Пойгоҳ ба диск менависад ва ёд дорад.'),
    q('Request — это…', 'A request is…', 'Request ин…', [
      ['Вопрос браузера к серверу', 'The browser’s question to the server', 'Саволи браузер ба сервер'],
      ['Всегда готовый ответ «всё хорошо»', 'Always a ready answer “all good”', 'Ҳамеша ҷавоби тайёри «ҳама хуб»'],
      ['Файл картинки', 'A picture file', 'Файли акс'],
      ['Цвет темы', 'A theme color', 'Ранги мавзуъ'],
    ], 0, 'Спросил — request. Ответил — response.', 'The question is the request. The answer is the response.', 'Савол request аст. Ҷавоб response аст.'),
  ],
  27: [
    q('GET обычно…', 'GET usually…', 'GET одатан…', [
      ['Только читает данные и не меняет их', 'Only reads data and does not change it', 'Танҳо маълумотро мехонад ва иваз намекунад'],
      ['Всегда всё удаляет', 'Always deletes everything', 'Ҳамеша ҳамаро нест мекунад'],
      ['Выключает сервер', 'Turns the server off', 'Серверро хомӯш мекунад'],
      ['Меняет цвет сайта', 'Changes the site color', 'Ранги сомонаро иваз мекунад'],
    ], 0, 'GET — «покажи». Он не должен стирать записи.', 'GET means “show me”. It should not erase records.', 'GET яъне «нишон деҳ». Набояд сабтҳоро пок кунад.'),
    q('POST чаще всего…', 'POST most often…', 'POST бештар…', [
      ['Создаёт новую запись', 'Creates a new record', 'Сабти нав месозад'],
      ['Только смотрит, ничего не пишет', 'Only looks and writes nothing', 'Танҳо мебинад ва ҳеҷ чиз наменависад'],
      ['Выключает экран', 'Turns the screen off', 'Экранро хомӯш мекунад'],
      ['Меняет обои', 'Changes the wallpaper', 'Тасвирро иваз мекунад'],
    ], 0, 'Регистрация и сохранение прогресса — это POST.', 'Sign-up and saving progress are POST.', 'Бақайдгирӣ ва захираи пешрафт POST аст.'),
    q('Ответ 404 значит…', 'Answer 404 means…', 'Ҷавоби 404 яъне…', [
      ['Такой страницы или записи нет', 'That page or record does not exist', 'Чунин саҳифа ё сабт нест'],
      ['Всё нашлось и всё хорошо', 'Everything was found and all is well', 'Ҳама ёфт шуд ва ҳама хуб'],
      ['Пароль подошёл', 'The password worked', 'Рамз дуруст буд'],
      ['Файл скачался', 'The file downloaded', 'Файл бор шуд'],
    ], 0, '200 — нашлось. 404 — не нашли.', '200 means found. 404 means not found.', '200 ёфт шуд. 404 ёфт нашуд.'),
    q('Express помогает Node…', 'Express helps Node…', 'Express ба Node ёрӣ медиҳад…', [
      ['Отвечать на адреса, например /api/health', 'Answer addresses, for example /api/health', 'Ба суроғаҳо ҷавоб додан, масалан /api/health'],
      ['Рисовать обои', 'Draw wallpaper', 'Тасвир кашидан'],
      ['Заряжать ноутбук', 'Charge the laptop', 'Ноутбук заряд кардан'],
      ['Быть языком HTML', 'Be the HTML language', 'Забони HTML будан'],
    ], 0, 'Пришли на этот адрес — Express вызывает твой ответ.', 'They come to this address and Express calls your answer.', 'Ба ин суроға омаданд — Express ҷавоби туро мехонад.'),
  ],
  28: [
    q('Одна строка таблицы — это…', 'One row of a table is…', 'Як сатри ҷадвал ин…', [
      ['Одна запись, например один человек', 'One record, for example one person', 'Як сабт, масалан як одам'],
      ['Весь компьютер', 'The whole computer', 'Тамоми компютер'],
      ['Одна кнопка CSS', 'One CSS button', 'Як тугмаи CSS'],
      ['Один обои', 'One wallpaper', 'Як тасвир'],
    ], 0, 'Столбцы — поля, например имя. Строка — один человек.', 'Columns are fields, for example a name. A row is one person.', 'Сутунҳо майдонҳо, масалан ном. Сатр як одам.'),
    q('SELECT в SQL…', 'SELECT in SQL…', 'SELECT дар SQL…', [
      ['Читает данные из таблицы', 'Reads data from the table', 'Маълумотро аз ҷадвал мехонад'],
      ['Всегда удаляет всю базу', 'Always deletes the whole database', 'Ҳамеша тамоми пойгоҳро нест мекунад'],
      ['Рисует сайт', 'Draws the site', 'Сомонаро мекашад'],
      ['Включает компьютер', 'Turns the computer on', 'Компютерро мегиронад'],
    ], 0, 'SELECT читает. DELETE удаляет. Это разные команды.', 'SELECT reads. DELETE deletes. They are different commands.', 'SELECT мехонад. DELETE нест мекунад. Инҳо фармонҳои гуногун.'),
    q('PRIMARY KEY — это…', 'A PRIMARY KEY is…', 'PRIMARY KEY ин…', [
      ['Уникальный номер строки', 'A unique number for the row', 'Рақами беназири сатр'],
      ['Цвет кнопки', 'A button color', 'Ранги тугма'],
      ['Имя обоев', 'A wallpaper name', 'Номи тасвир'],
      ['Пароль от экрана', 'The screen password', 'Рамзи экран'],
    ], 0, 'Имена могут совпасть. Номер строки — нет.', 'Names can match. The row number does not.', 'Номҳо як шуда метавонанд. Рақами сатр не.'),
    q('SQLite обычно хранит базу…', 'SQLite usually stores the database…', 'SQLite одатан пойгоҳро … нигоҳ медорад', [
      ['В одном файле на диске', 'In one file on the disk', 'Дар як файл дар диск'],
      ['Только в оперативной памяти навсегда', 'Only in RAM forever', 'Танҳо дар RAM абадӣ'],
      ['На бумаге', 'On paper', 'Дар коғаз'],
      ['В обоях', 'In the wallpaper', 'Дар тасвир'],
    ], 0, 'Один файл .db. Его удобно открыть и для учёбы.', 'One .db file. It is easy to open for learning.', 'Як файли .db. Барои омӯзиш кушоданаш осон.'),
  ],
  29: [
    q('Update значит…', 'Update means…', 'Update яъне…', [
      ['Изменить запись, которая уже есть', 'Change a record that already exists', 'Сабтеро иваз кардан, ки аллакай ҳаст'],
      ['Только создать новую', 'Only create a new one', 'Танҳо нав сохтан'],
      ['Выключить сервер', 'Turn the server off', 'Серверро хомӯш кардан'],
      ['Сменить обои', 'Change the wallpaper', 'Тасвирро иваз кардан'],
    ], 0, 'Создать, прочитать, изменить, удалить — четыре действия с данными.', 'Create, read, change, delete. Four actions with data.', 'Сохтан, хондан, иваз кардан, нест кардан. Чор кор бо маълумот.'),
    q('Пароль в базе надо хранить…', 'A password in the database should be stored…', 'Рамзро дар пойгоҳ бояд … нигоҳ дошт', [
      ['В виде хеша, не открытым текстом', 'As a hash, not as open text', 'Ҳамчун хеш, на матни кушод'],
      ['Прямо как написал человек', 'Exactly as the person wrote it', 'Айнан чунон ки одам навишт'],
      ['В названии кнопки', 'In a button name', 'Дар номи тугма'],
      ['На обоях', 'On the wallpaper', 'Дар тасвир'],
    ], 0, 'Открытый пароль украдут. Из хеша пароль назад не прочитать.', 'An open password can be stolen. You cannot read the password back from a hash.', 'Рамзи кушодро дуздидан мумкин. Аз хеш рамзро боз хондан мумкин нест.'),
    q('DELETE без WHERE опасен, потому что…', 'DELETE without WHERE is dangerous because…', 'DELETE бе WHERE хатарнок аст, чунки…', [
      ['Может стереть все строки таблицы', 'It can erase every row of the table', 'Метавонад ҳамаи сатрҳои ҷадвалро пок кунад'],
      ['Даёт лишние очки', 'It gives extra points', 'Ҳоли зиёдатӣ медиҳад'],
      ['Ускоряет сайт', 'It makes the site faster', 'Сомонаро тез мекунад'],
      ['Сам чинит ошибки', 'It fixes mistakes by itself', 'Худаш хатоҳоро дуруст мекунад'],
    ], 0, 'Пиши, какую строку удалять: WHERE id = ...', 'Say which row to delete: WHERE id = ...', 'Бигӯ кадом сатрро нест кунӣ: WHERE id = ...'),
    q('Прогресс ученика лучше хранить…', 'A student’s progress is better stored…', 'Пешрафти хонандаро беҳтар аст нигоҳ доштан…', [
      ['В базе, рядом с номером этого ученика', 'In the database, next to that student’s number', 'Дар пойгоҳ, назди рақами ҳамин хонанда'],
      ['Только в RAM, пока вкладка открыта', 'Only in RAM, while the tab is open', 'Танҳо дар RAM, то варақа кушода аст'],
      ['В цвете кнопки', 'In a button color', 'Дар ранги тугма'],
      ['В имени обоев', 'In the wallpaper name', 'Дар номи тасвир'],
    ], 0, 'Зашёл снова — нашёл свой номер и свой прогресс.', 'You log in again and find your number and your progress.', 'Боз даромадӣ — рақам ва пешрафти худро меёбӣ.'),
  ],
  30: [
    q('Настоящая программа обычно состоит из…', 'A real program is usually made of…', 'Барномаи ҳақиқӣ одатан аз … иборат аст', [
      ['Экрана, сервера и места, где лежат данные', 'A screen, a server, and a place where data sits', 'Экран, сервер ва ҷое, ки маълумот меистад'],
      ['Только обоев', 'Only wallpaper', 'Танҳо тасвир'],
      ['Только зарядки', 'Only a charger', 'Танҳо зарядка'],
      ['Только одного цвета', 'Only one color', 'Танҳо як ранг'],
    ], 0, 'Экран спрашивает. Сервер отвечает. База помнит.', 'The screen asks. The server answers. The database remembers.', 'Экран мепурсад. Сервер ҷавоб медиҳад. Пойгоҳ ёд дорад.'),
    q('Зачем сохранять прогресс?', 'Why save progress?', 'Чаро пешрафтро захира мекунем?', [
      ['Чтобы после обновления страницы уроки не пропали', 'So the lessons do not disappear after a refresh', 'То пас аз нав шудани саҳифа дарсҳо гум нашаванд'],
      ['Чтобы удалить уроки', 'To delete the lessons', 'То дарсҳоро нест кунӣ'],
      ['Чтобы выключить сайт', 'To turn the site off', 'То сомонаро хомӯш кунӣ'],
      ['Чтобы сменить обои', 'To change the wallpaper', 'То тасвирро иваз кунӣ'],
    ], 0, 'Аккаунт помнит, на каком ты вопросе.', 'The account remembers which question you are on.', 'Ҳисоб ёд дорад, дар кадом савол ҳастӣ.'),
    q('Звание Junior Developer здесь дают когда…', 'The Junior Developer title here is given when…', 'Унвони Junior Developer ин ҷо кай дода мешавад?', [
      ['Пройдены все 30 уроков', 'All 30 lessons are finished', 'Ҳамаи 30 дарс гузашта шудаанд'],
      ['Куплена видеокарта', 'A graphics card is bought', 'Видеокарта харида шуд'],
      ['Сменены обои', 'The wallpaper is changed', 'Тасвир иваз шуд'],
      ['Открыт один файл', 'One file is opened', 'Як файл кушода шуд'],
    ], 0, 'Это награда за весь путь, не за одну кнопку.', 'This is the reward for the whole path, not for one button.', 'Ин мукофот барои тамоми роҳ аст, на барои як тугма.'),
    q('После курса лучше всего…', 'After the course the best thing is…', 'Пас аз курс беҳтарин кор ин…', [
      ['Делать свои маленькие программы каждый день', 'Make your own small programs every day', 'Ҳар рӯз барномаҳои хурди худро сохтан'],
      ['Забыть, где лежит код', 'Forget where the code is', 'Фаромӯш кардан, ки код дар куҷост'],
      ['Писать пароли открыто в таблице', 'Write passwords openly in a table', 'Рамзҳоро кушода дар ҷадвал навиштан'],
      ['Удалить браузер', 'Delete the browser', 'Браузерро нест кардан'],
    ], 0, 'Курс дал основу. Дальше растишь на своих задачах.', 'The course gave you the base. Next you grow on your own tasks.', 'Курс асос дод. Баъд бо вазифаҳои худ месабзӣ.'),
  ],
}

for (const [id, list] of Object.entries(QUIZZES)) {
  if (list.length !== 4) throw new Error('bad count ' + id)
  list.forEach((item, i) => {
    if (item.correct < 0 || item.correct > 3 || !item.options[item.correct]) throw new Error('bad index ' + id + ' ' + i)
    const right = item.options[item.correct]
    let n = 0
    for (const ch of item.q.ru) n = (n + ch.charCodeAt(0)) % 4
    const shift = n === 0 ? 1 : n
    item.options = [...item.options.slice(shift), ...item.options.slice(0, shift)]
    item.correct = item.options.indexOf(right)
  })
}

const body = `export const QUIZZES = ${JSON.stringify(QUIZZES, null, 2)}\n`
writeFileSync(new URL('../src/data/quizzes.js', import.meta.url), body)
console.log('wrote', Object.keys(QUIZZES).length)
