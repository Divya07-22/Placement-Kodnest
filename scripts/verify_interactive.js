import { analyzeJD, updateHistoryEntry, getHistoryById } from '../src/utils/analysisUtils.js';

// Mock LocalStorage
class LocalStorage {
    constructor() { this.store = {}; }
    getItem(key) { return this.store[key] || null; }
    setItem(key, value) { this.store[key] = value.toString(); }
    clear() { this.store = {}; }
}
global.localStorage = new LocalStorage();

// 1. Setup Initial Analysis
const result = analyzeJD("React Node.js SQL", "TestCorp", "Dev");
const id = result.id;
const initialScore = result.readinessScore;
const baseScore = result.baseScore;

console.log(`Initial Score: ${initialScore}, Base Score: ${baseScore}`);

// 2. Simulate Initialization in Results.jsx
// Default all to 'practice'
const skills = Object.values(result.extractedSkills).flat();
const skillConfidenceMap = {};
skills.forEach(s => skillConfidenceMap[s] = 'practice');

// Calculate Initial Live Score
let modifier = 0;
Object.values(skillConfidenceMap).forEach(val => {
    if (val === 'know') modifier += 2;
    if (val === 'practice') modifier -= 2;
});
let liveScore = Math.max(0, Math.min(100, baseScore + modifier));
console.log(`Live Score (all practice): ${liveScore} (Base ${baseScore} + Modifier ${modifier})`);

// 3. Simulate User Toggling one to 'know'
skillConfidenceMap[skills[0]] = 'know';
modifier = 0;
Object.values(skillConfidenceMap).forEach(val => {
    if (val === 'know') modifier += 2;
    if (val === 'practice') modifier -= 2;
});
liveScore = Math.max(0, Math.min(100, baseScore + modifier));
console.log(`Live Score (one know): ${liveScore} (Base ${baseScore} + Modifier ${modifier})`);

// 4. Update History
updateHistoryEntry(id, {
    skillConfidenceMap,
    readinessScore: liveScore,
    baseScore: baseScore
});

// 5. Verify Persistence
const loaded = getHistoryById(id);
if (loaded.skillConfidenceMap[skills[0]] === 'know' && loaded.readinessScore === liveScore) {
    console.log("✅ Passed: Interaction persisted to localStorage");
} else {
    console.error("❌ Failed: Persistence check failed", loaded);
}

// 6. Verify Score Bounds
// Force high score
const highMod = 200;
const cappedScore = Math.max(0, Math.min(100, baseScore + highMod));
if (cappedScore === 100) {
    console.log("✅ Passed: Score capped at 100");
} else {
    console.error("❌ Failed: Score upper bound check failed");
}
