import { analyzeJD } from '../src/utils/analysisUtils.js';

// Mock localStorage
if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = class LocalStorage {
        constructor() {
            this.store = {};
        }
        getItem(key) {
            return this.store[key] || null;
        }
        setItem(key, value) {
            this.store[key] = value.toString();
        }
        clear() {
            this.store = {};
        }
    };
    global.localStorage = new LocalStorage();
}

const sampleJD = `
We are looking for a Software Engineer with experience in React, Node.js, and SQL.
Knowledge of AWS and Docker is a plus.
Must have strong understanding of Data Structures and Algorithms.
`;

console.log("Running Analysis...");
const result = analyzeJD(sampleJD, "Test Corp", "Full Stack Dev");

console.log("Analysis Result:");
console.log("Score:", result.readinessScore);
console.log("Skills:", JSON.stringify(result.extractedSkills, null, 2));
console.log("Plan Day 1:", result.plan[0].title);
console.log("Checklist Round 1:", result.checklist.round1.length + " items");

if (result.readinessScore > 35 && result.extractedSkills.web.includes('react')) {
    console.log("SUCCESS: Analysis logic works as expected.");
} else {
    console.error("FAILURE: Unexpected analysis result.");
    process.exit(1);
}
