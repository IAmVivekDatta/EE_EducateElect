import { electionData } from '../data.js';

export const learningView = () => {
    const topicColors = ['#38bdf8', '#a78bfa', '#34d399', '#fbbf24'];
    const cards = electionData.learningHub
        .map(
            (t, i) => `
        <div class="learning-card fade-in" style="--topic-color:${topicColors[i]};animation-delay:${i * 0.08}s">
            <div class="learning-icon" style="background:${topicColors[i]}18;border-color:${topicColors[i]}33">
                <span class="material-symbols-outlined" style="color:${topicColors[i]};font-size:1.8rem">${t.icon}</span>
            </div>
            <div class="learning-content">
                <div class="topic-tag" style="background:${topicColors[i]}18;color:${topicColors[i]}">${t.title}</div>
                <h3>${t.title}</h3>
                <div class="topic-body">${t.content}</div>
            </div>
        </div>`
        )
        .join('');

    return `
        <div class="view-header fade-in">
            <h2><span class="material-symbols-outlined">library_books</span> Learning Hub</h2>
            <p>Key election concepts explained clearly — no jargon.</p>
        </div>
        <div class="learning-grid">${cards}</div>`;
};
