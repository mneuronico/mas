/* ==============================================
   MAS WEBSITE — INTERACTIVE JAVASCRIPT
   ============================================== */

document.addEventListener('DOMContentLoaded', () => {
    initScrollReveal();
    initNavbar();
    initHeroCanvas();
    initCopyInstall();
    initStatCounters();
    initPipelineAnimation();
    initArchCards();
    initWorkflowSimulation();
    initBlockSystem();
    initControlFlow();
    initProviderHighlight();
    initBentoHover();
    initAutoMASDemo();
    initQuickStart();
    initExamples();
    initMobileMenu();
});

/* ==========================================
   SCROLL REVEAL (IntersectionObserver)
   ========================================== */
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    reveals.forEach(el => observer.observe(el));
}

/* ==========================================
   NAVBAR
   ========================================== */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        navbar.classList.toggle('scrolled', currentScroll > 50);
        lastScroll = currentScroll;
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                // Close mobile menu
                document.getElementById('navLinks')?.classList.remove('open');
            }
        });
    });
}

/* ==========================================
   MOBILE MENU
   ========================================== */
function initMobileMenu() {
    const btn = document.getElementById('mobileMenuBtn');
    const links = document.getElementById('navLinks');
    if (!btn || !links) return;

    btn.addEventListener('click', () => {
        links.classList.toggle('open');
    });
}

/* ==========================================
   HERO CANVAS — Particle Network
   ========================================== */
function initHeroCanvas() {
    const canvas = document.getElementById('heroCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width, height, particles, mouse;

    function resize() {
        width = canvas.width = canvas.offsetWidth;
        height = canvas.height = canvas.offsetHeight;
    }

    mouse = { x: width / 2, y: height / 2 };

    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.radius = Math.random() * 2 + 1;
            this.opacity = Math.random() * 0.5 + 0.2;
            // Agent-like colors
            const colors = [
                '100, 255, 218',  // accent
                '124, 77, 255',   // purple
                '0, 180, 216',    // blue
                '255, 171, 64',   // orange
            ];
            this.color = colors[Math.floor(Math.random() * colors.length)];
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
            ctx.fill();
        }
    }

    function init() {
        resize();
        const count = Math.min(80, Math.floor((width * height) / 15000));
        particles = Array.from({ length: count }, () => new Particle());
    }

    function drawConnections() {
        const maxDist = 150;
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < maxDist) {
                    const opacity = (1 - dist / maxDist) * 0.15;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(100, 255, 218, ${opacity})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        // Subtle radial gradient background
        const gradient = ctx.createRadialGradient(width / 2, height / 3, 0, width / 2, height / 3, width * 0.7);
        gradient.addColorStop(0, 'rgba(100, 255, 218, 0.03)');
        gradient.addColorStop(0.5, 'rgba(124, 77, 255, 0.02)');
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);

        particles.forEach(p => {
            p.update();
            p.draw();
        });

        drawConnections();
        requestAnimationFrame(animate);
    }

    init();
    animate();

    window.addEventListener('resize', () => {
        resize();
        particles.forEach(p => {
            if (p.x > width) p.x = width * Math.random();
            if (p.y > height) p.y = height * Math.random();
        });
    });

    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    });
}

/* ==========================================
   COPY INSTALL
   ========================================== */
function initCopyInstall() {
    const btn = document.getElementById('copyInstall');
    if (!btn) return;

    btn.addEventListener('click', () => {
        const text = 'pip install --upgrade git+https://github.com/mneuronico/multi-agent-system-library';
        navigator.clipboard.writeText(text).then(() => {
            btn.classList.add('copied');
            btn.innerHTML = '<i class="fas fa-check"></i>';
            setTimeout(() => {
                btn.classList.remove('copied');
                btn.innerHTML = '<i class="fas fa-copy"></i>';
            }, 2000);
        });
    });
}

/* ==========================================
   STAT COUNTERS
   ========================================== */
function initStatCounters() {
    const stats = document.querySelectorAll('.stat-number');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.dataset.target);
                animateCounter(el, target);
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(s => observer.observe(s));
}

function animateCounter(el, target) {
    const duration = 1500;
    const start = performance.now();

    function update(time) {
        const elapsed = time - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        el.textContent = Math.round(target * eased);

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

/* ==========================================
   PIPELINE ANIMATION
   ========================================== */
function initPipelineAnimation() {
    const steps = document.querySelectorAll('.pipeline-step');

    // Highlight steps sequentially
    let currentStep = 0;
    setInterval(() => {
        steps.forEach(s => s.classList.remove('active'));
        if (steps[currentStep]) {
            steps[currentStep].classList.add('active');
        }
        currentStep = (currentStep + 1) % steps.length;
    }, 3000);
}

/* ==========================================
   ARCHITECTURE CARDS
   ========================================== */
function initArchCards() {
    const cards = document.querySelectorAll('.arch-card');

    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            cards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
        });
    });
}

