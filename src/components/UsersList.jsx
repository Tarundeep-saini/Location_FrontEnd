import React from "react";
import UserItem from "./UserItem";

const UsersList = (props) => {
  if (props.items.length === 0) {
    return <>No users here</>;
  }
  return (
    <ul className="flex flex-col sm:flex-row items-center justify-center mt-4 space-y-2 sm:space-y-0 space-x-0 sm:space-x-7">
      {props.items.map((user) => (
        <UserItem
          key={user.id}
          id={user.id}
          name={user.name}
          placeCount={user.places.length}
          image={`${import.meta.env.VITE_APP_ASSET_URL}/${user.image}`}
        />
      ))}
    </ul>
  );
};

export default UsersList;
