export default class Library {
  LOCAL_STORAGE_KEY = 'books';

  collection = [];

  constructor(toastFunction, toggleVisibility) {
    this.showToast = toastFunction;
    this.toggleVisibility = toggleVisibility;
    this.collection = this.getFromLocalStorage();
    this.list = document.getElementById('books');
    this.addButton = document.getElementById('add');
    this.addButton.addEventListener('click', () => {
      this.addNewBook();
      this.saveToLocalStorage();
      this.render();
    });
  }

  getFromLocalStorage() {
    const cachedBooks = window.localStorage.getItem(this.LOCAL_STORAGE_KEY);
    return cachedBooks ? JSON.parse(cachedBooks) : [];
  }

  saveToLocalStorage() {
    window.localStorage.setItem(
      this.LOCAL_STORAGE_KEY,
      JSON.stringify(this.collection)
    );
  }

  deleteBook(i) {
    this.collection = this.collection.filter((book, ind) => i !== ind);
  }

  addNewBook() {
    const title = document.getElementById('newTitle');
    const author = document.getElementById('newAuthor');
    if (!title.value || !author.value) {
      this.showToast('Title and Author are required', null, 'OK');
    } else {
      this.collection.push({ title: title.value, author: author.value });
      title.value = '';
      author.value = '';
      title.focus();
      this.showToast('Book was added successfully', () =>
        this.toggleVisibility('collection')
      );
    }
  }

  render() {
    if (this.collection.length > 0) {
      this.list.innerHTML = this.collection
        .map(
          (book) => `<li class="bookRow">
        <article>
        <p id="title">"${book.title}" by ${book.author}</p>
        <button class="remove">Remove</button>
        </article>
        </li>`
        )
        .join('');
    } else {
      this.list.innerHTML = this.collection;
      const listItem = document.createElement('li');
      const text = document.createElement('p');
      const button = document.createElement('button');
      const article = document.createElement('article');
      listItem.className = 'bookRow';
      button.textContent = 'Add Book';
      text.textContent = 'No Books in storage, Try adding some';
      button.onclick = () => this.toggleVisibility('addBook');
      article.append(text, button);
      listItem.appendChild(article);
      this.list.appendChild(listItem);
    }

    const remove = Array.from(document.getElementsByClassName('remove'));
    remove.forEach((btn, i) =>
      btn.addEventListener('click', () => {
        this.showToast(`${this.collection[i].title} was removed`, null, 'OK');
        this.deleteBook(i);
        this.saveToLocalStorage();
        this.render();
      })
    );
  }
}
