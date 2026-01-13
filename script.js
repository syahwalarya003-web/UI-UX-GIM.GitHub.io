document.addEventListener('DOMContentLoaded', function() {
    // Inisialisasi variabel global
    const slides = document.querySelectorAll('.slide');
    const slideNavItems = document.querySelectorAll('.slide-nav-item');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const currentSlideNum = document.getElementById('current-slide-num');
    const progressFill = document.querySelector('.progress-fill');
    
    let currentSlideIndex = 0;
    const totalSlides = slides.length;
    
    // Inisialisasi presentasi
    initPresentation();
    
    function initPresentation() {
        // Update tampilan slide pertama
        updateSlideDisplay();
        
        // Setup event listeners untuk navigasi
        setupEventListeners();
        
        // Setup keyboard navigation
        setupKeyboardNavigation();
        
        // Setup touch/swipe untuk mobile
        setupTouchNavigation();
        
        // Inisialisasi komponen interaktif
        initInteractiveComponents();
    }
    
    function updateSlideDisplay() {
        // Sembunyikan semua slide
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Tampilkan slide aktif
        slides[currentSlideIndex].classList.add('active');
        
        // Update navigasi sidebar
        slideNavItems.forEach((item, index) => {
            if (index === currentSlideIndex) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
        
        // Update nomor slide
        currentSlideNum.textContent = currentSlideIndex + 1;
        
        // Update progress bar
        const progressPercentage = ((currentSlideIndex + 1) / totalSlides) * 100;
        progressFill.style.width = `${progressPercentage}%`;
        
        // Update status tombol navigasi
        prevBtn.disabled = currentSlideIndex === 0;
        nextBtn.disabled = currentSlideIndex === totalSlides - 1;
        
        // Eksekusi animasi khusus untuk slide tertentu
        executeSlideAnimations();
        
        // Scroll ke atas saat ganti slide
        document.querySelector('.presentation-area').scrollTop = 0;
    }
    
    function executeSlideAnimations() {
        // Animasi untuk slide 1 (Judul)
        if (currentSlideIndex === 0) {
            animateTitleSlide();
        }
        
        // Animasi untuk slide 3 (Definition)
        if (currentSlideIndex === 2) {
            animateHealthBar();
        }
        
        // Animasi untuk slide 5 (Design Process)
        if (currentSlideIndex === 4) {
            initProcessInteraction();
        }
        
        // Animasi untuk slide 8 (Testimonials)
        if (currentSlideIndex === 7) {
            initTestimonialSlider();
        }
        
        // Animasi untuk slide 11 (Stats)
        if (currentSlideIndex === 10) {
            animateCounterStats();
            animateChartBars();
        }
    }
    
    function animateTitleSlide() {
        // Animasi logo berputar
        const logos = document.querySelectorAll('.title-logo');
        logos.forEach((logo, index) => {
            logo.style.animation = `float ${2 + index * 0.3}s ease-in-out infinite`;
        });
        
        // Tambahkan style untuk animasi float
        if (!document.querySelector('#float-animation')) {
            const style = document.createElement('style');
            style.id = 'float-animation';
            style.textContent = `
                @keyframes float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    function animateHealthBar() {
        const healthFill = document.querySelector('.health-fill');
        if (healthFill) {
            // Reset animasi
            healthFill.style.width = '0%';
            
            // Animasikan health bar
            setTimeout(() => {
                healthFill.style.transition = 'width 1.5s ease-in-out';
                healthFill.style.width = '70%';
            }, 300);
        }
    }
    
    function initProcessInteraction() {
        const processItems = document.querySelectorAll('.process-item');
        const processDetails = document.querySelectorAll('.process-detail');
        
        processItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                // Hapus active class dari semua item
                processItems.forEach(i => i.classList.remove('active'));
                processDetails.forEach(d => d.classList.remove('active'));
                
                // Tambahkan active class ke item yang diklik
                item.classList.add('active');
                
                // Tampilkan detail yang sesuai
                const detailId = `detail-${item.classList[1]}`;
                const targetDetail = document.getElementById(detailId);
                if (targetDetail) {
                    targetDetail.classList.add('active');
                }
            });
        });
        
        // Set active item pertama secara default
        if (processItems.length > 0) {
            processItems[0].classList.add('active');
            if (processDetails.length > 0) {
                processDetails[0].classList.add('active');
            }
        }
    }
    
    function initTestimonialSlider() {
        const testimonialSlides = document.querySelectorAll('.testimonial-slide');
        const testimonialDots = document.querySelectorAll('.testimonial-dot');
        const prevButton = document.querySelector('.testimonial-prev');
        const nextButton = document.querySelector('.testimonial-next');
        
        let currentTestimonial = 0;
        
        function updateTestimonial() {
            // Sembunyikan semua slide
            testimonialSlides.forEach(slide => {
                slide.classList.remove('active');
            });
            
            // Tampilkan slide aktif
            testimonialSlides[currentTestimonial].classList.add('active');
            
            // Update dots
            testimonialDots.forEach((dot, index) => {
                if (index === currentTestimonial) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }
        
        // Event listener untuk tombol next
        if (nextButton) {
            nextButton.addEventListener('click', () => {
                currentTestimonial = (currentTestimonial + 1) % testimonialSlides.length;
                updateTestimonial();
            });
        }
        
        // Event listener untuk tombol prev
        if (prevButton) {
            prevButton.addEventListener('click', () => {
                currentTestimonial = (currentTestimonial - 1 + testimonialSlides.length) % testimonialSlides.length;
                updateTestimonial();
            });
        }
        
        // Event listener untuk dots
        testimonialDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentTestimonial = index;
                updateTestimonial();
            });
        });
        
        // Auto-advance testimonial setiap 5 detik
        let testimonialInterval = setInterval(() => {
            if (currentSlideIndex === 7) { // Hanya jika di slide testimonial
                currentTestimonial = (currentTestimonial + 1) % testimonialSlides.length;
                updateTestimonial();
            }
        }, 5000);
        
        // Hentikan interval saat meninggalkan slide
        document.addEventListener('slideChange', () => {
            if (currentSlideIndex !== 7) {
                clearInterval(testimonialInterval);
            }
        });
        
        // Update testimonial awal
        updateTestimonial();
    }
    
    function animateCounterStats() {
        const statNumbers = document.querySelectorAll('.stat-number[data-target]');
        
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const suffix = stat.textContent.includes('+') ? '+' : '';
            const duration = 2000; // 2 detik
            const step = target / (duration / 16); // 60fps
            
            let current = 0;
            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                stat.textContent = Math.floor(current) + suffix;
            }, 16);
        });
    }
    
    function animateChartBars() {
        const chartBars = document.querySelectorAll('.bar-fill');
        
        chartBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0%';
            
            setTimeout(() => {
                bar.style.transition = 'width 1.5s ease-out';
                bar.style.width = width;
            }, 300);
        });
    }
    
    function setupEventListeners() {
        // Event listener untuk tombol navigasi
        prevBtn.addEventListener('click', goToPrevSlide);
        nextBtn.addEventListener('click', goToNextSlide);
        
        // Event listener untuk navigasi sidebar
        slideNavItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                goToSlide(index);
            });
        });
    }
    
    function setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            // Abaikan jika user sedang mengetik di form
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') {
                return;
            }
            
            switch(e.key) {
                case 'ArrowLeft':
                case 'PageUp':
                    e.preventDefault();
                    goToPrevSlide();
                    break;
                    
                case 'ArrowRight':
                case 'PageDown':
                case ' ':
                    e.preventDefault();
                    goToNextSlide();
                    break;
                    
                case 'Home':
                    e.preventDefault();
                    goToSlide(0);
                    break;
                    
                case 'End':
                    e.preventDefault();
                    goToSlide(totalSlides - 1);
                    break;
                    
                case '1':
                case '2':
                case '3':
                case '4':
                case '5':
                case '6':
                case '7':
                case '8':
                case '9':
                    const num = parseInt(e.key);
                    if (num <= totalSlides) {
                        e.preventDefault();
                        goToSlide(num - 1);
                    }
                    break;
            }
        });
    }
    
    function setupTouchNavigation() {
        let touchStartX = 0;
        let touchStartY = 0;
        
        document.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            touchStartY = e.changedTouches[0].screenY;
        });
        
        document.addEventListener('touchend', (e) => {
            const touchEndX = e.changedTouches[0].screenX;
            const touchEndY = e.changedTouches[0].screenY;
            
            const diffX = touchStartX - touchEndX;
            const diffY = touchStartY - touchEndY;
            
            // Abaikan jika swipe vertikal (scroll)
            if (Math.abs(diffY) > Math.abs(diffX)) {
                return;
            }
            
            const swipeThreshold = 50;
            
            if (Math.abs(diffX) > swipeThreshold) {
                if (diffX > 0) {
                    // Swipe kiri -> next slide
                    goToNextSlide();
                } else {
                    // Swipe kanan -> prev slide
                    goToPrevSlide();
                }
            }
        });
    }
    
    function initInteractiveComponents() {
        // Form submission handler
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                // Simulasi pengiriman form
                const submitButton = contactForm.querySelector('.submit-button');
                const originalText = submitButton.innerHTML;
                
                submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
                submitButton.disabled = true;
                
                // Simulasi delay pengiriman
                setTimeout(() => {
                    alert('Terima kasih! Pesan Anda telah dikirim. Kami akan menghubungi Anda dalam 1-2 hari kerja.');
                    contactForm.reset();
                    submitButton.innerHTML = originalText;
                    submitButton.disabled = false;
                }, 1500);
            });
        }
        
        // Pricing buttons
        const pricingButtons = document.querySelectorAll('.pricing-button');
        pricingButtons.forEach(button => {
            button.addEventListener('click', () => {
                const plan = button.closest('.pricing-card').querySelector('.pricing-title').textContent;
                
                if (plan === 'Enterprise') {
                    // Untuk paket Enterprise, langsung ke form kontak
                    goToSlide(11); // Slide kontak
                    
                    // Scroll ke form
                    setTimeout(() => {
                        document.querySelector('.contact-form').scrollIntoView({ 
                            behavior: 'smooth',
                            block: 'center'
                        });
                    }, 500);
                } else {
                    // Untuk paket lain, tampilkan modal konfirmasi
                    showConfirmationModal(plan);
                }
            });
        });
        
        // Hover effect untuk team members
        const teamMembers = document.querySelectorAll('.team-member');
        teamMembers.forEach(member => {
            member.addEventListener('mouseenter', () => {
                member.style.transform = 'translateY(-10px)';
            });
            
            member.addEventListener('mouseleave', () => {
                member.style.transform = 'translateY(0)';
            });
        });
        
        // Tooltip untuk skill tags
        const skillTags = document.querySelectorAll('.skill');
        skillTags.forEach(tag => {
            tag.addEventListener('mouseenter', (e) => {
                const tooltip = document.createElement('div');
                tooltip.className = 'tooltip';
                tooltip.textContent = `Klik untuk melihat portfolio terkait ${tag.textContent}`;
                tooltip.style.position = 'absolute';
                tooltip.style.background = 'rgba(0, 0, 0, 0.9)';
                tooltip.style.color = 'white';
                tooltip.style.padding = '8px 12px';
                tooltip.style.borderRadius = '6px';
                tooltip.style.fontSize = '0.85rem';
                tooltip.style.zIndex = '10000';
                tooltip.style.maxWidth = '200px';
                tooltip.style.textAlign = 'center';
                tooltip.style.pointerEvents = 'none';
                
                document.body.appendChild(tooltip);
                
                const rect = tag.getBoundingClientRect();
                tooltip.style.left = `${rect.left + rect.width/2 - tooltip.offsetWidth/2}px`;
                tooltip.style.top = `${rect.top - tooltip.offsetHeight - 10}px`;
                
                tag.tooltipElement = tooltip;
            });
            
            tag.addEventListener('mouseleave', () => {
                if (tag.tooltipElement) {
                    tag.tooltipElement.remove();
                    tag.tooltipElement = null;
                }
            });
            
            tag.addEventListener('click', () => {
                // Navigasi ke slide portfolio saat skill diklik
                goToSlide(5); // Slide portfolio
            });
        });
    }
    
    function showConfirmationModal(plan) {
        // Buat modal
        const modal = document.createElement('div');
        modal.className = 'confirmation-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Pilih Paket ${plan}</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <p>Anda akan memilih paket <strong>${plan}</strong>. Untuk melanjutkan pemesanan, silakan hubungi kami melalui:</p>
                    <div class="contact-options">
                        <button class="contact-option" data-method="whatsapp">
                            <i class="fab fa-whatsapp"></i> WhatsApp
                        </button>
                        <button class="contact-option" data-method="email">
                            <i class="fas fa-envelope"></i> Email
                        </button>
                        <button class="contact-option" data-method="call">
                            <i class="fas fa-phone"></i> Telepon
                        </button>
                    </div>
                    <p class="modal-note">Atau lanjutkan ke formulir kontak untuk mengirimkan detail proyek Anda.</p>
                </div>
                <div class="modal-footer">
                    <button class="modal-btn secondary">Nanti Saja</button>
                    <button class="modal-btn primary">Form Kontak</button>
                </div>
            </div>
        `;
        
        // Style modal
        const style = document.createElement('style');
        style.textContent = `
            .confirmation-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                animation: fadeIn 0.3s ease;
            }
            
            .modal-content {
                background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
                border-radius: 16px;
                width: 90%;
                max-width: 500px;
                border: 1px solid rgba(108, 92, 231, 0.3);
                box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
                overflow: hidden;
            }
            
            .modal-header {
                padding: 20px;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .modal-header h3 {
                color: var(--light-color);
                margin: 0;
                font-size: 1.5rem;
            }
            
            .modal-close {
                background: none;
                border: none;
                color: var(--gray-color);
                font-size: 1.8rem;
                cursor: pointer;
                line-height: 1;
                padding: 0;
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: all 0.3s ease;
            }
            
            .modal-close:hover {
                background: rgba(255, 255, 255, 0.1);
                color: white;
            }
            
            .modal-body {
                padding: 20px;
            }
            
            .modal-body p {
                color: rgba(255, 255, 255, 0.8);
                line-height: 1.6;
                margin-bottom: 20px;
            }
            
            .contact-options {
                display: flex;
                gap: 10px;
                margin-bottom: 20px;
                flex-wrap: wrap;
            }
            
            .contact-option {
                flex: 1;
                min-width: 120px;
                padding: 12px;
                background: rgba(108, 92, 231, 0.1);
                border: 1px solid rgba(108, 92, 231, 0.3);
                color: var(--light-color);
                border-radius: 10px;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 10px;
                font-size: 1rem;
                transition: all 0.3s ease;
            }
            
            .contact-option:hover {
                background: rgba(108, 92, 231, 0.2);
                transform: translateY(-2px);
            }
            
            .modal-note {
                font-size: 0.9rem;
                color: var(--gray-color);
                font-style: italic;
                text-align: center;
            }
            
            .modal-footer {
                padding: 20px;
                border-top: 1px solid rgba(255, 255, 255, 0.1);
                display: flex;
                gap: 10px;
            }
            
            .modal-btn {
                flex: 1;
                padding: 12px;
                border: none;
                border-radius: 10px;
                font-size: 1rem;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            
            .modal-btn.secondary {
                background: rgba(255, 255, 255, 0.1);
                color: var(--light-color);
            }
            
            .modal-btn.primary {
                background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
                color: white;
            }
            
            .modal-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            }
        `;
        
        document.head.appendChild(style);
        document.body.appendChild(modal);
        
        // Event listeners untuk modal
        modal.querySelector('.modal-close').addEventListener('click', () => {
            document.body.removeChild(modal);
            document.head.removeChild(style);
        });
        
        modal.querySelector('.modal-btn.secondary').addEventListener('click', () => {
            document.body.removeChild(modal);
            document.head.removeChild(style);
        });
        
        modal.querySelector('.modal-btn.primary').addEventListener('click', () => {
            document.body.removeChild(modal);
            document.head.removeChild(style);
            goToSlide(11); // Slide kontak
            
            setTimeout(() => {
                document.querySelector('.contact-form').scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'center'
                });
            }, 500);
        });
        
        // Contact option buttons
        modal.querySelectorAll('.contact-option').forEach(button => {
            button.addEventListener('click', () => {
                const method = button.getAttribute('data-method');
                let message = '';
                
                switch(method) {
                    case 'whatsapp':
                        message = `Halo, saya tertarik dengan paket ${plan} untuk desain UI/UX gim. Bisa dibantu?`;
                        window.open(`https://wa.me/6281234567890?text=${encodeURIComponent(message)}`, '_blank');
                        break;
                    case 'email':
                        message = `Subject: Konsultasi Paket ${plan} - Desain UI/UX Gim`;
                        window.location.href = `mailto:hello@gameuxstudio.id?subject=${encodeURIComponent(`Konsultasi Paket ${plan}`)}`;
                        break;
                    case 'call':
                        window.location.href = 'tel:+6281234567890';
                        break;
                }
                
                document.body.removeChild(modal);
                document.head.removeChild(style);
            });
        });
        
        // Close modal saat klik di luar konten
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
                document.head.removeChild(style);
            }
        });
    }
    
    // Fungsi navigasi slide
    function goToPrevSlide() {
        if (currentSlideIndex > 0) {
            currentSlideIndex--;
            updateSlideDisplay();
            
            // Trigger custom event
            document.dispatchEvent(new CustomEvent('slideChange', {
                detail: { previous: currentSlideIndex + 1, current: currentSlideIndex }
            }));
        }
    }
    
    function goToNextSlide() {
        if (currentSlideIndex < totalSlides - 1) {
            currentSlideIndex++;
            updateSlideDisplay();
            
            // Trigger custom event
            document.dispatchEvent(new CustomEvent('slideChange', {
                detail: { previous: currentSlideIndex - 1, current: currentSlideIndex }
            }));
        }
    }
    
    function goToSlide(index) {
        if (index >= 0 && index < totalSlides) {
            const previousIndex = currentSlideIndex;
            currentSlideIndex = index;
            updateSlideDisplay();
            
            // Trigger custom event
            document.dispatchEvent(new CustomEvent('slideChange', {
                detail: { previous: previousIndex, current: currentSlideIndex }
            }));
        }
    }
    
    // Auto-advance untuk presentasi (opsional)
    let autoAdvanceInterval;
    
    function startAutoAdvance(interval = 10000) {
        autoAdvanceInterval = setInterval(() => {
            if (currentSlideIndex < totalSlides - 1) {
                goToNextSlide();
            } else {
                clearInterval(autoAdvanceInterval);
            }
        }, interval);
    }
    
    function stopAutoAdvance() {
        if (autoAdvanceInterval) {
            clearInterval(autoAdvanceInterval);
            autoAdvanceInterval = null;
        }
    }
    
    // Opsional: Aktifkan auto-advance setelah 30 detik tidak ada aktivitas
    let activityTimeout;
    
    function resetActivityTimer() {
        clearTimeout(activityTimeout);
        stopAutoAdvance();
        
        // Mulai auto-advance setelah 30 detik tidak ada aktivitas
        activityTimeout = setTimeout(() => {
            startAutoAdvance(8000); // Ganti slide setiap 8 detik
        }, 30000);
    }
    
    // Reset timer aktivitas saat ada interaksi
    document.addEventListener('click', resetActivityTimer);
    document.addEventListener('keydown', resetActivityTimer);
    document.addEventListener('touchstart', resetActivityTimer);
    
    // Mulai timer aktivitas
    resetActivityTimer();
    
    // Detect device orientation changes
    window.addEventListener('orientationchange', () => {
        // Tambahkan delay untuk memastikan orientasi sudah berubah
        setTimeout(() => {
            // Scroll ke atas untuk memastikan konten terlihat
            document.querySelector('.presentation-area').scrollTop = 0;
        }, 300);
    });
    
    // Add visual feedback for interactive elements
    const interactiveElements = document.querySelectorAll('.team-member, .service-card, .advantage-card, .portfolio-item');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(0) scale(0.98)';
        });
        
        element.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(-8px) scale(1)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Initialize with first slide active
    updateSlideDisplay();
    
    // Log untuk debugging
    console.log('Presentasi Jasa Desainer UI/UX untuk Gim telah dimuat!');
    console.log(`Total slide: ${totalSlides}`);
    console.log('Navigasi: Gunakan tombol panah, spasi, atau klik pada navigasi sidebar');
});