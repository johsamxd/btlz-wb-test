# Шаблон для выполнения тестового задания

## Описание

Шаблон подготовлен для того, чтобы попробовать сократить трудоемкость выполнения тестового задания.

В шаблоне настоены контейнеры для `postgres` и приложения на `nodejs`.  
Для взаимодействия с БД используется `knex.js`.  
В контейнере `app` используется `build` для приложения на `ts`, но можно использовать и `js`.

Шаблон не является обязательным!\
Можно использовать как есть или изменять на свой вкус.

Все настройки можно найти в файлах:

- compose.yaml
- dockerfile
- package.json
- tsconfig.json
- src/config/env/env.ts
- src/config/knex/knexfile.ts

## Команды:

Запуск базы данных:

```bash
docker compose up -d --build postgres
```

Для выполнения миграций и сидов не из контейнера:

```bash
npm run knex:dev migrate latest
```

```bash
npm run knex:dev seed run
```

Также можно использовать и остальные команды (`migrate make <name>`,`migrate up`, `migrate down` и т.д.)

Для запуска приложения в режиме разработки:

```bash
npm run dev
```

Запуск проверки самого приложения:

```bash
docker compose up -d --build app
```

Для финальной проверки рекомендую:

```bash
docker compose down --rmi local --volumes
docker compose up --build
```

PS: С наилучшими пожеланиями!

# Результат

## Как запустить:

1. ```git clone https://github.com/johsamxd/btlz-wb-test.git```
2. ```cd ./btlz-wb-test```
3. ```npm i```
4. Ввести в .env необходимые значения
5. Получить json-файл ключа от google service account и загрузить в ./keys
6. Выдать доступ к таблицам для service account, и не забыть включить Google Sheets API для service account
7. ```docker compose up --build```

## Скриншоты

![logs](/screenshots/image.png)

![spreadsheets](/screenshots/image-1.png)

![box_rates](/screenshots/image-2.png)

![table](/screenshots/image-3.png)
