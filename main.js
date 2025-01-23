





// AZURE CONFIGURATION 


// // Cognitive Search configuration
// const SEARCH_SERVICE_NAME = "mediacogsearch"
// const SEARCH_INDEX_NAME = "mediahouse333-index"
// const SEARCH_API_KEY = "qSHhucfZ3TXJ2XmbPnNoEfWUeaoQSBw8094IzAcXRxAzSeBTdGDc"
// const SEARCH_API_VERSION = "2021-04-30-Preview"
// const WEBSITE_DOMAIN = "https://capten05ast.github.io"

// // GROQ API configuration
// const GROQ_API_KEY = "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"
// const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions"

// async function searchCognitiveSearch(query) {
//   const url = `https://${SEARCH_SERVICE_NAME}.search.windows.net/indexes/${SEARCH_INDEX_NAME}/docs?api-version=${SEARCH_API_VERSION}&search=${encodeURIComponent(query)}`

//   try {
//     const response = await fetch(url, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         "api-key": SEARCH_API_KEY,
//         "Origin": WEBSITE_DOMAIN,
//         "Access-Control-Allow-Origin": WEBSITE_DOMAIN
//       },
//       mode: 'cors',
//       credentials: 'include'
//     })

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     const data = await response.json()
//     return data.value
//   } catch (error) {
//     console.error("Error fetching from Cognitive Search:", error)
//     return []
//   }
// }

// async function fetchGroqResponse(prompt) {
//   try {
//     const response = await fetch(GROQ_API_URL, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "Authorization": `Bearer ${GROQ_API_KEY}`,
//         "Origin": WEBSITE_DOMAIN
//       },
//       mode: 'cors',
//       body: JSON.stringify({
//         model: "mixtral-8x7b-32768",
//         messages: [{ role: "user", content: prompt }],
//         temperature: 0.7,
//         max_tokens: 150,
//       }),
//     })

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     const data = await response.json()
//     return data.choices[0].message.content
//   } catch (error) {
//     console.error("Error fetching from GROQ API:", error)
//     return "I apologize, but I'm having trouble processing your request at the moment. Could you please try again?"
//   }
// }

// async function sendMessage() {
//   const input = document.querySelector(".chatbot-input input")
//   const messages = document.querySelector(".chatbot-messages")
//   const userMessage = input.value.trim()

//   if (userMessage) {
//     // User message
//     const userMessageDiv = document.createElement("div")
//     userMessageDiv.className = "message-user"

//     const userIcon = document.createElement("img")
//     userIcon.src = "./assets/user.png"  // Updated path
//     userIcon.alt = "User"
//     userIcon.onerror = function() {
//       this.src = 'https://via.placeholder.com/30'  // Fallback image
//     }

//     const userText = document.createElement("div")
//     userText.className = "text"
//     userText.textContent = userMessage

//     userMessageDiv.appendChild(userText)
//     userMessageDiv.appendChild(userIcon)
//     messages.appendChild(userMessageDiv)

//     // Bot message
//     const botMessage = document.createElement("div")
//     botMessage.className = "message-bot"

//     const botIcon = document.createElement("img")
//     botIcon.src = "./assets/bot.jpg"  // Updated path
//     botIcon.alt = "Bot"
//     botIcon.onerror = function() {
//       this.src = 'https://via.placeholder.com/30'  // Fallback image
//     }

//     const botText = document.createElement("div")
//     botText.className = "text"

//     botMessage.appendChild(botIcon)
//     botMessage.appendChild(botText)
//     messages.appendChild(botMessage)

//     // Show typing indicator
//     const typingIndicator = document.createElement("div")
//     typingIndicator.className = "typing-indicator"
//     typingIndicator.textContent = "Typing..."
//     botMessage.appendChild(typingIndicator)

//     try {
//       // Fetch information from Cognitive Search
//       const searchResults = await searchCognitiveSearch(userMessage)

//       // Generate response using GROQ API
//       let prompt
//       if (searchResults && searchResults.length > 0) {
//         prompt = `Based on the following search results: ${JSON.stringify(searchResults)}, provide a concise and informative summary related to the user's query: "${userMessage}". Focus on the most recent and relevant information.`
//       } else {
//         prompt = `Provide a concise and informative response to the user's query: "${userMessage}". Focus on the most recent and relevant information you have access to.`
//       }
      
