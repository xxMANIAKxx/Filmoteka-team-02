const Theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};

const input = document.querySelector('#darkmode-toggle');
const body = document.querySelector('body');

loadTheme();
input.addEventListener('change', changeTheme);

function changeTheme() {
    body.classList.toggle(Theme.DARK);
    body.classList.toggle(Theme.LIGHT);

    getCurrentTheme(body.classList);
}

function getCurrentTheme(currentTheme) {
  localStorage.setItem('Theme', currentTheme);
}

function loadTheme() {
  const savedTheme = localStorage.getItem('Theme');
  if (savedTheme === Theme.DARK) {
    body.classList.add(savedTheme);
    input.checked = true;
  } else {
    body.classList.add(Theme.LIGHT);
  }
}
