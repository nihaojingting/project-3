import { LitElement, html, css } from 'lit';

export class TvChannel extends LitElement {
  constructor() {
    super();
    this.title = '';
    this.presenter = '';
    this.videoUrl = ''; // New property for video URL
  }

  static get tag() {
    return 'tv-channel';
  }
  
  static get properties() {
    return {
      title: { type: String },
      presenter: { type: String },
      videoUrl: { type: String }, // Declare the new property
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

      video {
        width: 100%; /* Make video responsive */
        height: auto;
        border-radius: 8px; /* Align with the style of the course topic */
        background-color: black;
      }
    `;
  }

  // Rendering template with video player
  render() {
    return html`
      <div class="course-topic">
        <h3>${this.title}</h3>
        <h4>${this.presenter}</h4>
        <video controls>
          <source src="${this.videoUrl}" type="video/mp4">
          Your browser does not support the video tag.
        </video>
        <slot></slot>
      </div>
    `;
  }
}

customElements.define(TvChannel.tag, TvChannel);
