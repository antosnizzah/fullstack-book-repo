import React from 'react';
import { Book } from '../types/types';
import  {Trash2Icon,FolderPen} from  'lucide-react'
import '../App.scss';

interface BookListProps {
  books: Book[];
  onDelete: (id: number) => void;
  onUpdate: (book: Book) => void;
}

const BookList: React.FC<BookListProps> = ({ books, onDelete, onUpdate }) => {
  return (
    <table className="book-list">
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Author</th>
          <th>Year of Publication</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book) => (
          <tr key={book.id}>
            <td>{book.id}</td>
            <td>{book.title}</td>
            <td>{book.author}</td>
            <td>{book.year_of_publication}</td>
            <td>
              <button onClick={() => onUpdate(book)}><FolderPen size={12} color="#c92222" strokeWidth={1.5} absoluteStrokeWidth /></button>
              <button onClick={() => onDelete(book.id)}><Trash2Icon size={12} color="#c92222" strokeWidth={2.0} /></button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BookList;
