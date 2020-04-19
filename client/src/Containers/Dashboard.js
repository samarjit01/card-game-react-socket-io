import React, { useEffect, useState, Component }  from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import PlayerCard from './PlayerCard';
import GameTable from './GameTable';
import { Redirect } from 'react-router-dom';

class Dashboard extends Component {

    render(){
        return (
            // <div>
            //     <PlayerCard />
            // </div>
            <div class="container">
            <div class="row">
              <div class="col">
                1 of 3
              </div>
              <div class="col">
                <GameTable />
              </div>
              <div class="col">
                3 of 3
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