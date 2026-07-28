import { useEffect, useMemo, useRef, useState } from 'react';
import { Crosshair, LocateFixed, Minus, Plus } from 'lucide-react';
import type { ChangeEvent, ForecastItem, MapTile, StrategicAnalysis, TileMetric } from '../shared/types';

type Layer = 'terrain' | 'opportunity' | 'threat' | 'special' | 'expedition' | 'uncertainty' | 'faction' | 'activity' | 'history' | 'forecast';

const factionColors = ['#e89c48', '#47a6a6', '#bd6d81', '#7796cd', '#a2a961', '#9a7bb7'];
function string(value: unknown) { return typeof value === 'string' ? value : ''; }
function owner(tile: MapTile) { return string(tile.ownerName || tile.owner || tile.playerName || tile.commanderName || tile.base?.ownerName); }
function faction(tile: MapTile) { return string(tile.faction || tile.base?.faction || tile.base?.factionKey); }
function terrain(tile: MapTile) { return string(tile.tileType || tile.type || tile.terrain || tile.name || tile.displayedTileType) || 'Unknown'; }
function hash(value: string) { return [...value].reduce((total, char) => ((total << 5) - total + char.charCodeAt(0)) | 0, 0); }
function heat(score: number, low: string, mid: string, high: string) { return score >= 70 ? high : score >= 35 ? mid : low; }

function color(tile: MapTile, layer: Layer, metric?: TileMetric) {
  const type = terrain(tile).toLowerCase();
  const tileOwner = owner(tile);
  if (layer === 'faction' && (faction(tile) || tileOwner)) return factionColors[Math.abs(hash(faction(tile) || tileOwner)) % factionColors.length];
  if (layer === 'opportunity') return heat(metric?.opportunityScore ?? 0, '#26383d', '#90af82', '#f4c265');
  if (layer === 'threat') return heat(metric?.threatScore ?? 0, '#26383d', '#c69b5f', '#d86f63');
  if (layer === 'special') return (metric?.specialScore ?? 0) > 15 ? '#f0bd57' : '#304145';
  if (layer === 'expedition') return tile.expedition ? '#77b8d8' : '#26383d';
  if (layer === 'uncertainty') return heat(metric?.uncertainty ?? 0, '#426a5a', '#8b7d54', '#8d5860');
  if (type.includes('black')) return '#312d3d';
  if (type.includes('spire') || type.includes('reactor')) return '#f0bd57';
  if (type.includes('terran')) return '#5b9b77';
  if (type.includes('asteroid') || type.includes('crystal')) return '#a1785f';
  if (type.includes('nebula') || type.includes('gas')) return '#6e628f';
  if (tileOwner) return '#d18b45';
  return '#26383d';
}

