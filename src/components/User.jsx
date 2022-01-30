import React from "react";
import { Link } from "react-router-dom";
import LogoutButton from "./Logout/LogoutButton";
import styled from "@emotion/styled";

const User = ({ user }) => {
  return (
    <UserWrapper>
      <main>
        <h2>This is your page</h2>
        <UserInfo>{user.email}</UserInfo>
      </main>
      <LogoutButton />
      <Link to="/">Back to Homepage</Link>
    </UserWrapper>
  );
};

export default User;

const UserWrapper = styled.div`
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const UserInfo = styled.div``;
