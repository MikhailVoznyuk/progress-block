export function clampPercent(p) {
    const n = Number(p);
    if (!Number.isFinite(n)) {
        return 0;
    }

    return Math.max(0, Math.min(n, 100));
}