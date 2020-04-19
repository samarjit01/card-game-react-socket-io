import React, { useEffect, useState }  from 'react';
import { Card, Button, Form } from 'react-bootstrap';
var utils = require('./Utils')

const NPlayingCard = (props) => {
    const imageUrl = utils.getCardString(props.code);
    console.log(props.code)

    return (
      <div>
        <Card style={{ width: '5rem' , height: '7rem' }}>
            <Card.Img variant="top" src={require('../img/' + `${imageUrl}`)} />
        </Card>
      </div>
    );
};

export default NPlayingCard;