import { renderTo } from './utils/dom.js';
import { homeView, attachHomeEvents } from './components/home.js';
import { timelineView, attachTimelineEvents } from './components/timeline.js';
import { assistantView, attachAssistantEvents } from './components/assistant.js';
import { learningView } from './components/learning.js';
import { guidanceView, attachGuidanceEvents } from './components/guidance.js';
import { settingsView, attachSettingsEvents } from './components/settings.js';

export { renderTo };

export const views = {
    home: homeView,
    timeline: timelineView,
    assistant: assistantView,
    learning: learningView,
    guidance: guidanceView,
    settings: settingsView,
};

export const attachEvents = (currentRoute) => {
    if (currentRoute === 'home') attachHomeEvents();
    if (currentRoute === 'timeline') attachTimelineEvents();
    if (currentRoute === 'assistant') attachAssistantEvents();
    if (currentRoute === 'guidance') attachGuidanceEvents();
    if (currentRoute === 'settings') attachSettingsEvents();
};
