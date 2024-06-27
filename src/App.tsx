import { useReducer, useEffect, useState } from 'react';
import { Book, State } from './types/types';
import { getBooks, createBook, updateBook, deleteBook } from './api/apiservices';
import { bookReducer } from './hooks/reducer';
import BookList from './components/BookList';
import BookForm from './components/BookForm';
import './App.scss';
import { ColorRing } from 'react-loader-spinner'
import { PlusIcon } from 'lucide-react';

const initialState: State = {
  books: [],
  isLoading: false,
  error: null,
};

const App= () => {
  const [state, dispatch] = useReducer(bookReducer, initialState);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        const books = await getBooks();
        dispatch({ type: 'SET_BOOKS', payload: books });
      } catch (error: unknown) {
        dispatch({ type: 'SET_ERROR', payload: (error as Error).message });
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    fetchBooks();
  }, []);

  const handleAddBook = async (book: Book) => {
    try {
      const newBook = await createBook(book);
      dispatch({ type: 'ADD_BOOK', payload: newBook });
    } catch (error: unknown) {
      dispatch({ type: 'SET_ERROR', payload: (error as Error).message });
    }
  };

  const handleUpdateBook = async (book: Book) => {
    try {
      const updatedBook = await updateBook(book.id!, book);
      dispatch({ type: 'UPDATE_BOOK', payload: updatedBook });
    } catch (error: unknown) {
      dispatch({ type: 'SET_ERROR', payload: (error as Error).message });
    }
  };

  const handleDeleteBook = async (id: number) => {
    try {
      await deleteBook(id);
      dispatch({ type: 'DELETE_BOOK', payload: id });
    } catch (error: unknown) {
      dispatch({ type: 'SET_ERROR', payload: (error as Error).message });
    }
  };

  return (
    <div className="App">
      <div className="marque-container">
      <div className='marquee'><h1>Book Repository</h1></div>
      </div>
      <button type="button" onClick={() => setIsAdding(true)} title="Add Book"><PlusIcon size={28} color="#25e218" strokeWidth={2.5} /></button>
      {state.isLoading ? (
        <p> <ColorRing
        visible={true}
        height="80"
        width="80"
        ariaLabel="color-ring-loading"
        wrapperStyle={{}}
        wrapperClass="color-ring-wrapper"
        colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
        /></p>
      ) : (
        <BookList books={state.books} onDelete={handleDeleteBook} onUpdate={handleUpdateBook} />
      )}
      {isAdding && <BookForm onClose={() => setIsAdding(false)} onSubmit={handleAddBook} />}
      {state.error && <p className="error">{state.error}</p>}
    </div>
  );
};

export default App;
