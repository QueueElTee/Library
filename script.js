// The myLibaray array stores all of the book objects
let myLibrary = [];
// Parent container for the books
let booksContainer = document.querySelector('.books');
// Stores the length of the library array
let bookCount = document.querySelector('#book-count');

let closeIcon = document.querySelector('.close i');
let bookForm = document.querySelector('#book-form');
let addIcon = document.querySelector('.add-new-book div i');
let submit = document.querySelector('#submit');

// Book object constructor
function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
};

// Adds a book object to the library
const addBookToLibrary = (book) => {
    myLibrary.push(book)
};


// Manual book objects to test the script
let book1 = new Book('Harry Potter', 'J.K Rowling', 256, true);
let book2 = new Book('Things Fall Apart', 'Chinua Achebe', 340, false);
let book3 = new Book('The Beautiful Ones Are Not Yet Born', 'Kwei Armah', 100, true);
let book4 = new Book('The Gods Are Not To Blame', 'Ola Rotimi', 568, false);
let book5 = new Book('Salutation To The Gut', 'Wole Soyinka', 455, true);
let book6 = new Book('Purple Hibiscus', 'Chimamanda Ngozi Adichie', 95, false);
let book7 = new Book('Wuthering Heights', 'Emily Bronte', 123, true);

myLibrary.push(book1, book2, book3, book4, book5, book6, book7);

bookCount.textContent = `${myLibrary.length}`;

const clearBooks = () => {
    let books = document.querySelectorAll('.books .book-card');
    books.forEach(book => booksContainer.removeChild(book));
}


// Adds a data attribute that corresponds to the element's position in the array.
const setDataAttr = () => {
    let books =  document.querySelectorAll('.books .book-card');
    for(let i = 0; i < books.length; i++){
        books[i].setAttribute('data-book', `${i}`);
    }
}

// Iterates through the library array and appends each book to the 'booksContainer' DOM element
const displayBooks = () => {
    // Removes any existing book
    clearBooks();

    // Displays the book objects in the array.
    for(let i = 0; i < myLibrary.length; i++){
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
        readStatus.classList.add('read');
        deleteIcon.classList.add('fa-solid');
        deleteIcon.classList.add('fa-trash-can');
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
    setDataAttr();
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

    displayBooks();
    bookCount.textContent = `${myLibrary.length}`;
    setDataAttr();
});


closeIcon.addEventListener('click', () => {
    clearInputs();
    bookForm.style.display = 'none';
});


const deleteCard = (el) => {
    if(el.classList.contains('fa-trash-can')){
        el.parentElement.parentElement.remove();
        let bookCardIndex = el.parentNode.parentNode.getAttribute('data-book');
        myLibrary.splice(parseInt(bookCardIndex), 1);
        bookCount.textContent = `${myLibrary.length}`;
        setDataAttr();
    };
};


Book.prototype.toggleBookStatus = function(){
    let changedStatus = this.read ? false : true;
    this.read = changedStatus;
}

const toggleReadStatus = (el) => {
    if(el.classList.contains('read')){
        let bookCardIndex = el.parentNode.getAttribute('data-book');
        myLibrary[parseInt(bookCardIndex)].toggleBookStatus();
        displayBooks();
    }
}


booksContainer.addEventListener('click', (e) => {
    deleteCard(e.target);
    toggleReadStatus(e.target);
});


if(myLibrary.length > 0){
    displayBooks();
};


// TODOS
// TODO 1: Add local storage