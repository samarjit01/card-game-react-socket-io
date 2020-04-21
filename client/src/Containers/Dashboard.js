import React, { useEffect, useState, Component }  from 'react';
import { Card, Button, Form , Breadcrumb} from 'react-bootstrap';
import PlayerCard from './PlayerCard';

import { Redirect } from 'react-router-dom';

class Dashboard extends Component {

    render(){

      const player_id = localStorage.getItem("player_id");
      const game_id = localStorage.getItem("game_id");
      const username = localStorage.getItem("username");


        if(player_id === null || game_id === null){
            return <Redirect to="/" />
        }

        return (
            <div class="container">
            <div class="row">
              <div class="col">
                <Breadcrumb>
                      <Breadcrumb.Item active>GAME {game_id}</Breadcrumb.Item>
                      <Breadcrumb.Item active>PLAYER {player_id.substr(1)}</Breadcrumb.Item>
                      <Breadcrumb.Item active>{username}</Breadcrumb.Item>
                </Breadcrumb>
            </div>
              </div>
              <div class="row">
                <div class="col">
                <PlayerCard />
                </div>
              </div>
          </div>

        );
}
}

export default Dashboard;