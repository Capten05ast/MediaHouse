




// // Configuration
// const config = {
//     SEARCH_SERVICE_NAME: "https://mediacogsearch.search.windows.net",
//     SEARCH_INDEX_NAME: "media333-index",
//     SEARCH_API_VERSION: "2021-04-30-Preview",
//     WEBSITE_DOMAIN: "https://mediastorage333.z30.web.core.windows.net/", // Replace with your actual Azure Blob Storage URL
//     GROQ_API_KEY: "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",
//     GROQ_API_URL: "https://api.groq.com/openai/v1/chat/completions",
//   }
  
//   async function searchCognitiveSearch(query) {
//     const url = `${config.SEARCH_SERVICE_NAME}/indexes/${config.SEARCH_INDEX_NAME}/docs?api-version=${config.SEARCH_API_VERSION}&search=${encodeURIComponent(query)}`
  
//     try {
//       const response = await fetch(url, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           "api-key": "qSHhucfZ3TXJ2XmbPnNoEfWUeaoQSBw8094IzAcXRxAzSeBTdGDc", // Note: In a production environment, this should be handled securely
          
//         },
//       })
  
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`)
//       }
  
//       const data = await response.json()
//       return data.value
//     } catch (error) {
//       console.error("Error fetching from Cognitive Search:", error)
//       return []
//     }
//   }
  
//   async function fetchGroqResponse(prompt) {
//     try {
//       const response = await fetch(config.GROQ_API_URL, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${config.GROQ_API_KEY}`,
//         },
//         body: JSON.stringify({
//           model: "mixtral-8x7b-32768",
//           messages: [{ role: "user", content: prompt }],
//           temperature: 0.7,
//           max_tokens: 150,
//         }),
//       })
  
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`)
//       }
  
//       const data = await response.json()
//       return data.choices[0].message.content
//     } catch (error) {
//       console.error("Error fetching from GROQ API:", error)
//       return "I apologize, but I'm having trouble processing your request at the moment. Could you please try again?"
//     }
//   }
  
//   async function sendMessage() {
//     const input = document.querySelector(".chatbot-input input")
//     const messages = document.querySelector(".chatbot-messages")
//     const userMessage = input.value.trim()
  
//     if (userMessage) {
//       // User message
//       const userMessageDiv = document.createElement("div")
//       userMessageDiv.className = "message-user"
  
//       const userIcon = document.createElement("img")
//       userIcon.src = "user.jpg"
//       userIcon.alt = "User"
//       userIcon.onerror = function () {
//         this.style.display = "none"
//       }
  
//       const userText = document.createElement("div")
//       userText.className = "text"
//       userText.textContent = userMessage
  
//       userMessageDiv.appendChild(userText)
//       userMessageDiv.appendChild(userIcon)
//       messages.appendChild(userMessageDiv)
  
//       // Bot message
//       const botMessage = document.createElement("div")
//       botMessage.className = "message-bot"
  
//       const botIcon = document.createElement("img")
//       botIcon.src = "bot.jpg"
//       botIcon.alt = "Bot"
//       botIcon.onerror = function () {
//         this.style.display = "none"
//       }
  
//       const botText = document.createElement("div")
//       botText.className = "text"
  
//       botMessage.appendChild(botIcon)
//       botMessage.appendChild(botText)
//       messages.appendChild(botMessage)
  
//       // Show typing indicator
//       const typingIndicator = document.createElement("div")
//       typingIndicator.className = "typing-indicator"
//       typingIndicator.textContent = "Typing..."
//       botMessage.appendChild(typingIndicator)
  
//       try {
//         // Fetch information from Cognitive Search
//         const searchResults = await searchCognitiveSearch(userMessage)
  
//         // Generate response using GROQ API
//         let prompt
//         if (searchResults && searchResults.length > 0) {
//           prompt = `Based on the following search results: ${JSON.stringify(searchResults)}, provide a concise and informative summary related to the user's query: "${userMessage}". Focus on the most recent and relevant information.`
//         } else {
//           prompt = `Provide a concise and informative response to the user's query: "${userMessage}". Focus on the most recent and relevant information you have access to.`
//         }
  
//         const groqResponse = await fetchGroqResponse(prompt)
  
//         // Remove typing indicator
//         botMessage.removeChild(typingIndicator)
  
//         botText.textContent = groqResponse
  
