import { v4 as uuidv4 } from 'uuid';
// const uuidv4 = () => Date.now().toString();

// --- DATA SETS ---

const SKILL_KEYWORDS = {
    coreCS: ['dsa', 'data structures', 'algorithms', 'oop', 'object oriented', 'dbms', 'database management', 'os', 'operating systems', 'networks', 'computer networks', 'system design'],
    languages: ['java', 'python', 'javascript', 'js', 'typescript', 'ts', 'c++', 'c#', 'golang', 'ruby', 'swift', 'kotlin'],
    web: ['react', 'next.js', 'nextjs', 'node', 'node.js', 'express', 'html', 'css', 'tailwind', 'redux', 'rest api', 'graphql', 'angular', 'vue'],
    data: ['sql', 'mysql', 'postgresql', 'postgres', 'mongodb', 'mongo', 'redis', 'cassandra', 'kafka', 'spark', 'hadoop'],
    cloudDevOps: ['aws', 'amazon web services', 'azure', 'gcp', 'google cloud', 'docker', 'kubernetes', 'k8s', 'jenkins', 'ci/cd', 'github actions', 'linux', 'bash'],
    testing: ['selenium', 'cypress', 'playwright', 'junit', 'pytest', 'jest', 'manual testing']
};

const QUESTIONS_DB = {
    'react': [
        "Explain the Virtual DOM and how it improves performance.",
        "What are React Hooks? Explain useState and useEffect.",
        "How do you manage state in a complex React application?",
        "Explain the component lifecycle in React.",
        "What is the difference between specific functional and class components?"
    ],
    'node': [
        "Explain the Event Loop in Node.js.",
        "Difference between process.nextTick() and setImmediate().",
        "How to handle blocking operations in Node.js?",
        "Explain Streams and Buffers in Node.js."
    ],
    'sql': [
        "Explain ACID properties in databases.",
        "Difference between WHERE and HAVING clause.",
        "What are the different types of joins?",
        "Explain indexing and how it optimizes queries.",
        "What is normalization and denormalization?"
    ],
    'java': [
        "Explain the pillars of OOP with real-world examples.",
        "Difference between HashMap and Hashtable.",
        "What is the contract between equals() and hashCode()?",
        "Explain multithreading and synchronization in Java.",
        "Memory management and Garbage Collection in Java."
    ],
    'dsa': [
        "How would you detect a cycle in a linked list?",
        "Explain QuickSort and its time complexity.",
        "Difference between BFS and DFS.",
        "How to implement a Stack using Queues?",
        "Find the longest substring without repeating characters."
    ]
};

const DEFAULT_QUESTIONS = [
    "Tell me about yourself and your background.",
    "What is your greatest strength and weakness?",
    "Why do you want to join our company?",
    "Describe a challenging project you worked on.",
    "Where do you see yourself in 5 years?"
];

// --- CONFIG ---
const KNOWN_ENTERPRISES = [
    'amazon', 'google', 'microsoft', 'adobe', 'cisco', 'ibm', 'accenture', 'tcs', 'infosys', 'wipro', 'cognizant', 'capgemini', 'deloitte', 'oracle', 'salesforce', 'uber', 'atlassian', 'intuit', 'samsung', 'jpmorgan', 'goldman sachs', 'walmart', 'flipkart', 'paytm', 'zomato', 'swiggy'
];

// --- CORE FUNCTIONS ---

