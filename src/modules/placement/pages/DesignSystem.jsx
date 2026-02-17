import { PromptBox } from '../components/kodnest-ui/PromptBox';
import { EmptyState } from '../components/kodnest-ui/EmptyState';
// ... previous imports

const DesignSystem = () => {
    // ... previous state hooks

    return (
        <Layout
            projectName="Design System Demo"
            currentStep={3}
            totalSteps={5}
            status={status}
            title="KodNest Premium Build System"
            subtitle="A calm, intentional, and coherent design system for building serious B2C products."
            checklist={checklist}
            onVerify={handleVerify}
            secondaryPanel={
                <Card className="bg-gray-50/50 sticky top-100">
                    <h3 className="font-serif font-bold text-18 mb-16">Quick Actions</h3>
                    <div className="space-y-24">
                        <PromptBox
                            label="Step Prompt"
                            prompt="This is a calm, copyable prompt box designed for clarity and ease of use in the secondary panel."
                        />
                        <div className="flex flex-col gap-8">
                            <Button variant="secondary" className="w-full text-center justify-center">Copy Requirement</Button>
                            <Button variant="primary" className="w-full text-center justify-center">Mark as Done</Button>
                        </div>
                    </div>
                </Card>
            }
        >
            <section className="space-y-40 pb-40">
                {/* Typography & Color sections remain same, implicitly included via previous code or just append here if replacing whole block */}
                {/* ... (Keep existing Typography & Colors sections if replacing whole file, otherwise just add new sections) */}

                {/* Typography */}
                <div>
                    <h2 className="text-24 font-serif font-bold mb-24 border-b pb-8">Typography</h2>
                    <div className="space-y-16">
                        <h1 className="text-4xl font-serif">Heading 1 (Serif)</h1>
                        <h2 className="text-3xl font-serif">Heading 2 (Serif)</h2>
                        <h3 className="text-2xl font-serif">Heading 3 (Serif)</h3>
                        <p className="max-w-[720px] text-16 leading-relaxed text-gray-600">
                            Body text (Sans-serif). The quick brown fox jumps over the lazy dog.
                            Clean, intentional spacing and legible line-heights make for a comfortable reading experience.
                        </p>
                    </div>
                </div>

                {/* Colors */}
                <div>
                    <h2 className="text-24 font-serif font-bold mb-24 border-b pb-8">Colors</h2>
                    <div className="flex gap-16 flex-wrap">
                        <div className="space-y-8">
                            <div className="w-64 h-64 bg-background border border-gray-200 rounded-md"></div>
                            <p className="text-12">Background</p>
                        </div>
                        <div className="space-y-8">
                            <div className="w-64 h-64 bg-primary rounded-md"></div>
                            <p className="text-12">Primary</p>
                        </div>
                        <div className="space-y-8">
                            <div className="w-64 h-64 bg-accent rounded-md"></div>
                            <p className="text-12">Accent</p>
                        </div>
                        <div className="space-y-8">
                            <div className="w-64 h-64 bg-success rounded-md"></div>
                            <p className="text-12">Success</p>
                        </div>
                        <div className="space-y-8">
                            <div className="w-64 h-64 bg-warning rounded-md"></div>
                            <p className="text-12">Warning</p>
                        </div>
                    </div>
                </div>

                {/* Components */}
                <div>
                    <h2 className="text-24 font-serif font-bold mb-24 border-b pb-8">Components</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-32">
                        <Card>
                            <h3 className="font-bold mb-16">Buttons</h3>
                            <div className="flex flex-wrap gap-16">
                                <Button variant="primary">Primary Action</Button>
                                <Button variant="secondary">Secondary Action</Button>
                                <Button variant="ghost">Ghost Action</Button>
                            </div>
                        </Card>

                        <Card>
                            <h3 className="font-bold mb-16">Inputs</h3>
                            <div className="space-y-16">
                                <Input label="Email Address" placeholder="alex@example.com" />
                                <Input label="Error State" error="This field is required" />
                            </div>
                        </Card>

                        <Card>
                            <h3 className="font-bold mb-16">Status Badges</h3>
                            <div className="flex gap-8">
                                <StatusBadge status="not_started" />
                                <StatusBadge status="in_progress" />
                                <StatusBadge status="shipped" />
                            </div>
                        </Card>

                        <Card className="md:col-span-2">
                            <h3 className="font-bold mb-16">Prompt Box</h3>
                            <PromptBox
                                prompt="This component handles copyable text areas, perfect for code snippets or requirements."
                            />
                        </Card>
                    </div>
                </div>

                {/* Empty States */}
                <div>
                    <h2 className="text-24 font-serif font-bold mb-24 border-b pb-8">Empty States</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-32">
                        <EmptyState
                            title="No Projects Found"
                            description="You haven't created any projects yet. Start by creating your first project."
                            actionLabel="Create Project"
                            onAction={() => { }}
                        />
                        <EmptyState
                            title="Connection Error"
                            description="We couldn't connect to the server. Please check your internet connection and try again."
                            actionLabel="Retry"
                            onAction={() => { }}
                            className="border-red-100 bg-red-50/30"
                        />
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default DesignSystem;
