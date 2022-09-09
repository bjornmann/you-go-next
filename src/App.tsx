import { useState, useEffect, ChangeEvent, useRef } from "react"
import styled, {keyframes, css} from "styled-components";
import { Player } from '@lottiefiles/react-lottie-player';
import wizardHands from "./assets/wizard-hands.json";
import Footer from "./Footer";
import TarotCard from './components/tarot-card/index';
interface People {
  name: string,
  active: boolean,
  index?: number,
}
const nameAnimation = keyframes`
  0% {
    transform: translate(0);
  }
  20% {
    transform: translate(4px, -4px) scale(.9);
    opacity: 0.6;
  }
  40% {
    transform: translate(4px, 4px);
    opacity: 0.7;
  }
  60% {
    transform: translate(-4px, 4px) scale(1.1);
    opacity: 0.8;
  }
  80% {
    transform: translate(-4px, -4px) scale(1);
    opacity: 1;
  }
  100% {
    transform: translate(0) ;
  }
`;
const CheckBox = styled.input`
  position: absolute; 
  overflow: hidden; 
  clip: rect(0 0 0 0); 
  height: 1px; 
  width: 1px; 
  margin: -1px; 
  padding: 0; 
  border: 0; 
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
  font-family: Helvetica, sans-serif;
`;
const Wrapper = styled.div`
  z-index: 20;
  font-family: Helvetica, sans-serif;
  position: relative;
  max-width: 1000px;
  margin: 0 auto;
  min-height: 50vh;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const OptionItem = styled.div`
`
const Message = styled.div`
background-color: #faac1e;
    padding: 14px 20px;
    font-size: 32px;
    text-align: center;
    color: #fbf5e3;
    line-height: 1.5em;
    border-radius: 10px;
    margin-bottom: 20px;
    white-space: pre-wrap;
`;
const AnimationWrapper = styled.div`
  max-height: 800px;
  margin: 0 auto;
  position: relative;
  cursor: pointer;
`;
const WinnerDisplay = styled.div<{$winnerIn: boolean; $isPicking: boolean}>`
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
  font-size: clamp(20px, 8vw, 75px);
  font-family: Nitemare, serif;
  transition: all .2s;
  ${({$winnerIn}) => `
    opacity: ${$winnerIn ? 1 : 0};
  `}
  ${({$isPicking}) => !$isPicking && css`
      animation: 10s ${nameAnimation} ease-in-out infinite;
  `}
`;
const ExampleMessage = styled.div`
  font-size:20px;
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

let baseParticipantList = [{ name: '', active: false }];
let message = '';
const IndexPage = () => {
  const [participants, setParticipants] = useState<People[]>(baseParticipantList);
  const [activeParticipants, setActiveParticipants] = useState<People[]>(baseParticipantList);
  const [winner, setWinner] = useState<People>({ name: 'none', active: false });
  const [isPicking, setIsPicking] = useState(false);
  const [showWinner, setShowWinner] = useState(false);
  const crystalBallAnimationRef = useRef<Player | null>(null);
  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    const teamPreset = params?.team;
    if (teamPreset !== undefined) {
      if (teamPreset === 'kops') {
        setParticipants(kopsParticipants);
        baseParticipantList = kopsParticipants;
        message = 'How are you feeling?|Blockers?|Sprint goal?|Post scrums?';
      }
      if (teamPreset === 'mkt') {
        setParticipants(marketingParticipants);
        baseParticipantList = marketingParticipants;
        message = 'How are you feeling?|Blockers?|Anything to share?';
      }
    }
    else {
      if(params?.people) {
        // parse them into a list
        const people = params.people;
        const peopleSet = people.split(",").map((person) => {
          return { name: person, active: true };
        });
        if(peopleSet.length > 0){
          setParticipants(peopleSet);
          baseParticipantList = peopleSet;
        }
      }
    }
    if(params?.message) {
      message = params.message;
    }
  }, []);
  useEffect(() => {
    setActiveParticipants(participants.filter((participant) => { return Boolean(participant.active) }));
  }, [participants])

  const pickWinner = () => {
    if (isPicking) {
      return false;
    }
    if (crystalBallAnimationRef.current) {
      crystalBallAnimationRef.current.play();
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
      const updatedParticipants = participants.map((participant, index) => {
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
        {participants.length === 1 && participants[0].name === "" && 
          <ExampleMessage>
            Add people as comma seperated values in the url <a href="/?people=Click,Cards,To Flip Them">example</a>
          </ExampleMessage>
        }
        {participants.length > 1 && participants[0].name !== "" && participants.map((participant) => {
          return (<OptionItem key={participant.name}>
            <CheckBox id={`${participant.name}-input`} type="checkbox" checked={participant.active} onChange={handleChange} name="participant_list" value={participant.name} />
            <label htmlFor={`${participant.name}-input`}>
              <TarotCard flipped={!participant.active} />
              {participant.name}
            </label>
          </OptionItem>)
        })}
      </PickList>
      <AnimationWrapper onClick={() => pickWinner()}>
        <WinnerDisplay $winnerIn={showWinner} $isPicking={isPicking}>
          {winner?.name && winner.name !== 'none' ? winner?.name : 'Start...'}
        </WinnerDisplay>
        <Player
          ref={crystalBallAnimationRef}
          src={wizardHands}
          speed={2}
          onEvent={event => {
            if (event === 'complete') {
              handleAnimationComplete();
            }
          }}
        />
      </AnimationWrapper>
      {message !== '' && <Message>
        {message.replaceAll('|', '\n')}
      </Message>}
      <Footer />
    </Wrapper>
  )
}

export default IndexPage
