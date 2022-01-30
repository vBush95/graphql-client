import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import { LOGOUT, GET_ME } from "../../module";
import { useMutation } from "@apollo/client";
import { setAccessToken, getAccessToken } from "../../context/accessToken";

const LogoutButton = () => {
  const [logout, { data, loading, error, client }] = useMutation(LOGOUT);

  const handleClick = async () => {
    await logout();
    setAccessToken("");
    await client.resetStore();
  };

  return (
    <Link to="/" style={{ textDecoration: "none" }} onClick={handleClick}>
      <LinkContainer>
        <Icon className="fas fa-sign-out-alt" />
        <Text>Logout</Text>
      </LinkContainer>
    </Link>
  );
};

export default LogoutButton;

const LinkContainer = styled.div`
  width: fit-content;
  padding: 0.5rem;
  background-color: #464649;
  display: flex;
  align-items: center;
  margin: 1rem 0 2rem;
  border-radius: 5px;
  color: white;
  text-decoratiion: none;
  font-size: 1.2rem;
  font-family: "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans",
    "Droid Sans", "Helvetica Neue";
  text-transform: uppercase;
  &:hover {
    box-shadow: 0 0 0 5px rgb(24, 24, 27, 0.1);
    cursor: pointer;
  }
  &:active {
    background-color: #4c4c4f;
  }
`;
const Text = styled.div`
  padding-left: 1rem;
`;

const Icon = styled.i`
  color: white;
  font-size: 1.5rem;
`;
