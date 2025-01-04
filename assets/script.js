window.onload = function() {
    // Cek apakah URL memiliki hash (#)
    if (window.location.hash) {
        const target = document.querySelector(window.location.hash);
        if (target) {
            const offset = 80;  // Sesuaikan offset dengan tinggi navbar
            const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;

            // Scroll ke posisi dengan offset tanpa smooth (langsung)
            window.scrollTo({
                top: targetPosition,
                behavior: 'auto'  // Tidak ada animasi saat refresh
            });
        }
    }
};

// Tambahkan event listener untuk smooth scroll saat klik menu
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        const offset = 30;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;

        // Scroll dengan animasi smooth saat klik
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });

        // Hapus hash di URL untuk mencegah auto-scroll saat refresh
        history.pushState(null, null, window.location.pathname);
    });
});