//         if (searchResults && searchResults.length > 0) {
//           const articlesList = document.createElement("ul")
//           articlesList.className = "search-results"
//           searchResults.slice(0, 3).forEach((result, index) => {
//             const articleItem = document.createElement("li")
//             articleItem.innerHTML = `
//               <h4>${index + 1}. ${result.headline || "Untitled"}</h4>
//               <p>${result.scraped.substring(0, 150)}...</p>
//               <p>Author: ${result.author_name} | Date: ${new Date(result.date).toLocaleDateString()} | Wiki Entities: ${result.wiki_ents}</p>
//             `
//             articlesList.appendChild(articleItem)
//           })
//           botMessage.appendChild(articlesList)
//         }
//       } catch (error) {
//         console.error("Error in message processing:", error)
//         botText.textContent =
//           "I apologize, but I'm having trouble processing your request at the moment. Could you please try again?"
//         botMessage.removeChild(typingIndicator)
//       }
  
//       input.value = ""
//       messages.scrollTop = messages.scrollHeight
//     }
//   }
  
//   function toggleChatbot() {
//     const chatbot = document.querySelector(".chatbot")
//     chatbot.classList.toggle("active")
//   }
  
//   async function performSearch() {
//     const query = document.getElementById("search-input").value.trim()
//     if (query) {
//       try {
//         const searchResults = await searchCognitiveSearch(query)
//         displaySearchResults(searchResults)
//       } catch (error) {
//         console.error("Search error:", error)
//         displaySearchResults([])
//       }
//     }
//   }
  
//   function displaySearchResults(results) {
//     const searchResultsContainer = document.getElementById("search-results")
//     const searchResultsSection = document.getElementById("search-results-section")
//     searchResultsContainer.innerHTML = ""
  
//     if (!results || results.length === 0) {
//       searchResultsContainer.innerHTML = "<p>No results found.</p>"
//     } else {
//       const resultsList = document.createElement("ul")
//       results.forEach((result) => {
//         const listItem = document.createElement("li")
//         listItem.innerHTML = `
//           <h3>${result.headline || "Untitled"}</h3>
//           <p>${result.scraped.substring(0, 200)}...</p>
//           <p>Author: ${result.author_name} | Date: ${new Date(result.date).toLocaleDateString()} | Wiki Entities: ${result.wiki_ents}</p>
//         `
//         resultsList.appendChild(listItem)
//       })
//       searchResultsContainer.appendChild(resultsList)
//     }
  
//     if (searchResultsSection) {
//       searchResultsSection.style.display = "block"
//     }
//   }
  
//   function loadTrendingTopics() {
//     const trendingContainer = document.getElementById("trending-container")
//     const apiData = [
//       {
//         title: "Breakthrough in Cancer Research",
//         image: "doctor.jpg",
//         summary:
//           "Scientists have developed a promising new therapy showing significant progress in treating advanced cancers.",
//       },
//       {
//         title: "Global Climate Summit 2024",
//         image: "earth.jpg",
//         summary:
//           "World leaders convene to tackle pressing climate issues and pledge a record-breaking $1 trillion for green initiatives.",
//       },
//       {
//         title: "Mars Mission: Human Habitats in Space",
//         image: "mars.jpg",
//         summary: "NASA unveils plans to establish the first human habitats on Mars by 2030. Here's what we know so far.",
//       },
//       {
//         title: "Gukesh: The Youngest Chess King Crowned",
//         image: "chess.jpg",
//         summary:
//           "Gukesh Dommaraju, at 18, becomes the youngest World Chess Champion, marking a new era in chess history.",
//       },
//     ]
  
//     if (trendingContainer) {
//       apiData.forEach((topic) => {
//         const card = document.createElement("div")
//         card.className = "card"
  
//         const image = document.createElement("img")
//         image.src = topic.image
//         image.alt = topic.title
//         image.loading = "lazy"
//         image.onerror = function () {
//           this.style.display = "none"
//           card.style.minHeight = "100px"
//         }
  
//         const content = document.createElement("div")
//         content.className = "card-content"
  
//         const title = document.createElement("h3")
//         title.textContent = topic.title
  
//         const summary = document.createElement("p")
//         summary.textContent = topic.summary
  
//         content.appendChild(title)
//         content.appendChild(summary)
//         card.appendChild(image)
//         card.appendChild(content)
//         trendingContainer.appendChild(card)
//       })
//     }
//   }
  
//   // Error handling for fetch operations
//   window.addEventListener("unhandledrejection", (event) => {
//     console.error("Unhandled promise rejection:", event.reason)
//   })
  
//   document.addEventListener("DOMContentLoaded", () => {
//     loadTrendingTopics()
  
