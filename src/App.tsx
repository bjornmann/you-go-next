import { useState, useEffect, ChangeEvent, useRef } from "react"
import { Player } from '@lottiefiles/react-lottie-player';
import * as s from './styles';
import wizardHands from "./assets/wizard-hands.json";
import useWindowSize from './hooks/useWindowSize';
import Confetti from 'react-confetti';
import TarotCard from './components/tarot-card/index';
interface IPeople {
  name: string,
  active: boolean,
  index?: number,
}
const marketingParticipants = [
  { name: 'Bjorn', active: true },
  { name: 'Danyon', active: true },
  { name: 'Joe', active: true },
  { name: 'Jon', active: true },
  { name: 'Michael', active: true },
  { name: 'Mickey', active: true },
  { name: 'Patrick', active: true },
];
const kopsParticipants = [
  { name: 'Alice', active: true },
  { name: 'Andrew', active: true },
  { name: 'Bjorn', active: true },
  { name: 'Jason', active: true },
  { name: 'Kenny', active: true },
  { name: 'Mike', active: true },
  { name: 'Nate', active: true },
  { name: 'Risa', active: true },
];
// const resetUserCards = (participants: IPeople[]) => participants.map(participant => { return participant.active = true });
let baseParticipantList = [{ name: '', active: false }];
let message = '';
const IndexPage = () => {
  //all options/people
  const [participants, setParticipants] = useState<IPeople[]>(baseParticipantList);
  //options/people that can be picked
  const [activeParticipants, setActiveParticipants] = useState<IPeople[]>(baseParticipantList);
  //winner starts off empty
  const initialWinnerState = { name: 'none', active: false };
  const [winner, setWinner] = useState<IPeople>(initialWinnerState);
  //track interaction state
  const [isPicking, setIsPicking] = useState(false);
  //is it over?
  const [showWinner, setShowWinner] = useState(false);
  const [isDone, setIsDone] = useState(false);
  //generate colors for the cards
  const [colors, setColors] = useState([] as string[]);
  const colorSet = [] as string[];
  //need to acces the animation to change states
  const crystalBallAnimationRef = useRef<Player | null>(null);
  useEffect(() => {
    //get query params to pull options and message
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    //is it one of the two preset teams?
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
      if(params?.people || params?.options) {
        // parse them into a list
        const people = params?.people || params?.options;
        if (people.indexOf(',') > -1) {
          //more than one option, make sure it's not just a space or something foolish
          const realPeople = [...new Set(people.split(",").filter((person)=>{
            return person !== '';
          }))]
          //here's our list to work with, formatted how we need it 
          const peopleSet = realPeople.map((person) => {
            return { name: person, active: true };
          });
          //sanity check, make the TS robots smile
          if(peopleSet.length > 0){
            //put it in state
            setParticipants(peopleSet);
            baseParticipantList = peopleSet;
          }
        }
        else{
          //just one person, sure, weird.
          const person = [{ name: people, active: true }];
          setParticipants(person);
          baseParticipantList = person;
        }
      }
      else{
        //NO PEOPLE gtfo of here
        setIsPicking(true);
      }
    }
    if(params?.message) {
      //got a message to show? Show it!
      message = params.message;
    }
    document.body.onkeyup = function(e) {
      //enter to start the picking
      if (e.code == "Enter") {
        pickWinner();
      }
    }
  }, []);
  useEffect(()=>{
    //split up the 360 hue options by the count of options
    const huedelta = Math.trunc(360 / baseParticipantList.length);
    //spin the wheel so the first color is random vs static 
    const rotate =  Math.random() * 360;
    for (let index = 0; index < baseParticipantList.length; index++) {
      colorSet[index] = `hsla(${(index === 0 ? Math.random() : index ) * huedelta * rotate}, 80%, 35%, 1)`
    }
    setColors(colorSet);
  }, [baseParticipantList])
  useEffect(() => {
    setActiveParticipants(participants.filter((participant) => { return Boolean(participant.active) }));
  }, [participants])

  const pickWinner = () => {
    //if it's in progress, over, or none to pick from let's bail
    if (isPicking || isDone || getActiveParticipants(participants).length === 0) {
      return false;
    }
    if (crystalBallAnimationRef.current) {
      //got the animation, let's play it and start picking
      crystalBallAnimationRef.current.play();
      setIsPicking(true);
      setShowWinner(false);
    }
  }
  //filter option by status
  const getActiveParticipants = (participants: IPeople[]) => participants.filter((participant) => { return Boolean(participant.active) });
  //option chosen!
  const handleAnimationComplete = () => {
    setIsPicking(false);
    //make sure we're set correctly
    setActiveParticipants(getActiveParticipants(participants));
    //get a rando
    const winningNumber = Math.floor(Math.random() * activeParticipants.length);
    //find the rando in the list
    const winnerIndex = activeParticipants.findIndex((el) => {
      return el?.name === activeParticipants[winningNumber]?.name;
    });
    //put it in state
    setWinner({ index: winnerIndex, ...activeParticipants[winnerIndex] });
    //get the winner out of the list of options to pick from
    const activeUpdate = activeParticipants;
    activeUpdate.splice(winnerIndex, 1);
    setActiveParticipants(activeUpdate);
    //map that to the base list
    const updatedParticipants = participants.map((participant) => {
      return activeParticipants.find(p => p.name === participant.name) ? { name: participant.name, active: true } : { name: participant.name, active: false };
    });
    setParticipants(updatedParticipants);
    //display the winner
    setShowWinner(true);
    if(activeParticipants.length === 0){
      //none left, it's over
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
        numberOfPieces={100} 
        recycle={false} 
        width={size.width} 
        height={size.height}
        colors={colors}
        drawShape={ctx => {
          ctx.font = '48px sans-serif';
          ctx.fillText(winner.name, 10, 50);
        }}
      />}
    <s.Wrapper>
    <s.PickList $listCount={participants.length}>
        {participants.length === 1 && participants[0].name === "" && 
          <s.ExampleMessage>
            Add names as comma seperated values in the url. Here's an <a href="/?people=Click,Cards,To Flip Them">example</a>
          </s.ExampleMessage>
        }
        {participants.length >= 1 && participants[0].name !== "" && participants.map((participant, i) => {
          return (<s.OptionItem key={participant.name}>
            <s.CheckBox id={`${participant.name}-input`} type="checkbox" checked={participant.active} onChange={handleChange} name="participant_list" value={participant.name} />
            <label htmlFor={`${participant.name}-input`}>
              <TarotCard cardColor={colors[i]} flipped={!participant.active} />
              {participant.name}
            </label>
          </s.OptionItem>)
        })}
      </s.PickList>
      <s.AnimationWrapper onClick={() => pickWinner()}>
        <s.WinnerDisplay $winnerIn={showWinner} $isPicking={isPicking}>
          {winner?.name && winner.name !== 'none' ? winner?.name : 'Start...'}
        </s.WinnerDisplay>
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
      </s.AnimationWrapper>
      {message !== '' && <s.Message>
        {message.replaceAll('|', '\n')}
      </s.Message>}
    </s.Wrapper>
    </>
  )
}

export default IndexPage
