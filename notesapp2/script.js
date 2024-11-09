import './src/elements/note-list.js';
import './src/elements/add-note-button.js';
import './src/elements/note-item.js';
import './src/elements/copyright-footer.js';

const apiUrl = 'https://notes-api.dicoding.dev/v2';

const titleInput = document.getElementById('title');
const bodyInput = document.getElementById('body');
const addNoteForm = document.getElementById('addNoteForm');
const noteList = document.querySelector('note-list');
const addNoteButton = document.querySelector('add-note-button');

// Fungsi untuk menambahkan catatan baru
async function tambahCatatan(title, body) {
    try {
        const response = await fetch(`${apiUrl}/notes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: title,
                body: body
            })
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Gagal menambahkan catatan:', error);
        throw error;
    }
}

// Fungsi untuk mendapatkan dan menampilkan daftar catatan
async function tampilkanDaftarCatatan() {
    try {
        const response = await fetch(`${apiUrl}/notes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Gagal mendapatkan daftar catatan:', error);
        throw error;
    }
}

// Fungsi untuk menghapus catatan berdasarkan ID
async function hapusCatatan(noteId) {
    try {
        const response = await fetch(`${apiUrl}/notes/${noteId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Gagal menghapus catatan:', error);
        throw error;
    }
}

// Fungsi untuk menambahkan catatan ke dalam DOM
function addNoteToDOM(note) {
    const noteItem = document.createElement('custom-note-item');
    noteItem.setAttribute('title', note.title);
    noteItem.setAttribute('body', note.body);
    noteList.appendChild(noteItem);
}

// Tambahkan setiap catatan dari data dummy ke dalam DOM saat aplikasi dimulai
window.addEventListener('DOMContentLoaded', async () => {
    try {
        const daftarCatatan = await tampilkanDaftarCatatan();
        daftarCatatan.data.forEach(note => {
            addNoteToDOM(note);
        });
    } catch (error) {
        console.error('Gagal mendapatkan dan menampilkan daftar catatan:', error);
    }
});

// Event listener untuk menambahkan catatan baru saat formulir dikirim
addNoteForm.addEventListener('submit', async function(event) {
    event.preventDefault();

    const titleValue = titleInput.value.trim();
    const bodyValue = bodyInput.value.trim();

    if (titleValue === '' || bodyValue === '') {
        alert('Harap isi semua kolom sebelum menambahkan catatan.');
        return;
    }

    try {
        const newNote = await tambahCatatan(titleValue, bodyValue);
        addNoteToDOM(newNote.data);
    } catch (error) {
        console.error('Gagal menambahkan catatan:', error);
    }

    // Reset form input values dan kelas invalid
    titleInput.value = '';
    bodyInput.value = '';
});

// Event listener untuk menghapus catatan saat tombol hapus ditekan
noteList.addEventListener('delete-note', async (event) => {
    const noteId = event.detail.noteId;
    try {
        await hapusCatatan(noteId);
        event.target.removeNoteItem(noteId); // Hapus catatan dari DOM
    } catch (error) {
        console.error('Gagal menghapus catatan:', error);
    }
});
