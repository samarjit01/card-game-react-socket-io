import React, { useEffect, useState } from 'react';
import PlayingCard from './PlayingCard';
import {Row, Column, Col, Container, Button} from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
var utils = require('./Utils')

const PlayerCard = (props) => {
  const base_url = "https://mytestpipeli-cardgame-mlrbbhci.herokuapp.com/";
  const player_id = localStorage.getItem("player_id");

  const [data, setData] = useState({});
  const [selectedCards, setSelectedCards] = useState([]);
  const [isPassed, setIsPassed] = useState(false);

  async function getData() {
    let result = await fetch(base_url+"1", {
      method: 'GET'
    });
    return await result.json();
  }

  async function sendData() {
    let result =  await fetch(base_url+"play/1/"+player_id, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({cards: selectedCards , startNewGame: false})
    });
    return await result.json();
  }





  useEffect(() => {
    getData().then(data => setData(data));
  }, []);

  const sendPassedCards = (e) => {
    sendData().then(res => setIsPassed(true));
  };

  const onSelect = (cardValue) => {
    cardValue = Number(cardValue)
    let CardList = [...selectedCards];
    const isPresent = CardList.some(val => val === cardValue);
    if (!isPresent) setSelectedCards([...selectedCards, cardValue]);
    else {
      var index = CardList.indexOf(cardValue);
      if (index !== -1) {
        CardList.splice(index, 1);
        setSelectedCards(CardList);
      }
    }
  };

  const selectProps = {
    onSubmit: (value) => {
      onSelect(value);
    }
  }

  if(player_id == null){
    return <Redirect to="/" />
  }

  return (
    <div>
      <Container> <Row>
        {data && data.game && data.game.gameState && data.game.gameState.cards
        && data.game.gameState.cards[player_id].map(card => <PlayingCard code={card} {...selectProps}  />)}

      </Row><br></br>
      <Row>
      {(isPassed) ? ( (selectedCards.length == 1) ?
          <Button
          variant="secondary">
          {'PLAY'}
        </Button>
        :console.log("select 1 cards") )
        : (selectedCards.length == 6)?
       <Button
          variant="secondary" onClick={sendPassedCards}>
          {'PASS'}
        </Button>
      : console.log("select 6 cards")}
      </Row>
      </Container>

    </div>
  );
};

export default PlayerCard;