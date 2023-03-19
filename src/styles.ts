import styled, { createGlobalStyle, keyframes, css } from 'styled-components'
import { normalize } from 'styled-normalize'

export const GlobalStyle = createGlobalStyle`
  ${normalize}
  html, body, #root{
    min-height: 100%;
  }
  body {
    font-family: system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    padding: 0;
    margin: 0;
    background-color: #fbf5e3;
  }
  h1{
    font-size: 25px;
  }
  a{
    font-weight: 700;
    background-color: transparent;
    color: #481dcd;
    text-decoration: underline;
    text-underline-offset: 6px;
    text-decoration-style: wavy;
    text-decoration-thickness: 1px;
    transition: all .5s ease;
    &:hover{
      text-underline-offset: 4px;
    }
  }
`
const nameAnimation = keyframes`
  0% {
    transform: translate(0);
  }
  20% {
    transform: translate(4px, -4px) scale(.9);
    opacity: 0.6;
    filter: blur(2px);
  }
  40% {
    transform: translate(4px, 4px);
    opacity: 0.7;
    filter: blur(1px);

  }
  60% {
    transform: translate(-4px, 4px) scale(1.1);
    opacity: 0.8;
    filter: blur(1px);
  }
  80% {
    transform: translate(-4px, -4px) scale(1);
    opacity: 1;
    filter: blur(0px);

  }
  100% {
    transform: translate(0);
  }
`;
export const PlaySoundWrapper = styled.div<{status:boolean|null}>`
  width: 62px;
  height: 32px;
  background: #ddd;
  border-radius: 20px;
  position: absolute;
  top: 5px;
  right: 0;
  box-shadow: inset 0px 0px 3px #9d9d9d;
  cursor: pointer;
  background-color: ${({status}) => status ? "#74cee1" : "#f26f73"};
`;
export const Playsound = styled.button<{status:boolean|null}>`
  background-color: #40393a;
  width: 30px;
  height: 30px;
  fill: #ffffff;
  line-height: 100%;
  cursor: pointer;
  border: 1px solid #30292a;
  border-radius: 100%;
  transition: all .25s linear;
  position: relative;
  top: 1px;
  transform: translateX(${({status}) => status ? "31px" : "1px"});
  .toggle {
    fill: ${({status}) => status ? "#ffffff" : "transparent"}
  }
`;
export const CheckBox = styled.input`
  position: absolute; 
  overflow: hidden; 
  clip: rect(0 0 0 0); 
  height: 1px; 
  width: 1px; 
  margin: -1px; 
  padding: 0; 
  border: 0; 
`;
export const PickList = styled.div<{$listCount:number}>`
  padding: 20px;
  text-align: center;
  display: grid;
  grid-template-columns: repeat(${({$listCount})=> $listCount < 6 ? $listCount : 6}, 1fr);
  border-radius: 10px;
  gap: 25px;
  margin-top: 20px;
  justify-content: space-around;
  flex-wrap: wrap;
  @media screen and (max-width: 600px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;
export const Wrapper = styled.div`
  z-index: 20;
  position: relative;
  max-width: 1000px;
  margin: 0 auto;
  min-height: 50vh;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
`;

export const OptionItem = styled.div`
  transition: all .25s ease;
  font-size: 17px;
  font-weight: bold;
  &:focus-visible,&:focus,&:focus-within {
    filter: blur(1px);
    transform: scale(0.8);
  }
`
export const Message = styled.div`
    padding: 14px 20px;
    font-size: 20px;
    text-align: center;
    color: #4d4d4d;
    line-height: 1.2em;
    margin-bottom: 20px;
    white-space: pre-wrap;
`;
export const AnimationWrapper = styled.div`
  max-height: 800px;
  margin: 0 auto;
  position: relative;
  cursor: pointer;
`;
export const WinnerDisplay = styled.div<{$winnerIn: boolean; $isPicking: boolean}>`
  position: absolute;
  top: calc(50% - 2px);
  left: 10px;
  right: 0;
  z-index: 3;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 200px;
  margin: auto;
  color: #2f2f2f;
  font-size: clamp(15px,6vw,30px);
  font-family: Pentagrams, serif;
  transition: all .2s;
  ${({$winnerIn}) => `
    opacity: ${$winnerIn ? 1 : 0};
  `}
  ${({$isPicking}) => !$isPicking && css`
      animation: 30s ${nameAnimation} ease-in-out infinite;
  `}
`;
export const ExampleMessage = styled.div`
  font-size:20px;
`;
