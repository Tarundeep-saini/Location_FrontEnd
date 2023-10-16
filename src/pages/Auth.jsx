import React, { useState, useContext } from "react";
import { useForm } from "../Shared/Hooks/form-hook";
import LoadingSpinner from "../Shared/LoadingSpinner";
import ErrorModal from "../Shared/ErrorModal";
import Input from "../components/Input";
import { useNavigate } from "react-router-dom";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_EMAIL,
  VALIDATOR_REQUIRE,
} from "../Shared/Validator";
import Button from "../Shared/Button";
import { AuthContext } from "../context/auth-context";
import { useHttpClient } from "../Shared/Hooks/http-hook";
import ImageUplaod from "../Shared/imageUplaod";
const Auth = () => {
  const auth = useContext(AuthContext);
  const [isLoginMode, SetIsLoginMode] = useState(true);
  const { isLoading, isError, clearError, sendRequest } = useHttpClient();

  const navigate = useNavigate();

  const [formState, inputHandler, setFormData] = useForm(
    {
      Email: {
        value: "",
        isValid: false,
      },
      Password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const handleSwitch = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          Name: undefined,
        },
        formState.inputs.Email.isValid && formState.inputs.Password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          Name: {
            value: "",
            isValid: false,
          },
          image: {
            value: null,
            isValid: false,
          },
        },
        false
      );
    }
    SetIsLoginMode((prevMode) => !prevMode);
  };

  const AuthSubmitHandler = async (e) => {
    e.preventDefault();
    let responseData;
    if (isLoginMode) {
      try {
        const requestBody = {
          email: formState.inputs.Email.value,
          password: formState.inputs.Password.value,
        };

        const responseData = await sendRequest(
          `${import.meta.env.VITE_APP_BACKEND_URL}users/login`,
          "POST",
          JSON.stringify(requestBody),
          { "Content-Type": "application/json" }
        );
        auth.login(responseData.userId , responseData.token);
        navigate("/");
      } catch (error) {}
    } else {
      try {
        const formData = new FormData();
        formData.append("email", formState.inputs.Email.value);
        formData.append("name", formState.inputs.Name.value);
        formData.append("password", formState.inputs.Password.value);
        formData.append("image", formState.inputs.image.value);
        

        const responseData = await sendRequest(
          `${import.meta.env.VITE_APP_BACKEND_URL}users/signup`,
          "POST",
          formData
        );

        navigate("/");
        auth.login(responseData.userId , responseData.token);
      } catch (error) {}
    }
  };
  return (
    <div className="flex justify-center items-center h-100% ">
      <div className="flex flex-col items-center p-32 justify-center w-2/3 ">
        {isError && <ErrorModal errorText={isError} onClose={clearError} />}

        {isLoading && <LoadingSpinner />}
        <form
          className="border-2 border-black w-7/12 p-5"
          onSubmit={AuthSubmitHandler}
        >
          {!isLoginMode && (
            <Input
              id="Name"
              element="input"
              type="text"
              label="Your Name"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Enter a Name"
              onInput={inputHandler}
            />
          )}
          {!isLoginMode && (
            <ImageUplaod center id="image" onInput={inputHandler} />
          )}
          <Input
            id="Email"
            element="input"
            type="text"
            label="E-Mail"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Email format is not Valid"
            onInput={inputHandler}
          />
          <Input
            id="Password"
            element="input"
            type="password"
            label="Password"
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorText="Password should be atleast 5 characters"
            onInput={inputHandler}
          />

          <Button
            type="submit"
            onClick={AuthSubmitHandler}
            disabled={!formState.isValid}
          >
            {isLoginMode ? "LOGIN" : "SIGNUP"}
          </Button>
        </form>
        <Button onClick={handleSwitch}>
          Switch to {!isLoginMode ? "LOGIN" : "SIGNUP"}
        </Button>
      </div>
    </div>
  );
};

export default Auth;
