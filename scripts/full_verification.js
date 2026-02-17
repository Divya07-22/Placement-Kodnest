import { analyzeJD, getHistory, getHistoryById } from '../src/utils/analysisUtils.js';

// 1. Mock LocalStorage
class LocalStorage {
    constructor() { this.store = {}; }
    getItem(key) { return this.store[key] || null; }
    setItem(key, value) { this.store[key] = value.toString(); }
    clear() { this.store = {}; }
}
global.localStorage = new LocalStorage();

// Test Data
const jdText = "We need a Full Stack Developer with experience in React, Node.js, and SQL. Knowledge of AWS is required. Must know Data Structures.";
const company = "TechCorp";
const role = "Senior Engineer";

console.log("TEST 1: Analyzing JD...");
const result = analyzeJD(jdText, company, role);

// TEST 2: Skills Extraction & Grouping
console.log("\nTEST 2: Skills Extraction");
const skills = result.extractedSkills;
const hasReact = skills.web.includes('react');
const hasNode = skills.web.includes('node.js') || skills.web.includes('node');
const hasSQL = skills.data.includes('sql');
const hasAWS = skills.cloudDevOps.includes('aws');
const hasDSA = skills.coreCS.includes('data structures');

if (hasReact && hasNode && hasSQL && hasAWS && hasDSA) {
    console.log("✅ Passed: Detected React, Node.js, SQL, AWS, DSA");
} else {
    console.error("❌ Failed: Missing skills. Found:", JSON.stringify(skills));
}

if (skills.web.length > 0 && skills.data.length > 0 && skills.cloudDevOps.length > 0) {
    console.log("✅ Passed: Skills grouped by category");
} else {
    console.error("❌ Failed: Skills not grouped correctly");
}

// TEST 3: 4-Round Checklist
console.log("\nTEST 3: Round-wise Preparation Checklist");
const checklist = result.checklist;
if (checklist.round1 && checklist.round2 && checklist.round3 && checklist.round4) {
    console.log("✅ Passed: Generated 4 round checklists");
} else {
    console.error("❌ Failed: Missing rounds in checklist");
}

// TEST 4: 7-Day Plan
console.log("\nTEST 4: 7-Day Plan");
const plan = result.plan;
if (plan.length === 7) {
    console.log("✅ Passed: Generated 7-day plan");
} else {
    console.error("❌ Failed: Plan length is " + plan.length);
}

// TEST 5: 10 Interview Questions
console.log("\nTEST 5: Interview Questions");
const questions = result.questions;
if (questions.length === 10) {
    console.log("✅ Passed: Generated 10 questions");
} else {
    console.error("❌ Failed: Generated " + questions.length + " questions");
}

// TEST 6: Readiness Score
console.log("\nTEST 6: Readiness Score");
const score = result.readinessScore;
if (score > 35 && score <= 100) {
    console.log("✅ Passed: Score calculated: " + score);
} else {
    console.error("❌ Failed: Score out of range: " + score);
}

// TEST 7: History Persistence
console.log("\nTEST 7: History Persistence");
const history = getHistory();
if (history.length === 1) {
    const savedEntry = history[0];
    if (savedEntry.company === company && savedEntry.role === role && savedEntry.readinessScore === score) {
        console.log("✅ Passed: Analysis saved to history correct details");
    } else {
        console.error("❌ Failed: Saved entry mismatch");
    }
} else {
    console.error("❌ Failed: History length is " + history.length);
}

// TEST 8: Load from History
console.log("\nTEST 8: Load by ID");
const loaded = getHistoryById(result.id);
if (loaded && loaded.id === result.id) {
    console.log("✅ Passed: Loaded full analysis from history");
} else {
    console.error("❌ Failed: Could not load by ID");
}

console.log("\nALL TESTS COMPLETED.");
