// AOS Initialization
AOS.init({
    duration: 1000,
    once: false,
    mirror: true,
});

// Script to Handle Opening Invitation
function openInvitation() {
    const cover = document.getElementById('intro-cover');
    if (!cover) return;
    
    // Putar musik latar terlebih dahulu
    const bgMusic = document.getElementById('bg-music');
    if (bgMusic) {
        bgMusic.play().catch(e => console.error("Audio playback prevented:", e));
    }
    
    // Jeda 2 detik sebelum memicu animasi slide up
    setTimeout(() => {
        // Execute slide up animation securely by manipulating inline styles
        cover.style.transform = 'translateY(-100%)';
        
        // Allow page scroll again
        document.body.classList.remove('overflow-hidden');
        document.body.classList.add('overflow-x-hidden');
        
        // Hide element from DOM permanently after animation completes
        setTimeout(() => {
            cover.style.display = 'none';
            
            // Refresh AOS to trigger animations securely on the home section content
            if (typeof AOS !== 'undefined') {
                AOS.refresh();
            }
        }, 3000);
    }, 1000); // Jeda 1.5 detik (sesuaikan antara 1000ms - 5000ms jika perlu)
}

// Script to handle Modal Interactions
function openGiftModal() {
    const modal = document.getElementById('gift-modal');
    const content = document.getElementById('gift-modal-content');
    
    // Allow display block first
    modal.classList.remove('invisible');
    
    // Small delay for CSS animation to trigger properly
    setTimeout(() => {
        modal.classList.remove('opacity-0');
        content.classList.remove('scale-95');
    }, 10);
    
    // Prevent body scroll (optional)
    document.body.style.overflow = 'hidden';
}

function closeGiftModal() {
    const modal = document.getElementById('gift-modal');
    const content = document.getElementById('gift-modal-content');
    
    // Start fading out
    modal.classList.add('opacity-0');
    content.classList.add('scale-95');
    
    // Wait for transition to finish then hide via invisible
    setTimeout(() => {
        modal.classList.add('invisible');
    }, 300);
    
    // Restore body scroll
    document.body.style.overflow = '';
}

// Countdown Timer Logic
document.addEventListener("DOMContentLoaded", function() {
    const countdownContainer = document.getElementById('countdown-container');
    if (!countdownContainer) return;

    // Get Target Date from custom data attribute
    let targetDateStr = countdownContainer.getAttribute('data-target-date');
    if (!targetDateStr) return;
    
    // Pastikan zona waktu secara default mengacu pada Waktu Indonesia Barat (WIB / UTC+7)
    // Jika format input string belum menyebutkan timezone standar (Z atau +/- offset), suntik secara otomatis.
    if (!targetDateStr.includes('+') && !targetDateStr.includes('-') && !targetDateStr.includes('Z')) {
        targetDateStr += '+07:00';
    }
    
    const targetDate = new Date(targetDateStr).getTime();
    
    // Get Elements
    const elDays = document.getElementById('countdown-days');
    const elHours = document.getElementById('countdown-hours');
    const elMinutes = document.getElementById('countdown-minutes');
    const elSeconds = document.getElementById('countdown-seconds');

    if (!elDays || !elHours || !elMinutes || !elSeconds) return;

    // Update the counter every 1 second
    const countdownTarget = setInterval(function() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        // Time calculations
        if (distance > 0) {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Output the result
            elDays.innerText = days;
            elHours.innerText = hours;
            elMinutes.innerText = minutes;
            elSeconds.innerText = seconds;
        } else {
            // If the countdown is finished
            clearInterval(countdownTarget);
            elDays.innerText = "0";
            elHours.innerText = "0";
            elMinutes.innerText = "0";
            elSeconds.innerText = "0";
        }
    }, 1000);
});

