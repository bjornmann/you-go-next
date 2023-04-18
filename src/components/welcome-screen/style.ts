import styled, { css } from "styled-components";
import Logo from "../logo";

const inputStyles = css`
  padding: 10px;
  border-radius: 4px;
  border: 2px solid #542bd3;
  color: #542bd3;
  font-weight: 700;
  &:focus {
    outline: 2px dashed #faac1e;
  }
`
export const Heading = styled.h1`
  text-align: center;
`;
export const WelcomeInputWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 80%;
  min-width: 300px;
  max-width: 1000px;
  margin: 0 auto;
`;
export const StyledInput = styled.input`
  ${inputStyles}
`;
export const InputControls = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 15px;
`;
export const StyledButton = styled.button<{$variant: 'up' | 'down'}>`
  flex: 1;
  transition: all .25s ease;
  cursor: pointer;
  border: 0;
  background-color: ${({$variant})=> $variant === 'up' ? '#542bd3' : '#faac1e'};
  padding: 10px 5px;
  border-radius: 25px;
  color: ${({$variant})=> $variant === 'up' ? '#faac1e' : '#542bd3'};
  font-size: 20px;
  &:hover{
    transform: translateY(5px);
    box-shadow: 0px -5px ${({$variant})=> $variant === 'up' ? '#faac1e' : '#542bd3'};;
  }
`
export const StyledTextArea = styled.textarea`
  ${inputStyles}
`;
export const StyledLogo = styled(Logo)`
  display: block;
  margin: 0 auto;
`;
export const Paragraph = styled.p`
  max-width: 1000px;
  width: 80%;
  min-width: 300px;
  display: block;
  margin: 20px auto 10px;
  font-family: system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 18px;
  line-height: 160%;
`;
export const OutputLink = styled.div`
    max-width: 80%;
    line-height: 150%;
    box-shadow: 10px -20px 0px #542bd3, -10px 20px 0px #faac1e;
    margin: 40px auto 0;
    border-radius: 4px;
    word-break: break-all;
    margin-bottom: 20px;
    padding: 20px;
    border: 4px solid #542bd3;
    position: relative;
    background-image: linear-gradient( 55deg, hsl(240deg 52% 76%) 0%, hsl(293deg 42% 72%) 20%, hsl(334deg 75% 76%) 29%, hsl(358deg 100% 80%) 36%, hsl(19deg 95% 74%) 43%, hsl(37deg 72% 65%) 50%, hsl(31deg 76% 64%) 57%, hsl(24deg 78% 64%) 64%, hsl(17deg 78% 63%) 71%, hsl(10deg 77% 63%) 80%, hsl(0deg 73% 64%) 100% );
    a {
      color: #fff;
      text-decoration: none;
      font-size: 20px;
      text-shadow: 1px 1px 3px #542bd3;
      display: inline-block;
    }
    &:before{
      content: "Your custom link";
      position: absolute;
      top: -24px;
      text-transform: uppercase;
      font-size: 14px;
      color: #fff;
      width: 100%;
    }
    &:after{
      content: "Copy, share, click";
      position: absolute;
      bottom: -25px;
      left: 10px;
      text-transform: uppercase;
      font-size: 14px;
      color: #fff;
      width: 100%;
    }
    &:hover a{
      transform: scale(1.05);
    }
`;

export const Headline = styled.h2`
  color:#542bd3;
  margin-bottom: 5px;
  margin-top: 20px;
`
