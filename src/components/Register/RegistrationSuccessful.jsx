import React from "react";
import styled from "@emotion/styled";

const RegistrationSuccessful = () => {
  return (
    <div>
      <CheckCircle className=" far fa-check-circle" />
      <SuccessText>Registration successful!</SuccessText>
    </div>
  );
};

export default RegistrationSuccessful;

const CheckCircle = styled.i`
  font-size: 10rem;
  color: #2ecc71;
`;

const SuccessText = styled.div`
  font-size: 2rem;
  color: #2ecc71;
`;
