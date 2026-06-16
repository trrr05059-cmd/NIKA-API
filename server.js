require('dotenv').config();

const express = require('express');
const app = express();

const GROQ_API_KEY = process.env.GROQ_API_KEY;

app.get('/api/ai-pro', async (req, res) => {
    try {
        const text = req.query.text;
        if (!text) {
            return res.json({
                status: false,
                error: '⚠️ خاصك دير text= فـ الرابط',
                example: '/api/ai-pro?text=سلام',
                developer: '𝑁𝐼𝐾𝐴 𝐷𝐸𝑉 🌥️⃝⃕𝆺𝅥𝆹𝅥',
                country: '🇲🇦 المغرب'
            });
        }

        if (!GROQ_API_KEY) {
            return res.status(500).json({
                status: false,
                error: '⚠️ GROQ_API_KEY ماشي معرف فـ environment variables'
            });
        }

        const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${GROQ_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'llama-3.3-70b-versatile',
                messages: [{ role: 'user', content: text }]
            })
        });

        const data = await groqRes.json();

        if (!groqRes.ok) {
            throw new Error(data.error?.message || 'Groq API error');
        }

        res.json({
            status: true,
            result: data.choices[0].message.content,
            developer: '𝑁𝐼𝐾𝐴 𝐷𝐸𝑉 🌥️⃝⃕𝆺𝅥𝆹𝅥',
            country: '🇲🇦 المغرب',
            api: '𝑁𝐼𝐾𝐴 AI'
        });
    } catch (e) {
        res.json({
            status: false,
            error: e.message,
            developer: '𝑁𝐼𝐾𝐴 𝐷𝐸𝑉 🌥️⃝⃕𝆺𝅥𝆹𝅥'
        });
    }
});

if (require.main === module) {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;
