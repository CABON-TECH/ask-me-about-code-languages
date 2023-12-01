/*const openai = require('openai');

// Configure OpenAI with your API key
const openaiApiKey = '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';
const openaiClient = new openai.OpenAIAPI(openaiApiKey);

// Function to call OpenAI API
const getOpenAIAnswer = async (question) => {
  try {
    const prompt = `Question: ${question}\nAnswer:`;
    const response = await openaiClient.complete({
      engine: 'text-davinci-002', // Choose the engine based on your requirements
      prompt,
      max_tokens: 5000, // Adjust based on the desired answer length
    });

    const answer = response.choices[0].text.trim();
    return answer;
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    throw error;
  }
};

module.exports = {
  getOpenAIAnswer,
};*/

/*const OpenAI = require('openai');



// Configure OpenAI with your API key
const openaiApiKey = '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';
const openai = new OpenAI({ apiKey: openaiApiKey });

// Function to call OpenAI API
const getOpenAIAnswer = async (question) => {
  try {
    const prompt = `Question: ${question}\nAnswer:`;
    const params = {
      engine: 'text-davinci-002', // Choose the engine based on your requirements
      prompt,
      max_tokens: 5000, // Adjust based on the desired answer length
    };

    const response = await openai.Completions.create(params);

    const answer = response.choices[0].text.trim();
    return answer;
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    throw error;
  }
};


module.exports = {
  getOpenAIAnswer,
};*/
const OpenAI = require('openai');

// Configure OpenAI with your API key
const openaiApiKey = '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';
const openai = new OpenAI({ apiKey: openaiApiKey });

// Function to call OpenAI API
const getOpenAIAnswer = async (question) => {
  try {
    const prompt = `Question: ${question}\nAnswer:`;

    // Ensure that the openai.chat.completions property exists
    if (!openai.chat || !openai.chat.completions || !openai.chat.completions.create) {
      throw new Error('OpenAI API is not properly configured.');
    }

    // Use openai.chat.completions.create to interact with the chat model
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'system', content: 'You are a helpful assistant.' }, { role: 'user', content: prompt }],
    });

    const answer = response.choices[0].message.content.trim();
    return answer;
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    throw error;
  }
};

module.exports = {
  getOpenAIAnswer,
};
