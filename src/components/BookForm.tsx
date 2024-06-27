import { useState } from 'react';
import { Book } from '../types/types';

interface BookFormProps {
  onClose: () => void;
  onSubmit: (book:Book) => void;
}

const BookForm: React.FC<BookFormProps> = ({ onClose, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [yearOfPublication, setYearOfPublication] = useState<number | ''>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof yearOfPublication === 'number') {
      const newBook = { title, author, year_of_publication: yearOfPublication, id: 0 };
      onSubmit(newBook);
      onClose();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Year of Publication"
        value={yearOfPublication}
        onChange={(e) => setYearOfPublication(Number(e.target.value))}
        required
      />
      <button type="submit">Add Book</button>
      <button type="button" onClick={onClose}>Cancel</button>
    </form>
  );
};

export default BookForm;
