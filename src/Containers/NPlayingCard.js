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

        <Card  style={{ justifyContent:'centre', width:imageWidth ? imageWidth: '4rem' , height: imageHeight ? imageHeight :'5.6rem' }}>
            <Card.Img className='justify-content-center text-center' variant="top" src={(imageUrl !== 'red_joker.png') && require('../img/' +imageUrl)}  />

        </Card>
        <Card.Text style={{fontSize:fontsize ? fontsize :'1rem' , fontWeight:fontweight ? fontweight:'normal' }}>{userName && utils.toCamelCase(userName)}</Card.Text>
        {/* <div className='justify-content-center text-center' style={{fontSize:fontsize ? fontsize :'1rem' , fontWeight:'normal' , marginBottom:'15px'}}>{userName && utils.toCamelCase(userName)}</div> */}
      </div>
    );
};

export default NPlayingCard;