//       const groqResponse = await fetchGroqResponse(prompt)

//       // Remove typing indicator
//       botMessage.removeChild(typingIndicator)

//       botText.textContent = groqResponse

//       if (searchResults && searchResults.length > 0) {
//         const articlesList = document.createElement("ul")
//         articlesList.className = "search-results"
//         searchResults.slice(0, 3).forEach((result, index) => {
//           const articleItem = document.createElement("li")
//           articleItem.innerHTML = `
//             <h4>${index + 1}. ${result.title || 'Untitled'}</h4>
//             <p>${result.description || 'No description available'}</p>
//             ${result.url ? `<a href="${result.url}" target="_blank" rel="noopener noreferrer">Read more</a>` : ''}
//           `
//           articlesList.appendChild(articleItem)
//         })
//         botMessage.appendChild(articlesList)
//       }
//     } catch (error) {
//       console.error("Error in message processing:", error)
//       botText.textContent = "I apologize, but I'm having trouble processing your request at the moment. Could you please try again?"
//       botMessage.removeChild(typingIndicator)
//     }

//     input.value = ""
//     messages.scrollTop = messages.scrollHeight
//   }
// }

// function toggleChatbot() {
//   const chatbot = document.querySelector(".chatbot")
//   chatbot.style.display = chatbot.style.display === "none" || chatbot.style.display === "" ? "flex" : "none"
// }

// async function performSearch() {
//   const query = document.getElementById("search-input").value.trim()
//   if (query) {
//     try {
//       const searchResults = await searchCognitiveSearch(query)
//       displaySearchResults(searchResults)
//     } catch (error) {
//       console.error("Search error:", error)
//       displaySearchResults([])
//     }
//   }
// }

// function displaySearchResults(results) {
//   const searchResultsContainer = document.getElementById("search-results")
//   searchResultsContainer.innerHTML = ""

//   if (!results || results.length === 0) {
//     searchResultsContainer.innerHTML = "<p>No results found.</p>"
//     return
//   }

//   const resultsList = document.createElement("ul")
//   results.forEach((result) => {
//     const listItem = document.createElement("li")
//     listItem.innerHTML = `
//       <h3>${result.url ? `<a href="${result.url}" target="_blank" rel="noopener noreferrer">${result.title || 'Untitled'}</a>` : (result.title || 'Untitled')}</h3>
//       <p>${result.description || 'No description available'}</p>
//     `
//     resultsList.appendChild(listItem)
//   })

//   searchResultsContainer.appendChild(resultsList)
// }

// function loadTrendingTopics() {
//   const trendingContainer = document.getElementById("trending-container")
//   const apiData = [
//     {
//       title: "Breakthrough in Cancer Research",
//       image: "./assets/medical.jpg",
//       summary: "Scientists have developed a promising new therapy showing significant progress in treating advanced cancers.",
//     },
//     {
//       title: "Global Climate Summit 2024",
//       image: "./assets/global_climate.png",
//       summary: "World leaders convene to tackle pressing climate issues and pledge a record-breaking $1 trillion for green initiatives.",
//     },
//     {
//       title: "Mars Mission: Human Habitats in Space",
//       image: "./assets/mars.jpg",
//       summary: "NASA unveils plans to establish the first human habitats on Mars by 2030. Here's what we know so far.",
//     },
//     {
//       title: "Gukesh: The Youngest Chess King Crowned",
//       image: "./assets/chess.jpg",
//       summary: "Gukesh Dommaraju, at 18, becomes the youngest World Chess Champion, marking a new era in chess history.",
//     },
//   ]

//   apiData.forEach((topic) => {
//     const card = document.createElement("div")
//     card.className = "card"

//     const image = document.createElement("img")
//     image.src = topic.image
//     image.alt = topic.title
//     image.loading = "lazy"
//     image.onerror = function() {
//       this.src = 'https://via.placeholder.com/150x100'  // Fallback image
//     }

//     const content = document.createElement("div")
//     content.className = "card-content"

//     const title = document.createElement("h3")
//     title.textContent = topic.title

//     const summary = document.createElement("p")
//     summary.textContent = topic.summary

//     content.appendChild(title)
//     content.appendChild(summary)
//     card.appendChild(image)
//     card.appendChild(content)
//     trendingContainer.appendChild(card)
//   })
// }

