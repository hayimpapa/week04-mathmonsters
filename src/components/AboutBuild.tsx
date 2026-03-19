import React from 'react';

const GITHUB_REPO = 'https://github.com/hayimpapa/week04-mathmonsters';
const CLAUDE_MD_URL = 'https://github.com/hayimpapa/week04-mathmonsters/blob/main/CLAUDE.md';

const Section: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div className="mb-6">
    <p className="text-xs font-bold tracking-widest text-purple-400 uppercase mb-2">{label}</p>
    {children}
  </div>
);

const AboutBuild: React.FC = () => (
  <div className="bg-white rounded-2xl shadow-lg p-6">
    <Section label="The Problem">
      <p className="text-gray-700 leading-relaxed">
        Young children often struggle to stay engaged with maths practice outside the
        classroom. Traditional worksheets and flashcard apps feel like homework rather
        than play, leading to low motivation and short attention spans. Parents want
        something their child will genuinely enjoy, while teachers need the content to
        align with curriculum expectations. There is a clear gap between what children
        find fun and what most educational apps actually offer.
      </p>
    </Section>

    <Section label="The App">
      <p className="text-gray-700 leading-relaxed">
        Math Monsters is a browser-based maths game for children aged 5–10. Players
        choose a monster companion and answer 10 questions per session across three
        difficulty levels: Starter (numbers 1–5), Explorer (1–10), and Champion (1–20).
        Correct answers earn Munch Coins to spend in a monster accessory shop, and
        monsters evolve as players accumulate correct answers over time. Questions are
        read aloud using the Web Speech API. No login or backend is required — all
        progress is stored locally in the browser.
      </p>
    </Section>

    <Section label="The Prompt">
      <a
        href={CLAUDE_MD_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 bg-purple-50 hover:bg-purple-100 text-purple-700 font-semibold py-3 px-5 rounded-xl border border-purple-200 transition-colors"
      >
        <span>📄</span>
        <span>View the prompt used to build this app</span>
      </a>
    </Section>

    <Section label="GitHub Repo">
      <a
        href={GITHUB_REPO}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-700 text-white font-semibold py-3 px-5 rounded-xl transition-colors"
      >
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
        </svg>
        <span>View on GitHub</span>
      </a>
    </Section>
  </div>
);

export default AboutBuild;
