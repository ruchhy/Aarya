document.addEventListener('DOMContentLoaded', () => {
    
    // --- Header Scroll State ---
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- Intersection Observer for Scroll Reveals ---
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
                // Option: Stop observing once revealed
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.05,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // --- Parallax Effect on Scroll ---
    const parallaxImage = document.querySelector('.parallax-img');
    if (parallaxImage) {
        window.addEventListener('scroll', () => {
            const scrollPos = window.scrollY;
            const elementTop = parallaxImage.parentElement.getBoundingClientRect().top + scrollPos;
            const elementHeight = parallaxImage.parentElement.clientHeight;
            const windowHeight = window.innerHeight;
            
            // Check if element is in viewport
            if (scrollPos + windowHeight > elementTop && scrollPos < elementTop + elementHeight) {
                const visibleScroll = (scrollPos + windowHeight - elementTop) / (windowHeight + elementHeight);
                // Shift image up/down slightly
                const translateY = (visibleScroll - 0.5) * 40; // max shift 20px
                parallaxImage.style.transform = `scale(1.1) translateY(${translateY}px)`;
            }
        });
    }

    // --- Horizontal Scrolling Gallery Interactions ---
    const galleryScroll = document.querySelector('.horizontal-scroll-container');
    const galleryItems = document.querySelectorAll('.gallery-item img');

    if (galleryScroll) {
        galleryScroll.addEventListener('scroll', () => {
            const containerWidth = galleryScroll.clientWidth;
            const scrollLeft = galleryScroll.scrollLeft;

            galleryItems.forEach(img => {
                const rect = img.getBoundingClientRect();
                const elementCenter = rect.left + rect.width / 2;
                const containerCenter = containerWidth / 2;
                const distanceFromCenter = Math.abs(elementCenter - containerCenter);
                
                // Scale calculations (subtle shift from 1.0 to 1.06)
                const maxDistance = containerWidth;
                const ratio = Math.min(distanceFromCenter / maxDistance, 1);
                const scale = 1.06 - (ratio * 0.06);
                
                img.style.transform = `scale(${scale})`;
            });
        });
        
        // Trigger initial calculation
        galleryScroll.dispatchEvent(new Event('scroll'));
    }

    // --- Timeline Navigation (Section 5) ---
    const timelineButtons = document.querySelectorAll('.timeline-btn');
    const timelineSlides = document.querySelectorAll('.timeline-slide');
    let autoPlayInterval;

    function selectTimelineSlide(index) {
        timelineButtons.forEach(btn => btn.classList.remove('active'));
        timelineSlides.forEach(slide => slide.classList.remove('active'));

        timelineButtons[index].classList.add('active');
        timelineSlides[index].classList.add('active');
    }

    timelineButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            clearInterval(autoPlayInterval); // Stop autoplay once user interacts
            const targetIndex = parseInt(e.target.getAttribute('data-index'));
            selectTimelineSlide(targetIndex);
        });
    });

    // Auto-advance timeline slide every 5 seconds for ambient storytelling
    let currentSlide = 0;
    function startAutoplay() {
        autoPlayInterval = setInterval(() => {
            currentSlide = (currentSlide + 1) % timelineSlides.length;
            selectTimelineSlide(currentSlide);
        }, 5000);
    }
    
    startAutoplay();

    // --- Smooth CTA Fade-up on scroll for Section 1 Title ---
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroCtas = document.querySelector('.hero-ctas');

    const handleHeroScroll = () => {
        const scrollY = window.scrollY;
        const fadeValue = Math.max(1 - scrollY / 500, 0);
        const transformValue = - (scrollY * 0.15); // moves up gently

        if (heroTitle && heroSubtitle && heroCtas) {
            heroTitle.style.opacity = fadeValue;
            heroTitle.style.transform = `translateY(${transformValue}px)`;
            
            heroSubtitle.style.opacity = fadeValue;
            heroSubtitle.style.transform = `translateY(${transformValue}px)`;
            
            heroCtas.style.opacity = fadeValue;
            heroCtas.style.transform = `translateY(${transformValue}px)`;
        }
    };

    window.addEventListener('scroll', handleHeroScroll);
    // Initialize hero elements styling immediately on page load
    handleHeroScroll();

});
