function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = () => {
        return `${title} by ${author}, ${pages} pages, ${read ? "read" : "not read yet"};`;
    };
}
let myLibrary = [new Book("The Hobbit", "J.R.R. Tolkien", 295, true)];
function addBookToLibrary(library) {
    const title = prompt("Book title:", "Untitled");
    const author = prompt("Book author:", "Unknown author");
    const pages = Number(prompt("Page number:", "0"));
    const readInput = prompt("Read? (y/n)");
    const read = readInput === "y" || readInput === "Y" ? true : false;
    library.push(new Book(title, author, pages, read));
}
const libraryList = document.querySelector(".library-list");
const addBookButton = document.querySelector(".add-book-button");
function render(library) {
    // Remove all previously rendered elements from libraryList.
    while (libraryList.firstChild)
        libraryList.removeChild(libraryList.firstChild);
    library.forEach((book, bookIndex) => {
        const bookListElement = document.createElement("li");
        bookListElement.dataset.id = `${bookIndex}`;
        const titlePara = document.createElement("p");
        titlePara.textContent = `Title: ${book.title}`;
        const authorPara = document.createElement("p");
        authorPara.textContent = `Author: ${book.author}`;
        const pagesPara = document.createElement("p");
        pagesPara.textContent = `${book.pages} pages`;
        const readPara = document.createElement("p");
        readPara.textContent = `${book.read ? "Read" : "Not read yet"}`;
        const readButton = document.createElement("button");
        readButton.textContent = `Mark as ${book.read ? "unread" : "read"}`;
        readButton.addEventListener("click", () => {
            if (book.read) {
                book.read = false;
            }
            else {
                book.read = true;
            }
            render(library);
        });
        const removeButton = document.createElement("button");
        removeButton.textContent = "❌";
        removeButton.addEventListener("click", () => {
            library.splice(Number(bookListElement.dataset.id), 1);
            render(library);
        });
        bookListElement.appendChild(titlePara);
        bookListElement.appendChild(authorPara);
        bookListElement.appendChild(pagesPara);
        bookListElement.appendChild(readPara);
        bookListElement.appendChild(readButton);
        bookListElement.appendChild(removeButton);
        libraryList.appendChild(bookListElement);
    });
}
addBookButton.addEventListener("click", () => {
    addBookToLibrary(myLibrary);
    render(myLibrary);
});
render(myLibrary);
// Feature detect localStorage availability (takes in either 'localStorage' or 'sessionStorage').
function localStorageAvailable(type) {
    let storage;
    try {
        storage = window[type];
        let x = "__storage_test__";
        storage.setItem(x, x);
        storage.removeItem(x);
        console.log(`${type} is available in the current browser session.`);
        return true;
    }
    catch (e) {
        return (e instanceof DOMException &&
            // everything except Firefox
            (e.code === 22 ||
                // Firefox
                e.code === 1014 ||
                // test name field too, because code might not be present
                // everything except Firefox
                e.name === "QuotaExceededError" ||
                // Firefox
                e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
            // acknowledge QuotaExceededError only if there's something already stored
            storage &&
            storage.length !== 0);
    }
}
