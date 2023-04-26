/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */

function setLocalStorage(bookList) {
  const updateBooks = JSON.stringify(bookList);
  localStorage.setItem('#book-form', updateBooks);
}

function getLocalStorage() {
  const existingBooks = localStorage.getItem('#book-form');
  if (existingBooks !== null) {
    return JSON.parse(existingBooks);
  }
  return [];
}
const booksList = getLocalStorage();
const bookTitle = document.querySelector('#title');
const bookAuthor = document.querySelector('#author');
const container = document.querySelector('.book-list');

function displaybooks(books) {
  container.innerHTML = '';
  for (let i = 0; i < books.length; i += 1) {
    const book = books[i];
    const maindiv = document.createElement('div');
    const h2 = document.createElement('p');
    const p = document.createElement('p');
    const removeButton = document.createElement('button');
    removeButton.addEventListener('click', () => {
      booksList.splice(i, 1);
      setLocalStorage(booksList);
      displaybooks(booksList);
    });
    const bar = document.createElement('hr');
    h2.innerHTML = book.title;
    p.innerHTML = book.author;
    removeButton.innerHTML = 'remove';
    maindiv.appendChild(h2);
    maindiv.appendChild(p);
    maindiv.appendChild(removeButton);
    maindiv.appendChild(bar);
    container.appendChild(maindiv);
  }
}
displaybooks(booksList);
const addBtn = document.querySelector('.addbtn');
addBtn.addEventListener('click', (e) => {
  e.preventDefault();
  if (bookTitle.value.trim() !== '' && bookAuthor.value.trim() !== '') {
    const list = {
      title: bookTitle.value,
      author: bookAuthor.value,
    };
    booksList.push(list);
    setLocalStorage(booksList);
    displaybooks(booksList);
  }
});