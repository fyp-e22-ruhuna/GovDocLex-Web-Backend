const axios = require('axios');

const getRAGResponse = async (question) => {
    console.log('RAG Service Request:', question);
  try {
    const response = await axios.post('http://localhost:8000/chat', {
      message: question
    });
    console.log('RAG Service Response:', response.data);
    console.log('RAG Service Response:', JSON.stringify(response.data, null, 2));



    return {
      success: true,
      data: response.data
    };

  } catch (error) {
    console.error('RAG Service Error:', error.message);
    return {
      success: false,
      error: 'Failed to get response from RAG system'
    };
  }
};

module.exports = { getRAGResponse };


