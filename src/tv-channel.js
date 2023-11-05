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
            display: block;
            width: 210px;
            height: 48px;
            box-sizing: border-box;
            margin-bottom: 16px;
        }

        .wrapper {
            display: flex;
            align-items: center;
            justify-content: start; /* Align content to the start to not stretch the title */
            padding: 4px;
            background-color: #eeeeee;
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            overflow: hidden; /* Ensures that all content is clipped to the element's size */
        }

        h3, h4 {
            margin: 0;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            font-size: smaller;
            flex-shrink: 1; /* Allows these elements to shrink to prevent overflow */
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
