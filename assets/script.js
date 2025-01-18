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

document.addEventListener('click', function(e) {
  const dropdowns = document.querySelectorAll('.except-home ul.dropdown');
  dropdowns.forEach(dropdown => {
      if (!dropdown.parentElement.contains(e.target)) {
          dropdown.style.display = 'none';
      } else {
          dropdown.style.display = 'flex';
      }
  });
});


async function generatePDF() {
    // Ambil data dari form
    const nama = document.getElementById('nama').value;
    const nik = document.getElementById('nik').value;
    const kelamin = document.getElementById('kelamin').value;
    const ttl = document.getElementById('ttl').value;
    const status = document.getElementById('status').value;
    const kewarganegaraan = document.getElementById('kewarganegaraan').value;
    const pendidikan = document.getElementById('pendidikan').value;
    const agama = document.getElementById('agama').value;
    const pekerjaan = document.getElementById('pekerjaan').value;
    const alamat = document.getElementById('alamat').value;
    const keperluan = document.getElementById('keperluan').value;
    const lainLain = document.getElementById('lain-lain').value;

    // Import jsPDF
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const LogoURL = "https://th.bing.com/th/id/OIP.1YQ56PoVZKN9HpsPujhZhAHaFQ?rs=1&pid=ImgDetMain";

    // Tambahkan logo
    const img = new Image();
    img.src = LogoURL;

    img.onload = function () {
        doc.addImage(img, 'JPEG', 20, 15, 28, 20);

    // Header
    doc.setFontSize(14);
    doc.setFont('times', 'bold');
    doc.text('PEMERINTAH KABUPATEN BANGKALAN', 105, 20, { align: 'center' });
    doc.setFontSize(13);
    doc.setFont('times', 'bold');
    doc.text('KECAMATAN SEPULU', 105, 27, { align: 'center' });
    doc.setFontSize(16);
    doc.setFont('times', 'bold');
    doc.text('KANTOR KEPALA DESA PRANCAK', 105, 34, { align: 'center' });

    // Garis bawah header
    doc.setLineWidth(0.5);
    doc.line(20, 38, 190, 38);

    // Judul dan nomor surat
    const year = new Date().getFullYear();
    let month;
    switch(new Date().getMonth()) {
        case 0:
          month = "I";
          break;
        case 1:
          month = "II";
          break;
        case 2:
          month = "III";
          break;
        case 3:
          month = "IV";
          break;
        case 4:
          month = "V";
          break;
        case 5:
          month = "VI";
          break;
        case 6:
          month = "VII";
          break;
        case 7:
          month = "VIII";
          break;
        case 8:
          month = "IX";
          break;
        case 9:
          month = "X";
          break;
        case 10:
          month = "XI";
          break;
        case 11:
          month = "XII";
          break;
      }
    doc.setFontSize(13);
    doc.text('SURAT KETERANGAN BERKELAKUAN BAIK', 105, 47, { align: 'center' });

    // Garis bawah untuk judul surat
    const textWidth = doc.getTextWidth('SURAT KETERANGAN BERKELAKUAN BAIK');
    const startX = (210 - textWidth) / 2; // Pusatkan garis di tengah halaman
    doc.line(startX, 48, startX + textWidth, 48); // 48 adalah posisi Y setelah teks
    doc.setFontSize(12);
    doc.setFont('times', 'normal');
    doc.text(`Nomor: .../433.308.11/${month}/${year}`, 105, 55, { align: 'center' });

    // Konten
    const introText = doc.splitTextToSize(
        'Yang bertanda tangan di bawah ini, Kepala Desa Prancak, Kecamatan Sepulu, Kabupaten Bangkalan, Provinsi Jawa Timur, menerangkan bahwa:',
        170
    );
    doc.text(introText, 20, 65);

    let y = 82; // Posisi awal untuk data
    const lineHeight = 8;

    // Posisi tetap untuk label, titik dua, dan nilai
    const labelX = 20;
    const colonX = 85; // Posisi tetap untuk titik dua
    const valueX = 90;

    const labels = [
        'Nama',
        'NIK',
        'Jenis Kelamin',
        'Tempat, Tanggal Lahir',
        'Status Perkawinan',
        'Kewarganegaraan',
        'Pendidikan Terakhir',
        'Agama',
        'Pekerjaan',
        'Alamat',
        'Keperluan',
        'Lain-lain',
    ];
    const values = [
        nama,
        nik,
        kelamin,
        ttl,
        status,
        kewarganegaraan,
        pendidikan,
        agama,
        pekerjaan,
        alamat,
        keperluan,
        lainLain,
    ];

    // Loop untuk mencetak label, titik dua, dan nilai
    labels.forEach((label, index) => {
        doc.text(label, labelX, y); // Cetak label
        doc.text(':', colonX, y); // Cetak titik dua di posisi tetap
        doc.text(values[index] || '-', valueX, y); // Cetak nilai
        y += lineHeight; // Pindah ke baris berikutnya
    });


    // Penutup
    const closingText = doc.splitTextToSize(
        'Demikian Surat Keterangan Kelakuan Baik ini dibuat dengan sebenarnya dan dapat dipergunakan sebagaimana mestinya.',
        170
    );
    y += 10;
    doc.text(closingText, 20, y);
    y += 20;

    // Tanggal otomatis
    const today = new Date();
    const formattedDate = `${today.getDate().toString().padStart(2, '0')}-${(today.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${today.getFullYear()}`;
    doc.text(`Prancak, ${formattedDate}`, 140, y);

    // Penanda tangan
    y += 5;
    doc.text('KEPALA DESA PRANCAK', 140, y);
    doc.text('Yang Bersangkutan', 20, y); // Tanda tangan sejajar
    y += 27;
    doc.text('SUWAIFI MUNIR', 140, y);
    doc.text(nama, 20, y); 
    y += 12;

    // Tanda tangan Kapolsek, Koramil, dan Camat
    const tandaTanganY = y + 30; // Pindahkan lebih jauh ke bawah
    doc.text('Kapolsek Sepulu', 30, tandaTanganY - 20); // Nama jabatan dinaikkan
    doc.line(20, tandaTanganY + 5, 70, tandaTanganY + 5); // Garis tanda tangan lebih ke bawah

    doc.text('Koramil Sepulu', 90, tandaTanganY - 20); // Nama jabatan dinaikkan
    doc.line(80, tandaTanganY + 5, 130, tandaTanganY + 5); // Garis tanda tangan lebih ke bawah

    doc.text('Camat Sepulu', 150, tandaTanganY - 20); // Nama jabatan dinaikkan
    doc.line(140, tandaTanganY + 5, 190, tandaTanganY + 5); // Garis tanda tangan lebih ke bawah


    // Simpan file PDF
    doc.save('Surat_Keterangan.pdf');
    };
    
}

    async function generatePDF2() {
        const { jsPDF } = window.jspdf;

        // Ambil data dari form
        const nama = document.getElementById("nama").value;
        const nik = document.getElementById("nik").value;
        const kelamin = document.getElementById("kelamin").value;
        const ttl = document.getElementById("ttl").value;
        const status = document.getElementById("status").value;
        const agama = document.getElementById("agama").value;
        const pekerjaan = document.getElementById("pekerjaan").value;
        const alamat = document.getElementById("alamat").value;
        const keperluan = document.getElementById("keperluan").value;

        // Buat dokumen PDF baru
        const doc = new jsPDF();
        const LogoURL = "https://th.bing.com/th/id/OIP.1YQ56PoVZKN9HpsPujhZhAHaFQ?rs=1&pid=ImgDetMain";

        // Tambahkan logo
        const img = new Image();
        img.src = LogoURL;

        img.onload = function () {
            doc.addImage(img, 'JPEG', 20, 10, 28, 20);

            // Header
            doc.setFont("times", "bold");
            doc.setFontSize(16);
            doc.text("PEMERINTAH DESA PRANCAK", 105, 20, { align: "center" });
            doc.setFontSize(13);
            doc.text("KECAMATAN SEPULU - KABUPATEN BANGKALAN", 105, 27, { align: "center" });
            doc.line(20, 30, 180, 30);

            // Judul Surat
            const year = new Date().getFullYear();
            let month;
            switch(new Date().getMonth()) {
                case 0:
                month = "I";
                break;
                case 1:
                month = "II";
                break;
                case 2:
                month = "III";
                break;
                case 3:
                month = "IV";
                break;
                case 4:
                month = "V";
                break;
                case 5:
                month = "VI";
                break;
                case 6:
                month = "VII";
                break;
                case 7:
                month = "VIII";
                break;
                case 8:
                month = "IX";
                break;
                case 9:
                month = "X";
                break;
                case 10:
                month = "XI";
                break;
                case 11:
                month = "XII";
                break;
            }
            doc.text("SURAT KETERANGAN TIDAK MAMPU", 105, 40, { align: "center" });
            
            // Garis bawah untuk judul surat
            const textWidth = doc.getTextWidth("SURAT KETERANGAN TIDAK MAMPU");
            const startX = (210 - textWidth) / 2; // Pusatkan garis di tengah halaman
            doc.line(startX, 41, startX + textWidth, 41); // 41 adalah posisi Y setelah teks
            doc.setFont("times", "normal");
            doc.text(`Nomor: .../433.308.11/${month}/${year}`, 105, 47, { align: "center" });

            // Isi surat
            doc.setFontSize(12);
            doc.text("Yang bertanda tangan di bawah ini, Kepala Desa Prancak, Kecamatan Sepulu, Kabupaten ", 20, 60);
            doc.text("Bangkalan, menerangkan bahwa:", 20, 67);

            // Data pengguna
            const startXLabel = 30; // Posisi awal label
            const startXColon = 80; // Posisi titik dua ":"
            const startXValue = 85; // Posisi nilai
            let currentY = 75;

            const data = [
                { label: "Nama", value: nama },
                { label: "NIK", value: nik },
                { label: "Tempat/Tanggal Lahir", value: ttl },
                { label: "Jenis Kelamin", value: kelamin },
                { label: "Status Perkawinan", value: status },
                { label: "Agama", value: agama },
                { label: "Pekerjaan", value: pekerjaan },
                { label: "Alamat", value: alamat }
            ];

            data.forEach((item) => {
                doc.text(item.label, startXLabel, currentY); // Label
                doc.text(":", startXColon, currentY); // Titik dua
                doc.text(item.value, startXValue, currentY); // Nilai
                currentY += 7;
            });

            // Paragraf tambahan
            currentY += 7;
            doc.text("Orang tersebut di atas adalah benar-benar penduduk Desa Prancak, Kecamatan Sepulu, Kabupaten ", 20, currentY);
            currentY += 7;
            doc.text("Bangkalan yang termasuk Keluarga Tidak Mampu (GAKIN).", 20, currentY);
            currentY += 15;
            doc.text(`Surat keterangan ini diberikan kepada yang bersangkutan sebagai persyaratan pengajuan`, 20, currentY);
            currentY += 7;
            doc.text(`${keperluan}.`, 20, currentY);

            // Penutup surat
            currentY += 15;
            doc.text("Demikian surat keterangan ini kami buat dan dapat dipergunakan sebagaimana mestinya.", 20, currentY);

            // Tanda tangan
            currentY += 20;
            const currentDate = new Date();
            const formattedDate = `${currentDate.getDate().toString().padStart(2, '0')}-${(currentDate.getMonth() + 1)
                .toString()
                .padStart(2, '0')}-${currentDate.getFullYear()}`;
            doc.text(`Prancak, ${formattedDate}`, 140, currentY);
            currentY += 7;
            doc.text("KEPALA DESA PRANCAK", 140, currentY);
            currentY += 30;
            doc.text("SUWAIFI MUNIR", 140, currentY);

            // Simpan PDF
            doc.save(`Surat_Keterangan_Tidak_Mampu_${nama}.pdf`);
        };
        img.onerror = function () {
            console.error("Gagal memuat gambar. Pastikan path gambar benar.");
        };
        
    }










