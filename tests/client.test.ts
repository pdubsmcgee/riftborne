import { describe, expect, it, vi } from 'vitest';
import { RiftborneClient } from '../server/riftborne-client.js';

describe('Riftborne client', () => {
  it('authenticates once and reuses the signed cookie', async () => {
    const calls: Array<{ url: string; cookie: string | null }> = [];
    const mocked = vi.fn(async (input: URL | RequestInfo, init?: RequestInit) => {
      const url = String(input); const headers = new Headers(init?.headers); calls.push({ url, cookie: headers.get('cookie') });
      if (url.endsWith('/api/login')) return new Response(JSON.stringify({ session: { username: 'pilot' } }), { status: 200, headers: { 'content-type': 'application/json', 'set-cookie': 'session=signed; Path=/; HttpOnly' } });
      return new Response(JSON.stringify({ worldStartedAtUtc: '2026-01-01' }), { status: 200, headers: { 'content-type': 'application/json' } });
    });
    const client = new RiftborneClient('https://example.com', 'pilot', 'secret', mocked as typeof fetch);
    await client.summary('me'); await client.summary('world');
    expect(calls).toHaveLength(3); expect(calls[1].cookie).toBe('session=signed'); expect(calls[2].cookie).toBe('session=signed');
  });
  it('rejects malformed map chunks before they enter the cache', async () => {
    const mocked = vi.fn(async (input: URL | RequestInfo, init?: RequestInit) => {
      const url = String(input); const headers = new Headers(init?.headers);
      if (url.endsWith('/api/login')) return new Response(JSON.stringify({ session: { username: 'pilot' } }), { status: 200, headers: { 'content-type': 'application/json', 'set-cookie': 'session=signed; Path=/; HttpOnly' } });
      expect(headers.get('cookie')).toBe('session=signed');
      return new Response(JSON.stringify({ tiles: [{ y: 2, tileType: 'Broken' }] }), { status: 200, headers: { 'content-type': 'application/json' } });
    });
    const client = new RiftborneClient('https://example.com', 'pilot', 'secret', mocked as typeof fetch);
    await expect(client.chunk(0, 0)).rejects.toThrow();
  });
});
