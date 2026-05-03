import { state, setPersona, setApiKey, setActiveTimelineStep, setUser } from '../js/state.js';

describe('State Management', () => {
    beforeEach(() => {
        localStorage.clear();
        jest.clearAllMocks();
        
        // Reset state for clean testing
        state.selectedPersona = 'general';
        state.geminiApiKey = '';
        state.user = null;
        state.activeTimelineStep = null;
    });

    test('setPersona updates state and localStorage', () => {
        setPersona('first-time');
        expect(state.selectedPersona).toBe('first-time');
        expect(localStorage.getItem('votePath_persona')).toBe('first-time');
    });

    test('setApiKey updates state and localStorage', () => {
        setApiKey('test-key-123');
        expect(state.geminiApiKey).toBe('test-key-123');
        expect(localStorage.getItem('votePath_geminiApiKey')).toBe('test-key-123');
    });

    test('setActiveTimelineStep updates state', () => {
        setActiveTimelineStep('step-2');
        expect(state.activeTimelineStep).toBe('step-2');
    });

    test('setUser updates the state', () => {
        const mockUser = { uid: '123', displayName: 'Test User' };
        setUser(mockUser);
        expect(state.user).toEqual(mockUser);
    });
});
