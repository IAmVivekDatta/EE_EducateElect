// Centralized State Management

export const state = {
    selectedPersona: localStorage.getItem('votePath_persona') || 'general',
    geminiApiKey: localStorage.getItem('votePath_geminiApiKey') || '',
    activeTimelineStep: null,
    decisionFlowCurrentNode: 'start',
    chatHistory: [
        { sender: 'system', text: "Hello! I'm VotePath AI. How can I help you understand the election process today?" }
    ]
};

export const setPersona = (personaId) => {
    state.selectedPersona = personaId;
    localStorage.setItem('votePath_persona', personaId);
};

export const setApiKey = (key) => {
    state.geminiApiKey = key.trim();
    if (state.geminiApiKey) {
        localStorage.setItem('votePath_geminiApiKey', state.geminiApiKey);
    } else {
        localStorage.removeItem('votePath_geminiApiKey');
    }
};

export const setActiveTimelineStep = (stepId) => {
    state.activeTimelineStep = stepId;
};

export const setDecisionFlowNode = (nodeId) => {
    state.decisionFlowCurrentNode = nodeId;
};

export const addChatMessage = (sender, text, isHTML = false) => {
    state.chatHistory.push({ sender, text, isHTML });
};
