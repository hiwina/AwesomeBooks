/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
// select the items
const form = document.querySelector('#book-form');
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const displayArea = document.querySelector('#book-list');

class Books {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }

  storeData() {
    const bookTitle = title.value;
    const bookAuthor = author.value;
    const book = new Books(bookTitle, bookAuthor);
    // Check if local storage is empty
    if (localStorage.getItem('books') === null) {
      const bookShelf = [];
      bookShelf.push(book);
      localStorage.setItem('books', JSON.stringify(bookShelf));
    } else {
      const bookShelfStr = localStorage.getItem('books');
      const bookArray = JSON.parse(bookShelfStr);
      bookArray.push(book);
      localStorage.setItem('books', JSON.stringify(bookArray));
    }
    // Clear input
    title.value = '';
    author.value = '';
    this.displayBooks();
  }

  displayBooks() {
    const wrapper = document.createElement('div');
    const line = document.createElement('hr');
    const bookShelfStr = localStorage.getItem('books');
    const tits = document.createElement('div');
    tits.innerText = this.author;
    const bookArray = JSON.parse(bookShelfStr);
    bookArray.forEach((element, index) => {
      const displayTitle = document.createElement('p');
      const displayAuth = document.createElement('p');
      const deleteBtn = document.createElement('div');
      const container = document.createElement('div');
      const words = document.createElement('div');
      // set attributes
      displayTitle.innerText = `"${element.title}" by`;
      displayAuth.innerText = element.author;
      deleteBtn.innerHTML = `<button class="btn borders removeButton" onclick='deleteItem(${index})'>Remove</button>`;
      deleteBtn.classList.add('deleteBook');
      container.classList.add('flexing', 'centers');
      words.classList.add('flexing');
      displayAuth.classList.add('word');
      // apend children
      words.appendChild(displayTitle);
      words.appendChild(displayAuth);
      container.appendChild(words);
      container.appendChild(deleteBtn);
      wrapper.appendChild(container);
    });
    line.classList.add('line');
    displayArea.appendChild(wrapper);
    displayArea.appendChild(line);
  }

  removeBook(index) {
    const bookShelfStr = localStorage.getItem('books');
    const bookArray = JSON.parse(bookShelfStr);
    bookArray.splice(index, 1);
    localStorage.setItem('books', JSON.stringify(bookArray));
    displayArea.innerHTML = '';
    this.displayBooks();
  }
}

// what happens when a person presses submit
form.addEventListener('submit', (event) => {
  event.preventDefault();
  // Check if title and author field is empty or not
  if (title.value === '' || author.value === '') {
    title.setAttribute('placeholder', 'title');
    author.setAttribute('placeholder', 'author');
  } else {
    displayArea.innerHTML = '';
    const book = new Books();
    book.storeData();
  }
});

const bigBook = new Books();
const deleteItem = (id) => {
  bigBook.removeBook(id);
};

window.addEventListener('load', bigBook.displayBooks());