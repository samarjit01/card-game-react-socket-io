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
