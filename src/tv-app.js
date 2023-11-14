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
  }

  static get tag() {
    return 'tv-app';
  }

  static get properties() {
    return {
      name: { type: String },
      source: { type: String },
      listings: { type: Array },
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
          display: inline-block; /* Adjusted to wrap the border tightly around the content */
          border: 2px solid black;
          box-sizing: border-box;
          padding: 16px; /* You can adjust this padding to control the spacing inside the border */
      }


        h2 {
          padding: 16px;
          margin: 0;
          background-color: #eee; /* Example background color */
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
      </div>
      <div>
        <!-- video -->
        <!-- discord / chat - optional -->
      </div>
      <!-- <sl-dialog label="Dialog" class="dialog">
        This should change the content box to be whatever heading was clicked on.
        <sl-button slot="footer" variant="primary" @click="${this.closeDialog}">Close</sl-button>
      </sl-dialog> -->
    `;
  }

  // closeDialog(e) {
  //   const dialog = this.shadowRoot.querySelector('.dialog');
  //   dialog.hide();
  // }

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
}

customElements.define(TvApp.tag, TvApp);
