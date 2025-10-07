# Skypro Music - Настройка проекта

## Выполненные шаги

### 1. Создание проекта Next.js
Проект создан с использованием `create-next-app@latest` со следующими параметрами:
- ✅ TypeScript
- ✅ ESLint
- ❌ Tailwind CSS (не используется)
- ✅ src/ директория
- ✅ App Router
- ✅ Import alias (@/*)

### 2. Установленные зависимости

**Dependencies:**
- react: 19.1.0
- react-dom: 19.1.0
- next: 15.5.4

**DevDependencies:**
- typescript: ^5
- @types/node: ^20
- @types/react: ^19
- @types/react-dom: ^19
- eslint: ^9
- eslint-config-next: 15.5.4
- @eslint/eslintrc: ^3
- @next/eslint-plugin-next: ^15.5.4
- @typescript-eslint/eslint-plugin: ^8.46.0
- @typescript-eslint/parser: ^8.46.0
- eslint-plugin-prettier: ^5.5.4
- prettier: ^3.6.2

### 3. Настройка линтеров и форматеров

**Prettier (.prettierrc):**
```json
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 80,
  "tabWidth": 2
}
```

**ESLint (eslint.config.mjs):**
- Настроен для TypeScript
- Подключен Prettier
- Правила для Next.js
- Игнорирование автогенерируемых файлов (.next, node_modules, out, .turbo)

### 4. Доступные скрипты

```bash
npm run dev      # Запуск dev-сервера с Turbopack
npm run build    # Сборка проекта
npm run start    # Запуск production-сервера
npm run lint     # Проверка кода с ESLint
npm run format   # Форматирование кода с Prettier
```

## Структура проекта

```
skypro-music/
├── src/
│   └── app/
│       ├── favicon.ico
│       ├── globals.css
│       ├── layout.tsx
│       ├── page.module.css
│       └── page.tsx
├── public/
├── .prettierrc
├── .prettierignore
├── eslint.config.mjs
├── next.config.ts
├── package.json
└── tsconfig.json
```

## Следующие шаги

1. Подключение HTML-шаблона
2. Преобразование разметки в JSX
3. Создание компонентов
4. Подключение стилей и шрифтов
5. Оптимизация изображений
6. Настройка маршрутизации
