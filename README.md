# Placement Readiness Platform

A comprehensive web application to help students prepare for campus placements through practice problems, mock interviews, and progress tracking.

![React](https://img.shields.io/badge/React-18.3-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-38bdf8)
![React Router](https://img.shields.io/badge/React_Router-6.x-red)

## 🚀 Live Demo

**Production URL**: [https://placement-kodnest.vercel.app](https://placement-kodnest.vercel.app)

## ✨ Features

### Landing Page
- **Hero Section**: Eye-catching headline with call-to-action
- **Features Grid**: Three key features with icons
  - 📝 Practice Problems - Solve coding challenges
  - 🎥 Mock Interviews - Simulate real interviews
  - 📊 Track Progress - Monitor improvement with analytics
- **Responsive Footer**: Copyright information

### Dashboard
- **Sidebar Navigation**: Quick access to all sections
  - Dashboard - Overview and statistics
  - Practice - Coding challenges
  - Assessments - Skill evaluation
  - Resources - Study materials
  - Profile - User settings
- **Header**: Branding and user avatar
- **Stats Cards**: Visual progress indicators

## 🎨 Design System

### Color Scheme
- **Primary Color**: `hsl(245, 58%, 51%)` (Indigo/Purple)
- **Gradient Background**: Indigo to Purple
- **Clean UI**: Modern, professional interface

### Technology Stack
- **Frontend**: React 18.3
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Build Tool**: Vite

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

## 🏗️ Project Structure

```
placement-readiness/
├── src/
│   ├── layouts/
│   │   └── DashboardLayout.jsx    # Dashboard shell with sidebar
│   ├── pages/
│   │   ├── LandingPage.jsx        # Home page
│   │   ├── Dashboard.jsx          # Dashboard overview
│   │   ├── Practice.jsx           # Practice problems
│   │   ├── Assessments.jsx        # Skill assessments
│   │   ├── Resources.jsx          # Study materials
│   │   └── Profile.jsx            # User profile
│   ├── App.jsx                    # Router configuration
│   ├── main.jsx                   # Entry point
│   └── index.css                  # Tailwind directives
├── tailwind.config.js             # Tailwind configuration
├── vite.config.js                 # Vite configuration
└── package.json                   # Dependencies
```

## 🛣️ Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | LandingPage | Home page with hero and features |
| `/dashboard` | Dashboard | Overview with statistics |
| `/dashboard/practice` | Practice | Coding challenges |
| `/dashboard/assessments` | Assessments | Skill evaluation |
| `/dashboard/resources` | Resources | Study materials |
| `/dashboard/profile` | Profile | User settings |

## 🎯 Key Components

### LandingPage
- Hero section with "Ace Your Placement" headline
- Features grid with 3 cards
- "Get Started" button navigates to dashboard
- Footer with copyright

### DashboardLayout
- Sidebar with 5 navigation links
- Each link has a lucide-react icon
- Header with "Placement Prep" branding
- User avatar placeholder
- Main content area with `<Outlet />`

### Dashboard
- Statistics cards showing:
  - Problems Solved: 42
  - Mock Interviews: 8
  - Success Rate: 85%

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Visit [vercel.com/new](https://vercel.com/new)
3. Import your repository
4. Deploy with one click

### Manual Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

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

### Environment Variables
No environment variables required for basic setup.

## 📱 Responsive Design

- Mobile-first approach
- Responsive grid layouts
- Adaptive navigation
- Touch-friendly interface

## 🎨 Icons

Using [Lucide React](https://lucide.dev/) for consistent iconography:
- `LayoutDashboard` - Dashboard
- `Code` - Practice
- `FileText` - Assessments
- `BookOpen` - Resources
- `User` - Profile
- `Video` - Mock Interviews
- `TrendingUp` - Progress Tracking

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

## 📄 License

MIT License - feel free to use this project for learning and development.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

---

**Built with ❤️ for placement preparation**
