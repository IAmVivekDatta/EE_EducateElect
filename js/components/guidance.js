import { state, setDecisionFlowNode } from '../state.js';
import { electionData } from '../data.js';

export const guidanceView = () => {
    const node = electionData.decisionFlow[state.decisionFlowCurrentNode];
    const total = 4;
    const depthMap = { start: 0, register: 1, research: 1, logistics: 1, post_vote: 1 };
    const depth = depthMap[state.decisionFlowCurrentNode] || 0;
    const pct = Math.round((depth / total) * 100);

    const opts = node.options
        .map(
            (o) => `
        <button class="decision-btn" data-next="${o.next || ''}" data-action="${o.action || ''}">
            <span class="decision-btn-text">${o.text}</span>
            <span class="material-symbols-outlined" style="color:var(--text-accent)">arrow_forward_ios</span>
        </button>`
        )
        .join('');

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
};

export const attachGuidanceEvents = () => {
    document.querySelectorAll('.decision-btn').forEach((btn) => {
        btn.addEventListener('click', (e) => {
            const next = e.currentTarget.dataset.next;
            const action = e.currentTarget.dataset.action;
            if (next) {
                setDecisionFlowNode(next);
                window.dispatchEvent(new HashChangeEvent('hashchange'));
            } else if (action) {
                document.getElementById('decision-options').style.display = 'none';
                const res = document.getElementById('decision-result');
                res.style.display = 'block';
                res.innerHTML = `<span class="material-symbols-outlined" style="color:var(--success);font-size:2rem">check_circle</span><br><strong>Recommended Next Step:</strong><br><br>${action}`;
                const reset = document.getElementById('decision-reset');
                reset.style.display = 'inline-flex';
                reset.addEventListener('click', () => {
                    setDecisionFlowNode('start');
                    window.dispatchEvent(new HashChangeEvent('hashchange'));
                });
            }
        });
    });
};
