import React  from 'react';
import {  Button, Table} from 'react-bootstrap';

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

        var scoreboardData = []; // create an empty array
        for(let i=0;i<4;i++){
            scoreboardData.push({
                username:   playerUsername[i],
                score: playerScores[i],
                bre: breCount[i]
            });

        }
        scoreboardData.sort(function(a, b) {
            return a.score > b.score;
        });




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
                        {scoreboardData.map((x ,index) =>
                        <tr>
                            <td>{index+1}</td>
                            <td>{x.username}</td>
                            <td>{x.score}</td>
                            <td>{x.bre}</td>
                        </tr>
                    )}
                    </tbody>
                </Table>
                <br></br>
                <div>
                 {cardPassed && cardPassed.map(x => <Button  variant={(x.length > 0)?"success":"secondary"}> </Button>)}  PASSED CARDS
                            <br></br>
                  {doContinue && doContinue.map(x => <Button  variant={x?"success":"secondary"}> </Button>)}  CONTINUE GAME
                  <br></br>
                  {isActive && isActive.map(x => <Button  variant={x?"success":"secondary"}> </Button>)}  ACTIVE PLAYERS
                </div>
                </div>
        );
}

export default  Scoreboard ;