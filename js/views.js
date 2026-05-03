import { state, setPersona, setActiveTimelineStep, setDecisionFlowNode, addChatMessage, setApiKey } from './state.js';
import { electionData } from './data.js';
import { generateAssistantResponse } from './api.js';

export const renderTo = (elementId, html) => {
    const el = document.getElementById(elementId);
    if (el) el.innerHTML = html;
};

// SVG Icons
const svgIcons = {
    ballot: `<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="8" y="4" width="48" height="56" rx="4" fill="#1c1f30" stroke="#38bdf8" stroke-width="2"/><rect x="16" y="16" width="20" height="4" rx="2" fill="#38bdf8"/><rect x="16" y="26" width="32" height="3" rx="1.5" fill="#334155"/><rect x="16" y="33" width="28" height="3" rx="1.5" fill="#334155"/><rect x="16" y="40" width="24" height="3" rx="1.5" fill="#334155"/><circle cx="46" cy="44" r="10" fill="#2563eb"/><path d="M41 44l3 3 6-6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    register: `<svg width="40" height="40" viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="19" stroke="#38bdf8" stroke-width="2" fill="#1c1f30"/><path d="M20 10a5 5 0 100 10 5 5 0 000-10z" fill="#38bdf8"/><path d="M10 30c0-5.5 4.5-10 10-10s10 4.5 10 10" stroke="#38bdf8" stroke-width="2" stroke-linecap="round" fill="none"/></svg>`,
    verify: `<svg width="40" height="40" viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="19" stroke="#a78bfa" stroke-width="2" fill="#1c1f30"/><path d="M13 20l5 5 9-9" stroke="#a78bfa" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    candidate: `<svg width="40" height="40" viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="19" stroke="#34d399" stroke-width="2" fill="#1c1f30"/><rect x="13" y="14" width="14" height="14" rx="2" stroke="#34d399" stroke-width="2" fill="none"/><path d="M17 21l2 2 4-4" stroke="#34d399" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    prepare: `<svg width="40" height="40" viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="19" stroke="#fbbf24" stroke-width="2" fill="#1c1f30"/><rect x="12" y="12" width="16" height="16" rx="2" stroke="#fbbf24" stroke-width="2" fill="none"/><path d="M16 20h8M20 16v8" stroke="#fbbf24" stroke-width="2" stroke-linecap="round"/></svg>`,
    vote: `<svg width="40" height="40" viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="19" stroke="#f87171" stroke-width="2" fill="#1c1f30"/><path d="M20 12v10l5 3" stroke="#f87171" stroke-width="2" stroke-linecap="round"/></svg>`,
    results: `<svg width="40" height="40" viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="19" stroke="#38bdf8" stroke-width="2" fill="#1c1f30"/><rect x="12" y="22" width="4" height="8" rx="1" fill="#38bdf8"/><rect x="18" y="17" width="4" height="13" rx="1" fill="#38bdf8" opacity="0.7"/><rect x="24" y="12" width="4" height="18" rx="1" fill="#38bdf8" opacity="0.5"/></svg>`,
    bot: `<svg width="32" height="32" viewBox="0 0 32 32" fill="none"><rect x="4" y="10" width="24" height="18" rx="4" fill="#2563eb"/><circle cx="12" cy="19" r="2.5" fill="white"/><circle cx="20" cy="19" r="2.5" fill="white"/><path d="M12 24h8" stroke="white" stroke-width="1.5" stroke-linecap="round"/><path d="M16 10V6" stroke="#38bdf8" stroke-width="2" stroke-linecap="round"/><circle cx="16" cy="5" r="1.5" fill="#38bdf8"/><path d="M4 18H2M30 18h-2" stroke="#38bdf8" stroke-width="2" stroke-linecap="round"/></svg>`,
};

const stepIcons = ['register', 'verify', 'candidate', 'prepare', 'vote', 'results'];
const stepColors = ['#38bdf8','#a78bfa','#34d399','#fbbf24','#f87171','#38bdf8'];

function sanitizeText(str) {
    const d = document.createElement('div');
    d.textContent = str;
    return d.innerHTML;
}

export const views = {
    home: () => {
        const persona = electionData.personas.find(p => p.id === state.selectedPersona);
        const personaButtons = electionData.personas.map(p => `
            <button class="persona-btn ${p.id === state.selectedPersona ? 'active' : ''}" data-id="${p.id}">
                <span class="material-symbols-outlined">${p.icon}</span> ${p.label}
            </button>`).join('');

        const navCards = [
            { href: '#timeline', icon: 'linear_scale', label: 'Process Timeline', desc: 'Step-by-step election journey', color: '#38bdf8', bg: 'rgba(56,189,248,0.08)' },
            { href: '#assistant', icon: 'smart_toy', label: 'AI Assistant', desc: 'Ask questions, get instant answers', color: '#a78bfa', bg: 'rgba(167,139,250,0.08)' },
            { href: '#learning', icon: 'library_books', label: 'Learning Hub', desc: 'Concepts, myths, and facts', color: '#34d399', bg: 'rgba(52,211,153,0.08)' },
            { href: '#guidance', icon: 'explore', label: 'Smart Guidance', desc: 'Not sure where to start?', color: '#fbbf24', bg: 'rgba(251,191,36,0.08)' },
        ].map(c => `
            <a href="${c.href}" class="dash-card" style="--card-accent:${c.color};--card-bg:${c.bg}">
                <div class="dash-icon-wrap" style="background:${c.bg};border-color:${c.color}22">
                    <span class="material-symbols-outlined" style="color:${c.color};font-size:2rem">${c.icon}</span>
                </div>
                <h4>${c.label}</h4>
                <p>${c.desc}</p>
                <span class="dash-arrow" style="color:${c.color}">→</span>
            </a>`).join('');

        return `
            <div class="hero-banner fade-in">
                <div class="hero-text">
                    <div class="hero-badge"><span class="material-symbols-outlined">verified</span> Civic Education Platform</div>
                    <h2>Understand Your<br><span class="gradient-text">Vote. Your Voice.</span></h2>
                    <p>A step-by-step, AI-powered guide to the election process — neutral, clear, and built for everyone.</p>
                    <a href="#timeline" class="btn-primary-hero">Explore the Process <span class="material-symbols-outlined">arrow_forward</span></a>
                </div>
                <div class="hero-illustration">${svgIcons.ballot}</div>
            </div>

            <div class="card fade-in delay-1 persona-section">
                <div class="section-label"><span class="material-symbols-outlined">person</span> Personalize your experience</div>
                <div class="persona-grid" id="home-persona-selector">${personaButtons}</div>
                <div class="persona-greeting-box mt-4">
                    <span class="material-symbols-outlined greeting-icon">waving_hand</span>
                    <div><strong>${persona.label} Mode</strong><br><span style="color:var(--text-secondary)">${persona.greeting}</span></div>
                </div>
            </div>

            <div class="section-label fade-in delay-2 mt-4"><span class="material-symbols-outlined">grid_view</span> Explore all features</div>
            <div class="dashboard-grid fade-in delay-2">${navCards}</div>
        `;
    },

    timeline: () => {
        const total = electionData.timeline.length;
        const activeIdx = electionData.timeline.findIndex(s => s.id === state.activeTimelineStep);
        const pct = activeIdx >= 0 ? Math.round(((activeIdx + 1) / total) * 100) : 0;

        const nodes = electionData.timeline.map((step, i) => {
            const isActive = step.id === state.activeTimelineStep;
            const icon = svgIcons[stepIcons[i]] || '';
            const color = stepColors[i];
            const ctx = step.personaContext[state.selectedPersona]
                ? `<div class="persona-context-note"><span class="material-symbols-outlined info-icon">person_pin</span> ${step.personaContext[state.selectedPersona]}</div>` : '';

            return `
            <div class="timeline-node ${isActive ? 'active' : ''}" data-id="${step.id}" style="--step-color:${color}" tabindex="0" role="button" aria-expanded="${isActive}">
                <div class="timeline-marker-wrap">
                    <div class="step-icon-svg">${icon}</div>
                    ${i < total - 1 ? `<div class="step-connector" style="background:linear-gradient(180deg,${color}44,${stepColors[i+1]}44)"></div>` : ''}
                </div>
                <div class="timeline-content">
                    <div class="timeline-header-row">
                        <div>
                            <span class="step-badge" style="background:${color}22;color:${color}">Step ${i + 1}</span>
                            <h3 class="timeline-title">${step.title}</h3>
                            <p class="timeline-summary">${step.summary}</p>
                        </div>
                        <span class="expand-icon material-symbols-outlined">${isActive ? 'expand_less' : 'expand_more'}</span>
                    </div>
                    <div class="timeline-details ${isActive ? 'expanded' : ''}">
                        <p class="timeline-desc">${step.description}</p>
                        ${ctx}
                        <div class="timeline-qa">
                            <div class="qa-question"><span class="material-symbols-outlined">help_outline</span> ${step.commonQuestion}</div>
                            <p class="qa-answer">${step.commonAnswer}</p>
                        </div>
                        <div class="timeline-action">
                            <span class="material-symbols-outlined" style="color:${color}">bolt</span>
                            <span>${step.action}</span>
                        </div>
                    </div>
                </div>
            </div>`;
        }).join('');

        return `
            <div class="view-header fade-in">
                <h2><span class="material-symbols-outlined">linear_scale</span> Election Timeline</h2>
                <p>Click any step to expand details tailored to your <strong>${electionData.personas.find(p=>p.id===state.selectedPersona).label}</strong> persona.</p>
            </div>

            <div class="progress-bar-card fade-in delay-1">
                <div class="progress-bar-label">
                    <span>Your Progress</span>
                    <span class="progress-pct">${pct}%</span>
                </div>
                <div class="progress-track"><div class="progress-fill" style="width:${pct}%"></div></div>
                <div class="progress-steps">
                    ${electionData.timeline.map((s,i) => `<div class="prog-dot ${i <= activeIdx ? 'done' : ''}" title="${s.title}" style="--dot-color:${stepColors[i]}"></div>`).join('')}
                </div>
            </div>

            <div class="timeline-container fade-in delay-1">${nodes}</div>
        `;
    },

    assistant: () => {
        const msgs = state.chatHistory.map(msg => `
            <div class="message ${msg.sender}-message anim-msg">
                ${msg.sender === 'assistant' ? `<div class="msg-avatar">${svgIcons.bot}</div>` : ''}
                <div class="msg-bubble">${msg.isHTML ? msg.text : sanitizeText(msg.text)}</div>
            </div>`).join('');

        const chips = electionData.suggestedPrompts.map(p => `<button class="prompt-chip">${p}</button>`).join('');

        return `
            <div class="view-header fade-in">
                <h2><span class="material-symbols-outlined">smart_toy</span> AI Assistant</h2>
                ${!state.geminiApiKey ? `<div class="warning-banner mt-2"><span class="material-symbols-outlined" style="font-size:1rem">info</span> Fallback mode — <a href="#settings">Add your Gemini API key</a> for advanced AI answers.</div>` : `<div class="success-banner mt-2"><span class="material-symbols-outlined" style="font-size:1rem">check_circle</span> Gemini AI connected.</div>`}
            </div>
            <div class="assistant-layout fade-in delay-1">
                <div class="assistant-chat-window" id="assistant-chat">${msgs}</div>
                <div class="assistant-controls">
                    <p class="chips-label">Suggested questions:</p>
                    <div class="suggested-prompts-container">${chips}</div>
                    <div class="input-group">
                        <input type="text" id="assistant-input" placeholder="Ask anything about the election process..." aria-label="Ask the assistant">
                        <button id="assistant-send" aria-label="Send"><span class="material-symbols-outlined">send</span></button>
                    </div>
                    <p class="assistant-disclaimer">VotePath is educational and non-partisan. Not legal advice.</p>
                </div>
            </div>`;
    },

    learning: () => {
        const topicColors = ['#38bdf8','#a78bfa','#34d399','#fbbf24'];
        const cards = electionData.learningHub.map((t, i) => `
            <div class="learning-card fade-in" style="--topic-color:${topicColors[i]};animation-delay:${i * 0.08}s">
                <div class="learning-icon" style="background:${topicColors[i]}18;border-color:${topicColors[i]}33">
                    <span class="material-symbols-outlined" style="color:${topicColors[i]};font-size:1.8rem">${t.icon}</span>
                </div>
                <div class="learning-content">
                    <div class="topic-tag" style="background:${topicColors[i]}18;color:${topicColors[i]}">${t.title}</div>
                    <h3>${t.title}</h3>
                    <div class="topic-body">${t.content}</div>
                </div>
            </div>`).join('');

        return `
            <div class="view-header fade-in">
                <h2><span class="material-symbols-outlined">library_books</span> Learning Hub</h2>
                <p>Key election concepts explained clearly — no jargon.</p>
            </div>
            <div class="learning-grid">${cards}</div>`;
    },

    guidance: () => {
        const node = electionData.decisionFlow[state.decisionFlowCurrentNode];
        const total = 4;
        const depthMap = { start: 0, register: 1, research: 1, logistics: 1, post_vote: 1 };
        const depth = depthMap[state.decisionFlowCurrentNode] || 0;
        const pct = Math.round((depth / total) * 100);

        const opts = node.options.map(o => `
            <button class="decision-btn" data-next="${o.next || ''}" data-action="${o.action || ''}">
                <span class="decision-btn-text">${o.text}</span>
                <span class="material-symbols-outlined" style="color:var(--text-accent)">arrow_forward_ios</span>
            </button>`).join('');

        return `
            <div class="view-header fade-in">
                <h2><span class="material-symbols-outlined">explore</span> Smart Guidance</h2>
                <p>Answer a few questions to get a personalized action plan.</p>
            </div>
            <div class="guidance-progress fade-in delay-1">
                <div class="progress-track"><div class="progress-fill" style="width:${pct}%"></div></div>
            </div>
            <div class="guidance-flow fade-in delay-1">
                <div class="guidance-card card">
                    <div class="guidance-icon"><span class="material-symbols-outlined" style="font-size:2.5rem;color:var(--text-accent)">help_outline</span></div>
                    <h3 class="decision-question">${node.question}</h3>
                    <div class="decision-options mt-4" id="decision-options">${opts}</div>
                    <div id="decision-result" class="decision-result mt-4" style="display:none"></div>
                    <button id="decision-reset" class="btn-secondary mt-4" style="display:none">
                        <span class="material-symbols-outlined">refresh</span> Start Over
                    </button>
                </div>
            </div>`;
    },

    settings: () => `
        <div class="view-header fade-in">
            <h2><span class="material-symbols-outlined">settings</span> Settings & API Config</h2>
        </div>
        <div class="card fade-in delay-1">
            <div class="settings-gemini-header">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><circle cx="14" cy="14" r="14" fill="#1a73e8"/><path d="M14 7l2.5 5 5.5.8-4 3.9.9 5.3L14 19.5l-4.9 2.5.9-5.3-4-3.9 5.5-.8z" fill="white"/></svg>
                <h3>Google Gemini Integration</h3>
            </div>
            <p class="text-secondary mt-2 mb-4">Connect your Gemini API key to unlock dynamic AI-powered answers in the Assistant. Keys are stored only in <strong>your browser</strong> — never sent to any server.</p>
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
        </div>`,
};

export const attachEvents = (currentRoute) => {
    if (currentRoute === 'home') {
        document.querySelectorAll('.persona-btn').forEach(btn => {
            btn.addEventListener('click', e => {
                setPersona(e.currentTarget.dataset.id);
                window.dispatchEvent(new HashChangeEvent('hashchange'));
            });
        });
    }

    if (currentRoute === 'timeline') {
        document.querySelectorAll('.timeline-node').forEach(node => {
            const activate = (e) => {
                if (e.type === 'keydown' && e.key !== 'Enter' && e.key !== ' ') return;
                const id = e.currentTarget.dataset.id;
                setActiveTimelineStep(state.activeTimelineStep === id ? null : id);
                window.dispatchEvent(new HashChangeEvent('hashchange'));
            };
            node.addEventListener('click', activate);
            node.addEventListener('keydown', activate);
        });
    }

    if (currentRoute === 'assistant') {
        const chatWindow = document.getElementById('assistant-chat');
        if (chatWindow) chatWindow.scrollTop = chatWindow.scrollHeight;

        const sendBtn = document.getElementById('assistant-send');
        const input = document.getElementById('assistant-input');

        const handleSend = async () => {
            const val = input.value.trim();
            if (!val) return;
            input.value = '';
            addChatMessage('user', val, false);
            renderTo('app-root', views.assistant());
            attachEvents('assistant');
            const chatBox = document.getElementById('assistant-chat');
            const typing = document.createElement('div');
            typing.className = 'message assistant-message typing-indicator anim-msg';
            typing.innerHTML = `<div class="msg-avatar">${svgIcons.bot}</div><div class="msg-bubble"><span>.</span><span>.</span><span>.</span></div>`;
            chatBox.appendChild(typing);
            chatBox.scrollTop = chatBox.scrollHeight;
            const response = await generateAssistantResponse(val);
            typing.remove();
            addChatMessage('assistant', response, true);
            window.dispatchEvent(new HashChangeEvent('hashchange'));
        };

        sendBtn?.addEventListener('click', handleSend);
        input?.addEventListener('keypress', e => { if (e.key === 'Enter') handleSend(); });
        document.querySelectorAll('.prompt-chip').forEach(chip => {
            chip.addEventListener('click', e => { input.value = e.target.textContent.trim(); handleSend(); });
        });
    }

    if (currentRoute === 'guidance') {
        document.querySelectorAll('.decision-btn').forEach(btn => {
            btn.addEventListener('click', e => {
                const next = e.currentTarget.dataset.next;
                const action = e.currentTarget.dataset.action;
                if (next) { setDecisionFlowNode(next); window.dispatchEvent(new HashChangeEvent('hashchange')); }
                else if (action) {
                    document.getElementById('decision-options').style.display = 'none';
                    const res = document.getElementById('decision-result');
                    res.style.display = 'block';
                    res.innerHTML = `<span class="material-symbols-outlined" style="color:var(--success);font-size:2rem">check_circle</span><br><strong>Recommended Next Step:</strong><br><br>${action}`;
                    const reset = document.getElementById('decision-reset');
                    reset.style.display = 'inline-flex';
                    reset.addEventListener('click', () => { setDecisionFlowNode('start'); window.dispatchEvent(new HashChangeEvent('hashchange')); });
                }
            });
        });
    }

    if (currentRoute === 'settings') {
        document.getElementById('save-api-key')?.addEventListener('click', () => {
            const val = document.getElementById('api-key-input').value;
            setApiKey(val);
            const msg = document.getElementById('api-status-msg');
            msg.innerHTML = '<span style="color:var(--success)">✓ Saved securely in your browser.</span>';
            setTimeout(() => { msg.innerHTML = ''; }, 3000);
        });
    }
};
