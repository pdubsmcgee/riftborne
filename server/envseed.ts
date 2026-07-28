export function parseEnvSeed(input: string) {
  const values = new Map<string, string>();
  for (const raw of input.split(/\r?\n/)) {
    if (!raw.trim()) continue;
    const colon = raw.indexOf(':');
    if (colon < 1) throw new Error('Every non-empty envseed line must use label: value format.');
    values.set(raw.slice(0, colon).trim().toLowerCase(), raw.slice(colon + 1).trim());
  }
  const username = values.get('username'); const password = values.get('password');
  if (!username || !password) throw new Error('envseed must contain non-empty username and password values.');
  return { username, password };
}

export function quoteEnv(value: string) {
  return `"${value.replaceAll('\\', '\\\\').replaceAll('"', '\\"').replaceAll('\r', '\\r').replaceAll('\n', '\\n')}"`;
}
