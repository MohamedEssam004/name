
  document.addEventListener('DOMContentLoaded', () => {
    const borrowedBooks = JSON.parse(localStorage.getItem('borrowedBooks') || '[]');
    const allBooks = JSON.parse(localStorage.getItem('books') || '[]');
    const categoryCounts = {};
    borrowedBooks.forEach(title => {
      const book = allBooks.find(b => b.name === title);
      if (book) {
        const category = book.category || 'Unknown';
        if (categoryCounts[category]) {
          categoryCounts[category]++;
        } else {
          categoryCounts[category] = 1;
        }
      }
    });

    const rows = document.querySelectorAll('table tbody tr');
    rows.forEach(row => {
      const categoryCell = row.cells[0];
      const countCell = row.cells[1];
      const categoryName = categoryCell.textContent.trim();
      
      if (categoryCounts[categoryName]) {
        countCell.textContent = categoryCounts[categoryName];
      } else {
        countCell.textContent = 0;
      }
    });
  });
