import type {
  BorrowerProfile,
  CommanderProfile,
  ContractRecord,
  DealRiskAssessment,
  DecisionCard,
  LoanRecord,
  OrganizationAccount,
  OrganizationState,
  RepaymentRecord,
  StrategicAnalysis
} from '../shared/types.js';

export function dailyInterest(principal: number, dailyRatePercent: number) {
  return Math.ceil(Math.max(0, principal) * Math.max(0, dailyRatePercent) / 100);
}

function daysBetween(start: string, end: string) {
  const a = new Date(start).getTime();
  const b = new Date(end).getTime();
  if (!Number.isFinite(a) || !Number.isFinite(b)) return 0;
  return Math.max(0, Math.ceil((b - a) / 86_400_000));
}

export function normalizeLoanStatus(loan: LoanRecord, now = new Date()) {
  if (loan.status === 'repaid' || loan.status === 'defaulted' || loan.status === 'proposed') return loan.status;
  if (loan.outstandingNoctmarks <= 0) return 'repaid';
  return new Date(loan.maturityDate).getTime() < now.getTime() ? 'late' : 'active';
}

function relation(profile?: CommanderProfile) {
  if (!profile) return 'unknown';
  return profile.relation;
}

export function buildBorrowerProfiles(input: {
  analysis: StrategicAnalysis | null;
  loans: LoanRecord[];
}): BorrowerProfile[] {
  const commanders = new Map((input.analysis?.commanderProfiles ?? []).map(profile => [profile.name.toLowerCase(), profile]));
  const holdingCounts = new Map<string, number>();
  for (const tile of input.analysis?.tileMetrics ?? []) {
    if (tile.ownerName) holdingCounts.set(tile.ownerName.toLowerCase(), (holdingCounts.get(tile.ownerName.toLowerCase()) ?? 0) + 1);
  }
  const names = new Set<string>([
    ...input.loans.map(loan => loan.borrower),
    ...(input.analysis?.commanderProfiles ?? []).map(profile => profile.name)
  ].filter(Boolean));
  return [...names].map(name => {
    const key = name.toLowerCase();
    const profile = commanders.get(key);
    const loans = input.loans.filter(loan => loan.borrower.toLowerCase() === key);
    const openLoans = loans.filter(loan => !['repaid', 'defaulted'].includes(normalizeLoanStatus(loan))).length;
    const totalOutstanding = loans.reduce((sum, loan) => sum + Math.max(0, loan.outstandingNoctmarks), 0);
    const late = loans.some(loan => normalizeLoanStatus(loan) === 'late');
    const defaulted = loans.some(loan => loan.status === 'defaulted');
    const rel = relation(profile);
    const combatStress = (profile?.threatScore ?? 0) > 55 || (profile?.powerLost ?? 0) > 500;
    const holdings = holdingCounts.get(key) ?? 0;
    let riskScore = 55;
    if (rel === 'ally' || rel === 'self') riskScore -= 18;
    if (rel === 'opponent') riskScore += 20;
    if (!profile) riskScore += 10;
    if (holdings === 0) riskScore += 8;
    if (combatStress) riskScore += 16;
    if (late) riskScore += 24;
    if (defaulted) riskScore += 40;
    if (openLoans > 1) riskScore += 8;
    riskScore = Math.max(0, Math.min(100, riskScore));
    const riskLabel: BorrowerProfile['riskLabel'] = defaulted ? 'do-not-lend'
      : late ? 'delinquent'
      : combatStress ? 'combat-stressed'
      : holdings <= 1 && rel !== 'ally' ? 'exposed frontier'
      : rel === 'ally' && riskScore < 45 ? 'safe ally'
      : 'unknown credit';
    return {
      name,
      faction: profile?.faction || loans[0]?.faction || '',
      riskLabel,
      riskScore,
      openLoans,
      totalOutstanding,
      reports: profile?.reports ?? 0,
      holdings,
      evidence: [
        profile ? `${profile.relation} relation from telemetry` : 'No commander profile in telemetry',
        `${holdings} visible holding(s)`,
        `${openLoans} open loan(s)`,
        late ? 'Loan is past maturity' : '',
        combatStress ? 'Combat-stressed by visible reports' : ''
      ].filter(Boolean)
    };
  }).sort((a, b) => b.riskScore - a.riskScore || b.totalOutstanding - a.totalOutstanding);
}

