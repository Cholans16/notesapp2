class CopyrightFooter extends HTMLElement {
    constructor() {
      super();
    }
  
    static get observedAttributes() {
      return ['year'];
    }
  
    connectedCallback() {
      this.render();
    }
  
    render() {
      const year = this.getAttribute('year') || new Date().getFullYear();
      this.innerHTML = `
        <footer>&copy; ${year} Kholan Sururi SIB 6 | Notes App 1.</footer>
      `;
    }
  
    attributeChangedCallback(name, oldValue, newValue) {
      if (name === 'year') {
        this.render();
      }
    }
  }
  
  customElements.define('copyright-footer', CopyrightFooter);
  