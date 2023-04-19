import styled, {keyframes} from "styled-components"

const rotation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

export const SVG = styled.svg`
  aspect-ratio: 1 /1;
  width: 70%;
  margin: 0 auto;
  display: block;
  animation-name: ${rotation};
  animation-duration: 10s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
`;
export const TextContent = styled.textPath`
  font-size: clamp(3rem,25vw,5rem);
  fill: ${({theme}) => theme.primaryColor};

`
export const PathCurve = styled.path`
  fill: none;
`;

export const CenterCircle = styled.circle`
  fill: ${({theme}) => theme.primaryColor};
`;
