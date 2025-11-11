document.addEventListener('DOMContentLoaded', () => {
    let banner = document.querySelector('.banner');
    let canvas = document.getElementById('dotsCanvas');
    
    // Pastikan canvas ada sebelum mencoba menggunakannya
    if (!canvas || !banner) return; 

    const ctx = canvas.getContext('2d');
    let dots = [];
    // Warna yang digunakan untuk titik-titik (sama dengan kode Anda)
    const arrayColors = ['#eee', '#545454', '#596d91', '#bb5a68', '#696541'];
    const maxDots = 100;

    // Fungsi untuk mengatur ulang ukuran canvas dan titik-titik
    const initCanvas = () => {
        canvas.width = banner.offsetWidth;
        canvas.height = banner.offsetHeight;

        dots = [];
        for (let index = 0; index < maxDots; index++) {
            dots.push({
                x:  Math.floor(Math.random() * canvas.width),
                y:  Math.floor(Math.random() * canvas.height),
                size: Math.random() * 2 + 1, // Ukuran titik lebih kecil untuk efek halus
                color: arrayColors[Math.floor(Math.random() * arrayColors.length)]
            });
        }
        drawDots();
    }

    // Fungsi untuk menggambar semua titik
    const drawDots = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        dots.forEach(dot => {
            ctx.fillStyle = dot.color;
            ctx.beginPath();
            ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
            ctx.fill();
        });
    }

    // Menangani interaksi mouse
    banner.addEventListener('mousemove', (event) => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawDots();

        // Hitung posisi mouse relatif terhadap banner
        let mouse = {
            x:  event.clientX - banner.getBoundingClientRect().left,
            y:  event.clientY - banner.getBoundingClientRect().top
        };

        // Gambar garis ke titik terdekat
        dots.forEach(dot => {
            let distance = Math.sqrt((mouse.x - dot.x) ** 2 + (mouse.y - dot.y) ** 2);
            
            // Jika jaraknya dekat, tarik garis
            if(distance < 150){
                ctx.strokeStyle = dot.color;
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(dot.x, dot.y);
                ctx.lineTo(mouse.x, mouse.y);
                ctx.stroke();
            }
        });
    });

    // Menggambar ulang titik saat mouse keluar
    banner.addEventListener('mouseout', () => {
        drawDots();
    });

    // Menggambar ulang dan menyesuaikan ukuran saat jendela diubah ukurannya
    window.addEventListener('resize', initCanvas);

    // Inisialisasi awal
    initCanvas();
});