/* ==========================================
   BLOCK SYSTEM DEMO
   ========================================== */
function initBlockSystem() {
    const buttons = document.querySelectorAll('.input-type-btn');
    const previews = document.querySelectorAll('.input-preview > div');
    const blockJson = document.getElementById('blockJson');

    const blockData = {
        text: `{
  <span class="json-key">"type"</span>: <span class="json-str">"text"</span>,
  <span class="json-key">"content"</span>: <span class="json-str">"What's the weather like?"</span>
}`,
        image: `{
  <span class="json-key">"type"</span>: <span class="json-str">"image"</span>,
  <span class="json-key">"content"</span>: {
    <span class="json-key">"kind"</span>: <span class="json-str">"file"</span>,
    <span class="json-key">"path"</span>: <span class="json-str">"photo.jpg"</span>
  }
}`,
        audio: `{
  <span class="json-key">"type"</span>: <span class="json-str">"audio"</span>,
  <span class="json-key">"content"</span>: {
    <span class="json-key">"kind"</span>: <span class="json-str">"file"</span>,
    <span class="json-key">"path"</span>: <span class="json-str">"voice_note.ogg"</span>
  }
}`
    };

    const classMap = { text: 'input-text', image: 'input-image', audio: 'input-audio' };

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const type = btn.dataset.type;

            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            previews.forEach(p => p.classList.remove('active'));
            document.querySelector(`.${classMap[type]}`)?.classList.add('active');

            if (blockJson) {
                blockJson.innerHTML = `<pre><code>${blockData[type]}</code></pre>`;
                blockJson.style.animation = 'none';
                blockJson.offsetHeight; // trigger reflow
                blockJson.style.animation = 'fadeIn 0.3s ease';
            }
        });
    });
}

/* ==========================================
   CONTROL FLOW DEMO
   ========================================== */
function initControlFlow() {
    const buttons = document.querySelectorAll('.flow-btn');
    const charts = document.querySelectorAll('.flow-chart');
    const codes = document.querySelectorAll('.flow-code');

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const flow = btn.dataset.flow;

            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            charts.forEach(c => c.classList.remove('active'));
            document.querySelector(`.flow-chart[data-chart="${flow}"]`)?.classList.add('active');

            codes.forEach(c => c.classList.remove('active'));
            document.querySelector(`.flow-code[data-code="${flow}"]`)?.classList.add('active');
        });
    });
}

/* ==========================================
   PROVIDER HIGHLIGHT CYCLING
   ========================================== */
function initProviderHighlight() {
    const lines = document.querySelectorAll('.provider-line');
    if (lines.length === 0) return;

    let currentIndex = 0;
    setInterval(() => {
        lines.forEach(l => l.classList.remove('highlight'));
        lines[currentIndex].classList.add('highlight');
        currentIndex = (currentIndex + 1) % lines.length;
    }, 2000);
}

/* ==========================================
   BENTO GRID HOVER GLOW
   ========================================== */
function initBentoHover() {
    const items = document.querySelectorAll('.bento-item');

    items.forEach(item => {
        item.addEventListener('mousemove', (e) => {
            const rect = item.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            item.style.setProperty('--mouse-x', `${x}%`);
            item.style.setProperty('--mouse-y', `${y}%`);
        });
    });
}

/* ==========================================
   AUTO-MAS TYPEWRITER DEMO
   ========================================== */
function initAutoMASDemo() {
    const textEl = document.querySelector('.tw-text');
    const configCode = document.getElementById('genConfigCode');
    const genConfig = document.getElementById('genConfig');

    if (!textEl || !configCode || !genConfig) return;

    const prompt = 'I want a system that summarizes YouTube videos';

        const generatedConfig = `{
    "general_parameters": {
        "general_system_description": "A system that summarizes YouTube videos."
    },
    "default_models": [
        {"provider": "google", "model": "gemini-2.0-flash"}
    ],
    "components": [
        {
            "type": "tool",
            "name": "youtube_transcript",
            "function": "fn:get_youtube_transcript",
            "inputs": {"url": "The YouTube video URL"},
            "outputs": {"transcript": "Full transcript text"}
        },
        {
            "type": "agent",
            "name": "summarizer",
            "system": "You summarize video transcripts concisely.",
            "required_outputs": {
                "summary": "A concise summary of the video."
            }
        }
    ]
}`;

    let typewriterStarted = false;

    // Start typewriter when section is visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !typewriterStarted) {
                typewriterStarted = true;
                startTypewriter();
            }
        });
    }, { threshold: 0.3 });

    const section = document.getElementById('zero-config');
    if (section) observer.observe(section);

    function startTypewriter() {
        let i = 0;
        textEl.textContent = '';

        function type() {
            if (i < prompt.length) {
                textEl.textContent += prompt[i];
                i++;
                setTimeout(type, 40 + Math.random() * 30);
            } else {
                // Show generated output after typing
                setTimeout(() => {
                    configCode.textContent = generatedConfig;
                    genConfig.classList.add('visible');
                }, 600);
            }
        }

        setTimeout(type, 1000);
    }
}

