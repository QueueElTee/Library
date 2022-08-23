let myLibrary = [];

function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
};

const addBookToLibrary = (book) => {
    myLibrary.push(book)
};