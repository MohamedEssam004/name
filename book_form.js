document.getElementById("book-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const newId = document.getElementById("book_id").value.trim();
  const name = document.getElementById("name").value.trim();
  const author = document.getElementById("author").value.trim();
  const category = document.getElementById("category").value;
  const description = document.getElementById("description").value.trim();
  const imageInput = document.getElementById("book-image");

  if (!newId || !name || !author || !category || !description) {
    alert("Please fill in all fields");
    return;
  }

  const books = JSON.parse(localStorage.getItem("books") || "[]");
  const oldId = localStorage.getItem("editBookId");
  const oldIndex = books.findIndex(b => b.id === oldId);

  function saveBook(imageData) {
    if (oldId && oldIndex >= 0) {
      books.splice(oldIndex, 1);
    }

    const bookData = {
      id: newId,
      name,
      author,
      category,
      description,
      image: imageData || (oldIndex >= 0 ? books[oldIndex].image : "")
    };

    books.push(bookData);

    localStorage.setItem("books", JSON.stringify(books));
    localStorage.removeItem("editBookId");

    window.location.href = "book_list.html";
  }

  if (imageInput.files.length) {
    const reader = new FileReader();
    reader.onload = function () {
      saveBook(reader.result);
    };
    reader.readAsDataURL(imageInput.files[0]);
  } else {
    saveBook();
  }
});

window.addEventListener("DOMContentLoaded", () => {
  const editId = localStorage.getItem("editBookId");
  if (editId) {
    const books = JSON.parse(localStorage.getItem("books") || "[]");
    const book = books.find(b => b.id === editId);
    if (book) {
      document.getElementById("book_id").value = book.id;
      document.getElementById("book_id").readOnly = true;
      document.getElementById("name").value = book.name;
      document.getElementById("author").value = book.author;
      document.getElementById("category").value = book.category;
      document.getElementById("description").value = book.description;
    }
  }
});

const editBtn = document.querySelector('input[value="Edit"]');
const selectElement = document.getElementById('book-select');

editBtn.addEventListener("click", function (e) {
  e.preventDefault();

  const books = JSON.parse(localStorage.getItem("books") || "[]");

  if (books.length === 0) {
    alert("No books to edit!");
    return;
  }

  selectElement.style.display = "block";
  selectElement.innerHTML = '<option value="">-- Select a Book --</option>';

  books.forEach(book => {
    const option = document.createElement("option");
    option.value = book.id;
    option.textContent = `${book.name} by ${book.author}`;
    selectElement.appendChild(option);
  });
});
const deleteBtn = document.querySelector('input[value="Delete"]');

deleteBtn.addEventListener("click", function (e) {
  e.preventDefault();

  const books = JSON.parse(localStorage.getItem("books") || "[]");

  if (books.length === 0) {
    alert("No books to delete!");
    return;
  }

  selectElement.style.display = "block";
  selectElement.innerHTML = '<option value="">-- Select a Book to Delete --</option>';

  books.forEach(book => {
    const option = document.createElement("option");
    option.value = book.id;
    option.textContent = `${book.name} by ${book.author}`;
    selectElement.appendChild(option);
  });

  selectElement.setAttribute("data-mode", "delete");
});

selectElement.addEventListener("change", function () {
  const selectedId = this.value;
  if (!selectedId) return;

  const mode = this.getAttribute("data-mode");
  const books = JSON.parse(localStorage.getItem("books") || "[]");
  const book = books.find(b => b.id === selectedId);

  if (!book) return;

  if (mode === "delete") {
    if (confirm(`Are you sure you want to delete "${book.name}"?`)) {
      const updatedBooks = books.filter(b => b.id !== selectedId);
      localStorage.setItem("books", JSON.stringify(updatedBooks));

      const borrowedBooks = JSON.parse(localStorage.getItem("borrowedBooks") || "[]");
      console.log("Borrowed Books before deletion:", borrowedBooks);

      const updatedBorrowedBooks = borrowedBooks.filter(b => b !== book.name);
      console.log("Borrowed Books after deletion:", updatedBorrowedBooks);

      localStorage.setItem("borrowedBooks", JSON.stringify(updatedBorrowedBooks));

      alert("Book deleted!");

      selectElement.style.display = "none";
    }
    return;
  }

  document.getElementById("book_id").value = book.id;
  document.getElementById("book_id").disabled = false;
  document.getElementById("name").value = book.name;
  document.getElementById("author").value = book.author;
  document.getElementById("category").value = book.category;
  document.getElementById("description").value = book.description;

  localStorage.setItem("editBookId", book.id);

  this.setAttribute("data-mode", "edit");
});


