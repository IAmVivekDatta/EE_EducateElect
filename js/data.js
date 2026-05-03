export const electionData = {
    personas: [
        {
            id: 'first-time',
            label: 'First-time Voter',
            icon: 'verified_user',
            greeting: "Welcome to your first election! We'll guide you through the basics step-by-step.",
            emphasis: ['registration', 'voting-day'],
        },
        {
            id: 'returning',
            label: 'Returning Voter',
            icon: 'replay',
            greeting: "Welcome back! Let's quickly review the timeline and what's new.",
            emphasis: ['verification', 'candidates'],
        },
        {
            id: 'student',
            label: 'Student Learner',
            icon: 'school',
            greeting: "Ready to learn? We'll explore how the election process works with clear definitions.",
            emphasis: ['all', 'glossary'],
        },
        {
            id: 'volunteer',
            label: 'Election Volunteer',
            icon: 'volunteer_activism',
            greeting: 'Thank you for helping out! Here is the structural process to assist others.',
            emphasis: ['process', 'post-vote'],
        },
        {
            id: 'general',
            label: 'General Voter',
            icon: 'person',
            greeting: 'Here is your standard civic guide to the upcoming election.',
            emphasis: ['standard'],
        },
    ],

    timeline: [
        {
            id: 'step-1',
            title: 'Registration & Eligibility',
            summary: 'Ensure you are legally allowed to vote and registered.',
            description:
                'Before voting, you must be registered. Eligibility usually requires being a citizen of a certain age. Deadlines to register are often weeks before election day.',
            commonQuestion: 'How do I know if I am eligible?',
            commonAnswer:
                'Eligibility requirements vary, but typically you must be a citizen, at least 18 years old, and a resident of your voting district.',
            action: 'Check your local election website to verify your registration status.',
            personaContext: {
                'first-time':
                    'This is your most important first step! You cannot vote if you miss the registration deadline.',
                student: 'Eligibility is the legal baseline for participation in a democracy.',
            },
        },
        {
            id: 'step-2',
            title: 'Voter List Verification',
            summary: 'Confirm your name is on the electoral roll.',
            description:
                'Election officials maintain a list of registered voters. You should verify your details are correct (name, address) so there are no issues on voting day.',
            commonQuestion: 'What if my name is missing?',
            commonAnswer:
                'If your name is missing, contact your local election office immediately. You may need to provide proof of identity or residency.',
            action: 'Search the online voter roll provided by your election authority.',
            personaContext: {
                returning: 'If you recently moved, make sure your address is updated on the voter list.',
            },
        },
        {
            id: 'step-3',
            title: 'Candidate Awareness',
            summary: 'Learn who is running and what they stand for.',
            description:
                'Review the candidates, parties, or ballot measures. Reliable sources include official candidate websites, neutral voter guides, and public debates.',
            commonQuestion: 'Where can I find unbiased information?',
            commonAnswer:
                'Look for non-partisan civic organizations, official voter pamphlets, and verified debate transcripts.',
            action: 'Read a neutral voter guide for your district.',
            personaContext: {
                student: 'Focus on understanding the platforms and policies rather than just the rhetoric.',
                volunteer: 'Help voters find reliable sources of information without telling them who to vote for.',
            },
        },
        {
            id: 'step-4',
            title: 'Polling Preparation',
            summary: 'Plan your voting day logistics.',
            description:
                'Find your polling location, check the opening hours, and gather any required ID. Decide if you will vote in person, early, or by mail (if applicable).',
            commonQuestion: 'What do I need to bring?',
            commonAnswer:
                'Requirements vary by region. Many places require a government-issued photo ID, while others may just require a voter card or signature.',
            action: 'Locate your polling station on a map and plan your transit.',
            personaContext: {
                'first-time': 'Make a plan! Decide what time you will go and how you will get there.',
                general: 'Consider voting during off-peak hours to avoid long lines.',
            },
        },
        {
            id: 'step-5',
            title: 'Voting Day',
            summary: 'Cast your ballot securely and privately.',
            description:
                'Go to your polling place, verify your identity with poll workers, receive your ballot, and mark your choices in a private booth. Then submit your ballot.',
            commonQuestion: 'What if I make a mistake on my ballot?',
            commonAnswer:
                'Do not panic. Ask a poll worker for a replacement ballot (often called a "spoiled ballot" process).',
            action: 'Cast your vote and collect your "I Voted" sticker if available!',
            personaContext: {
                volunteer:
                    'Your role today is to ensure lines move smoothly and voters feel confident and un-intimidated.',
                'first-time': 'Take your time in the booth. There is no rush.',
            },
        },
        {
            id: 'step-6',
            title: 'Post-Vote & Results',
            summary: 'Understand how votes are counted and certified.',
            description:
                'After polls close, ballots are securely transported and counted. Initial results are often projected, but official certification takes days or weeks.',
            commonQuestion: 'Why does counting take so long?',
            commonAnswer:
                'Elections prioritize accuracy over speed. Counting mail-in, provisional, and overseas ballots carefully takes time to ensure every valid vote is counted.',
            action: 'Follow official election authority channels for certified results.',
            personaContext: {
                student:
                    'Notice the difference between media "projections" and official legal "certification" of results.',
            },
        },
    ],

    faqs: [
        {
            q: 'What is the election process?',
            a: 'The election process is the formal system where citizens choose their representatives or decide on policies. It involves registration, campaigning, voting, and counting.',
        },
        {
            q: 'What happens before voting day?',
            a: 'Before voting day, citizens register to vote, verify their details, research candidates, and find their polling locations. Campaigns also hold rallies and debates.',
        },
        {
            q: 'What happens after votes are cast?',
            a: 'Votes are securely collected and counted by election officials. Preliminary results are announced, followed by audits, and finally official certification.',
        },
        {
            q: 'How does counting work?',
            a: 'Depending on the system, ballots are either counted electronically by secure machines or hand-counted by trained workers, with observers from multiple parties present to ensure fairness.',
        },
        {
            q: 'What should a first-time voter know?',
            a: "Register early, know where your polling place is, bring required ID, and research the ballot ahead of time. Don't be afraid to ask poll workers for help with the process.",
        },
    ],

    suggestedPrompts: [
        'Explain the timeline to me',
        'What do I bring to the polling station?',
        'How are mail-in ballots verified?',
        'What is voter verification?',
        'How can I volunteer?',
    ],

    learningHub: [
        {
            id: 'basics',
            title: 'Election Basics',
            icon: 'auto_stories',
            content:
                'Elections are the cornerstone of democratic societies. They provide a peaceful mechanism for citizens to choose their leaders and influence public policy. Key principles include universal suffrage, secret ballots, and regular election cycles.',
        },
        {
            id: 'voting',
            title: 'The Voting Process',
            icon: 'how_to_vote',
            content:
                'The actual voting process involves verifying your identity, receiving a ballot, making your selections privately in a booth, and submitting the ballot into a secure box or electronic scanner.',
        },
        {
            id: 'counting',
            title: 'Counting & Certification',
            icon: 'fact_check',
            content:
                'Once polls close, ballots are transported under secure chain-of-custody rules. Votes are tabulated, often with representatives from multiple parties observing. Official certification only happens after all valid votes are counted and audits are completed.',
        },
        {
            id: 'myths',
            title: 'Myths vs. Facts',
            icon: 'gpp_maybe',
            content:
                '<ul><li><strong>Myth:</strong> Media calls the winner, making it official. <br><strong>Fact:</strong> Media only projects winners based on early data. Only election officials can legally certify results.</li><li><strong>Myth:</strong> Mail-in voting is inherently fraudulent. <br><strong>Fact:</strong> Mail-in ballots undergo strict signature verification and barcode tracking to prevent fraud.</li></ul>',
        },
    ],

    decisionFlow: {
        start: {
            question: 'Where are you currently in the election process?',
            options: [
                { text: "I haven't registered yet", next: 'register' },
                { text: "I'm registered, but don't know who to vote for", next: 'research' },
                { text: 'I know who to vote for, but need logistics', next: 'logistics' },
                { text: "I've already voted", next: 'post_vote' },
            ],
        },
        register: {
            question: 'Registration is your first step! Do you know your local eligibility requirements?',
            options: [
                {
                    text: 'Yes, I need to check my status',
                    action: 'Navigate to your local state/district election portal.',
                },
                {
                    text: 'No, what are the basics?',
                    action: 'Usually: 18+ years old, citizen, and resident of the district. Check Step 1 in the timeline!',
                },
            ],
        },
        research: {
            question: 'Are you looking for party platforms or individual candidate records?',
            options: [
                { text: 'Party Platforms', action: 'Visit official party websites for their documented platforms.' },
                {
                    text: 'Individual Candidates',
                    action: 'Search for non-partisan voter guides like Vote411 or local debate transcripts.',
                },
            ],
        },
        logistics: {
            question: 'How do you plan to vote?',
            options: [
                {
                    text: 'In Person on Election Day',
                    action: 'Find your polling place, check hours, and gather your ID.',
                },
                {
                    text: 'By Mail',
                    action: 'Request your ballot before the deadline, follow instructions carefully, and sign the envelope.',
                },
            ],
        },
        post_vote: {
            question: "Thank you for voting! What's next for you?",
            options: [
                {
                    text: 'Track results',
                    action: 'Follow official state election websites for certified tallies, not just early media projections.',
                },
                { text: 'Get involved', action: 'Consider volunteering as a poll worker for the next election!' },
            ],
        },
    },
};
