class NoteItem extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const title = this.getAttribute('title');
    const body = this.getAttribute('body');

    this.innerHTML = `
      <div class="note-item">
        <h2>${title}</h2>
        <p>${body}</p>
      </div>
    `;
  }
}

customElements.define('custom-note-item', NoteItem);
