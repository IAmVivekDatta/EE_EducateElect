import { electionData } from '../js/data.js';

describe('Data Graph Validation', () => {
    it('should have properly structured personas', () => {
        expect(electionData.personas.length).toBeGreaterThan(0);
        electionData.personas.forEach((persona) => {
            expect(persona).toHaveProperty('id');
            expect(persona).toHaveProperty('label');
            expect(persona).toHaveProperty('greeting');
            expect(persona).toHaveProperty('icon');
        });
    });

    it('should have a properly structured timeline', () => {
        expect(electionData.timeline.length).toBeGreaterThan(0);
        electionData.timeline.forEach((step) => {
            expect(step).toHaveProperty('id');
            expect(step).toHaveProperty('title');
            expect(step).toHaveProperty('summary');
            expect(step).toHaveProperty('personaContext');
        });
    });

    it('should have a robust decision flow', () => {
        expect(Object.keys(electionData.decisionFlow).length).toBeGreaterThan(0);
        expect(electionData.decisionFlow).toHaveProperty('start');
        expect(electionData.decisionFlow.start).toHaveProperty('options');
    });
});
