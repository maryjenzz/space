import React from 'react';

const PlanetCard = ({ name, image, description }) => {
  return (
    <div className="card-planeta">
      <h3>{name}</h3>
      <img src={image} alt={`Imagem do planeta ${name}`} />
      <p className="planet-text">{description}</p>
    </div>
  );
};

export default PlanetCard;