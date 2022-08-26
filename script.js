let myLibrary = [];
let booksContainer = document.querySelector('.books');
let bookCount = document.querySelector('#book-count');
let closeIcon = document.querySelector('.close i');
let bookForm = document.querySelector('#book-form');
let addIcon = document.querySelector('.add-new-book div i');
let submit = document.querySelector('#submit');

function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
};

const addBookToLibrary = (book) => {
    myLibrary.push(book)
};


let book1 = new Book('Harry Potter', 'J.K Rowling', 256, true);
let book2 = new Book('Things Fall Apart', 'Chinua Achebe', 340, false);
let book3 = new Book('The Beautiful Ones Are Not Yet Born', 'Kwei Armah', 100, true);
let book4 = new Book('The Gods Are Not To Blame', 'Ola Rotimi', 568, false);
let book5 = new Book('Salutation To The Gut', 'Wole Soyinka', 455, true);
let book6 = new Book('Purple Hibiscus', 'Chimamanda Ngozi Adichie', 95, false);
let book7 = new Book('Wuthering Heights', 'Emily Bronte', 123, true);

myLibrary.push(book1, book2, book3, book4, book5, book6, book7);

bookCount.textContent = `${myLibrary.length}`;

const displayBooks = () => {
    for(let i = myLibrary.length - 1; i >= 0; i--){
        let book = document.createElement('div');
        book.classList.add('book-card');
        let title = document.createElement('p');
        let author = document.createElement('p');
        let noOfPages = document.createElement('p');
        let read = document.createElement('p');
        let readStatus = document.createElement('div');
        let iconContainer = document.createElement('div');
        let deleteIcon = document.createElement('i');

        title.textContent = `Title: ${myLibrary[i].title}`;
        author.textContent = `Author: ${myLibrary[i].author}`;
        noOfPages.textContent = `No Of Pages: ${myLibrary[i].pages}`;
        read.textContent = `Read: ${myLibrary[i].read}`;
        readStatus.style.padding = '0.7rem';
        readStatus.style.textAlign = 'center';
        readStatus.style.cursor = 'pointer';
        deleteIcon.classList.add('fa-solid');
        deleteIcon.classList.add('fa-trash-can');
        deleteIcon.classList.add('fa-align-right');
        deleteIcon.style.color = 'red';
        deleteIcon.style.cursor = 'pointer';
        iconContainer.style.textAlign = 'right';
        iconContainer.appendChild(deleteIcon);

        if(myLibrary[i].read == true){
            readStatus.style.backgroundColor = 'green';
            readStatus.textContent = 'Read';
        } else if(myLibrary[i].read == false){
            readStatus.style.backgroundColor = 'red';
            readStatus.textContent = 'Not Read Yet';
        }
        book.append(title, author, noOfPages, readStatus, iconContainer);
        booksContainer.appendChild(book);
    }
}


const clearBooks = () => {
    let books = document.querySelectorAll('.books .book-card');
    books.forEach(book => booksContainer.removeChild(book));
}

const clearInputs = () => {
    document.querySelector('input#title').value = '';
    document.querySelector('input#author').value = '';
    document.querySelector('input#pages').value = '';
    document.querySelector('input#yes').checked = false;
    document.querySelector('input#no').checked = false;
}


addIcon.addEventListener('click', () => {
    clearInputs();
    bookForm.style.display = 'block';
});

bookForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let title = document.querySelector('input#title').value;
    let author = document.querySelector('input#author').value;
    let pages = document.querySelector('input#pages').value;
    let option = document.querySelector('input[name="options"]:checked').value;
    let read = (option == 'Yes') ? true : false;

    let book = new Book(title, author, pages, read);
    addBookToLibrary(book);
    bookForm.style.display = 'none';

    clearBooks();
    displayBooks();
    bookCount.textContent = `${myLibrary.length}`;
});

closeIcon.addEventListener('click', () => {
    clearInputs();
    bookForm.style.display = 'none';
});

displayBooks();


// TODOS
// TODO 1: Ensure that the readStatus toggle works
// TODO 2: Ensure that the delete icon works
// TODO 3: Add media queries
// TODO 4: Add local storage