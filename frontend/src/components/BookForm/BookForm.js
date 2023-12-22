import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addBook } from '../../redux/books/actionCreators';
import './BookForm.css';
const BookForm = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  // const [formData, setFormData] = useState({}) - если много инпутов
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault(); //это чтобы на новую страницу не перенаправлял браузер

    if (title && author) {
      //dispatch action
      const book = {
        title: title,
        author: author,
      };

      dispatch(addBook(book));

      setTitle('');
      setAuthor(''); // вызов этих двух функции с пустыми строками нужны для того чтобы после ввода данных в инпуты, инпуты очищались и были готовы к новы вводам данных.
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
      </form>
    </div>
  );
};

export default BookForm;