/* ==========================================
   QUICK START TABS
   ========================================== */
function initQuickStart() {
    const steps = document.querySelectorAll('.qs-step');
    const panes = document.querySelectorAll('.qs-pane');
    const filename = document.getElementById('qsFilename');

    const filenames = {
        install: 'terminal',
        config: 'config.json',
        run: 'main.py',
        deploy: 'main.py'
    };

    steps.forEach(step => {
        step.addEventListener('click', () => {
            const qs = step.dataset.qs;

            steps.forEach(s => s.classList.remove('active'));
            step.classList.add('active');

            panes.forEach(p => p.classList.remove('active'));
            document.getElementById(`qs-${qs}`)?.classList.add('active');

            if (filename) filename.textContent = filenames[qs] || 'terminal';
        });
    });
}

/* ==========================================
   SUCCESS CASES
   ========================================== */
function initExamples() {
    const grid = document.getElementById('examples-grid');
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('imageModalImg');
    const modalCaption = document.getElementById('imageModalCaption');
    const modalClose = document.getElementById('imageModalClose');
    const modalBackdrop = document.querySelector('.image-modal-backdrop');
    if (!grid) return;

    const closeModal = () => {
        if (!modal) return;
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
    };

    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }
    if (modalBackdrop) {
        modalBackdrop.addEventListener('click', closeModal);
    }
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });

    fetch('data/examples.json')
        .then(r => r.json())
        .then(examples => {
            examples.forEach((ex, index) => {
                const card = document.createElement('div');
                card.className = 'example-card';
                card.style.animationDelay = `${index * 0.1}s`;

                card.innerHTML = `
                    <div class="example-screenshot" style="background-image: url('${ex.example}')"></div>
                    <div class="example-card-body">
                        <div class="example-card-header">
                            <img src="${ex.logo}" alt="${ex.name}" class="example-logo" loading="lazy">
                            <span class="example-name">${ex.name}</span>
                        </div>
                        <p class="example-desc">${ex.description}</p>
                    </div>
                `;

                const nameLower = ex.name.toLowerCase();
                if (nameLower === 'casanchef') {
                    card.addEventListener('click', () => {
                        window.open('https://mneuronico.github.io/casanchef', '_blank', 'noopener');
                    });
                } else {
                    card.addEventListener('click', () => {
                        if (!modal || !modalImg) return;
                        modalImg.src = ex.example;
                        modalImg.alt = ex.name;
                        if (modalCaption) modalCaption.textContent = ex.name;
                        modal.classList.add('open');
                        modal.setAttribute('aria-hidden', 'false');
                    });
                }

                grid.appendChild(card);
            });
        })
        .catch(() => {
            // fallback - show nothing if load fails
        });
}

/* ==========================================
   WORKFLOW SIMULATION (Constrained Paths)
   ========================================== */
