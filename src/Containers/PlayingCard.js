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
      <div>
        <Card style={{ width: '5rem' , height: '7rem' , opacity: !(props.isPicked) ? 1 : 0.2 }}>
          <label >
            <input type="checkbox"

              value={props.code}
              style={{marginLeft: 65, position: 'absolute' , opacity:0}}
              onChange={handleChange}/>
            <Card.Img variant="top primary"  src={require('../img/' +imageUrl)} />
          </label>
        </Card>
      </div>
    );
};

export default PlayingCard;