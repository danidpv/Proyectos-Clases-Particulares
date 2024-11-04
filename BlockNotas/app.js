const addBtn = document.getElementById("add");
const trashBtn = document.getElementById("trash");
const notes = JSON.parse(localStorage.getItem("notes"));

if (notes) {
  notes.forEach((note) => addNewNote(note));
}

addBtn.addEventListener("click", () => {
  addNewNote();
});

trashBtn.addEventListener("click", trashAllNotes);

function trashAllNotes() {
  let allNotes = document.querySelectorAll(".note");
  allNotes.forEach((note) => note.remove());
  updateStorage();
}

function addNewNote(text = "") {
  const note = document.createElement("div");
  note.classList.add("note");
  note.innerHTML = `
                    <div class="tools">
                        <button class="edit">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="delete">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </div>
                    <div class="main ${text ? "" : "hidden"}"></div>
                    <textarea class="text ${text ? "hidden" : ""}"></textarea>
    `;
  const editBtn = note.querySelector(".edit");
  const deleteBtn = note.querySelector(".delete");
  const main = note.querySelector(".main");
  const textArea = note.querySelector("textarea");
  textArea.value = text;
  main.textContent = text;
  deleteBtn.addEventListener("mouseenter", (e) => {
    e.target.style.color = "yellow";
  });
  editBtn.addEventListener("mouseenter", (e) => {
    e.target.style.color = "yellow";
  });
  deleteBtn.addEventListener("mouseleave", (e) => {
    e.target.style.color = "white";
  });
  editBtn.addEventListener("mouseleave", (e) => {
    e.target.style.color = "white";
  });
  deleteBtn.addEventListener("click", () => {
    note.remove();
    updateStorage();
  });
  editBtn.addEventListener("click", () => {
    main.classList.toggle("hidden");
    textArea.classList.toggle("hidden");
  });

  textArea.addEventListener("input", (e) => {
    console.log(e.target);
    main.textContent = e.target.value;
    updateStorage();
  });

  document.body.append(note);
}

function updateStorage() {
  const textNotes = document.querySelectorAll("textarea");
  const notes = [];
  textNotes.forEach((note) => {
    if (note.value != "") {
      notes.push(note.value);
    }
  });
  localStorage.setItem("notes", JSON.stringify(notes));
}
