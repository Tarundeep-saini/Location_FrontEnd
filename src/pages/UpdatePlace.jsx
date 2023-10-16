import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../components/Input";
import Button from "../Shared/Button";
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from "../Shared/Validator";
import { useForm } from "../Shared/Hooks/form-hook";
import { useHttpClient } from "../Shared/Hooks/http-hook";
import LoadingSpinner from "../Shared/LoadingSpinner";
import { AuthContext } from "../context/auth-context";
import ErrorModal from "../Shared/ErrorModal";

const UpdatePlace = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const placeId = useParams().placeId;
  const [identifiedPlace, setIdentifiedPlace] = useState();
  const { isLoading, isError, clearError, sendRequest } = useHttpClient();
  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  useEffect(() => {
    let responseData;
    const fetchPlace = async () => {
      try {
        responseData = await sendRequest(
          `${import.meta.env.VITE_APP_BACKEND_URL}places/${placeId}`
        );
        setIdentifiedPlace(responseData.place);

        setFormData(
          {
            title: {
              value: responseData.place.title,
              isValid: true,
            },
            description: {
              value: responseData.place.description,
              isValid: true,
            },
          },
          true
        );
      } catch (error) {}
    };
    fetchPlace();
  }, [sendRequest, placeId]);

  const updateSubmit = (e) => {
    e.preventDefault();
    const requestBody = {
      title: formState.inputs.title.value,
      description: formState.inputs.description.value,
    };
    try {
      const UpdatePlace = async () => {
        const responseData = await sendRequest(
          `${import.meta.env.VITE_APP_BACKEND_URL}places/${placeId}`,
          "PATCH",
          JSON.stringify(requestBody),
          {
            "Content-Type": "application/json",
            Authorization: "bearer " + auth.token,
          }
        );
        navigate(-1);
      };
      UpdatePlace();
    } catch (error) {}
  };
  return (
    <>
      {isError && <ErrorModal errorText={isError} onClose={clearError} />}
      {isLoading && <LoadingSpinner />}
      {identifiedPlace && (
        <div className="flex align-middle justify-center pt-40">
          <form
            className="border-2 border-black w-5/12 p-5"
            onSubmit={updateSubmit}
          >
            <Input
              id="title"
              element="input"
              type="text"
              label="Title"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please Enter Valid Title"
              onInput={inputHandler}
              initialValue={formState.inputs.title.value}
              initialValid={formState.inputs.title.isValid}
            />
            <Input
              id="description"
              element="textarea"
              label="description"
              validators={[VALIDATOR_MINLENGTH(5)]}
              errorText="Please Enter Valid Description Min 5 character "
              onInput={inputHandler}
              initialValue={formState.inputs.description.value}
              initialValid={formState.inputs.description.isValid}
            />
            <Button type="submit" disabled={!formState.isValid}>
              Update Place
            </Button>
          </form>
        </div>
      )}
    </>
  );
};

export default UpdatePlace;
