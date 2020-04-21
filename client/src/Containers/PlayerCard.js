import React, { useEffect, useState ,useCallback } from 'react';
import PlayingCard from './PlayingCard';
import {Row, Column, Col, Container, Button} from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import GameTable from './GameTable';
import Scoreboard from './Scoreboard'

import io from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:5001";

let socket = io.connect(ENDPOINT)

var utils = require('./Utils')

const PlayerCard = (props) => {
  const base_url = utils.getUrl('base');
  const play_url = utils.getUrl('play');
  const player_id = localStorage.getItem("player_id");

  const continue_url = utils.getUrl('continue');


  const [doRefresh, setDoRefresh] = useState(false);
  const [playerCards, setPlayerCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [isPassed, setIsPassed] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [isPlayed, setIsPlayed] = useState(false);
  const [playerTurn, setPlayerTurn] = useState('');
  const [suit, setSuit] = useState('');
  const [onTable, setOnTable] = useState([0,0,0,0]);
  const [playerUsernames, setPlayerUsernames] = useState({'p1':[],'p2':[],'p3':[],'p4':[]});
  const [score, setScore] = useState('');
  const [doContinue, setDoContinue] = useState('');
  const [breCount, setBreCount] = useState('');
  const [gameStatusData, setGameStatusData] = useState('');



  const synchData = () => {
    socket.on("doRefresh" , msg => {
      setDoRefresh(msg.refresh);
    });
}

  async function getData() {
    let result = await fetch(base_url, {
      method: 'GET'
    });
    return await result.json();
  }


  async function sendPassedData() {
    let result =  await fetch(play_url+player_id, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({cards: selectedCards , startNewGame: false})
    });
    return await result.json();
  }

  async function sendPlayedData() {
    let result =  await fetch(play_url+player_id, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({cards: selectedCards , startNewGame: false})
    });
    return await result.json();
  }


  const renewGame = () => {
    utils.getData(continue_url+player_id ).then(data => setComponentData(data));
  };

  const Refresh = () => {
    console.log('Refreshing the contents....');
    setDoRefresh(false);
    utils.getData(base_url).then(data => setComponentData(data));

  };
  const RefreshAfterPlayCard = () => {
    setIsPlayed(true)
    utils.getData(base_url).then(data => setComponentData(data));
  };
  const RefreshAfterPassCard = () => {
    setIsPassed(true)
    utils.getData(base_url).then(data => setComponentData(data));
  };

  const setComponentData = (data) => {
    setPlayerCards(data.game.gameState.cards[player_id]);
    setIsStarted(data.game.gameState.state === 'STARTED' );
    setIsPassed(data.game.gameState.cardPassed[player_id].length >0 || data.game.gameState.isCardPassed );
    setPlayerTurn(data.game.gameState.turn)
    setSuit(data.game.gameState.suit);
    setOnTable(data.game.gameState.playerTableCards[player_id])
    setPlayerUsernames(data.game.gameState.playerTableUsernames)
    setScore(data.game.gameState.gameScores)
    setDoContinue(data.game.doStartNewGame)
    setBreCount(data.game.breCount)
    setGameStatusData(data.game.gameState.state)


  };

  useEffect(() => {
    if(player_id === null){
      return <Redirect to="/" />
    }
    utils.getData(base_url).then(data => setComponentData(data));
    synchData();
  }, []);

  const sendPassedCards = (e) => {
    sendPassedData().then(res => RefreshAfterPassCard());
  };

  const sendPlayingCards = (e) => {
    sendPlayedData().then(res => RefreshAfterPlayCard() );
  };


  const onSelect = (cardValue) => {
    cardValue = Number(cardValue)
    let CardList = [...selectedCards];
    const isPresent = CardList.some(val => val === cardValue);
    if (!isPresent) {setSelectedCards([...selectedCards, cardValue]);}
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
    <div>{doRefresh && Refresh()}
      <div class="row">
      <div class="col"></div>
          <div class="col">
                < GameTable  onTableCardsData={onTable} PlayerUsername={playerUsernames} />
          </div>
          <div class="col"> <Scoreboard scores={score} usernames={playerUsernames['p1']} doContinue={doContinue} breCount={breCount} /> </div>
      </div>
      <div class="row">
      <Container> <Row>
        {playerCards.length > 0  && playerCards.sort(function(a, b){return a - b}).map(card => <PlayingCard code={card} isPicked={(selectedCards.indexOf(card) === -1) ? false : true } {...selectProps}  />)}

      </Row><br></br>
      <Row>
        {/* {console.log('see these : ',doRefresh ,isStarted , isPassed , (playerTurn === player_id))} */}
        {isPassed ?
          <Button style={{position: 'fixed' ,bottom:'20px', left: '200px'}}
          variant={(!isStarted || (playerTurn !== player_id) || selectedCards.length !== 1) ? "danger" : "success"} onClick={sendPlayingCards} disabled={!isStarted ||(playerTurn !== player_id) || selectedCards.length !== 1}>
          {'PLAY'}
          </Button>
        :
          <Button style={{position: 'fixed' ,bottom:'20px', left: '200px'}}
            variant={(isPassed || selectedCards.length !== 6) ? "danger" : "success"} onClick={sendPassedCards} disabled={isPassed || selectedCards.length !== 6}>
            {'PASS'}
          </Button>
        }
           <Button style={{position: 'fixed' ,bottom:'20px', left: '400px'}}
            variant="primary" onClick={Refresh}>
            {'Refresh'}
          </Button>

          <Button style={{position: 'fixed',bottom:'20px', left: '500px'}}
            variant="secondary" >
            {playerTurn + " 's Turn"}
          </Button>
          <Button style={{position: 'fixed' ,bottom:'20px', left: '600px'}}
            variant="secondary" >
            {"suit : " + suit }
          </Button>

          <Button style={{position: 'fixed' ,bottom:'20px', left: '700px'}}
            variant="primary" onClick={renewGame}>
            {gameStatusData}
          </Button>

          <Button style={{position: 'fixed' ,bottom:'20px', left: '900px'}}
            variant="primary" onClick={renewGame}>
            {'Renew'}
          </Button>

          <Button style={{position: 'fixed' ,bottom:'20px', right: '50px'}}
             onClick={() => {localStorage.setItem("player_id",playerTurn);window.location.reload()}}>
            GO
          </Button>

      </Row><br></br><br></br><br></br>

      </Container>
      </div>

    </div>
  );
};

export default PlayerCard;