// ==========================================
// Supabase Integration
// ==========================================
const SUPABASE_URL = 'https://qmhofqwbaxrbwrwvomie.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFtaG9mcXdiYXhyYndyd3ZvbWllIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY0MDg0NjMsImV4cCI6MjA5MTk4NDQ2M30.kpl9o1eQjngUeqwMFjrwLY5shrK3w-aQIvqrAVzQOqc';
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Fungsi Kirim Data RSVP
async function submitRSVP(event) {
    event.preventDefault();
    
    const nama = document.getElementById('rsvp-nama').value;
    const kehadiran = document.getElementById('rsvp-kehadiran').value;
    
    let jumlah_orang = 0;
    if (kehadiran === 'Hadir') {
        jumlah_orang = parseInt(document.getElementById('rsvp-jumlah').value);
    }

    const { error } = await supabaseClient
        .from('rsvps')
        .insert([{ nama: nama, kehadiran: kehadiran, jumlah_orang: jumlah_orang }]);

    if (error) {
        console.error('Error RSVP:', error);
        alert('Gagal mengirim RSVP. Silakan coba lagi.');
    } else {
        alert('Terima kasih! Konfirmasi kehadiran Anda telah tersimpan.');
        document.getElementById('form-rsvp').reset();
    }
}

// Fungsi Kirim Data Ucapan
async function submitWish(event) {
    event.preventDefault();
    
    const nama = document.getElementById('wish-nama').value;
    const ucapan = document.getElementById('wish-ucapan').value;

    const { error } = await supabaseClient
        .from('wishes')
        .insert([{ nama: nama, ucapan: ucapan }]);

    if (error) {
        console.error('Error Wishes:', error);
        alert('Gagal mengirim ucapan. Silakan coba lagi.');
    } else {
        alert('Ucapan berhasil dikirim!');
        document.getElementById('form-wishes').reset();
        fetchWishes();
    }
}

// Fungsi Ambil & Tampilkan Data Ucapan
async function fetchWishes() {
    const { data, error } = await supabaseClient
        .from('wishes')
        .select('nama, ucapan, created_at')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Gagal mengambil ucapan:', error);
        return;
    }
    
    // Update jumlah komentar ucapan secara dinamis
    const countEl = document.getElementById('wishes-count');
    if (countEl && data) {
        countEl.innerText = `${data.length} Comments`;
    }

    const container = document.getElementById('wishes-container');
    if (!container) return;
    container.innerHTML = '';

    data.forEach(item => {
        // Build timestamp like "3 tahun, 8 bulan lalu" or just standard date
        const dateObj = new Date(item.created_at);
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour:'2-digit', minute:'2-digit' };
        const formattedDate = dateObj.toLocaleDateString('id-ID', options);
        
        // Pick a random color for the avatar indicator
        const colors = ['bg-yellow-400', 'bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-gray-500'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        const initial = item.nama.charAt(0).toUpperCase();

        const wishCard = `
            <div class="py-5 border-b border-gray-100 flex gap-3 text-left relative group">
                <div class="w-8 h-8 md:w-9 md:h-9 rounded-full ${randomColor} text-white flex items-center justify-center font-bold text-sm flex-shrink-0 shadow-sm">${initial}</div>
                <div class="flex-1">
                    <div class="flex items-center flex-wrap gap-2 mb-1">
                        <h4 class="font-sans font-bold text-sm md:text-[15px] text-gray-800">${item.nama}</h4>
                    </div>
                    <div class="flex items-center gap-1 text-[11px] text-gray-400 mb-2">
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                        ${formattedDate}
                    </div>
                    <p class="font-sans text-[13px] md:text-sm text-gray-500 leading-relaxed max-w-2xl text-wrap break-all md:break-normal">
                        ${item.ucapan}
                    </p>
                </div>
            </div>
        `;
        container.innerHTML += wishCard;
    });
}

document.addEventListener("DOMContentLoaded", function() {
    // 1. Tangkap parameter dari URL untuk Nama Tamu
    const urlParams = new URLSearchParams(window.location.search);
    const guestParam = urlParams.get('to');
    
    if (guestParam) {
        const decodedName = guestParam.replace(/\+/g, ' '); // Decode special chars (if any) and replace plus with space
        
        const elIntro = document.getElementById('guest-name-intro');
        if (elIntro) elIntro.innerText = decodedName;
        
        const elHero = document.getElementById('guest-name-hero');
        if (elHero) elHero.innerText = decodedName;
    }

    // 2. Logic Form RSVP & Wishes
    const formRSVP = document.getElementById('form-rsvp');
    if(formRSVP) formRSVP.addEventListener('submit', submitRSVP);
    
    const formWishes = document.getElementById('form-wishes');
    if(formWishes) formWishes.addEventListener('submit', submitWish);
    
    fetchWishes();
});
