import React, { useState, useContext, UseNavigate } from "react";
import Modal from "./Modal";
import Button from "../Shared/Button";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth-context";
import { useHttpClient } from "../Shared/Hooks/http-hook";
import ErrorModal from "../Shared/ErrorModal";
import LoadingSpinner from "../Shared/LoadingSpinner";
const PlaceItem = (props) => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const { isLoading, isError, sendRequest, clearError } = useHttpClient();
  const [isMap, setMap] = useState(false);
  const [warning, setWarning] = useState(false);
  const handleConfirmDelete = async () => {
    try {
      await sendRequest(
        `${import.meta.env.VITE_APP_BACKEND_URL}places/${props.id}`,
        "DELETE",null,{
          Authorization:'bearer ' + auth.token
        }
      );
      props.onDelete(props.id);
    } catch (error) {}
    setWarning(false);
  };
  const handleCloseWarning = () => {
    setWarning(false);
  };
  const handleOpenWarning = () => {
    setWarning(true);
  };
  const handleModalOpen = () => {
    return setMap(true);
  };
  const handleModalClose = () => {
    return setMap(false);
  };

  return (
    <>
    {isLoading && <LoadingSpinner/> }
      {isError && <ErrorModal errorText={isError} onClose={clearError} />}
      <li className="flex flex-col items-center w-full md:w-1/2 lg:w-1/3 xl:w-4/12 bg-gray-100 p-4 mb-4 rounded-md">
        <div className="w-3/4 md:w-auto">
          <img
            className="rounded-xl"
            src={`http://localhost:5000/${props.image}`}
            alt={props.title}
          />
        </div>
        <div className="mt-3 text-center">
          <h2 className="text-2xl md:text-4xl font-extrabold">{props.title}</h2>
          <h3 className="text-lg md:text-2xl">{props.address}</h3>
          <p className="text-gray-500 text-sm md:text-base">
            {props.description}
          </p>
        </div>
        <div className="flex justify-center gap-4 mt-5">
          {auth.userId === props.creator && (
            <Button handleOpenWarning={handleOpenWarning} danger>
              DELETE
            </Button>
          )}
          {auth.userId === props.creator && (
            <Link to={`/place/${props.id}`}>
              <Button edit>EDIT</Button>
            </Link>
          )}
          <button
            className="border-2 border-lime-400 hover:bg-lime-600 text-lime-600 hover:text-white font-bold py-2 px-4 rounded"
            onClick={handleModalOpen}
          >
            VIEW ON MAP
          </button>
        </div>
        {isMap && (
          <Modal
            map
            address={props.address}
            handleModalClose={handleModalClose}
          />
        )}
        {warning && (
          <Modal
            warning={warning}
            handleCloseWarning={handleCloseWarning}
            ConfirmDelete={handleConfirmDelete}
          />
        )}
      </li>
    </>
  );
};

export default PlaceItem;
