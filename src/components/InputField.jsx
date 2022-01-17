import React, { useEffect, useState } from "react";

import styled from "@emotion/styled";

import useIsMount from "../customHooks/useIsMount";
import LoadingCircle from "./LoadingCircle";

export const InputField = ({
  placeholder,
  errorMessage,
  label,
  id,
  type,
  value,
  handleInputChange,
  validate,
  password,
  valid,
  loading,
  isTyping,
  setIsTyping,
  setFinalInputs,
  allInputs,
}) => {
  const isRendered = useIsMount();

  const [prevValue, setPrevValue] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (isRendered) {
      //first Render
    } else {
      // subsequent renders
      const delayDebounceFn = setTimeout(() => {
        if (id === "password" && value) {
          validate({ variables: { password: value, confirmPassword: "" } });
        } else if (id === "confirmPassword" && value) {
          validate({
            variables: { password: password, confirmPassword: value },
          });
        } else if (value) {
          validate({ variables: { [id]: value } });
        }
      }, 1000);
      return () => clearTimeout(delayDebounceFn);
    }
  }, [value, validate, id, password, isRendered]);

  useEffect(() => {
    if (id === "confirmPassword" && valid && value) {
      setFinalInputs(allInputs);
    }
  }, [valid, allInputs, value, setFinalInputs]);

  useEffect(() => {
    if (value !== prevValue) {
      setIsTyping(true);
      setPrevValue(value);
    }
    if (value === prevValue) {
      setIsTyping(false);
    }
  }, [value, valid, loading, errorMessage]);

  /*
  useEffect(() => {
    console.log(
      "valid",
      valid,
      "loading",
      loading,
      "error",
      errorMessage,
      "value",
      value
    );
  }, [valid, loading, errorMessage, value]);
  */

  /*
  useEffect(() => {
    console.log("value", Boolean(value), "error", Boolean(errorMessage));
    console.log(
      "test",
      !value || (!valid && !errorMessage) ? 0.0 : errorMessage ? 1.0 : 0.0
    );
  }, [errorMessage, value, valid]);
*/

  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <FormInput
        type={type === "password" && showPassword ? "text" : type}
        placeholder={placeholder}
        id={id}
        value={value}
        onChange={(event) => handleInputChange(event)}
        // $ is required due to styled components
        $loading={loading}
        valid={valid}
        spellcheck="false"
        error={errorMessage}
        isTyping={isTyping}
      ></FormInput>
      <CheckIcon
        valid={valid}
        isTyping={isTyping}
        $loading={loading}
        className="fas fa-check-circle"
        value={value}
      ></CheckIcon>
      <ExclamationmarkIcon
        error={errorMessage}
        value={value}
        valid={valid}
        isTyping={isTyping}
        $loading={loading}
        className="fas fa-exclamation-circle"
      ></ExclamationmarkIcon>
      {type === "password" &&
        (showPassword ? (
          <HidePassword
            showPassword={showPassword}
            className="fas fa-eye-slash"
            onClick={togglePassword}
            id={`hide${id}`}
          />
        ) : (
          <ShowPassword
            showPassword={showPassword}
            className="fas fa-eye"
            onClick={togglePassword}
            id={`show${id}`}
          />
        ))}
      {(isTyping || loading) && value ? <LoadingCircle /> : null}
      {/*!loading &&
        !isTyping &&
        value !== "" &&
        errorMessage &&
        errorMessage.graphQLErrors.map(({ message }, i) => {
          return <ErrorMessage key={i}> {message}</ErrorMessage>;
        })*/}
      {!loading &&
        !isTyping &&
        value !== "" &&
        errorMessage &&
        errorMessage.graphQLErrors.map(({ extensions }, i) => {
          return <ErrorMessage key={i}> {extensions.errors[id]}</ErrorMessage>;
        })}
    </FormControl>
  );
};

export default InputField;

const transitionSpeed = 0.3;

const FormControl = styled.div({
  marginBottom: "10px",
  paddingBottom: "20px",
  position: "relative",
});

const FormLabel = styled.div({
  display: "inline-block",
  marginBottom: "5px",
});

const FormInput = styled.input`
  border: 2px solid #f0f0f0;
  border-radius: 4px;
  display: block;
  box-sizing: border-box;
  width: 100%;
  padding: 14px;
  padding-right: 5rem;
  font-family: inherit;
  font-size: 14px;
  transition: border-color ${transitionSpeed}s;
  border-color: ${({ value, valid, error, $loading, isTyping }) =>
    $loading || isTyping
      ? "gray"
      : !value || (!valid && !error)
      ? "gray"
      : error
      ? "#e74c3c"
      : "#2ecc71"};

  outline: none;
  spellcheck: false;
`;

const CheckIcon = styled.i`
  position: absolute;
  right: 15px;
  top: 2.5rem;
  font-size: 1.5rem;
  transition: opacity ${transitionSpeed}s;
  opacity: ${({ valid, $loading, isTyping, value }) =>
    $loading || isTyping ? 0.0 : value && valid ? 1.0 : 0.0};
  color: #2ecc71;
`;

const ExclamationmarkIcon = styled.i`
  position: absolute;
  right: 15px;
  top: 2.5rem;
  font-size: 1.5rem;
  transition: opacity ${transitionSpeed}s;
  opacity: ${({ value, error, valid, $loading, isTyping }) =>
    $loading || isTyping
      ? 0.0
      : !value || (!valid && !error)
      ? 0.0
      : error
      ? 1.0
      : 0.0};
  color: #e74c3c;
`;

const ErrorMessage = styled.small({
  position: "absolute",
  bottom: "0",
  left: "0",
  color: "#e74c3c",
});

const ShowPassword = styled.i`
  position: absolute;
  right: 3.1rem;
  top: 2.5rem;
  font-size: 1.5rem;
  transition: opacity ${transitionSpeed}s;
  opacity: ${({ showPassword }) => (showPassword ? 0.0 : 1.0)};
  color: #888888;
  cursor: pointer;

  &:hover {
    color: #b3b3b3;
  }
`;

const HidePassword = styled.i`
  position: absolute;
  right: 3rem;
  top: 2.5rem;
  font-size: 1.5rem;
  transition: opacity ${transitionSpeed}s;
  opacity: ${({ showPassword }) => (!showPassword ? 0.0 : 1.0)};
  color: #888888;
  cursor: pointer;
  &:hover {
    color: #b3b3b3;
  }
`;
