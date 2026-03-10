import type { Entry } from '../types/entryTypes';
import { sanitizeKind } from '../types/entryTypes';

/**
 * Parse a single CSV line respecting quoted fields (handles "" and commas inside quotes).
 */
function parseCsvLine(line: string): string[] {
    const result: string[] = [];
    let current = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
        const c = line[i];
        if (c === '"') {
            if (inQuotes && line[i + 1] === '"') {
                current += '"';
                i++;
            } else {
                inQuotes = !inQuotes;
            }
        } else if (inQuotes) {
            current += c;
        } else if (c === ',') {
            result.push(current);
            current = '';
        } else {
            current += c;
        }
    }
    result.push(current);
    return result;
}

/**
 * Parse "Created" column from export format (e.g. "Mar 10" or "Dec 25") to ISO date string.
 * Uses current year when year is missing.
 */
function parseCreatedToIso(created: string): string {
    const trimmed = String(created ?? '').trim();
    if (!trimmed) return new Date().toISOString();
    const year = new Date().getFullYear();
    const parsed = new Date(trimmed + ' ' + year);
    return isNaN(parsed.getTime()) ? new Date().toISOString() : parsed.toISOString();
}

const EXPECTED_HEADER = 'Created,Kind,Company,Position,Note,URL';

/**
 * Parse CSV text (as exported by this app) into Entry[].
 * Generates new keys for each row. Returns empty array if header doesn't match or parse fails.
 */
export function parseCsvToEntries(csvText: string): Entry[] {
    const lines = csvText.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
    if (lines.length < 2) return [];
    const headerLine = lines[0].replace(/\s*,\s*/g, ',').trim();
    if (headerLine !== EXPECTED_HEADER) return [];
    const entries: Entry[] = [];
    for (let i = 1; i < lines.length; i++) {
        const cells = parseCsvLine(lines[i]);
        if (cells.length < 6) continue;
        const [created, kind, company, position, note, url] = cells;
        entries.push({
            key: crypto.randomUUID(),
            createdAt: parseCreatedToIso(created),
            kind: sanitizeKind(kind),
            company: String(company ?? '').trim(),
            position: String(position ?? '').trim(),
            note: String(note ?? '').trim(),
            url: String(url ?? '').trim(),
        });
    }
    return entries;
}
