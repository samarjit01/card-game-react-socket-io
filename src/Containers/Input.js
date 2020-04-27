import React from 'react';

import './Input.css';
import { Button } from 'react-bootstrap';

const Input = ({ setMessage, sendMessage, message }) => (
  <form className="form">
    <input
      className="textInput"
      type="text"
      placeholder=" Type a message..."
      value={message}
      onChange={({ target: { value } }) => setMessage(value)}
      onKeyPress={event => {if(event.key === 'Enter' ){ sendMessage(event)}  }}
    />
    <Button  variant="info" onClick={e => sendMessage(e)}>Send</Button>
  </form>
)

export default Input;