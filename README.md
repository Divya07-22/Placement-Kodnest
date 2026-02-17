# Placement Readiness Platform 🚀

A premium, AI-powered web application designed to help students master campus placements. This platform integrates **Job Description (JD) Analysis**, **Skill Assessment**, **Mock Interviews**, and **Progress Tracking** into a single, cohesive dashboard.

![React](https://img.shields.io/badge/React-18.3-blue?style=for-the-badge&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=for-the-badge&logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-5.0-646cff?style=for-the-badge&logo=vite)
![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel)

---

## 🌐 Live Demo & Deployment

**Production URL**: [https://placement-kodnest.vercel.app](https://placement-kodnest.vercel.app)  
**Repository**: [GitHub Link](https://github.com/Divya07-22/Placement-Kodnest)

---

## 📋 Project Evolution (Tasks 1-10)

This project was built through **10 specific milestones**, evolving from a basic design system to a production-ready SaaS product.

### **Task 1: KodNest Premium Build System** ✅
Initial design system establishment with calm, intentional aesthetics:
- **Color Palette**: Defined the 4-color foundation (#F7F6F3, #111111, #8B0000, #4A6741).
- **Typography**: Integrated Crimson Pro (Headings) and Inter (Body) for professional readability.
- **Component Library**: Created reusable tokens for TopBar, ContextHeader, Cards, and Buttons.
- **Philosophy**: Enforced a "No Drift" policy to ensure design consistency.

### **Task 2: Placement Platform Setup** ✅
Technical foundation and environment configuration:
- **Stack Initialization**: Vite + React 18 + Tailwind CSS v3.
- **Routing Architecture**: Configured `react-router-dom` for SPA navigation.
- **Assets**: Integrated Lucide React for consistent iconography.
- **Theme**: Established the primary Indigo/Purple identity (`hsl(245, 58%, 51%)`).

### **Task 3: Landing Page & Dashboard Shell** ✅
Core application layout and public interaction:
- **Landing Page**: Developed high-conversion hero section, features grid, and value proposition.
- **Dashboard Layout**: Built the sophisticated side-navigation shell with:
  - Collapsible Sidebar
  - Sticky Headers
  - User Profile Avatars
  - Responsive Mobile Menu

### **Task 4: Advanced Dashboard Components** ✅
Implementation of complex data visualizations:
- **Readiness Score**: Created dynamic SVG circular progress indicators.
- **Skill Radar**: Built a custom 5-axis radar chart for skill visualization.
- **Activity Tracker**: Implemented weekly goal tracking logic.
- **Context Cards**: Added "Continue Practice" and "Upcoming Assessments" widgets.

### **Task 5: JD Analysis System** ✅
The core AI-like intelligence engine:
- **Heuristic Engine**: Developed `analysisUtils.js` to process text without APIs.
- **Skill Extraction**: Regex-based detection for 6 categories (Web, Data, Cloud, etc.).
- **Scoring Logic**: Deterministic algorithm (Base 35 + category bonuses).
- **Study Planner**: Auto-generates a 7-Day preparation schedule.
- **Interview Questions**: Selects 10 technical questions based on detected stack.

### **Task 6: Interactive Results & Exports** ✅
Enhancing user agency and data portability:
- **Confidence Toggles**: "Know" vs "Practice" buttons that update scores in real-time.
- **Live Recalculation**: Visual score updates based on user interaction.
- **Export Suite**:
  - "Copy 7-Day Plan"
  - "Download Analysis (.txt)"
  - "Copy Checklist"
- **Action Next**: Smart recommendation engine for weak skill areas.

### **Task 7: Company Intel & Round Mapping** ✅
Adding contextual intelligence to the detailed analysis:
- **Company Classifier**: Detects "Enterprise" vs "Startup" hiring patterns.
- **Round Generator**: Creates tailored interview roadmaps (e.g., 4 rounds for MNCs).
- **Intel Cards**: Displays specific hiring focus (DSA vs Development).
- **Demo Mode**: Transparent fallbacks for unrecognized companies.

### **Task 8: System Hardening & Dark Mode** ✅
Improving reliability and user experience:
- **Dark Mode**: Complete theme overhaul with `dark:` Tailwind classes and toggle logic.
- **Error Boundaries**: Prevention of crashes due to undefined data.
- **Input Validation**: Minimum length checks and empty state handling.
- **Legacy Migration**: Auto-updater for old localStorage data formats.

### **Task 9: Verification Module** ✅
Built-in quality assurance for the "Shipping" workflow:
- **Test Checklist**: Interactive 10-point manual test suite at `/prp/07-test`.
- **Ship Lock**: Conditional routing that blocks "Shipping" until validation passes.
- **Persistence**: Saves test progress to localStorage.

### **Task 10: Proof & Submission** ✅
The final productization and handover layer:
- **Proof Page**: Dedicated `/prp/proof` route for final verification.
- **Artifact Logic**: Validates Lovable, GitHub, and Deployed links.
- **Submission Generator**: Formats the final "Shipped" message for easy sharing.
- **Completion Gate**: Only unlocks when 100% of requirements are met.

---

## ✨ Key Features

### 1. 🧠 Smart JD Analyzer
Paste any Job Description to get an instant, tailored preparation strategy.
- **Readiness Score**: 0-100 match rating.
- **Skill Gap Analysis**: Identifies what you know vs. what you need to learn.
- **Interview Questions**: 10 likely technical questions based on the JD's stack.

### 2. 📊 Interactive Dashboard
- **Visual Analytics**: Track your growth across DSA, System Design, and Soft Skills.
- **Dark Mode**: Seamless toggle for comfortable late-night coding sessions.
- **Profile Management**: Edit user details and preferences.

### 3. 🛡️ Verification System
A built-in QA module ensures the application is bug-free before "shipping".
- **Visual Checklist**: Track manual test coverage.
- **Ship Guard**: Prevents premature deployment.

---

## 🛠️ Technology Stack

| Category | Tech | Description |
| :--- | :--- | :--- |
| **Frontend** | React 18 | Component-based UI architecture |
| **Styling** | Tailwind CSS 3.4 | Utility-first responsive design |
| **Icons** | Lucide React | Consistent, lightweight SVG icons |
| **Routing** | React Router 6 | Client-side navigation & protection |
| **Build** | Vite 5 | Lightning-fast HMR and bundling |
| **Storage** | localStorage | Offline-first data persistence |
| **Services** | Vercel | Global edge deployment |

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/Divya07-22/Placement-Kodnest.git
    cd Placement-Kodnest
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Start the development server**
    ```bash
    npm run dev
    ```

4.  **Open in browser**
    Navigate to `http://localhost:5173`

---

## 📱 Project Structure

```bash
src/
├── components/         # Reusable UI (Card, Button, Badge)
├── layouts/           # Dashboard & Auth layouts
├── pages/             # Route components
│   ├── Assessments.jsx # Mock test cards
│   ├── Dashboard.jsx   # Main analytics view
│   ├── Practice.jsx    # JD Analyzer input
│   ├── Profile.jsx     # User settings
│   ├── Results.jsx     # Analysis output
│   └── ...
├── utils/             # Heuristic logic (analysisUtils.js)
└── App.jsx            # Route definitions
```

---

## 🤝 Contributing

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

**Built with ❤️ by [Divya07-22]**
