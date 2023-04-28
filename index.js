const form = document.querySelector('#book-form');
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const displayArea = document.querySelector('#book-list');
const bookList = document.querySelector('#list');
const addBook = document.querySelector('#add-new');
const contact = document.querySelector('#contact');
const addSection = document.querySelector('#adds');
const contactSection = document.querySelector('#contacts');
const header = document.querySelector('.text-center');

class Books {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }

  storeData() {
    const bookTitle = title.value;
    const bookAuthor = author.value;
    const book = new Books(bookTitle, bookAuthor);
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
      displayTitle.innerText = `"${element.title}" by`;
      displayAuth.innerText = element.author;
      deleteBtn.innerHTML = `<button class="btn borders removeButton" onclick='deleteItem(${index})'>Remove</button>`;
      deleteBtn.classList.add('deleteBook');
      container.classList.add('flexing', 'centers');
      words.classList.add('flexing');
      displayAuth.classList.add('word');
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

form.addEventListener('submit', (event) => {
  event.preventDefault();
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
// eslint-disable-next-line no-unused-vars
const deleteItem = (id) => {
  bigBook.removeBook(id);
};

function displayDate() {
  document.getElementById('date').innerHTML = Date();
}
const onload = () => {
  contactSection.style.display = 'none';
  addSection.style.display = 'none';
  displayArea.style.display = 'block';
  bookList.classList.add('active');
  contact.classList.remove('active');
  addBook.classList.remove('active');
  header.style.display = 'block';
};
window.addEventListener('load', onload);
window.addEventListener('load', displayDate);
window.addEventListener('load',bigBook.displayBooks());

bookList.addEventListener('click', onload);

addBook.addEventListener('click', () => {
  bookList.classList.remove('active');
  contact.classList.remove('active');
  contactSection.style.display = 'none';
  addSection.style.display = 'block';
  addBook.classList.add('active');
  displayArea.style.display = 'none';
  header.style.display = 'none';
});
contact.addEventListener('click', () => {
  addBook.classList.remove('active');
  bookList.classList.remove('active');
  contactSection.style.display = 'flex';
  addSection.style.display = 'none';
  displayArea.style.display = 'none';
  contact.classList.add('active');
  header.style.display = 'none';
});
