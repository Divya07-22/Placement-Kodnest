import { useState } from 'react';
import { TopBar } from './components/TopBar';
import { ContextHeader } from './components/ContextHeader';
import { SecondaryPanel } from './components/SecondaryPanel';
import { ProofFooter } from './components/ProofFooter';
import { Card, Button, Input, EmptyState } from './components/UIComponents';

function App() {
  const [checklistItems, setChecklistItems] = useState([
    { label: 'UI Built', checked: false },
    { label: 'Logic Working', checked: false },
    { label: 'Test Passed', checked: false },
    { label: 'Deployed', checked: false },
  ]);

  const handleChecklistChange = (index) => {
    const newItems = [...checklistItems];
    newItems[index].checked = !newItems[index].checked;
    setChecklistItems(newItems);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText('npx create-react-app my-project');
    alert('Prompt copied to clipboard');
  };

  return (
    <div className="app-container">
      <TopBar
        projectName="KodNest Premium Build System"
        currentStep={1}
        totalSteps={5}
        status="In Progress"
      />

      <ContextHeader
        headline="Design System Demo"
        subtext="A calm, intentional, and coherent design system for serious B2C products."
      />

      <div className="main-workspace">
        <div className="primary-workspace">
          <h2 className="mb-md">Primary Workspace</h2>

          <Card className="mb-md">
            <h3 className="mb-sm">Component Showcase</h3>
            <p className="mb-md">
              This is where the main product interaction happens. Clean cards,
              predictable components, no crowding.
            </p>

            <div className="mb-md">
              <label style={{ display: 'block', marginBottom: 'var(--space-xs)', fontWeight: 500 }}>
                Project Name
              </label>
              <Input placeholder="Enter project name" />
            </div>

            <div style={{ display: 'flex', gap: 'var(--space-sm)' }}>
              <Button variant="primary">Primary Action</Button>
              <Button variant="secondary">Secondary Action</Button>
            </div>
          </Card>

          <Card className="mb-md">
            <h3 className="mb-sm">Typography System</h3>
            <h1>Heading 1 - Crimson Pro Serif</h1>
            <h2>Heading 2 - Crimson Pro Serif</h2>
            <h3>Heading 3 - Crimson Pro Serif</h3>
            <h4>Heading 4 - Crimson Pro Serif</h4>
            <p>
              Body text uses Inter sans-serif at 16px with 1.7 line-height.
              Maximum width is constrained to 720px for optimal readability.
              No decorative fonts, no random sizes.
            </p>
          </Card>

          <Card>
            <h3 className="mb-sm">Color System</h3>
            <div style={{ display: 'flex', gap: 'var(--space-md)', flexWrap: 'wrap' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  backgroundColor: '#F7F6F3',
                  border: '1px solid var(--border-color)',
                  marginBottom: 'var(--space-xs)'
                }}></div>
                <div style={{ fontSize: '13px' }}>Background</div>
                <div style={{ fontSize: '12px', opacity: 0.6 }}>#F7F6F3</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  backgroundColor: '#111111',
                  marginBottom: 'var(--space-xs)'
                }}></div>
                <div style={{ fontSize: '13px' }}>Primary Text</div>
                <div style={{ fontSize: '12px', opacity: 0.6 }}>#111111</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  backgroundColor: '#8B0000',
                  marginBottom: 'var(--space-xs)'
                }}></div>
                <div style={{ fontSize: '13px' }}>Accent</div>
                <div style={{ fontSize: '12px', opacity: 0.6 }}>#8B0000</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  backgroundColor: '#4A6741',
                  marginBottom: 'var(--space-xs)'
                }}></div>
                <div style={{ fontSize: '13px' }}>Success</div>
                <div style={{ fontSize: '12px', opacity: 0.6 }}>#4A6741</div>
              </div>
            </div>
          </Card>
        </div>

        <SecondaryPanel
          stepExplanation="This panel provides context and actions for the current step. Keep explanations short and actionable."
          promptText="npx create-react-app my-project"
          onCopy={handleCopy}
          onBuildInLovable={() => alert('Build in Lovable clicked')}
          onItWorked={() => alert('It Worked clicked')}
          onError={() => alert('Error clicked')}
          onAddScreenshot={() => alert('Add Screenshot clicked')}
        />
      </div>

      <ProofFooter
        checklistItems={checklistItems}
        onChecklistChange={handleChecklistChange}
      />
    </div>
  );
}

export default App;
