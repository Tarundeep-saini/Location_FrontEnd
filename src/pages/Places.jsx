import React, { useEffect, useState ,useContext} from "react";
import PlaceList from "../components/PlaceList";
import { useParams ,Link } from "react-router-dom";
import { useHttpClient } from "../Shared/Hooks/http-hook";
import LoadingSpinner from "../Shared/LoadingSpinner";
import { AuthContext } from "../context/auth-context";
const Places = () => {
  const auth = useContext(AuthContext);
  const [places, setPlaces] = useState();
  const { isLoading, isError, sendRequest, clearError } = useHttpClient();
  const userId = useParams().id;
  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(
          `${import.meta.env.VITE_APP_BACKEND_URL}places/users/${userId}`
        );
        setPlaces(responseData.places);
      } catch (error) {}
    };
    fetchPlaces();
  }, [sendRequest, userId]);

  const placeDeletedHandeler = (deletedPlaceID) => {
    setPlaces((prevPlaces) =>
      prevPlaces.filter((place) => place.id !== deletedPlaceID)
    );
  };

  return (
    <div className="h-100%x" >
      {!places &&<div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <p>This User Has Not Uploaded Any Places Yet, Maybe you can upload one</p>
        {auth.isLoggedIn ? (
          <Link to="/AddPlace" className="text-blue-500 underline">
            Add New Place
          </Link>
        ) : (
          <Link to="/auth" className="text-green-500 underline">
            Login
          </Link>
        )}
      </div>
    </div>}
      {isLoading && <LoadingSpinner />}
      {!isLoading && places && (
        <PlaceList items={places} onDeletePlace={placeDeletedHandeler} />
      )}
      {/* <PlaceList items={places} /> */}
    </div>
  );
};

export default Places;