//     // Set up event listeners
//     const chatbotIcon = document.querySelector(".chatbot-icon")
//     const chatbotSendButton = document.querySelector(".chatbot-input button")
//     const closeChatbotButton = document.querySelector(".close-chatbot")
//     const searchInput = document.getElementById("search-input")
//     const chatbotInput = document.querySelector(".chatbot-input input")
  
//     if (chatbotIcon) {
//       chatbotIcon.addEventListener("click", toggleChatbot)
//     }
//     if (closeChatbotButton) {
//       closeChatbotButton.addEventListener("click", toggleChatbot)
//     }
//     if (chatbotSendButton) {
//       chatbotSendButton.addEventListener("click", sendMessage)
//     }
//     if (searchInput) {
//       searchInput.addEventListener("keypress", (e) => {
//         if (e.key === "Enter") performSearch()
//       })
//     }
//     if (chatbotInput) {
//       chatbotInput.addEventListener("keypress", (e) => {
//         if (e.key === "Enter") sendMessage()
//       })
//     }
  
//     // Load GSAP and ScrollTrigger
//     loadGSAP()
//   })
  
//   function loadGSAP() {
//     const gsapScript = document.createElement("script")
//     gsapScript.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"
  
//     const scrollTriggerScript = document.createElement("script")
//     scrollTriggerScript.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"
  
//     gsapScript.onload = () => {
//       scrollTriggerScript.onload = initScrollAnimations
//       document.head.appendChild(scrollTriggerScript)
//     }
  
//     document.head.appendChild(gsapScript)
//   }
  
//   function initScrollAnimations() {
//     // Animate trending cards on scroll
//     gsap.utils.toArray(".card").forEach((card) => {
//       gsap.fromTo(
//         card,
//         {
//           opacity: 0,
//           y: 50,
//           scale: 0.9,
//         },
//         {
//           opacity: 1,
//           y: 0,
//           scale: 1,
//           duration: 0.8,
//           ease: "power2.out",
//           scrollTrigger: {
//             trigger: card,
//             start: "top 80%",
//             toggleActions: "play none none reverse",
//           },
//         },
//       )
//     })
  
//     // Animate hero section
//     gsap.fromTo(
//       ".hero",
//       {
//         opacity: 0,
//         y: 50,
//       },
//       {
//         opacity: 1,
//         y: 0,
//         duration: 1,
//         ease: "power3.out",
//       },
//     )
  
//     // Parallax effect for header
//     gsap.to("header", {
//       backgroundColor: "#1e3a8a",
//       scrollTrigger: {
//         trigger: ".hero",
//         start: "bottom top",
//         scrub: true,
//         toggleActions: "play none none reverse",
//       },
//     })
  
//     // Stagger animation for trending section title and cards
//     gsap.fromTo(
//       ".trending h2",
//       {
//         opacity: 0,
//         x: -50,
//       },
//       {
//         opacity: 1,
//         x: 0,
//         duration: 0.8,
//         scrollTrigger: {
//           trigger: ".trending",
//           start: "top 80%",
//         },
//       },
//     )
  
//     // Chatbot icon pulse effect
//     gsap.to(".chatbot-icon", {
//       scale: 1.1,
//       repeat: -1,
//       yoyo: true,
//       duration: 0.5,
//       ease: "power1.inOut",
//     })
//   }
  
  
  






// url for POST : https://mediacogsearch.search.windows.net/indexes/media333-index/docs/search?api-version=2021-04-30-Preview





// Configuration
const config = {
    SEARCH_SERVICE_NAME: "https://mediacogsearch.search.windows.net",
    SEARCH_INDEX_NAME: "media333-index",
    SEARCH_API_VERSION: "2021-04-30-Preview",
    WEBSITE_DOMAIN: "https://mediastorage333.z30.web.core.windows.net/",
    GROQ_API_KEY: "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",
    GROQ_API_URL: "https://api.groq.com/openai/v1/chat/completions",
}


