const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const storedTheme = localStorage.getItem('theme');

// Set tema awal saat halaman dimuat
if (storedTheme === 'dark') {
    body.dataset.theme = 'dark';
    if (themeToggle) {
        themeToggle.textContent = '☀️';
    }
} else {
    body.dataset.theme = 'light';
    if (themeToggle) {
        themeToggle.textContent = '🌓';
    }
    // Pastikan 'light' tersimpan jika tidak ada atau tema lain
    if (!storedTheme || storedTheme === 'light') {
        localStorage.setItem('theme', 'light');
    }
}

// Tambahkan event listener untuk toggle tema jika tombol ada di halaman ini
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        body.dataset.theme = body.dataset.theme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', body.dataset.theme);
        themeToggle.textContent = body.dataset.theme === 'dark' ? '☀️' : '🌓';
    });
}