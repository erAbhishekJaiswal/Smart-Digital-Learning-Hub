import React, { useState, useRef, useEffect } from 'react';
import ComingSoon from '../shared/ComingSoon'
// import "../../CSSFiles/PublicPages/AskAIPage.css";
// const AskToAI = () => {
//   // return (
//   //   <div>
//   //     <ComingSoon />
//   //   </div>
//   // )


//   const [messages, setMessages] = useState([]);
//   const [inputMessage, setInputMessage] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [conversationHistory, setConversationHistory] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState('general');
//   const [aiPersonality, setAiPersonality] = useState('professional');
//   const [isTyping, setIsTyping] = useState(false);
//   const messagesEndRef = useRef(null);

//   const categories = [
//     { id: 'general', name: 'General', icon: '💬', color: '#3b82f6' },
//     { id: 'career', name: 'Career', icon: '💼', color: '#10b981' },
//     { id: 'technical', name: 'Technical', icon: '⚙️', color: '#f59e0b' },
//     { id: 'resume', name: 'Resume', icon: '📄', color: '#8b5cf6' },
//     { id: 'interview', name: 'Interview', icon: '🎯', color: '#ef4444' },
//     { id: 'learning', name: 'Learning', icon: '📚', color: '#06b6d4' }
//   ];

//   const personalities = [
//     { id: 'professional', name: 'Professional', icon: '👔' },
//     { id: 'friendly', name: 'Friendly', icon: '😊' },
//     { id: 'motivational', name: 'Motivational', icon: '🚀' },
//     { id: 'detailed', name: 'Detailed', icon: '🔍' }
//   ];