export const analyzeJD = (jdText, company, role) => {
    const text = jdText.toLowerCase();
    const extractedSkills = {
        coreCS: [],
        languages: [],
        web: [],
        data: [],
        cloudDevOps: [],
        testing: [],
        general: [], // Will populate if almost empty
        other: [] // Catch-all if needed
    };

    let totalMatches = 0;
    let categoriesPresent = 0;

    // 1. Extract Skills
    Object.keys(SKILL_KEYWORDS).forEach(category => {
        const found = SKILL_KEYWORDS[category].filter(keyword => text.includes(keyword));
        if (found.length > 0) {
            extractedSkills[category] = [...new Set(found)]; // Dedup
            totalMatches += found.length;
            categoriesPresent++;
        }
    });

    // Fallback if no skills detected at all
    if (totalMatches === 0) {
        extractedSkills.other = ['Communication', 'Problem Solving', 'Basic Coding', 'Project Management'];
        categoriesPresent = 1; // Give some points for generic skills
    } else if (totalMatches < 2) {
        // Weak signal fallback
        extractedSkills.general = ['Problem Solving', 'Communication', 'Aptitude'];
    }

    // 2. Calculate Score
    let score = 35; // Base score
    score += (categoriesPresent * 5); // +5 per category (max 30)
    score += company ? 10 : 0;
    score += role ? 10 : 0;
    score += jdText.length > 800 ? 10 : 0;
    score += Math.min(totalMatches, 5); // Small bonus for total keyword density

    // Cap at 100
    score = Math.min(Math.round(score), 100);

    // 3. Generate Company Intel & Rounds
    const companyIntel = generateCompanyIntel(company);
    const roundMapping = generateRoundMapping(companyIntel.type, extractedSkills);

    // 4. Generate Artifacts
    const plan = generatePlan(extractedSkills);
    const checklist = generateChecklist(extractedSkills);
    const questions = generateQuestions(extractedSkills);

    // 5. Construct Result Object (Strict Schema)
    const timestamp = Date.now();
    const analysisResult = {
        id: uuidv4(),
        createdAt: timestamp,
        updatedAt: timestamp,
        company: company || '',     // No nulls
        role: role || '',           // No nulls
        jdText: jdText || '',       // No nulls
        extractedSkills,            // Guaranteed to have all keys

        // Scores
        baseScore: score,           // Fixed baseline
        finalScore: score,          // Mutable (initially same as base)
        readinessScore: score,      // Legacy support (aliased to finalScore)

        // Artifacts
        plan7Days: plan,            // Schema requires plan7Days
        plan: plan,                 // Keep 'plan' for existing UI compatibility
        checklist,
        questions,
        companyIntel,
        roundMapping,

        // User State
        skillConfidenceMap: {}
    };

    // Save to History
    saveToHistory(analysisResult);

    return analysisResult;
};

// --- GENERATORS ---

const generateCompanyIntel = (companyName) => {
    if (!companyName) return null;

    const nameLower = companyName.toLowerCase();
    const isEnterprise = KNOWN_ENTERPRISES.some(ent => nameLower.includes(ent));

    if (isEnterprise) {
        return {
            name: companyName,
            type: 'Enterprise',
            size: '2000+ Employees',
            focus: 'Strong emphasis on Data Structures, Algorithms, and Core CS fundamentals. Expect standardized elimination rounds.'
        };
    } else {
        return {
            name: companyName,
            type: 'Startup / Mid-size',
            size: '< 200 Employees',
            focus: 'Practical problem solving and specific tech stack depth. Expect machine coding or system discussion rounds.'
        };
    }
};

const generateRoundMapping = (type, skills) => {
    const rounds = [];
    const hasDSA = skills.coreCS.includes('dsa') || skills.coreCS.includes('algorithms');
    const hasWeb = skills.web.length > 0;

    if (type === 'Enterprise') {
        rounds.push({
            title: 'Round 1: Online Assessment',
            focus: 'Aptitude + DSA (Medium)',
            why: 'To filter thousands of applicants efficiently.',
            tips: ['Focus on Array/String/DP problems', 'Speed and accuracy matter most']
        });
        rounds.push({
            title: 'Round 2: Technical Interview I',
            focus: 'DSA + Core CS (OS/DBMS)',
            why: 'To test your problem-solving foundations.',
            tips: ['Explain your thought process clearly', 'Handle edge cases']
        });
        rounds.push({
            title: 'Round 3: Technical Interview II',
            focus: 'Advanced DSA + Project Deep Dive',
            why: 'To verify project ownership and depth.',
            tips: ['Know your resume projects inside out', 'Be ready for "Why this stack?"']
        });
        rounds.push({
            title: 'Round 4: HR / Managerial',
            focus: 'Behavioral + Culture Fit',
            why: 'To ensure long-term stability and team fit.',
            tips: ['Use STAR method for answers', 'Research company values']
        });
    } else {
        // Startup Flow
        rounds.push({
            title: 'Round 1: Practical / Machine Coding',
            focus: hasWeb ? 'Build a Feature / UI' : 'Scripting / Logic',
            why: 'To prove you can write production-ready code.',
            tips: ['Write clean, modular code', 'Handle errors gracefully']
        });
        rounds.push({
            title: 'Round 2: Tech Design / System Discussion',
            focus: 'Architecture + DB Design',
            why: 'To see if you can build scalable systems.',
            tips: ['Discuss trade-offs (SQL vs NoSQL)', 'Focus on API design']
        });
        rounds.push({
            title: 'Round 3: Culture & Founder Fit',
            focus: 'Passion + Ownership',
            why: 'Startups need self-starters who take ownership.',
            tips: ['Show enthusiasm for the product', 'Ask good questions']
        });
    }
    return rounds;
};

