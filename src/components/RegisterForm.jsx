import React, { useState } from "react";
import InputField from "./InputField";
import RegisterMultiStepper from "./RegisterMultiStepper";
import { gql, useMutation } from "@apollo/client";
import RegisterFormButton from "./RegisterFormButton";
import RegistrationSuccessful from "./RegistrationSuccessful";

const VALIDATE_REGISTERKEY = gql`
  mutation validateKey($registerKey: String!) {
    registerValidateKey(registerKey: $registerKey)
  }
`;

const VALIDATE_EMAIL = gql`
  mutation validateEmail($email: String!) {
    registerValidateEmail(email: $email)
  }
`;

const VALIDATE_USERNAME = gql`
  mutation validateUsername($username: String!) {
    registerValidateUsername(username: $username)
  }
`;

const VALIDATE_PASSWORD = gql`
  mutation validatePassword($password: String!, $confirmPassword: String!) {
    registerValidatePassword(
      password: $password
      confirmPassword: $confirmPassword
    )
  }
`;

const REGISTER = gql`
  mutation register($registerInput: RegisterInput) {
    register(registerInput: $registerInput) {
      id
      email
      token
      username
      createdAt
    }
  }
`;

const reducerFunctionSteps = ({
  step,
  handleInputChange,
  value,
  validateKeyMutation,
  validateEmailMutation,
  validateUsernameMutation,
  validatePasswordMutation,
  handleNextStep,
  finalRegistration,
  isTyping,
  setIsTyping,
  setFinalInputs,
  finalInputs,
}) => {
  switch (step) {
    case "0":
      const [
        validateKey,
        { data: registerKey, loading: loadingKey, error: errorKey },
      ] = validateKeyMutation;
      return (
        <>
          <InputField
            placeholder="Register-Key"
            errorMessage={errorKey}
            label="Register-Key"
            id="registerKey"
            type="text"
            valid={registerKey}
            loading={loadingKey}
            handleInputChange={handleInputChange}
            value={value.registerKey}
            validate={validateKey}
            isTyping={isTyping}
            setIsTyping={setIsTyping}
          />
          <RegisterFormButton
            step={step}
            updateStep={handleNextStep}
            valid={registerKey}
            loading={loadingKey}
            isTyping={isTyping}
            id={"registerKeyButton"}
          />
        </>
      );
    case "1":
      const [
        validateEmail,
        { data: email, loading: loadingEmail, error: errorEmail },
      ] = validateEmailMutation;
      return (
        <>
          <InputField
            placeholder="My-Email"
            errorMessage={errorEmail}
            label="E-Mail"
            id="email"
            type="email"
            valid={email}
            loading={loadingEmail}
            handleInputChange={handleInputChange}
            value={value.email}
            validate={validateEmail}
            isTyping={isTyping}
            setIsTyping={setIsTyping}
          />
          <RegisterFormButton
            step={step}
            updateStep={handleNextStep}
            valid={email}
            loading={loadingEmail}
            isTyping={isTyping}
            id={"registerEmailButton"}
          />
        </>
      );
    case "2":
      const [
        validateUsername,
        { data: username, loading: loadingUsername, error: errorUsername },
      ] = validateUsernameMutation;
      return (
        <>
          <InputField
            placeholder="My-Username"
            errorMessage={errorUsername}
            label="Username"
            id="username"
            type="text"
            valid={username}
            loading={loadingUsername}
            handleInputChange={handleInputChange}
            value={value.username}
            validate={validateUsername}
            isTyping={isTyping}
            setIsTyping={setIsTyping}
          />
          <RegisterFormButton
            step={step}
            updateStep={handleNextStep}
            valid={username}
            loading={loadingUsername}
            isTyping={isTyping}
            id={"registerUsernameButton"}
          />
        </>
      );
    case "3":
      const [
        validatePassword,
        { data: password, loading: loadingPassword, error: errorPassword },
      ] = validatePasswordMutation;
      const [register] = finalRegistration;
      return (
        <>
          <InputField
            placeholder="My-Password"
            errorMessage={errorPassword}
            label="Password"
            id="password"
            type="password"
            valid={password}
            loading={loadingPassword}
            handleInputChange={handleInputChange}
            value={value.password}
            validate={validatePassword}
            isTyping={isTyping}
            setIsTyping={setIsTyping}
          />
          <InputField
            placeholder="My-Password"
            errorMessage={errorPassword}
            label="Confirm Password"
            id="confirmPassword"
            type="password"
            valid={password}
            loading={loadingPassword}
            handleInputChange={handleInputChange}
            value={value.confirmPassword}
            validate={validatePassword}
            password={value.password}
            isTyping={isTyping}
            setIsTyping={setIsTyping}
            setFinalInputs={setFinalInputs}
            allInputs={value}
          />
          <RegisterFormButton
            updateStep={handleNextStep}
            register={register}
            step={step}
            valid={password}
            loading={loadingPassword}
            isTyping={isTyping}
            value={{
              password: value.password,
              confirmPassword: value.confirmPassword,
            }}
            finalData={finalInputs}
            type="password"
            id={"registerPasswordButton"}
          />
        </>
      );
    case "4":
      return <RegistrationSuccessful />;
    default:
      throw new Error("Unbekannte Action");
  }
};