async function searchCognitiveSearch(query) {
    const url = "https://mediacogsearch.search.windows.net/indexes/media333-index/docs/search?api-version=2021-04-30-Preview"
    
    const searchBody = {
        search: query,
        select: "*",
        top: 3,
        queryType: "semantic",  // Using semantic search for better relevance
        searchFields: "content,title",  // Search in both title and content
        queryLanguage: "en-us",
        searchMode: "all"  // All terms must match for better relevance
    }

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "api-key": "qSHhucfZ3TXJ2XmbPnNoEfWUeaoQSBw8094IzAcXRxAzSeBTdGDc",
                "Accept": "application/json"
            },
            body: JSON.stringify(searchBody)
        })

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        console.log("Raw search response:", data)

        if (!data.value || !Array.isArray(data.value)) {
            return []
        }

        // Process the results with improved handling
        const processedResults = data.value.map(item => {
            try {
                if (!item.content) return null

                // Handle the content parsing
                let contentObj
                if (typeof item.content === 'string') {
                    // Try to clean the content string before parsing
                    let cleanContent = item.content
                        .replace(/\n/g, ' ')
                        .replace(/\r/g, '')
                        .replace(/\t/g, ' ')
                        .replace(/\\/g, '\\\\')
                        .replace(/"\s+}/g, '"}')
                        .replace(/"\s+,/g, '",')
                        .replace(/,\s+}/g, '}')

                    // If content is too long, find a safe truncation point
                    if (cleanContent.length > 32000) {
                        const safeEnd = cleanContent.lastIndexOf('"}]', 32000)
                        if (safeEnd > 0) {
                            cleanContent = cleanContent.substring(0, safeEnd + 3)
                        }
                    }

                    try {
                        contentObj = JSON.parse(cleanContent)
                    } catch (parseError) {
                        console.warn("Initial parse failed, attempting cleanup:", parseError)
                        
                        // Additional cleanup attempt
                        cleanContent = cleanContent.replace(/[^\x20-\x7E]/g, '')
                        try {
                            contentObj = JSON.parse(cleanContent)
                        } catch (secondError) {
                            // If all parsing fails, use the raw content
                            return {
                                title: item.title || "Content Available",
                                info: item.content.substring(0, 500),
                                url: item.url || "#",
                                score: item['@search.score'] || 0
                            }
                        }
                    }
                } else {
                    contentObj = item.content
                }

                // Handle both array and object formats
                const contentItem = Array.isArray(contentObj) ? contentObj[0] : contentObj

                return {
                    title: contentItem.title || item.title || "No Title",
                    info: contentItem.info || contentItem.content || contentItem.description || "",
                    url: contentItem.url || item.url || "#",
                    score: item['@search.score'] || 0
                }
            } catch (e) {
                console.error('Error processing search result:', e)
                return null
            }
        }).filter(result => 
            result !== null && 
            result.info && 
            result.info.trim() !== "" && 
            result.score > 0.1  // Filter out low relevance results
        )

        // Sort by search score
        processedResults.sort((a, b) => b.score - a.score)

        console.log("Processed results:", processedResults)
        return processedResults
    } catch (error) {
        console.error("Error in searchCognitiveSearch:", error)
        return []
    }
}
  
  
  

