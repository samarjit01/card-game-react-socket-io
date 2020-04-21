 export const getCardString = (code) => {
    var code = Number(code);
    var cardString ="";
    if(code%13 == 11)
     cardString+='jack'
    else if(code%13 == 12)
     cardString+='queen'
    else if(code%13 == 0)
     cardString+='king'
    else if(code%13 == 1)
     cardString+='ace'
    else
     cardString+= String(code%13);

    if(code >= 1 && code <= 13)
      cardString += '_of_hearts'
    else if(code >=14 && code <= 26)
      cardString += '_of_clubs'
    else if(code >= 27 && code <= 39)
      cardString += '_of_diamonds'
    else
      cardString += '_of_spades'

    if(code == 0)
        cardString = 'red_joker'

    return cardString+'.png';
  };

  export async function getData(url) {
    let result = await fetch(url, {
      method: 'GET'
    });
    return await result.json();
  };

  export function getUrl(urlType , env = 'test') {
    if(env === 'test'){
      if(urlType === 'base'){
        return "http://localhost:5001/1"
      }else if(urlType === 'play'){
        return "http://localhost:5001/play/1/"
      }else if(urlType === 'continue'){
        return "http://localhost:5001/continue/1/"
      }else if(urlType === 'turn'){
        return "http://localhost:5001/turn/1"
      }else{
        return ""
      }

    }else{
      if(urlType === 'base'){
        return "https://mytestpipeli-cardgame-cvlbnhhr.herokuapp.com/1"
      }else if(urlType === 'play'){
        return "https://mytestpipeli-cardgame-cvlbnhhr.herokuapp.com/play/1/"
      }else if(urlType === 'onTable'){
        return "https://mytestpipeli-cardgame-cvlbnhhr.herokuapp.com/onTableCard/1/"
      }else if(urlType === 'turn'){
        return "https://mytestpipeli-cardgame-cvlbnhhr.herokuapp.com/turn/1"
      }else{
        return ""
      }

    }

  };