// // Error handling for fetch operations
// window.addEventListener('unhandledrejection', function(event) {
//   console.error('Unhandled promise rejection:', event.reason)
// })

// document.addEventListener("DOMContentLoaded", () => {
//   loadTrendingTopics()

//   // Set up event listeners
//   const chatbotIcon = document.querySelector(".chatbot-icon")
//   const chatbotSendButton = document.querySelector(".chatbot-input button")
//   const searchInput = document.getElementById("search-input")
//   const chatbotInput = document.querySelector(".chatbot-input input")

//   if (chatbotIcon) chatbotIcon.addEventListener("click", toggleChatbot)
//   if (chatbotSendButton) chatbotSendButton.addEventListener("click", sendMessage)
//   if (searchInput) {
//     searchInput.addEventListener("keypress", (e) => {
//       if (e.key === "Enter") performSearch()
//     })
//   }
//   if (chatbotInput) {
//     chatbotInput.addEventListener("keypress", (e) => {
//       if (e.key === "Enter") sendMessage()
//     })
//   }

//   // Initialize the chatbot as hidden
//   const chatbot = document.querySelector(".chatbot")
//   if (chatbot) chatbot.style.display = "none"
// })
















// Configuration
const config = {
  SEARCH_SERVICE_NAME:
    window.location.hostname === "localhost"
      ? `${window.location.protocol}//${window.location.host}`
      : "https://mediacogsearch.search.windows.net",
  SEARCH_INDEX_NAME: "mediahouse333-index",
  SEARCH_API_VERSION: "2021-04-30-Preview",
  WEBSITE_DOMAIN: "https://capten05ast.github.io",
  GROQ_API_KEY: "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",
  GROQ_API_URL: "https://api.groq.com/openai/v1/chat/completions",
}

async function searchCognitiveSearch(query) {
  const url = `${config.SEARCH_SERVICE_NAME}/indexes/${config.SEARCH_INDEX_NAME}/docs?api-version=${config.SEARCH_API_VERSION}&search=${encodeURIComponent(query)}`

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "api-key": config.SEARCH_API_KEY, // Note: This should be securely managed, preferably on the server-side
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data.value
  } catch (error) {
    console.error("Error fetching from Cognitive Search:", error)
    return []
  }
}

async function fetchGroqResponse(prompt) {
  try {
    const response = await fetch(config.GROQ_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${config.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "mixtral-8x7b-32768",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
        max_tokens: 150,
      }),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data.choices[0].message.content
  } catch (error) {
    console.error("Error fetching from GROQ API:", error)
    return "I apologize, but I'm having trouble processing your request at the moment. Could you please try again?"
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
    userIcon.src = "./assets/user.png"
    userIcon.alt = "User"
    userIcon.onerror = function () {
      this.style.display = "none"
    }

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
    botIcon.src = "./assets/bot.jpg"
    botIcon.alt = "Bot"
    botIcon.onerror = function () {
      this.style.display = "none"
    }

    const botText = document.createElement("div")
    botText.className = "text"

    botMessage.appendChild(botIcon)
    botMessage.appendChild(botText)
    messages.appendChild(botMessage)

    // Show typing indicator
    const typingIndicator = document.createElement("div")
    typingIndicator.className = "typing-indicator"
    typingIndicator.textContent = "Typing..."
    botMessage.appendChild(typingIndicator)

    try {
      // Fetch information from Cognitive Search
      const searchResults = await searchCognitiveSearch(userMessage)

      // Generate response using GROQ API
      let prompt
      if (searchResults && searchResults.length > 0) {
        prompt = `Based on the following search results: ${JSON.stringify(searchResults)}, provide a concise and informative summary related to the user's query: "${userMessage}". Focus on the most recent and relevant information.`
      } else {
        prompt = `Provide a concise and informative response to the user's query: "${userMessage}". Focus on the most recent and relevant information you have access to.`
      }

      const groqResponse = await fetchGroqResponse(prompt)

      // Remove typing indicator
      botMessage.removeChild(typingIndicator)

      botText.textContent = groqResponse

      if (searchResults && searchResults.length > 0) {
        const articlesList = document.createElement("ul")
        articlesList.className = "search-results"
        searchResults.slice(0, 3).forEach((result, index) => {
          const articleItem = document.createElement("li")
          articleItem.innerHTML = `
            <h4>${index + 1}. ${result.title || "Untitled"}</h4>
            <p>${result.description || "No description available"}</p>
            ${result.url ? `<a href="${result.url}" target="_blank" rel="noopener noreferrer">Read more</a>` : ""}
          `
          articlesList.appendChild(articleItem)
        })
        botMessage.appendChild(articlesList)
      }
    } catch (error) {
      console.error("Error in message processing:", error)
      botText.textContent =
        "I apologize, but I'm having trouble processing your request at the moment. Could you please try again?"
      botMessage.removeChild(typingIndicator)
    }

    input.value = ""
    messages.scrollTop = messages.scrollHeight
  }
}

