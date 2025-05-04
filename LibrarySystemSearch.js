const customAlert = document.getElementById('customAlert');
const confirmBtn = document.getElementById('confirm');
const goToList = document.getElementById('GoToList');
let searchInput = document.getElementById('searchInput');

function search(value) {
    const booksJSON = localStorage.getItem('books');
    if (!booksJSON) {
        console.log("empty");
        return;
    }
    const books = JSON.parse(booksJSON);
    let found = false;

    for (let i = 0; i < books.length; i++) {
        const bookTitle = books[i].name.toLowerCase();
        if (bookTitle.includes(value.toLowerCase())) {
            document.getElementById('text').innerHTML = `
                <strong> ${books[i].name}</strong> is Found ,please check the booklist <br>
            `;
            goToList.style.display = 'inline-block';
            showCustomAlert();
            found = true;
            break;
        }
    }

    if (!found) {
        document.getElementById('text').innerHTML = ' Sorry, the book is not in stock :(';
        goToList.style.display = 'none';
        showCustomAlert();
    }
    searchInput.value = '';
}
function showCustomAlert() {
    customAlert.style.display = 'flex';
}

confirmBtn.addEventListener('click', () => {
    customAlert.style.display = 'none';
});

goToList.addEventListener('click', () => {
    window.open('book_list.html');
});

searchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        search(searchInput.value);
    }
});