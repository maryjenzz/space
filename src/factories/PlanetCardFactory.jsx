import React from 'react';
import PlanetCard from '../components/PlanetCard';

export const createPlanetCard = (planetData, index) => {
  return (
    <PlanetCard
      key={index}
      name={planetData.name}
      image={planetData.image}
      description={planetData.description}
    />
  );
};

export default { createPlanetCard };