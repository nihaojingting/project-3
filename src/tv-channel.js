import { LitElement, html, css } from 'lit';

export class TvChannel extends LitElement {
  constructor() {
    super();
    this.title = '';
    this.presenter = '';
  }

  static get tag() {
    return 'tv-channel';
  }
  
  static get properties() {
    return {
      title: { type: String },
      presenter: { type: String },
    };
  }
  // CSS for Channels
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
     
    `;
  }
  // Rendering template
  render() {
    return html`
      <div class="course-topic">
        <h3>${this.title}</h3>
        <h4>${this.presenter}</h4>
        <slot></slot>
      </div>  
      
      `;
  }
}