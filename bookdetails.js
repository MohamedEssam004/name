window.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const bookId = params.get("id");
    if (!bookId) return;

    const books = JSON.parse(localStorage.getItem("books") || "[]");
    const book = books.find(b => b.id === bookId);
    if (!book) return;

    document.getElementById("book-cover").src = book.image;
    document.getElementById("book-title").textContent =   book.name;
    document.getElementById("book-author").textContent = "Author: " +book.author;
    document.getElementById("book-summary").textContent = "Description: " + book.description;
    document.getElementById("book-genre").textContent = "Category: " +  book.category;
});
