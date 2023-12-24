import { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { addBook } from '../../redux/slices/booksSlice';
import createBookWithId from '../../utils/createBookWithId';
import booksData from '../../data/books.json';
import './BookForm.css';
const BookForm = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  // const [formData, setFormData] = useState({}) - если много инпутов
  const dispatch = useDispatch();

  const handleAddRandomBook = () => {
    const randomIndex = Math.floor(Math.random() * booksData.length);
    const randomBook = booksData[randomIndex];
    dispatch(addBook(createBookWithId(randomBook, 'random')));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); //это чтобы на новую страницу не перенаправлял браузер

    if (title && author) {
      //dispatch action

      dispatch(addBook(createBookWithId({ title, author }, 'manual')));

      setTitle('');
      setAuthor(''); // вызов этих двух функции с пустыми строками нужны для того чтобы после ввода данных в инпуты, инпуты очищались и были готовы к новы вводам данных.
    }
  };

  const handleAddRandomBookViaAPI = async () => {
    try {
      const res = await axios.get('http://localhost:4000/random-book');
      if (res?.data?.title && res?.data?.author) {
        dispatch(addBook(createBookWithId(res.data, 'API')));
      }
    } catch (error) {
      console.log('Error fetching random book', error);
    }
  };

  return (
    <div className="app-block book-form">
      <h2>Add a New Book</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="author">Author:</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <button type="submit">Add Book</button>
        <button type="button" onClick={handleAddRandomBook}>
          Add Random Book
        </button>
        <button type="button" onClick={handleAddRandomBookViaAPI}>
          Add Random via API
        </button>
      </form>
    </div>
  );
};

export default BookForm;
