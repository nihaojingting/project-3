// import stuff
import { LitElement, html, css } from 'lit';

export class TvChannel extends LitElement {
  // defaults
  constructor() {
    super();
    this.title = '';
    this.presenter = '';
  }
  // convention I enjoy using to define the tag's name
  static get tag() {
    return 'tv-channel';
  }
  // LitElement convention so we update render() when values change
  static get properties() {
    return {
      title: { type: String },
      presenter: { type: String },
    };
  }
  // LitElement convention for applying styles JUST to our element
  static get styles() {
    return css`
     :host {
            display: block; /* Changed to block to contain the flex item */
            width: 210px; /* Set the width of the host */
            height: 48px; /* Set the height of the host */
            box-sizing: border-box; /* Include padding and border in the element's total width and height */
            margin-bottom: 16px; /* Add space between the items */
        }

        .wrapper {
            display: flex; /* Use flexbox to align items */
            align-items: center; /* Center items vertically */
            justify-content: center; /* Center items horizontally */
            padding: 4px; /* Adjust padding to fit the content within 210x48 size */
            background-color: #eeeeee;
            width: 100%; /* Use the full width provided by the host */
            height: 100%; /* Use the full height provided by the host */
            box-sizing: border-box; /* Include padding and border in the element's total width and height */
        }

        h3, h4 {
            margin: 0; /* Remove default margins */
            white-space: nowrap; /* Prevent wrapping */
            overflow: hidden; /* Hide overflow */
            text-overflow: ellipsis; /* Add ellipsis for overflow text */
            font-size: smaller; /* Adjust font size to fit the container */
        }
    `;
  }
  // LitElement rendering template of your element
  render() {
    return html`
      <div class="wrapper">
        <h3>${this.title}</h3>
        <h4>${this.presenter}</h4>
        <slot></slot>
      </div>  
      `;
  }
}
// tell the browser about our tag and class it should run when it sees it
customElements.define(TvChannel.tag, TvChannel);
