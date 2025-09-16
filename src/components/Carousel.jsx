import React, { useState, useRef, useEffect } from 'react';
import { createPlanetCard } from '../factories/PlanetCardFactory';

const planetsData = [
  {
    name: "Mercúrio",
    image: "img/mercurio.png",
    description: "É o menor planeta do Sistema Solar, o mais rápido e mais próximo ao Sol. Em função dessa proximidade, apresenta médias de temperatura de 125 °C, podendo chegar a 425 °C. Completa uma volta ao redor do Sol em 87,969 dias, mantendo sempre a mesma face voltada para ele, formada por um deserto de rochas incandescentes. Sua face oculta é escura e gelada, com baixas temperaturas. A atmosfera é bastante rarefeita."
  },
  {
    name: "Vênus",
    image: "img/venus.png",
    description: "É o segundo planeta mais próximo do Sol. Seu tamanho assemelha-se a Terra, com 12.104 quilômetros de diâmetro. Apesar de mais distante que Mercúrio, apresenta temperaturas de 461 °C. Está circundado por permanentes nuvens de dióxido de carbono, gás que retém boa parte do calor solar. Para girar sobre si gasta 243 dias e seu movimento de translação, com velocidade de 35 km por segundo, é de 225 dias, aproximadamente. O planeta é conhecido por estrela D’alva e visível da superfície da Terra."
  },
  {
    name: "Terra",
    image: "img/terra.png",
    description: "É uma esfera rochosa, com 12.757 km de diâmetro, está distante 149 milhões de quilômetros do Sol. A rotação em torno do seu eixo leva 23 horas, 56 minutos e 4,095 segundos. Arredondando, temos o dia de 24 horas. O movimento de translação ao redor do Sol se completa após 365 dias e um quarto. Com isso, cada quatro anos é bissexto, tem 366 dias. A lua é o satélite natural da Terra."
  },
  {
    name: "Marte",
    image: "img/marte.png",
    description: "É o planeta melhor visível da Terra, da qual está a distância de 62 milhões de quilômetros. Precisa de 687 dias para realizar o movimento de translação, a distância de 218 milhões de quilômetros do Sol. Seu dia tem duração semelhante ao da Terra, 24 horas e 37 minutos. Sua atmosfera é rarefeita e a temperatura varia em torno de zero graus. Marte, seis vezes menor que a Terra, apresenta duas pequenas luas: Fobos e Deimos."
  },
  {
    name: "Júpiter",
    image: "img/jupiter.png",
    description: "O maior planeta do Sistema Solar, com um diâmetro de 142.700 quilômetros, representa 1.300 vezes o tamanho da Terra. Encontra-se a 779 milhões de quilômetros do Sol. Seu ano tem a duração de quase 12 anos terrestres. Com a rapidez que gira em torno de si mesmo completa uma rotação em 9 horas e 55 minutos. É formado por um núcleo rochoso, recoberto por uma camada de milhares de quilômetros de gelo. A atmosfera é composta de amônia e metano, o que o torna bastante semelhante a uma bola de gás. A temperatura é de 130 °C abaixo de zero. Júpiter possui 67 satélites confirmados, sendo o planeta com maior número do sistema solar."
  },
  {
    name: "Saturno",
    image: "img/saturno.png",
    description: "Saturno leva aproximadamente 29 anos para completar o movimento de translação. Gira sobre si mesmo em 10 horas e 14 minutos. Com 120.000 quilômetros de diâmetro, é o segundo maior planeta do Sistema Solar. Possui três anéis, formados por milhares de partículas de rocha e poeira. Possui 62 luas, das quais apenas uma, Titã, é maior que a da Terra. É o mais leve dos planetas. Sua temperatura é de 140 °C abaixo de zero."
  },
  {
    name: "Urano",
    image: "img/urano.png",
    description: "Com 53.000 quilômetros de diâmetro, Urano é o terceiro maior planeta do Sistema Solar. A temperatura da superfície do planeta gira em torno de 185 °C abaixo de zero. É envolto por uma nuvem composta de gases. Tem 27 satélites conhecidos, dos quais se destacam: Titania, Oberon, Ariel, Umbrie e Miranda."
  },
  {
    name: "Netuno",
    image: "img/netuno.png",
    description: "É o quarto planeta em tamanho, com 14.000 quilômetros de diâmetro. Seu ano equivale a 165 anos terrestres. Realiza uma rotação a cada 15 horas e 45 minutos. O frio em sua superfície é intenso, em torno de 200 °C abaixo de zero. Possui 14 satélites naturais, dos quais se destacam Tritão e Nereida."
  },
];

const Carousel = () => {
    const [slideIndex, setSlideIndex] = useState(0);
    const carouselRef = useRef(null);

    const prevSlide = () => {
        setSlideIndex((prevIndex) => (prevIndex === 0 ? planetsData.length - 1 : prevIndex - 1));
    };

    const nextSlide = () => {
        setSlideIndex((prevIndex) => (prevIndex === planetsData.length - 1 ? 0 : prevIndex + 1));
    };

    useEffect(() => {
        if (carouselRef.current) {
            const slideWidth = carouselRef.current.querySelector('.card-planeta').offsetWidth;
            carouselRef.current.style.transform = `translateX(-${slideIndex * slideWidth}px)`;
        }
    }, [slideIndex]);

    return (
        <section id="planets">
            <h2>Planetas do Sistema Solar</h2>
            <p>Os Planetas são corpos celestes sem luz e calor próprios, esféricos e com gravidade própria, os quais giram em torno de uma estrela, que no caso do planeta Terra é o Sol</p>

            <div className="carousel-container">
                <button 
                    className="carousel-btn prev-btn" 
                    onClick={prevSlide}
                >
                    &lt;
                </button>
                <div className="carousel-track" ref={carouselRef}>
                    {planetsData.map((planet, index) => (
                        <PlanetCard
                            key={index}
                            name={planet.name}
                            image={planet.image}
                            description={planet.description}
                        />
                    ))}
                </div>
                <button 
                    className="carousel-btn next-btn" 
                    onClick={nextSlide}
                >
                    &gt;
                </button>
            </div>
        </section>
    );
};

export default Carousel;
