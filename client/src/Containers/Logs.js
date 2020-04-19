import React, { useEffect, useState, Component }  from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import PlayerCard from './PlayerCard';
import { Redirect } from 'react-router-dom';

class Logs extends Component {
    constructor(props){
        super(props)
        let loggedIn = false;
        this.state ={
            username : '',
            password : ''
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }
     handleSubmit (e) {
        e.preventDefault();
        localStorage.setItem("player_id",this.state.username);
        this.setState({
            loggedIn:true
        })
    }

    render(){
        const player_id = localStorage.getItem("player_id");
        if(player_id !== null){
            return <Redirect to="/play" />
        }
        return (
            <div class="container">
            <div class="row">
              <div class="col">
                1 of 3
              </div>
              <div class="col">
                2 of 3
              </div>
              <div class="col">
                3 of 3
              </div>
            </div>

            <div class="row">
              <div class="col">
                1 of 3
              </div>
              <div class="col">
                2 of 3
              </div>
              <div class="col">
                3 of 3
              </div>
            </div>

            <div class="row">
              <div class="col">
                1 of 3
              </div>
              <div class="col">
                2 of 3
              </div>
              <div class="col">
                3 of 3
              </div>
            </div>

          </div>

        );
}
}

export default Logs;
;