function toggleChatbot() {
  const chatbot = document.querySelector(".chatbot")
  chatbot.classList.toggle("active")
}

async function performSearch() {
  const query = document.getElementById("search-input").value.trim()
  if (query) {
    try {
      const searchResults = await searchCognitiveSearch(query)
      displaySearchResults(searchResults)
    } catch (error) {
      console.error("Search error:", error)
      displaySearchResults([])
    }
  }
}

function displaySearchResults(results) {
  const searchResultsContainer = document.getElementById("search-results")
  const searchResultsSection = document.getElementById("search-results-section")
  searchResultsContainer.innerHTML = ""

  if (!results || results.length === 0) {
    searchResultsContainer.innerHTML = "<p>No results found.</p>"
  } else {
    const resultsList = document.createElement("ul")
    results.forEach((result) => {
      const listItem = document.createElement("li")
      listItem.innerHTML = `
        <h3>${result.url ? `<a href="${result.url}" target="_blank" rel="noopener noreferrer">${result.title || "Untitled"}</a>` : result.title || "Untitled"}</h3>
        <p>${result.description || "No description available"}</p>
      `
      resultsList.appendChild(listItem)
    })
    searchResultsContainer.appendChild(resultsList)
  }

  if (searchResultsSection) {
    searchResultsSection.style.display = "block"
  }
}

function loadTrendingTopics() {
  const trendingContainer = document.getElementById("trending-container")
  const apiData = [
    {
      title: "Breakthrough in Cancer Research",
      image: "./assets/medical.jpg",
      summary:
        "Scientists have developed a promising new therapy showing significant progress in treating advanced cancers.",
    },
    {
      title: "Global Climate Summit 2024",
      image: "./assets/global_climate.png",
      summary:
        "World leaders convene to tackle pressing climate issues and pledge a record-breaking $1 trillion for green initiatives.",
    },
    {
      title: "Mars Mission: Human Habitats in Space",
      image: "./assets/mars.jpg",
      summary: "NASA unveils plans to establish the first human habitats on Mars by 2030. Here's what we know so far.",
    },
    {
      title: "Gukesh: The Youngest Chess King Crowned",
      image: "./assets/chess.jpg",
      summary:
        "Gukesh Dommaraju, at 18, becomes the youngest World Chess Champion, marking a new era in chess history.",
    },
  ]

  if (trendingContainer) {
    apiData.forEach((topic) => {
      const card = document.createElement("div")
      card.className = "card"

      const image = document.createElement("img")
      image.src = topic.image
      image.alt = topic.title
      image.loading = "lazy"
      image.onerror = function () {
        this.style.display = "none"
        card.style.minHeight = "100px"
      }

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
}

// Error handling for fetch operations
window.addEventListener("unhandledrejection", (event) => {
  console.error("Unhandled promise rejection:", event.reason)
})

document.addEventListener("DOMContentLoaded", () => {
  loadTrendingTopics()

  // Set up event listeners
  const chatbotIcon = document.querySelector(".chatbot-icon")
  const chatbotSendButton = document.querySelector(".chatbot-input button")
  const closeChatbotButton = document.querySelector(".close-chatbot")
  const searchInput = document.getElementById("search-input")
  const chatbotInput = document.querySelector(".chatbot-input input")

  if (chatbotIcon) {
    chatbotIcon.addEventListener("click", toggleChatbot)
  }
  if (closeChatbotButton) {
    closeChatbotButton.addEventListener("click", toggleChatbot)
  }
  if (chatbotSendButton) {
    chatbotSendButton.addEventListener("click", sendMessage)
  }
  if (searchInput) {
    searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") performSearch()
    })
  }
  if (chatbotInput) {
    chatbotInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") sendMessage()
    })
  }
})









