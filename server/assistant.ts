import type { KnowledgeFact, Recommendation, StrategicAnalysis } from '../shared/types.js';

function tacticalAnswer(question: string, analysis: StrategicAnalysis | null) {
  if (!analysis) return '';
  const q = question.toLowerCase();
  if (/what should|next|recommend|priority|move/.test(q) && analysis.recommendations[0]) {
    const rec = analysis.recommendations[0];
    return `Current priority: ${rec.title}\n\n${rec.rationale}\n\nExpected benefit: ${rec.expectedBenefit}\n\nVerify in game: ${(rec.verifyInGame ?? []).join('; ') || 'Check current timers, garrisons, and resource state.'}`;
  }
  if (/danger|threat|who.*danger|attack|enemy|opponent/.test(q)) {
    const profiles = analysis.commanderProfiles.slice(0, 5);
    if (profiles.length) return profiles.map(profile => `${profile.name}: threat ${Math.round(profile.threatScore)}, reports ${profile.reports}, hostile contacts ${profile.hostileReports}, last seen ${profile.lastSeenUtc ?? 'unknown'}. Evidence: ${profile.evidence.slice(0, 2).join('; ')}`).join('\n');
  }
  if (/expand|coloni|outpost|tile|where/.test(q)) {
    const targets = analysis.tileMetrics.filter(tile => !tile.ownerName).sort((a, b) => b.opportunityScore - a.opportunityScore).slice(0, 5);
    if (targets.length) return targets.map(tile => `${tile.terrain} ${tile.key}: opportunity ${Math.round(tile.opportunityScore)}, threat ${Math.round(tile.threatScore)}, uncertainty ${Math.round(tile.uncertainty)}. ${tile.evidence.slice(0, 3).join('; ')}`).join('\n');
  }
  if (/spy|intel|scout/.test(q)) {
    const spy = analysis.reportMetrics.filter(report => /spy/i.test(report.mission)).sort((a, b) => b.spyScore - a.spyScore).slice(0, 5);
    if (spy.length) return spy.map(report => `Report ${report.id}: ${report.mission}, spy score ${Math.round(report.spyScore)}, opponent ${report.opponentName || 'unknown'}. ${report.evidence.join('; ')}`).join('\n');
  }
  if (/fleet|ship|composition|defense|raid|attack|colon/i.test(q)) {
    const plans = analysis.fleetPlans.slice(0, 5);
    if (plans.length) return plans.map(plan => `${plan.title}: priority ${plan.priority}. Composition: ${plan.composition.join('; ')}. Checks: ${plan.readinessChecks.join('; ')}`).join('\n\n');
  }
  if (/expedition|event|deadline/.test(q)) {
    const expeditions = analysis.expeditions.slice(0, 5);
    if (expeditions.length) return expeditions.map(item => `${item.missionName} at ${item.tileKey}: score ${Math.round(item.totalScore)}, urgency ${Math.round(item.urgencyScore)}, deadline ${item.deadlineUtc ?? 'unknown'}.`).join('\n');
  }
  return '';
}

function deterministicAnswer(question: string, facts: KnowledgeFact[], recommendations: Recommendation[], analysis: StrategicAnalysis | null) {
  const tactical = tacticalAnswer(question, analysis);
  if (tactical) {
    return {
      answer: `${tactical}\n\nVisible-data caveat: this uses cached telemetry and derived inference only; hidden fleets, current private resources, and unsynced changes are unknown.`,
      citations: recommendations.slice(0, 5).map(rec => ({ title: 'Local strategic analysis', url: '#', fact: rec.title }))
    };
  }
  if (!facts.length) return { answer: 'No matching guide facts were found. Try a broader game term such as expansion, combat, Astra, ships, or SPU.', citations: [] };
  const selected = facts.slice(0, 5);
  const answer = selected.map(fact => `${fact.title}: ${fact.body}`).join('\n\n');
  const action = /what should|next|recommend|priority/i.test(question) && recommendations[0]
    ? `\n\nCurrent priority: ${recommendations[0].title}. ${recommendations[0].rationale}` : '';
  return { answer: answer + action, citations: selected.map(fact => ({ title: fact.sourceTitle, url: fact.sourceUrl, fact: fact.title })) };
}

export async function answerQuestion(input: {
  question: string;
  facts: KnowledgeFact[];
  recommendations: Recommendation[];
  analysis: StrategicAnalysis | null;
  apiKey?: string;
  model: string;
}) {
  if (!input.apiKey) return { ...deterministicAnswer(input.question, input.facts, input.recommendations, input.analysis), mode: 'deterministic' };
  const context = input.facts.slice(0, 8).map((fact, index) => `[${index + 1}] ${fact.title}: ${fact.body}\nSource: ${fact.sourceTitle} - ${fact.sourceUrl}`).join('\n\n');
  const tactical = input.recommendations.slice(0, 4).map(rec => `- ${rec.title}: ${rec.rationale} (confidence ${Math.round(rec.confidence * 100)}%)`).join('\n');
  const derived = input.analysis ? [
    `Top threats: ${input.analysis.commanderProfiles.slice(0, 5).map(item => `${item.name} ${Math.round(item.threatScore)}`).join(', ') || 'none'}`,
    `Top expansion targets: ${input.analysis.tileMetrics.filter(tile => !tile.ownerName).sort((a, b) => b.opportunityScore - a.opportunityScore).slice(0, 5).map(tile => `${tile.terrain} ${tile.key} ${Math.round(tile.opportunityScore)}`).join(', ') || 'none'}`
  ].join('\n') : 'No strategic analysis is cached.';
  const response = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: { authorization: `Bearer ${input.apiKey}`, 'content-type': 'application/json' },
    body: JSON.stringify({
      model: input.model,
      input: `You are a cautious Riftborne strategy guide. Answer only from the supplied evidence. Distinguish facts from inferences, cite claims inline as [1], [2], and say when telemetry is incomplete. Never propose automation of game actions.\n\nQuestion: ${input.question}\n\nGuide evidence:\n${context}\n\nCurrent local analysis:\n${tactical}\n\nDerived telemetry:\n${derived}`
    })
  });
  if (!response.ok) return { ...deterministicAnswer(input.question, input.facts, input.recommendations, input.analysis), mode: 'deterministic', warning: 'AI provider was unavailable; showing local evidence instead.' };
  const payload = await response.json() as { output_text?: string; output?: Array<{ content?: Array<{ type?: string; text?: string }> }> };
  const outputText = payload.output_text ?? payload.output?.flatMap(item => item.content ?? []).find(item => item.type === 'output_text')?.text;
  if (!outputText) return { ...deterministicAnswer(input.question, input.facts, input.recommendations, input.analysis), mode: 'deterministic' };
  return { answer: outputText, citations: input.facts.slice(0, 8).map(fact => ({ title: fact.sourceTitle, url: fact.sourceUrl, fact: fact.title })), mode: 'openai' };
}
