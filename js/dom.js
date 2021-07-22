const UNCOMPLETED_BOOKSHELF_LIST_ID = 'incompleteBookshelfList';
const COMPLETED_BOOKSHELF_LIST_ID = 'completeBookshelfList';
const BOOK_ITEMID = 'bookId';

function addBook() {
    const completedBookList = document.getElementById(COMPLETED_BOOKSHELF_LIST_ID);
    const uncompletedBookList = document.getElementById(UNCOMPLETED_BOOKSHELF_LIST_ID);

    const titleBook = document.getElementById('inputBookTitle').value;
    const authorBook = document.getElementById('inputBookAuthor').value;
    const yearBook = document.getElementById('inputBookYear').value;
    const bookIsComplete = document.getElementById('inputBookIsComplete');

    const bookObject = composeBookObject(titleBook, authorBook, yearBook, false);

    if (bookIsComplete.checked === true) {
        const book = makeBook(titleBook, authorBook, yearBook, true);

        book[BOOK_ITEMID] = bookObject.id;
        books.push(bookObject);

        completedBookList.append(book);
        updateDataToStorage();

    } else {
        const book = makeBook(titleBook, authorBook, yearBook, false);

        book[BOOK_ITEMID] = bookObject.id;
        books.push(bookObject);

        uncompletedBookList.append(book)
        updateDataToStorage();
    };
}

function makeBook(data, nameauthor, year, isCompleted) {
    const textTitle = document.createElement('h3');
    textTitle.innerText = data;

    const textAuthor = document.createElement('i');
    textAuthor.innerText =  nameauthor;

    const textYear = document.createElement('p');
    textYear.innerText = year;

    const container = document.createElement('article');
    container.classList.add('book_item');

    container.append(textTitle, textAuthor, textYear);

    const action = document.createElement('div');
    action.classList.add('action');
    container.append(action);
    
    if (isCompleted) {
        action.append(
            createUncompletedButton(),
            createDeleteButton()
        );
    } else {
        action.append(
            createCompletedButton(),
            createDeleteButton()
        );
    }

    return container;
}

function createButton(buttonTypeClass, eventListener, buttonText) {
    const button = document.createElement('button');
    button.classList.add(buttonTypeClass);
    button.innerText = buttonText;

    button.addEventListener('click', function (event) {
        eventListener(event);
    });

    return button;
}

function addBookToCompleted(bookElement) {
    const bookTitle = bookElement.querySelector('.book_item > h3').innerText;
    const bookAuthor = bookElement.querySelector('.book_item > i').innerText;
    const bookYear = bookElement.querySelector('.book_item > p').innerText;

    const newBook = makeBook(bookTitle, bookAuthor, bookYear, true);
    const book = findBook(bookElement[BOOK_ITEMID]);
    const listCompleted = document.getElementById(COMPLETED_BOOKSHELF_LIST_ID);

    book.isCompleted = true;
    newBook[BOOK_ITEMID] = book.id;

    listCompleted.append(newBook)
    bookElement.remove();

    updateDataToStorage();
}

function undoBookToCompleted(bookElement) {
    const listUncompleted = document.getElementById(UNCOMPLETED_BOOKSHELF_LIST_ID);
    const bookTitle = bookElement.querySelector('.book_item > h3').innerText;
    const bookAuthor = bookElement.querySelector('.book_item > i').innerText;
    const bookYear = bookElement.querySelector('.book_item > p').innerText;

    const newBook = makeBook(bookTitle, bookAuthor, bookYear, false);
    const book = findBook(bookElement[BOOK_ITEMID]);

    book.isCompleted = false;
    newBook[BOOK_ITEMID] = book.id;

    listUncompleted.append(newBook)
    bookElement.remove();

    updateDataToStorage();
}

function removoBookFromCompleted(bookElement) {
    const bookPosition = findBookIndex(bookElement[BOOK_ITEMID]);

    books.splice(bookPosition, 1);

    bookElement.remove();
    updateDataToStorage();
}

function createCompletedButton() {
    return createButton(
        'green', 
        function (event) {
            addBookToCompleted(event.target.parentElement.parentElement);
        }, 
        'Selesai Dibaca'
    );
}

function createDeleteButton() {
    return createButton(
        'red', 
        function (event) {
            removoBookFromCompleted(event.target.parentElement.parentElement);
        }, 
        'Hapus Buku'
    );
}

function createUncompletedButton() {
    return createButton(
        'green',
        function (event) {
            undoBookToCompleted(event.target.parentElement.parentElement);
        },
        'Belum Selesai Dibaca'
    );
}