export function assessDeal(input: {
  borrower: BorrowerProfile;
  principalNoctmarks: number;
  dailyRatePercent: number;
  startDate: string;
  maturityDate: string;
}): DealRiskAssessment {
  const interest = dailyInterest(input.principalNoctmarks, input.dailyRatePercent);
  const days = daysBetween(input.startDate, input.maturityDate);
  const totalInterest = interest * days;
  const confidence = Math.max(0.28, Math.min(0.78, 0.62 - input.borrower.riskScore / 220 + (input.borrower.reports > 0 ? 0.08 : -0.08)));
  const recommendation = input.borrower.riskScore >= 75
    ? 'Do not lend unless collateral or faction politics justify the loss risk.'
    : input.dailyRatePercent < 1.2 && input.borrower.riskScore >= 55
      ? 'Rate is probably too low for this borrower risk.'
      : input.borrower.riskScore <= 42
        ? 'Reasonable loan candidate if the purpose produces value before maturity.'
        : 'Proceed only with smaller principal, collateral, or shorter maturity.';
  return {
    borrower: input.borrower,
    principalNoctmarks: input.principalNoctmarks,
    dailyRatePercent: input.dailyRatePercent,
    dailyInterest: interest,
    totalInterestToMaturity: totalInterest,
    breakEvenRequiredProfit: input.principalNoctmarks + totalInterest,
    recommendation,
    confidence,
    missingData: ['Live organization balance is manual-only', 'Private borrower income and stockpiles are unknown', 'Market and loan state are not exposed by telemetry']
  };
}

