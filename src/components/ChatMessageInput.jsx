import React, { useState, useRef, useEffect } from "react";
import styled from "@emotion/styled";
import colors from "../utils/generateColorArray";
import useOutsideAlerter from "../customHooks/useOutsideAlerter";
import { UPDATE_USERNAME_COLOR_MUTATION, GET_ME } from "../module";
import { useMutation } from "@apollo/client";

const ChatMessageInput = ({ onSend, chatInputRef, user, ownUsernameColor }) => {
  const [chatInput, setChatInput] = useState("");
  const [displayStylesMenu, setDisplayStylesMenu] = useState(false);
  // const [colorSelected, setColorSelected] = useState(
  //   user.settings.usernameColor
  // );
  const [colorSelected, setColorSelected] = useState(
    ownUsernameColor || "white"
  );
  const [updateUsernameColor] = useMutation(
    UPDATE_USERNAME_COLOR_MUTATION
    /*
    , {
    refetchQueries: [
      GET_ME, // DocumentNode object parsed with gql
      "Me", // Query name
    ],
  }
  */
  );

  const detectClickOutsideRef = useRef(null);
  useOutsideAlerter(detectClickOutsideRef, () => setDisplayStylesMenu(false));

  const handleClick = () => {
    if (chatInput.length > 0) {
      onSend();
      setChatInput("");
    }
  };
  const toggleStylesMenu = () => {
    setDisplayStylesMenu(!displayStylesMenu);
  };

  useEffect(() => {
    if (colorSelected !== ownUsernameColor && !displayStylesMenu) {
      // console.log(
      //   "colorSelected",
      //   colorSelected,
      //   "ownUsernameCOlor",
      //   ownUsernameColor
      // );
      updateUsernameColor({ variables: { color: colorSelected } });
    }
  }, [colorSelected, updateUsernameColor, displayStylesMenu, ownUsernameColor]);

  // useEffect(() => {
  //   console.log(
  //     "UEcolorSelected",
  //     colorSelected,
  //     "UEownUsernameCOlor",
  //     ownUsernameColor
  //   );
  // }, [colorSelected, ownUsernameColor]);

  return (
    <ChatInput>
      <ContainerMessageInput>
        <MessageInputField
          label="Content"
          placeholder="Send a message"
          value={chatInput}
          ref={chatInputRef}
          onChange={(e) => setChatInput(e.target.value)}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              onSend();
              setChatInput("");
            }
          }}
        ></MessageInputField>

        <CloseOnClickOutside ref={detectClickOutsideRef}>
          <ButtonForStyles onClick={toggleStylesMenu}>
            <Icon className="fas fa-users-cog" />
          </ButtonForStyles>
          {displayStylesMenu && (
            <StylesMenu>
              <StylesMenuWrapper>
                <ColorsMapWrapper>
                  <ColorsMap>
                    {colors.map((color, index) => (
                      <ColorBorder
                        colorSelected={colorSelected}
                        color={color}
                        key={`color-${color}`}
                      >
                        <TextColor
                          textcolor={color}
                          onClick={() => setColorSelected(color)}
                        />
                      </ColorBorder>
                    ))}
                  </ColorsMap>
                </ColorsMapWrapper>

                <UsernamePreview>
                  <ColoredUsername colorSelected={colorSelected}>
                    {user.username}
                  </ColoredUsername>
                </UsernamePreview>
              </StylesMenuWrapper>
            </StylesMenu>
          )}
        </CloseOnClickOutside>
        <SendMessageButton onClick={handleClick}>Send</SendMessageButton>
      </ContainerMessageInput>
    </ChatInput>
  );
};

export default ChatMessageInput;

const ChatInput = styled.div`
  display: flex;
  position: absolute;
  width: fit-content;
  justify-content: flex-end;
  align-items: center;
  bottom: 0;
  background-color: #18181b;
  border-radius: 5px;
  border: 2px solid #4c4c4f;
  width: 100%;
  height: 4rem;
  padding: 0.5rem;
  box-sizing: border-box;
`;