async function fetchGroqResponse(prompt) {
    const url = "https://api.groq.com/openai/v1/chat/completions"
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${config.GROQ_API_KEY}`,
    }
  
    const data = {
      model: "mixtral-8x7b-32768",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.5,
      max_tokens: 1024,
    }
  
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data),
      })
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
  
      const result = await response.json()
      console.log("GROQ API response:", JSON.stringify(result, null, 2))
  
      return result.choices[0].message.content
    } catch (error) {
      console.error("Error:", error)
      return "I'm sorry, but I couldn't generate a response at this time. Please try again later."
    }
}
  
  

  



//   // Add event listener for the send button
// document.querySelector(".chatbot-input button").addEventListener("click", sendMessage)

// // Add event listener for the Enter key in the input field
// document.querySelector(".chatbot-input input").addEventListener("keypress", (event) => {
//   if (event.key === "Enter") {
//     sendMessage()
//   }
// })





async function sendMessage() {
  const input = document.querySelector(".chatbot-input input")
  const messages = document.querySelector(".chatbot-messages")
  const userMessage = input.value.trim()

  if (userMessage) {
      // Create and append user message
      const userMessageDiv = document.createElement("div")
      userMessageDiv.className = "message-user"
      userMessageDiv.innerHTML = `
          <div class="text">${userMessage}</div>
          <img src="user.jpg" alt="User" onerror="this.style.display='none'">
      `
      messages.appendChild(userMessageDiv)

      // Create bot message container
      const botMessage = document.createElement("div")
      botMessage.className = "message-bot"
      botMessage.innerHTML = `
          <img src="bot.jpg" alt="Bot" onerror="this.style.display='none'">
          <div class="text"></div>
          <div class="typing-indicator">Typing...</div>
      `
      messages.appendChild(botMessage)

      try {
          // Search for relevant information
          const searchResults = await searchCognitiveSearch(userMessage)
          console.log("Search results:", searchResults)

          let prompt
          if (searchResults && searchResults.length > 0) {
              // Create context only from valid results
              const validResults = searchResults.filter(result => 
                  result.title && result.info && result.title !== "No Title Available"
              )

              if (validResults.length > 0) {
                  const contextString = validResults
                      .map(result => `Title: ${result.title}\nContent: ${result.info}\nSource: ${result.url}`)
                      .join("\n\n")

                  prompt = `Based on the following information:\n\n${contextString}\n\n` +
                          `Please provide a concise and informative response to: "${userMessage}". ` +
                          `Include relevant facts from the provided context.`
              } else {
                  prompt = `Please provide a general response to: "${userMessage}"`
              }
          } else {
              prompt = `Please provide a general response to: "${userMessage}"`
          }

          // Get GROQ response
          const groqResponse = await fetchGroqResponse(prompt)
          
          // Update bot message
          const botText = botMessage.querySelector(".text")
          const typingIndicator = botMessage.querySelector(".typing-indicator")
          botText.textContent = groqResponse
          botMessage.removeChild(typingIndicator)

          // Add search results if available
          if (searchResults && searchResults.length > 0) {
              const articlesList = document.createElement("div")
              articlesList.className = "search-results"
              
              searchResults.forEach((result, index) => {
                  if (result.title !== "No Title Available") {
                      const articleItem = document.createElement("div")
                      articleItem.className = "search-result-item"
                      articleItem.innerHTML = `
                          <h4>${index + 1}. ${result.title}</h4>
                          <p>${result.info ? result.info.substring(0, 150) + "..." : ""}</p>
                          ${result.url !== "#" ? `<a href="${result.url}" target="_blank" class="read-more">Read More</a>` : ""}
                      `
                      articlesList.appendChild(articleItem)
                  }
              })
              
              if (articlesList.children.length > 0) {
                  botMessage.appendChild(articlesList)
              }
          }

      } catch (error) {
          console.error("Error in message processing:", error)
          const botText = botMessage.querySelector(".text")
          const typingIndicator = botMessage.querySelector(".typing-indicator")
          botText.textContent = "I apologize, but I'm having trouble processing your request at the moment. Could you please try again?"
          if (typingIndicator) botMessage.removeChild(typingIndicator)
      }

      // Clear input and scroll to bottom
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
              <h3>${result.title || "No Title Available"}</h3>
              <p>${result.info ? result.info.substring(0, 200) + "..." : "No content available"}</p>
              <a href="${result.url}" target="_blank" class="read-more">Read More</a>
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
            image: "doctor.jpg",
            summary:
                "Scientists have developed a promising new therapy showing significant progress in treating advanced cancers.",
        },
        {
            title: "Global Climate Summit 2024",
            image: "earth.jpg",
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
    // Load GSAP and ScrollTrigger
    loadGSAP()
  })
  
  function loadGSAP() {
    const gsapScript = document.createElement("script")
    gsapScript.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"
  
    const scrollTriggerScript = document.createElement("script")
    scrollTriggerScript.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"
  
    gsapScript.onload = () => {
      scrollTriggerScript.onload = initScrollAnimations
      document.head.appendChild(scrollTriggerScript)
    }
  
    document.head.appendChild(gsapScript)
  }
  
  function initScrollAnimations() {
    // Animate trending cards on scroll
    gsap.utils.toArray(".card").forEach((card) => {
      gsap.fromTo(
        card,
        {
          opacity: 0,
          y: 50,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      )
    })
  
    // Animate hero section
    gsap.fromTo(
      ".hero",
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
      },
    )
  
    // Parallax effect for header
    gsap.to("header", {
      backgroundColor: "#1e3a8a",
      scrollTrigger: {
        trigger: ".hero",
        start: "bottom top",
        scrub: true,
        toggleActions: "play none none reverse",
      },
    })
  
    // Stagger animation for trending section title and cards
    gsap.fromTo(
      ".trending h2",
      {
        opacity: 0,
        x: -50,
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: ".trending",
          start: "top 80%",
        },
      },
    )
  
    // Chatbot icon pulse effect
    gsap.to(".chatbot-icon", {
      scale: 1.1,
      repeat: -1,
      yoyo: true,
      duration: 0.5,
      ease: "power1.inOut",
    })
  }
  
  
  
  
  
  
  
  
  
  
