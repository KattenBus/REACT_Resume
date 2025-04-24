import React, { useState } from 'react';

export default function Chatbot() {
  const [question, setQuestion] = useState('');  // Holds user input
  const [answer, setAnswer] = useState('');      // Holds the response from the backend
  const [loading, setLoading] = useState(false); // For showing loading spinner

  // Handle user input
  const handleInputChange = (event) => {
    setQuestion(event.target.value);
  };

  // Handle form submission (sending request to backend)
  const handleSubmit = async (event) => {
    event.preventDefault();  // Prevent page reload on form submit

    if (!question) return;  // Don't send empty question

    setLoading(true);  // Show loading spinner
    setAnswer('');     // Clear previous answer

    try {
      // Sending POST request to your backend
      const response = await fetch('http://localhost:5000/api/ask-bot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),  // Send the question as the request body
      });

      const data = await response.json();  // Parse the response JSON

      if (response.ok) {
        setAnswer(data.answer);  // Update the answer state with the response from the backend
      } else {
        setAnswer('Sorry, something went wrong. Please try again.');
      }
    } catch (error) {
      setAnswer('Error: Could not connect to the bot.');
      console.error('Error:', error);
    } finally {
      setLoading(false);  // Hide loading spinner once response is received
    }
  };
  

  return (
    <div>
      <h1>Chat with the Bot</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={question}
          onChange={handleInputChange}
          placeholder="Ask a question..."
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Asking...' : 'Ask'}
        </button>
      </form>

      {answer && (
        <div>
          <h2>Answer:</h2>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
}
