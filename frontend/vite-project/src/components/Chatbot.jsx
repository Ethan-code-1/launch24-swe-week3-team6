import React, { useState, useEffect } from 'react';
import '../styles/chatbot.css';
import ArrowIcon from '../icons/arrow-icon.png';
import SendIcon from '../icons/send-icon.png';
import axios from "axios";

const Chatbot = ({ showChat, handleSetChatView }) => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChatSubmit = async (e) => {
    e.preventDefault();
    
    const newMessages = [
      ...messages,
      { role: 'user', content: input }
    ];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      //http://localhost:5001/api/recipes/cuisine/all
      const response = await axios.post('http://localhost:5001/chat',
        {
          messages: newMessages
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      const data = await response.data;
      setLoading(false);
      console.log(data.content);

      if (data) {
        const assistantMessage = data;
        // data.choices[0].message.content
        setMessages([...newMessages, assistantMessage]); //setting messages to updated one plus response 
      } else {
        console.error('Unexpected response structure:', data);
      }

    }
    catch (error) {
      console.error('Error fetching chat completion:', error);
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleChatSubmit(e);
    }
  };

  const [messages, setMessages] = useState([
    {"role": "system", "content": "This is a recipe app where you will be asked questions on specific recipes"},
    {"role": "assistant", "content": "Hi! How can I help you today?"},
    ]);
  
  return (
    <div className='chat-container'> 
      <div>
        <div className='chat-banner'>
                <div className='chat-title'>Hi there!</div>
                <button onClick={handleSetChatView} className='arrow-button' >
                  <img src={ArrowIcon} alt="Arrow Icon" className='arrow' /> 
                </button>
              </div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 240" className='sqiggle'>
              <path fill="#49B043" fillOpacity="1" d="M0,192L48,183.3C96,174,192,160,288,160C384,160,480,174,576,186.7C672,200,768,208,864,195.3C960,183,1056,152,1152,132C1248,112,1344,104,1392,100L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
            </svg>

         <div className='chats-container'>
                {messages.filter(msg => msg.role !== 'system').map((msg, index) => (
                  <div key={index} className={`message ${msg.role}`}>
                    {msg.content}
                  </div>
                ))}
              {loading && (
                <div className="message-loading">
                  <div className="loading-bubble">...</div>
                </div>
                )}
        </div>
      </div>

      <div className='enter-chat'>
        <form className='chat-form' onSubmit={handleChatSubmit}>
          <textarea
            className='chat-input'
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
          />
          <button type="submit" className='chat-submit'>
            <img src={SendIcon} alt='Send Icon' />
          </button>
        </form>
      </div>
  </div>
  )
}

export default Chatbot