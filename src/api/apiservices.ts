import axiosInstance from "./axiosapi";
import axios from 'axios';
import { Book } from '../types/types';
// Create a new book
export const createBook = async (book: Book): Promise<Book> => {
    try {
      const response = await axiosInstance.post<Book>('/books', book);
      return response.data;
    } catch (error) {
      throw new Error('Error creating book');
    }
  };

  // Get all books
  export const getBooks = async (): Promise<Book[]> => {
    try {
      const response = await axiosInstance.get<Book[]>('/books');
      return response.data;
    }catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          console.error('Error message: ', error.message);
          alert(`Failed to fetch books. Error: ${error.message}`);
        } else {
          console.error('Unexpected error: ', error);
          alert('An unexpected error occurred. Please try again later.');
        }
      }
      return [];
  };
  
  // Update a book by ID
  export const updateBook = async (id: number, book: Book): Promise<Book> => {
    try {
      const response = await axiosInstance.put<Book>(`/books/${id}`, book);
      return response.data;
    } catch (error) {
      throw new Error('Error updating book');
    }
  };
  
  // Delete a book by ID
  export const deleteBook = async (id: number): Promise<void> => {
    try {
      await axiosInstance.delete(`/books/${id}`);
    } catch (error) {
      throw new Error('Error deleting book');
    }
  };