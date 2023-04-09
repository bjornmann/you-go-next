import { useState, useEffect, ChangeEvent, useRef } from "react"
import { Player } from '@lottiefiles/react-lottie-player';
import { useLocalStorageBoolean } from "react-use-window-localstorage";

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
  { name: 'Jon', active: true },
  // { name: 'Mickey', active: true },
  { name: 'Noah', active: true },
  { name: 'Patrick', active: true },
];
const kopsParticipants = [
  { name: 'Alice', active: true },
  { name: 'Andrew', active: true },
  { name: 'Jeff', active: true },
  { name: 'Kenny', active: true },
  { name: 'Mike', active: true },
  // { name: 'Nate', active: true },
  { name: 'Risa', active: true },
  { name: 'Trey', active: true },
];
// const resetUserCards = (participants: IPeople[]) => participants.map(participant => { return participant.active = true });
let baseParticipantList = [{ name: '', active: false }];
let message = '';
const IndexPage = () => {
  //all options/people
  const [participants, setParticipants] = useState<IPeople[]>(baseParticipantList);
  //options/people that can be picked
  const [activeParticipants, setActiveParticipants] = useState<IPeople[]>(baseParticipantList);
  const [emptyList, setEmptyList] = useState(false);
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
  const [playSound, setPlaySound] = useLocalStorageBoolean("playSound", false);
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
      if (params?.people || params?.options) {
        // parse them into a list
        const people = params?.people || params?.options;
        if (people.indexOf(',') > -1) {
          //more than one option, make sure it's not just a space or something foolish
          const realPeople = [...new Set(people.split(",").filter((person) => {
            return person !== '';
          }))]
          //here's our list to work with, formatted how we need it 
          const peopleSet = realPeople.map((person) => {
            return { name: person, active: true };
          });
          //sanity check, make the TS robots smile
          if (peopleSet.length > 0) {
            //put it in state
            setParticipants(peopleSet);
            baseParticipantList = peopleSet;
          }
        }
        else {
          //just one person, sure, weird.
          const person = [{ name: people, active: true }];
          setParticipants(person);
          baseParticipantList = person;
        }
      }
      else {
        //NO PEOPLE gtfo of here
        setIsPicking(true);
      }
    }
    if (params?.message) {
      //got a message to show? Show it!
      message = params.message;
    }
    document.body.onkeyup = function (e) {
      //enter to start the picking
      if (e.code == "Enter") {
        pickWinner();
      }
    }
  }, []);
  useEffect(() => {
    //split up the 360 hue options by the count of options
    const huedelta = Math.trunc(360 / baseParticipantList.length);
    //spin the wheel so the first color is random vs static 
    const rotate = Math.random() * 360;
    for (let index = 0; index < baseParticipantList.length; index++) {
      colorSet[index] = `hsla(${(index === 0 ? Math.random() : index) * huedelta * rotate}, 80%, 35%, 1)`
    }
    setColors(colorSet);
  }, [baseParticipantList])
  useEffect(() => {
    setActiveParticipants(participants.filter((participant) => { return Boolean(participant.active) }));
    setEmptyList(participants.length === 1 && participants[0].name === "");
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
    const readOutName = activeParticipants[winningNumber]?.name;
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
    let speechOutput;
    const winningSpeechOptions = [
      'winner winner chicken dinner.',
      'you were picked last. yay.',
      'insert trumpet sound here.',
      'woo hoo. you win?',
      'cue the confetti.',
      'knock knock, who is there? You. you win.',
      'time to make the donuts.',
      'you just earned a black belt in going last. Chop!',
      'you are the hero of this story!',
      'there is no try, there is only you',
      'time to finish strong. POWER!',
      'it is time to party, party for you.',
      'I had a dream about this, you were there. you won!',
      'Last but probably not least!',
      'Chosen last? More like chosen best!',
      'You may have been chosen last, but you were still chosen! That\'s a win in my book.'
    ]
    speechOutput = 'you go next!';
    if (activeParticipants.length === 0) {
      //none left, it's over
      setIsDone(true);
      if (playSound) {
        speechOutput = winningSpeechOptions[Math.floor(Math.random() * winningSpeechOptions.length)];
      }
    }
    if (playSound) {
      const utterance = new SpeechSynthesisUtterance(`${readOutName}, ${speechOutput}`);
      utterance.pitch = 0.7;
      speechSynthesis.speak(utterance);
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
      if (getActiveParticipants(updatedParticipants).length > 0) {
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
        <s.PickList $listCount={participants.length} $emptyList={emptyList}>
          {emptyList &&
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
        <s.OptionsBar>
          <s.PlaySoundWrapper onClick={() => setPlaySound(!playSound)} status={playSound}>
            <s.Playsound status={playSound}>
              <svg x="0px" y="0px" viewBox="0 0 1000 1000" enableBackground="new 0 0 1000 1000">
                <g transform="translate(0.000000,511.000000) scale(0.100000,-0.100000)">
                  <path className="toggle" d="M7392.1,4990.5c-103.5-36.7-144.5-71.2-181.2-155.3c-34.5-86.3-36.7-187.7-2.1-250.2c12.9-25.9,172.6-192,351.6-371c524.2-517.7,834.8-947,1143.3-1574.7c274-556.5,446.5-1106.6,541.4-1725.7c56.1-362.4,56.1-1251.1,2.2-1607.1c-161.8-1046.2-571.6-1993.1-1214.5-2804.2c-79.8-101.4-293.4-330-472.4-509.1c-181.2-176.9-338.7-345.1-353.8-368.9c-58.2-112.2,0-304.1,114.3-375.3c88.4-53.9,241.6-53.9,330,2.1c105.7,64.7,552.2,502.6,744.2,733.4c830.5,987.9,1324.5,2131.2,1473.3,3408.2c43.1,353.8,41,1074.2,0,1432.3C9693.7,2309.2,9035.8,3644.5,7968,4675.5C7629.4,5003.4,7551.7,5046.6,7392.1,4990.5z" />
                  <path className="toggle" d="M6524.9,4062.9c-86.3-45.3-135.9-105.7-161.8-202.8c-38.8-142.4-2.1-200.6,295.5-496.1c791.7-780.9,1255.4-1738.6,1365.4-2825.8c92.8-934-127.3-1928.5-608.3-2735.2c-204.9-343-442.2-645-750.7-949.1c-289.1-286.9-336.5-362.4-308.5-478.9c23.7-107.9,92.7-192,183.3-228.6c148.8-58.2,226.5-32.4,442.2,159.6c647.1,573.8,1173.4,1408.6,1449.6,2299.5c291.2,942.7,291.2,2055.7,0,2998.4c-261,841.3-686,1544.5-1315.8,2170C6794.6,4093.1,6686.7,4144.9,6524.9,4062.9z" />
                  <path d="M4264.3,3769.6c-45.3-10.8-112.2-34.5-151-53.9c-38.8-21.6-571.6-429.3-1186.4-906l-1115.2-871.5h-621.2H567l-133.7-66.9c-148.8-75.5-258.9-202.8-304.2-351.6c-38.8-131.6-38.8-2709.3,0-2828c60.4-181.2,181.2-308.5,371-388.3c66.9-25.9,189.8-32.4,696.7-32.4h614.8l1121.7-875.8c616.9-481.1,1169.2-895.2,1225.2-918.9c226.5-103.5,506.9-36.7,683.8,159.6c172.6,194.1,161.8-58.2,161.8,3468.6c0,3526.9,10.8,3274.5-161.8,3468.6C4695.7,3737.2,4458.4,3817,4264.3,3769.6z M4395.9-1429.1l-6.5-1533.7L3317.3-2128l-1074.2,837V104.6v1395.6l1074.2,837l1072.1,837l6.5-1535.8C4398,794.9,4398-585.6,4395.9-1429.1z M1941.1,104.6v-1229.6h-614.8H711.5V104.6v1229.5h614.8h614.8V104.6z" />
                  <path className="toggle" d="M5782.9,2829.1c-94.9-47.5-153.1-144.5-153.1-261c0-127.3,21.6-159.6,230.8-368.9c405.5-403.4,660.1-845.6,796-1380.5c258.8-1018.2-47.4-2079.5-808.9-2817.2c-181.2-176.9-217.9-235.1-217.9-355.9c0-116.5,56.1-209.2,155.3-261c161.8-82,265.3-45.3,494,176.9c595.4,580.2,959.9,1320.1,1054.8,2139.8c36.7,304.2,15.1,819.7-43.1,1098c-151,720.5-489.7,1339.6-1011.7,1848.6C6054.7,2867.9,5942.5,2906.7,5782.9,2829.1z" />
                </g>
              </svg>
            </s.Playsound>
          </s.PlaySoundWrapper>
        </s.OptionsBar>
      </s.Wrapper>
    </>
  )
}

export default IndexPage
