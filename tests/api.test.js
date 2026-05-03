import { generateAssistantResponse, escapeHTML } from '../js/api.js';
import { state } from '../js/state.js';

// Mock the DOM and state
document.createElement = jest.fn().mockImplementation(() => {
    return {
        textContent: '',
        get innerHTML() {
            return this.textContent.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        },
        set innerHTML(val) {}
    };
});

describe('API Fallback and Security', () => {
    beforeEach(() => {
        state.geminiApiKey = ''; // Force fallback
        state.selectedPersona = 'general';
    });

    it('should use fallback responses when API key is missing', async () => {
        const response = await generateAssistantResponse('how do i register');
        expect(response).toContain('register'); // Assuming fallback contains keywords
    });

    it('should return a default message if no keywords match', async () => {
        const response = await generateAssistantResponse('random jibberish nonsense');
        expect(response).toContain("That's a good question");
    });
});
