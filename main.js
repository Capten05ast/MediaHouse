







// // Mock news data (to avoid API issues)
// const mockNewsData = {
//     "technology": [
//         {
//             title: "New AI Breakthrough in Natural Language Processing",
//             description: "Researchers have developed a new AI model that understands context better than ever before.",
//             url: "https://example.com/ai-news"
//         },
//         {
//             title: "SpaceX Successfully Launches 60 More Starlink Satellites",
//             description: "The latest launch brings the total number of Starlink satellites in orbit to over 1,500.",
//             url: "https://example.com/spacex-news"
//         },
//         {
//             title: "Apple Announces New M2 Chip for Macs",
//             description: "The M2 chip promises significant performance improvements over its predecessor.",
//             url: "https://example.com/apple-news"
//         }
//     ],
//     "sports": [
//         {
//             title: "Local Team Wins Championship in Thrilling Finale",
//             description: "In a nail-biting finish, the underdogs clinched victory in the final seconds of the game.",
//             url: "https://example.com/sports-news"
//         },
//         {
//             title: "Olympic Committee Announces New Sports for 2028 Games",
//             description: "Several new sports will be added to the Olympic program, including esports and climbing.",
//             url: "https://example.com/olympic-news"
//         },
//         {
//             title: "Star Player Signs Record-Breaking Contract",
//             description: "The multi-year deal is set to make history as the largest in the sport's history.",
//             url: "https://example.com/contract-news"
//         }
//     ],
//     "politics": [
//         {
//             title: "New Environmental Bill Passes in Senate",
//             description: "The landmark bill aims to significantly reduce carbon emissions over the next decade.",
//             url: "https://example.com/politics-news"
//         },
//         {
//             title: "International Summit on Climate Change Begins",
//             description: "World leaders gather to discuss urgent action on global warming and its effects.",
//             url: "https://example.com/climate-news"
//         },
//         {
//             title: "Local Elections See Record Turnout",
//             description: "Voter participation reaches an all-time high in recent local elections across the country.",
//             url: "https://example.com/election-news"
//         }
//     ]
// };

// // GNews API configuration
// // const NEWS_API_KEY = 'f72f2df3c5ed34cff451c46cb2d3abe1'; // Replace with your actual GNews API key
// // const NEWS_API_URL = 'https://gnews.io/api/v4/search';

// const NEWS_API_KEY = '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'; // Replace with your actual GNews API key
// const NEWS_API_URL = 'https://api.groq.com/openai/v1/chat/completions';


// async function fetchNews(query) {
//     try {
//         const response = await fetch(`${NEWS_API_URL}?q=${query}&token=${NEWS_API_KEY}&lang=en`);
//         const data = await response.json();
//         return data.articles;
//     } catch (error) {
//         console.error('Error fetching news:', error);
//         return [];
//     }
// }

// function toggleChatbot() {
//     const chatbot = document.querySelector('.chatbot');
//     chatbot.style.display = chatbot.style.display === 'none' || chatbot.style.display === '' ? 'flex' : 'none';
// }

// function performSearch() {
//     const query = document.getElementById('search-input').value.trim();
//     if (query) {
//         alert(`Searching for: ${query}`);
//         // Implement search functionality here
//     }
// }

// async function sendMessage() {
//     const input = document.querySelector('.chatbot-input input');
//     const messages = document.querySelector('.chatbot-messages');
//     const userMessage = input.value.trim();

//     if (userMessage) {
//         // User message
//         const userMessageDiv = document.createElement('div');
//         userMessageDiv.className = 'message-user';

//         const userIcon = document.createElement('img');
//         userIcon.src = 'user.png';
//         userIcon.alt = 'User';

//         const userText = document.createElement('div');
//         userText.className = 'text';
//         userText.textContent = userMessage;

//         userMessageDiv.appendChild(userText);
//         userMessageDiv.appendChild(userIcon);
//         messages.appendChild(userMessageDiv);

//         // Bot message
//         const botMessage = document.createElement('div');
//         botMessage.className = 'message-bot';