const RegisterForm = () => {
  /* 
  const [validateKey, { data: code, loading: loadingKey, error: errorKey }] =
    useMutation(VALIDATE_KEY);
     const [
    validateEmail,
    { data: email, loading: loadingEmail, error: errorEmail },
  ] = useMutation(VALIDATE_EMAIL);
  const [
    validateUsername,
    { data: username, loading: loadingUsername, error: errorUsername },
  ] = useMutation(VALIDATE_USERNAME);
  const [
    validatePassword,
    { data: password, loading: loadingPassword, error: errorPassword },
  ] = useMutation(VALIDATE_PASSWORD);
  */
  const validateKeyMutation = useMutation(VALIDATE_REGISTERKEY);
  const validateEmailMutation = useMutation(VALIDATE_EMAIL);
  const validateUsernameMutation = useMutation(VALIDATE_USERNAME);
  const validatePasswordMutation = useMutation(VALIDATE_PASSWORD);
  const finalRegistration = useMutation(REGISTER);

  const [inputs, setInputs] = useState({
    registerKey: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [isTyping, setIsTyping] = useState(false);
  const [finalInputs, setFinalInputs] = useState(null);
  /*
  const [validateEmail, { data, loading, error }] = useMutation(VALIDATE_EMAIL);
  const [validateUsername, { data, loading, error }] = useMutation(VALIDATE_USERNAME);
  const [validatePassword, { data, loading, error }] = useMutation(VALIDATE_PASSWORD);
  */
  const [step, setStep] = useState(0);

  const handleInputChange = (event) => {
    const name = event.target.id;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  //TODO: handle button click

  //Multi-Step functions
  const [skipped, setSkipped] = useState(new Set());

  const isStepOptional = (step) => {
    return step === null;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNextStep = () => {
    let newSkipped = skipped;
    if (isStepSkipped(step)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(step);
    }

    setStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(step)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(step);
      return newSkipped;
    });
  };

  // ---------------
  /*
  useEffect(() => {
    console.log("inputs", inputs);
    return () => {};
  }, [inputs]);
  */
  return (
    <div className="formContainer">
      <div className="formHeader">Create Account</div>
      <RegisterMultiStepper
        updateStep={setStep}
        activeStep={step}
        isStepOptional={isStepOptional}
        isStepSkipped={isStepSkipped}
        handleBack={handleBack}
        handleSkip={handleSkip}
        handleNextStep={handleNextStep}
        skipped={skipped}
        setSkipped={setSkipped}
      />
      <form className="form" id="form" spellCheck="false">
        {/*reducerFunctionSteps({
          step: `${step}`,
          data,
          loading,
          error,
          handleInputChange,
          value: inputs,
        }) */}
        {reducerFunctionSteps({
          step: `${step}`,
          handleInputChange,
          value: inputs,
          validateKeyMutation,
          validateEmailMutation,
          validateUsernameMutation,
          validatePasswordMutation,
          finalRegistration,
          handleNextStep,
          isTyping,
          setIsTyping,
          setFinalInputs,
          finalInputs,
        })}
      </form>
    </div>
  );
};

export default RegisterForm;
