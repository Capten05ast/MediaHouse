function toggleChatbot() {
    const chatbot = document.querySelector('.chatbot');
    chatbot.style.display = chatbot.style.display === 'none' || chatbot.style.display === '' ? 'flex' : 'none';
}

// async function sendMessage() {
//     const input = document.querySelector('.chatbot-input input');
//     const messages = document.querySelector('.chatbot-messages');
//     const userMessage = input.value.trim().toLowerCase(); // Convert to lowercase for case-insensitive matching

//     if (userMessage) {
//         // Add the user's message to the chat
//         addUserMessage(input.value.trim()); // Preserve the original input for display

//         input.value = ''; // Clear the input field

//         // Handle predefined greetings
//         if (["hi", "hello", "hey"].includes(userMessage)) {
//             const predefinedResponse = "Hello there! I'm Media Assist Bot. How can I help you today?";
//             addBotMessage(predefinedResponse);
//             return; // Skip API call
//         }

//         // Show loading state
//         const loadingDiv = createLoadingMessage();
//         messages.appendChild(loadingDiv);

//         try {
//             // Query Azure Cognitive Search
//             const azureResults = await searchAzureIndex(userMessage);
//             let azureContent = "No results found in your data.";
//             if (azureResults && azureResults.value.length > 0) {
//                 azureContent = azureResults.value.map(doc => doc.summary || doc.content).join('\n');
//             }

//             // Pass the Azure results to Groq API for refinement
//             const groqResponse = await callGroqAPI(userMessage, azureContent);

//             // Remove the loading message
//             messages.removeChild(loadingDiv);

//             // Display the bot's response
//             addBotMessage(groqResponse || "Sorry, I couldn't process your query.");
//         } catch (error) {
//             console.error("Error:", error);

//             // Remove the loading message
//             messages.removeChild(loadingDiv);

//             // Display an error message
//             addBotMessage("Sorry, I encountered an error. Please try again.");
//         }
//     }
// }

// // Function to query Azure Cognitive Search
// async function searchAzureIndex(query) {
//     try {
//         const response = await fetch(
//             `http://localhost:3000/proxy?search=${encodeURIComponent(query)}`, // Proxy endpoint
//             {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json' // No need to include the Azure API key here
//                 }
//             }
//         );        

//         if (!response.ok) {
//             throw new Error("Azure Cognitive Search query failed");
//         }

//         return await response.json();
//     } catch (error) {
//         console.error("Error querying Cognitive Search:", error);
//         return null;
//     }
// }

// // Function to call Groq API
// async function callGroqAPI(userMessage, context) {
//     try {
//         const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer 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`, // Provided Groq API key
//             },
//             body: JSON.stringify({
//                 model: 'llama-3.3-70b-versatile',
//                 messages: [
//                     { role: 'system', content: "Answer based on the provided context." },
//                     { role: 'user', content: userMessage },
//                     { role: 'assistant', content: context }
//                 ],
//             }),
//         });

//         if (!response.ok) {
//             throw new Error("Groq API call failed");
//         }

//         const data = await response.json();
//         return data.choices[0].message.content;
//     } catch (error) {
//         console.error("Error calling Groq API:", error);
//         return null;
//     }
// }

async function sendMessage() {
    const inputField = document.querySelector('.chatbot-input input');
    const userMessage = inputField.value.trim();
    if (userMessage === "") return;

    addUserMessage(userMessage);
    inputField.value = "";

    const loadingMessage = createLoadingMessage();
    document.querySelector('.chatbot-messages').appendChild(loadingMessage);

    try {
        const response = await fetch("http://127.0.0.1:8000/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: userMessage })
        });

        const data = await response.json();
        addBotMessage(data.response); // Display bot response
    } catch (error) {
        console.error("Error:", error);
        addBotMessage("An error occurred. Please try again later.");
    }

    loadingMessage.remove();
}


// Helper function to add a user's message to the chat
function addUserMessage(text) {
    const messages = document.querySelector('.chatbot-messages');

    const userMessageDiv = document.createElement('div');
    userMessageDiv.className = 'message-user';

    const userIcon = document.createElement('img');
    userIcon.src = 'user.jpg';
    userIcon.alt = 'User';

    const userText = document.createElement('div');
    userText.className = 'text';
    userText.textContent = text;

    userMessageDiv.appendChild(userText);
    userMessageDiv.appendChild(userIcon);
    messages.appendChild(userMessageDiv);

    messages.scrollTop = messages.scrollHeight; // Scroll to the latest message
}

// Helper function to add a bot's message to the chat
function addBotMessage(text) {
    const messages = document.querySelector('.chatbot-messages');

    const botMessageDiv = document.createElement('div');
    botMessageDiv.className = 'message-bot';

    const botIcon = document.createElement('img');
    botIcon.src = 'bot.jpg';
    botIcon.alt = 'Bot';

    const botText = document.createElement('div');
    botText.className = 'text';
    botText.textContent = text;

    botMessageDiv.appendChild(botIcon);
    botMessageDiv.appendChild(botText);
    messages.appendChild(botMessageDiv);

    messages.scrollTop = messages.scrollHeight; // Scroll to the latest message
}

// Helper function to create a loading message
function createLoadingMessage() {
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'message-bot';
    loadingDiv.innerHTML = `
        <img src="bot.jpg" alt="Bot">
        <div class="text">Thinking...</div>
    `;
    return loadingDiv;
}

// Load trending topics (for your homepage section)
function loadTrendingTopics() {
    const trendingContainer = document.getElementById('trending-container');
    const apiData = [
        {
            title: "Breakthrough in Cancer Research",
            image: "doctor.jpg",
            summary: "Scientists have developed a promising new therapy showing significant progress in treating advanced cancers."
        },
        {
            title: "Global Climate Summit 2024",
            image: "earth.jpg",
            summary: "World leaders convene to tackle pressing climate issues and pledge a record-breaking $1 trillion for green initiatives."
        },
        {
            title: "Mars Mission: Human Habitats in Space",
            image: "mars.jpg",
            summary: "NASA unveils plans to establish the first human habitats on Mars by 2030. Here's what we know so far."
        },
        {
            title: "Gukesh: The Youngest Chess King Crowned",
            image: "chess.jpg",
            summary: "Gukesh Dommaraju, at 18, becomes the youngest World Chess Champion, marking a new era in chess history."
        }
    ];

    apiData.forEach(topic => {
        const card = document.createElement('div');
        card.className = 'card';

        const image = document.createElement('img');
        image.src = topic.image;
        image.alt = topic.title;

        const content = document.createElement('div');
        content.className = 'card-content';

        const title = document.createElement('h3');
        title.textContent = topic.title;

        const summary = document.createElement('p');
        summary.textContent = topic.summary;

        content.appendChild(title);
        content.appendChild(summary);
        card.appendChild(image);
        card.appendChild(content);
        trendingContainer.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', loadTrendingTopics);










// MY PART BEGINS :-
loadGSAP();
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


