# 🚀 Skypro Music - Быстрая шпаргалка

## 📂 Где что находится

### Я хочу добавить новую страницу
📁 `src/app/` → создайте папку с названием маршрута и файл `page.tsx`

**Пример:**
```
src/app/tracks/page.tsx  →  http://localhost:3000/tracks
src/app/about/page.tsx   →  http://localhost:3000/about
```

### Я хочу добавить изображение
📁 `public/` → поместите файл сюда

**Использование:**
```tsx
<Image src="/my-image.png" alt="Description" width={500} height={300} />
```

### Я хочу добавить глобальные стили
📄 `src/app/globals.css` — редактируйте этот файл

### Я хочу создать компонент
📁 Создайте `src/components/` (папка пока не существует)

**Структура:**
```
src/
  components/
    Header/
      Header.tsx
      Header.module.css
```

### Я хочу изменить layout всех страниц
📄 `src/app/layout.tsx` — это корневой layout

---

## ⚙️ Основные команды

| Команда | Что делает |
|---------|-----------|
| `npm run dev` | 🚀 Запуск dev-сервера на http://localhost:3000 |
| `npm run build` | 📦 Сборка для продакшена |
| `npm run start` | 🌐 Запуск продакшен-сервера |
| `npm run lint` | 🔍 Проверка кода (ESLint) |
| `npm run format` | ✨ Форматирование кода (Prettier) |
| `npm install <package>` | 📥 Установка нового пакета |

---

## 🎨 Стилизация

### CSS Modules (рекомендуется)
```tsx
// Component.tsx
import styles from './Component.module.css';

export default function Component() {
  return <div className={styles.container}>Content</div>;
}
```

```css
/* Component.module.css */
.container {
  padding: 20px;
  background: #fff;
}
```

### Глобальные стили
```css
/* src/app/globals.css */
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: Arial, sans-serif;
}
```

---

## 🔗 Импорты с алиасами

Вместо относительных путей используйте `@/`:

```typescript
// ❌ Плохо
import Button from '../../../components/Button';

// ✅ Хорошо
import Button from '@/components/Button';
```

**Настройка:** `tsconfig.json` → `"paths": { "@/*": ["./src/*"] }`

---

## 📁 Типичная структура проекта (будущая)

```
src/
  app/                    # App Router (маршруты)
    layout.tsx           # Root layout
    page.tsx             # Главная страница
    tracks/
      page.tsx           # Страница треков
    playlist/
      [id]/
        page.tsx         # Динамический маршрут
  
  components/            # Переиспользуемые компоненты
    Header/
      Header.tsx
      Header.module.css
    Player/
      Player.tsx
      Player.module.css
  
  lib/                   # Утилиты и хелперы
    utils.ts
    api.ts
  
  types/                 # TypeScript типы
    index.ts
  
  styles/                # Общие стили (опционально)
    variables.css
```

---

## 🔧 Полезные настройки

### Добавить переменные окружения
Создайте `.env.local`:
```
NEXT_PUBLIC_API_URL=https://api.example.com
SECRET_KEY=your-secret-key
```

**Использование:**
```typescript
// Доступно в браузере (NEXT_PUBLIC_)
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// Только на сервере
const secret = process.env.SECRET_KEY;
```

### Настроить изображения из внешних источников
`next.config.ts`:
```typescript
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'example.com',
      },
    ],
  },
};
```

---

## 🐛 Отладка

### Сервер не запускается
```bash
# Очистите кеш и node_modules
rm -rf .next node_modules package-lock.json
npm install
npm run dev
```

### Ошибки линтера
```bash
# Автоисправление
npm run lint -- --fix

# Форматирование
npm run format
```

### Ошибки TypeScript
Проверьте `tsconfig.json` и убедитесь, что все типы корректны.

---

## 📚 Полезные ссылки

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [CSS Modules](https://github.com/css-modules/css-modules)

---

## 🎯 Чеклист разработки

- [ ] Создана структура компонентов
- [ ] Настроена маршрутизация
- [ ] Добавлены шрифты
- [ ] Оптимизированы изображения
- [ ] Подключены API
- [ ] Настроена типизация
- [ ] Написаны тесты (опционально)
- [ ] Проверен линтер (`npm run lint`)
- [ ] Проверена сборка (`npm run build`)

---

**Проект:** Skypro Music 🎵  
**Дата:** 7 октября 2025