function initWorkflowSimulation() {
    const sim = document.getElementById('workflowSim');
    const log = document.getElementById('workflowLog');
    const status = document.getElementById('workflowStatus');
    const resumeBtn = document.getElementById('workflowResume');
    if (!sim || !log) return;

    const nodes = Array.from(sim.querySelectorAll('.wf-node'));
    const lanes = Array.from(sim.querySelectorAll('.wf-lane'));
    const pauseState = { paused: false };
    let currentPath = null;
    let currentStepIndex = -1;

    const paths = [
        {
            lane: 'weather',
            choice: 'weather',
            steps: [
                { node: 'input', type: 'user', msg: 'User: "Is it going to rain today in Buenos Aires?"' },
                { node: 'router', type: 'agent', msg: 'Router Agent: intent=weather, route=weather_path' },
                { node: 'decision', type: 'system', msg: 'Decision: Weather Path selected (predefined)' },
                { node: 'weather-responder', type: 'agent', msg: 'First Responder: "Checking live weather..."' },
                { node: 'weather-tool', type: 'tool', msg: 'Weather API Tool → {"temp": "21C", "rain": "20%"}' },
                { node: 'weather-cache', type: 'process', msg: 'Cache Process → stored response in SQLite' },
                { node: 'weather-formatter', type: 'agent', msg: 'Formatter Agent → formatted response block' },
                { node: 'weather-final', type: 'agent', msg: 'Final Responder: "21C, low rain chance today."' }
            ]
        },
        {
            lane: 'news',
            choice: 'news',
            steps: [
                { node: 'input', type: 'user', msg: 'User: "Give me 3 AI headlines from today."' },
                { node: 'router', type: 'agent', msg: 'Router Agent: intent=news, route=news_path' },
                { node: 'decision', type: 'system', msg: 'Decision: News Path selected (predefined)' },
                { node: 'news-responder', type: 'agent', msg: 'First Responder: "Fetching latest AI news..."' },
                { node: 'news-tool', type: 'tool', msg: 'News API Tool → {"items": 12, "source": "rss"}' },
                { node: 'news-summarize', type: 'process', msg: 'Summarize Process → condensed to 3 bullets' },
                { node: 'news-editor', type: 'agent', msg: 'Editor Agent → tone: concise, friendly' },
                { node: 'news-final', type: 'agent', msg: 'Final Responder: "Here are 3 headlines..."' }
            ]
        },
        {
            lane: 'orders',
            choice: 'orders',
            steps: [
                { node: 'input', type: 'user', msg: 'User: "Track order #AC-4912"' },
                { node: 'router', type: 'agent', msg: 'Router Agent: intent=orders, route=orders_path' },
                { node: 'decision', type: 'system', msg: 'Decision: Orders Path selected (predefined)' },
                { node: 'orders-responder', type: 'agent', msg: 'First Responder: "Looking up your order..."' },
                { node: 'orders-tool', type: 'tool', msg: 'Orders API Tool → {"status": "shipped", "eta": "Feb 12"}' },
                { node: 'orders-db', type: 'process', msg: 'DB Process → saved status to history' },
                { node: 'orders-check', type: 'agent', msg: 'Compliance Agent → verified safe response' },
                { node: 'orders-final', type: 'agent', msg: 'Final Responder: "Shipped. ETA Feb 12."' }
            ]
        }
    ];

    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const clearActive = () => {
        nodes.forEach(n => n.classList.remove('active'));
        lanes.forEach(l => l.classList.remove('active'));
    };

    const addLog = (entry) => {
        const line = document.createElement('div');
        line.className = `wf-log-item ${entry.type}`;
        line.innerHTML = `
            <span class="wf-badge ${entry.type}">${entry.type}</span>
            <span class="wf-msg">${entry.msg}</span>
        `;
        log.appendChild(line);
        log.scrollTop = log.scrollHeight;
    };

    const activateNode = (nodeId) => {
        const node = sim.querySelector(`.wf-node[data-node="${nodeId}"]`);
        if (node) node.classList.add('active');
    };

    const activateLane = (laneId) => {
        lanes.forEach(l => l.classList.toggle('active', l.dataset.lane === laneId));
    };

    const waitWhilePaused = async () => {
        while (pauseState.paused) {
            await sleep(200);
        }
    };

    const setPaused = (value) => {
        pauseState.paused = value;
        if (status) status.textContent = value ? 'Paused' : 'Auto-playing';
        if (resumeBtn) resumeBtn.disabled = !value;
    };

    const showStep = (path, stepIndex) => {
        log.innerHTML = '';
        clearActive();
        activateLane(path.lane);
        path.steps.forEach((step, idx) => {
            if (idx <= stepIndex) {
                activateNode(step.node);
                addLog(step);
            }
        });
        currentPath = path;
        currentStepIndex = stepIndex;
    };

    let running = false;

    const runSimulation = async () => {
        if (running) return;
        running = true;

        while (true) {
            for (const path of paths) {
                log.innerHTML = '';
                clearActive();
                activateLane(path.lane);
                currentPath = path;
                for (let i = 0; i < path.steps.length; i++) {
                    await waitWhilePaused();
                    currentStepIndex = i;
                    const step = path.steps[i];
                    activateNode(step.node);
                    addLog(step);
                    await sleep(1200);
                }
                await sleep(1800);
            }
        }
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                runSimulation();
            }
        });
    }, { threshold: 0.2 });

    nodes.forEach(node => {
        node.addEventListener('click', () => {
            if (!currentPath) return;
            const nodeId = node.dataset.node;
            const stepIndex = currentPath.steps.findIndex(step => step.node === nodeId);
            if (stepIndex >= 0) {
                showStep(currentPath, stepIndex);
                setPaused(true);
            }
        });
    });

    if (resumeBtn) {
        resumeBtn.addEventListener('click', () => setPaused(false));
        resumeBtn.disabled = true;
    }

    observer.observe(sim);
}