//         const botIcon = document.createElement('img');
//         botIcon.src = 'bot.jpg';
//         botIcon.alt = 'Bot';

//         const botText = document.createElement('div');
//         botText.className = 'text';
//         botText.textContent = 'Searching for news...';

//         botMessage.appendChild(botIcon);
//         botMessage.appendChild(botText);
//         messages.appendChild(botMessage);

//         // Fetch news
//         const newsArticles = await fetchNews(userMessage);
//         if (newsArticles.length > 0) {
//             botText.textContent = `Here are the top 3 news articles related to "${userMessage}":`;
//             newsArticles.slice(0, 3).forEach((article, index) => {
//                 const articleDiv = document.createElement('div');
//                 articleDiv.className = 'news-article';
//                 articleDiv.innerHTML = `
//                     <p><strong>${index + 1}. ${article.title}</strong></p>
//                     <p>${article.description}</p>
//                     <a href="${article.url}" target="_blank">Read more</a>
//                 `;
//                 botMessage.appendChild(articleDiv);
//             });
//         } else {
//             botText.textContent = `I'm sorry, I couldn't find any news related to "${userMessage}". Can you try a different topic?`;
//         }

//         input.value = '';
//         messages.scrollTop = messages.scrollHeight;
//     }
// }

// const trendingContainer = document.getElementById('trending-container');

// function loadTrendingTopics() {
//     const apiData = [
//         {
//             title: "Breakthrough in Cancer Research",
//             image: "medical.jpg",
//             summary: "Scientists have developed a promising new therapy showing significant progress in treating advanced cancers.",
//         },
//         {
//             title: "Global Climate Summit 2024",
//             image: "global_climate.png",
//             summary: "World leaders convene to tackle pressing climate issues and pledge a record-breaking $1 trillion for green initiatives.",
//         },
//         {
//             title: "Mars Mission: Human Habitats in Space",
//             image: "mars.jpg",
//             summary: "NASA unveils plans to establish the first human habitats on Mars by 2030. Here's what we know so far.",
//         },
//         {
//             title: "Gukesh: The Youngest Chess King Crowned",
//             image: "chess.jpg",
//             summary: "Gukesh Dommaraju, at 18, becomes the youngest World Chess Champion, marking a new era in chess history.",
//         }
//     ];

//     apiData.forEach(topic => {
//         const card = document.createElement('div');
//         card.className = 'card';

//         const image = document.createElement('img');
//         image.src = topic.image;
//         image.alt = topic.title;

//         const content = document.createElement('div');
//         content.className = 'card-content';

//         const title = document.createElement('h3');
//         title.textContent = topic.title;

//         const summary = document.createElement('p');
//         summary.textContent = topic.summary;

//         content.appendChild(title);
//         content.appendChild(summary);
//         card.appendChild(image);
//         card.appendChild(content);
//         trendingContainer.appendChild(card);
//     });
// }

// document.addEventListener('DOMContentLoaded', () => {
//     loadTrendingTopics();
    
//     // Set up event listeners
//     document.querySelector('.chatbot-icon').addEventListener('click', toggleChatbot);
//     document.querySelector('.chatbot-input button').addEventListener('click', sendMessage);
//     document.getElementById('search-input').addEventListener('keypress', (e) => {
//         if (e.key === 'Enter') {
//             performSearch();
//         }
//     });

//     // Add event listener for chatbot input
//     document.querySelector('.chatbot-input input').addEventListener('keypress', (e) => {
//         if (e.key === 'Enter') {
//             sendMessage();
//         }
//     });
// });
























// // Cognitive Search configuration
// const SEARCH_SERVICE_NAME = 'mediacogsearch'; // Replace with your actual service name
// const SEARCH_INDEX_NAME = 'mediahouse333-index'; // Replace with your actual index name
// const SEARCH_API_KEY = 'qSHhucfZ3TXJ2XmbPnNoEfWUeaoQSBw8094IzAcXRxAzSeBTdGDc'; // Replace with your actual API key
// const SEARCH_API_VERSION = '2021-04-30-Preview';