//   const quickQuestions = {
//     general: [
//       "What are the latest trends in tech?",
//       "How can I improve my productivity?",
//       "What skills are in demand for 2024?",
//       "Tell me about remote work best practices"
//     ],
//     career: [
//       "How to negotiate a better salary?",
//       "What career path should I choose?",
//       "How to transition to a new industry?",
//       "Tips for career growth and promotion"
//     ],
//     technical: [
//       "Explain React hooks with examples",
//       "What is microservices architecture?",
//       "How to optimize website performance?",
//       "Best practices for database design"
//     ],
//     resume: [
//       "How to tailor my resume for a specific job?",
//       "What keywords should I include?",
//       "How to highlight achievements?",
//       "Resume formatting best practices"
//     ],
//     interview: [
//       "Common technical interview questions",
//       "How to prepare for behavioral interviews?",
//       "What questions should I ask the interviewer?",
//       "Tips for virtual interviews"
//     ],
//     learning: [
//       "Best resources to learn programming",
//       "How to stay motivated while learning?",
//       "Project ideas for beginners",
//       "Balancing learning with full-time work"
//     ]
//   };

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   useEffect(() => {
//     // Add welcome message when component mounts
//     setMessages([
//       {
//         id: 1,
//         text: "Hello! I'm your Career AI Assistant. I can help you with career advice, technical questions, resume tips, interview preparation, and much more. How can I assist you today?",
//         sender: 'ai',
//         timestamp: new Date(),
//         category: 'general'
//       }
//     ]);
//   }, []);

//   const simulateAIResponse = async (userMessage) => {
//     setIsTyping(true);
    
//     // Simulate API call delay
//     await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));

//     const responses = {
//       general: [
//         "Based on current trends, I'd recommend focusing on AI and machine learning skills. They're becoming increasingly important across all industries.",
//         "Productivity can be improved through time management techniques like Pomodoro and proper task prioritization.",
//         "The most in-demand skills for 2024 include AI/ML, cloud computing, cybersecurity, and data analytics.",
//         "Remote work best practices include setting clear boundaries, maintaining regular communication, and creating a dedicated workspace."
//       ],
//       career: [
//         "When negotiating salary, research industry standards, highlight your achievements, and be prepared to discuss your value proposition.",
//         "Choose a career path that aligns with your interests, skills, and market demand. Consider growth opportunities and work-life balance.",
//         "Transitioning to a new industry requires identifying transferable skills, networking, and potentially additional training or certifications.",
//         "For career growth, seek mentorship, take on challenging projects, continuously learn, and build a strong professional network."
//       ],
//       technical: [
//         "React hooks like useState and useEffect help manage state and side effects in functional components. For example, useState manages component state while useEffect handles lifecycle events.",
//         "Microservices architecture involves building applications as a collection of small, independent services that communicate through APIs.",
//         "Website performance can be optimized through techniques like code splitting, image optimization, caching strategies, and CDN usage.",
//         "Database design best practices include proper normalization, indexing, considering read/write patterns, and planning for scalability."
//       ],
//       resume: [
//         "Tailor your resume by matching keywords from the job description, highlighting relevant experience, and quantifying achievements with metrics.",
//         "Include industry-specific keywords, technical skills, action verbs, and quantifiable results to make your resume stand out.",
//         "Highlight achievements using the STAR method (Situation, Task, Action, Result) and include specific numbers and outcomes.",
//         "Use clean formatting, consistent fonts, clear section headings, and adequate white space. Keep it to 1-2 pages maximum."
//       ],
//       interview: [
//         "Common technical questions include data structures, algorithms, system design, and language-specific concepts. Practice on platforms like LeetCode.",
//         "Prepare for behavioral interviews using the STAR method and have 5-7 stories ready that demonstrate key competencies.",
//         "Ask about team culture, growth opportunities, current challenges, and success metrics for the role.",
//         "For virtual interviews, test your equipment, ensure good lighting, minimize background distractions, and maintain eye contact with the camera."
//       ],
//       learning: [
//         "Great learning resources include freeCodeCamp, Coursera, Udemy, MDN Web Docs, and official documentation for technologies.",
//         "Stay motivated by setting clear goals, tracking progress, joining study groups, and building projects that interest you.",
//         "Beginner project ideas include a personal portfolio, todo app, weather app, or a simple blog using HTML, CSS, and JavaScript.",
//         "Balance learning by dedicating consistent time slots, using commute time for podcasts, and applying new skills to your current work."
//       ]
//     };

//     const categoryResponses = responses[selectedCategory] || responses.general;
//     const randomResponse = categoryResponses[Math.floor(Math.random() * categoryResponses.length)];
    
//     setIsTyping(false);
//     return randomResponse;
//   };

//   const handleSendMessage = async (e) => {
//     e.preventDefault();
    
//     if (!inputMessage.trim()) return;

//     const userMessage = {
//       id: Date.now(),
//       text: inputMessage,
//       sender: 'user',
//       timestamp: new Date(),
//       category: selectedCategory
//     };

//     setMessages(prev => [...prev, userMessage]);
//     setInputMessage('');
//     setIsLoading(true);

//     const aiResponse = await simulateAIResponse(inputMessage);
    
//     const aiMessage = {
//       id: Date.now() + 1,
//       text: aiResponse,
//       sender: 'ai',
//       timestamp: new Date(),
//       category: selectedCategory,
//       personality: aiPersonality
//     };

//     setMessages(prev => [...prev, aiMessage]);
//     setIsLoading(false);
    
//     // Save to conversation history
//     setConversationHistory(prev => [...prev, {
//       user: userMessage,
//       ai: aiMessage,
//       timestamp: new Date()
//     }]);
//   };

//   const handleQuickQuestion = async (question) => {
//     setInputMessage(question);
//     // Auto-send after a brief delay to show the question in input
//     setTimeout(() => {
//       const fakeEvent = { preventDefault: () => {} };
//       handleSendMessage(fakeEvent);
//     }, 100);
//   };

//   const handleCategoryChange = (categoryId) => {
//     setSelectedCategory(categoryId);
//     // Add a context message when changing categories
//     const category = categories.find(cat => cat.id === categoryId);
//     setMessages(prev => [...prev, {
//       id: Date.now(),
//       text: `Switched to ${category.name} mode. Ask me anything about ${category.name.toLowerCase()}!`,
//       sender: 'ai',
//       timestamp: new Date(),
//       category: categoryId,
//       isSystem: true
//     }]);
//   };

//   const clearConversation = () => {
//     setMessages([
//       {
//         id: 1,
//         text: "Conversation cleared. How can I help you now?",
//         sender: 'ai',
//         timestamp: new Date(),
//         category: 'general'
//       }
//     ]);
//     setConversationHistory([]);
//   };

//   const copyToClipboard = (text) => {
//     navigator.clipboard.writeText(text);
//     // You can add a toast notification here
//   };

//   return (
//     <div className="ask-ai-container">
//       {/* Header */}
//       <div className="ai-chat-header">
//         <div className="header-content">
//           <div className="ai-title-section">
//             <div className="ai-avatar">🤖</div>
//             <div className="title-text">
//               <h1 className="ai-main-title">Career AI Assistant</h1>
//               <p className="ai-subtitle">Your personal career guidance expert</p>
//             </div>
//           </div>
//           <div className="header-controls">
//             <button className="clear-chat-btn" onClick={clearConversation}>
//               🗑️ Clear Chat
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="ai-chat-layout">
//         {/* Sidebar */}
//         <div className="ai-chat-sidebar">
//           {/* Category Selection */}
//           <div className="sidebar-section">
//             <h3 className="sidebar-title">💡 Categories</h3>
//             <div className="category-grid">
//               {categories.map(category => (
//                 <button
//                   key={category.id}
//                   className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
//                   onClick={() => handleCategoryChange(category.id)}
//                   style={{ '--category-color': category.color }}
//                 >
//                   <span className="category-icon">{category.icon}</span>
//                   <span className="category-name">{category.name}</span>
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Personality Selection */}
//           <div className="sidebar-section">
//             <h3 className="sidebar-title">🎭 AI Personality</h3>
//             <div className="personality-grid">
//               {personalities.map(personality => (
//                 <button
//                   key={personality.id}
//                   className={`personality-btn ${aiPersonality === personality.id ? 'active' : ''}`}
//                   onClick={() => setAiPersonality(personality.id)}
//                 >
//                   <span className="personality-icon">{personality.icon}</span>
//                   <span className="personality-name">{personality.name}</span>
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Quick Questions */}
//           <div className="sidebar-section">
//             <h3 className="sidebar-title">🚀 Quick Questions</h3>
//             <div className="quick-questions-list">
//               {quickQuestions[selectedCategory].map((question, index) => (
//                 <button
//                   key={index}
//                   className="quick-question-btn"
//                   onClick={() => handleQuickQuestion(question)}
//                 >
//                   {question}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Conversation History */}
//           {conversationHistory.length > 0 && (
//             <div className="sidebar-section">
//               <h3 className="sidebar-title">📚 History</h3>
//               <div className="history-list">
//                 {conversationHistory.slice(-5).map((conv, index) => (
//                   <div key={index} className="history-item">
//                     <div className="history-question">
//                       {conv.user.text.slice(0, 50)}...
//                     </div>
//                     <div className="history-time">
//                       {conv.timestamp.toLocaleTimeString()}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Main Chat Area */}
//         <div className="ai-chat-main">
//           {/* Messages Container */}
//           <div className="messages-container">
//             {messages.map(message => (
//               <div
//                 key={message.id}
//                 className={`message-bubble ${message.sender}-message ${message.isSystem ? 'system-message' : ''}`}
//               >
//                 <div className="message-header">
//                   <div className="sender-avatar">
//                     {message.sender === 'ai' ? '🤖' : '👤'}
//                   </div>
//                   <div className="sender-info">
//                     <span className="sender-name">
//                       {message.sender === 'ai' ? 'Career AI' : 'You'}
//                     </span>
//                     <span className="message-time">
//                       {message.timestamp.toLocaleTimeString()}
//                     </span>
//                   </div>
//                   {message.sender === 'ai' && (
//                     <button
//                       className="copy-message-btn"
//                       onClick={() => copyToClipboard(message.text)}
//                       title="Copy to clipboard"
//                     >
//                       📋
//                     </button>
//                   )}
//                 </div>
//                 <div className="message-content">
//                   {message.text}
//                 </div>
//                 {message.category && !message.isSystem && (
//                   <div className="message-category">
//                     <span 
//                       className="category-tag"
//                       style={{ 
//                         backgroundColor: categories.find(cat => cat.id === message.category)?.color + '20',
//                         color: categories.find(cat => cat.id === message.category)?.color
//                       }}
//                     >
//                       {categories.find(cat => cat.id === message.category)?.icon}
//                       {categories.find(cat => cat.id === message.category)?.name}
//                     </span>
//                   </div>
//                 )}
//               </div>
//             ))}

