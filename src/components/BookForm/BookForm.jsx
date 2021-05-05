import Axios from 'axios';
import {useState} from 'react';

function BookForm({fetchBookList}) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = event => {
    event.preventDefault();

    console.log(`Adding book`, {title, author});

    // TODO - axios request to server to add book
    Axios.post('/books', {
      title: title, author: author
    })
      .then( response => {
        console.log('added book succesfully');
        // GET the books from the server again
        fetchBookList();
      })
      .catch(error => {
        alert(`Sorry, Things are working at the moment`)
        console.log('Error adding book', error);
      })
  };

  return (
    <section>
      <h2>Add Book</h2>
      <form onSubmit={handleSubmit} className="add-book-form">
        <input 
          required 
          placeholder="Title" 
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />

        <input 
          required 
          placeholder="Author" 
          value={author}
          onChange={(event) => setAuthor(event.target.value)}
        />

        <button type="submit">
          Add Book
        </button>
      </form>
    </section>
  );
}

export default BookForm;