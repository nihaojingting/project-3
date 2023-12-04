import { LitElement, html, css } from 'lit';
import '@shoelace-style/shoelace/dist/components/dialog/dialog.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import "./tv-channel.js";

export class TvApp extends LitElement {
  constructor() {
    super();
    this.name = '';
    this.source = new URL('../assets/channels.json', import.meta.url).href;
    this.listings = [];
    this.currentPage = 0;
    this.contents = Array(9).fill('');
  }

  connectedCallback() {
    super.connectedCallback();
    this.contents.forEach((_, index) => {
      this.loadContent(index);
    });
  }

  static get tag() {
    return 'tv-app';
  }

  static get properties() {
    return {
      name: { type: String },
      source: { type: String },
      listings: { type: Array },
      currentPage: { type: Number },
      contents: { type: Array },
    };
  }

  static get styles() {
    return [
      css`
        :host {
          display: block;
          margin: 16px;
          max-width: 800px;
          box-sizing: border-box;
        }

        .channels-container {
          display: inline-block;
          border: 2px solid black;
          box-sizing: border-box;
          padding: 16px;
        }

        h2 {
          padding: 16px;
          margin: 0;
          background-color: #eee;
        }

        tv-channel {
          display: block;
          padding: 16px;
          border-bottom: 1px solid #ddd;
          margin: 0;
        }

        tv-channel:last-of-type {
          border-bottom: none;
        }

        .prev-page, .next-page {
          height: 80px;
          width: 100px;
          outline: 2px solid black;
          position: absolute;
          bottom: 10px;
        }
        .prev-page { left: 5px; }
        .next-page { right: 10px; }
      `
    ];
  }

  render() {
    return html`
      <div class="channels-container">
        <h2>${this.name}</h2>
        ${this.listings.map(
          (item) => html`
            <tv-channel 
              title="${item.title}"
              presenter="${item.metadata.author}"
              @click="${this.itemClick}"
            ></tv-channel>
          `
        )}
        <div class="prev-page" @click="${this.handlePrevPageClick}">Previous Page</div>
        <div class="next-page" @click="${this.handleNextPageClick}">Next Page</div>
      </div>
      <div>
        <!-- video -->
        <!-- discord / chat - optional -->
      </div>
    `;
  }

  itemClick(e) {
    console.log(e.target);
    const dialog = this.shadowRoot.querySelector('.dialog');
    dialog.show();
  }

  updated(changedProperties) {
    if (super.updated) {
      super.updated(changedProperties);
    }
    changedProperties.forEach((oldValue, propName) => {
      if (propName === "source" && this[propName]) {
        this.updateSourceData(this[propName]);
      }
    });
  }

  async updateSourceData(source) {
    await fetch(source).then((resp) => resp.ok ? resp.json() : []).then((responseData) => {
      if (responseData.status === 200 && responseData.data.items && responseData.data.items.length > 0) {
        this.listings = [...responseData.data.items];
      }
    });
  }

  handlePrevPageClick() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.requestUpdate();
    }
  }

  handleNextPageClick() {
    if (this.currentPage < this.contents.length - 1) {
      this.currentPage++;
      this.requestUpdate();
    }
  }

  async loadContent(index) {
    // Implementation for loading content (similar to your first code sample)
  }
}

customElements.define(TvApp.tag, TvApp);
