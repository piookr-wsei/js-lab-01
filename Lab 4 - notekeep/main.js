document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("noteForm");
  const notesContainer = document.getElementById("notesContainer");
  const searchInput = document.getElementById("search");

  const loadNotes = (filter = "") => {
      const notes = JSON.parse(localStorage.getItem("notes") || "[]");
      notesContainer.innerHTML = "";
      notes
      .filter(note => {
          if (!filter) return true;
          const regex = new RegExp(filter, 'i');
          const tags = note.tags || [];
          return regex.test(note.title) || regex.test(note.description) || tags.some(tag => regex.test(tag));
      })
      .sort((a, b) => b.pin - a.pin)
      .forEach(note => {
          const noteElement = document.createElement("div");
          noteElement.className = `note ${note.pin ? "pinned" : ""}`;
          noteElement.style.backgroundColor = note.color;
          noteElement.innerHTML = `
              <h3>${note.title}</h3>
              <p>${note.description}</p>
              <p>Tags: ${note.tags ? note.tags.join(', ') : ''}</p>
              <small>${new Date(note.date).toLocaleString()}</small>
              <button class="note-button" onclick="deleteNote('${note.id}')">Delete</button>
              <button class="note-button" onclick="editNote('${note.id}')">Edit</button>
              <button class="note-button" onclick="togglePin('${note.id}')">Toggle Pin</button>
          `;
          notesContainer.appendChild(noteElement);
      });
  };

  const saveNote = (note) => {
      const notes = JSON.parse(localStorage.getItem("notes") || "[]");
      // Assign a unique ID if the note doesn't have one (new note)
      note.id = note.id || new Date().getTime().toString();
      notes.push(note);
      localStorage.setItem("notes", JSON.stringify(notes));
      loadNotes();
  };

  form.addEventListener("submit", (e) => {
      e.preventDefault();
      const title = document.getElementById("title").value;
      const description = document.getElementById("description").value;
      const tags = document.getElementById("tags").value.split(',').map(tag => tag.trim()).filter(tag => tag);
      const color = document.getElementById("color").value;
      const pin = document.getElementById("pin").checked;
      const note = { title, description, tags, color, date: new Date().toISOString(), pin };
      saveNote(note);
      form.reset();
  });

  window.deleteNote = (id) => {
      let notes = JSON.parse(localStorage.getItem("notes") || "[]");
      notes = notes.filter(note => note.id !== id);
      localStorage.setItem("notes", JSON.stringify(notes));
      loadNotes();
  };

  window.editNote = (id) => {
      const notes = JSON.parse(localStorage.getItem("notes") || "[]");
      const note = notes.find(note => note.id === id);
      if (!note) return; // Early exit if note not found
      document.getElementById("title").value = note.title;
      document.getElementById("description").value = note.description;
      document.getElementById("tags").value = note.tags.join(', ');
      document.getElementById("color").value = note.color;
      document.getElementById("pin").checked = note.pin;
      // Remove the note being edited from storage to avoid duplicates
      deleteNote(id);
  };

  window.togglePin = (id) => {
      const notes = JSON.parse(localStorage.getItem("notes") || "[]");
      const noteIndex = notes.findIndex(note => note.id === id);
      if (noteIndex > -1) {
          notes[noteIndex].pin = !notes[noteIndex].pin;
          localStorage.setItem("notes", JSON.stringify(notes));
          loadNotes();
      }
  };

  searchInput.addEventListener("input", () => {
      loadNotes(searchInput.value.trim());
  });

  loadNotes();
});