// // GROQ API configuration
// const GROQ_API_KEY = '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';
// const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

// async function searchCognitiveSearch(query) {
//     const url = `https://${SEARCH_SERVICE_NAME}.search.windows.net/indexes/${SEARCH_INDEX_NAME}/docs?api-version=${SEARCH_API_VERSION}&search=${encodeURIComponent(query)}`;
    
//     try {
//         const response = await fetch(url, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'api-key': SEARCH_API_KEY
//             }
//         });
//         const data = await response.json();
//         return data.value;
//     } catch (error) {
//         console.error('Error fetching from Cognitive Search:', error);
//         return [];
//     }
// }

// async function fetchGroqResponse(prompt) {
//     try {
//         const response = await fetch(GROQ_API_URL, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${GROQ_API_KEY}`
//             },
//             body: JSON.stringify({
//                 model: 'mixtral-8x7b-32768',
//                 messages: [{ role: 'user', content: prompt }],
//                 temperature: 0.7,
//                 max_tokens: 150
//             })
//         });
//         const data = await response.json();
//         return data.choices[0].message.content;
//     } catch (error) {
//         console.error('Error fetching from GROQ API:', error);
//         return 'Sorry, I encountered an error while processing your request.';
//     }
// }

// async function sendMessage() {
//     const input = document.querySelector('.chatbot-input input');
//     const messages = document.querySelector('.chatbot-messages');
//     const userMessage = input.value.trim();

//     if (userMessage) {
//         // User message
//         const userMessageDiv = document.createElement('div');
//         userMessageDiv.className = 'message-user';

//         const userIcon = document.createElement('img');
//         userIcon.src = 'user.png';
//         userIcon.alt = 'User';

//         const userText = document.createElement('div');
//         userText.className = 'text';
//         userText.textContent = userMessage;

//         userMessageDiv.appendChild(userText);
//         userMessageDiv.appendChild(userIcon);
//         messages.appendChild(userMessageDiv);

//         // Bot message
//         const botMessage = document.createElement('div');
//         botMessage.className = 'message-bot';

//         const botIcon = document.createElement('img');
//         botIcon.src = 'bot.jpg';
//         botIcon.alt = 'Bot';

//         const botText = document.createElement('div');
//         botText.className = 'text';
//         botText.textContent = 'Searching for information...';

//         botMessage.appendChild(botIcon);
//         botMessage.appendChild(botText);
//         messages.appendChild(botMessage);

//         // Fetch information from Cognitive Search
//         const searchResults = await searchCognitiveSearch(userMessage);
        
//         // Generate response using GROQ API
//         const prompt = `Based on the following search results: ${JSON.stringify(searchResults)}, provide a concise summary related to the user's query: "${userMessage}"`;
//         const groqResponse = await fetchGroqResponse(prompt);

//         botText.textContent = groqResponse;

//         if (searchResults.length > 0) {
//             const articlesList = document.createElement('ul');
//             searchResults.slice(0, 3).forEach((result, index) => {
//                 const articleItem = document.createElement('li');
//                 articleItem.innerHTML = `
//                     <p><strong>${index + 1}. ${result.title}</strong></p>
//                     <p>${result.description}</p>
//                     <a href="${result.url}" target="_blank">Read more</a>
//                 `;
//                 articlesList.appendChild(articleItem);
//             });
//             botMessage.appendChild(articlesList);
//         }

//         input.value = '';
//         messages.scrollTop = messages.scrollHeight;
//     }
// }

// function toggleChatbot() {
//     const chatbot = document.querySelector('.chatbot');
//     chatbot.style.display = chatbot.style.display === 'none' || chatbot.style.display === '' ? 'flex' : 'none';
// }

// function performSearch() {
//     const query = document.getElementById('search-input').value.trim();
//     if (query) {
//         alert(`Searching for: ${query}`);
//         // Implement search functionality here
//     }
// }

