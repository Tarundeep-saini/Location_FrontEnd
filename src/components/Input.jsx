import React, { useEffect, useReducer, useState } from "react";

import { validate } from "../Shared/Validator";
const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),        
      };
    case "TOUCH":
      return {
        ...state,
        isTouched: true,
      };
    default:
      return state;
  }
};

const Input = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue || "",
    isTouched: false,
    isValid: props.initialValid|| false,
  });
  const changeHandler = (e) => {
    dispatch({
      type: "CHANGE",
      val: e.target.value,
      validators: props.validators,
    });
  };

  const [dynamicClass, setDynamicClass] = useState(
    "flex flex-col text-lg font-extrabold text-blue-400"
  );

  const { id, onInput } = props;
  const { value, isValid } = inputState;
  useEffect(() => {
    onInput(id, inputState.value, inputState.isValid);
  }, [id, value, isValid, onInput]);

  useEffect(() => {
    if (inputState.isTouched) {
      setDynamicClass(
        inputState.isValid
          ? "flex flex-col text-lg font-extrabold text-blue-800"
          : "flex flex-col text-lg font-extrabold text-red-700"
      );
    } else {
      setDynamicClass("flex flex-col text-lg font-extrabold text-blue-800");
    }
  }, [inputState.value, inputState.isTouched]);
  const TouchHandler = () => {
    dispatch({
      type: "TOUCH",
    });
  };

  const element =
    props.element === "input" ? (
      <input
        className="p-1 text-base font-normal border-2 mt-2"
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={changeHandler}
        onBlur={TouchHandler}
        value={inputState.value}
      />
    ) : (
      <textarea
        id={props.id}
        rows={props.rows || 4}
        onChange={changeHandler}
        onBlur={TouchHandler}
        value={inputState.value}
      />
    );

  return (
    <div className={dynamicClass}>
      <label className="text" htmlFor={props.id}>
        {props.label}{" "}
      </label>
      {element}
      {!inputState.isValid && inputState.isTouched && (
        <p className="text-sm font-extralight">{props.errorText}</p>
      )}
    </div>
  );
};

export default Input;
