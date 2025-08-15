# 🍳 Recipe Finder — React App

<div align="center">

![Recipe Finder](https://img.shields.io/badge/Recipe-Finder-teal?style=for-the-badge&logo=react&logoColor=white)
![Version](https://img.shields.io/badge/version-1.0.0-brightgreen?style=for-the-badge)
![Build Status](https://img.shields.io/badge/build-passing-success?style=for-the-badge)

**A clean and modern web app to search for recipes, view detailed instructions, and save favorites.**

*Built as a beginner-friendly project to practice React, API integration, and responsive UI.*

[🚀 Demo](#getting-started) • [📖 Documentation](#features) • [🤝 Contributing](#contributing)

</div>

---

## 🎯 Project Description

Recipe Finder is your ultimate culinary companion that lets you:

🔍 **Smart Search** — Search meals by name with instant feedback and live suggestions  
🏷️ **Filter & Sort** — Filter by meal type (Breakfast, Lunch, Dinner, Dessert)  
🌱 **Dietary Options** — Optionally filter Veg/Non‑Veg based on available data  
📱 **Recipe Details** — Open detailed modals with images, ingredients, and instructions  
❤️ **Save Favorites** — Mark and manage favorites with LocalStorage persistence  
✨ **Smooth UX** — Enjoy loading states, helpful messaging, and responsive design  

The goal is to provide a simple UX with a clean visual style featuring teal/cyan palette, light glassmorphism effects, and subtle animations that work beautifully on both mobile and desktop.

---

## Screenshots

   <div style="display: flex; gap: 10px;">
   <img width="300" height="500" alt="Screenshot 2025-08-15 232840" src="https://github.com/user-attachments/assets/853fa53c-0b6b-4202-b5fa-0396d6545325" />
   <img width="365" height="759" alt="image" src="https://github.com/user-attachments/assets/df9a1d51-aa89-4ac2-b19b-4cb2ee09d05d" />
   <img width="300" height="500" alt="image" src="https://github.com/user-attachments/assets/80454ebc-5bc8-4994-b013-28e45bb76669" />
   </div>

## ✨ Features

<table>
<tr>
<td width="50%">

### 🔎 Search & Discovery
- 🎯 Live suggestions with debounced API calls
- 🏃‍♂️ Fast, responsive search experience
- 💡 Smart autocomplete functionality

### 🎛️ Filtering Options
- 🍽️ Filter by meal type categories
- 🌿 Optional Veg/Non-Veg toggle
- 🎨 Intuitive filter interface

</td>
<td width="50%">

### 📖 Recipe Experience
- 🖼️ High-quality recipe images
- 📝 Step-by-step instructions
- 🥘 Complete ingredients list
- 📱 Two-column desktop layout

### 💾 Personalization
- ❤️ Save favorite recipes locally
- 🔄 Persist favorites after refresh
- 🗂️ Easy favorites management

</td>
</tr>
</table>

### 🎨 UI/UX Highlights
- 🌊 **Responsive Design** — Seamless experience across all devices
- ♿ **Accessibility** — Built with accessibility best practices
- 🌙 **Dark Mode Friendly** — Optimized color choices for any theme
- 🎭 **Loading States** — Beautiful skeleton loaders and animations
- 💬 **User Feedback** — Friendly "no results" messaging

---

## 🔔 What's New

- **Sorting options**: Sort results by Name (A–Z/Z–A) or Category (A–Z/Z–A)
- **Contextual sort visibility**: Sort controls appear only after search/suggestion results
- **Random suggestion**: “Suggest me a recipe” button (theme-matched) to fetch random recipes
- **Paging shimmer**: Quick skeleton shimmer when changing pages
- **Remember page per query**: Restores your last viewed page for the same query
- **Back to Top**: Floating button to quickly return to top
- **API utility**: `fetchRandomRecipes(count)` added in `src/utils/api.js`

---

## 🛠️ Tech Stack

<div align="center">

![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![CSS3](https://img.shields.io/badge/CSS3-Stylesheets-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![React Icons](https://img.shields.io/badge/React-Icons-E10098?style=for-the-badge&logo=react&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer-Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)
![LocalStorage](https://img.shields.io/badge/Local-Storage-FFA500?style=for-the-badge&logo=html5&logoColor=white)
![TheMealDB](https://img.shields.io/badge/TheMealDB-API-FF6B6B?style=for-the-badge&logo=api&logoColor=white)

</div>

### Core Technologies
- **⚛️ React 18** — Functional components with modern hooks
- **🎨 CSS Stylesheets** — Custom styling with glassmorphism effects
- **🎯 React Icons** — Beautiful, consistent iconography
- **🎬 Framer Motion** — Smooth animations and transitions
- **💾 LocalStorage** — Client-side data persistence
- **🌐 TheMealDB API** — Rich recipe data source

---

## 🚀 Getting Started

### 📋 Prerequisites

Make sure you have the following installed:
- **Node.js** (LTS version recommended) [![Node.js](https://img.shields.io/badge/Node.js-LTS-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
- **npm** (comes with Node.js) [![npm](https://img.shields.io/badge/npm-latest-CB3837?style=flat-square&logo=npm&logoColor=white)](https://www.npmjs.com/)

### ⚡ Quick Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/recipe-finder.git
   cd recipe-finder
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the project root:
   ```env
   REACT_APP_MEAL_API_KEY=your_api_key_here
   ```
   
   > **Note:** TheMealDB free endpoints work without a key, but the variable is included for future flexibility.

4. **Start the development server**
   ```bash
   npm start
   ```
   
   🎉 **Your app will be available at** [`http://localhost:3000`](http://localhost:3000)

### 🏗️ Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build/` folder.

---

## 📜 Available Scripts

<table>
<tr>
<td><strong>🚀 Development</strong></td>
<td><code>npm start</code></td>
<td>Run development server with hot reload</td>
</tr>
<tr>
<td><strong>🏗️ Production</strong></td>
<td><code>npm run build</code></td>
<td>Create optimized production build</td>
</tr>
<tr>
<td><strong>🧪 Testing</strong></td>
<td><code>npm test</code></td>
<td>Run test suite (if configured)</td>
</tr>
<tr>
<td><strong>🔍 Linting</strong></td>
<td><code>npm run lint</code></td>
<td>Check code quality and style (if configured)</td>
</tr>
</table>

---

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### 🐛 Found a Bug?
- Check existing [issues](../../issues) first
- Create a detailed bug report with steps to reproduce

### 💡 Have a Feature Idea?
- Open a [feature request](../../issues/new) with a clear description
- Include mockups or examples if possible

### 🔧 Want to Contribute Code?
1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### 🎨 UI/UX Changes
For visual changes, please include:
- 📝 Short description of changes
- 📸 Before/after screenshots
- 📱 Mobile responsiveness verification

---

## 🙏 Acknowledgments

- **[TheMealDB](https://www.themealdb.com/)** - Free recipe API
- **[React Icons](https://react-icons.github.io/react-icons/)** - Beautiful icon library
- **[Framer Motion](https://www.framer.com/motion/)** - Animation library
- All the amazing **open source contributors**

---

<div align="center">

### 🌟 If you found this project helpful, please give it a star!

[![Star this repo](https://img.shields.io/github/stars/yourusername/recipe-finder?style=social)](../../stargazers)
[![Fork this repo](https://img.shields.io/github/forks/yourusername/recipe-finder?style=social)](../../network/members)
[![Watch this repo](https://img.shields.io/github/watchers/yourusername/recipe-finder?style=social)](../../watchers)

**Made with ❤️ and ⚛️ React**

</div>