//             {isTyping && (
//               <div className="message-bubble ai-message typing-indicator">
//                 <div className="message-header">
//                   <div className="sender-avatar">🤖</div>
//                   <div className="sender-info">
//                     <span className="sender-name">Career AI</span>
//                     <span className="typing-text">Typing...</span>
//                   </div>
//                 </div>
//                 <div className="typing-dots">
//                   <span></span>
//                   <span></span>
//                   <span></span>
//                 </div>
//               </div>
//             )}

//             <div ref={messagesEndRef} />
//           </div>

//           {/* Input Area */}
//           <div className="input-container">
//             <form onSubmit={handleSendMessage} className="message-form">
//               <div className="input-wrapper">
//                 <input
//                   type="text"
//                   value={inputMessage}
//                   onChange={(e) => setInputMessage(e.target.value)}
//                   placeholder={`Ask me anything about ${categories.find(cat => cat.id === selectedCategory)?.name.toLowerCase()}...`}
//                   className="message-input"
//                   disabled={isLoading}
//                 />
//                 <button
//                   type="submit"
//                   className="send-button"
//                   disabled={!inputMessage.trim() || isLoading}
//                 >
//                   {isLoading ? (
//                     <div className="send-spinner"></div>
//                   ) : (
//                     <span className="send-icon">🚀</span>
//                   )}
//                 </button>
//               </div>
//               <div className="input-features">
//                 <div className="feature-tags">
//                   <span className="feature-tag">Press Enter to send</span>
//                   <span className="feature-tag">Shift + Enter for new line</span>
//                 </div>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>

