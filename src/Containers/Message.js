import React from 'react';

import './Message.css';

import ReactEmoji from 'react-emoji';

const Message = ({ message: { text, user , player_id }, name }) => {

  let isSentByCurrentUser = false;
  const trimmedName = name;
  const player_id_current = localStorage.getItem("player_id");
  if(player_id === player_id_current) {
    isSentByCurrentUser = true;
  }

  const colorCode = ['#f2021a' , '#020af2' , '#02f2de' , '#0ef202']

  return (
    isSentByCurrentUser
      ? (
        <div className="messageContainer justifyEnd">
          <p className="sentText pr-10">{''}</p>
          <div className="messageBox backgroundBlue">
            <p className="messageText colorWhite">{ReactEmoji.emojify(text)}</p>
          </div>
        </div>
        )
        : (
          <div className="messageContainer justifyStart">
            <div className="messageBox backgroundLight">
            <p className="sentText pl-10 " style={{color:player_id ? colorCode[Number(player_id.substr(1))-1] : 'black' }}><b>{user} </b>: </p>
              <p className="messageText colorDark">{ReactEmoji.emojify(text)}</p>

            </div>

          </div>
        )
  );
}

export default Message;