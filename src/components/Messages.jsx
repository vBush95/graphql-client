import React, { useState, useEffect } from "react";
import {
  GET_MESSAGES,
  MESSAGE_SUBSCRIPTION,
  CREATE_MESSAGE,
  NEW_USER,
} from "../module";
import { useQuery, useSubscription, useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";

const Messages = ({ user }) => {
  //const { data, loading, error } = useQuery(GET_MESSAGES);

  const [createMessage] = useMutation(CREATE_MESSAGE);

  const [state, setState] = useState({
    username: user,
    content: "",
  });

  //const { data, loading, error } = useSubscription(MESSAGE_SUBSCRIPTION);
  const { data, loading, error } = useSubscription(NEW_USER);

  useEffect(() => {
    console.log("data", data);
  }, [data]);

  const onSend = () => {
    if (state.content.length > 0) {
      createMessage({ variables: state });
    }
    setState({ ...state, content: "" });
  };

  return (
    <Chat>
      {/*
      data ? (
        data.messageCreated.map(
          ({ id, username: messageUser, content }, index) => (
            <>
              <MessageWrapper
                user={user}
                messageUser={messageUser}
                key={`${index}-message`}
              >
                {user !== messageUser && (
                  <UserIcon>{messageUser.slice(0, 2).toUpperCase()}</UserIcon>
                )}
                <MessageContent user={user} messageUser={messageUser}>
                  {content}
                </MessageContent>
              </MessageWrapper>
            </>
          )
        )
      ) : (
        <div>no data !</div>
      )
      */}
      <ChatInput>
        <MessageInputField
          label="Content"
          value={state.content}
          onChange={(e) => setState({ ...state, content: e.target.value })}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              onSend();
            }
          }}
        ></MessageInputField>
        <SendMessageButton onClick={() => onSend()}>Send</SendMessageButton>
      </ChatInput>
      <div>
        <Link to="/">Back to Homepage</Link>
      </div>
    </Chat>
  );
};

export default Messages;

const Chat = styled.div`
  width: 50vw;
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
  display: flex;
  justify-content: ${({ user, messageUser }) =>
    user === messageUser ? "flex-end" : "flex-start"};
  padding-bottom: 1rem;
`;

const MessageContent = styled.div`
  background: ${({ user, messageUser }) =>
    user === messageUser ? "#58bf56" : "#e5e6ea"};
  color: ${({ user, messageUser }) =>
    user === messageUser ? "whtie" : "black"};
  padding: 1rem;
  border-radius: 1rem;
  maxwidth: 60%;
`;

const ChatInput = styled.div``;

const MessageInputField = styled.input``;

const SendMessageButton = styled.button``;
