export const durations = {
    focus: 25 * 60,
    short: 5 * 60,
    long: 10 * 60,
};

export let isRunning = false;

export function setRunning(state) {
  isRunning = state;
}

export const autoSettings = {
    autoBreakEnabled: true,
    autoFocusEnabled: true,
};

export function formatTime(seconds) {
    const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    return `${mins}:${secs}`;
};
