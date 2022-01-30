import React from "react";
import styled from "@emotion/styled";

const OnlineUsers = ({ usersOnline }) => {
  /*
  const users = [
    { username: "Atest", settings: { usernameColor: "green" } },
    { username: "Best2", settings: { usernameColor: "white" } },
    { username: "Cest3", settings: { usernameColor: "white" } },
    { username: "tDest4", settings: { usernameColor: "white" } },
    { username: "tEst5", settings: { usernameColor: "white" } },
    { username: "Fest6", settings: { usernameColor: "white" } },
    { username: "Gest7", settings: { usernameColor: "white" } },
    { username: "Hest8", settings: { usernameColor: "white" } },
    { username: "Iest9", settings: { usernameColor: "white" } },
    { username: "Jest100000000000", settings: { usernameColor: "white" } },
  ];
  */
  return (
    <OnlineUsersContainer>
      <OnlineUsersWrapper>
        <Scrollbar>
          <Users>
            {usersOnline &&
              usersOnline.map(({ username, settings }, idx) => {
                return (
                  <User key={`${username}-${idx}`}>
                    <UserIcon>{username.slice(0, 2).toUpperCase()}</UserIcon>
                    <GreenCircle />
                    <Username color={settings.usernameColor}>
                      {username}
                    </Username>
                  </User>
                );
              })}
          </Users>
        </Scrollbar>

        <BoxShadow />
        <Background />
      </OnlineUsersWrapper>
    </OnlineUsersContainer>
  );
};

export default OnlineUsers;

const OnlineUsersContainer = styled.div`
  width: 11rem;
  height: 50rem;
  position: relative;
`;

const OnlineUsersWrapper = styled.div`
  overflow-yx: hidden;
  overflow-y: scroll;
  scroll-behavior: smooth;

  height: 50rem;
  display: flex;
  flex-direction: column;
  justify-items: flex-start;
  justify-content: flex-start;

  ${"" /* background-color: #18181b; */}
  box-sizing: border-box;

  padding: 0.6rem 0 0.6rem 0.6rem;

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

const Scrollbar = styled.div`
  height: 100%;
`;

const Users = styled.div``;

const User = styled.div`
  position: relative;
  display: flex;
  box-sizing: border-box;
  border-radius: 5px;
  padding: 2px;
  margin: 2px;

  color: ${({ color }) => color};
  font-weight: bold;
  overflow-wrap: break-word;
  text-align: left;
  border: 2px solid #4c4c4f;
  cursor: pointer;
  &:hover {
    background-color: #4c4c4f;
  }
`;

const UserIcon = styled.div`
  height: 30px;
  width: 30px;
  margin-right: 0.5rem;
  border: 2px solid #e5e6ea;
  border-radius: 25px;
  text-align: center;
  font-size: 18pt;
  padding-top: 1px;
  box-sizing: border-box;
  color: white;
  font-size: 1rem;
  background-color: #18181b;
`;

const GreenCircle = styled.div`
  position: absolute;
  top: 1.1rem;
  left: 1.4rem;
  background-color: #0fff00;
  width: 10px;
  height: 10px;
  border-radius: 50px;
  border: 2px solid #18181b;
`;

const Username = styled.div`
  width: 5rem;
  margin-top: 0.15rem;
  color: ${({ color }) => color};
  font-weight: bold;
  box-sizing: border-box;
  overflow-wrap: break-word;
`;

const BoxShadow = styled.div`
  box-shadow: inset 0 1rem 1rem -10px black;
  pointer-events: none;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 2px solid #4c4c4f;
  border-right: none;
  box-sizing: border-box;
  border-radius: 5px;
`;
const Background = styled.div`
  background-color: #18181b;
  height: 100%;
  pointer-events: none;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: -1;
  border-radius: 5px;
`;
