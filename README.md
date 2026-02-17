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

## 📋 Project Journey (Tasks 1-10)

This application was built through **10 disciplined milestones**, evolving from a basic design system to a production-ready SaaS product.

### **Phase 1: Foundation**
- **Task 1: Design System** ✅  
  Created the "KodNest Premium Build System" with a curated 4-color palette (`#F7F6F3` background, `#111111` text, `#4A6741` success) and professional typography (Crimson Pro + Inter).
- **Task 2: Architecture Setup** ✅  
  Initialized Vite + React + Tailwind CSS environment. Configured `react-router-dom` for robust Single Page Application (SPA) navigation.

### **Phase 2: Core UI**
- **Task 3: Landing & Layouts** ✅  
  Built a high-conversion Landing Page and a responsive `DashboardLayout` with side navigation, header user profile, and sticky positioning.
- **Task 4: Advanced Dashboard** ✅  
  Implemented complex data visualizations:
  - **Readiness Score**: Animated circular progress (SVG).
  - **Skill Radar**: Custom skill breakdown bars.
  - **Activity Tracker**: Weekly goal visualization.

### **Phase 3: The Intelligence Engine (JD Analyzer)**
- **Task 5: Heuristic Analysis Logic** ✅  
  Developed `analysisUtils.js` to process raw Job Descriptions without external APIs.
  - **Skill Extraction**: Identifies keywords across 6 categories (Web, Data, Cloud, etc.).
  - **Adaptive Scoring**: Calculates a dynamic 0-100 readiness score.
  - **7-Day Plan**: Generates a tailored study schedule.
- **Task 6: Interactive Results** ✅  
  Created a `Results.jsx` page where users can:
  - Toggle skills ("Know" vs "Practice") to update their score in real-time.
  - Download full analysis reports as `.txt`.
  - Copy interview questions to clipboard.

### **Phase 4: Advanced Context**
- **Task 7: Company Intel & Round Mapping** ✅  
  Added a heuristic layer to detect company types ("Enterprise" vs "Startup") and generate specific interview round timelines (e.g., "DSA Round" for Google vs "Machine Coding" for Startups).
- **Task 8: System Hardening & Dark Mode** ✅  
  - **Dark Mode**: Fully implemented toggleable dark theme using Tailwind `dark:` classes.
  - **Robustness**: Added error boundaries, empty state handling, and legacy data migration to prevent crashes.

### **Phase 5: Verification & Shipping**
- **Task 9: Quality Assurance Protocols** ✅  
  - **Test Checklist**: A 10-point interactive manual test suite (`/prp/07-test`) that persists progress.
  - **Ship Lock**: A security gate that prevents shipping until all tests pass (`/prp/08-ship`).
- **Task 10: Proof & Submission** ✅  
  - **Final Gate**: The `/prp/proof` page collects valid artifact links (Lovable, GitHub, Vercel).
  - **Validation**: Enforces 100% completion before allowing the final "Shipped" status update.

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
