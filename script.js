(function () {
  const SELECTOR_TRACK = '.carousel-track';
  const SELECTOR_SLIDE = '.card-planeta';
  const SELECTOR_NEXT = '.next-btn';
  const SELECTOR_PREV = '.prev-btn';

  const track = document.querySelector(SELECTOR_TRACK);
  const nextButton = document.querySelector(SELECTOR_NEXT);
  const prevButton = document.querySelector(SELECTOR_PREV);

  if (!track || !nextButton || !prevButton) {
    console.error('Carrossel: elementos não encontrados.');
    return;
  }

  let slideIndex = 1;   
  let slideWidth = 0;  
  let initialized = false;

  function getSlideWidth() {
    const slide = track.querySelector(SELECTOR_SLIDE);
    if (!slide) return 0;
    const rect = slide.getBoundingClientRect();
    const cs = getComputedStyle(slide);
    const margin = parseFloat(cs.marginLeft) + parseFloat(cs.marginRight);
    return Math.round(rect.width + margin);
  }

  function applyTransform(withTransition = true) {
    track.style.transition = withTransition ? 'transform 0.5s ease' : 'none';
    track.style.transform = `translate3d(-${slideIndex * slideWidth}px, 0, 0)`;
  }

  function goTo(i) {
    slideIndex = i;
    applyTransform(true);
  }

  function recalcAndSnap() {
    slideWidth = getSlideWidth();
    applyTransform(false);

    track.offsetHeight;
    track.style.transition = 'transform 0.5s ease';
  }

  function init() {
    if (initialized) return;

    const originals = Array.from(track.querySelectorAll(SELECTOR_SLIDE));
    if (originals.length < 2) {
      console.warn('Carrossel: precisa de pelo menos 2 slides.');
      return;
    }

    const firstClone = originals[0].cloneNode(true);
    const lastClone = originals[originals.length - 1].cloneNode(true);
    firstClone.dataset.clone = 'first';
    lastClone.dataset.clone = 'last';

    track.appendChild(firstClone);
    track.insertBefore(lastClone, originals[0]);

    slideWidth = getSlideWidth();
    slideIndex = 1; 
    applyTransform(false);

    nextButton.addEventListener('click', () => goTo(slideIndex + 1));
    prevButton.addEventListener('click', () => goTo(slideIndex - 1));

    track.addEventListener('transitionend', () => {
      const children = track.children; 
      const current = children[slideIndex];

      if (!current) return;

      if (current.dataset.clone === 'first') {
        // Passou do último original → caiu no clone do primeiro
        // Teleporta para o primeiro original (índice 1)
        applyTransform(false); // corta transição para não aparecer “pulo”
        slideIndex = 1;
        applyTransform(false);
        // força reflow para a transição voltar a funcionar depois
        // eslint-disable-next-line no-unused-expressions
        track.offsetHeight;
        track.style.transition = 'transform 0.5s ease';
      } else if (current.dataset.clone === 'last') {
        // Voltou além do primeiro original → caiu no clone do último
        applyTransform(false);
        slideIndex = children.length - 2; // último original
        applyTransform(false);
        // eslint-disable-next-line no-unused-expressions
        track.offsetHeight;
        track.style.transition = 'transform 0.5s ease';
      }
    });

    // Recalcula em resize (layout responsivo) e após todas as mídias carregarem
    window.addEventListener('resize', recalcAndSnap);
    recalcAndSnap();

    initialized = true;
  }

  // Espera imagens/fontes carregarem para medir largura correta
  if (document.readyState === 'complete') {
    init();
  } else {
    window.addEventListener('load', init);
  }
})();

class ThemeManager {
    constructor() {
        if (ThemeManager.instance) {
            return ThemeManager.instance; // garante uma única instância
        }
        this.theme = "light";
        ThemeManager.instance = this;
    }

    setTheme(theme) {
        this.theme = theme;
        document.body.setAttribute("data-theme", theme);
    }

    getTheme() {
        return this.theme;
    }

    toggleTheme() {
        this.setTheme(this.theme === "light" ? "dark" : "light");
    }
}

// Uso no botão de alternância:
document.addEventListener("DOMContentLoaded", () => {
    const themeBtn = document.querySelector("#toggle-theme");
    const themeManager = new ThemeManager();

    themeBtn.addEventListener("click", () => themeManager.toggleTheme());
});

class PlanetCard {
    constructor(name, description, image) {
        this.name = name;
        this.description = description;
        this.image = image;
    }

    render() {
        const card = document.createElement("div");
        card.className = "planet-card";
        card.innerHTML = `
            <img src="${this.image}" alt="${this.name}">
            <h3>${this.name}</h3>
            <p>${this.description}</p>
        `;
        return card;
    }
}

class PlanetFactory {
    createPlanet(name, description, image) {
        return new PlanetCard(name, description, image);
    }
}

// Uso:
document.addEventListener("DOMContentLoaded", () => {
    const factory = new PlanetFactory();
    const container = document.querySelector("#planets-container");

    const planets = [
        {name: "Mercúrio", desc: "O menor planeta do sistema solar.", img: "mercurio.png"},
        {name: "Vênus", desc: "Planeta mais quente.", img: "venus.png"},
        {name: "Terra", desc: "Nosso lar azul.", img: "terra.png"},
    ];

    planets.forEach(p => {
        const planetCard = factory.createPlanet(p.name, p.desc, p.img);
        container.appendChild(planetCard.render());
    });
});

class PlanetPrototype {
    constructor(template) {
        this.template = template;
    }

    clone(name, description, image) {
        const clone = this.template.content.cloneNode(true);
        clone.querySelector(".title").textContent = name;
        clone.querySelector(".desc").textContent = description;
        clone.querySelector(".img").src = image;
        clone.querySelector(".img").alt = name;
        return clone;
    }
}

// Uso:
document.addEventListener("DOMContentLoaded", () => {
    const template = document.querySelector("#planet-template");
    const container = document.querySelector("#planets-container");
    const prototype = new PlanetPrototype(template);

    const mars = prototype.clone("Marte", "Planeta vermelho.", "marte.png");
    container.appendChild(mars);
});
