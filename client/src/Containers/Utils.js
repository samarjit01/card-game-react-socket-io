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

  export async function sendData(url , body) {
    let result = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
    return await result.json();
  };

  export function getUrl(urlType , env = 'prod') {
      var baseUrl ='';
      if(env === 'test'){
        baseUrl = 'http://localhost:5001/'
      }else{
        baseUrl = 'https://mytestpipeli-cardgame-5dk43cdv.herokuapp.com/'
      }
      
      if(urlType === 'base'){
        return baseUrl+"1"
      }else if(urlType === 'play'){
        return baseUrl+"play/1/"
      }else if(urlType === 'continue'){
        return baseUrl+"continue/1/"
      }else if(urlType === 'turn'){
        return "baseUrl"+"turn/1"
      }else if(urlType == 'socketbase'){
        return baseUrl
      }
      else{
        return ""
      }

    };

  export function toCamelCase(name) {

    return name.charAt(0).toUpperCase() + name.slice(1)
  }
