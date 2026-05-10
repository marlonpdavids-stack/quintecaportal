// Netlify serverless function for AI assistant
exports.handler = async (event) => {
  const ANTHROPIC_API_KEY = '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';

  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { question, context, projectName } = JSON.parse(event.body);

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1024,
        messages: [{
          role: 'user',
          content: `You are a helpful assistant for Quinteca, a premium smart home installation company serving high-net-worth clients on the Lisbon coast. A client is checking their project status page and has a question.

Current project: ${projectName}

Current status:
${context}

Client question: ${question}

Provide a helpful, concise, professional answer based on the current task status. Be warm but efficient. If a task isn't listed or you don't have specific information, acknowledge that and offer to have the team follow up. Never make up dates or details that aren't in the task list.`
        }]
      })
    });

    const data = await response.json();
    const answer = data.content[0].text;

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ answer })
    };

  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message })
    };
  }
};
