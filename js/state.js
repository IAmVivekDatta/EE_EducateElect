// Centralized State Management

/**
 * @typedef {Object} ChatMessage
 * @property {'system'|'assistant'|'user'} sender - The sender of the message
 * @property {string} text - The message content
 * @property {boolean} [isHTML] - Whether the text contains HTML
 */

/**
 * @typedef {Object} AppState
 * @property {string} selectedPersona - The current user persona
 * @property {string} geminiApiKey - The user's Gemini API key
 * @property {Object|null} user - The authenticated Firebase user
 * @property {string|null} activeTimelineStep - The ID of the currently expanded timeline step
 * @property {string} decisionFlowCurrentNode - The current node ID in the guidance flow
 * @property {ChatMessage[]} chatHistory - The chat history array
 */

/**
 * The central state store for the application.
 * @type {AppState}
 */
export const state = {
    selectedPersona: localStorage.getItem('votePath_persona') || 'general',
    geminiApiKey: localStorage.getItem('votePath_geminiApiKey') || '',
    user: null, // Firebase user
    activeTimelineStep: null,
    decisionFlowCurrentNode: 'start',
    chatHistory: [
        { sender: 'system', text: "Hello! I'm VotePath AI. How can I help you understand the election process today?" },
    ],
};

/**
 * Updates the user's selected persona and persists it to localStorage.
 * @param {string} personaId - The ID of the selected persona
 */
export const setPersona = (personaId) => {
    state.selectedPersona = personaId;
    localStorage.setItem('votePath_persona', personaId);
};

/**
 * Updates the Gemini API key and persists it to localStorage.
 * @param {string} key - The Gemini API key provided by the user
 */
export const setApiKey = (key) => {
    state.geminiApiKey = key.trim();
    if (state.geminiApiKey) {
        localStorage.setItem('votePath_geminiApiKey', state.geminiApiKey);
    } else {
        localStorage.removeItem('votePath_geminiApiKey');
    }
};

/**
 * Sets the currently active timeline step.
 * @param {string|null} stepId - The ID of the step to activate
 */
export const setActiveTimelineStep = (stepId) => {
    state.activeTimelineStep = stepId;
};

/**
 * Updates the current node in the Smart Guidance decision tree.
 * @param {string} nodeId - The ID of the decision node
 */
export const setDecisionFlowNode = (nodeId) => {
    state.decisionFlowCurrentNode = nodeId;
};

/**
 * Appends a new message to the chat history.
 * @param {'system'|'assistant'|'user'} sender - The sender of the message
 * @param {string} text - The message content
 * @param {boolean} [isHTML=false] - Whether the text contains safe HTML
 */
export const addChatMessage = (sender, text, isHTML = false) => {
    state.chatHistory.push({ sender, text, isHTML });
};

/**
 * Sets the authenticated Firebase user.
 * @param {Object|null} user - The Firebase Auth user object
 */
export const setUser = (user) => {
    state.user = user;
};
