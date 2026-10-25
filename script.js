const notesContainer = document.getElementById('notesContainer');
const openModalBtn = document.getElementById('openModalBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const saveNoteBtn = document.getElementById('saveNoteBtn');
const noteModal = document.getElementById('noteModal');
const dashboardTitle = document.getElementById('dashboardTitle');
const navButtons = document.querySelectorAll('.nav-btn');

let currentFilter = "All";

// LocalStorage-l irundhu notes eduthukkarathu, illena default sample note
let notes = JSON.parse(localStorage.getItem('dashboardNotes')) || [
    {
        category: "Study",
        id: "101",
        priority: "High",
        title: "DOM",
        desc: "I need to practice DOM events and understand how JavaScript interacts with HTML elements."
    }
];

// Open Modal
openModalBtn.addEventListener('click', () => {
    noteModal.style.display = 'flex';
});

// Close Modal
closeModalBtn.addEventListener('click', () => {
    noteModal.style.display = 'none';
});

// Save Note
saveNoteBtn.addEventListener('click', () => {
    const id = document.getElementById('noteId').value.trim();
    const title = document.getElementById('noteTitle').value.trim();
    const desc = document.getElementById('noteDesc').value.trim();
    const priority = document.getElementById('notePriority').value;
    const category = document.getElementById('noteCategory').value;

    if (id && title && desc) {
        const newNote = { id, title, desc, priority, category };
        notes.push(newNote);
        localStorage.setItem('dashboardNotes', JSON.stringify(notes));
        
        noteModal.style.display = 'none';
        renderNotes(currentFilter);
        
        // Clear inputs
        document.getElementById('noteId').value = '';
        document.getElementById('noteTitle').value = '';
        document.getElementById('noteDesc').value = '';
    } else {
        alert("Ellaa fields-aiyum fill pannunga!");
    }
});

// Sidebar Category Filtering
navButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        navButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        currentFilter = btn.getAttribute('data-category');
        dashboardTitle.textContent = `Note List - 📁 ${currentFilter}`;
        renderNotes(currentFilter);
    });
});

// Render Notes based on filter
function renderNotes(filter) {
    notesContainer.innerHTML = "";
    
    let filteredNotes = filter === "All" ? notes : notes.filter(n => n.category === filter);

    if (filteredNotes.length === 0) {
        notesContainer.innerHTML = `<p style="color: #aaa;">No notes found in ${filter}.</p>`;
        return;
    }

    filteredNotes.forEach((note, index) => {
        let card = document.createElement('div');
        card.className = 'note-card';
        card.innerHTML = `
            <div class="card-header">
                <span>${note.category}</span>
                <span>ID:${note.id}</span>
                <span class="priority-high">${note.priority}</span>
            </div>
            <h3>${note.title}</h3>
            <p>${note.desc}</p>
            <div class="card-footer">
                <span>View</span>
                <span onclick="deleteNote(${index})" style="color:red; cursor:pointer;">Delete</span>
            </div>
        `;
        notesContainer.appendChild(card);
    });
}

// Delete Note function
function deleteNote(index) {
    notes.splice(index, 1);
    localStorage.setItem('dashboardNotes', JSON.stringify(notes));
    renderNotes(currentFilter);
}

// Initial render
renderNotes("All");