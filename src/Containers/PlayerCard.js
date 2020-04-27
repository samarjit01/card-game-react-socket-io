import React, { useEffect, useState  } from 'react';
import PlayingCard from './PlayingCard';
import {Row, Container, Button , Alert ,Modal , Card} from 'react-bootstrap';
import GameTable from './GameTable';
import Scoreboard from './Scoreboard'
import Messages from './Messages'
import Input from './Input'
import LastRoundCards from './LastRoundCards'



import io from "socket.io-client";

var utils = require('./Utils')


const ENDPOINT = utils.getUrl('socketbase');

let socket = io.connect(ENDPOINT)

const base_url = utils.getUrl('base');
const play_url = utils.getUrl('play');


const PlayerCard = (props) => {

  const player_id = localStorage.getItem("player_id");

  const continue_url = utils.getUrl('continue');


  const [doRefresh, setDoRefresh] = useState(false);
  const [selectedCards, setSelectedCards] = useState([]);
  const [isPassed, setIsPassed] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [playerTurn, setPlayerTurn] = useState('');
  const [suit, setSuit] = useState('');
  const [doContinue, setDoContinue] = useState('');
  const [breCount, setBreCount] = useState('');
  const [game , setGame] = useState('');
  const [stats , setStats] = useState(true);
  const [show, setShow] = useState(false);
  const [showMsg, setShowMsg] = useState('');

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);


  const handleClose = () => {setShow(false);setShowMsg('')};
  const handleShow = () => {setShow(true);};



  const synchData = () => {
    socket.on("doRefresh" , msg => {
      console.log('from server : ',msg);
      setDoRefresh(msg.refresh);
    });
    socket.on('message', message => {
      console.log(message)
      setMessages(messages => [ ...messages, message ]);
    });
}


