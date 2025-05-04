function renderBookList(books) {
    const sections = document.querySelectorAll(".category-section");
  
    sections.forEach(section => {
      const category = section.querySelector("summary").textContent;
      const container = section.querySelector(".book-list");
      container.innerHTML = "";
  
      const filtered = books.filter(b => b.category.toLowerCase() === category.toLowerCase());
      if (filtered.length) {
        filtered.forEach((book, index) => {
          const p = document.createElement("p");
          const link = document.createElement("a");
          link.href = `bookdetails.html?id=${book.id}`;
          link.textContent = `${index + 1}- ${book.name}`;
          p.appendChild(link);
          container.appendChild(p);
        });
      } else {
        container.innerHTML = `<p>There are no books in this category </p>`;
      }
    });
  }
  
  window.addEventListener("DOMContentLoaded", () => {
    const books = JSON.parse(localStorage.getItem("books") || "[]");
    renderBookList(books);
  
    document.getElementById("filterForm").addEventListener("submit", function (e) {
      e.preventDefault();
      const title = document.getElementById("title").value.toLowerCase();
      const author = document.getElementById("author").value.toLowerCase();
      const category = document.getElementById("categoryFilter").value.toLowerCase();
  
      const filtered = books.filter(b => {
        return (
          (!title || b.name.toLowerCase().includes(title)) &&
          (!author || b.author.toLowerCase().includes(author)) &&
          (!category || b.category.toLowerCase() === category)
        );
      });
  
      renderBookList(filtered);
    });
  });
  