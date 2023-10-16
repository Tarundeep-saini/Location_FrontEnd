import React, { useEffect, useState } from "react";
import UsersList from "../components/UsersList";
import ErrorModal from "../Shared/ErrorModal";
import LoadingSpinner from "../Shared/LoadingSpinner";
import { useHttpClient } from "../Shared/Hooks/http-hook";

const   Users = () => {
  const { isLoading, isError, sendRequest, clearError } = useHttpClient();
  const [loadedUsers, setloadedUsers] = useState();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
         `${import.meta.env.VITE_APP_BACKEND_URL}users`
        );
        setloadedUsers(responseData.users);
      } catch (error) {

      }
    };
    fetchUsers();
  }, [sendRequest]);

  return (
    <div className="h-100%  " >
      {isError && <ErrorModal errorText={isError} onClose={clearError} />}
      {isLoading && <LoadingSpinner />}
      {!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
    </div  >
  );
};

export default Users;
