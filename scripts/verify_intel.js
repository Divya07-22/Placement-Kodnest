import { analyzeJD } from '../src/utils/analysisUtils.js';

// Mock LocalStorage
class LocalStorage {
    constructor() { this.store = {}; }
    getItem(key) { return this.store[key] || null; }
    setItem(key, value) { this.store[key] = value.toString(); }
}
global.localStorage = new LocalStorage();

console.log("TEST 1: Enterprise (Amazon)");
const amazonResult = analyzeJD("Java DSA System Design", "Amazon", "SDE 1");
const intelA = amazonResult.companyIntel;
const roundsA = amazonResult.roundMapping;

console.log("Intel:", JSON.stringify(intelA, null, 2));
console.log("Rounds:", roundsA.length);
if (intelA.type === 'Enterprise' && roundsA.length === 4) {
    console.log("✅ Passed: Amazon classified as Enterprise with 4 rounds.");
} else {
    console.error("❌ Failed: Amazon classification incorrect.");
}

console.log("\nTEST 2: Startup (RandomCorp)");
const startupResult = analyzeJD("React Node.js", "RandomCorp", "Frontend Dev");
const intelS = startupResult.companyIntel;
const roundsS = startupResult.roundMapping;

console.log("Intel:", JSON.stringify(intelS, null, 2));
console.log("Rounds:", roundsS.length);
if (intelS.type.includes('Startup') && roundsS.length === 3) {
    console.log("✅ Passed: RandomCorp classified as Startup with 3 rounds.");
} else {
    console.error("❌ Failed: Startup classification incorrect.");
}

console.log("\nTEST 3: Skill Adaptation");
// Startup has 'Practical Coding' round. If web skills present, focus should handle it.
const round1 = roundsS[0];
console.log("Round 1 Focus:", round1.focus);
if (round1.focus.includes('Build a Feature')) {
    console.log("✅ Passed: Round 1 adapted for Web Role.");
} else {
    console.error("❌ Failed: Round 1 did not adapt to skills.");
}
