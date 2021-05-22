import React from "react";
import "./Card.css";
interface Person {
  name: string;
  height?: string;
  mass?: string;
  gender?: string;
  homeworld?: string;
}

const Card: React.FC<Person> = ({ name }) => {
  return (
    <div className="bg-light-grey dib br3 pa3 ma2 grow Card">
      <img src={`https://robohash.org/${name}`} alt="person" />
      <div>
        <h2>{name}</h2>
      </div>
    </div>
  );
};

export default Card;