// function loadTrendingTopics() {
//     const trendingContainer = document.getElementById('trending-container');
//     const apiData = [
//         {
//             title: "Breakthrough in Cancer Research",
//             image: "medical.jpg",
//             summary: "Scientists have developed a promising new therapy showing significant progress in treating advanced cancers.",
//         },
//         {
//             title: "Global Climate Summit 2024",
//             image: "global_climate.png",
//             summary: "World leaders convene to tackle pressing climate issues and pledge a record-breaking $1 trillion for green initiatives.",
//         },
//         {
//             title: "Mars Mission: Human Habitats in Space",
//             image: "mars.jpg",
//             summary: "NASA unveils plans to establish the first human habitats on Mars by 2030. Here's what we know so far.",
//         },
//         {
//             title: "Gukesh: The Youngest Chess King Crowned",
//             image: "chess.jpg",
//             summary: "Gukesh Dommaraju, at 18, becomes the youngest World Chess Champion, marking a new era in chess history.",
//         }
//     ];

//     apiData.forEach(topic => {
//         const card = document.createElement('div');
//         card.className = 'card';

//         const image = document.createElement('img');
//         image.src = topic.image;
//         image.alt = topic.title;

//         const content = document.createElement('div');
//         content.className = 'card-content';

//         const title = document.createElement('h3');
//         title.textContent = topic.title;

//         const summary = document.createElement('p');
//         summary.textContent = topic.summary;

//         content.appendChild(title);
//         content.appendChild(summary);
//         card.appendChild(image);
//         card.appendChild(content);
//         trendingContainer.appendChild(card);
//     });
// }

// document.addEventListener('DOMContentLoaded', () => {
//     loadTrendingTopics();
    
//     // Set up event listeners
//     document.querySelector('.chatbot-icon').addEventListener('click', toggleChatbot);
//     document.querySelector('.chatbot-input button').addEventListener('click', sendMessage);
//     document.getElementById('search-input').addEventListener('keypress', (e) => {
//         if (e.key === 'Enter') {
//             performSearch();
//         }
//     });

//     // Add event listener for chatbot input
//     document.querySelector('.chatbot-input input').addEventListener('keypress', (e) => {
//         if (e.key === 'Enter') {
//             sendMessage();
//         }
//     });
// });
















// Cognitive Search configuration
const SEARCH_SERVICE_NAME = "mediacogsearch"
const SEARCH_INDEX_NAME = "mediahouse333-index"
const SEARCH_API_KEY = "qSHhucfZ3TXJ2XmbPnNoEfWUeaoQSBw8094IzAcXRxAzSeBTdGDc"
const SEARCH_API_VERSION = "2021-04-30-Preview"

// GROQ API configuration
const GROQ_API_KEY = "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"
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions"

async function searchCognitiveSearch(query) {
  const url = `https://${SEARCH_SERVICE_NAME}.search.windows.net/indexes/${SEARCH_INDEX_NAME}/docs?api-version=${SEARCH_API_VERSION}&search=${encodeURIComponent(query)}`

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "api-key": SEARCH_API_KEY,
      },
    })
    const data = await response.json()
    return data.value
  } catch (error) {
    console.error("Error fetching from Cognitive Search:", error)
    return []
  }
}

async function fetchGroqResponse(prompt) {
  try {
    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "mixtral-8x7b-32768",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
        max_tokens: 150,
      }),
    })
    const data = await response.json()
    return data.choices[0].message.content
  } catch (error) {
    console.error("Error fetching from GROQ API:", error)
    return "Sorry, I encountered an error while processing your request."
  }
}

