import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../Shared/Validator";
import Button from "../Shared/Button";
import { useForm } from "../Shared/Hooks/form-hook";
import { useHttpClient } from "../Shared/Hooks/http-hook";
import { AuthContext } from "../context/auth-context";
import ErrorModal from "../Shared/ErrorModal";
import ImageUpload from "../Shared/imageUplaod";
import LoadingSpinner from "../Shared/LoadingSpinner";
const AddPlace = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const { isLoading, isError, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      Title: {
        value: "",
        isValid: false,
      },
      Description: {
        value: "",
        isValid: false,
      },
      Address: {
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
  const placeSubmitHandler = async (e) => {
    e.preventDefault(); 
    const formData = new FormData();
    formData.append("title", formState.inputs.Title.value);
    formData.append("description", formState.inputs.Description.value);
    formData.append("address", formState.inputs.Address.value);
    formData.append("creator", auth.userId);
    formData.append("image", formState.inputs.image.value);
    try {
      await sendRequest(import.meta.env.VITE_APP_BACKEND_URL+"places", "POST", formData,{
        Authorization:'bearer ' + auth.token
      });
      navigate("/");
    } catch (error) {
     
    }
  };
  return (
    <>
      {isError && <ErrorModal errorText={isError} onClose={clearError} />}

      <div className="flex items-center p-32 justify-center w-100%">
        <form
          className="border-2 border-black w-5/12 p-5"
          onSubmit={placeSubmitHandler}
        >
          {isLoading && <LoadingSpinner />}
          <Input
            id="Title"
            element="input"
            type="text"
            label="Title"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Enter a text"
            onInput={inputHandler}
          />
          <Input
            id="Description"
            element="textarea"
            label="Description"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Write a proper description"
            onInput={inputHandler}
          />
          <Input
            id="Address"
            element="input"
            label="Address"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Write a Valid address"
            onInput={inputHandler}
          />
          <ImageUpload id="image" onInput={inputHandler} />
          <Button type="submit" disabled={!formState.isValid}>
            Submit
          </Button>
        </form>
      </div>
    </>
  );
};

export default AddPlace;
