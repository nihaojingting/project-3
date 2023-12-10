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
    return [
      css`
        :host {
          display: block;
          margin: 16px;
          padding: 16px;
        }

        .container {
          display: flex;
          justify-content: space-between;
        }

        .course-topics {
          text-align: left;
          padding: 10px;
          margin-right: 1px;
          display: flex;
          flex-direction: column;
          flex-wrap: wrap;
          justify-content: flex-start;
          width: auto;
          margin-bottom: 10px;
          border: 1px solid black;
        }

        .content-box {
          font-size: 1.3em;
          border: 1px solid black;
          width: 100%;
          margin-bottom: 10px;
          position: relative;
        }

        .active-page {
          height: 10%;
          outline: 1px solid black;
        }

        .prev-page {
          height: 50px;
          width: 90px;
          outline: 1px solid black;
          position: absolute;
          bottom: 10px;
          left: 5px;
        }

        .next-page {
          height: 50px;
          width: 90px;
          outline: 1px solid black;
          position: absolute;
          bottom: 10px;
          right: 10px;
        }
      `,
    ];
  }

  render() {
    return html`
      <div class="container">
        <div class="course-topics">
          ${this.contents.map(
            (content, index) => html`
              <button @click="${() => this.handleCourseClick(index)}">
                ${content.title || `Topic ${index + 1}`}
              </button>
            `
          )}
        </div>
        <div class="content-box">
          ${unsafeHTML(this.contents[this.currentPage].htmlContent)}
        </div>
        <div class="prev-page" @click="${this.handlePrevPageClick}">Previous Page</div>
        <div class="next-page" @click="${this.handleNextPageClick}">Next Page</div>
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
    this.requestUpdate(); // Request an update to re-render the component
  }

  handlePrevPageClick() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.requestUpdate(); // Request an update to re-render the component
    }
  }

  handleNextPageClick() {
    if (this.currentPage < this.contents.length - 1) {
      this.currentPage++;
      this.requestUpdate(); // Request an update to re-render the component
    }
  }
}


customElements.define(TvApp.tag, TvApp);