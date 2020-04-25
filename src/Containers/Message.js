import React from 'react';

import './Message.css';

import ReactEmoji from 'react-emoji';

const Message = ({ message: { text, user }, name }) => {
  let isSentByCurrentUser = false;
  const trimmedName = name;
  if(user === trimmedName) {
    isSentByCurrentUser = true;
  }
  const colorCode = ['red' , 'blue' , 'pink' , 'green']

  return (
    isSentByCurrentUser
      ? (
        <div className="messageContainer justifyEnd">
          <p className="sentText pr-10">{trimmedName}</p>
          <div className="messageBox backgroundBlue">
            <p className="messageText colorWhite">{ReactEmoji.emojify(text)}</p>
          </div>
        </div>
        )
        : (
          <div className="messageContainer justifyStart">
            <div className="messageBox backgroundLight">
            <p className="sentText pl-10 " style={{color:colorCode[3]}}>{user} : </p>
              <p className="messageText colorDark">{ReactEmoji.emojify(text)}</p>

            </div>

          </div>
        )
  );
}

export default Message;