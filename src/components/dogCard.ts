import { getBreedImage, DogBreed } from '../services/getDataService';

class DogCard extends HTMLElement {
  breed!: DogBreed;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  set data(breed: DogBreed) {
    this.breed = breed;
    this.render();
  }

  async render() {
    const imageUrl = await getBreedImage(this.breed.id);
    this.shadowRoot!.innerHTML = `
      <style>
    * {
      box-sizing: border-box;
    }

    .card {
      background: linear-gradient(145deg, #f0f0f0, #ffffff);
      border-radius: 16px;
      box-shadow: 4px 4px 10px rgba(0,0,0,0.1);
      overflow: hidden;
      width: 260px;
      margin: 15px;
      text-align: center;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      transition: transform 0.3s, box-shadow 0.3s;
      cursor: pointer;
    }

    .card:hover {
      transform: scale(1.03);
      box-shadow: 6px 6px 14px rgba(0, 0, 0, 0.2);
    }

    img {
      width: 100%;
      height: 180px;
      object-fit: cover;
    }

    h3 {
      margin: 12px 0 6px;
      color: #333;
    }

    .details {
      display: none;
      padding: 0 16px 16px;
      color: #555;
      font-size: 14px;
    }

    .card.active .details {
      display: block;
    }

    .tag {
      background-color: #cce5ff;
      color: #004085;
      border-radius: 12px;
      padding: 4px 10px;
      display: inline-block;
      margin: 4px 4px 0;
      font-size: 12px;
    }
  </style>
      <div class="card">
        <img src="${imageUrl}" alt="${this.breed.name}" />
        <h3>${this.breed.name}</h3>
        <div class="details">
          <p><strong>Temperamento:</strong> ${this.breed.temperament}</p>
          <p><strong>Esperanza de vida:</strong> ${this.breed.life_span}</p>
        </div>
      </div>
    `;
    const card = this.shadowRoot!.querySelector('.card')!;
    card.addEventListener('click', () => {
      card.classList.toggle('active');
    });
  }
}

customElements.define('dog-card', DogCard);
