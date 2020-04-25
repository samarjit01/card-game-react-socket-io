import React  from 'react';
import {  Button, Table , Row , Col} from 'react-bootstrap';
import NPlayingCard from './NPlayingCard';

var utils = require('./Utils')


const Scoreboard = (props) =>  {

        const playerScores = props.scores;
        const playerUsername = props.usernames;
        const doContinue = props.doContinue;
        const isActive = props.isActive;
        const breCount = props.breCount;

        const lastRoundCards = props.lastRoundCards;
        const turn = props.turn;


        var cardPassed = [];
        cardPassed.push(props.cardPassed['p1'])
        cardPassed.push(props.cardPassed['p2'])
        cardPassed.push(props.cardPassed['p3'])
        cardPassed.push(props.cardPassed['p4'])

        var scoreboardData = [];
        var lastRoundData = [];
        for(let i=0;i<4;i++){
            scoreboardData.push({
                username: playerUsername[i],
                score: playerScores[i],
                bre: breCount[i],
                pid: (i+1)
            });
            lastRoundData.push({
                username:playerUsername[i],
                lastCard:lastRoundCards[i],
                turn: Number(turn.substr(1)) === i+1 ? true : false
            })



        }
        var items = Object.keys(scoreboardData).map(function(key) {
            return [key, scoreboardData[key]];
          });

          items.sort(function(first, second) {
            return second[1].score - first[1].score;
          });

        scoreboardData = items




        return (
                <div>
                        <Table  variant="Light">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Username</th>
                        <th>Score</th>
                        <th>BRE</th>
                    </tr>
                    </thead>
                    <tbody>
                        {scoreboardData.map((x , index) =>
                        <tr key={index}>
                            <td>{x[1].pid}</td>
                            <td>{x[1].username}</td>
                            <td>{x[1].score}</td>
                            <td>{x[1].bre}</td>
                        </tr>
                    )}
                    </tbody>
                </Table>
                <br></br>
                <div>
                 {cardPassed && cardPassed.map((x ,index)=> <Button key={index} variant={(x.length > 0)?"success":"secondary"}> </Button>)}  PASSED CARDS
                            <br></br>
                  {doContinue && doContinue.map((x ,index) => <Button key={index}   variant={x?"success":"secondary"}> </Button>)}  CONTINUE GAME
                  <br></br>
                  {isActive && isActive.map((x ,index) => <Button key={index}   variant={x?"success":"secondary"}> </Button>)}  ACTIVE PLAYERS
                </div>
                <br></br>
                <div>

                <div className="row">
                {lastRoundData.length > 0  && lastRoundData.map((x,index) =>

                            <div className="col-3" key={index}><NPlayingCard   fontweight ={x.turn ? 'bold' : 'normal'} code={x.lastCard} PlayerUsername = {x.username} width='3rem' height='4rem' fontsize='12px'/>
                            </div>
                    )}
                </div>
                </div>
                </div>
        );
}

export default  Scoreboard ;