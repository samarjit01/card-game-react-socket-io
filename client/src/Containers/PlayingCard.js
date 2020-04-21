import React, { useEffect, useState }  from 'react';
import { Card, Button, Form } from 'react-bootstrap';
var utils = require('./Utils')

const PlayingCard = (props) => {
    const imageUrl = utils.getCardString(props.code);
    const handleChange = (event) => {
      props.onSubmit(event.target.value);
    }

    const tempWidth = props.isPicked ? '3rem' : '5rem'
    const tempheight = props.isPicked ? '5rem': '7rem'

    return (
      <div>
        <Card style={{ width: tempWidth , height: tempheight  }}>
          <label>
            <input type="checkbox"
              value={props.code}
              style={{'margin-left': 65, 'position': 'absolute'}}
              onChange={handleChange}/>
            <Card.Img variant="top primary" src={require('../img/' + `${imageUrl}`)} />
          </label>
        </Card>
      </div>
    );
};

export default PlayingCard;