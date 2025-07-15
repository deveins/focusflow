import { initTabs } from "./tabs.js";
import { initTimer } from "./timer.js";
import { initSettings } from "./settings.js";
import { switchTheme, applySavedTheme } from "./themes.js";

document.addEventListener('DOMContentLoaded', () => {
  initTabs();
  initTimer();
  initSettings();
  switchTheme();
  applySavedTheme();
  setupUnavailableModal();
});

function setupUnavailableModal() {
  const modal = document.getElementById('modal-notice');
  const closeBtn = modal.querySelector('.modal-close');
  
function showModal() {
  modal.classList.add('show');
}
  
function hideModal() {
  modal.classList.remove('show');
}
  
closeBtn.addEventListener('click', hideModal);
  
const disabledButtons = document.querySelectorAll('[data-disabled]');
  disabledButtons.forEach(btn => {
  btn.addEventListener('click', showModal);
  });
}