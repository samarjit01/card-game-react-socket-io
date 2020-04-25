import React from 'react';
import NPlayingCard from './NPlayingCard';

const GameTable = (props) =>  {
        const onTable = props.onTableCardsData;
        const username = props.PlayerUsername;
        const suitCode = props.suitCode;


        return (

            <div className="container ">
                  <br></br>
            <div className="row">
              <div className="col">

              </div>
              <div className="col ">
              <NPlayingCard code={onTable[2]} PlayerUsername = {username[2]} />
              </div>
              <div className="col">

              </div>
            </div>

            <div className="row">
              <div className="col">
                 <NPlayingCard code={onTable[3]} PlayerUsername = {username[3]}/>
              </div>
              <div className="col">
              <NPlayingCard code={suitCode+'.png'} PlayerUsername = {''} />
              </div>
              <div className="col">
              <NPlayingCard code={onTable[1]} PlayerUsername = {username[1]} />
              </div>
            </div>

            <div className="row">
              <div className="col">

              </div>
              <div className="col">
              <NPlayingCard code={onTable[0]} PlayerUsername = {username[0]}/>
              </div>
              <div className="col">

              </div>
            </div>
            <br></br>
          </div>

        );
}

export default  GameTable ;