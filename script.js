const library = []

function Book(title, author, pages, isRead) {
  this.id = crypto.randomUUID(); // Unique ID
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

function addBookToLibrary(title, author, pages, isRead) {
  const newBook = new Book(title, author, pages, isRead);
  library.push(newBook);
  return newBook;
}

function displayLibrary() {
  const container = document.querySelector("#library-container");
  container.innerHTML = ""; // Clear previous content

  library.forEach((book) => {
    // Create book card
    const card = document.createElement("div");
    card.classList.add("book-card");

    card.innerHTML = `
      <h3>${book.title}</h3>
      <p><strong>Author:</strong> ${book.author}</p>
      <p><strong>Pages:</strong> ${book.pages}</p>
      <p><strong>Read:</strong> ${book.isRead ? "Yes" : "No"}</p>
      <button class="toggle-btn" data-id="${book.id}">Toggle Read</button>
      <button class="remove-btn" data-id="${book.id}">Remove</button>
    `;

    container.appendChild(card);
  });
}

addBookToLibrary("1984", "George Orwell", 328, true);
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 310, false);
displayLibrary(); // 👈 Show them on the page

const newBookBtn = document.querySelector("#new-book-btn");
const bookDialog = document.querySelector("#book-dialog");
const bookForm = document.querySelector("#book-form");
const cancelBtn = document.querySelector("#cancel-btn");

newBookBtn.addEventListener("click", () => {
  bookDialog.showModal(); // Show the dialog
});

cancelBtn.addEventListener("click", () => {
  bookDialog.close(); // Close without adding
});

// Handle form submission
bookForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevents page reload

  const formData = new FormData(bookForm);
  const title = formData.get("title");
  const author = formData.get("author");
  const pages = Number(formData.get("pages"));
  const isRead = formData.get("isRead") === "on";

  addBookToLibrary(title, author, pages, isRead);
  displayLibrary();

  bookForm.reset();    // Clear form fields
  bookDialog.close();  // Close the dialog
});

