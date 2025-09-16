import React from 'react';
import PlanetCard from '../components/PlanetCard';

// fábrica para criar componentes PlanetCard
// é exportada para uso em outros arquivos
export const createPlanetCard = (planetData, index) => {
  return (
    <PlanetCard
      key={index} // chave única para cada componente na lista
      name={planetData.name}
      image={planetData.image}
      description={planetData.description}
    />
  );
};
// exporta a fábrica como padrão, para facilitar a importação
export default { createPlanetCard };