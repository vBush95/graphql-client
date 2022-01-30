import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";

import {
  GET_ME,
  GET_MESSAGES,
  MESSAGE_SUBSCRIPTION,
  CREATE_MESSAGE,
  NEW_USER,
  USERS_ONLINE_SUBSCRIPTION,
  ADD_USER_TO_ONLINE,
  REMOVE_USER_FROM_ONLINE,
  UPDATE_LASTSEEN_MUTATION,
  UPDATE_USERNAME_COLOR_MUTATION,
  USERNAME_COLOR_SUBSCRIPTION,
} from "../module";
import { useQuery, useSubscription, useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import ChatMessageInput from "./ChatMessageInput";
import { playAudio } from "../utils/playAudio";
import messagePopSound from "../assets/audio/messagePopSound.mp3";

import { SubscriptionClient } from "subscriptions-transport-ws";
import { getAccessToken } from "../context/accessToken";
import OnlineUsers from "./OnlineUsers";

import { wsClient } from "../index";

function prettyDate2(time) {
  //console.log("time", time);
  let newTime;
  let daytime;
  let splitDaytime;
  if (time.indexOf("-") >= 0) {
    daytime = time.split("T");
    splitDaytime = daytime[1].split(":");
  } else if (time.indexOf(" ") >= 0) {
    daytime = time.split(" ");
    splitDaytime = daytime[4].split(":");
  } else {
    newTime = new Date(parseInt(time)).toString();
    //console.log("newTime", newTime);
    daytime = newTime.split(" ");
    splitDaytime = daytime[4].split(":");
  }

  const hoursAndMinutes = `
     ${splitDaytime[0]}:${splitDaytime[1]}
     `;
  return hoursAndMinutes;
}

// function prettyDate2(time) {
//   console.log("time", time);
//   let newTime;
//   if (time.indexOf("-") >= 0) {
//     newTime = time;
//   } else {
//     newTime = new Date(parseInt(time)).toString();
//   }
//   console.log("newTime", newTime);
//   const daytime = newTime.split(" ");
//   const splitDaytime = daytime[4].split(":");
//   const hoursAndMinutes = `
//   ${splitDaytime[0]}:${splitDaytime[1]}
//   `;

//   return hoursAndMinutes;
// }

const Messages = ({ user }) => {
  //const { data, loading, error } = useQuery(GET_MESSAGES);

  const audioRef = useRef(null);
  const [createMessage] = useMutation(CREATE_MESSAGE);
  const {
    data: allMessages,
    error: messagesError,
    loading: messagesLoading,
    refetch: refetchMessages,
  } = useQuery(GET_MESSAGES);
  const [ownUsernameColor, setOwnUsernameColor] = useState(
    user.settings.usernameColor
  );

  /*
  const [addToUsersInChat] = useMutation(ADD_USER_TO_ONLINE);
  const [removeFromUsersInChat] = useMutation(REMOVE_USER_FROM_ONLINE);
  */
  const [messages, setMessages] = useState([]);
  const playSound = useRef(true);
  const audio = useMemo(() => new Audio(messagePopSound), []);

  const chatInputRef = useRef(null);
  const listRef = useRef(null);

  const { data, loading, error } = useSubscription(
    MESSAGE_SUBSCRIPTION
    //   {
    //   update(cache, { data }) {
    //     const newMessage = data?.messageCreated;
    //     const existingMessages = cache.readQuery({
    //       query: GET_MESSAGES,
    //     });

    //     cache.writeQuery({
    //       query: GET_MESSAGES,
    //       data: {
    //         messages: [...existingMessages, newMessage],
    //       },
    //     });
    //   },
    // }
  );

  const {
    data: usersOnlineData,
    loading: usersOnlineLoading,
    error: usersOnlineError,
  } = useSubscription(USERS_ONLINE_SUBSCRIPTION);
  //const { data, loading, error } = useSubscription(NEW_USER);

  const {
    data: UCC,
    loading: UCloading,
    error: UCerror,
  } = useSubscription(USERNAME_COLOR_SUBSCRIPTION);

  const [onlineIndicator, setOnlineIndicator] = useState(0);
  let onlineUsersList;

  const [addUserToOnline] = useMutation(ADD_USER_TO_ONLINE);
  const [removeUserFromOnline] = useMutation(REMOVE_USER_FROM_ONLINE);
  /*
  const [updateLastSeenMutation] = useMutation(UPDATE_LASTSEEN_MUTATION);

  const updateLastSeen = () => {
    updateLastSeenMutation({
      variables: { timestamp: new Date().toString() },
    });
  };
  */

  const scrollToLastMessage = () => {
    let lastMessage = listRef.current.lastElementChild;
    lastMessage?.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  };

  const filterColorByUsername = useCallback(
    (username) => {
      if (usersOnlineData?.usersOnline) {
        const {
          username: messageCreator,
          settings: { usernameColor },
        } = usersOnlineData?.usersOnline.find((singleUser) => {
          return singleUser.username === username;
        }) || { username: null, settings: { usernameColor: null } };
        /*
        console.log("username", username);
        console.log("messageCreator", messageCreator);
        console.log("usernameColor", usernameColor);
        */
        return usernameColor ? usernameColor : "#707072";
      } else return "white";
    },
    [usersOnlineData?.usersOnline]
  );

  useEffect(() => {
    //console.log("data", data);
    //console.log("user", user);
    if (data?.messageCreated) {
      setMessages((prevMessages) => [...prevMessages, data.messageCreated]);
    }
  }, [data?.messageCreated]);

  useEffect(() => {
    //console.log("messages", messages);
    let ref;
    scrollToLastMessage();
    if (data?.messageCreated.username !== user.username && playSound.current) {
      playSound.current = false;
      audioRef.current.play();
      playAudio(messagePopSound);
      ref = setTimeout(() => (playSound.current = true), 30000);
    }
    return () => clearTimeout(ref);
  }, [messages, user.username, data?.messageCreated.username]);

  // useEffect(() => {
  //   console.log("usersOnline", usersOnlineData);
  // }, [usersOnlineData]);

  const onSend = () => {
    const chatInput = chatInputRef.current.value;
    if (chatInput.length > 0) {
      const newMessage = { username: user.username, content: chatInput };
      createMessage({ variables: newMessage });
    }
  };

  useEffect(() => {
    /* wsClient.connectionParams = {
      ...wsClient.connectionParams,
      username: user,
    };
    */
    const updateConnectionParams = async () => {
      wsClient.connectionParams.username = await user.username;
      wsClient.connect();
      //addToUsersInChat();
    };
    updateConnectionParams();
    //console.log(wsClient);
    return () => {
      wsClient.close();
      removeUserFromOnline();
      //removeFromUsersInChat();
    };
  }, [user.username, removeUserFromOnline]);

  useEffect(() => {
    const getNewColor = async () => {
      let newColor = await UCC?.usernameColorChanged.settings.usernameColor;

      if (newColor && UCC.usernameColorChanged.username === user.username) {
        setOwnUsernameColor(newColor);
      }
    };
    getNewColor();
    //console.log("usernameColorChange - outsideif", UCC);
  }, [
    UCC?.usernameColorChanged.settings.usernameColor,
    UCC?.usernameColorChanged.username,
    user.username,
  ]);

  // Visibilitychange doesnt work .....
  const handleTabClosing = useCallback(() => {
    // if (document.visibilityState === "visible") {
    //   addUserToOnline();
    // } else {
    //   removeUserFromOnline();
    // }

    removeUserFromOnline();
  }, [removeUserFromOnline]);

  useEffect(() => {
    addUserToOnline();

    window.addEventListener("beforeunload", handleTabClosing);
    return () => {
      //removeUserFromOnline();
      window.removeEventListener("beforeunload", handleTabClosing);
    };
  }, [addUserToOnline, removeUserFromOnline, handleTabClosing]);

  // useEffect(() => {
  //   console.log("ownUsernameColor", ownUsernameColor);
  // }, [ownUsernameColor]);

  // useEffect(() => {
  //   setOwnUsernameColor(user.settings.usernameColor);
  // }, []);

  /*
  useEffect(() => {
    updateLastSeen();
    setOnlineIndicator(setInterval(() => updateLastSeen(), 20000));
    return () => {
      clearInterval(onlineIndicator);
    };
  }, []);
  */

  useEffect(() => {
    const loadAllMessages = async () => {
      refetchMessages();
      //console.log("allMessages", allMessages);
      const messagesArray = await allMessages?.getMessages;
      //console.log("messagesArray", messagesArray);
      if (messagesArray && messagesArray.length > 0) {
        setMessages(messagesArray);
      }
    };

    loadAllMessages();
  }, [allMessages, refetchMessages]);

  // useEffect(() => {
  //   console.log("messages", messages);
  // }, [messages]);

  const renderMessages = useCallback(() => {
    const allMessages = messages.map(
      ({ id, username: messageFromUser, content, createdAt }, index) => {
        //console.log("message map", id, messageFromUser, content);
        return (
          <MessageWrapper
            username={user.username}
            messageFromUser={messageFromUser}
            key={`${index}-message`}
          >
            {/*user !== messageFromUser && (
              <UserIcon key={`${index}-icon`}>
                {messageFromUser.slice(0, 2).toUpperCase()}
              </UserIcon>
            )*/}

            <MessageContent
              username={user.username}
              messageFromUser={messageFromUser}
              key={`${index}-content`}
            >
              <MessageCreatedAt>{`${prettyDate2(createdAt)}`}</MessageCreatedAt>
              <Username
                color={`${filterColorByUsername(messageFromUser)}`}
                username={user.username}
                messageFromUser={messageFromUser}
              >{`${messageFromUser}`}</Username>
              {/* <MessageText>{`: ${content} - (ID ${id})`}</MessageText> */}
              <MessageText>{`: ${content}`}</MessageText>
            </MessageContent>
          </MessageWrapper>
        );
      }
    );
    return allMessages;
  }, [messages, user.username, filterColorByUsername]);

  return (
    <Wrapper>
      <OnlineUsers
        usersOnline={
          !usersOnlineLoading &&
          usersOnlineData?.usersOnline.length > 0 &&
          usersOnlineData?.usersOnline
        }
      ></OnlineUsers>
      <Chat>
        <audio
          ref={audioRef}
          id="MessageSound"
          src={messagePopSound}
          muted
        ></audio>
        <ChatMessages>
          <BoxShadow />
          <Scrollbar ref={listRef}>
            {messages.length > 0 ? (
              renderMessages()
            ) : (
              <NoData>No messages yet! Write a new message.</NoData>
            )}
          </Scrollbar>
        </ChatMessages>
        <ChatMessageInput
          onSend={onSend}
          chatInputRef={chatInputRef}
          user={user}
          ownUsernameColor={ownUsernameColor}
        />
        <Background />
      </Chat>
    </Wrapper>
  );
};

export default Messages;

const Wrapper = styled.div`
  display: flex;
  margin: auto;
`;

const Chat = styled.div`
  width: 50vw;
  height: 50rem;
  position: relative;
`;

const ChatMessages = styled.div`
  overflow-yx: hidden;
  overflow-y: scroll;
  scroll-behavior: smooth;

  height: 46rem;
  display: flex;
  flex-direction: column;
  justify-items: flex-end;
  justify-content: flex-end;

  ${"" /* background-color: #18181b; */}
  box-sizing: border-box;

  padding: 1rem 0 1rem 1rem;

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
const UserIcon = styled.div`
  height: 50px;
  width: 50px;
  margin-right: 0.5rem;
  border: 2px solid #e5e6ea;
  border-radius: 25px;
  text-align: center;
  font-size: 18pt;
  padding-top: 7px;
  box-sizing: border-box;
`;

const MessageWrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: ${({ username, messageFromUser }) =>
    username === messageFromUser ? "flex-end" : "flex-start"};
  padding-bottom: 0.3rem;
`;

const MessageContent = styled.div`
  color: white;
  padding: 0.1rem 0.3rem;
  border-radius: 5px;
  box-sizing: border-box;
  width: 60%;
  /*max-width: 60%; */
  overflow-wrap: break-word;
  /*
  display: flex;

  justify-items: flex-start;
  justify-content: flex-start;
  text-align: left;
*/
  &:hover {
    background-color: #4c4c4f;
  }
`;

const Username = styled.div`
  color: ${({ color }) => color};
  font-weight: bold;
  float: left;
`;

const MessageCreatedAt = styled.div`
  color: white;
  padding-right: 0.5rem;
  float: left;
`;

const MessageText = styled.div`
  text-align: left;
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

const NoData = styled.div`
  color: white;
`;

/* //message content
background: ${({ user, messageFromUser }) =>
user === messageFromUser ? "#58bf56" : "#e5e6ea"};

color: ${({ user, messageFromUser }) =>
*/
