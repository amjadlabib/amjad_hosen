// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Particles.js
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: "#00f3ff"
                },
                shape: {
                    type: "circle",
                    stroke: {
                        width: 0,
                        color: "#000000"
                    }
                },
                opacity: {
                    value: 0.5,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 2,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#00f3ff",
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: {
                        enable: true,
                        mode: "grab"
                    },
                    onclick: {
                        enable: true,
                        mode: "push"
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 200,
                        line_linked: {
                            opacity: 0.5
                        }
                    },
                    push: {
                        particles_nb: 4
                    }
                }
            },
            retina_detect: true
        });
    }

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking a link
    document.querySelectorAll('.neon-link').forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });

    // Theme Toggle
    const themeSwitch = document.getElementById('theme-switch');
    const body = document.body;
    
    if (themeSwitch) {
        // Check for saved theme or prefer-color-scheme
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
        const currentTheme = localStorage.getItem('theme');
        
        if (currentTheme === 'light' || (!currentTheme && !prefersDarkScheme.matches)) {
            themeSwitch.checked = true;
            setLightTheme();
        }
        
        themeSwitch.addEventListener('change', function() {
            if (this.checked) {
                setLightTheme();
                localStorage.setItem('theme', 'light');
            } else {
                setDarkTheme();
                localStorage.setItem('theme', 'dark');
            }
        });
    }

    function setLightTheme() {
        body.style.setProperty('--bg-dark', '#f0f0f0');
        body.style.setProperty('--bg-darker', '#e0e0e0');
        body.style.setProperty('--bg-card', 'rgba(255, 255, 255, 0.9)');
        body.style.setProperty('--text-primary', '#333333');
        body.style.setProperty('--text-secondary', '#666666');
        body.style.setProperty('--text-muted', '#999999');
        
        // Update grid overlay
        document.querySelector('.grid-overlay').style.backgroundImage = 
            'linear-gradient(rgba(0, 243, 255, 0.1) 1px, transparent 1px), ' +
            'linear-gradient(90deg, rgba(0, 243, 255, 0.1) 1px, transparent 1px)';
    }

    function setDarkTheme() {
        body.style.setProperty('--bg-dark', '#0a0a0f');
        body.style.setProperty('--bg-darker', '#050508');
        body.style.setProperty('--bg-card', 'rgba(10, 10, 15, 0.8)');
        body.style.setProperty('--text-primary', '#ffffff');
        body.style.setProperty('--text-secondary', '#b0b0b0');
        body.style.setProperty('--text-muted', '#666666');
        
        // Update grid overlay
        document.querySelector('.grid-overlay').style.backgroundImage = 
            'linear-gradient(rgba(0, 243, 255, 0.05) 1px, transparent 1px), ' +
            'linear-gradient(90deg, rgba(0, 243, 255, 0.05) 1px, transparent 1px)';
    }

    // Animate skill bars on scroll
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const animateSkills = () => {
        skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width') + '%';
            bar.style.width = width;
        });
    };

    // Intersection Observer for skill bars
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkills();
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const skillsSection = document.querySelector('.skills');
    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }

    // Back to Top Button
    const backToTop = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
        
        // Header scroll effect
        const header = document.querySelector('.neon-header');
        if (window.scrollY > 100) {
            header.style.backgroundColor = 'rgba(10, 10, 15, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.backgroundColor = 'rgba(10, 10, 15, 0.9)';
            header.style.backdropFilter = 'blur(10px)';
        }
    });

    // Form submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            // In a real application, you would send this data to a server
            // For now, we'll just show a success message
            
            // Create a cool notification
            showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            
            // Reset form
            this.reset();
            
            // Add some animation to the submit button
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-check"></i> SENT!';
            submitBtn.style.backgroundColor = 'var(--neon-green)';
            submitBtn.style.borderColor = 'var(--neon-green)';
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.backgroundColor = '';
                submitBtn.style.borderColor = '';
            }, 2000);
        });
    }

    // Notification system
    function showNotification(message, type) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
                <span>${message}</span>
            </div>
            <button class="notification-close"><i class="fas fa-times"></i></button>
        `;
        
        // Add styles for notification
        const style = document.createElement('style');
        style.textContent = `
            .notification {
                position: fixed;
                top: 100px;
                right: 20px;
                background: var(--bg-card);
                border: 1px solid var(--neon-blue);
                border-radius: 10px;
                padding: 15px 20px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 15px;
                min-width: 300px;
                max-width: 400px;
                transform: translateX(400px);
                transition: transform 0.3s ease;
                z-index: 9999;
                box-shadow: var(--border-glow);
            }
            .notification.success {
                border-color: var(--neon-green);
            }
            .notification.error {
                border-color: var(--neon-pink);
            }
            .notification-content {
                display: flex;
                align-items: center;
                gap: 10px;
                color: var(--text-primary);
            }
            .notification-content i {
                font-size: 1.2rem;
            }
            .notification.success .notification-content i {
                color: var(--neon-green);
            }
            .notification.error .notification-content i {
                color: var(--neon-pink);
            }
            .notification-close {
                background: transparent;
                border: none;
                color: var(--text-secondary);
                cursor: pointer;
                font-size: 1rem;
                transition: var(--transition-fast);
            }
            .notification-close:hover {
                color: var(--neon-blue);
            }
        `;
        document.head.appendChild(style);
        
        // Add to page
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 10);
        
        // Close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', function() {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                notification.remove();
                style.remove();
            }, 300);
        });
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.transform = 'translateX(400px)';
                setTimeout(() => {
                    notification.remove();
                    style.remove();
                }, 300);
            }
        }, 5000);
    }

    // Add hover effect to all cards
    const cards = document.querySelectorAll('.about-card, .skill-card, .project-card, .contact-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 0 20px var(--neon-blue), 0 0 40px var(--neon-blue)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '';
        });
    });

    // Add typing effect to terminal
    const typewriterText = "I make responsive websites with neon aesthetics.";
    const typewriterElement = document.getElementById('typewriter');
    
    if (typewriterElement) {
        let i = 0;
        const typeWriter = () => {
            if (i < typewriterText.length) {
                typewriterElement.textContent += typewriterText.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        
        // Start typing after a short delay
        setTimeout(typeWriter, 1000);
    }

    // Add parallax effect to background
    window.addEventListener('mousemove', function(e) {
        const x = (e.clientX / window.innerWidth) * 20 - 10;
        const y = (e.clientY / window.innerHeight) * 20 - 10;
        
        document.querySelector('.grid-overlay').style.transform = 
            `translate(${x}px, ${y}px)`;
    });

    // Add ripple effect to buttons
    document.querySelectorAll('.neon-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(0, 243, 255, 0.3);
                transform: scale(0);
                animation: ripple-animation 0.6s linear;
                width: ${size}px;
                height: ${size}px;
                top: ${y}px;
                left: ${x}px;
                pointer-events: none;
            `;
            
            // Add ripple animation styles
            const style = document.createElement('style');
            style.textContent = `
                @keyframes ripple-animation {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
                style.remove();
            }, 600);
        });
    });

    // Add scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe all sections and cards
    document.querySelectorAll('.section, .about-card, .skill-card, .project-card').forEach(el => {
        observer.observe(el);
    });

    // Add CSS for animations
    const animationStyles = document.createElement('style');
    animationStyles.textContent = `
        .animate-in {
            animation: fadeInUp 0.8s ease-out forwards;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .about-card, .skill-card, .project-card {
            opacity: 0;
        }
    `;
    document.head.appendChild(animationStyles);

    // Initialize with a cool loading animation
    window.addEventListener('load', function() {
        // Remove any loading state
        document.body.classList.add('loaded');
        
        // Add loaded class for animations
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });
});