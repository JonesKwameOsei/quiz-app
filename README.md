# 📝 Quiz Application

A modern, responsive, and themeable quiz application built with vanilla
JavaScript, Vite, and ES6 modules. Test your knowledge with a timed quiz, track
your score, and enjoy a seamless user experience with light/dark mode support.

---

## 📑 Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Architecture Overview](#architecture-overview)
  - [Core Classes](#core-classes)
  - [Application Flow](#application-flow)
  - [Design Patterns](#design-patterns)
  - [UI Architecture](#ui-architecture)
  - [Data Flow](#data-flow)
  - [Styling System](#styling-system)
- [Development Commands](#development-commands)
- [License](#license)

---

## ✨ Features

- ⏱️ 10-minute countdown timer per quiz
- 📋 20-question quiz with instant feedback
- 📊 Progress bar and score tracking
- 🌗 Light/Dark theme toggle with persistence
- 🔄 Restart and timeout handling
- 📱 Responsive, mobile-first design
- ⚡ Fast, modern build with Vite

---

## 🚀 Getting Started

1. **Clone the repository:**

   ```bash
   git clone <repo-url>
   cd quiz-app
   ```

2. **Install dependencies:**

   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Start the development server:**

   ```bash
   pnpm dev
   # or
   npm run dev
   ```

4. **Open your browser:** Visit [http://localhost:5173](http://localhost:5173)
   (or the port shown in your terminal).

---

## 📁 Project Structure

```
quiz-app/
├── src/                # JavaScript modules
│   ├── question.js     # Question data and logic
│   ├── quiz.js         # Quiz state, scoring, progress
│   ├── timer.js        # Countdown timer logic
│   └── theme.js        # Theme management
├── main.js             # Application entry point & controller
├── style.css           # All application styles
├── index.html          # Single page application structure
├── assts/              # Static assets (icons, images)
│   └── vite.svg        # App banner/logo
└── CLAUDE.md           # Project documentation
```

---

## 🌐 App Live Demo

The Application is live at:
[https://quiz-app-ten.vercel.app/](https://quiz-app-gamma-one-54.vercel.app/)

---

## 🏗️ Architecture Overview

### 🧩 Core Classes

- **Quiz** (`src/quiz.js`) — Manages quiz state, questions, scoring, and
  progress tracking
- **Timer** (`src/timer.js`) — Handles countdown timer and timeout callbacks
- **ThemeManager** (`src/theme.js`) — Manages dark/light theme switching with
  localStorage persistence
- **Question** (`src/question.js`) — Stores and manages quiz questions and
  options

### 🔄 Application Flow

1. **Main Controller** (`main.js`) orchestrates all interactions between classes
2. **Screen Management** — Four main screens: start, questions, results, timeout
3. **Event-Driven** — Classes communicate via callbacks and event listeners
4. **State Management** — Each class manages its own state independently

### 🏛️ Design Patterns

- **Separation of Concerns** — Each class has a single responsibility
- **Callback Pattern** — Timer uses callbacks for timeout handling
- **Observer Pattern** — DOM events coordinate UI updates
- **Factory Pattern** — Dynamic option element creation

### 🖥️ UI Architecture

- **Screen-based Navigation** — Uses CSS classes to show/hide screens
- **Progressive Enhancement** — Works without JavaScript for basic functionality
- **Responsive Design** — Mobile-first approach with CSS Grid/Flexbox

### 🔗 Data Flow

1. **Quiz** class manages question data and scoring logic
2. **Timer** class provides countdown functionality with callbacks
3. **Main controller** handles all DOM manipulation and screen transitions
4. **ThemeManager** persists user preferences across sessions

### 🎨 Styling System

- **CSS Custom Properties** — Theme variables defined in `:root` and
  `[data-theme="dark"]`
- **BEM-like Naming** — Consistent class naming for components
- **Modular CSS** — Styles organized by component sections

---

## 🛠️ Development Commands

```bash
# Start development server with hot reload
pnpm dev
# or
npm run dev

# Build for production
pnpm build
# or
npm run build

# Preview production build
pnpm preview
# or
npm run preview
```

---

## 📄 License

This project is not licensed. You can use it however you want.

---

> Made with ❤️ using Vanilla JS, Vite, and modern web standards.

