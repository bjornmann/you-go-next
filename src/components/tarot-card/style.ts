import styled, {css} from "styled-components";
import {ITarotCardTransient} from './types';

export const CardInner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
`;
export const Card = styled.div<ITarotCardTransient>`
  background-color: transparent;
  width: 70px;
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
export const frontAndBackShared = css`
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden; /* Safari */
  backface-visibility: hidden;
  font-size: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 0 0 2px #b6b6b6 inset, 0px 0 0 5px #ffffff inset;
`
export const CardFront = styled.div<{$color:string}>`
  ${frontAndBackShared}
  justify-content: center;
  background-color: ${({$color}) => $color};
  text-shadow: 0px 2px 4px hsl(0deg 0% 0% / 40%);
`;
export const CardBack = styled.div`
  ${frontAndBackShared}
  background-color: #9d9d9d;
  color: #cecece;
  transform: rotateY(180deg);
`;