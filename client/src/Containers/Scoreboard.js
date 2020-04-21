import React, { useEffect, useState, Component }  from 'react';
import { Card, Button, Form  , Table} from 'react-bootstrap';
import PlayerCard from './PlayerCard';
import NPlayingCard from './NPlayingCard';
import { Redirect } from 'react-router-dom';

var utils = require('./Utils')


const Scoreboard = (props) =>  {

        const playerScores = props.scores;
        const playerUsername = props.usernames;
        const doContinue = props.doContinue;
        const breCount = props.breCount;
    

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
                    {doContinue && doContinue.map(x => <Button variant={x?"success":"secondary"}> </Button>)}
                </div>
                </div>
        );
}

export default  Scoreboard ;