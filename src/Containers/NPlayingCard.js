import React from 'react';
import { Card } from 'react-bootstrap';
var utils = require('./Utils')

const NPlayingCard = (props) => {
     var imageUrl = props.code
     var imageWidth = props.width
     var imageHeight = props.height

     var fontweight = props.fontweight
     var fontsize = props.fontsize



    if(!isNaN(props.code)){
      imageUrl = utils.getCardString(props.code);
    }
    const userName = props.PlayerUsername;


    return (
      <div  >
        <Card  style={{ width:imageWidth ? imageWidth: '5rem' , height: imageHeight ? imageHeight :'7rem' }}>
            <Card.Img variant="top" src={(imageUrl !== 'red_joker.png') && require('../img/' +imageUrl)}  />
        </Card>
        <div className='justify-content-center text-center' style={{fontSize:fontsize ? fontsize :'15px' , fontWeight:'normal' , marginBottom:'15px'}}>{userName && utils.toCamelCase(userName)}</div>
      </div>
    );
};

export default NPlayingCard;