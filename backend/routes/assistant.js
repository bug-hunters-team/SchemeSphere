import express from 'express';

const router = express.Router();
const languageNames = {
  en: 'English',
  hi: 'Hindi',
  bn: 'Bengali',
  te: 'Telugu',
  mr: 'Marathi',
  ta: 'Tamil',
  gu: 'Gujarati',
  kn: 'Kannada',
};

router.post('/chat', async (req, res) => {
  const { question, language } = req.body || {};
  if (typeof question !== 'string' || !question.trim() || question.trim().length > 2000) {
    return res.status(400).json({ error: 'Enter a question of 1 to 2,000 characters.' });
  }
  if (typeof language !== 'string' || !Object.hasOwn(languageNames, language)) {
    return res.status(400).json({ error: 'Choose a supported response language.' });
  }
  if (!process.env.AI_API_KEY) {
    return res.status(503).json({
      code: 'AI_NOT_CONFIGURED',
      error: 'AI responses are not configured on this server.',
    });
  }

  const endpoint = process.env.AI_API_URL || 'https://api.openai.com/v1/chat/completions';
  const model = process.env.AI_MODEL || 'gpt-4o-mini';

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.AI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        messages: [
          {
            role: 'system',
            content: `Respond only in ${languageNames[language]}. Explain government scheme information in simple language. Do not invent eligibility rules, benefits, deadlines, or approval outcomes. If information is uncertain, say so and direct the user to the relevant official government portal. Do not ask for Aadhaar numbers, passwords, or other sensitive identifiers.`,
          },
          { role: 'user', content: question.trim() },
        ],
        temperature: 0.2,
      }),
      signal: AbortSignal.timeout(20000),
    });

    if (!response.ok) {
      console.error(`[SchemeSphere AI] Provider returned HTTP ${response.status}.`);
      return res.status(502).json({ error: 'The AI provider could not answer right now. Please try again later.' });
    }

    const data = await response.json();
    const answer = data.choices?.[0]?.message?.content;
    if (typeof answer !== 'string' || !answer.trim()) {
      console.error('[SchemeSphere AI] Provider returned no answer.');
      return res.status(502).json({ error: 'The AI provider returned an empty answer. Please try again.' });
    }

    return res.json({ success: true, answer: answer.trim(), language });
  } catch (error) {
    console.error('[SchemeSphere AI] Request failed:', error.message);
    return res.status(502).json({ error: 'The AI provider is unavailable. Please try again later.' });
  }
});

export default router;
