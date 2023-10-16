import React from "react";
import PlaceItem from "./PlaceItem";

const PlaceList = (props) => {

  return (
    <ul className="flex flex-col gap-12 items-center pt-12 bg-gray-300 " >
      {props.items.map((place) => (
        <PlaceItem
          key={place.id}
          id={place.id}
          image={place.image}
          title={place.title}
          description={place.description}
          address={place.address}
          creator={place.creator}
          coords={place.location}
          onDelete={props.onDeletePlace}
        />
      ))}
    </ul>
  );
};

export default PlaceList;
