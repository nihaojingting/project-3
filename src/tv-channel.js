import { LitElement, html, css } from 'lit';

export class TvChannel extends LitElement {
  static count = 0; // Static counter to keep track of instance numbers

  constructor() {
    super();
    this.title = '';
    this.presenter = '';
    this.number = TvChannel.count++; // Assign a sequential number to each instance
  }

  static get tag() {
    return 'tv-channel';
  }

  static get properties() {
    return {
      title: { type: String },
      presenter: { type: String },
      number: { type: Number }, // New property for the numbering
    };
  }

  static get styles() {
    return css`
      :host {
        display: block;
        box-sizing: border-box;
        margin-bottom: 16px;
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
        position: relative; /* Adjusted for positioning the circle */
        overflow: hidden;
      }

      .number-circle {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background-color: blue;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.75em; /* Adjust font size as needed */
        position: absolute;
        left: 8px; /* Adjust left as needed */
        top: 50%;
        transform: translateY(-50%); /* Center vertically */
      }

      h3, h4 {
        margin: 0;
        margin-left: 36px; /* Adjust left margin to make space for the number */
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: smaller;
        flex-shrink: 1;
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
