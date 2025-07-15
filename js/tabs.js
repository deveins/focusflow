export function initTabs() {
    const tabButtons = document.querySelectorAll('.mode-tabs__button');
    const tabPanels = document.querySelectorAll('.timer');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const selectedMode = button.dataset.mode;

            tabButtons.forEach(btn => {
                const activeTab = btn.dataset.mode === selectedMode;
                btn.setAttribute('aria-selected', activeTab);
                btn.classList.toggle('mode-tabs__button--active', activeTab);
            });

            tabPanels.forEach(panel => {
                const activePanel = panel.dataset.panel === selectedMode;
                panel.classList.toggle('active-panel', activePanel);
            });
        });
    });
}