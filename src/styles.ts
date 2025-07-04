import styled, { createGlobalStyle, keyframes, css } from 'styled-components'
import { normalize } from 'styled-normalize'
import 'unfonts.css'

export const GlobalStyle = createGlobalStyle`
  ${normalize}
  html, body, #root{
    min-height: 100%;
  }
  body {
    font-family: "Unicorns", system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    padding: 0;
    margin: 0;
    background-color: ${({ theme }) => theme.backgroundColor};
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
export const OptionsBar = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;
export const PlaySoundWrapper = styled.div<{ status: boolean | null }>`
  width: 62px;
  height: 32px;
  background: #ddd;
  border-radius: 20px;
  position: relative;
  box-shadow: inset 0px 0px 3px #9d9d9d;
  cursor: pointer;
  background-color: ${({ status }) => status ? "#65a011" : "#f26f73"};
  &:before{
    ${({ status }) => status ? "content:'ON'" : "content:'OFF'"};
    display: block;
    position: absolute;
    ${({ status }) => status ? "left:0" : "right:0"};
    font-size: 12px;
    font-weight: bold;
    line-height: 30px;
    color: ${({ status }) => status ? "#c2f0ad" : "#8a2426"};
    margin: ${({ status }) => status ? "0 0px 0 5px" : "0 5px 0 0px"};
  }
`;
export const Playsound = styled.button<{ status: boolean | null }>`
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
  transform: translateX(${({ status }) => status ? "31px" : "1px"});
  .toggle {
    fill: ${({ status }) => status ? "#ffffff" : "transparent"}
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
export const PickList = styled.div<{ $listCount: number; $emptyList: boolean; }>`
  padding: 20px;
  text-align: center;
  display: grid;
  ${({ $listCount, $emptyList }) => $emptyList ?
    (`
    grid-template-columns: repeat(1, 1fr);
  `)
    :
    (`
    grid-template-columns: repeat(${$listCount < 6 ? $listCount : 6}, 1fr);
  `)}
  border-radius: 10px;
  gap: 25px;
  justify-content: space-around;
  flex-wrap: wrap;
  @media screen and (max-width: 600px) {
    ${({ $emptyList }) => $emptyList ? (`
    grid-template-columns: repeat(1, 1fr);
  `) :
    (`
    grid-template-columns: repeat(3, 1fr);
  `)}
  }
`;
export const Wrapper = styled.div`
  z-index: 20;
  position: relative;
  max-width: 1000px;
  min-height: 100vh;
  margin: 0 auto;
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
export const WinnerDisplay = styled.div<{ $winnerIn: boolean; $isPicking: boolean; $winnerName: string; }>`
  position: absolute;
  top: calc(50% - 2px);
  left: 10px;
  right: 0;
  z-index: 3;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 160px;
  margin: auto;
  color: #2f2f2f;
  font-size: clamp(5px,4vw,30px);
  font-family: 'Unicorns', serif;
  transition: all .2s;
  ${({ $winnerIn, $winnerName, $isPicking }) => ($winnerName === 'none' && !$isPicking) ?
    (`opacity: 1;`)
    :
    (`opacity: ${$winnerIn ? 1 : 0};`)
  }
  ${({ $isPicking, $winnerName }) => (!$isPicking && $winnerName !== 'none') && css`
      animation: 30s ${nameAnimation} ease-in-out infinite;
  `}
`;
export const ExampleMessage = styled.div`
  font-size:20px;
`;

export const FollowUpButton = styled.button`
  background-color: #481dcd;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  margin: 20px auto;
  display: block;
  transition: all 0.3s ease;
  font-family: "Unicorns", system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  
  &:hover {
    background-color: #3a16a8;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(72, 29, 205, 0.3);
  }
  
  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(72, 29, 205, 0.3);
  }
`;

export const FollowUpList = styled.div`
  background-color: #f8f9fa;
  border: 2px solid #481dcd;
  border-radius: 12px;
  padding: 20px;
  margin: 20px auto;
  max-width: 400px;
  box-shadow: 0 4px 12px rgba(72, 29, 205, 0.1);
`;

export const FollowUpListTitle = styled.h3`
  color: #481dcd;
  font-size: 18px;
  font-weight: bold;
  margin: 0 0 15px 0;
  text-align: center;
  font-family: "Unicorns", system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
`;

export const FollowUpListItem = styled.div`
  color: #2f2f2f;
  font-size: 16px;
  padding: 8px 0;
  border-bottom: 1px solid #e9ecef;
  font-family: "Unicorns", system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  
  &:last-child {
    border-bottom: none;
  }
`;

export const RestartLink = styled.a`
  background-color: #65a011;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  margin: 20px auto;
  display: block;
  text-align: center;
  text-decoration: none;
  transition: all 0.3s ease;
  font-family: "Unicorns", system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  max-width: 400px;
  
  &:hover {
    background-color: #4d7a0d;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(101, 160, 17, 0.3);
    text-decoration: none;
    color: white;
  }
  
  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(101, 160, 17, 0.3);
  }
`;