const CloseOnClickOutside = styled.div``;

const StylesMenu = styled.div`
  position: absolute;
  width: 10rem;
  height: 12rem;
  background-color: #18181b;
  left: -4rem;
  top: -12.3rem;
  border: 1px solid #707072;
  border-radius: 5px;
  box-shadow: 0 1rem 1rem -8px black;
  box-sizing: border-box;
`;

const StylesMenuWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  box-sizing: border-box;

  ${
    "" /* border: 1px solid #707072;
  border-radius: 5px; */
  }
`;

const ColorsMapWrapper = styled.div`
  height: 10rem;
  width: 100%;
  box-sizing: border-box;
  border-bottom: 1px solid #707072;

  overflow-y: scroll;

  /* width */
  &::-webkit-scrollbar {
    width: 1.5rem;
    cursor: pointer;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    border-radius: 5px;
    box-shadow: inset 0 0 10px 10px #707072;
    border: solid 0.7rem transparent;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: #18181b;
    border-radius: 10px;
    box-shadow: inset 0 0 9px 10px #4c4c4f;

    border: solid 0.5rem transparent;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    box-shadow: inset 0 0 10px 10px #555;
    cursor: pointer;
  }
`;

const ColorsMap = styled.div`
  height: 100%;
  width: 100%;
  padding: 0.5rem 0 0.5rem 0.5rem;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: flex-start;
`;

const ColorBorder = styled.div`
  box-sizing: border-box;
  border: ${({ colorSelected, color }) =>
    colorSelected === color ? "1px solid #707072" : "1px solid #18181b"};
  border-radius: 5px;
  padding: 3px;
  margin: 1px;
  height: fit-content;
`;

const TextColor = styled.div`
  background-color: ${({ textcolor }) => textcolor};
  box-sizing: border-box;
  ${"" /* //flex: 0 1 auto; */}

  width: 1.2rem;

  aspect-ratio: 1/1;

  border-radius: 50px;

  cursor: pointer;

  &:hover {
    filter: brightness(1.2);
  }
`;

const UsernamePreview = styled.div`
  height: 2rem;
  width: 100%;

  position: absolute;
  bottom: -1px;
  box-sizing: border-box;
`;

const ColoredUsername = styled.div`
  color: ${({ colorSelected }) => colorSelected};
  font-weight: bold;
  margin-top: 0.3rem;
`;

const ContainerMessageInput = styled.div`
  width: fit-content;
  position: relative;
`;

const MessageInputField = styled.input`
  box-sizing: border-box;
  /* width: 20rem; */
  width: 20rem;
  padding: 0.8rem 4rem 0.8rem 2.6rem;
  border: 1px solid #707072;
  border-radius: 5px;
  background-color: #4c4c4f;
  color: #cfcfcf;

  &::placeholder {
    color: #cfcfcf;
  }
  &:focus {
    background-color: #303237;
    outline: none;
  }
`;

const ButtonForStyles = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  background-color: #707072;
  position: absolute;
  top: 0.6rem;
  left: 0.6rem;
  border-radius: 2px;

  &:hover {
    box-shadow: 0 0 0 5px rgb(207, 207, 207, 0.1);
    cursor: pointer;
  }
`;

const SendMessageButton = styled.button`
  box-sizing: border-box;
  position: absolute;
  right: 0.575rem;
  top: 0.575rem;
  padding: 0.3rem;
  border-radius: 3px;
  border: none;
  background-color: #707072;
  color: #cfcfcf;
  cursor: pointer;
  &:hover {
    box-shadow: 0 0 0 5px rgb(207, 207, 207, 0.1);
    cursor: pointer;
  }
`;

const Icon = styled.i`
  position: absolute;
  color: white;
  font-size: 0.8rem;
  top: 0.4rem;
  left: 0.3rem;
`;
