# Placement Readiness Platform

A comprehensive web application to help students prepare for campus placements through practice problems, mock interviews, progress tracking, skill assessment, and **AI-powered JD analysis**.

![React](https://img.shields.io/badge/React-18.3-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-38bdf8)
![React Router](https://img.shields.io/badge/React_Router-6.x-red)

## 🚀 Live Demo

**Production URL**: [https://placement-kodnest.vercel.app](https://placement-kodnest.vercel.app)
**Local Development**: http://localhost:5173

---

## 📋 Project Evolution

This project was built in **5 comprehensive phases**, each adding significant functionality:

### **Task 1: KodNest Premium Build System** ✅
Initial design system with calm, intentional aesthetics:
- 4-color palette (#F7F6F3, #111111, #8B0000, #4A6741)
- Consistent spacing scale (8/16/24/40/64px)
- Professional typography (Crimson Pro serif + Inter sans-serif)
- Component library (TopBar, ContextHeader, Cards, Buttons)

### **Task 2: Placement Platform Setup** ✅
Technology stack configuration:
- Tailwind CSS v3 for styling
- React Router DOM for navigation
- Lucide React for icons
- Vite build tool
- Indigo/purple color scheme (hsl(245, 58%, 51%))

### **Task 3: Landing Page & Dashboard Shell** ✅
Core application structure:
- **Landing Page**:
  - Hero section with "Ace Your Placement" headline
  - Features grid (Practice Problems, Mock Interviews, Track Progress)
  - Footer with copyright
  - "Get Started" CTA button
- **Dashboard Layout**:
  - Sidebar navigation (Dashboard, Practice, Assessments, History, Profile)
  - Header with branding and user avatar
  - Main content area with React Router Outlet
  - Responsive design

### **Task 4: Advanced Dashboard Components** ✅
Comprehensive dashboard with data visualizations:
- **Overall Readiness**: Circular progress indicator (72/100) with SVG stroke-dasharray animation
- **Skill Breakdown**: Custom SVG radar chart with 5 axes (DSA, System Design, Communication, Resume, Aptitude)
- **Continue Practice**: Last topic card with progress bar (3/10 completed)
- **Weekly Goals**: Problems solved tracker (12/20) with 7-day activity indicators
- **Upcoming Assessments**: List of 3 scheduled assessments with icons and times
- Responsive 2-column grid layout (single column on mobile)

### **Task 5: JD Analysis System** ✅ **NEW!**
Complete job description analysis with heuristic intelligence:
- **Skill Extraction Engine**:
  - Heuristic keyword detection across 6 categories
  - Categories: Core CS, Languages, Web, Data, Cloud/DevOps, Testing
  - Fallback to "General fresher stack" if no skills detected
- **Readiness Score (0-100)**:
  - Base score: 35
  - +5 per category detected (max 30)
  - +10 if company provided
  - +10 if role provided
  - +10 if JD length > 800 characters
- **Round-wise Preparation Checklist**:
  - Round 1: Aptitude & Basics
  - Round 2: DSA & Core CS (adaptive based on skills)
  - Round 3: Technical Interview (skill-specific items)
  - Round 4: HR & Behavioral
- **7-Day Study Plan**:
  - Adaptive daily tasks based on detected skills
  - Day 1-2: Basics & Core CS
  - Day 3-4: DSA Practice
  - Day 5: Projects & Tech Stack
  - Day 6: Mock Interviews
  - Day 7: Revision
- **10 Likely Interview Questions**:
  - Generated based on detected skills
  - Skill-specific questions (e.g., React → state management)
- **localStorage History**:
  - Saves all analyses locally
  - Persists across page refreshes
  - View/Delete functionality
  - Works completely offline

### **Task 6: Interactive Results & Exports** ✅ **NEW!**
Enhanced analysis experience with user interaction:
- **Skill Confidence Toggles**:
  - "I know this" (Green) vs "Need practice" (Orange)
  - Persisted per analysis in history
- **Live Scoring Engine**:
  - Base score + dynamic adjustments
  - +2 for known skills, -2 for practice areas
  - Real-time circular progress updates
- **Export Suite**:
  - Copy to Clipboard: 7-Day Plan, Checklist, Interview Questions
  - Download as TXT: Complete analysis report
- **Action Next**:
  - Smart suggestion box highlighting top 3 weak skills
  - "Start Day 1 plan" call to action


### **Task 7: Company Intel & Round Mapping** ✅ **NEW!**
Intelligent context layer for targeted preparation:
- **Heuristic Company Engine**:
  - Classifies companies (Enterprise/Startup/Mid-size)
  - Infers hiring focus (DSA vs Practical) based on type
- **Dynamic Round Mapping**:
  - **Enterprise Path**: 4 Rounds (Assessment → Tech 1 → Tech 2 → HR)
  - **Startup Path**: 3 Rounds (Practical → Deep Dive → Culture)
  - **"Why this matters"**: Contextual tips for each round
- **UI Architecture**:
  - Dedicated Company Intel Data Card
  - Vertical timeline visualization for interview rounds
  - Fully persisted in history
  - "Demo Mode" disclaimer for transparency
  - "Why this matters" tooltips

### **Task 8: System Hardening** ✅
Robustness and reliability improvements:
- **Input Validation**: Minimum character limits and empty state handling
- **Deep Fallback**: "General" skill set generator for non-technical JDs
- **Score Stability**: Deterministic scoring logic (no random jumps)
- **Crash Prevention**: Error boundaries for checklist generation (React bug fix)

### **Task 9: Verification Module** ✅ **NEW!**
Built-in quality assurance and shipping control:
- **Test Checklist (`/prp/07-test`)**:
  - 10-point system verification list
  - localStorage persistence for progress tracking
  - Visual progress bar and status indicators
- **Ship Lock (`/prp/08-ship`)**:
  - Conditional access logic (Blocks access until 10/10 tests pass)
  - "Ready to Ship" celebration screen upon completion
  - Strict quality gate for production deployment


---

## ✨ Features

### Landing Page
- **Hero Section**: Eye-catching headline with gradient background
- **Features Grid**: Three key features with lucide-react icons
  - 📝 Practice Problems - Solve coding challenges
  - 🎥 Mock Interviews - Simulate real interviews
  - 📊 Track Progress - Monitor improvement with analytics
- **Responsive Footer**: Copyright information

### Dashboard Overview
- **Readiness Score**: Visual circular progress showing overall preparation (72/100)
- **Skill Assessment**: Radar chart displaying proficiency across 5 key areas
- **Practice Continuation**: Quick access to resume last topic (Dynamic Programming)
- **Weekly Goals**: Track problems solved with daily activity visualization
- **Assessment Calendar**: Upcoming mock tests and interviews with scheduling

### JD Analysis (NEW!)
- **Smart JD Input**: Company, role, and job description fields
- **Skill Extraction**: Automatic detection of required skills from JD text
- **Readiness Scoring**: 0-100 score based on multiple factors
- **Preparation Planning**: Round-wise checklist and 7-day study plan
- **Interview Prep**: 10 likely questions based on JD requirements
- **History Tracking**: Save and review past analyses

### 6. Company Intel & Round Mapping (New)
- **Heuristic Company Analysis**: Automatically detects "Enterprise" vs "Startup" based on company name.
- **Dynamic Interview Roadmap**: Generates a 3-4 round interview process tailored to the company type.
- **Round-Specific Tips**: Provides "Why this round matters" context and specific focus areas.

### 7. Core Hardening (New)
- **Strict Data Validation**: Ensures JDs are sufficient length for quality analysis.
- **Score Stability**: Base scores remain fixed while you toggle skill confidence.
- **Robust Persistence**: Auto-recovery from corrupted history data.
- **Offline Capable**: All logic runs client-side with no external API dependencies.

### 8. Verification & Shipping (New)
- **Built-in Checklist**: Track system health with a persistent 10-point test list.
- **Production Lock**: Prevents shipping usage until all quality checks are verified.
- **Quality Gate**: Ensures high reliability before "Go Live".

### Navigation
- **Sidebar**: Quick access to all sections
  - Dashboard - Overview and statistics
  - Practice - Coding challenges
  - Assessments - JD analysis tool
  - History - Saved analyses
  - Profile - User settings
- **Header**: Branding and user avatar
- **Routing**: Seamless navigation with React Router

---

## 🎨 Design System

### Color Scheme
- **Primary Color**: `hsl(245, 58%, 51%)` (Indigo/Purple)
- **Gradient Background**: Indigo to Purple (Landing page)
- **Success**: Green badges for high scores
- **Warning**: Yellow/Orange for medium scores
- **Clean UI**: Modern, professional interface

### Typography
- **Headings**: Bold, large sizes for hierarchy
- **Body**: 16px base with 1.7 line-height
- **Font Stack**: System fonts for performance

### Components
- **Cards**: White background with subtle shadows
- **Buttons**: Primary (solid indigo) and Secondary (outlined)
- **Progress Bars**: Smooth animations with primary color
- **Icons**: Lucide React for consistency
- **Tags**: Skill badges with category-based styling

---

## 📦 Installation

### Prerequisites
- Node.js 18+
- npm or yarn

### Setup

```bash
# Clone the repository
git clone https://github.com/Divya07-22/Placement-Kodnest.git

# Navigate to project directory
cd Placement-Kodnest

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

---

## 🏗️ Project Structure

```
placement-readiness/
├── src/
│   ├── layouts/
│   │   └── DashboardLayout.jsx    # Dashboard shell with sidebar
│   ├── pages/
│   │   ├── LandingPage.jsx        # Home page with hero & features
│   │   ├── Dashboard.jsx          # Advanced dashboard with visualizations
│   │   ├── Practice.jsx           # Practice problems (placeholder)
│   │   ├── Assessments.jsx        # JD analysis input form
│   │   ├── Results.jsx            # Analysis results display (NEW)
│   │   ├── Resources.jsx          # History of saved analyses (NEW)
│   │   └── Profile.jsx            # User profile (placeholder)
│   ├── utils/
│   │   └── analysisUtils.js       # JD analysis logic (NEW)
│   ├── App.jsx                    # Router configuration
│   ├── main.jsx                   # Entry point
│   └── index.css                  # Tailwind directives
├── tailwind.config.js             # Tailwind v3 configuration
├── postcss.config.js              # PostCSS configuration
├── vite.config.js                 # Vite configuration
└── package.json                   # Dependencies
```

---

## 🛣️ Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | LandingPage | Home page with hero and features |
| `/dashboard` | Dashboard | Overview with visualizations |
| `/dashboard/practice` | Practice | Coding challenges |
| `/dashboard/assessments` | Assessments | JD analysis input form |
| `/dashboard/results` | Results | Analysis results display (NEW) |
| `/dashboard/resources` | Resources (History) | Saved analyses (NEW) |
| `/dashboard/profile` | Profile | User settings |

---

## 🎯 JD Analysis System

### How It Works

1. **Input**: Paste job description with optional company and role
2. **Analysis**: Heuristic keyword detection extracts skills
3. **Scoring**: Calculate readiness score (0-100)
4. **Planning**: Generate round-wise checklist and 7-day plan
5. **Questions**: Create 10 likely interview questions
6. **Save**: Store analysis in localStorage for future reference

### Skill Categories

- **Core CS**: DSA, OOP, DBMS, OS, Networks
- **Languages**: Java, Python, JavaScript, TypeScript, C++, Go
- **Web**: React, Next.js, Node.js, Express, REST, GraphQL
- **Data**: SQL, MongoDB, PostgreSQL, MySQL, Redis
- **Cloud/DevOps**: AWS, Azure, GCP, Docker, Kubernetes, CI/CD
- **Testing**: Selenium, Cypress, Playwright, JUnit, PyTest

### Readiness Score Calculation

```
Base Score: 35
+ Categories Detected × 5 (max 30)
+ Company Provided: 10
+ Role Provided: 10
+ JD Length > 800 chars: 10
= Total Score (capped at 100)
```

### Sample JD Test

```
Company: Google
Role: Software Engineer
JD: We are looking for a Software Engineer with strong knowledge of DSA, 
Java, React, Node.js, MongoDB, and AWS. Experience with Docker and 
Kubernetes is a plus. Must know OOP, DBMS, and OS concepts.
```

**Expected Score**: 95/100
- Base: 35
- 6 categories: +30
- Company: +10
- Role: +10
- Length: +10

---

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Visit [vercel.com/new](https://vercel.com/new)
3. Import your repository
4. Deploy with one click

**Auto-deployment**: Every push to `main` branch triggers automatic deployment

### Manual Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 🔧 Configuration

### Tailwind Config
```javascript
theme: {
  extend: {
    colors: {
      primary: 'hsl(245, 58%, 51%)',
    },
  },
}
```

### localStorage Structure
```javascript
{
  "jdHistory": [
    {
      "id": "timestamp",
      "createdAt": "ISO date",
      "company": "Company name",
      "role": "Role title",
      "jdText": "Full JD text",
      "extractedSkills": { ... },
      "readinessScore": 95,
      "checklist": { ... },
      "plan": [ ... ],
      "questions": [ ... ]
    }
  ]
}
```

---

## 📱 Responsive Design

- **Mobile-first approach**: Optimized for all screen sizes
- **Breakpoints**:
  - Mobile: Single column layout
  - Tablet: Adjusted spacing
  - Desktop: 2-column grid for dashboard
- **Touch-friendly**: Large tap targets for mobile users

---

## 🎨 Icons

Using [Lucide React](https://lucide.dev/) for consistent iconography:
- **Navigation**: LayoutDashboard, Code, FileText, BookOpen, User
- **Features**: Code, Video, TrendingUp
- **Assessments**: Calendar, Clock, TrendingUp, BookOpen, Sparkles
- **Actions**: ArrowLeft, CheckCircle, Target, Trash2

---

## 🔄 Development Workflow

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

---

## 📊 Technology Stack

| Category | Technology |
|----------|-----------|
| **Frontend** | React 18.3 |
| **Styling** | Tailwind CSS 3.x |
| **Routing** | React Router DOM 7.x |
| **Icons** | Lucide React |
| **Build Tool** | Vite 7.x |
| **Visualizations** | Custom SVG |
| **Storage** | localStorage |
| **Analysis** | Heuristic algorithms (no APIs) |

---

## 🎓 Learning Outcomes

This project demonstrates:
- React component architecture
- React Router for SPA navigation
- Tailwind CSS for rapid UI development
- Custom SVG animations and data visualizations
- Responsive design patterns
- localStorage for data persistence
- Heuristic algorithms for text analysis
- Git workflow and version control
- Vercel deployment and CI/CD

---

## 🧪 Testing

### Manual Verification

1. **Skill Extraction**: Analyze sample JD and verify skills detected
2. **Readiness Score**: Test with minimal and complete JDs
3. **History Persistence**: Refresh page and verify data persists
4. **Multiple Analyses**: Create 3+ analyses and verify all saved
5. **Empty State**: Clear localStorage and verify empty state
6. **Delete**: Remove entries and verify persistence

See [walkthrough.md](./walkthrough.md) for detailed test scenarios.

---

## 📄 License

MIT License - feel free to use this project for learning and development.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

---

**Built with ❤️ for placement preparation**

**Repository**: https://github.com/Divya07-22/Placement-Kodnest
**Live Demo**: https://placement-kodnest.vercel.app

---

## 🎉 Recent Updates

### v2.0 - JD Analysis System (Latest)
- ✅ Heuristic skill extraction from job descriptions
- ✅ Readiness score calculator (0-100)
- ✅ Round-wise preparation checklist
- ✅ 7-day adaptive study plan
- ✅ 10 likely interview questions generator
- ✅ localStorage history with persistence
- ✅ Complete offline functionality
- ✅ No external APIs required

### v1.0 - Core Platform
- ✅ Landing page with hero and features
- ✅ Dashboard with visualizations
- ✅ Circular progress indicators
- ✅ Custom SVG radar charts
- ✅ Weekly goals tracker
- ✅ Responsive design