//       {/* Floating Action Button */}
//       <div className="floating-actions">
//         <button className="floating-btn" onClick={clearConversation} title="Clear Chat">
//           🗑️
//         </button>
//         <button className="floating-btn" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} title="Scroll to Top">
//           ⬆️
//         </button>
//       </div>
//     </div>
//   );
// }

// export default AskToAI



// AILearningAssistant.js
// import React, { useState, useRef, useEffect } from 'react';
// import './AILearningAssistant.css';

// const AskToAI = () => {
//   const [messages, setMessages] = useState([
//     {
//       id: 1,
//       type: 'ai',
//       content: "Hello! I'm your AI learning assistant. I can help you with:\n\n• Explaining complex concepts\n• Solving coding problems\n• Reviewing your code\n• Preparing for interviews\n• Learning resources\n\nWhat would you like to learn today?",
//       timestamp: new Date(),
//       suggestions: [
//         "Explain React hooks",
//         "Help me debug this code",
//         "Python list comprehension",
//         "JavaScript promises"
//       ]
//     }
//   ]);
//   const [inputMessage, setInputMessage] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [activeCategory, setActiveCategory] = useState('all');
//   const [isTyping, setIsTyping] = useState(false);
//   const messagesEndRef = useRef(null);

//   const categories = [
//     { id: 'all', name: 'All Topics', icon: '🌐' },
//     { id: 'programming', name: 'Programming', icon: '💻' },
//     { id: 'webdev', name: 'Web Dev', icon: '🌐' },
//     { id: 'datascience', name: 'Data Science', icon: '📊' },
//     { id: 'algorithms', name: 'Algorithms', icon: '⚡' },
//     { id: 'career', name: 'Career', icon: '🎯' }
//   ];

