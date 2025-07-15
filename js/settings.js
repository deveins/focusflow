import { durations, formatTime, isRunning, autoSettings } from './config.js';

export function initSettings() {
    function openSettingsPanel() {
        const settingsPanel = document.querySelector('.settings-panel');
        const settingsButton = document.querySelector('[data-action="settings"]');

        if (!settingsPanel || !settingsButton) return;
        
        settingsButton.addEventListener('click', () => {
            settingsPanel.classList.add('open-settings');
        });
    }

    function closeSettingsPanel() {
        const settingsPanel = document.querySelector('.settings-panel');
        const closeButton = document.querySelector('.settings-panel__close');

        if (!settingsPanel || !closeButton) return;

        closeButton.addEventListener('click', () => {
            settingsPanel.classList.remove('open-settings');
        });
    }

    function selectSettings() {
        const settingsSidebar = document.querySelectorAll('.settings-nav-item');
        const settingsPanels = document.querySelectorAll('.settings-section');
      
        settingsSidebar.forEach(navItem => {
          navItem.addEventListener('click', () => {
            const selectedTab = navItem.dataset.settingsTab;

            settingsSidebar.forEach(item => item.classList.remove('active-settings-sidebar'));
            settingsPanels.forEach(panel => panel.classList.remove('active-settings-panel'));

            navItem.classList.add('active-settings-sidebar');
      
            const targetPanel = document.querySelector(`.settings-section[data-settings-panel="${selectedTab}"]`);
            if (targetPanel) {
              targetPanel.classList.add('active-settings-panel');
            }
          });
        });
    }

    function updateTimer() {
        const focusInput = document.querySelector('[data-setting="focus"]');
        const shortInput = document.querySelector('[data-setting="short"]');
        const longInput = document.querySelector('[data-setting="long"]');
        const focusDisplay = document.querySelector('[data-panel="focus"] .timer__display');
        const shortDisplay = document.querySelector('[data-panel="short"] .timer__display');
        const longDisplay = document.querySelector('[data-panel="long"] .timer__display');


        focusInput.addEventListener('input', () => {
            durations.focus = Number(focusInput.value) * 60;

            if (!isRunning) {
                focusDisplay.textContent = formatTime(durations.focus);
            }
        });
        
        shortInput.addEventListener('input', () => {
            durations.short = Number(shortInput.value) * 60;

            if (!isRunning) {
                shortDisplay.textContent = formatTime(durations.short);
            }
        });
        
        longInput.addEventListener('input', () => {
            durations.long = Number(longInput.value) * 60;

            if (!isRunning) {
                longDisplay.textContent = formatTime(durations.long);
            }
        });
    }

    function autoTimer() {
        const autoStartBreakCheckbox = document.querySelector('[data-setting="autoBreak"]');
        const autoStartFocusCheckbox = document.querySelector('[data-setting="autoFocus"]');

        autoStartBreakCheckbox.addEventListener('change', () => {
            autoSettings.autoBreakEnabled = autoStartBreakCheckbox.checked;
        });

        autoStartFocusCheckbox.addEventListener('change', () => {
            autoSettings.autoFocusEnabled = autoStartFocusCheckbox.checked;
        });
    }

    function alertSounds() {
        const savedSound = localStorage.getItem('alertSound');
        if (savedSound) {
            const selected = document.querySelector(`input[name="alertSound"][value="${savedSound}"]`);
            if (selected) selected.checked = true;
        }

        const soundOptions = document.querySelectorAll('input[name="alertSound"]');
        soundOptions.forEach(option => {
            option.addEventListener('change', () => {
            localStorage.setItem('alertSound', option.value);
            });
        });
    }

    openSettingsPanel();
    closeSettingsPanel();
    selectSettings();
    updateTimer();
    autoTimer();
    alertSounds();
}