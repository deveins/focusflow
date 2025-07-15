export function getSelectedAlertSound() {
    const savedSound = localStorage.getItem('alertSound');
    return savedSound || 'clock'; 
}

export function playAlertSound() {
    const selectedSound = getSelectedAlertSound();
    const audio = new Audio(`/assets/alert-sounds/${selectedSound}.mp3`);
    audio.play();
}