//   const quickQuestions = {
//     programming: [
//       "What are React hooks and when to use them?",
//       "Explain object-oriented programming principles",
//       "How does async/await work in JavaScript?",
//       "Difference between let, const, and var"
//     ],
//     webdev: [
//       "Explain the virtual DOM in React",
//       "What is CSS Grid vs Flexbox?",
//       "How to optimize website performance?",
//       "REST API best practices"
//     ],
//     datascience: [
//       "What is machine learning?",
//       "Explain pandas dataframe operations",
//       "How to handle missing data?",
//       "Data visualization best practices"
//     ],
//     algorithms: [
//       "Explain time complexity Big O",
//       "How does quicksort work?",
//       "Dynamic programming concepts",
//       "Binary search implementation"
//     ],
//     career: [
//       "How to prepare for technical interviews?",
//       "Building a strong developer portfolio",
//       "Negotiating job offers",
//       "Career growth in tech"
//     ]
//   };

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const handleSendMessage = async (message = inputMessage) => {
//     if ((!message.trim() && !inputMessage.trim()) || isLoading) return;

//     const userMessage = message || inputMessage;
    
//     // Add user message
//     const newUserMessage = {
//       id: Date.now(),
//       type: 'user',
//       content: userMessage,
//       timestamp: new Date()
//     };

//     setMessages(prev => [...prev, newUserMessage]);
//     setInputMessage('');
//     setIsLoading(true);
//     setIsTyping(true);

//     // Simulate AI response
//     setTimeout(() => {
//       const aiResponse = generateAIResponse(userMessage);
//       setMessages(prev => [...prev, aiResponse]);
//       setIsLoading(false);
//       setIsTyping(false);
//     }, 1500);
//   };

//   const generateAIResponse = (userMessage) => {
//     const responses = {
//       react: `React Hooks are functions that let you use state and other React features in functional components.

// **Main Hooks:**
// • useState - Manage component state
// • useEffect - Handle side effects
// • useContext - Access context values
// • useReducer - Complex state logic

// **Example:**
// \`\`\`jsx
// import { useState, useEffect } from 'react';

// function Counter() {
//   const [count, setCount] = useState(0);
  
//   useEffect(() => {
//     document.title = \`Count: \${count}\`;
//   }, [count]);

//   return (
//     <div>
//       <p>Count: {count}</p>
//       <button onClick={() => setCount(count + 1)}>
//         Increment
//       </button>
//     </div>
//   );
// }
// \`\`\`

// Would you like me to explain any specific hook in more detail?`,

//       python: `Python list comprehensions provide a concise way to create lists.

// **Basic Syntax:**
// \`\`\`python
// [expression for item in iterable if condition]
// \`\`\`

// **Examples:**
// \`\`\`python
// # Square numbers
// squares = [x**2 for x in range(10)]

// # Filter even numbers
// evens = [x for x in range(20) if x % 2 == 0]

// # Nested comprehension
// matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
// flat = [num for row in matrix for num in row]
// \`\`\`

// They're more readable and often faster than traditional loops!`,

//       javascript: `JavaScript Promises represent the eventual completion of an asynchronous operation.

// **Creating a Promise:**
// \`\`\`javascript
// const myPromise = new Promise((resolve, reject) => {
//   // Async operation
//   if (success) {
//     resolve(value);
//   } else {
//     reject(error);
//   }
// });
// \`\`\`

// **Using Promises:**
// \`\`\`javascript
// fetch('https://api.example.com/data')
//   .then(response => response.json())
//   .then(data => console.log(data))
//   .catch(error => console.error('Error:', error))
//   .finally(() => console.log('Operation completed'));
// \`\`\`

// **Async/Await (modern approach):**
// \`\`\`javascript
// async function fetchData() {
//   try {
//     const response = await fetch('/api/data');
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error('Failed:', error);
//   }
// }
// \`\`\``,

//       default: `Great question! I'd be happy to help you with that.

// Based on your query about "${userMessage}", here's what I can share:

// **Key Concepts:**
// • Fundamental principles and definitions
// • Practical examples and use cases
// • Best practices and common patterns
// • Potential pitfalls to avoid

// **Learning Resources:**
// 📚 Recommended reading: Official documentation
// 🎥 Video tutorials: FreeCodeCamp, Traversy Media
// 💻 Practice: LeetCode, HackerRank exercises

// Would you like me to:
// 1. Provide a more detailed explanation?
// 2. Share specific code examples?
// 3. Recommend learning resources?
// 4. Help with implementation?

// Feel free to ask follow-up questions!`
//     };

//     let response = responses.default;
    
//     if (userMessage.toLowerCase().includes('react') || userMessage.toLowerCase().includes('hook')) {
//       response = responses.react;
//     } else if (userMessage.toLowerCase().includes('python') || userMessage.toLowerCase().includes('list')) {
//       response = responses.python;
//     } else if (userMessage.toLowerCase().includes('javascript') || userMessage.toLowerCase().includes('promise')) {
//       response = responses.javascript;
//     }

//     return {
//       id: Date.now() + 1,
//       type: 'ai',
//       content: response,
//       timestamp: new Date(),
//       suggestions: [
//         "Show me more examples",
//         "Explain the syntax",
//         "Common mistakes to avoid",
//         "Related concepts"
//       ]
//     };
//   };

//   const handleQuickQuestion = (question) => {
//     handleSendMessage(question);
//   };

//   const handleSuggestionClick = (suggestion) => {
//     handleSendMessage(suggestion);
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       handleSendMessage();
//     }
//   };

//   const formatMessageContent = (content) => {
//     return content.split('\n').map((line, index) => {
//       if (line.startsWith('**') && line.endsWith('**')) {
//         return <strong key={index}>{line.slice(2, -2)}</strong>;
//       }
//       if (line.startsWith('• ')) {
//         return <li key={index}>{line.slice(2)}</li>;
//       }
//       if (line.includes('```')) {
//         return null; // Skip code block markers
//       }
//       if (line.trim() === '') {
//         return <br key={index} />;
//       }
//       return <p key={index}>{line}</p>;
//     });
//   };

//   const formatTime = (date) => {
//     return date.toLocaleTimeString('en-US', { 
//       hour: '2-digit', 
//       minute: '2-digit' 
//     });
//   };

//   return (
//     <div className="ai-learning-container">
//       {/* Header */}
//       <div className="ai-assistant-header">
//         <div className="askai-header-content">
//           <div className="ai-avatar">
//             <div className="avatar-icon">🤖</div>
//             <div className="online-indicator"></div>
//           </div>
//           <div className="askai-header-text">
//             <h1>AI Learning Assistant</h1>
//             <p>Your personal tutor for programming and tech concepts</p>
//           </div>
//         </div>
//         <div className="header-stats">
//           <div className="askai-stat-item">
//             <span className="askai-stat-number">{messages.length}</span>
//             <span className="stat-label">Messages</span>
//           </div>
//           <div className="askai-stat-item">
//             <span className="askai-stat-number">24/7</span>
//             <span className="stat-label">Available</span>
//           </div>
//         </div>
//       </div>

//       <div className="ai-assistant-content">
//         {/* Sidebar */}
//         <div className="learning-sidebar">
//           <div className="sidebar-section">
//             <h3>Learning Topics</h3>
//             <div className="category-filters">
//               {categories.map(category => (
//                 <button
//                   key={category.id}
//                   className={`category-filter ${activeCategory === category.id ? 'active' : ''}`}
//                   onClick={() => setActiveCategory(category.id)}
//                 >
//                   <span className="category-icon">{category.icon}</span>
//                   <span className="category-name">{category.name}</span>
//                 </button>
//               ))}
//             </div>
//           </div>

//           <div className="sidebar-section">
//             <h3>Quick Questions</h3>
//             <div className="quick-questions">
//               {quickQuestions[activeCategory]?.map((question, index) => (
//                 <button
//                   key={index}
//                   className="quick-question-btn"
//                   onClick={() => handleQuickQuestion(question)}
//                 >
//                   {question}
//                 </button>
//               )) || quickQuestions.programming.map((question, index) => (
//                 <button
//                   key={index}
//                   className="quick-question-btn"
//                   onClick={() => handleQuickQuestion(question)}
//                 >
//                   {question}
//                 </button>
//               ))}
//             </div>
//           </div>

//           <div className="sidebar-section">
//             <h3>Learning Tips</h3>
//             <div className="learning-tips">
//               <div className="tip-card">
//                 <span className="tip-icon">💡</span>
//                 <p>Ask specific questions for detailed answers</p>
//               </div>
//               <div className="tip-card">
//                 <span className="tip-icon">🔍</span>
//                 <p>Request code examples for better understanding</p>
//               </div>
//               <div className="tip-card">
//                 <span className="tip-icon">📚</span>
//                 <p>Follow up with "explain like I'm 5" for simplicity</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Main Chat Area */}
//         <div className="chat-main-area">
//           <div className="chat-messages-container">
//             <div className="chat-messages">
//               {messages.map(message => (
//                 <div
//                   key={message.id}
//                   className={`message-bubble ${message.type}-message`}
//                 >
//                   <div className="message-header">
//                     <div className="message-sender">
//                       {message.type === 'ai' ? (
//                         <>
//                           <span className="sender-avatar">🤖</span>
//                           <span className="sender-name">AI Assistant</span>
//                         </>
//                       ) : (
//                         <>
//                           <span className="sender-avatar">👤</span>
//                           <span className="sender-name">You</span>
//                         </>
//                       )}
//                     </div>
//                     <span className="message-time">
//                       {formatTime(message.timestamp)}
//                     </span>
//                   </div>
                  
//                   <div className="message-content">
//                     {formatMessageContent(message.content)}
//                   </div>

//                   {message.suggestions && message.type === 'ai' && (
//                     <div className="message-suggestions">
//                       <p className="suggestions-label">Follow-up questions:</p>
//                       <div className="suggestion-chips">
//                         {message.suggestions.map((suggestion, index) => (
//                           <button
//                             key={index}
//                             className="suggestion-chip"
//                             onClick={() => handleSuggestionClick(suggestion)}
//                           >
//                             {suggestion}
//                           </button>
//                         ))}
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               ))}

