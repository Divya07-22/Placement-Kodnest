# KodNest Premium Build System

A calm, intentional, and coherent design system for serious B2C product companies. Built with React.js and a strict design philosophy that prioritizes clarity, consistency, and confidence.

![Design System Preview](https://img.shields.io/badge/Status-Production%20Ready-success)
![React](https://img.shields.io/badge/React-18.3-blue)
![Vite](https://img.shields.io/badge/Vite-7.3-purple)

## Design Philosophy

**Calm. Intentional. Coherent. Confident.**

This is not a student project. This design system embodies the principles of serious B2C product design:

- **No flashy elements** – No gradients, no glassmorphism, no neon colors
- **No animation noise** – Subtle, purposeful transitions only
- **No visual drift** – Every component feels like it was designed by one mind
- **Maximum clarity** – Clean typography, generous whitespace, predictable layouts

## Color System

A strictly limited palette of 4 colors:

| Color | Hex | Usage |
|-------|-----|-------|
| **Background** | `#F7F6F3` | Off-white canvas |
| **Primary Text** | `#111111` | All text content |
| **Accent** | `#8B0000` | Primary actions, deep red |
| **Success** | `#4A6741` | Muted green for confirmations |

## Typography

- **Headings**: Crimson Pro (Serif) – Large, confident, generous spacing
- **Body**: Inter (Sans-serif) – 16–18px, line-height 1.6–1.8
- **Max width**: 720px for optimal readability
- **No decorative fonts** – Only two font families across the entire system

## Spacing System

Consistent scale based on 8px increments:

```
8px  → --space-xs
16px → --space-sm
24px → --space-md
40px → --space-lg
64px → --space-xl
```

**No random spacing** like 13px or 27px. Whitespace is part of the design.

## Global Layout Structure

Every page follows this predictable structure:

```
┌─────────────────────────────────────────────┐
│ [Top Bar]                                   │
├─────────────────────────────────────────────┤
│ [Context Header]                            │
├─────────────────────────────────────────────┤
│ [Primary Workspace] │ [Secondary Panel]     │
│        70%          │       30%             │
├─────────────────────────────────────────────┤
│ [Proof Footer]                              │
└─────────────────────────────────────────────┘
```

### Top Bar
- **Left**: Project name
- **Center**: Progress indicator (Step X / Y)
- **Right**: Status badge (Not Started / In Progress / Shipped)

### Context Header
- Large serif headline
- 1-line subtext
- Clear purpose, no hype language

### Primary Workspace (70% width)
- Main product interaction area
- Clean cards, predictable components
- No crowding

### Secondary Panel (30% width)
- Step explanation (short)
- Copyable prompt box
- Action buttons with calm styling

### Proof Footer
- Persistent bottom checklist
- Requires user proof input for completion

## Component Library

### Core Components

- **TopBar** – Project navigation and status
- **ContextHeader** – Page headline and context
- **SecondaryPanel** – Step guidance and actions
- **ProofFooter** – Completion tracking
- **Card** – Content container with subtle border
- **Button** – Primary (solid red) and Secondary (outlined)
- **Input** – Clean borders, clear focus state
- **ErrorState** – Explains what went wrong + how to fix
- **EmptyState** – Provides next action

### Component Rules

- Same hover effect everywhere (180ms ease-in-out)
- Same border radius everywhere (2px)
- No drop shadows on cards
- Balanced padding using spacing system
- Predictable, calm interactions

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

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
```

## Project Structure

```
kodnest-placement/
├── src/
│   ├── components/
│   │   ├── TopBar.jsx
│   │   ├── ContextHeader.jsx
│   │   ├── SecondaryPanel.jsx
│   │   ├── ProofFooter.jsx
│   │   └── UIComponents.jsx
│   ├── App.jsx
│   ├── index.css          # Complete design system
│   └── main.jsx
├── index.html
├── package.json
└── README.md
```

## Design Tokens

All design tokens are defined as CSS variables in `src/index.css`:

```css
:root {
  /* Colors */
  --color-bg: #F7F6F3;
  --color-text-primary: #111111;
  --color-accent: #8B0000;
  --color-success: #4A6741;
  
  /* Spacing */
  --space-xs: 8px;
  --space-sm: 16px;
  --space-md: 24px;
  --space-lg: 40px;
  --space-xl: 64px;
  
  /* Typography */
  --font-serif: 'Crimson Pro', Georgia, serif;
  --font-sans: 'Inter', sans-serif;
  
  /* Interaction */
  --transition-speed: 180ms;
  --transition-easing: ease-in-out;
}
```

## Usage Examples

### Creating a Page

```jsx
import { TopBar, ContextHeader, SecondaryPanel, ProofFooter } from './components';
import { Card, Button, Input } from './components/UIComponents';

function MyPage() {
  return (
    <div className="app-container">
      <TopBar 
        projectName="My Project" 
        currentStep={1} 
        totalSteps={5} 
        status="In Progress" 
      />
      
      <ContextHeader 
        headline="Build Your Feature"
        subtext="Follow the steps to complete this task."
      />
      
      <div className="main-workspace">
        <div className="primary-workspace">
          <Card>
            <h3>Your Content Here</h3>
            <Input placeholder="Enter details" />
            <Button variant="primary">Submit</Button>
          </Card>
        </div>
        
        <SecondaryPanel 
          stepExplanation="Complete the form above"
          promptText="npm install package-name"
          onCopy={() => {}}
        />
      </div>
      
      <ProofFooter checklistItems={[]} />
    </div>
  );
}
```

## Error & Empty States

### Error State
- Explains what went wrong
- Provides how to fix it
- Never blames the user

### Empty State
- Provides next action
- Never feels dead or abandoned

## Interaction Principles

- **Transitions**: 150–200ms, ease-in-out
- **No bounce effects**
- **No parallax scrolling**
- **No animation noise**
- Calm, predictable, professional

## Contributing

This design system is intentionally strict. Any contributions must:

1. Follow the 4-color palette exactly
2. Use only the defined spacing scale
3. Maintain visual coherence with existing components
4. Avoid flashy or playful elements
5. Keep interactions calm and predictable

## License

MIT License - feel free to use this design system in your projects.

## Acknowledgments

Built with a focus on calm, intentional design inspired by:
- Linear's design system
- Stripe's documentation
- Notion's interface clarity

---

**Everything must feel like one mind designed it. No visual drift.**
