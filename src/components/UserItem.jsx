import React from "react";
import { Link } from "react-router-dom";

const UserItem = (props) => {
  return (
    <li className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 p-2">
    <Link to={`/${props.id}/places`} className="flex gap-4 sm:gap-6 items-center">
      <img
        className="w-40 h-52 rounded-xl object-contain border-2 border-gray-300"
        src={props.image}
        alt="No Image"
      />
      <div>
        <h2 className="font-extrabold text-lg">{props.name}</h2>
        <p className="text-sm">
          {props.placeCount} {props.placeCount === 1 ? "Place" : "Places"}
        </p>
      </div>
    </Link>
  </li>
    );
};

export default UserItem;
