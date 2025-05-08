import React, { useState } from 'react';
import Cat from "/Cat.jpg";
import User_Icon from "/User_Icon.png";
import Window from './Window';
import { FaCat } from "react-icons/fa";
import { FaLocationArrow } from "react-icons/fa";


export default function Chatbot() {
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [showChatBot, setShowChatBot] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);


  function handleShowChatBot() {
    setShowChatBot((previousState) => !previousState);
  }

  const handleInputChange = (event) => {
    setQuestion(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (!question) return;
  
    setLoading(true);
  
    try {
      const userMessage = question;  // Store current question before clearing
      setQuestion('');
  
      const response = await fetch('http://localhost:5000/api/ask-bot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: userMessage }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setChatHistory((prev) => [...prev, { user: userMessage, kedelbejn: data.answer }]);
      } else {
        setChatHistory((prev) => [...prev, { user: userMessage, kedelbejn: "Sorry, something went wrong. Please try again." }]);
      }
    } catch (error) {
      setChatHistory((prev) => [...prev, { user: question, kedelbejn: "Error: Could not connect with the cat." }]);
      console.error('Error:', error);
    } finally {
      setLoading(false);
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
          {chatHistory.map((entry, index) => (
            <div key={index} className="chat-message-pair">
              <div id="user-message">
                <p>{entry.user}</p>
                <div id="user-avatar-section">
                  <img src={User_Icon} id="user-avatar-photo" />
                  <p>Du:</p>
                </div>
              </div>
              <div id="kidelbejn-answer">
                <div id="kidelbejn-avatar-section">
                  <img src={Cat} id="kidelbejn-avatar-photo" />
                  <p>Kedelbejn</p>
                </div>
                <p>{entry.kedelbejn}</p>
              </div>
            </div>
          ))}
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
