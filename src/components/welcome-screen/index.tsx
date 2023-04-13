import { useState } from "react";
import * as s from './style';
const WelcomeScreen = () => {
  const [inputs, setInputs] = useState(['']);
  const handleInputChange = (direction: 'up' | 'down') => {
    if (direction === 'up') {
      setInputs([...inputs, '-']);
    } else {
      setInputs(prevState => prevState.slice(1));
    }
  }
  return (
    <>
      <h1>You Go Next</h1>
      <p></p>
      <s.WelcomeInputWrap>
        <s.Headline>Options</s.Headline>
        {inputs.map((_, i) =>
          <s.StyledInput type="text" key={i} />
        )}
        <s.InputControls>
          {inputs.length > 1 && <s.StyledButton $variant="down" onClick={() => handleInputChange("down")}>-</s.StyledButton>}
          <s.StyledButton $variant="up" onClick={() => handleInputChange("up")}>+</s.StyledButton>
        </s.InputControls>
        <s.Headline>Message</s.Headline>
        <s.StyledTextArea />
        <s.StyledButton $variant="up">Create Link</s.StyledButton>
      </s.WelcomeInputWrap>
    </>
  )
}

export default WelcomeScreen;
