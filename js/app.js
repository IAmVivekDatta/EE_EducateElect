import { views, renderTo, attachEvents } from './views.js';

// Router Logic
const routes = {
    '': 'home',
    '#home': 'home',
    '#timeline': 'timeline',
    '#assistant': 'assistant',
    '#learning': 'learning',
    '#guidance': 'guidance',
    '#settings': 'settings'
};

const handleRoute = () => {
    const hash = window.location.hash;
    const currentRoute = routes[hash] || 'home';
    
    // Update active state in sidebar
    document.querySelectorAll('.sidebar-nav a').forEach(link => {
        if (link.getAttribute('href') === `#${currentRoute}` || (currentRoute === 'home' && link.getAttribute('href') === '#home')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Render view
    const html = views[currentRoute] ? views[currentRoute]() : views.home();
    renderTo('app-root', html);
    
    // Attach events for this view
    attachEvents(currentRoute);
};

// Init
window.addEventListener('hashchange', handleRoute);
document.addEventListener('DOMContentLoaded', handleRoute);
