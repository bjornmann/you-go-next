import { useEffect, useState } from "react";
import * as s from './style';
const WelcomeScreen = () => {
  const [options, setOptions] = useState(['']);
  const [messageContent, setMessageContent] = useState('');
  const [outputLink, setOutputLink] = useState('');
  const updateInputValue = (value: string, index: number) => {
    const tempArray = [...options];
    tempArray[index] = value;
    setOptions(tempArray);
  }
  const handleInputChange = (direction: 'up' | 'down') => {
    if (direction === 'up') {
      setOptions([...options, '']);
    } else {
      setOptions(prevState => prevState.slice(0, -1));
    }
  }
  useEffect(() => {
    const filteredOptions = options.filter((el) => el !== '');
    if (filteredOptions.length > 0) {
      let link = `${window.location.protocol}//${window.location.host}/?people=${encodeURIComponent(filteredOptions.toString())}`;
      if (messageContent.length > 0) {
        link += `&message=${encodeURIComponent(messageContent)}`;
      }
      setOutputLink(link);
    }
  }, [options, messageContent])
  return (
    <>
      <s.StyledLogo size={10} aria-label="You Go Next logo" />
      <s.Paragraph>YouGoNext.com is the best way to choose order for things like meetings, games, or any time you need to sort a group.</s.Paragraph>
      <s.Paragraph> Just add the people who'll be involved and (optionally) a message to show on screen.</s.Paragraph>
      <s.WelcomeInputWrap>
        <s.Headline>People</s.Headline>
        {options.map((_, i) => {
          return (<s.StyledInput
            type="text"
            key={i}
            onChange={e => updateInputValue(e.currentTarget.value, i)}
            value={options[i]}
          />)
        })}
        <s.InputControls>
          {options.length > 1 && <s.StyledButton $variant="down" onClick={() => handleInputChange("down")}>- Remove Person</s.StyledButton>}
          <s.StyledButton $variant="up" onClick={() => handleInputChange("up")}>+ Add Person</s.StyledButton>
        </s.InputControls>
        <s.Headline>Message</s.Headline>
        <s.StyledTextArea onKeyUp={(e) => { setMessageContent(e.currentTarget.value) }} />
        {outputLink && <s.OutputLink><a href={outputLink}>{outputLink}</a></s.OutputLink>}
      </s.WelcomeInputWrap>
    </>
  )
}

export default WelcomeScreen;
