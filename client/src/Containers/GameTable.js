import React, { useEffect, useState, Component }  from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import PlayerCard from './PlayerCard';
import NPlayingCard from './NPlayingCard';
import { Redirect } from 'react-router-dom';

class GameTable extends Component {

    constructor(props){
        super(props)
        this.state ={
            base_url : "https://mytestpipeli-cardgame-mlrbbhci.herokuapp.com/",
            player_id : localStorage.getItem("player_id"),
            data:'',
            cards:[0,0,0,0]
        }
        this.getOnTableCards = this.getOnTableCards.bind(this)
    }

    async componentDidMount() {
        let result = await fetch(this.state.base_url+"1", {
          method: 'GET'
        });
        let jsonData = await  result.json();

        this.setState({ data: jsonData });
        let tableCards = this.getOnTableCards();
        this.setState({ cards: tableCards });
      }

    getOnTableCards(){

        let result = this.state.data;
        console.log(result)
            if(result && result.game && result.game.gameState && result.game.gameState.onTableCards){
                let tableCards = result.game.gameState.onTableCards;
                let notAvailableCard = 4 - tableCards.length;
                for (let i = 0; i < notAvailableCard; i++){
                    tableCards.splice(1, 0, 0);
                }
                console.log('ssss',tableCards);
                return tableCards;
            }else{
                return this.state.cards;
            }
        }




    render(){
        console.log('jfgLJFGjh',this.state);
        return (

            <div class="container">
                  <br></br>
            <div class="row">
              <div class="col">
                1 of 3
              </div>
              <div class="col">
              <NPlayingCard code={this.state.cards[0]} />
              </div>
              <div class="col">
                3 of 3
              </div>
            </div>

            <div class="row">
              <div class="col">
                 <NPlayingCard code={this.state.cards[1]} />
              </div>
              <div class="col">
                2 of 3
              </div>
              <div class="col">
              <NPlayingCard code={this.state.cards[2]} />
              </div>
            </div>

            <div class="row">
              <div class="col">
                1 of 3
              </div>
              <div class="col">
              <NPlayingCard code={this.state.cards[3]} />
              </div>
              <div class="col">
                3 of 3
              </div>
            </div>
            <br></br>
          </div>

        );
}
}

export default  GameTable ;