const generatePlan = (skills) => {
    // Determine focus areas
    const hasWeb = skills.web.length > 0;
    const hasDSA = skills.coreCS.includes('dsa') || skills.coreCS.includes('algorithms');
    const hasData = skills.data.length > 0;

    return [
        { day: 1, title: "Foundation & Aptitude", tasks: ["Practice Quantitative Aptitude (30 mins)", "Review Logical Reasoning (30 mins)", "Brush up on Resume basics"] },
        { day: 2, title: "Core CS Concepts", tasks: ["Revise OOP principles", "Review DBMS Normalization & SQL Basics", "OS: Process Management & Deadlocks"] },
        { day: 3, title: hasDSA ? "Data Structures Deep Dive" : "Coding Practice", tasks: ["Solve 3 Easy LeetCode problems", "Implement Linked List & Stack from scratch", "Review Time Complexity Analysis"] },
        { day: 4, title: "Advanced Algorithms", tasks: ["Practice Tree & Graph traversals", "Solve 2 Medium LeetCode problems", "Dynamic Programming Basics"] },
        { day: 5, title: hasWeb ? "Project & Frameworks" : "Tech Stack Revision", tasks: [`Revise ${skills.web[0] || 'your primary language'} concepts`, "Prepare 'Project Walkthrough' script", "System Design Basics (Scalability, Load Balancing)"] },
        { day: 6, title: "Mock Interviews", tasks: ["Self-record 'Tell me about yourself'", "Practice behavioral answers using STAR method", "Review top 20 HR questions"] },
        { day: 7, title: "Final Polish", tasks: ["Full-length Mock Test", "Review weak areas from previous days", "Relax & sleep early"] }
    ];
};

const generateChecklist = (skills) => {
    const list = {
        round1: ["Quantitative Aptitude (Time & Work, Percentages)", "Logical Reasoning (Puzzles, Series)", "Verbal Ability Basics", "Resume sanity check"],
        round2: ["Space/Time Complexity Analysis", "Array & String Manipulation", "Basic Data Structures (Stack, Queue, Map)", "OOP Concepts (Inheritance, Polymorphism)"],
        round3: ["Project Deep Dive (Architecture, Challenges)", "Db Design / Schema Modeling", "API Design (REST/GraphQL)", "Language-specific Internals (e.g., Event Loop, JVM)"],
        round4: ["Introduction & Elevator Pitch", "Why this company?", "Strengths & Weaknesses", "Situation handling (Conflict resolution)", "Salary negotiation prep"]
    };

    // Add specific tech items
    if (skills.web.includes('react')) list.round3.push("React Lifecycle / Hooks / State");
    if (skills.data.length > 0) list.round2.push("Complex SQL Queries (Joins, Windows functions)");

    return list;
};

const generateQuestions = (skills) => {
    let questions = [];

    // Flatten skills to finding matching questions
    const allSkills = Object.values(skills).flat();

    allSkills.forEach(skill => {
        // Simple fuzzy match or direct lookup
        Object.keys(QUESTIONS_DB).forEach(key => {
            if (skill.includes(key)) {
                questions = [...questions, ...QUESTIONS_DB[key]];
            }
        });
    });

    // Fill with default behavioral if needed
    if (questions.length < 10) {
        questions = [...questions, ...DEFAULT_QUESTIONS].slice(0, 10);
    } else {
        questions = questions.slice(0, 10);
    }

    return questions;
};

// --- STORAGE ---

export const saveToHistory = (entry) => {
    try {
        const history = JSON.parse(localStorage.getItem('prp_analysis_history') || '[]');
        const updatedHistory = [entry, ...history].slice(0, 50); // Keep last 50
        localStorage.setItem('prp_analysis_history', JSON.stringify(updatedHistory));
    } catch (e) {
        console.error("Storage failed", e);
    }
};

export const getHistory = () => {
    try {
        const raw = localStorage.getItem('prp_analysis_history');
        if (!raw) return [];
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) return [];

        // Filter out corrupted entries (missing ID or timestamp)
        return parsed.filter(item => item && item.id && item.createdAt);
    } catch (e) {
        console.error("History load failed", e);
        return [];
    }
};

export const getHistoryById = (id) => {
    const history = getHistory();
    return history.find(item => item.id === id);
};

export const updateHistoryEntry = (id, updates) => {
    try {
        const history = getHistory();
        const index = history.findIndex(item => item.id === id);
        if (index !== -1) {
            history[index] = {
                ...history[index],
                ...updates,
                updatedAt: Date.now() // Update timestamp
            };

            // Sync legacy field if finalScore changed
            if (updates.finalScore !== undefined) {
                history[index].readinessScore = updates.finalScore;
            }

            localStorage.setItem('prp_analysis_history', JSON.stringify(history));
        }
    } catch (e) {
        console.error("Update failed", e);
    }
};