async function sendMessage() {
  const input = document.querySelector(".chatbot-input input")
  const messages = document.querySelector(".chatbot-messages")
  const userMessage = input.value.trim()

  if (userMessage) {
    // User message
    const userMessageDiv = document.createElement("div")
    userMessageDiv.className = "message-user"

    const userIcon = document.createElement("img")
    userIcon.src = "user.png"
    userIcon.alt = "User"

    const userText = document.createElement("div")
    userText.className = "text"
    userText.textContent = userMessage

    userMessageDiv.appendChild(userText)
    userMessageDiv.appendChild(userIcon)
    messages.appendChild(userMessageDiv)

    // Bot message
    const botMessage = document.createElement("div")
    botMessage.className = "message-bot"

    const botIcon = document.createElement("img")
    botIcon.src = "bot.jpg"
    botIcon.alt = "Bot"

    const botText = document.createElement("div")
    botText.className = "text"
    botText.textContent = "Searching for information..."

    botMessage.appendChild(botIcon)
    botMessage.appendChild(botText)
    messages.appendChild(botMessage)

    // Fetch information from Cognitive Search
    const searchResults = await searchCognitiveSearch(userMessage)

    // Generate response using GROQ API
    const prompt = `Based on the following search results: ${JSON.stringify(searchResults)}, provide a concise summary related to the user's query: "${userMessage}"`
    const groqResponse = await fetchGroqResponse(prompt)

    botText.textContent = groqResponse

    if (searchResults.length > 0) {
      const articlesList = document.createElement("ul")
      searchResults.slice(0, 3).forEach((result, index) => {
        const articleItem = document.createElement("li")
        articleItem.innerHTML = `
                    <p><strong>${index + 1}. ${result.title}</strong></p>
                    <p>${result.description}</p>
                    <a href="${result.url}" target="_blank">Read more</a>
                `
        articlesList.appendChild(articleItem)
      })
      botMessage.appendChild(articlesList)
    }

    input.value = ""
    messages.scrollTop = messages.scrollHeight
  }
}

function toggleChatbot() {
  const chatbot = document.querySelector(".chatbot")
  chatbot.style.display = chatbot.style.display === "none" || chatbot.style.display === "" ? "flex" : "none"
}

function performSearch() {
  const query = document.getElementById("search-input").value.trim()
  if (query) {
    alert(`Searching for: ${query}`)
    // Implement search functionality here
  }
}

function loadTrendingTopics() {
  const trendingContainer = document.getElementById("trending-container")
  const apiData = [
    {
      title: "Breakthrough in Cancer Research",
      image: "medical.jpg",
      summary:
        "Scientists have developed a promising new therapy showing significant progress in treating advanced cancers.",
    },
    {
      title: "Global Climate Summit 2024",
      image: "global_climate.png",
      summary:
        "World leaders convene to tackle pressing climate issues and pledge a record-breaking $1 trillion for green initiatives.",
    },
    {
      title: "Mars Mission: Human Habitats in Space",
      image: "mars.jpg",
      summary: "NASA unveils plans to establish the first human habitats on Mars by 2030. Here's what we know so far.",
    },
    {
      title: "Gukesh: The Youngest Chess King Crowned",
      image: "chess.jpg",
      summary:
        "Gukesh Dommaraju, at 18, becomes the youngest World Chess Champion, marking a new era in chess history.",
    },
  ]

  apiData.forEach((topic) => {
    const card = document.createElement("div")
    card.className = "card"

    const image = document.createElement("img")
    image.src = topic.image
    image.alt = topic.title

    const content = document.createElement("div")
    content.className = "card-content"

    const title = document.createElement("h3")
    title.textContent = topic.title

    const summary = document.createElement("p")
    summary.textContent = topic.summary

    content.appendChild(title)
    content.appendChild(summary)
    card.appendChild(image)
    card.appendChild(content)
    trendingContainer.appendChild(card)
  })
}

document.addEventListener("DOMContentLoaded", () => {
  loadTrendingTopics()

  // Set up event listeners
  document.querySelector(".chatbot-icon").addEventListener("click", toggleChatbot)
  document.querySelector(".chatbot-input button").addEventListener("click", sendMessage)
  document.getElementById("search-input").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      performSearch()
    }
  })

  // Add event listener for chatbot input
  document.querySelector(".chatbot-input input").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      sendMessage()
    }
  })
})

