import React from 'react';
import NPlayingCard from './NPlayingCard';

const GameTable = (props) =>  {
        const onTable = props.onTableCardsData;
        const username = props.PlayerUsername;

        return (

            <div class="container ">
                  <br></br>
            <div class="row">
              <div class="col">

              </div>
              <div class="col ">
              <NPlayingCard code={onTable[2]} PlayerUsername = {username[2]} />
              </div>
              <div class="col">

              </div>
            </div>

            <div class="row">
              <div class="col">
                 <NPlayingCard code={onTable[3]} PlayerUsername = {username[3]}/>
              </div>
              <div class="col">

              </div>
              <div class="col">
              <NPlayingCard code={onTable[1]} PlayerUsername = {username[1]} />
              </div>
            </div>

            <div class="row">
              <div class="col">

              </div>
              <div class="col">
              <NPlayingCard code={onTable[0]} PlayerUsername = {username[0]}/>
              </div>
              <div class="col">

              </div>
            </div>
            <br></br>
          </div>

        );
}

export default  GameTable ;