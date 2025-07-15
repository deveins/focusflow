export function switchTheme() {
    const themeButtons = document.querySelectorAll('.theme-card');
    const body = document.body;

    themeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const selectedTheme = button.dataset.theme;
            
            const themeClasses = Array.from(body.classList).filter(cls => cls.startsWith('theme--'));
            themeClasses.forEach(cls => body.classList.remove(cls));


            body.classList.add(`theme--${selectedTheme}`);

            localStorage.setItem('selectedTheme', selectedTheme);
        });
    });
}

export function applySavedTheme() {
    const savedTheme = localStorage.getItem('selectedTheme');
    if (!savedTheme) return;
  
    const body = document.body;
  
    const themeClasses = Array.from(body.classList).filter(cls =>
      cls.startsWith('theme--')
    );
    themeClasses.forEach(cls => body.classList.remove(cls));
  
    body.classList.add(`theme--${savedTheme}`);
}