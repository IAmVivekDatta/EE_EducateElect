import { views, renderTo, attachEvents } from './views.js';
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js';
import { auth, loginWithGoogle, logoutGoogle, getUserApiKey } from './firebase.js';
import { state, setUser, setApiKey } from './state.js';

// Router Logic
const routes = {
    '': 'home',
    '#home': 'home',
    '#timeline': 'timeline',
    '#assistant': 'assistant',
    '#learning': 'learning',
    '#guidance': 'guidance',
    '#settings': 'settings',
};

const handleRoute = () => {
    const hash = window.location.hash;
    const currentRoute = routes[hash] || 'home';

    // Update active state in sidebar
    document.querySelectorAll('.sidebar-nav a').forEach((link) => {
        if (
            link.getAttribute('href') === `#${currentRoute}` ||
            (currentRoute === 'home' && link.getAttribute('href') === '#home')
        ) {
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

const renderAuth = () => {
    const authEl = document.getElementById('auth-section');
    if (!authEl) return;

    if (state.user) {
        authEl.innerHTML = `
            <div style="display:flex; align-items:center; gap:0.75rem; padding: 0.5rem; background:rgba(255,255,255,0.05); border-radius:8px;">
                <img src="${state.user.photoURL}" alt="Profile" width="32" height="32" style="border-radius:50%">
                <div style="flex:1; overflow:hidden;">
                    <div style="font-size:0.875rem; font-weight:600; text-overflow:ellipsis; white-space:nowrap; overflow:hidden;">${state.user.displayName}</div>
                </div>
                <button id="logout-btn" style="background:none; border:none; color:var(--text-secondary); cursor:pointer;" title="Logout">
                    <span class="material-symbols-outlined">logout</span>
                </button>
            </div>
        `;
        document.getElementById('logout-btn')?.addEventListener('click', () => {
            logoutGoogle();
        });
    } else {
        authEl.innerHTML = `
            <button id="login-btn" class="btn-primary" style="width:100%; display:flex; justify-content:center; align-items:center; gap:0.5rem; font-size:0.9rem; padding:0.6rem;">
                <span class="material-symbols-outlined" style="font-size:1.2rem;">login</span> Sign in with Google
            </button>
        `;
        document.getElementById('login-btn')?.addEventListener('click', async () => {
            try {
                await loginWithGoogle();
            } catch (error) {
                console.warn('Login failed:', error);
            }
        });
    }
};

// Firebase Auth Observer
onAuthStateChanged(auth, async (user) => {
    if (user) {
        setUser(user);
        const savedKey = await getUserApiKey(user.uid);
        if (savedKey) {
            setApiKey(savedKey);
        }
    } else {
        setUser(null);
    }
    renderAuth();
    handleRoute();
});

// Init
window.addEventListener('hashchange', handleRoute);
document.addEventListener('DOMContentLoaded', () => {
    renderAuth();
    handleRoute();
});
