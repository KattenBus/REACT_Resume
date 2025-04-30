import React, { useState } from 'react';
import Cat from "/Cat.jpg";
import Window from './Window';
import { FaCat } from "react-icons/fa";
import { FaLocationArrow } from "react-icons/fa";


export default function Chatbot() {
  const [question, setQuestion] = useState('');  // Holds user input
  const [answer, setAnswer] = useState([]);      // Holds the response from the backend
  const [loading, setLoading] = useState(false); // For showing loading spinner
  const [showChatBot, setShowChatBot] = useState(false);

  const [chatHistory, setShowChatHistory] = useState([{
    user: {question},
    kedelbejn: {answer}
  }]);


  function handleShowChatBot() {
    setShowChatBot((previousState) => !previousState);
  }

  // Handle user input
  const handleInputChange = (event) => {
    setQuestion(event.target.value);
  };

  // Handle form submission (sending request to backend)
  const handleSubmit = async (event) => {
    event.preventDefault();  // Prevent page reload on form submit

    if (!question) return;  // Don't send empty question

    setLoading(true);  // Show loading spinner
    //setAnswer('');     // Clear previous answer

    try {
      // Sending POST request to your backend
      const response = await fetch('http://localhost:5000/api/ask-bot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),  // Send the question as the request body
      });

      setQuestion('');

      const data = await response.json();  // Parse the response JSON

      if (response.ok) {
        setAnswer((previous) => [...previous, data.answer]);  // Update the answer state with the response from the backend
      } else {
        setAnswer('Sorry, something went wrong. Please try again.');
      }
    } catch (error) {
      setAnswer('Error: Could not connect with the cat.');
      console.error('Error:', error);
    } finally {
      setLoading(false);  // Hide loading spinner once response is received
    }
  };


  return (
    <>
      <div className = "chatbot-icon" onClick={handleShowChatBot}>
        <img src ={Cat} id = "chatbot-picture"/>
      </div>

      {showChatBot && (

        <Window
          contentIcon={Cat}
          contentText={"Prata med Kedelbejn!"}
        >
        <div className = "chatbot-container">
          <div id = "conversation-window">
            {answer.length > 0 && (
              answer.map((message, index) => (
                <div id = "kidelbejn-answer">
                  <div id = "kidelbejn-avatar-section">
                    <img src = {Cat} id = "kidelbejn-avatar-photo"/>
                      <p>Kedelbejn</p>
                  </div>
                  <p key={index}>{message}</p>
                </div>
              ))
            )}
          </div>
          <form id = "message-area" onSubmit={handleSubmit}>
            <input id = "inputField-chatBot"
              type="text"
              value={question}
              onChange={handleInputChange}
              placeholder="Ställ honom en fråga!"
            />
            <button type="submit" id = "inputFieldd-button" disabled={loading}>
              {loading ? <p id = "chatbot-button-logo"><FaCat /></p> : <p><FaLocationArrow /></p>}
            </button>
          </form>
        </div>
        </Window>

      )}

    </>
  );
}
