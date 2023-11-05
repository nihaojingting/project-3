import { LitElement, html, css } from 'lit';

export class TvChannel extends LitElement {
  static count = 1; // Start the count at 1

  constructor() {
    super();
    this.title = '';
    this.presenter = '';
    this.number = TvChannel.count++; // Assign a number to each instance
  }

  static get tag() {
    return 'tv-channel';
  }

  static get properties() {
    return {
      title: { type: String },
      presenter: { type: String },
      number: { type: Number },
    };
  }

  static get styles() {
    return css`
      :host {
        display: block;
        box-sizing: border-box;
        margin-bottom: 16px;
        padding-left: 24px; /* Adjust padding to accommodate the number */
        position: relative; /* Needed to position the number correctly */
      }

      .wrapper {
        display: flex;
        align-items: center;
        justify-content: start;
        padding: 4px;
        background-color: #eeeeee;
        width: 210px;
        height: 48px;
        box-sizing: border-box;
        overflow: hidden;
      }

      h3, h4 {
        margin: 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: smaller;
        flex-shrink: 1;
      }

      .number-circle {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: blue;
        color: white;
        text-align: center;
        line-height: 20px; /* Aligns text vertically */
        position: absolute;
        left: 0; /* Align to the left side */
        top: 50%;
        transform: translateY(-50%); /* Center vertically */
      }
    `;
  }

  render() {
    return html`
      <div class="wrapper">
        <div class="number-circle">${this.number}</div>
        <h3>${this.title}</h3>
        <h4>${this.presenter}</h4>
      </div>
    `;
  }
}

customElements.define(TvChannel.tag, TvChannel);
