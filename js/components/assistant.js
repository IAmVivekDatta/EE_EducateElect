import { state, addChatMessage } from '../state.js';
import { electionData } from '../data.js';
import { svgIcons } from './icons.js';
import { renderTo, sanitizeText } from '../utils/dom.js';
import { generateAssistantResponse } from '../api.js';

export const assistantView = () => {
    const msgs = state.chatHistory
        .map(
            (msg) => `
        <div class="message ${msg.sender}-message anim-msg">
            ${msg.sender === 'assistant' ? `<div class="msg-avatar">${svgIcons.bot}</div>` : ''}
            <div class="msg-bubble">${msg.isHTML ? msg.text : sanitizeText(msg.text)}</div>
        </div>`
        )
        .join('');

    const chips = electionData.suggestedPrompts.map((p) => `<button class="prompt-chip">${p}</button>`).join('');

    return `
        <div class="view-header fade-in">
            <h2><span class="material-symbols-outlined">smart_toy</span> AI Assistant</h2>
            ${
                !state.geminiApiKey
                    ? `<div class="warning-banner mt-2"><span class="material-symbols-outlined" style="font-size:1rem">info</span> Fallback mode — <a href="#settings">Add your Gemini API key</a> for advanced AI answers.</div>`
                    : `<div class="success-banner mt-2"><span class="material-symbols-outlined" style="font-size:1rem">check_circle</span> Gemini AI connected.</div>`
            }
        </div>
        <div class="assistant-layout fade-in delay-1">
            <div class="assistant-chat-window" id="assistant-chat" aria-live="polite">${msgs}</div>
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
};

export const attachAssistantEvents = () => {
    const chatWindow = document.getElementById('assistant-chat');
    if (chatWindow) chatWindow.scrollTop = chatWindow.scrollHeight;

    const sendBtn = document.getElementById('assistant-send');
    const input = document.getElementById('assistant-input');

    const handleSend = async () => {
        const val = input.value.trim();
        if (!val) return;
        input.value = '';
        addChatMessage('user', val, false);

        // Re-render chat temporarily
        renderTo('app-root', assistantView());
        attachAssistantEvents();

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
    input?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSend();
    });

    document.querySelectorAll('.prompt-chip').forEach((chip) => {
        chip.addEventListener('click', (e) => {
            input.value = e.target.textContent.trim();
            handleSend();
        });
    });
};
