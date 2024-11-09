class AddNoteButton extends HTMLElement {
    constructor() {
      super();
  
      // Tambahkan event listener ketika tombol diklik
      this.addEventListener('click', this.handleClick.bind(this));
    }
  
    connectedCallback() {
      // Ketika elemen ditambahkan ke DOM, lakukan sesuatu di sini
      this.render();
    }
  
    render() {
      this.innerHTML = `
        <button type="button">Tambah Catatan</button>
      `;
    }
  
    handleClick() {
      // Memeriksa apakah form sudah diisi sebelum menambahkan catatan
      const titleInput = document.getElementById('title');
      const bodyInput = document.getElementById('body');
      const titleValue = titleInput.value.trim();
      const bodyValue = bodyInput.value.trim();
  
      if (titleValue === '' || bodyValue === '') {
          alert('Harap isi semua kolom sebelum menambahkan catatan.');
          return;
      }
  
      // Menambahkan catatan ke dalam DOM
      const noteList = document.querySelector('note-list');
      const newNote = {
        id: 'notes-' + Math.random().toString(36).substr(2, 9), // Generate random ID
        title: titleValue,
        body: bodyValue,
        createdAt: new Date().toISOString(),
        archived: false,
      };
      const noteItem = document.createElement('custom-note-item');
      noteItem.setAttribute('title', newNote.title);
      noteItem.setAttribute('body', newNote.body);
      noteList.appendChild(noteItem);
  
      // Reset form input values
      titleInput.value = '';
      bodyInput.value = '';
    }
  }
  
  customElements.define('add-note-button', AddNoteButton);
  