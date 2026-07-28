import type { AlertState, BridgePlan, DashboardState, DealRiskAssessment, DecisionCard, FactionStrategyState, ForecastState, HistoryState, ImportResult, KnowledgeFact, ManualStateSnapshot, MapTile, OrganizationState, ResourcePlan, StrategicAnalysis } from '../shared/types';

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(path, { ...init, headers: { 'content-type': 'application/json', ...(init?.headers ?? {}) } });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.error || `Request failed (${response.status})`);
  return payload as T;
}

export const api = {
  world: () => request<DashboardState>('/api/world'),
  sync: () => request<DashboardState>('/api/sync', { method: 'POST', body: '{}' }),
  guide: (q = '', topic = '') => request<{ items: KnowledgeFact[] }>(`/api/guide/search?q=${encodeURIComponent(q)}&topic=${encodeURIComponent(topic)}`),
  ask: (question: string) => request<{ answer: string; citations: Array<{ title: string; url: string; fact: string }>; mode: string; warning?: string }>('/api/assistant', { method: 'POST', body: JSON.stringify({ question }) }),
  map: () => request<{ tiles: MapTile[]; manifest: Record<string, unknown> | null; analysis: StrategicAnalysis | null }>('/api/map'),
  history: (worldId = '') => request<HistoryState>(`/api/history${worldId ? `?worldId=${encodeURIComponent(worldId)}` : ''}`),
  forecast: (worldId = '') => request<ForecastState>(`/api/forecast${worldId ? `?worldId=${encodeURIComponent(worldId)}` : ''}`),
  importJson: (filename: string, payload: unknown) => request<{ result: ImportResult; history: HistoryState }>('/api/import/json', { method: 'POST', body: JSON.stringify({ filename, payload }) }),
  alerts: () => request<AlertState>('/api/alerts'),
  alertAction: (id: string, action: 'ack' | 'snooze' | 'clear-snooze', minutes = 60) => request<AlertState>(`/api/alerts/${encodeURIComponent(id)}`, { method: 'POST', body: JSON.stringify({ action, minutes }) }),
  factions: () => request<FactionStrategyState>('/api/factions'),
  decisionCards: () => request<{ items: DecisionCard[]; bridgePlan: BridgePlan; resourcePlans: ResourcePlan[]; organization: OrganizationState }>('/api/decision-cards'),
  resourcePlan: (resource = 'deuterium') => request<ResourcePlan>(`/api/resource-plan?resource=${encodeURIComponent(resource)}`),
  bridgePlan: () => request<BridgePlan>('/api/bridge-plan'),
  organization: () => request<OrganizationState>('/api/organization'),
  saveOrganizationAccount: (payload: Record<string, unknown>) => request<OrganizationState>('/api/organization/account', { method: 'POST', body: JSON.stringify(payload) }),
  saveLoan: (payload: Record<string, unknown>) => request<OrganizationState>('/api/organization/loans', { method: 'POST', body: JSON.stringify(payload) }),
  saveContract: (payload: Record<string, unknown>) => request<OrganizationState>('/api/organization/contracts', { method: 'POST', body: JSON.stringify(payload) }),
  dealCheck: (payload: Record<string, unknown>) => request<DealRiskAssessment>('/api/organization/deal-check', { method: 'POST', body: JSON.stringify(payload) }),
  manualState: () => request<{ items: ManualStateSnapshot[] }>('/api/manual-state'),
  saveManualState: (subject: ManualStateSnapshot['subject'], payload: Record<string, unknown>) => request<{ saved: ManualStateSnapshot; items: ManualStateSnapshot[] }>('/api/manual-state', { method: 'POST', body: JSON.stringify({ subject, payload }) })
};
