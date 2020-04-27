import React, { useEffect, useState }  from 'react';
import { Card } from 'react-bootstrap';
var utils = require('./Utils')

const PlayingCard = (props) => {


    const [toggle, setToggle] = useState(true);
    const imageUrl = utils.getCardString(props.code);
    const handleChange = (event) => {

    props.onSubmit(event.target .value);
      setToggle(!toggle)
    }
    useEffect(() => {
      setToggle(!props.isPicked)
    }, []);




    return (
      <div id='me' >
        <Card style={{ width: '4rem' , height: '5.6rem' , opacity: !(props.isPicked) ? 1 : 0.2 }}>
          <label >
            <input type="checkbox"

              value={props.code}
              style={{marginLeft: 0, position: 'absolute' , opacity:0}}
              onChange={handleChange}/>
            <Card.Img variant="top primary"  src={require('../img/' +imageUrl)} />
          </label>
        </Card>
      </div>
    );
};

export default PlayingCard;