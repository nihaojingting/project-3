import { LitElement, html, css } from 'lit';

export class TvChannel extends LitElement {
  constructor() {
    super();
    this.title = '';
    this.presenter = '';
    this.videoUrl = ''; // URL for YouTube video embed
  }

  static get tag() {
    return 'tv-channel';
  }
  
  static get properties() {
    return {
      title: { type: String },
      presenter: { type: String },
      videoUrl: { type: String }, // Declare the property for video URL
    };
  }
  
  // CSS for Channels (existing styles)
  static get styles() {
    return css`
      :host {
        display: inline-flex;
      }

      .course-topic {
        display: flex;
        flex-direction: column;
        padding: 8px;
        background-color: #d3d3d3;
        margin-bottom: 10px;
        line-height: 19px;
        border-radius: 8px;
        font-size: 1.5vw;
        max-width: 200px;
        width: auto;
      }
        
      h3, h4 {
        margin: 10px;
        margin-left: 5px;
        text-align: center;
      }

      iframe {
        width: 100%; /* Stretch the iframe to fit the content box */
        height: auto; /* Adjust height automatically */
        border-radius: 8px; /* Align with the style of the course topic */
      }
    `;
  }

  // Rendering template with YouTube video iframe
  render() {
    return html`
      <div class="course-topic">
        <h3>${this.title}</h3>
        <h4>${this.presenter}</h4>
        <iframe
          src="${this.videoUrl}"
          frameborder="0"
          allowfullscreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture">
        </iframe>
        <slot></slot>
      </div>
    `;
  }
}

customElements.define(TvChannel.tag, TvChannel);
