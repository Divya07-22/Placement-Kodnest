// Skill extraction and analysis utilities

export const SKILL_CATEGORIES = {
    coreCS: ['DSA', 'OOP', 'DBMS', 'OS', 'Networks', 'Data Structures', 'Algorithms', 'Operating System', 'Database'],
    languages: ['Java', 'Python', 'JavaScript', 'TypeScript', 'C++', 'C#', 'Go', 'Rust', 'Kotlin', 'Swift'],
    web: ['React', 'Next.js', 'Node.js', 'Express', 'REST', 'GraphQL', 'Angular', 'Vue', 'HTML', 'CSS', 'Frontend', 'Backend'],
    data: ['SQL', 'MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'NoSQL', 'Database'],
    cloudDevOps: ['AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'CI/CD', 'Linux', 'DevOps', 'Jenkins', 'Git'],
    testing: ['Selenium', 'Cypress', 'Playwright', 'JUnit', 'PyTest', 'Testing', 'QA', 'Jest', 'Mocha']
};

export function extractSkills(jdText) {
    const text = jdText.toLowerCase();
    const extracted = {};

    Object.keys(SKILL_CATEGORIES).forEach(category => {
        const found = SKILL_CATEGORIES[category].filter(skill =>
            text.includes(skill.toLowerCase())
        );
        if (found.length > 0) {
            extracted[category] = found;
        }
    });

    return Object.keys(extracted).length > 0 ? extracted : { general: ['General fresher stack'] };
}

export function calculateReadinessScore(jdText, company, role, extractedSkills) {
    let score = 35; // Base score

    // +5 per category detected (max 30)
    const categoriesDetected = Object.keys(extractedSkills).filter(k => k !== 'general').length;
    score += Math.min(categoriesDetected * 5, 30);

    // +10 if company provided
    if (company && company.trim().length > 0) {
        score += 10;
    }

    // +10 if role provided
    if (role && role.trim().length > 0) {
        score += 10;
    }

    // +10 if JD length > 800 chars
    if (jdText.length > 800) {
        score += 10;
    }

    return Math.min(score, 100);
}

export function generateChecklist(extractedSkills) {
    const hasSkill = (category) => extractedSkills[category] && extractedSkills[category].length > 0;

    return {
        round1: [
            'Complete aptitude test practice (Quantitative, Logical, Verbal)',
            'Review basic mathematics and reasoning',
            'Practice time management for MCQ tests',
            'Solve previous year aptitude papers',
            'Brush up on basic computer fundamentals'
        ],
        round2: [
            hasSkill('coreCS') ? 'Master DSA concepts: Arrays, Linked Lists, Trees, Graphs' : 'Learn basic data structures',
            hasSkill('coreCS') ? 'Practice coding problems on LeetCode/HackerRank (50+ problems)' : 'Start with easy coding problems',
            'Revise OOP concepts: Inheritance, Polymorphism, Encapsulation',
            'Study DBMS: Normalization, Joins, Transactions',
            'Review OS concepts: Processes, Threads, Memory Management',
            'Understand networking basics: TCP/IP, HTTP, DNS',
            hasSkill('languages') ? `Practice ${extractedSkills.languages[0]} coding questions` : 'Choose a primary language and practice'
        ],
        round3: [
            hasSkill('web') ? 'Prepare to explain your web development projects in detail' : 'Prepare project explanations',
            hasSkill('web') && hasSkill('web').includes('React') ? 'Deep dive into React: Hooks, State Management, Performance' : 'Review your tech stack',
            hasSkill('data') ? 'Be ready to write SQL queries and explain database design' : 'Learn basic SQL',
            hasSkill('cloudDevOps') ? 'Explain your DevOps/Cloud experience with examples' : 'Understand deployment basics',
            'Prepare STAR format answers for project challenges',
            'Review system design basics (if applicable)',
            hasSkill('testing') ? 'Discuss testing strategies and frameworks you\'ve used' : 'Learn testing fundamentals',
            'Update resume to highlight relevant skills'
        ],
        round4: [
            'Prepare "Tell me about yourself" answer (2-minute pitch)',
            'Research company culture, values, and recent news',
            'Prepare answers for: strengths, weaknesses, career goals',
            'Practice behavioral questions using STAR method',
            'Prepare questions to ask the interviewer',
            'Review your resume thoroughly - be ready to explain everything',
            'Prepare examples of teamwork, leadership, and conflict resolution',
            'Practice mock HR interviews with friends/mentors'
        ]
    };
}

export function generate7DayPlan(extractedSkills) {
    const hasSkill = (category) => extractedSkills[category] && extractedSkills[category].length > 0;

    return [
        {
            day: 1,
            title: 'Basics & Core CS',
            tasks: [
                'Review OOP concepts and practice coding',
                'Revise DBMS fundamentals',
                hasSkill('languages') ? `Practice ${extractedSkills.languages[0]} syntax and basics` : 'Choose and practice a language',
                'Solve 5 easy coding problems'
            ]
        },
        {
            day: 2,
            title: 'Core CS Deep Dive',
            tasks: [
                'Study OS concepts: Processes, Threads, Scheduling',
                'Review Networking basics',
                'Practice DBMS queries and normalization',
                'Solve 5 medium coding problems'
            ]
        },
        {
            day: 3,
            title: 'DSA Practice',
            tasks: [
                'Master Arrays and Strings problems',
                'Practice Linked List operations',
                'Solve 10 DSA problems (mix of easy and medium)',
                'Review time and space complexity'
            ]
        },
        {
            day: 4,
            title: 'Advanced DSA',
            tasks: [
                'Study Trees and Graphs',
                'Practice dynamic programming basics',
                hasSkill('coreCS') ? 'Solve 10 medium-hard DSA problems' : 'Solve 8 medium problems',
                'Review sorting and searching algorithms'
            ]
        },
        {
            day: 5,
            title: 'Projects & Tech Stack',
            tasks: [
                hasSkill('web') ? 'Review React/Frontend concepts and best practices' : 'Review your project tech stack',
                hasSkill('data') ? 'Practice SQL queries and database design' : 'Learn basic database operations',
                'Prepare detailed project explanations',
                'Update resume with quantified achievements',
                hasSkill('cloudDevOps') ? 'Review Docker/Cloud deployment experience' : 'Understand basic deployment'
            ]
        },
        {
            day: 6,
            title: 'Mock Interviews',
            tasks: [
                'Practice 5 technical interview questions aloud',
                'Do a mock coding interview with a friend',
                'Prepare HR answers using STAR method',
                'Research the company thoroughly',
                'Practice "Tell me about yourself" pitch'
            ]
        },
        {
            day: 7,
            title: 'Revision & Weak Areas',
            tasks: [
                'Revise all core CS concepts',
                'Solve 5 problems from your weak areas',
                'Review all project details',
                'Practice behavioral questions',
                'Get good sleep and stay confident!'
            ]
        }
    ];
}

export function generateInterviewQuestions(extractedSkills) {
    const questions = [];
    const hasSkill = (category) => extractedSkills[category] && extractedSkills[category].length > 0;

    // DSA questions
    if (hasSkill('coreCS')) {
        questions.push(
            'Explain the difference between Array and Linked List. When would you use each?',
            'How would you detect a cycle in a linked list?',
            'What is the time complexity of searching in a balanced BST vs an unbalanced one?'
        );
    }

    // Language-specific
    if (hasSkill('languages')) {
        const lang = extractedSkills.languages[0];
        if (lang.toLowerCase().includes('java')) {
            questions.push('Explain the difference between abstract class and interface in Java.');
        } else if (lang.toLowerCase().includes('python')) {
            questions.push('What are decorators in Python and how do they work?');
        } else if (lang.toLowerCase().includes('javascript')) {
            questions.push('Explain closures in JavaScript with an example.');
        }
    }

    // Web development
    if (hasSkill('web')) {
        if (extractedSkills.web.some(s => s.toLowerCase().includes('react'))) {
            questions.push(
                'Explain the difference between state and props in React.',
                'How does the Virtual DOM work in React?'
            );
        }
        questions.push('What is the difference between REST and GraphQL?');
    }

    // Database
    if (hasSkill('data')) {
        questions.push(
            'Explain database indexing and when it helps performance.',
            'What is the difference between SQL and NoSQL databases?'
        );
    }

    // Cloud/DevOps
    if (hasSkill('cloudDevOps')) {
        questions.push('Explain the benefits of containerization with Docker.');
    }

    // Testing
    if (hasSkill('testing')) {
        questions.push('What is the difference between unit testing and integration testing?');
    }

    // OOP
    questions.push('Explain the four pillars of Object-Oriented Programming.');

    // DBMS
    if (hasSkill('coreCS') || hasSkill('data')) {
        questions.push('What is database normalization and why is it important?');
    }

    // Fill remaining with general questions
    const generalQuestions = [
        'How would you optimize a slow-performing application?',
        'Explain the concept of time and space complexity.',
        'What is your approach to debugging a complex issue?',
        'Describe a challenging project you worked on and how you solved it.',
        'How do you stay updated with new technologies?'
    ];

    while (questions.length < 10) {
        questions.push(generalQuestions[questions.length % generalQuestions.length]);
    }

    return questions.slice(0, 10);
}

export function saveToHistory(analysisData) {
    const history = JSON.parse(localStorage.getItem('jdHistory') || '[]');
    const entry = {
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        ...analysisData
    };
    history.unshift(entry);
    localStorage.setItem('jdHistory', JSON.stringify(history));
    return entry.id;
}

export function getHistory() {
    return JSON.parse(localStorage.getItem('jdHistory') || '[]');
}

export function getHistoryById(id) {
    const history = getHistory();
    return history.find(item => item.id === id);
}

export function updateHistoryEntry(id, updates) {
    const history = getHistory();
    const index = history.findIndex(item => item.id === id);
    if (index !== -1) {
        history[index] = { ...history[index], ...updates };
        localStorage.setItem('jdHistory', JSON.stringify(history));
        return true;
    }
    return false;
}
