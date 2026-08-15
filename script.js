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

    // ==========================================
    // CASE STUDY MODAL SYSTEM
    // ==========================================
    const caseModal = document.getElementById('case-study-modal');
    const modalBody = document.getElementById('modal-body');
    const modalCloseBtn = document.getElementById('modal-close-btn');

    const caseStudiesData = {
        "pothole-detection": {
            title: "Pothole Detection & Monocular Depth Estimation",
            label: "Peer-Reviewed Paper · Springer ACN'23",
            oneLiner: "Automated road hazard detection and monocular depth estimation pipeline evaluated on challenging Indian road conditions.",
            overview: "Engineered an automated road hazard detection and depth profiling system to enhance road safety and vehicle telemetry. The research combined state-of-the-art computer vision models (YOLOv5 and EfficientDet) with monocular depth estimation algorithms (MiDaS) to detect road surface irregularities and estimate relative severity in real time.",
            problem: "Automated road condition monitoring on Indian roadways suffers from severe visual noise, including extreme lighting variations, harsh tree shadows, complex pavement textures, and unstandardized road geometries, making standard depth sensors expensive and fragile.",
            architecture: `
                <div class="modal-arch-container">
                    <div class="m-arch-title"><i class="fa-solid fa-sitemap"></i> High-Level Computer Vision Pipeline</div>
                    <div class="m-arch-flow">
                        <div class="m-node"><i class="fa-solid fa-video"></i><span>1. Video Stream</span></div>
                        <div class="m-arrow"><i class="fa-solid fa-arrow-right"></i></div>
                        <div class="m-node highlight"><i class="fa-solid fa-object-ungroup"></i><span>2. YOLOv5 / EfficientDet</span></div>
                        <div class="m-arrow"><i class="fa-solid fa-arrow-right"></i></div>
                        <div class="m-node highlight"><i class="fa-solid fa-layer-group"></i><span>3. MiDaS Depth</span></div>
                        <div class="m-arrow"><i class="fa-solid fa-arrow-right"></i></div>
                        <div class="m-node"><i class="fa-solid fa-map-location-dot"></i><span>4. Hazard Profiling</span></div>
                    </div>
                </div>
            `,
            myContribution: "Curated and annotated a comprehensive dataset of 11,800 images and 364 video sequences across 6 classes of Indian road conditions (52,568 instances). Trained and tuned YOLOv5 and EfficientDet object detection architectures, integrated MiDaS monocular depth estimation, and co-authored the research paper published in Springer ACN'23.",
            challenges: "Mitigating false positives caused by sharp asphalt shadows, balancing inference throughput for real-time video frames, and calculating relative hazard depth without active LiDAR sensors.",
            outcome: "Achieved 80% detection accuracy on unseen test road footage and successfully published the findings in the Springer Advances in Computer Networks (ACN'23) proceedings.",
            techStack: ["Python", "YOLO v5", "EfficientDet", "MiDaS Depth", "PyTorch", "OpenCV", "Roboflow"]
        },
        "llm-ca-rag": {
            title: "Enhancing LLMs with CA Knowledge (Domain RAG)",
            label: "Peer-Reviewed Paper · IEEE ICASET 2025",
            oneLiner: "Specialized domain RAG framework evaluating Llama2 on chartered accountancy and taxation textbooks.",
            overview: "Researched and implemented a specialized Retrieval-Augmented Generation (RAG) framework designed to enhance open-source Large Language Models (Llama2) with domain-specific statutory accounting and taxation knowledge from ICAI Foundation textbooks.",
            problem: "General-purpose foundation models frequently hallucinate or generate legally conflicting answers when queried on dense, localized accounting standards, multi-clause tax statutory definitions, and strict financial calculations.",
            architecture: `
                <div class="modal-arch-container">
                    <div class="m-arch-title"><i class="fa-solid fa-sitemap"></i> High-Level Domain RAG Architecture</div>
                    <div class="m-arch-flow">
                        <div class="m-node"><i class="fa-solid fa-book"></i><span>1. ICAI Textbooks</span></div>
                        <div class="m-arrow"><i class="fa-solid fa-arrow-right"></i></div>
                        <div class="m-node highlight"><i class="fa-solid fa-scissors"></i><span>2. Semantic Chunking</span></div>
                        <div class="m-arrow"><i class="fa-solid fa-arrow-right"></i></div>
                        <div class="m-node highlight"><i class="fa-solid fa-database"></i><span>3. Vector Index</span></div>
                        <div class="m-arrow"><i class="fa-solid fa-arrow-right"></i></div>
                        <div class="m-node"><i class="fa-solid fa-brain"></i><span>4. Llama2 Generator</span></div>
                        <div class="m-arrow"><i class="fa-solid fa-arrow-right"></i></div>
                        <div class="m-node highlight"><i class="fa-solid fa-check-double"></i><span>5. Verifiable QA</span></div>
                    </div>
                </div>
            `,
            myContribution: "Structured and preprocessed ICAI Chartered Accountancy textbook corpora; implemented dense semantic embeddings, vector database similarity search, and prompt synthesis pipelines on Llama2; evaluated factual accuracy and published in IEEE ICASET 2025.",
            challenges: "Preserving the structural integrity of dense financial balance sheets and multi-section statutory taxation clauses during document chunking without fragmenting semantic meaning.",
            outcome: "Demonstrated superior factual accuracy over baseline zero-shot models on domain QA benchmarks and published in IEEE ICASET 2025.",
            techStack: ["Python", "Llama2", "RAG", "Vector DB", "Sentence-Transformers", "FastAPI", "PyTorch"]
        },
        "smart-miner-helmet": {
            title: "Smart Helmet for Underground Mining Safety",
            label: "IoT & Edge ML · PES University Capstone",
            oneLiner: "Microcontroller-based protective helmet integrating toxic gas sensors, IMU motion telemetry, and real-time cloud hazard alerts.",
            overview: "Developed an IoT-enabled smart safety helmet designed to safeguard underground mine workers by continuously monitoring environmental air toxicity and detecting sudden physical falls or collisions in hazardous subterranean tunnels.",
            problem: "Underground mining environments present life-threatening hazards including undetected toxic gas leaks (CO, methane), oxygen depletion, and physical disorientation, where conventional wired safety systems fail to provide real-time location and physiological alerts.",
            architecture: `
                <div class="modal-arch-container">
                    <div class="m-arch-title"><i class="fa-solid fa-sitemap"></i> IoT Telemetry & Alerting Architecture</div>
                    <div class="m-arch-flow">
                        <div class="m-node"><i class="fa-solid fa-head-side-mask"></i><span>1. Gas & IMU Sensors</span></div>
                        <div class="m-arrow"><i class="fa-solid fa-arrow-right"></i></div>
                        <div class="m-node highlight"><i class="fa-solid fa-microchip"></i><span>2. ESP32 Edge Logic</span></div>
                        <div class="m-arrow"><i class="fa-solid fa-arrow-right"></i></div>
                        <div class="m-node"><i class="fa-solid fa-cloud-arrow-up"></i><span>3. Firebase / ThingSpeak</span></div>
                        <div class="m-arrow"><i class="fa-solid fa-arrow-right"></i></div>
                        <div class="m-node highlight"><i class="fa-solid fa-triangle-exclamation"></i><span>4. Live Alert Dashboard</span></div>
                    </div>
                </div>
            `,
            myContribution: "Co-designed the hardware circuit and firmware logic on the ESP32 microcontroller; integrated gas sensors (MQ series) and 6-axis IMU accelerometer sensors; programmed fall detection thresholds and established real-time WiFi/cloud telemetry streaming to Firebase and ThingSpeak.",
            challenges: "Calibrating gas sensor baseline thresholds under high-humidity environments and optimizing microcontroller battery power consumption for extended field shifts.",
            outcome: "Delivered a working hardware prototype capable of streaming sub-second sensor telemetry and triggering instant auditory and supervisor dashboard alerts during threshold violations.",
            techStack: ["C++", "ESP32", "Firebase", "ThingSpeak", "Edge ML", "IoT Sensors", "Microcontroller"]
        },
        "datacenter-digital-twin": {
            title: "Data Center Digital Twin (Thermal & Heat Flow)",
            label: "Digital Twin & Simulation · PES University",
            oneLiner: "Interactive 3D simulation room in Unity 3D visualizing server rack airflow dynamics and spatial thermal dissipation.",
            overview: "Created a real-time 3D digital twin of an enterprise data center facility, simulating thermal dissipation, server rack hotspot formation, and airflow cooling dynamics to optimize energy efficiency and cooling layout design.",
            problem: "Data center server rooms expend massive energy on cooling infrastructure. Predicting hotspot emergence and airflow recirculation requires costly computational fluid dynamics (CFD) setups that lack interactive real-time visual feedback.",
            architecture: `
                <div class="modal-arch-container">
                    <div class="m-arch-title"><i class="fa-solid fa-sitemap"></i> 3D Simulation & Data Flow</div>
                    <div class="m-arch-flow">
                        <div class="m-node"><i class="fa-solid fa-server"></i><span>1. Sensor Telemetry</span></div>
                        <div class="m-arrow"><i class="fa-solid fa-arrow-right"></i></div>
                        <div class="m-node"><i class="fa-solid fa-cubes"></i><span>2. Blender 3D Models</span></div>
                        <div class="m-arrow"><i class="fa-solid fa-arrow-right"></i></div>
                        <div class="m-node highlight"><i class="fa-brands fa-unity"></i><span>3. Unity Physics & C#</span></div>
                        <div class="m-arrow"><i class="fa-solid fa-arrow-right"></i></div>
                        <div class="m-node highlight"><i class="fa-solid fa-fire-flame-curved"></i><span>4. 3D Thermal Heatmap</span></div>
                    </div>
                </div>
            `,
            myContribution: "Modeled 3D server rack assets and layout architecture in Blender; wrote C# scripting in Unity 3D to simulate thermal gradient interpolation across spatial coordinates; rendered real-time dynamic heatmaps and visual airflow streamlines.",
            challenges: "Achieving smooth real-time 3D rendering of complex spatial heat gradients while maintaining 60 FPS performance on standard workstations.",
            outcome: "Produced an interactive, navigable 3D digital twin environment that visualizes thermal hotspots and cooling airflow efficiency in real time.",
            techStack: ["Unity 3D", "C#", "Blender", "3D Modeling", "Data Visualization", "Physics Simulation"]
        },
        "pescholar-analytics": {
            title: "PEScholar Research Publication Analytics",
            label: "Data Engineering & Analytics · PES University",
            oneLiner: "Automated scholar citation tracking, anti-bot web scraping engine, and interactive research analytics dashboard.",
            overview: "Architected an end-to-end academic research intelligence platform that automatically scrapes, indexes, deduplicates, and visualizes publication records and citation metrics across university faculty departments.",
            problem: "Aggregating institutional publication indices from diverse academic databases (Google Scholar, Scopus) is manual and prone to severe IP rate-limiting, CAPTCHA blocks, and author name ambiguity.",
            architecture: `
                <div class="modal-arch-container">
                    <div class="m-arch-title"><i class="fa-solid fa-sitemap"></i> Automated Extraction & Analytics Pipeline</div>
                    <div class="m-arch-flow">
                        <div class="m-node"><i class="fa-solid fa-globe"></i><span>1. Academic Repos</span></div>
                        <div class="m-arrow"><i class="fa-solid fa-arrow-right"></i></div>
                        <div class="m-node highlight"><i class="fa-solid fa-robot"></i><span>2. Selenium + Proxy</span></div>
                        <div class="m-arrow"><i class="fa-solid fa-arrow-right"></i></div>
                        <div class="m-node"><i class="fa-solid fa-database"></i><span>3. MySQL DB</span></div>
                        <div class="m-arrow"><i class="fa-solid fa-arrow-right"></i></div>
                        <div class="m-node highlight"><i class="fa-solid fa-chart-line"></i><span>4. Streamlit UI</span></div>
                    </div>
                </div>
            `,
            myContribution: "Developed automated web scrapers in Python with Selenium, incorporating proxy rotation and browser fingerprint evasion; designed relational MySQL database schemas for author and citation normalization; built interactive data analytics dashboards in Streamlit.",
            challenges: "Bypassing anti-bot protection mechanisms reliably without IP bans and deduplicating cross-listed conference and journal papers.",
            outcome: "Automated the institutional publication tracking workflow, reducing data compilation time from weeks to minutes with interactive citation visualization dashboards.",
            techStack: ["Python", "Selenium", "MySQL", "Streamlit", "Pandas", "Plotly", "Web Scraping"]
        }
    };

    function openCaseStudyModal(caseId) {
        const data = caseStudiesData[caseId];
        if (!data || !caseModal || !modalBody) return;

        const techTagsHtml = data.techStack.map(tech => `<span class="tag">${tech}</span>`).join('');

        modalBody.innerHTML = `
            <div class="modal-case-header">
                <span class="prod-badge"><i class="fa-solid fa-book-bookmark"></i> ${data.label}</span>
                <h2>${data.title}</h2>
                <p class="modal-one-liner"><em>${data.oneLiner}</em></p>
            </div>

            <div class="modal-section">
                <h3><i class="fa-solid fa-align-left"></i> Overview</h3>
                <p>${data.overview}</p>
            </div>

            <div class="modal-section">
                <h3><i class="fa-solid fa-triangle-exclamation"></i> Problem Statement</h3>
                <p>${data.problem}</p>
            </div>

            <div class="modal-section">
                <h3><i class="fa-solid fa-sitemap"></i> High-Level Architecture &amp; Workflow</h3>
                ${data.architecture}
            </div>

            <div class="modal-section highlight-box">
                <h3><i class="fa-solid fa-user-check"></i> My Contribution</h3>
                <p>${data.myContribution}</p>
            </div>

            <div class="modal-section">
                <h3><i class="fa-solid fa-gears"></i> Technical Challenges &amp; Decisions</h3>
                <p>${data.challenges}</p>
            </div>

            <div class="modal-section">
                <h3><i class="fa-solid fa-chart-line"></i> Outcome &amp; Impact</h3>
                <p>${data.outcome}</p>
            </div>

            <div class="modal-section">
                <h3><i class="fa-solid fa-code"></i> Technologies Used</h3>
                <div class="modal-tech-tags">${techTagsHtml}</div>
            </div>
        `;

        caseModal.classList.add('active');
        caseModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeCaseStudyModal() {
        if (!caseModal) return;
        caseModal.classList.remove('active');
        caseModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    // Attach click listeners to View Case Study buttons
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.view-case-study-btn');
        if (btn) {
            const caseId = btn.getAttribute('data-case-id');
            openCaseStudyModal(caseId);
        }
    });

    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeCaseStudyModal);
    }

    if (caseModal) {
        caseModal.addEventListener('click', (e) => {
            if (e.target === caseModal) {
                closeCaseStudyModal();
            }
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && caseModal && caseModal.classList.contains('active')) {
            closeCaseStudyModal();
        }
    });
});
