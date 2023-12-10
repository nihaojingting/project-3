import { LitElement, html, css } from 'lit';
import '@shoelace-style/shoelace/dist/components/dialog/dialog.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import "./tv-channel.js";
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

export class TvApp extends LitElement {

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
      name: { type: String },
      source: { type: String },
      listings: { type: Array },
      selectedCourse: { type: Object },
      currentPage: { type: Number },
      contents: { type: Array },
    };
  }

  static get styles() {
    return css`
      :host {
        display: block;
        margin: 16px;
        padding: 16px;
      }

      .container {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
      }

      .course-topics {
        flex: 1 1 auto;
        display: flex;
        flex-direction: column;
        margin-right: 20px;
        position: relative; /* Establishing a positioning context for absolute children */
      }

      .content-box {
        flex: 3 1 60%;
        font-size: 1.3em;
        border: 1px solid black;
        margin-bottom: 10px;
        position: relative; /* New relative positioning context for next-page */
      }

      .button {
        padding: 10px 20px;
        border: none;
        background-color: #ffffff;
        color: #000;
        text-align: left;
        border-radius: 20px;
        cursor: pointer;
        box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        font-weight: bold;
        font-size: 1em;
        display: flex;
        align-items: center;
        transition: background-color 0.3s, box-shadow 0.3s;
        outline: none;
        margin-bottom: 10px;
        width: calc(100% - 40px); /* Adjusted for padding */
        box-sizing: border-box;
      }

      .button:hover {
        background-color: #e8e8e8;
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
      }

      .button:active {
        background-color: #dcdcdc;
      }

      .button__icon {
        display: inline-block;
        padding: 10px; /* Ensures a perfect circle */
        background-color: #0078d4;
        border-radius: 50%;
        color: white;
        text-align: center;
        line-height: 1; /* Ensures vertical centering */
        margin-right: 15px;
        font-size: 16px;
      }

      .button__text {
        flex-grow: 1;
      }

      .prev-page, .next-page {
        position: absolute;
        bottom: 16px; /* Adjust as needed for exact positioning */
        padding: 10px 20px;
      }

      .prev-page {
        left: 16px; /* Position at the bottom-left of course-topics */
      }

      .next-page {
        right: 16px; /* Position at the bottom-right of content-box */
      }

      /* Apply the button styles to your topic buttons as well */
      .course-topics button {
        text-align: left;
        justify-content: start;
      }
    `;
  }

  render() {
    return html`
      <div class="container">
        <div class="course-topics">
          ${this.contents.map(
            (content, index) => html`
              <button class="button" @click="${() => this.handleCourseClick(index)}">
                <span class="button__icon">${index + 1}</span>
                <span class="button__text">${content.title || `Topic ${index + 1}`}</span>
              </button>
            `
          )}
          <div class="prev-page button" @click="${this.handlePrevPageClick}">
            <span class="button__icon">←</span>
            <span class="button__text">Previous Page</span>
          </div>
        </div>
        <div class="content-box">
          ${unsafeHTML(this.contents[this.currentPage].htmlContent)}
          <div class="next-page button" @click="${this.handleNextPageClick}">
            <span class="button__icon">→</span>
            <span class="button__text">Next Page</span>
          </div>
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
