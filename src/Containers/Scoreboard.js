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



        var cardPassed = [];
        cardPassed.push(props.cardPassed['p1'])
        cardPassed.push(props.cardPassed['p2'])
        cardPassed.push(props.cardPassed['p3'])
        cardPassed.push(props.cardPassed['p4'])

        var scoreboardData = [];

        for(let i=0;i<4;i++){
            scoreboardData.push({
                username: playerUsername[i],
                score: playerScores[i],
                bre: breCount[i],
                pid: (i+1)
            });



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


                <div>

                 {cardPassed && cardPassed.map((x ,index)=> <Button key={index} disabled variant={(x.length > 0)?"success":"dark"}> </Button>)}  PASSED CARDS
                            <br></br>
                  {doContinue && doContinue.map((x ,index) => <Button key={index}  disabled variant={x?"success":"dark"}> </Button>)}  CONTINUE GAME
                  <br></br>
                  {isActive && isActive.map((x ,index) => <Button key={index} disabled variant={x?"success":"dark"}> </Button>)}  ACTIVE PLAYERS
                </div>
                <br></br>
                <div>
                </div>
                </div>
        );
}

export default  Scoreboard ;