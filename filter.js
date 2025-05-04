
function getBooksFromLocalStorage() {
    const storedBooks = localStorage.getItem('books');
    if (storedBooks) {
        return JSON.parse(storedBooks);
    } else{
        console.log("Books not found.");
    }
}

const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const categorySelect = document.getElementById('categoryFilter');
const filterForm = document.getElementById('filterForm');
const tbody = document.getElementById('tbody');


let allBooks = getBooksFromLocalStorage();

filterForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const titleFilter = titleInput.value.toLowerCase();
    const authorFilter = authorInput.value.toLowerCase();
    const categoryFilter = categorySelect.value;

    let filteredBooks=[];

    for (let i=0;i<allBooks.length;i++) {
        const book=allBooks[i];
        const bookTitle=book.name.toLowerCase();
        const bookAuthor=book.author.toLowerCase();
        const bookCategory=book.category;

        if(bookTitle.includes(titleFilter) && bookAuthor.includes(authorFilter)&&(categoryFilter === '' || bookCategory.toLowerCase() === categoryFilter.toLowerCase())){
            filteredBooks.push(book)
        }
    }
    showBooks(filteredBooks);
});


function showBooks(bookList) {
    tbody.innerHTML = '';

    if (bookList.length>0) {
        bookList.forEach((book, index) => {
            const row = `<tr>
            <td>${index+1}</td>
            <td>
             <a href="bookdetails.html?id=${book.id}" target="_blank" style="color: white; text-decoration: none; font-size: larger">
                ${book.name}
             </a>
            </td>
            <td>${book.author}</td>
            <td>${book.category}</td>
        </tr>`;
            tbody.innerHTML += row;
            console.log("i am working");
        });}
    else{
        alert(` Sorry,The book is not in stock`);}
    titleInput.value = '';
    authorInput.value = '';
    categorySelect.value = '';
}
