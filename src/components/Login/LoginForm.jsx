import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { useMutation } from "@apollo/client";
import { LOGIN, GET_ME } from "../../module";
import { LOGGED_IN_QUERY } from "../../moduleClient";
import { useNavigate } from "react-router-dom";
import { setAccessToken } from "../../context/accessToken";

const LoginForm = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [prevInputs, setPrevInputs] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const [login, { data, loading, error }] = useMutation(LOGIN, {
    refetchQueries: [
      GET_ME, // DocumentNode object parsed with gql
      "Me", // Query name
    ],
  });

  let navigate = useNavigate();

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (event) => {
    const name = event.target.id;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (inputs && !disabled) {
      login({
        variables: inputs,
        // update: (store, { data }) => {
        //   if (!data) {
        //     return null;
        //   }
        //   store.writeQuery({
        //     query: LOGGED_IN_QUERY,
        //     data: {user:  data.me},
        //   });
        // },
      });
    }
  };

  useEffect(() => {
    let timer;
    if (
      inputs.username !== prevInputs.username ||
      inputs.password !== prevInputs.password
    ) {
      setIsTyping(true);
      setPrevInputs(inputs);
    }
    if (
      inputs.username === prevInputs.username &&
      inputs.password === prevInputs.password
    ) {
      timer = setTimeout(() => setIsTyping(false), 200);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [inputs, prevInputs]);

  useEffect(() => {
    const isDisabled =
      !inputs.username || !inputs.password || isTyping ? true : false;
    setDisabled(isDisabled);
  }, [loading, isTyping, inputs]);

  useEffect(() => {
    let redirectTimer;
    if (data) {
      setAccessToken(data.accessToken);
      redirectTimer = setTimeout(() => {
        navigate("/");
        window.location.reload(false);
      }, 1500);
    }
    return () => {
      clearTimeout(redirectTimer);
    };
  }, [data, navigate]);

  /*
  useEffect(() => {
    console.log("isTyping", isTyping);
    console.log("disabled", disabled);
  }, [isTyping, disabled]);

  useEffect(() => {
    console.log("inputs", inputs, "prevInputs", prevInputs);
  }, [inputs, prevInputs]);

  useEffect(() => {
    console.log("error", error);
  }, [error]);
  */

  return (
    <LoginContainer>
      <div className="formHeader">Login</div>
      <form className="form" id="form" spellCheck="false">
        <FormLabel>Username</FormLabel>
        <FormInput
          type={"text"}
          placeholder={"My Username"}
          id={"username"}
          value={inputs.username}
          onChange={(event) => handleInputChange(event)}
          // $ is required due to styled components
          $loading={loading}
          spellcheck="false"
          error={error}
          data={data}
        ></FormInput>

        <FormLabel>Password</FormLabel>
        <PasswordInputContainer>
          <FormInput
            type={showPassword ? "text" : "password"}
            placeholder={"My Password"}
            id={"password"}
            value={inputs.password}
            onChange={(event) => handleInputChange(event)}
            // $ is required due to styled components
            $loading={loading}
            spellcheck="false"
            error={error}
            data={data}
          ></FormInput>
          {showPassword ? (
            <HidePassword
              showPassword={showPassword}
              className="fas fa-eye-slash"
              onClick={togglePassword}
              id={`hide_login_password`}
            />
          ) : (
            <ShowPassword
              showPassword={showPassword}
              className="fas fa-eye"
              onClick={togglePassword}
              id={`show_login_password`}
            />
          )}
          {!loading &&
            error &&
            error.graphQLErrors.map(({ message }, i) => {
              return <ErrorMessage key={i}> {message}</ErrorMessage>;
            })}
        </PasswordInputContainer>
        {data && (
          <div>
            <CheckCircle className=" far fa-check-circle" />
            <SuccessText>Login successful!</SuccessText>
          </div>
        )}
        {!data && (
          <Button
            onClick={handleClick}
            $loading={loading}
            isTyping={isTyping}
            disabled={disabled}
            id={"loginButton"}
          >
            Login
          </Button>
        )}
      </form>
    </LoginContainer>
  );
};

export default LoginForm;

const transitionSpeed = 0.3;

const LoginContainer = styled.div`
  position: relative;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  width: 400px;
  max-width: 100%;
  margin: auto;
`;

const FormLabel = styled.div`
  display: inline-block;
  marginbottom: 5px;
`;

const FormInput = styled.input`
  border: 2px solid #f0f0f0;
  border-radius: 4px;
  display: block;
  box-sizing: border-box;
  width: 100%;
  padding: 14px;
  padding-right: 4rem;
  margin-bottom: 1rem;
  font-family: inherit;
  font-size: 14px;
  transition: border-color ${transitionSpeed}s;
  border-color: ${({ error, $loading, isTyping, data }) =>
    $loading || isTyping
      ? "gray"
      : error
      ? "#e74c3c"
      : data
      ? "#2ecc71"
      : "gray"};

  outline: none;
  spellcheck: false;
`;

const PasswordInputContainer = styled.div`
  position: relative;
  margin-bottom: 2rem;
`;

const ShowPassword = styled.i`
  position: absolute;
  right: 1.1rem;
  top: 0.8rem;
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
  right: 1rem;
  top: 0.8rem;
  font-size: 1.5rem;
  transition: opacity ${transitionSpeed}s;
  opacity: ${({ showPassword }) => (!showPassword ? 0.0 : 1.0)};
  color: #888888;
  cursor: pointer;
  &:hover {
    color: #b3b3b3;
  }
`;

const ErrorMessage = styled.small`
  position: absolute;
  bottom: -1rem;
  left: 0;
  color: #e74c3c;
`;

const Button = styled.button`
  background: ${({ disabled, $loading, isTyping }) =>
    isTyping || $loading
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

const CheckCircle = styled.i`
  font-size: 10rem;
  color: #2ecc71;
`;

const SuccessText = styled.div`
  font-size: 2rem;
  color: #2ecc71;
  margin-bottom: 1rem;
`;
