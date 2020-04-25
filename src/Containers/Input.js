import React from 'react';

import './Input.css';

const Input = ({ setMessage, sendMessage, message }) => (
  <form className="form">
    <input
      className="textInput"
      type="text"
      placeholder="Type a message..."
      value={message}
      onChange={({ target: { value } }) => setMessage(value)}
      onKeyPress={event => {if(event.key === 'Enter' ){ sendMessage(event)}  }}
    />
    {/* <button className="sendButton" onClick={e => sendMessage(e)}>Send</button> */}
  </form>
)

export default Input;