import React  from 'react';
import NPlayingCard from './NPlayingCard';

const LastRoundCards = (props) =>  {

        const playerUsername = props.usernames;
        const breCount = props.breCount;

        const lastRoundCards = props.lastRoundCards;
        const turn = props.turn;

        var lastRoundData = [];
        for(let i=0;i<4;i++){
            lastRoundData.push({
                username:playerUsername[i],
                lastCard:lastRoundCards[i],
                turn: Number(turn.substr(1)) === i+1 ? true : false
            })

        }




        return (
                <div>

                <div className="row">
                {lastRoundData.length > 0  && lastRoundData.map((x,index) =>

                            <div className="col-3" key={index}><NPlayingCard   fontweight ={x.turn ? 'bold' : 'normal'} code={x.lastCard} PlayerUsername = {x.username} width='3rem' height='4rem' fontsize='0.8rem'/>
                            </div>
                    )}
                </div>
                </div>
        );
}

export default  LastRoundCards ;