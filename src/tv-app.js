import { LitElement, html, css } from 'lit';
import '@shoelace-style/shoelace/dist/components/dialog/dialog.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import "./tv-channel.js";
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

export class TvApp extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        margin: 16px;
        padding: 16px;
      }

      .container {
        display: flex;
        align-items: center; /* Center the buttons and content vertically */
        justify-content: space-around; /* Space around to give some space between elements */
        gap: 10px; /* Introduces a gap between flex items */
      }

      .course-topics {
        flex: 1;
        margin-right: 10px; /* Space between course topics and content box */
      }

      .content-box {
        flex-grow: 1; /* Grow to use the space available */
        flex-basis: 50%; /* Start off at 50% of the container's size */
        font-size: 1.3em;
        border: 1px solid black;
        padding: 16px;
        box-sizing: border-box; /* Include padding and border in the element's total width */
      }

      .button {
        padding: 10px 20px;
        border: none;
        background-color: #ffffff;
        color: #000;
        border-radius: 20px;
        cursor: pointer;
        box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        font-weight: bold;
        font-size: 1em;
        display: flex;
        align-items: center;
        transition: background-color 0.3s, box-shadow 0.3s;
        margin-bottom: 10px; /* Space below each button */
      }

      .button:hover {
        background-color: #e8e8e8;
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
      }

      .button:active {
        background-color: #dcdcdc;
      }

      .button__icon {
        padding: 10px;
        background-color: #0078d4;
        border-radius: 50%;
        color: white;
        font-size: 16px;
      }

      .button__text {
        flex-grow: 1;
      }

      .prev-page, .next-page {
        padding: 10px 20px;
        margin: 0 10px; /* Margin to the left and right of the buttons */
        flex-shrink: 0; /* Prevent the buttons from shrinking */
      }

      @media (max-width: 768px) {
        .container {
          flex-direction: column;
        }

        .course-topics, .content-box, .prev-page, .next-page {
          width: 100%; /* Full width on smaller screens */
          margin: 10px 0; /* Margin on top and bottom */
        }
      }
    `;
  }

  constructor() {
    super();
    this.source = new URL('/assets/channels.json', import.meta.url).href;
    this.selectedCourse = null;
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
      source: { type: String },
      selectedCourse: { type: Object },
      currentPage: { type: Number },
      contents: { type: Array },
    };
  }

  render() {
    return html`
      <div class="container">
        <div class="course-topics">
          ${this.contents.map(
            (content, index) => html`
              <button class="button" @click="${() => this.handleCourseClick(index)}">
                <span class="button__icon">${index + 1}</span>
                <span class="button__text">${content.title || `Element ${index + 1}`}</span>
              </button>
            `
          )}
        </div>
        <div class="prev-page button" @click="${this.handlePrevPageClick}">
          <span class="button__icon">←</span>
          <span class="button__text">Previous Page</span>
        </div>
        <div class="content-box">
          ${unsafeHTML(this.contents[this.currentPage].htmlContent)}
        </div>
        <div class="next-page button" @click="${this.handleNextPageClick}">
          <span class="button__icon">→</span>
          <span class="button__text">Next Page</span>
        </div>
      </div>
    `;
  }

  async updateSourceData(source) {
    await fetch(source)
      .then((resp) => (resp.ok ? resp.json() : null))
      .then((responseData) => {
        if (
          responseData &&
          responseData.status === 200 &&
          responseData.data &&
          responseData.data.items &&
          responseData.data.items.length > 0
        ) {
          this.listings = [...responseData.data.items];
          this.selectedCourse = this.listings[0];
        }
      });
  }

  async loadContent(index) {
    const fileName = `/assets/element${index + 1}.html`;
    try {
      const response = await fetch(fileName);
      const htmlContent = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlContent, 'text/html');
      const title = doc.querySelector('h1')?.textContent || `Element ${index + 1}`;
      this.contents[index] = { htmlContent, title };
      this.requestUpdate();
    } catch (error) {
      console.error(error);
    }
  }

  handleCourseClick(index) {
    this.currentPage = index;
    this.requestUpdate();
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
}

customElements.define(TvApp.tag, TvApp);
