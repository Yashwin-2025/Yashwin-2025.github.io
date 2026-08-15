document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // THEME SWITCHER (DARK / LIGHT MODE)
    // ==========================================
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Check localStorage for saved theme, default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    
    if (savedTheme === 'light') {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
    } else {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
    }

    themeToggle.addEventListener('click', () => {
        if (body.classList.contains('dark-theme')) {
            body.classList.remove('dark-theme');
            body.classList.add('light-theme');
            localStorage.setItem('theme', 'light');
        } else {
            body.classList.remove('light-theme');
            body.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark');
        }
    });

    // ==========================================
    // TERMINAL TYPEWRITER EFFECT
    // ==========================================
    const nameEl = document.getElementById('typewriter-name');
    const roleEl = document.getElementById('typewriter-role');
    
    const nameText = "Yashwin S";
    const rolesList = [
        "AI & Backend Engineer",
        "Software Engineer - AI",
        "RAG & Backend Developer"
    ];
    
    let nameIdx = 0;
    let roleIdx = 0;
    let rolesListIdx = 0;
    let isDeleting = false;
    
    function typeName() {
        if (nameEl && nameIdx < nameText.length) {
            nameEl.textContent += nameText.charAt(nameIdx);
            nameIdx++;
            setTimeout(typeName, 120);
        } else {
            // Remove blinking animation from name cursor
            const nameCursor = document.querySelector('.type-cursor');
            if (nameCursor) nameCursor.style.animation = 'none';
            setTimeout(typeRoles, 500);
        }
    }
    
    function typeRoles() {
        if (!roleEl) return;
        const currentRole = rolesList[rolesListIdx];
        
        if (isDeleting) {
            roleEl.textContent = currentRole.substring(0, roleIdx - 1);
            roleIdx--;
        } else {
            roleEl.textContent = currentRole.substring(0, roleIdx + 1);
            roleIdx++;
        }
        
        let typeSpeed = isDeleting ? 40 : 80;
        
        if (!isDeleting && roleIdx === currentRole.length) {
            typeSpeed = 2000; // Pause at the end of typing
            isDeleting = true;
        } else if (isDeleting && roleIdx === 0) {
            isDeleting = false;
            rolesListIdx = (rolesListIdx + 1) % rolesList.length;
            typeSpeed = 500; // pause before next role
        }
        
        setTimeout(typeRoles, typeSpeed);
    }
    
    if (nameEl && roleEl) {
        setTimeout(typeName, 800);
    }

    // ==========================================
    // MOBILE NAVIGATION TOGGLE
    // ==========================================
    const mobileNavToggle = document.getElementById('mobile-nav-toggle');
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');

    mobileNavToggle.addEventListener('click', () => {
        mobileNavToggle.classList.toggle('active');
        navbar.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileNavToggle.classList.remove('active');
            navbar.classList.remove('active');
        });
    });

    // ==========================================
    // SCROLL ACTIONS (HEADER HEIGHT & SHADOW)
    // ==========================================
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // ==========================================
    // SCROLL REVEAL ANIMATION (INTERSECTION OBSERVER)
    // ==========================================
    // Add reveal class to sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.add('reveal');
    });

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Reveal only once
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    sections.forEach(section => {
        revealObserver.observe(section);
    });

    // ==========================================
    // ACTIVE NAVIGATION LINKS HIGHLIGHT
    // ==========================================
    const activeNavObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '-80px 0px -50% 0px'
    });

    sections.forEach(section => {
        activeNavObserver.observe(section);
    });

    // ==========================================
    // SKILLS FILTERING
    // ==========================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const skillCards = document.querySelectorAll('.skill-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            skillCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'flex';
                    // Trigger reflow for animation
                    void card.offsetWidth;
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    // Hide after transition
                    setTimeout(() => {
                        if (button.getAttribute('data-filter') !== 'all' && category !== filterValue) {
                            card.style.display = 'none';
                        }
                    }, 200);
                }
            });
        });
    });

    // ==========================================
    // TIMELINE EXPANSION (COLLAPSIBLE DETAILS)
    // ==========================================
    const expandButtons = document.querySelectorAll('.expand-timeline-btn');

    expandButtons.forEach(button => {
        button.addEventListener('click', () => {
            const details = button.nextElementSibling;
            button.classList.toggle('active');
            details.classList.toggle('open');
            
            if (details.classList.contains('open')) {
                button.innerHTML = `Hide Details <i class="fa-solid fa-chevron-up"></i>`;
            } else {
                button.innerHTML = `View Details <i class="fa-solid fa-chevron-down"></i>`;
            }
        });
    });

    // ==========================================
    // CONTACT FORM SUBMISSION HANDLER
    // ==========================================
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const submitBtn = document.getElementById('form-submit');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Disable submit button & show loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = `Sending... <i class="fa-solid fa-spinner fa-spin"></i>`;
            
            const formData = new FormData(contactForm);
            const formObj = Object.fromEntries(formData.entries());
            
            // Since this is a static webpage (github.io), we will mock the submission.
            // In production, the user can hook this up to Formspree, Netlify Forms, Web3Forms, etc.
            setTimeout(() => {
                formStatus.className = 'form-status success';
                formStatus.innerText = 'Thank you! Your message has been sent successfully (Mock mode).';
                
                // Reset form
                contactForm.reset();
                
                // Restore button
                submitBtn.disabled = false;
                submitBtn.innerHTML = `Send Message <i class="fa-solid fa-paper-plane"></i>`;
                
                // Hide status message after 5 seconds
                setTimeout(() => {
                    formStatus.style.display = 'none';
                }, 5000);
            }, 1500);
        });
    }

    // ==========================================
    // REDESIGN LOGIC IMPLEMENTATIONS (vinothkanna features)
    // ==========================================

    // Ensure body scroll is unlocked on page load
    document.body.style.overflow = '';

    // 2. Custom Inertia Mouse Cursor
    const customCursor = document.getElementById('custom-cursor');
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    
    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function updateCursor() {
        const dx = mouseX - cursorX;
        const dy = mouseY - cursorY;
        
        cursorX += dx * 0.15;
        cursorY += dy * 0.15;
        
        if (customCursor) {
            customCursor.style.left = `${cursorX}px`;
            customCursor.style.top = `${cursorY}px`;
        }
        
        requestAnimationFrame(updateCursor);
    }
    
    if (window.innerWidth > 991 && customCursor) {
        requestAnimationFrame(updateCursor);
        
        // Add hover effects for interactive elements
        const hoverSelector = 'a, button, .expand-timeline-btn, .expertise__item, input, textarea, .theme-toggle';
        const attachCursorHoverListeners = () => {
            const hoverElements = document.querySelectorAll(hoverSelector);
            hoverElements.forEach(el => {
                // Prevent duplicate listeners
                if (!el.dataset.cursorBound) {
                    el.addEventListener('mouseenter', () => customCursor.classList.add('active'));
                    el.addEventListener('mouseleave', () => customCursor.classList.remove('active'));
                    el.dataset.cursorBound = 'true';
                }
            });
        };
        
        attachCursorHoverListeners();
        // Re-attach if elements are filtered or dynamically shown
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => btn.addEventListener('click', () => {
            setTimeout(attachCursorHoverListeners, 300);
        }));
    }



    // 4. Timeline Progress scroll bar
    const progressBars = document.querySelectorAll('.timeline_progress-bar');
    const timelineItems = document.querySelectorAll('.timeline_item');
    
    function updateTimelineProgress() {
        progressBars.forEach(bar => {
            const component = bar.closest('.timeline_component');
            if (!component) return;
            
            const rect = component.getBoundingClientRect();
            const viewHeight = window.innerHeight;
            const startOffset = viewHeight * 0.55;
            const currentProgress = startOffset - rect.top;
            
            let percent = (currentProgress / rect.height) * 100;
            percent = Math.min(100, Math.max(0, percent));
            bar.style.height = `${percent}%`;
        });
        
        timelineItems.forEach(item => {
            const rect = item.getBoundingClientRect();
            const midPoint = window.innerHeight * 0.55;
            if (rect.top < midPoint) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateTimelineProgress);
    window.addEventListener('resize', updateTimelineProgress);
    setTimeout(updateTimelineProgress, 200);
});
