/**
 * Demonstration request storage. Requests never leave the browser: they are kept in
 * localStorage (or in memory when storage is unavailable) so the success page can
 * show what was submitted. Nothing is reserved and no payment is taken.
 */

export type RequestKind = 'rental' | 'detailing' | 'contact';

export interface StoredRequest {
  number: string;
  kind: RequestKind;
  createdAt: string;
  title: string;
  lines: [string, string][];
  total?: number;
  contact: { name: string; phone?: string; email?: string };
}

const KEY = 'example.requests.v1';
let memory: StoredRequest[] = [];

function read(): StoredRequest[] {
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as StoredRequest[]) : memory;
  } catch {
    return memory;
  }
}

function write(list: StoredRequest[]) {
  memory = list;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(list.slice(0, 20)));
  } catch {
    /* storage is full or blocked — the in-memory copy is enough for this session */
  }
}

const prefixes: Record<RequestKind, string> = { rental: 'R', detailing: 'D', contact: 'C' };

export function makeRequestNumber(kind: RequestKind): string {
  const random = Math.floor(Math.random() * 900000) + 100000;
  return `EX-${prefixes[kind]}-${random}`;
}

export class SubmitError extends Error {}

/**
 * Simulates sending a request with network latency. Fails when the browser is offline,
 * so the error state of every form can be seen and tested.
 */
export async function submitRequest(data: Omit<StoredRequest, 'number' | 'createdAt'>, delay = 1100): Promise<StoredRequest> {
  await new Promise((resolve) => setTimeout(resolve, delay));
  if (typeof navigator !== 'undefined' && navigator.onLine === false) {
    throw new SubmitError('No internet connection. Check your connection and send the request again — everything you entered has been kept.');
  }
  const request: StoredRequest = { ...data, number: makeRequestNumber(data.kind), createdAt: new Date().toISOString() };
  write([request, ...read()]);
  return request;
}

export function findRequest(number: string): StoredRequest | undefined {
  return read().find((r) => r.number === number);
}
