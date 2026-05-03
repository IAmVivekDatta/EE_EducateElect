import { state } from './state.js';
import { electionData } from './data.js';

// Gemini API Configuration and Logic
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

// Security: Escapes HTML tags in user input to prevent XSS.
function escapeHTML(str) {
    const temp = document.createElement('div');
    temp.textContent = str;
    return temp.innerHTML;
}

export const generateAssistantResponse = async (query) => {
    const lowerQuery = query.toLowerCase();

    // 1. If API Key is configured, use Gemini
    if (state.geminiApiKey) {
        try {
            return await callGeminiAPI(query);
        } catch (error) {
            console.error('Gemini API Error:', error);
            return `<em>API Error: Falling back to internal knowledge base.</em><br><br>` + getInternalFallbackResponse(query, lowerQuery);
        }
    }

    // 2. Fallback: Internal Knowledge Base (No API Key)
    return getInternalFallbackResponse(query, lowerQuery);
};

async function callGeminiAPI(query) {
    const persona = electionData.personas.find(p => p.id === state.selectedPersona);
    
    const systemPrompt = `You are VotePath AI, an educational, strictly neutral, non-partisan assistant explaining the election process. 
You are currently speaking to a user with the persona: ${persona.label}. 
Ensure your answer is simple, structured, safe, and avoids any political opinions, predictions, or legal advice. Format your output with safe HTML (like <strong>, <ul>, <br>) for readability. Do not use markdown blocks like \`\`\`.

User Question: ${query}`;

    const response = await fetch(`${API_URL}?key=${state.geminiApiKey}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            contents: [{ parts: [{ text: systemPrompt }] }],
            generationConfig: {
                temperature: 0.2,
                maxOutputTokens: 250,
            }
        })
    });

    if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    if (data.candidates && data.candidates[0] && data.candidates[0].content) {
        let text = data.candidates[0].content.parts[0].text;
        // Basic cleanup of markdown artifacts that Gemini might output despite instructions
        text = text.replace(/```html/g, '').replace(/```/g, '');
        // We trust Gemini output to some extent here for basic formatting, so we don't escape it fully.
        // The view layer will render this as HTML.
        return text; 
    }
    
    throw new Error('Unexpected API response structure');
}

function getInternalFallbackResponse(query, lowerQuery) {
    // Exact/partial match FAQs
    for (const faq of electionData.faqs) {
        if (lowerQuery.includes(faq.q.toLowerCase()) || faq.q.toLowerCase().includes(lowerQuery)) {
            return `<strong>Regarding: ${faq.q}</strong><br><br>${faq.a}`;
        }
    }
    
    // Keyword match timeline
    for (const step of electionData.timeline) {
        if (lowerQuery.includes(step.title.toLowerCase()) || 
            (lowerQuery.includes('register') && step.id === 'step-1') ||
            (lowerQuery.includes('vote') && step.id === 'step-5')) {
            return `I can help with that. Looking at the <strong>${step.title}</strong> stage: <br><br>${step.description} <br><br><em>(Check the Timeline screen for more details)</em>`;
        }
    }

    const persona = electionData.personas.find(p => p.id === state.selectedPersona);
    return `That's a good question. As a ${persona.label}, you should know that elections are structured processes. While I don't have a specific pre-written answer for "${escapeHTML(query)}", I recommend checking the Learning Hub or navigating to the Timeline screen to explore the steps. <br><br><em>(For advanced AI answers, connect your Gemini API key in Settings)</em>`;
}
