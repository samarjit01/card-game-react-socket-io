import React from 'react';
import NPlayingCard from './NPlayingCard';

const GameTable = (props) =>  {
        const onTable = props.onTableCardsData;
        const username = props.PlayerUsername;
        const suitCode = props.suitCode;
        


        return (

            <div className="container ">
                  <br></br>
            <div className="row mt-3">
              <div className="col-4">

              </div>
              <div className="col-4">
              <NPlayingCard code={onTable[2]} PlayerUsername = {username[2]} />
              </div>
              <div className="col-4">

              </div>
            </div>

            <div className="row mt-3">
              <div className="col-4">
                 <NPlayingCard code={onTable[3]} PlayerUsername = {username[3]}/>
              </div>
              <div className="col-4">
              <NPlayingCard code={suitCode+'.png'} PlayerUsername = {''} />
              </div>
              <div className="col-4">
              <NPlayingCard code={onTable[1]} PlayerUsername = {username[1]} />
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-4">

              </div>
              <div className="col-4">
              <NPlayingCard code={onTable[0]} PlayerUsername = {username[0]}/>
              </div>
              <div className="col-4">

              </div>
            </div>
            <br></br>
          </div>

        );
}

export default  GameTable ;