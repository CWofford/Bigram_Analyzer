export interface AnalyzeResult {
    bigrams?: { pair: string[]; frequency: number; percentage?: number }[];
    statistics?: { total_words?: number; total_bigrams?: number; unique_bigrams?: number };
}

export function validateText(text: string) {
    return text.trim().length >= 3;
}

export function formatPercentage(p?: number) {
    return p !== undefined ? `${p.toFixed(1)}%` : 'N/A';
}
