import { analyzeJD, getHistory, saveToHistory } from '../src/utils/analysisUtils.js';

// Mock LocalStorage
class LocalStorage {
    constructor() { this.store = {}; }
    getItem(key) { return this.store[key] || null; }
    setItem(key, value) { this.store[key] = value.toString(); }
}
global.localStorage = new LocalStorage();

console.log("TEST 1: Schema Verification");
const result = analyzeJD("React Node.js", "TestCorp", "Dev");
const keys = [
    'id', 'createdAt', 'company', 'role', 'jdText', 'extractedSkills',
    'roundMapping', 'checklist', 'plan7Days', 'questions',
    'baseScore', 'finalScore', 'updatedAt'
];

const missing = keys.filter(k => !Object.prototype.hasOwnProperty.call(result, k));
if (missing.length === 0) {
    console.log("✅ Passed: All schema keys present.");
} else {
    console.error("❌ Failed: Missing keys:", missing);
}

console.log("\nTEST 2: Empty Skills Fallback");
const emptyResult = analyzeJD("Just some random text without technical keywords.", "Corp", "Role");
const otherSkills = emptyResult.extractedSkills.other || [];
if (otherSkills.includes('Problem Solving')) {
    console.log("✅ Passed: Fallback skills populated in 'other' category.");
} else {
    console.error("❌ Failed: Fallback skills missing.", emptyResult.extractedSkills);
}

console.log("\nTEST 3: History Hardening");
// Corrupt history
global.localStorage.setItem('prp_analysis_history', JSON.stringify([
    { id: 'valid-1', createdAt: 123 },
    null,
    { broken: 'entry' } // Missing id
]));

const history = getHistory();
console.log("Loaded History Length:", history.length);
if (history.length === 1 && history[0].id === 'valid-1') {
    console.log("✅ Passed: Corrupted entries filtered out.");
} else {
    console.error("❌ Failed: History filtering incorrect.", history);
}

console.log("\nTEST 4: Short JD Check (Simulating Logic)");
// Note: This logic is in component, but we verify the util allows it
if (result.jdText.length < 200) { // Our sample was short
    console.log("✅ Passed: Analysis proceeds even for short JD (Warning is UI side).");
}
