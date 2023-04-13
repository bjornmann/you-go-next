import styled, { css } from "styled-components";

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

export const Headline = styled.h2`
  color:#542bd3;
  margin-bottom: 5px;
  margin-top: 20px;
`
