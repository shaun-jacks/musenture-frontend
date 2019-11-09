import React from "react";

const Jam = ({ jam }) => {
  return (
    <div>
      <h2>{jam.title}</h2>
      <p>{jam.description}</p>
      <small>{jam.location}</small>
      <ul>
        {jam.genres.map(genre => (
          <li>{genre}</li>
        ))}
      </ul>
    </div>
  );
};

export default Jam;
