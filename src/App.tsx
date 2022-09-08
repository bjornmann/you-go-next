import { useState, useEffect, ChangeEvent, useRef } from "react"
import styled from "styled-components";
import { Player } from '@lottiefiles/react-lottie-player';
import wizardHands from "./assets/wizard-hands.json";

interface People {
  name: string,
  active: boolean,
  index?: number,
}
const CheckBox = styled.input`
  position: absolute; 
  overflow: hidden; 
  clip: rect(0 0 0 0); 
  height: 1px; 
  width: 1px; 
  margin: -1px; 
  padding: 0; 
  border: 0; 
  & + label { 
    position: relative; 
    font-size: 25px; 
    cursor: pointer; 
    display: inline-flex; 
    align-items: baseline;
    height: 20px; 
    opacity: .5;
    text-decoration: line-through;
    &::before { 
      content: " "; 
      display: inline-block; 
      vertical-align: middle; 
      margin-right: 6px; 
      width: 20px; 
      height: 20px; 
      border: none;
    }
  }
  &:checked + label {
    opacity: 1;
    text-decoration: none;
  }
  &:checked + label::after { 
    content: " "; 
    background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1NzYgNTEyIj48cGF0aCBmaWxsPSIjYmY0MWJmIiBkPSJNMzgxLjIgMTUwLjNMNTI0LjkgMTcxLjVDNTM2LjggMTczLjIgNTQ2LjggMTgxLjYgNTUwLjYgMTkzLjFDNTU0LjQgMjA0LjcgNTUxLjMgMjE3LjMgNTQyLjcgMjI1LjlMNDM4LjUgMzI4LjFMNDYzLjEgNDc0LjdDNDY1LjEgNDg2LjcgNDYwLjIgNDk4LjkgNDUwLjIgNTA2QzQ0MC4zIDUxMy4xIDQyNy4yIDUxNCA0MTYuNSA1MDguM0wyODguMSA0MzkuOEwxNTkuOCA1MDguM0MxNDkgNTE0IDEzNS45IDUxMy4xIDEyNiA1MDZDMTE2LjEgNDk4LjkgMTExLjEgNDg2LjcgMTEzLjIgNDc0LjdMMTM3LjggMzI4LjFMMzMuNTggMjI1LjlDMjQuOTcgMjE3LjMgMjEuOTEgMjA0LjcgMjUuNjkgMTkzLjFDMjkuNDYgMTgxLjYgMzkuNDMgMTczLjIgNTEuNDIgMTcxLjVMMTk1IDE1MC4zTDI1OS40IDE3Ljk3QzI2NC43IDYuOTU0IDI3NS45LS4wMzkxIDI4OC4xLS4wMzkxQzMwMC40LS4wMzkxIDMxMS42IDYuOTU0IDMxNi45IDE3Ljk3TDM4MS4yIDE1MC4zeiIvPjwvc3ZnPg=="); 
    background-repeat: no-repeat; 
    background-size: 15px 15px; 
    background-position: center center; 
    position: absolute; 
    display: flex; 
    justify-content: center; 
    align-items: center;
    margin-left: 0px; 
    left: 0px; 
    top: 0px; 
    text-align: center; 
    background-color: transparent; 
    font-size: 10px; 
    height: 20px; 
    width: 20px;
  }
`;
const PickList = styled.div`
    padding: 20px;
    text-align: center;
    background: #74cee1;
    display: flex;
    border-radius: 10px;
    gap: 25px;
    margin-top: 20px;
    justify-content: space-around;
    flex-wrap: wrap;
`;
const Wrapper = styled.div`
  z-index: 20;
  font-family: 'Wizard',serif;
  position: relative;
  max-width: 1000px;
  margin: 0 auto;
  min-height: 50vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const OptionItem = styled.div`
`
const ScrumMessage = styled.div`
background-color: #faac1e;
    padding: 14px 20px;
    font-size: 42px;
    text-align: center;
    color: #fbf5e3;
    line-height: 1em;
    border-radius: 10px;
    margin-bottom: 20px;
`;
const AnimationWrapper = styled.div`
  max-width: 600px;
  margin: 20px auto;
  position: relative;
  cursor: pointer;