export function GalaxyMap({ tiles, reports = [], analysis = null }: { tiles: MapTile[]; reports?: Array<Record<string, unknown>>; analysis?: StrategicAnalysis | null }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [layer, setLayer] = useState<Layer>('opportunity');
  const [selected, setSelected] = useState<MapTile | null>(null);
  const [camera, setCamera] = useState({ x: 0, y: 0, zoom: 6 });
  const drag = useRef<{ x: number; y: number; cx: number; cy: number } | null>(null);
  const tileMap = useMemo(() => new Map(tiles.map(tile => [`${tile.x},${tile.y}`, tile])), [tiles]);
  const metricMap = useMemo(() => new Map((analysis?.tileMetrics ?? []).map(metric => [metric.key, metric])), [analysis]);
  const activity = useMemo(() => new Set(reports.flatMap(report => {
    const location = report.location && typeof report.location === 'object' ? report.location as Record<string, unknown> : {};
    const x = Number(report.x ?? report.targetX ?? report.defenderX ?? location.x);
    const y = Number(report.y ?? report.targetY ?? report.defenderY ?? location.y);
    return Number.isFinite(x) && Number.isFinite(y) ? [`${x},${y}`] : [];
  })), [reports]);
  const historyEvents = (analysis as StrategicAnalysis & { historyEvents?: ChangeEvent[] } | null)?.historyEvents ?? [];
  const forecastItems = (analysis as StrategicAnalysis & { forecastItems?: ForecastItem[] } | null)?.forecastItems ?? [];
  const historyByKey = useMemo(() => new Map(historyEvents.filter(event => event.subjectKey).map(event => [event.subjectKey!, event])), [historyEvents]);
  const forecastByKey = useMemo(() => new Map(forecastItems.filter(item => item.subjectKey).map(item => [item.subjectKey!, item])), [forecastItems]);

  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const rect = canvas.getBoundingClientRect(); const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.floor(rect.width * dpr); canvas.height = Math.floor(rect.height * dpr);
    const ctx = canvas.getContext('2d'); if (!ctx) return;
    ctx.scale(dpr, dpr); ctx.clearRect(0, 0, rect.width, rect.height);
    ctx.fillStyle = '#070a0c'; ctx.fillRect(0, 0, rect.width, rect.height);
    ctx.strokeStyle = 'rgba(120,151,155,.06)'; ctx.lineWidth = 1;
    const grid = camera.zoom;
    const ox = rect.width / 2 - camera.x * grid; const oy = rect.height / 2 - camera.y * grid;
    for (let x = ((ox % (grid * 10)) + grid * 10) % (grid * 10); x < rect.width; x += grid * 10) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, rect.height); ctx.stroke(); }
    for (let y = ((oy % (grid * 10)) + grid * 10) % (grid * 10); y < rect.height; y += grid * 10) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(rect.width, y); ctx.stroke(); }
    for (const tile of tiles) {
      const sx = ox + tile.x * grid; const sy = oy + tile.y * grid;
      if (sx < -grid || sy < -grid || sx > rect.width + grid || sy > rect.height + grid) continue;
      const key = `${tile.x},${tile.y}`;
      ctx.fillStyle = layer === 'history' && historyByKey.has(key) ? '#ffcf70' : layer === 'forecast' && forecastByKey.has(key) ? '#9edbff' : layer === 'activity' && activity.has(key) ? '#efaa50' : color(tile, layer, metricMap.get(key));
      const owned = Boolean(owner(tile)); const size = owned ? Math.max(3, grid * .88) : Math.max(1.5, grid * .56);
      ctx.globalAlpha = owned ? .96 : .7;
      ctx.fillRect(sx - size / 2, sy - size / 2, size, size);
      if (layer === 'history' && historyByKey.has(key)) { ctx.globalAlpha = .95; ctx.strokeStyle = '#ffcf70'; ctx.lineWidth = 1.4; ctx.beginPath(); ctx.arc(sx, sy, Math.max(4, grid * 1.2), 0, Math.PI * 2); ctx.stroke(); }
      if (layer === 'forecast' && forecastByKey.has(key)) { ctx.globalAlpha = .95; ctx.strokeStyle = '#9edbff'; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.arc(sx, sy, Math.max(5, grid * 1.5), 0, Math.PI * 2); ctx.stroke(); }
      if (selected?.x === tile.x && selected?.y === tile.y) { ctx.globalAlpha = 1; ctx.strokeStyle = '#fff1c7'; ctx.lineWidth = 1.5; ctx.strokeRect(sx - grid * .8, sy - grid * .8, grid * 1.6, grid * 1.6); }
    }
    ctx.globalAlpha = 1; ctx.strokeStyle = 'rgba(240,189,87,.7)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.arc(ox, oy, camera.zoom * 10, 0, Math.PI * 2); ctx.stroke();
    ctx.fillStyle = '#f0bd57'; ctx.fillRect(ox - 2, oy - 2, 4, 4);
  }, [tiles, camera, selected, layer, activity, metricMap, historyByKey, forecastByKey]);

  function point(event: React.MouseEvent<HTMLCanvasElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top, width: rect.width, height: rect.height };
  }
  function pick(event: React.MouseEvent<HTMLCanvasElement>) {
    const p = point(event); const x = Math.round((p.x - p.width / 2) / camera.zoom + camera.x); const y = Math.round((p.y - p.height / 2) / camera.zoom + camera.y);
    setSelected(tileMap.get(`${x},${y}`) ?? null);
  }

  return <div className="map-shell">
    <div className="map-toolbar">
      <div className="segmented" aria-label="Map layer">{(['terrain','opportunity','threat','special','expedition','uncertainty','faction','activity','history','forecast'] as Layer[]).map(item => <button key={item} className={layer === item ? 'active' : ''} onClick={() => setLayer(item)}>{item}</button>)}</div>
      <div className="map-actions"><button aria-label="Zoom out" onClick={() => setCamera(c => ({ ...c, zoom: Math.max(2, c.zoom - 1) }))}><Minus size={15}/></button><button aria-label="Center map" onClick={() => setCamera({ x: 0, y: 0, zoom: 6 })}><LocateFixed size={15}/></button><button aria-label="Zoom in" onClick={() => setCamera(c => ({ ...c, zoom: Math.min(18, c.zoom + 1) }))}><Plus size={15}/></button></div>
    </div>
    <canvas ref={canvasRef} className="galaxy-canvas" aria-label="Interactive galaxy map"
      onMouseDown={event => { const p = point(event); drag.current = { x: p.x, y: p.y, cx: camera.x, cy: camera.y }; }}
      onMouseMove={event => { if (!drag.current) return; const p = point(event); setCamera(c => ({ ...c, x: drag.current!.cx - (p.x - drag.current!.x) / c.zoom, y: drag.current!.cy - (p.y - drag.current!.y) / c.zoom })); }}
      onMouseUp={event => { if (drag.current && Math.abs(point(event).x - drag.current.x) < 4 && Math.abs(point(event).y - drag.current.y) < 4) pick(event); drag.current = null; }}
      onMouseLeave={() => { drag.current = null; }}
      onWheel={event => { event.preventDefault(); setCamera(c => ({ ...c, zoom: Math.max(2, Math.min(18, c.zoom + (event.deltaY < 0 ? 1 : -1))) })); }} />
    <div className="map-inspector">
      {selected ? <TileInspector tile={selected} metric={metricMap.get(`${selected.x},${selected.y}`)}/> : <><div className="eyebrow">FIELD INSPECTOR</div><p>Select a known tile to inspect ownership, visible modifiers, and derived scores.</p></>}
    </div>
    {!tiles.length && <div className="map-empty"><Crosshair size={20}/><span>Run first sync to reconstruct the field</span></div>}
  </div>;
}

function TileInspector({ tile, metric }: { tile: MapTile; metric?: TileMetric }) {
  return <><div className="eyebrow"><Crosshair size={13}/> TILE {tile.x}, {tile.y}</div><h3>{terrain(tile)}</h3><dl>
    <div><dt>Owner</dt><dd>{owner(tile) || 'Unclaimed'}</dd></div>
    <div><dt>Faction</dt><dd>{faction(tile) || '-'}</dd></div>
    {metric && <>
      <div><dt>Opportunity</dt><dd>{Math.round(metric.opportunityScore)}</dd></div>
      <div><dt>Threat</dt><dd>{Math.round(metric.threatScore)}</dd></div>
      <div><dt>Uncertainty</dt><dd>{Math.round(metric.uncertainty)}</dd></div>
    </>}
    {Object.entries(tile).filter(([key, value]) => /bonus|resource|defense/i.test(key) && ['string','number'].includes(typeof value)).slice(0, 5).map(([key,value]) => <div key={key}><dt>{key.replace(/([A-Z])/g,' $1')}</dt><dd>{String(value)}</dd></div>)}
  </dl></>;
}
