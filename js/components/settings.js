import { state, setApiKey } from '../state.js';
import { saveUserApiKey } from '../firebase.js';

export const settingsView = () => `
    <div class="view-header fade-in">
        <h2><span class="material-symbols-outlined">settings</span> Settings & API Config</h2>
    </div>
    <div class="card fade-in delay-1">
        <div class="settings-gemini-header">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><circle cx="14" cy="14" r="14" fill="#1a73e8"/><path d="M14 7l2.5 5 5.5.8-4 3.9.9 5.3L14 19.5l-4.9 2.5.9-5.3-4-3.9 5.5-.8z" fill="white"/></svg>
            <h3>Google Gemini Integration</h3>
        </div>
        <p class="text-secondary mt-2 mb-4">Connect your Gemini API key to unlock dynamic AI-powered answers in the Assistant. Keys are securely synced with your profile if logged in, or stored locally if not.</p>
        <div class="form-group">
            <label for="api-key-input">Gemini API Key</label>
            <input type="password" id="api-key-input" placeholder="AIzaSy..." value="${state.geminiApiKey}">
        </div>
        <div class="settings-actions mt-4">
            <button id="save-api-key" class="btn-primary">Save Key</button>
            <a href="https://aistudio.google.com/app/apikey" target="_blank" class="btn-secondary">
                Get API Key <span class="material-symbols-outlined" style="font-size:1rem">open_in_new</span>
            </a>
        </div>
        <div id="api-status-msg" class="mt-2"></div>
    </div>`;

export const attachSettingsEvents = () => {
    document.getElementById('save-api-key')?.addEventListener('click', () => {
        const val = document.getElementById('api-key-input').value;
        setApiKey(val);
        if (state.user) {
            saveUserApiKey(state.user.uid, val);
        }
        const msg = document.getElementById('api-status-msg');
        msg.innerHTML = '<span style="color:var(--success)">✓ Saved successfully.</span>';
        setTimeout(() => {
            msg.innerHTML = '';
        }, 3000);
    });
};
