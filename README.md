# Recipe Finder — React App

A clean and modern web app to search for recipes, view detailed instructions, and save favorites. Built as a beginner-friendly project to practice React, API integration, and responsive UI.

## Project Description
Recipe Finder lets you:
- Search meals by name with instant feedback.
- Filter by meal type (e.g., Breakfast, Lunch, Dinner, Dessert).
- Optionally filter Veg/Non‑Veg based on available data.
- Open a recipe modal with image, ingredients, and step-by-step instructions.
- Mark and manage favorites using LocalStorage.
- Enjoy smooth loading states, helpful empty results messaging, and a responsive layout.

The goal is to provide a simple UX with a clean visual style (teal/cyan palette, light glassmorphism), subtle animations, and a layout that works nicely on both mobile and desktop.

## Features
- Search with live suggestions and debounced calls.
- Filter recipes by meal type; optional Veg/Non‑Veg toggle.
- Recipe details modal with two-column layout on desktop.
- Favorites saved locally (persists after refresh).
- Loading skeletons and “no results” friendly message.
- Responsive and accessible basics.
- Dark-mode friendly color choices.

## Tech Stack
- React 18 (functional components + hooks)
- CSS stylesheets for UI
- React Icons for icons
- Framer Motion for animations
- LocalStorage for persistence
- TheMealDB public API for data

## Getting Started

### Prerequisites
- Node.js (LTS recommended) and npm

### Installation
```bash
npm install
```

### Environment Variables
Create a `.env` file in the project root:
```
REACT_APP_MEAL_API_KEY=your_api_key_here
```
Note: TheMealDB free endpoints can work without a key, but the variable is included for future flexibility.

### Run Locally
```bash
npm start
```
The app will be available at http://localhost:3000

### Build for Production
```bash
npm run build
```

## Available Scripts
- `npm start` — Run dev server
- `npm run build` — Production build
- `npm test` — Run tests (if configured)
- `npm run lint` — Lint (if configured)


## Contributing
Issues and pull requests are welcome. For UI changes, please include a short description and screenshots.
