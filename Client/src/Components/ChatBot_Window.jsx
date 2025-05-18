import { useState, useRef, useEffect } from 'react';
import Cat from "/Cat.jpg";
import User_Icon from "/User_Icon.png";
import { FaCat, FaLocationArrow } from "react-icons/fa";

export default function Chatbot() {
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);

  const scrollToBottomRef = useRef(null);

  useEffect(() => {
    scrollToBottomRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }, [chatHistory]);

  const handleInputChange = (event) => {
    setQuestion(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!question) return;
    setLoading(true);

    try {
      const userMessage = question;
      setQuestion('');

      // Format chat history for OpenAI
      const formattedMessages = chatHistory.flatMap((entry) => [
        { role: 'user', content: entry.user },
        { role: 'assistant', content: entry.kedelbejn },
      ]);
      formattedMessages.push({ role: 'user', content: userMessage });

      const response = await fetch('https://react-resume-uqm7.onrender.com/api/ask-bot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: formattedMessages }),
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
      <div className="chatbot-container">
        <div id="conversation-window">
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
          <div ref={scrollToBottomRef} />
        </div>
        <form id="message-area" onSubmit={handleSubmit}>
          <input
            id="inputField-chatBot"
            type="text"
            value={question}
            onChange={handleInputChange}
            placeholder="Ställ en fråga till Kedelbejn!"
          />
          <button type="submit" id="inputFieldd-button" disabled={loading}>
            {loading ? (
              <p id="chatbot-button-catLogo"><FaCat /></p>
            ) : (
              <p id="chatbot-button-arrowLogo"><FaLocationArrow /></p>
            )}
          </button>
        </form>
      </div>
    </>
  );
}
