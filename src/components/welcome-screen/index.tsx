import { useEffect, useState, useRef } from "react";
import * as s from "./style";
import {
  NameInputContainer,
  NameInput,
  PronunciationButton,
  PronunciationInput,
} from "../../styles";

interface IParticipant {
  name: string;
  pronunciation?: string;
}

const WelcomeScreen = () => {
  const [participants, setParticipants] = useState<IParticipant[]>([
    { name: "" },
  ]);
  const [messageContent, setMessageContent] = useState("");
  const [outputLink, setOutputLink] = useState("");
  const [showPronunciation, setShowPronunciation] = useState<number | null>(
    null
  );
  const nameInputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const pronunciationInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const updateParticipant = (
    index: number,
    field: "name" | "pronunciation",
    value: string
  ) => {
    const newParticipants = [...participants];
    newParticipants[index] = { ...newParticipants[index], [field]: value };
    setParticipants(newParticipants);
  };
  const handleInputChange = (direction: "up" | "down") => {
    if (direction === "up") {
      setParticipants([...participants, { name: "" }]);
      // Focus the new input after it's rendered
      setTimeout(() => {
        const newIndex = participants.length;
        if (nameInputRefs.current[newIndex]) {
          nameInputRefs.current[newIndex]?.focus();
        }
      }, 0);
    } else {
      setParticipants((prevState) => prevState.slice(0, -1));
    }
  };
  useEffect(() => {
    const filteredParticipants = participants.filter(
      (p) => p.name.trim() !== ""
    );
    if (filteredParticipants.length > 0) {
      // Create URL-encoded participant strings in format "name" or "name:pronunciation"
      const participantStrings = filteredParticipants.map((p) =>
        p.pronunciation
          ? `${encodeURIComponent(p.name)}:${encodeURIComponent(
              p.pronunciation
            )}`
          : encodeURIComponent(p.name)
      );

      let link = `${window.location.protocol}//${
        window.location.host
      }/?participants=${participantStrings.join(",")}`;

      // Add message if it exists
      if (messageContent.length > 0) {
        link += `&message=${encodeURIComponent(messageContent)}`;
      }

      setOutputLink(link);
    } else {
      setOutputLink("");
    }
  }, [participants, messageContent]);
  const handleKeyUp = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Enter") {
      if (e.currentTarget.value.trim() !== "") {
        handleInputChange("up");
      }
    } else if (
      e.key === "Tab" &&
      !e.shiftKey &&
      index === participants.length - 1
    ) {
      // If tab is pressed on the last input, add a new one
      e.preventDefault();
      handleInputChange("up");
    }
  };
  return (
    <>
      <s.StyledLogo size={10} aria-label="You Go Next logo" />
      <s.Paragraph>
        Add the people, and (optionally) a pronounciation and overall message to
        show on screen. Then sit back while the crystal ball works its magic.
      </s.Paragraph>
      <s.WelcomeInputWrap>
        <s.Headline>People</s.Headline>
        {participants.map((participant, i) => (
          <NameInputContainer key={i}>
            <NameInput
              type="text"
              ref={(el) => (nameInputRefs.current[i] = el)}
              onChange={(e) => updateParticipant(i, "name", e.target.value)}
              onKeyDown={(e) => handleKeyUp(e, i)}
              value={participant.name}
              placeholder="Enter a name"
              autoFocus={i === 0}
            />
            <PronunciationInput
              type="text"
              ref={(el) => (pronunciationInputRefs.current[i] = el)}
              value={participant.pronunciation || ""}
              onChange={(e) =>
                updateParticipant(i, "pronunciation", e.target.value)
              }
              placeholder="Pronunciation"
              className={showPronunciation === i ? "visible" : ""}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === "Escape") {
                  e.currentTarget.blur();
                  setShowPronunciation(null);
                }
              }}
              onBlur={() => setShowPronunciation(null)}
            />
            <PronunciationButton
              type="button"
              $isActive={showPronunciation === i}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setShowPronunciation(showPronunciation === i ? null : i);
                if (
                  showPronunciation !== i &&
                  pronunciationInputRefs.current[i]
                ) {
                  setTimeout(() => {
                    pronunciationInputRefs.current[i]?.focus();
                  }, 0);
                }
              }}
              title={
                participant.pronunciation
                  ? "Edit pronunciation"
                  : "Add pronunciation"
              }
            >
              {participant.pronunciation ? "✏️" : "🔊"}
            </PronunciationButton>
          </NameInputContainer>
        ))}
        <s.InputControls>
          {participants.length > 1 && (
            <s.StyledButton
              $variant="down"
              onClick={() => handleInputChange("down")}
            >
              - Remove Person
            </s.StyledButton>
          )}
          <s.StyledButton $variant="up" onClick={() => handleInputChange("up")}>
            + Add Person
          </s.StyledButton>
        </s.InputControls>
        <s.Headline>Message</s.Headline>
        <s.StyledTextArea
          onKeyUp={(e) => {
            setMessageContent(e.currentTarget.value);
          }}
        />
        {outputLink && (
          <s.OutputLink>
            <a href={outputLink}>{outputLink}</a>
          </s.OutputLink>
        )}
      </s.WelcomeInputWrap>
    </>
  );
};

export default WelcomeScreen;