//               {isTyping && (
//                 <div className="message-bubble ai-message typing-indicator">
//                   <div className="message-header">
//                     <div className="message-sender">
//                       <span className="sender-avatar">🤖</span>
//                       <span className="sender-name">AI Assistant</span>
//                     </div>
//                   </div>
//                   <div className="typing-dots">
//                     <span></span>
//                     <span></span>
//                     <span></span>
//                   </div>
//                 </div>
//               )}

//               <div ref={messagesEndRef} />
//             </div>
//           </div>

//           {/* Input Area */}
//           <div className="chat-input-container">
//             <div className="input-wrapper">
//               <textarea
//                 value={inputMessage}
//                 onChange={(e) => setInputMessage(e.target.value)}
//                 onKeyPress={handleKeyPress}
//                 placeholder="Ask me anything about programming, algorithms, career advice..."
//                 className="message-input"
//                 rows="1"
//                 disabled={isLoading}
//               />
//               <button
//                 onClick={() => handleSendMessage()}
//                 disabled={!inputMessage.trim() || isLoading}
//                 className="send-button"
//               >
//                 {isLoading ? (
//                   <div className="loading-spinner-small"></div>
//                 ) : (
//                   <span className="send-icon">🚀</span>
//                 )}
//               </button>
//             </div>
//             <div className="input-features">
//               <div className="feature-buttons">
//                 <button className="feature-btn" title="Attach code">
//                   📎
//                 </button>
//                 <button className="feature-btn" title="Format code">
//                   {`</>`}
//                 </button>
//                 <button className="feature-btn" title="Clear chat">
//                   🗑️
//                 </button>
//               </div>
//               <div className="input-tips">
//                 Press Enter to send • Shift+Enter for new line
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Floating Action Button */}
//       <div className="floating-actions">
//         <button className="floating-btn" title="New Chat">
//           ➕
//         </button>
//         <button className="floating-btn" title="Save Conversation">
//           💾
//         </button>
//         <button className="floating-btn" title="Share">
//           📤
//         </button>
//       </div>
//     </div>
//   );
// };

const AskToAI = () => {
  return (
    <div>
      <ComingSoon />
    </div>
  );
}

export default AskToAI;