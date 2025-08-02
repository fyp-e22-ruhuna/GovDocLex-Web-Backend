const { getRAGResponse } = require('../services/ragService');

const handleQuestion = async (req, res) => {
  try {
    const { question } = req.body;
    
    if (!question) {
      return res.status(400).json({ error: "Question is required" });
    }

    const ragResponse = await getRAGResponse(question);
    
    if (!ragResponse.success) {
      return res.status(502).json({ error: ragResponse.error });
    }

    console.log('Controller Response:', ragResponse.data);

    res.json({
      answer: ragResponse.data,
      sources: ragResponse.data.sources
    });

  } catch (error) {
    console.error('Controller Error:', error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { handleQuestion };
