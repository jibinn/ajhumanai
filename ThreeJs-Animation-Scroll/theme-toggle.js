const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Load saved theme from local storage
const savedTheme = localStorage.getItem('theme') || 'dark';
body.setAttribute('data-theme', savedTheme);
themeToggle.textContent = savedTheme === 'dark' ? '🌙' : '☀️';

// Toggle theme on click
themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    themeToggle.textContent = newTheme === 'dark' ? '🌙' : '☀️';
});
