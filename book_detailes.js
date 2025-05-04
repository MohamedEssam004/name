document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    const borrowBtn = document.getElementById('borrowBtn');
    const statusEl  = document.getElementById('status');
    const bookTitle = document.getElementById('book-title').innerText.trim();
    const borrowed  = JSON.parse(localStorage.getItem('borrowedBooks') || '[]');

    if (borrowed.includes(bookTitle)) {
      statusEl.innerText = 'Un-Available';
      statusEl.classList.replace('available','unavailable');
      borrowBtn.disabled = true;
    }

    borrowBtn.addEventListener('click', () => {
      if (statusEl.innerText === 'Available') {
        if (!window.confirm(`Are you sure you want to borrow "${bookTitle}"?`)) return;
        statusEl.innerText = 'Un-Available';
        statusEl.classList.replace('available','unavailable');
        borrowBtn.disabled = true;
        if (!borrowed.includes(bookTitle)) {
          borrowed.push(bookTitle);
          localStorage.setItem('borrowedBooks', JSON.stringify(borrowed));
        }
      }
    });
  }, 0);
});
