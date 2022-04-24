const searchBook = document.getElementById('searchSubmit');

searchBook.addEventListener('click', function (event) {
    event.preventDefault();

    const searchBookByTitle = document.getElementById('searchBookTitle').value.toLowerCase();
    const books = document.querySelectorAll('article');

    for (book of books) {
        const title = book.firstElementChild.textContent.toLowerCase();

        if (title.indexOf(searchBookByTitle) > -1) {
            book.style.display = 'block';
        } else {
            book.style.display = 'none';
        }
    }
});