`;
const WinnerDisplay = styled.div`
  position: absolute;
  top: calc(50% - 2px);
  left: 10px;
  right: 0;
  z-index: 3;
  text-align: center;
  width: 200px;
  margin: auto;
  color: #2f2f2f;
  font-size: 42px;
`;
const marketingParticipants = [
  { name: 'Bjorn', active: true },
  { name: 'Danyon', active: true },
  { name: 'Joe', active: true },
  { name: 'Jon', active: true },
  { name: 'Michael', active: true },
  { name: 'Mickey', active: true },
  { name: 'Noah', active: true },
];
const kopsParticipants = [
  { name: 'Alice', active: true },
  { name: 'Bjorn', active: true },
  { name: 'Jason', active: true },
  { name: 'Jordan', active: true },
  { name: 'Kenny', active: true },
  { name: 'Mike', active: true },
  { name: 'Nate', active: true },
  { name: 'Rem', active: true },
  { name: 'Risa', active: true },
];

let baseParticipantList = marketingParticipants;
const scrumMessage = 'How are you feeling? Any Blockers? Post-scrums?';
const IndexPage = () => {
  const [participants, setParticipants] = useState<People[]>(baseParticipantList);
  const [activeParticipants, setActiveParticipants] = useState<People[]>(baseParticipantList);
  const [winner, setWinner] = useState<People>({ name: 'none', active: false });
  const [isPicking, setIsPicking] = useState(false);
  const [showWinner, setShowWinner] = useState(false);
  const animationRef = useRef<Player | null>(null);

  useEffect(() => {
    setParticipants(marketingParticipants);
    const queryString = window.location.search;
    if (queryString !== '') {
      if (queryString.split('=')[1] === 'kops') {
        setParticipants(kopsParticipants);
        baseParticipantList = kopsParticipants;
      }
    }
  }, []);
  useEffect(() => {
    setActiveParticipants(participants.filter((participant) => { return Boolean(participant.active) }));
  }, [participants])

  const pickWinner = () => {
    if (isPicking) {
      return false;
    }
    if (animationRef.current) {
      animationRef.current.play();
      setIsPicking(true);
      setShowWinner(false);
    }
  }
  const handleAnimationComplete = () => {
    setIsPicking(false);
    setActiveParticipants(participants.filter((participant) => { return Boolean(participant.active) }));
    const winningNumber = Math.floor(Math.random() * activeParticipants.length);
    const winnerIndex = activeParticipants.findIndex((el) => {
      return el?.name === activeParticipants[winningNumber]?.name;
    });
    setWinner({ index: winnerIndex, ...activeParticipants[winnerIndex] });

    const activeUpdate = activeParticipants;
    activeUpdate.splice(winnerIndex, 1);
    setActiveParticipants(activeUpdate);
    const updatedParticipants = participants.map((participant) => {
      return activeParticipants.find(p => p.name === participant.name) ? { name: participant.name, active: true } : { name: participant.name, active: false };
    });
    setParticipants(updatedParticipants);
    setShowWinner(true);
  }
  const handleChange = (e: ChangeEvent): void => {
    if (!isPicking) {
      // find the clicked input. if it is now checked set it to true in participants
      const currCheck = e.target as HTMLInputElement;
      const updatedParticipants = participants.map((participant) => {
        if (participant.name === currCheck.value) {
          //This is the one
          participant.active = currCheck.checked;
        }
        return participant;
      });
      setParticipants(updatedParticipants);
    }
  };
  return (
    <Wrapper>
      <PickList>
        {participants.map((participant) => {
          return (<OptionItem key={participant.name}>
            <CheckBox id={`${participant.name}-input`} type="checkbox" checked={participant.active} onChange={handleChange} name="participant_list" value={participant.name} />
            <label htmlFor={`${participant.name}-input`}>{participant.name}</label>
          </OptionItem>)
        })}
      </PickList>
      <AnimationWrapper onClick={() => pickWinner()}>
        <WinnerDisplay>
          {showWinner === true && winner?.name}
        </WinnerDisplay>
        <Player
          ref={animationRef}
          src={wizardHands}
          speed={2}
          onEvent={event => {
            if (event === 'complete') {
              handleAnimationComplete();
            }
          }}
        />
      </AnimationWrapper>
      <ScrumMessage>
        {scrumMessage}
      </ScrumMessage>
    </Wrapper>
  )
}

export default IndexPage
