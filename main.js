document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const columns = document.querySelectorAll('.feature-column');
    
    // 1. Remove the translateY transformation that's causing problems
    // sections.forEach((section, index) => {
    //     section.style.transform = `translateY(${index * 100}%)`;
    // });

    // 2. Create a better scroll implementation
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            // Add visual effects based on scroll position if needed
            if (scrollPosition >= sectionTop - window.innerHeight/2 && 
                scrollPosition < sectionTop + sectionHeight - window.innerHeight/2) {
                section.classList.add('active-section');
            } else {
                section.classList.remove('active-section');
            }
        });
    });

    // 3. Enhanced fade-in effect for feature columns
    const fadeInElements = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add a slight delay for a cascading effect
                setTimeout(() => {
                    entry.target.style.opacity = 1;
                    entry.target.style.transform = 'translateY(0)';
                }, 150);
                observer.unobserve(entry.target);
            }
        });
    };
    
    // Create an improved observer with better threshold
    const observer = new IntersectionObserver(fadeInElements, {
        root: null,
        rootMargin: '0px 0px -100px 0px',  // Start animation a bit earlier
        threshold: 0.1  // Trigger with just 10% visibility
    });
    
    // Apply initial styles and observe
    columns.forEach(column => {
        // Set initial styles
        column.style.opacity = 0;
        column.style.transform = 'translateY(40px)'; // Slightly more movement
        column.style.transition = 'opacity 1s ease, transform 1s ease';
        observer.observe(column);
    });

    // Benefits container functionality
    const container = document.getElementById('benefitsContainer');
    const dots = document.querySelectorAll('.dot');
    const slides = document.querySelectorAll('.benefit-slide');
    const pupil = document.querySelector('.pupil');
    const eyeOuter = document.querySelector('.eye-outer');
    
    // Color mapping for elements based on slides
    const slideColors = {
        0: "#FFCC80", // yellow
        1: "#FF8A65", // coral
        2: "#D1C4E9", // lavender
        3: "#81D4FA", // blue
        4: "#B39DDB"  // purple
    };
    
    if (container) {
        // Update active dot and colors based on scroll position
        container.addEventListener('scroll', () => {
            const scrollPosition = container.scrollTop;
            const windowHeight = window.innerHeight;
            
            // Find which slide is most visible
            let activeIndex = 0;
            slides.forEach((slide, index) => {
                const slideTop = slide.offsetTop;
                const slideHeight = slide.offsetHeight;
                const slideCenter = slideTop + (slideHeight / 2);
                const viewportCenter = scrollPosition + (windowHeight / 2);
                
                if (Math.abs(slideCenter - viewportCenter) < windowHeight / 3) {
                    activeIndex = index;
                }
            });
            
            // Update active dot
            dots.forEach((dot, index) => {
                if (index === activeIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
            
            // Update active slide class for stack effect
            slides.forEach((slide, index) => {
                if (index === activeIndex) {
                    slide.classList.add('active');
                } else {
                    slide.classList.remove('active');
                }
            });
            
            // Update pupil and outer eye circle color with smooth transitions
            if (pupil && eyeOuter) {
                // Add CSS transition if not already present
                if (!pupil.style.transition) {
                    pupil.style.transition = 'fill 0.6s ease-in-out';
                    eyeOuter.style.transition = 'fill 0.6s ease-in-out';
                }
                
                // Apply the new color
                pupil.setAttribute('fill', slideColors[activeIndex]);
                eyeOuter.setAttribute('fill', slideColors[activeIndex]);
            }
        });
    }

    // JavaScript for Soch landing page

    document.addEventListener('DOMContentLoaded', function() {
        const fixedElements = document.querySelector('.fixed-elements');
        const benefitsContainer = document.getElementById('benefitsContainer');
        const navDots = document.querySelectorAll('.nav-dots .dot');
        
        let currentSlideIndex = 0;
        const slideCount = document.querySelectorAll('.benefit-slide').length;
        const slideWidth = benefitsContainer.querySelector('.benefit-slide').offsetWidth;
        
        // Prevent vertical scrolling and enable horizontal scrolling on the fixed element
        fixedElements.addEventListener('wheel', function(event) {
            event.preventDefault(); // Prevent default vertical scrolling
            
            // Determine scroll direction
            if (event.deltaY > 0) {
                // Scroll right - next slide
                if (currentSlideIndex < slideCount - 1) {
                    currentSlideIndex++;
                    updateSlides();
                }
            } else {
                // Scroll left - previous slide
                if (currentSlideIndex > 0) {
                    currentSlideIndex--;
                    updateSlides();
                }
            }
        }, { passive: false });
        
        // Update slide position and active dot
        function updateSlides() {
            // Scroll the container
            benefitsContainer.scrollTo({
                left: currentSlideIndex * slideWidth,
                behavior: 'smooth'
            });
            
            // Update navigation dots
            navDots.forEach((dot, index) => {
                if (index === currentSlideIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
            
            // Optional: Update eye animation based on current slide
            animateEye();
        }
        
        // Optional: Animate the eye based on current slide position
        function animateEye() {
            const pupil = document.querySelector('.pupil');
            const eyeOuter = document.querySelector('.eye-outer');
            
            // Example animation - move pupil based on current slide
            const position = (currentSlideIndex / (slideCount - 1)) * 30 - 15; // Range from -15px to +15px
            pupil.style.transform = `translateX(${position}px)`;
            
            // You could also change colors or other properties based on current slide
            // For example, matching the eye color to the current slide background
            const colors = ['#FFCC80', '#FF9E80', '#E1BEE7', '#90CAF9', '#B39DDB'];
            eyeOuter.style.fill = colors[currentSlideIndex];
        }
        
        // Make navigation dots clickable
        navDots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                currentSlideIndex = index;
                updateSlides();
            });
        });
        
        // Initialize first slide
        updateSlides();
    });
});