function businessCards(input: { borrowers: BorrowerProfile[]; loans: LoanRecord[]; contracts: ContractRecord[]; account: OrganizationAccount }): DecisionCard[] {
  const cards: DecisionCard[] = [];
  const late = input.loans.find(loan => normalizeLoanStatus(loan) === 'late');
  if (late) cards.push({
    id: `business-collect-${late.id}`,
    intent: 'business',
    title: `Collect or renegotiate ${late.borrower}`,
    answer: `${late.borrower}'s loan is past maturity with ${late.outstandingNoctmarks} Noctmarks outstanding.`,
    targetKey: null,
    targetType: 'loan',
    rank: 80,
    benefit: 'Protects capital and prevents quiet defaults.',
    risk: 'high',
    confidence: 0.82,
    confirmedFacts: [`Loan ${late.id}`, `Outstanding ${late.outstandingNoctmarks}`, `Maturity ${late.maturityDate}`],
    calculatedValues: [`Daily interest ${dailyInterest(late.outstandingNoctmarks, late.dailyRatePercent)}`],
    inferences: ['Late loans should become collection/renegotiation work before new lending.'],
    missingData: ['Borrower current Noctmarks', 'Private repayment intent'],
    verifyInGame: ['Message borrower or check organization UI.', 'Record repayment or mark default if unrecoverable.'],
    alternatives: []
  });
  const candidate = input.borrowers.find(item => item.riskScore < 55 && item.openLoans === 0);
  if (candidate) cards.push({
    id: `business-lend-${candidate.name}`,
    intent: 'business',
    title: `Possible borrower: ${candidate.name}`,
    answer: `${candidate.name} is the cleanest visible borrower candidate, but still requires manual deal terms.`,
    targetKey: null,
    targetType: 'borrower',
    rank: 90,
    benefit: 'Turns your organization into a profit engine without starting with obvious delinquency risk.',
    risk: candidate.riskScore < 42 ? 'low' : 'medium',
    confidence: Math.max(0.38, Math.min(0.74, 0.62 - candidate.riskScore / 250)),
    confirmedFacts: candidate.evidence,
    calculatedValues: [`Borrower risk ${Math.round(candidate.riskScore)}`, `${candidate.holdings} visible holding(s)`],
    inferences: [`Risk label: ${candidate.riskLabel}`],
    missingData: ['Borrower income', 'Collateral', 'Exact purpose of funds'],
    verifyInGame: ['Confirm requested purpose and repayment date.', 'Use the loan calculator before offering terms.', 'Record collateral/notes in the ledger.'],
    alternatives: input.borrowers.slice(0, 3).map(item => ({ label: item.name, reason: item.riskLabel, score: 100 - item.riskScore }))
  });
  const contract = input.contracts.find(item => item.status === 'watch' || item.status === 'posted');
  if (contract) cards.push({
    id: `business-contract-${contract.id}`,
    intent: 'business',
    title: `Review contract: ${contract.target}`,
    answer: `${contract.rewardNoctmarks} Noctmarks for ${contract.requiredAction}. Take it only if it overlaps with an action you already wanted.`,
    targetKey: null,
    targetType: 'contract',
    rank: 95,
    benefit: 'Avoids paying/working for map pressure that does not help your plan.',
    risk: 'medium',
    confidence: 0.55,
    confirmedFacts: [`Payer ${contract.payer}`, `Reward ${contract.rewardNoctmarks}`, `Action ${contract.requiredAction}`],
    calculatedValues: [],
    inferences: ['Contracts are best when they subsidize your existing military/economic plan.'],
    missingData: ['Target current defense', 'Diplomacy impact', 'Actual completion cost'],
    verifyInGame: ['Confirm target is not protected.', 'Check travel/combat cost.', 'Record completion/reward manually.'],
    alternatives: []
  });
  if (!cards.length) cards.push({
    id: 'business-start-ledger',
    intent: 'business',
    title: 'Start the organization ledger',
    answer: 'Enter capital and one proposed loan or contract; the app can calculate interest, risk, and collection timing after that.',
    targetKey: null,
    targetType: 'organization',
    rank: 100,
    benefit: 'Turns organization play from vibes into tracked capital decisions.',
    risk: 'low',
    confidence: 0.9,
    confirmedFacts: ['Loan/market telemetry is not exposed by current logs.'],
    calculatedValues: [],
    inferences: ['Manual ledger is the fastest useful path for organization play.'],
    missingData: ['Organization capital', 'Borrower list', 'Current contracts'],
    verifyInGame: ['Open organization UI and copy capital/loan terms.', 'Enter only deals you want tracked locally.'],
    alternatives: []
  });
  return cards.sort((a, b) => a.rank - b.rank).map((card, index) => ({ ...card, rank: index + 1 }));
}

export function buildOrganizationState(input: {
  worldId: string | null;
  analysis: StrategicAnalysis | null;
  account: OrganizationAccount;
  loans: LoanRecord[];
  repayments: RepaymentRecord[];
  contracts: ContractRecord[];
}): OrganizationState {
  const loans: LoanRecord[] = input.loans.map(loan => ({ ...loan, status: normalizeLoanStatus(loan) }));
  const borrowers = buildBorrowerProfiles({ analysis: input.analysis, loans });
  return {
    generatedAt: new Date().toISOString(),
    worldId: input.worldId,
    account: input.account,
    loans,
    repayments: input.repayments,
    contracts: input.contracts,
    borrowers,
    businessCards: businessCards({ borrowers, loans, contracts: input.contracts, account: input.account }),
    alerts: loans.filter(loan => normalizeLoanStatus(loan) === 'late').map(loan => `${loan.borrower} is late on ${loan.outstandingNoctmarks} Noctmarks.`),
    telemetryWarning: 'Loan, market, organization, and trade-route state are not exposed by current telemetry; this module is a local manual ledger and calculator.'
  };
}
