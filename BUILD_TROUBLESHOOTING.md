# Решение проблем при сборке

## Ошибка "spawn EPERM" при сборке

Если при выполнении `npm run build` возникает ошибка `Error: spawn EPERM`, это обычно связано с правами доступа или блокировкой файлов антивирусом.

### Решения:

1. **Запуск от имени администратора**
   - Закройте текущий терминал
   - Откройте PowerShell или Command Prompt от имени администратора
   - Перейдите в папку проекта и выполните `npm run build`

2. **Отключение антивируса временно**
   - Временно отключите антивирус
   - Выполните сборку
   - Включите антивирус обратно

3. **Добавление исключения в антивирус**
   - Добавьте папку проекта в исключения антивируса
   - Особенно папку `node_modules` и файлы esbuild

4. **Переустановка зависимостей**
   ```bash
   # Удалите node_modules и lock файлы
   Remove-Item -Recurse -Force node_modules
   Remove-Item package-lock.json
   
   # Переустановите зависимости
   npm install
   
   # Попробуйте сборку снова
   npm run build
   ```

5. **Использование альтернативного способа**
   - Попробуйте использовать другой терминал (Git Bash, WSL)
   - Или выполните сборку на другой машине/в CI/CD

## Альтернативные способы сборки

### Через Docker (если установлен)

```bash
docker run --rm -v ${PWD}:/app -w /app node:18 npm install
docker run --rm -v ${PWD}:/app -w /app node:18 npm run build
```

### Через GitHub Actions

Создайте файл `.github/workflows/build.yml`:

```yaml
name: Build

on:
  push:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - uses: actions/upload-artifact@v3
        with:
          name: dist
          path: dist/
```

После выполнения workflow файлы будут доступны в артефактах.

## Проверка после сборки

После успешной сборки проверьте:

1. Папка `dist/` создана
2. В ней есть файл `index.html`
3. Есть папка `assets/` с JS и CSS файлами
4. Все изображения скопированы

## Контакты для помощи

Если проблема не решается, проверьте:
- Версию Node.js: `node --version` (должна быть 18+)
- Версию npm: `npm --version`
- Логи ошибок в консоли
