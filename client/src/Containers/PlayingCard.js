import React, { useEffect, useState }  from 'react';
import { Card, Button, Form } from 'react-bootstrap';
var utils = require('./Utils')

const PlayingCard = (props) => {
    const imageUrl = utils.getCardString(props.code);
    const handleChange = (event) => {
      props.onSubmit(event.target.value);
    }

    return (
      <div>
        <Card style={{ width: '5rem' , height: '7rem' }}>
          <label>
            <input type="checkbox"
              value={props.code}
              style={{'margin-left': 65, 'position': 'absolute'}}
              onChange={handleChange}/>
            <Card.Img variant="top" src={require('../img/' + `${imageUrl}`)} />
          </label>
        </Card>
      </div>
    );
};

export default PlayingCard;