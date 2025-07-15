import { durations, isRunning, setRunning, formatTime, autoSettings } from './config.js';
import { playAlertSound } from './alertSound.js';

export function initTimer() {
    let countdown = null;
    let timeLeft = 0;
    setRunning(false);

    document.addEventListener('click', e => {
        const skipButton = e.target.closest('[data-action="skip"]');
        if (!skipButton) return;

        const panel = skipButton.closest('.timer');
        const mode = panel?.dataset.panel;
        if (!mode) return;

        document.querySelector('.mode-tabs__button[data-mode="focus"]')?.click();
        resetTimer();
    });

    document.addEventListener('click', e => {
        const tab = e.target.closest('.mode-tabs__button');
        if (tab) {
            resetTimer();
            return;
        }

        const resetButton = e.target.closest('[data-action="reset"]');
        if (resetButton) {
            const panel = resetButton.closest('.timer');
            const mode = panel?.dataset.panel;
            const display = panel?.querySelector('.timer__display');

            clearInterval(countdown);
            countdown = null;
            setRunning(false);
            timeLeft = 0;

            if (display && durations[mode] !== undefined) {
                display.textContent = formatTime(durations[mode]);
            }

            const startBtn = panel?.querySelector('[data-action="start"]');
            if (startBtn) startBtn.textContent = 'Start';

            return;
        }

        const button = e.target.closest('[data-action="start"]');
        if (!button) return;

        const panel = button.closest('.timer');
        const mode = panel?.dataset.panel;
        const display = panel?.querySelector('.timer__display');
        if (!mode || !display) return;

        if (isRunning) {
            clearInterval(countdown);
            setRunning(false);
            button.textContent = 'Start';
            return;
        }

        setRunning(true);
        button.textContent = 'Pause';

        if (timeLeft === 0) {
            timeLeft = durations[mode];
        }

        countdown = setInterval(() => {
            timeLeft--;
            display.textContent = formatTime(timeLeft);

            if (timeLeft <= 0) {
                clearInterval(countdown);
                setRunning(false);
                playAlertSound();

                // Auto switch to next mode
                if (mode === 'short' && autoSettings.autoFocusEnabled) {
                    document.querySelector('.mode-tabs__button[data-mode="focus"]')?.click();
                    setTimeout(() => {
                        document.querySelector('[data-panel="focus"] [data-action="start"]')?.click();
                    }, 200);
                }

                if (mode === 'focus' && autoSettings.autoBreakEnabled) {
                    document.querySelector('.mode-tabs__button[data-mode="short"]')?.click();
                    setTimeout(() => {
                        document.querySelector('[data-panel="short"] [data-action="start"]')?.click();
                    }, 200);
                }

                button.textContent = 'Start';
                display.textContent = formatTime(durations[mode]);
            }
        }, 1000);
    });

    function resetTimer() {
        clearInterval(countdown);
        countdown = null;
        timeLeft = 0;
        setRunning(false);

        document.querySelectorAll('.timer').forEach(panel => {
            const mode = panel.dataset.panel;
            const display = panel.querySelector('.timer__display');
            if (display && durations[mode] !== undefined) {
                display.textContent = formatTime(durations[mode]);
            }
        });

        document.querySelectorAll('[data-action="start"]').forEach(btn => {
            btn.textContent = 'Start';
        });
    }
}