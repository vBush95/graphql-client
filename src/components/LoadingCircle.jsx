import React from "react";
import styled from "@emotion/styled";
import { css, keyframes } from "@emotion/react";

const LoadingCircle = () => {
  return (
    <Loader
      css={css`
        animation: ${spin} 1s ease infinite;
      `}
    ></Loader>
  );
};

export default LoadingCircle;

const Loader = styled.div`
  border: 4px solid #f3f3f3; /* Light grey */
  border-top: 4px solid #888888;
  border-radius: 50%;
  width: 1rem;
  height: 1rem;
  animation: spin 2s linear infinite;
  position: absolute;
  right: 15px;
  top: 2.5rem;
`;
const spin = keyframes`
 0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg) ; }
`;
/*
css={css`
          animation: ${spin} 1s ease infinite;
        `}*/