const sendMessage = (event) => {
  event.preventDefault();

  if(message) {
    let username = game && game.playerName[game.playerId[player_id]];
    let data = {chatMsg : message , userName : username , player_id: player_id}
    socket.emit('sendMessage', data, () => {});
    setMessage('')
  }
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
  const logOutGame = () => {
         localStorage.removeItem("player_id");
         localStorage.removeItem("game_id" );
         localStorage.removeItem("username" );
         window.location.reload();
  };

  const showStats = () => {
    setStats(!stats)
  };

  const Refresh = () => {
    console.log('Refreshing the contents....');
    setDoRefresh(false);
    utils.getData(base_url).then(data => setComponentData(data));

  };
  const RefreshAfterPlayCard = () => {

      utils.getData(base_url).then(data => setComponentData(data));

  };
  const RefreshAfterPassCard = () => {
    setIsPassed(true)
    utils.getData(base_url).then(data => setComponentData(data));
  };



  const setComponentData = (data) => {
    setIsStarted(data.game.gameState.state === 'STARTED' );
    setIsPassed(data.game.gameState.cardPassed[player_id].length >0 || data.game.gameState.isCardPassed );
    setPlayerTurn(data.game.gameState.turn)
    setSuit(data.game.gameState.suit);
    setDoContinue(data.game.doStartNewGame)
    setBreCount(data.game.breCount)
    setGame(data.game)
    setSelectedCards([])

  };

  useEffect(() => {
    utils.getData(base_url).then(data => setComponentData(data));
    synchData();


  }, []);

  const sendPassedCards = (e) => {
    sendPassedData().then(res => RefreshAfterPassCard());

  };



  const sendPlayingCards = (e) => {

      sendPlayedData().then(res => {setShowMsg(res.error);if(res.isSuccessful === false){handleShow()}else{RefreshAfterPlayCard();}});

    }


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





  return (
    <div>{doRefresh && Refresh()}
      <div className="row">

            {/* // first coloumn for msg box */}
      <div className="col-sm-12 col-md-4">
         <div>
            <div className="container">
              <Messages messages={messages} name={'name'} />
              <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
              </div>
              <>
                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Message</Modal.Title>
                  </Modal.Header>
                <Modal.Body>{showMsg}</Modal.Body>
                </Modal>
              </>
            </div>
          </div>


         {/* second coloumn for gameTable */}
          <div className="col-sm-12 col-md-4">

               {game &&  < GameTable suitCode={game.gameState.suit} onTableCardsData={game.gameState.playerTableCards[player_id]} PlayerUsername={game.gameState.playerTableUsernames[player_id]} /> }
               {stats && game &&
          <LastRoundCards usernames={game.playerName}
               lastRoundCards={game.gameState.lastRoundCards}
               turn={game.gameState.turn}/>
          }

          </div>



          {/* // third coloumn for scoreBoard and details */}
          <div className="col-sm-12 col-md-4">

               <div className="row mt-3">
               <div className="col-12 mt-2">
               <div class="btn-group btn-group-justified mt-2">
                    {game && (game.gameState.turn === player_id || game.gameState.isCardPassed === false) &&
                        (game.gameState.cards[player_id].length > 0) &&
                        (isPassed ?

                        <Button
                        variant={(!isStarted || (playerTurn !== player_id) || selectedCards.length !== 1) ? "danger" : "success"} onClick={sendPlayingCards} disabled={!isStarted ||(playerTurn !== player_id) || selectedCards.length !== 1}>
                        {'Play'}
                        </Button>

                      :

                        <Button
                          variant={(isPassed || selectedCards.length !== 6) ? "danger" : "success"} onClick={sendPassedCards} disabled={isPassed || selectedCards.length !== 6}>
                          {'Pass'}
                        </Button>
                      )
                        }

                           <Button
                              variant="secondary" onClick={renewGame}>
                              {'Renew'}
                            </Button>

                      <Button
                                    onClick={Refresh} variant="info">
                                    Refresh
                                  </Button>

                          <Button
                              variant="secondary" onClick={logOutGame}>
                              {'Logout'}
                            </Button>

                            </div>

                      </div>
               </div>

               <div className="row mt-5">
                   {game && game.gameState.cards[player_id].sort(function(a, b){return a - b}).map((card,index) => <div className="col-3 mt-3"><PlayingCard key={index} code={card} isPicked={(selectedCards.indexOf(card) === -1) ? false : true } {...selectProps}  /></div>)}
               </div>

           </div>

      </div>




      {/* //second row for showing Player cards */}

      <div className="row">
      <Container>

      {/* // for buttons */}
      <Row>
        {/* {game && (game.gameState.turn === player_id || game.gameState.isCardPassed === false) &&
          (game.gameState.cards[player_id].length > 0) &&
          (isPassed ?
          <Button style={{position: 'fixed' ,bottom:'20px', left: '200px'}}
          variant={(!isStarted || (playerTurn !== player_id) || selectedCards.length !== 1) ? "danger" : "success"} onClick={sendPlayingCards} disabled={!isStarted ||(playerTurn !== player_id) || selectedCards.length !== 1}>
          {'PLAY'}
          </Button>
        :
          <Button style={{position: 'fixed' ,bottom:'20px', left: '200px'}}
            variant={(isPassed || selectedCards.length !== 6) ? "danger" : "success"} onClick={sendPassedCards} disabled={isPassed || selectedCards.length !== 6}>
            {'PASS'}
          </Button>)
        }
           <Button style={{position: 'fixed' ,bottom:'20px', left: '300px'}}
             onClick={showStats} variant="info">
            STATS
          </Button>

          <Button style={{position: 'fixed' ,bottom:'20px', left: '400px'}}
             onClick={Refresh} variant="info">
            Refresh
          </Button> */}

          {/* <Button style={{position: 'fixed' ,bottom:'20px', left: '500px'}}
             disabled variant="info">
            {game && game.playerName[game.playerId[game.gameState.turn]]}'s Turn'
          </Button> */}

           {/* {stats && game &&
          <Scoreboard scores={game.gameState.gameScores} usernames={game.playerName}
               doContinue={doContinue} isActive={game.playerActive}
               breCount={breCount} cardPassed={game.gameState.cardPassed}
               lastRoundCards={game.gameState.lastRoundCards}
               turn={game.gameState.turn}/>

          } */}




          {/* <Button style={{position: 'fixed' ,bottom:'20px', right: '50px'}}
             onClick={() => {localStorage.setItem("player_id",playerTurn);window.location.reload()}}>
            GO
          </Button> */}

      </Row><br></br><br></br><br></br>

      </Container>


      {stats && game &&
          <Scoreboard scores={game.gameState.gameScores} usernames={game.playerName}
               doContinue={doContinue} isActive={game.playerActive}
               breCount={breCount} cardPassed={game.gameState.cardPassed}
              />
          }
      </div>



    </div>
  );
};

export default PlayerCard;