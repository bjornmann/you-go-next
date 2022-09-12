import styled, {css} from "styled-components";

interface ITarotCard {
  flipped: boolean;
}
interface ITarotCardTransient {
  $flipped: boolean;
}
const CardInner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
`;
const Card = styled.div<ITarotCardTransient>`
  background-color: transparent;
  width: 50px;
  border-radius: 5px;
  perspective: 1000px;
  aspect-ratio: 1.25/2;
  overflow: hidden;
  margin:0 auto 10px auto;
  cursor: pointer;
  transition: all .5s ease-in-out;
  &:hover{
    transform: translateY(-5px);
  }
  ${({$flipped}) => $flipped === true ? `${CardInner}{transform: rotateY(180deg);` : ''}
`;
const frontAndBackShared = css`
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden; /* Safari */
  backface-visibility: hidden;
  font-size: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
`
const CardFront = styled.div`
  ${frontAndBackShared}
  justify-content: center;
  background-color: #3102c1;
`;
const CardBack = styled.div`
  ${frontAndBackShared}
  background-color: #9d9d9d;
  color: #cecece;
  transform: rotateY(180deg);
`;
const TarotCard = ({flipped}: ITarotCard) => {
  return(
    <Card aria-hidden={true} $flipped={flipped}>
      <CardInner>
        <CardFront>🌞</CardFront>
        <CardBack>☾</CardBack>
      </CardInner>
    </Card>
  );
}
export default TarotCard