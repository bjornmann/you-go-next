
import * as s from './style';
import React from 'react';
import {ITarotCard} from './types';
const CardComponent = ({flipped, cardColor}: ITarotCard) => {
  return(
    <s.Card aria-hidden={true} $flipped={flipped}>
      <s.CardInner>
        <s.CardFront $color={cardColor}>🌞</s.CardFront>
        <s.CardBack>☾</s.CardBack>
      </s.CardInner>
    </s.Card>
  );
}
const TarotCard = React.memo(CardComponent);
export default TarotCard