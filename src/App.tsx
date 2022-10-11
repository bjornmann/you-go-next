import { useState, useEffect, ChangeEvent, useRef } from "react"
import styled, {keyframes, css} from "styled-components";
import { Player } from '@lottiefiles/react-lottie-player';
import wizardHands from "./assets/wizard-hands.json";
import useWindowSize from './hooks/useWindowSize';
import Confetti from 'react-confetti';
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
const PickList = styled.div<{$listCount:number}>`
  padding: 20px;
  text-align: center;
  display: grid;
  grid-template-columns: repeat(${({$listCount})=> $listCount < 6 ? $listCount : 6}, 1fr);
  border-radius: 10px;
  gap: 25px;
  margin-top: 20px;
  justify-content: space-around;
  flex-wrap: wrap;
  @media screen and (max-width: 500px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;
const Wrapper = styled.div`
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

const OptionItem = styled.div`
  transition: all .25s ease;
  font-size: 17px;
  font-weight: bold;
  &:focus-visible,&:focus,&:focus-within {
    filter: blur(1px);
    transform: scale(0.8);
  }
`
const Message = styled.div`
    padding: 14px 20px;
    font-size: 20px;
    text-align: center;
    color: #4d4d4d;
    line-height: 1.2em;
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
  { name: 'Andrew', active: true },
  { name: 'Bjorn', active: true },
  { name: 'Jason', active: true },
  { name: 'Jordan', active: true },
  { name: 'Kenny', active: true },
  { name: 'Mike', active: true },
  { name: 'Nate', active: true },
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
  const [isDone, setIsDone] = useState(false);
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
        message = 'How are you feeling?|Blockers?|Sprint goal?|Anything to share?';
      }
    }
    else {
      if(params?.people) {
        // parse them into a list
        const people = params.people;
        if (people.indexOf(',') > -1) {
          const realPeople = [...new Set(people.split(",").filter((person)=>{
            return person !== '';
          }))]
          const peopleSet = realPeople.map((person) => {
            return { name: person, active: true };
          });

          if(peopleSet.length > 0){
            console.log('real',peopleSet);
            setParticipants(peopleSet);
            baseParticipantList = peopleSet;
          }
        }
        else{
          const person = [{ name: people, active: true }];
          setParticipants(person);
          baseParticipantList = person;
        }
      }
      else{
        //NO PEOPLE
        setIsPicking(true);
      }
    }
    if(params?.message) {
      message = params.message;
    }
    document.body.onkeyup = function(e) {
      if (e.code == "Enter") {
        pickWinner();
      }
    }
  }, []);
  useEffect(() => {
    setActiveParticipants(participants.filter((participant) => { return Boolean(participant.active) }));
  }, [participants])

  const pickWinner = () => {
    if (isPicking || isDone || getActiveParticipants(participants).length === 0) {
      return false;
    }
    if (crystalBallAnimationRef.current) {
      crystalBallAnimationRef.current.play();
      setIsPicking(true);
      setShowWinner(false);
    }
  }
  const getActiveParticipants = (participants: People[]) => participants.filter((participant) => { return Boolean(participant.active) });
  const handleAnimationComplete = () => {
    setIsPicking(false);
    setActiveParticipants(getActiveParticipants(participants));
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
    if(activeParticipants.length === 0){
      setIsDone(true);
    }
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
      if(getActiveParticipants(updatedParticipants).length > 0){
        setIsDone(false);
      }
    }
  };
  const size = useWindowSize();
  return (
    <>
    {isDone && 
      <Confetti 
        numberOfPieces={400} 
        recycle={false} 
        width={size.width} 
        height={size.height}
        colors={['#3102c1','#63C132','#ED254E']}
        drawShape={ctx => {
          ctx.font = '48px sans-serif';
          ctx.fillText(winner.name, 10, 50);
        }}
      />}
    <Wrapper>
    <PickList $listCount={participants.length}>
        {participants.length === 1 && participants[0].name === "" && 
          <ExampleMessage>
            Add people as comma seperated values in the url <a href="/?people=Click,Cards,To Flip Them">example</a>
          </ExampleMessage>
        }
        {participants.length >= 1 && participants[0].name !== "" && participants.map((participant) => {
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
    </Wrapper>
    </>
  )
}

export default IndexPage
