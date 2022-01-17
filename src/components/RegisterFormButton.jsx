import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";

const RegisterFormButton = ({
  updateStep,
  valid,
  loading,
  isTyping,
  type,
  value,
  register,
  step,
  finalData,
  id,
}) => {
  const [disabled, setDisabled] = useState(true);
  const handleClick = (e) => {
    e.preventDefault();
    console.log("step", step);
    if (finalData && !disabled) {
      console.log("stepfinal", step);
      console.log("finalData", finalData);
      updateStep();
      register({
        variables: { registerInput: finalData },
      });
    } else if (!disabled) {
      updateStep();
    }
  };

  useEffect(() => {
    if (type === "password") {
      const isDisabled =
        loading || isTyping
          ? true
          : valid && value.password === value.confirmPassword
          ? false
          : true;
      setDisabled(isDisabled);
    } else {
      const isDisabled = loading || isTyping ? true : valid ? false : true;
      setDisabled(isDisabled);
    }
  }, [updateStep, valid, loading, isTyping, type, value]);

  return (
    <Button
      onClick={handleClick}
      $loading={loading}
      isTyping={isTyping}
      disabled={disabled}
      id={id}
    >
      Continue
    </Button>
  );
};

export default RegisterFormButton;

const Button = styled.button`
  background: ${({ disabled, $loading, isTyping }) =>
    $loading || isTyping
      ? "linear-gradient(90deg, rgba(153,153,153,0.3) 0%, rgba(153,153,153,1) 100%)"
      : disabled
      ? "linear-gradient(90deg, rgba(153,153,153,0.3) 0%, rgba(153,153,153,1) 100%)"
      : "linear-gradient(45deg, rgba(16,242,255,0.3) 0%, rgba(0,134,255,1) 100%)"};
  border: none;
  border-radius: 4px;

  color: #fff;
  display: block;
  font-family: inherit;
  font-size: 16px;
  padding: 10px;
  width: 100%;
  cursor: ${({ disabled, $loading, isTyping }) =>
    $loading || isTyping
      ? "not-allowed"
      : disabled
      ? "not-allowed"
      : "pointer"};
  transition: background-color 0.3s;
  &:hover {
    background-color: ${({ disabled, $loading, isTyping }) =>
      $loading || isTyping
        ? "rgba(153,153,153,1)"
        : disabled
        ? "rgba(153,153,153,1)"
        : "rgba(0,134,255,1)"};
  }
`;

/*
&:hover {
    background-color: ${({ disabled, $loading, isTyping }) =>
      $loading || isTyping ? "#888888" : disabled ? "#888888" : "#2e97ff"};
  }
  */
/*border: ${({ disabled, $loading, isTyping }) =>
    $loading || isTyping
      ? "2px solid #4d4d4d"
      : disabled
      ? "2px solid #4d4d4d"
      : "2px solid #0058af"};
      */
