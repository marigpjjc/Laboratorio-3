import './components/dogCard';
import { getAllBreeds } from './services/getDataService';

class AppContainer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  async connectedCallback() {
    const breeds = await getAllBreeds();
    this.render(breeds);
  }

  render(breeds: any[]) {
    this.shadowRoot!.innerHTML = `
    <style>
        :host {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          text-align: center;
        }

        .content {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 40px 20px;
        }

        h1 {
          font-size: 3.5rem;
          font-weight: 700;
          color: #fff;
          margin-bottom: 40px;
          text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.3);
        }

        #cards-container {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 20px;
          max-width: 1300px;
        }
      </style>  
    <section>
        <h1>Dog breeds</h1>
        <div id="cards-container" style="display: flex; flex-wrap: wrap;"></div>
      </section>
    `;
    const container = this.shadowRoot!.querySelector('#cards-container')!;
    breeds.forEach(breed => {
      const card = document.createElement('dog-card') as any;
      card.data = breed;
      container.appendChild(card);
    });
  }
}

customElements.define('app-container', AppContainer);
