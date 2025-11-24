document.addEventListener('DOMContentLoaded', () => {
    loadExamples();
    setupTabs();
});

async function loadExamples() {
    const grid = document.getElementById('examples-grid');

    try {
        const response = await fetch('data/examples.json');
        if (!response.ok) {
            throw new Error('Failed to load examples');
        }
        const examples = await response.json();

        examples.forEach(example => {
            const card = document.createElement('div');
            card.className = 'example-card';

            card.innerHTML = `
                <div class="example-header">
                    <img src="${example.logo}" alt="${example.name} Logo" class="example-logo">
                    <h3>${example.name}</h3>
                </div>
                <div class="example-body">
                    <img src="${example.example}" alt="${example.name} Example" class="example-image">
                    <p class="example-desc">${example.description}</p>
                </div>
            `;

            grid.appendChild(card);
        });
    } catch (error) {
        console.error('Error loading examples:', error);
        grid.innerHTML = '<p class="error-msg">Could not load examples. Please check the console.</p>';
    }
}

function setupTabs() {
    const tabs = document.querySelectorAll('.tab-btn');
    const panes = document.querySelectorAll('.code-pane');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs and panes
            tabs.forEach(t => t.classList.remove('active'));
            panes.forEach(p => p.classList.remove('active'));

            // Add active class to clicked tab
            tab.classList.add('active');

            // Show corresponding pane
            const tabId = tab.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
}
