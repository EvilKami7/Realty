## Установка
- node.js https://nodejs.org/en/ lts версия
- git https://git-scm.com/
- gulp http://www.creative-seo.ru/blog/gulp-dlya-nachinayushchih/ - для общего ознакомления с gulp (устанавливать не нужно)

## Консоль
- [cmder](http://cmder.net/)
- [conEmu](https://conemu.github.io/)
- Все команды по работе с gulp и npm пакетами выполняются в консоли.

### Команды
- cd - поменять директорию
- ls - посмотреть содержимое текущей папки
- mkdir name - создать папку с именем name
- [Полный гайд](http://nicothin.pro/page/console-windows)
- [Настройка](https://isqua.ru/blog/2016/11/05/nastroika-tierminala-cmder-v-windows/)

## Настройка проекта
- Сливаем проект с репозитория
- Выполняем команду `npm i` единоразово в папке проекта
- Для запуска гальпа пишем просто `gulp` в папке проекта, запустится локальный сервер BrowserSync. 

## Примерный workflow выполнения задачи
- Заходим в git и смотрим есть ли изменения проекта с локальной копией, если есть - делаем git pull(т.е. сливаем изменения)
- запускаем gulp и выполняем задачу по верстке
- Тестируем
- Коммитим(сохраняем свои изменения в системе контроля версий) и пушим(отправляем изменения на сервер)
- Отправляем изменения на сервер где хранится сайт. Командой gulp deploy или же руками по старинке
- Применяем изменения в modx, правим верстку в чанках/шаблонах, etc.

## Git
https://tproger.ru/video/git-for-beginners-3/ - гайд по гиту для общего понимания
### GUI Клиенты
[SourceTree](https://www.sourcetreeapp.com/)

[GitKraken](https://www.gitkraken.com/)

Также многие ide имеют возможность отправлять и отслеживать изменения в git. Например, WebStorm, PHPStorm и другие. Для текстовых редакторов(sublime, vscode, etc) есть плагины. 
Тут уж кому что удобнее. Можно вообще из консоли этим заниматься

## Jquery vs VanillaJS
WIP

## Компоненты Gulp
### BrowserSync
[Link](https://www.browsersync.io/)

### Build
`gulp build`

WIP

### Deploy 
`gulp deploy`

WIP

### SCSS
[Docs](https://sass-scss.ru/)

### Image optimizer

### SVG Sprite
gulp sprite 

### Nunjucks
[Docs](https://mozilla.github.io/nunjucks/)
Шаблонизатор, упрощающий процесс верстки. Сильно похож на систему шаблонов и чанков в модх. Чистая копия Fenom, который используется в PdoTools

### Babel.js
WIP