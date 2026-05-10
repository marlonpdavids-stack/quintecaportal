// Netlify serverless function to proxy Trello API requests
exports.handler = async (event) => {
  const TRELLO_API_KEY = '3651b6374e8b6a076f81f9708fe89485';
  const TRELLO_TOKEN = '5e703bf5717baaaf299c128ce0bbced8540135a58624116c2dcd248fe181427e';
  const BOARD_ID = 'mvElxetI';

  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    const endpoint = event.queryStringParameters?.endpoint || 'board';
    let url;

    switch (endpoint) {
      case 'board':
        url = `https://api.trello.com/1/boards/${BOARD_ID}?key=${TRELLO_API_KEY}&token=${TRELLO_TOKEN}`;
        break;
      case 'lists':
        url = `https://api.trello.com/1/boards/${BOARD_ID}/lists?key=${TRELLO_API_KEY}&token=${TRELLO_TOKEN}`;
        break;
      case 'cards':
        url = `https://api.trello.com/1/boards/${BOARD_ID}/cards?key=${TRELLO_API_KEY}&token=${TRELLO_TOKEN}`;
        break;
      default:
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Invalid endpoint' })
        };
    }

    // Use global fetch (available in Node 18+)
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Trello API error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(data)
    };

  } catch (error) {
    console.error('Function error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message })
    };
  }
};
