import React from "react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import { useQuery } from "@apollo/client";

import { GET_ME } from "../module";

const Navbar = ({ loading, error, data }) => {
  // const { loading, error, data } = useQuery(GET_ME);

  let body = null;
  if (loading) {
    body = null;
  } else if (!error && data && data.me) {
    body = (
      <>
        <Messages>
          <Link to="/messages" style={{ textDecoration: "none" }}>
            <LinkContainer>
              <Icon className="fas fa-comments" />
              <Text>Messages</Text>
            </LinkContainer>
          </Link>
        </Messages>
        <User>
          <Link to="/user" style={{ textDecoration: "none" }}>
            <LinkContainer>
              <Icon className="fas fa-user-circle" />
              <TextUsername>{data.me.username}</TextUsername>
            </LinkContainer>
          </Link>
        </User>
      </>
    );
  } else {
    body = (
      <LoginAndRegister>
        <Link to="/register" style={{ textDecoration: "none" }}>
          <LinkContainer>
            <Icon className="fas fa-unlock" />
            <Text>Register</Text>
          </LinkContainer>
        </Link>
        <Link to="/login" style={{ textDecoration: "none" }}>
          <LinkContainer>
            <Icon className="fas fa-unlock-alt" />
            <Text>Login</Text>
          </LinkContainer>
        </Link>
      </LoginAndRegister>
    );
  }
  return (
    <NavbarContainer>
      <Home>
        <Link to="/" style={{ textDecoration: "none" }}>
          <LinkContainer>
            <Icon className="fas fa-home" />
          </LinkContainer>
        </Link>
      </Home>

      {body}
    </NavbarContainer>
  );
};

export default Navbar;

const NavbarContainer = styled.div`
  background-color: #18181b;
  width: 100vw;
  display: flex;
`;

const Home = styled.div``;

const LinkContainer = styled.div`
  padding: 0.5rem;
  background-color: #464649;
  display: flex;
  align-items: center;
  margin: 1rem;
  border-radius: 5px;
  color: white;
  text-decoratiion: none;
  font-size: 1.2rem;
  font-family: "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans",
    "Droid Sans", "Helvetica Neue";

  &:hover {
    box-shadow: 0 0 0 5px rgb(207, 207, 207, 0.1);
    cursor: pointer;
  }
  &:active {
    background-color: #4c4c4f;
  }
`;

const Text = styled.div`
  padding-left: 1rem;
  text-transform: uppercase;
`;

const TextUsername = styled.div`
  padding-left: 1rem;
`;

const Messages = styled.div``;

const LoginAndRegister = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const Icon = styled.i`
  color: white;
  font-size: 1.5rem;
`;

const User = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;
