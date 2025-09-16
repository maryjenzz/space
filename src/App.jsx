import React, { useState, useEffect } from 'react';
import './App.css';
import Carousel from './components/Carousel';
import { themeManager } from './services/ThemeManager';


function App() {
  const [currentTheme, setCurrentTheme] = useState(themeManager.theme);

  const toggleTheme = () => {
    themeManager.toggleTheme();
    setCurrentTheme(themeManager.theme); // Atualiza o estado para re-renderizar
  };

  useEffect(() => {
    document.body.classList.toggle('dark', currentTheme === 'dark');
  }, [currentTheme]);


  return (
    <div className="container">
        
        <header>
            <h1>O Universo</h1>
            <p>Explorando os mistérios do cosmos.</p>
        </header>

        <main>

        <div className="theme-toggle">
          <input
            type="checkbox"
            id="theme-switch"
            className="toggle-checkbox"
            onChange={toggleTheme}
            checked={currentTheme === 'dark'}
          />
          <label htmlFor="theme-switch" className="toggle-label"></label>
        </div>

            <hr />
            <section id="introduction">
                <h2>Introdução ao Universo</h2>
                <p>Na astronomia, o Universo corresponde ao conjunto de toda a matéria, energia, espaço e tempo existente.</p>
                <p>Ele reúne os astros: planetas, cometas, estrelas, galáxias, nebulosas, satélites, dentre outros.</p>
                <p>O universo é, portanto, mais que um local imenso, ele é tudo, e engloba tudo o que existe. Para muitos, infinito. Note que do latim, a palavra universum significa “todo inteiro” ou “tudo em um só”.</p>
            </section>
            <hr />
            <section id="formation">
                <h2>Formação do Universo</h2>
                <p>Segundo a teoria criada pelo astrônomo George Lemaître (1894-1966), o universo tem uma origem comum, a partir da qual tudo se originou. Esta teoria foi confirmada pelo astrônomo norte-americano Edwin Hubble, que verificou que as galáxias estão em constante expansão e afastamento.</p>
                <p>A teoria do Big Bang diz que toda matéria e energia se concentravam em um ponto super denso e quente, conhecido como singularidade. A partir deste ponto, o universo se expandiu num processo conhecido como inflação, que durou uma fração infinitesimal de tempo.</p>
            </section>

            <hr />

            <Carousel />

            <hr />

            <section id="elements">
                <h2>Principais Elementos do Universo</h2>
                <p>Os corpos celestes mais relevantes que fazem parte do universo são:</p>
                <ul>
                    <li>Planetas: corpos sólidos e arredondados que não possuem luz e calor próprios. No entanto, cada planeta apresenta uma gravidade própria, os quais giram em torno de uma estrela.</li>
                    <li>Satélites naturais: corpos celestes que orbitam os planetas.</li>
                    <li>Galáxias: conjunto de planetas, estrelas e gases. O universo tem aproximadamente 100 bilhões de galáxias. Vivemos na galáxia denominada de Via Láctea, onde está o sistema solar.</li>
                    <li>Cometas: corpos celestes que possuem pouco massa e órbitas irregulares. O mais conhecido é o Cometa Halley.</li>
                    <li>Estrelas: corpos celestes esféricos formado de plasma e que possuem luz e calor próprio, por exemplo, o Sol.</li>
                    <li>Satélites: classificados em satélites naturais e satélites artificiais, os satélites são corpos celestes sólidos que orbitam os planetas. O satélite natural mais conhecido é a Lua e o artificial é o satélite Sputnik.</li>
                    <li>Buracos negros: estão entre os objetos celestes de maior massa que exercem maior gravidade.</li>
                </ul>
            </section>
            <hr />
            <section id="curiosity">
                <h2>Curiosidade: Você Sabia?</h2>
                <p>A expressão “Universo Paralelo” faz referência a um conceito de física quântica relacionado com a existência de outros universos e outras realidades ainda desconhecidas.</p>
                <p>Esse conceito está intimamente relacionado com a incompreensão e impossibilidade de assimilar a dimensão do universo.</p>
            </section>
        </main>

        <footer>
            <p>&copy; 2025 Todos os direitos reservados.</p>
        </footer>
    </div>
  );
}

export default App;