import React from 'react';
import { Card} from 'react-bootstrap';
var utils = require('./Utils')

const NPlayingCard = (props) => {
    const imageUrl = utils.getCardString(props.code);
    const userName = props.PlayerUsername;

    return (
      <div >
        <Card style={{ width: '5rem' , height: '7rem' }}>

            <Card.Img variant="top" src={require('../img/' + `${imageUrl}`)} />
              <Card.Subtitle style={{textAlign:'center' , marginTop:'2px' }}>{userName}</Card.Subtitle>
        </Card>
      </div>
    );
};

export default NPlayingCard;