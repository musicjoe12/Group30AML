import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchFilter from '../Components/SearchFilter';
import { SearchProvider } from '../Context/SearchContext';
import '@testing-library/jest-dom'; 

describe('SearchFilter Component', () => {
    const mockOnFilterUpdate = jest.fn();
    const mockOnClose = jest.fn();
  
    
    const defaultProps = {
      books: [
        { title: 'Book One', author: 'Author A', genre: 'Fiction', availability: true, publication_year: 2020 },
        { title: 'Book Two', author: 'Author B', genre: 'Non-fiction', availability: false, publication_year: 2019 },
      ],
      onFilterUpdate: mockOnFilterUpdate,
      genres: ['Fiction', 'Non-fiction'],
      isOpen: true,
      onClose: mockOnClose,
    };
  
    // Wrap the render calls with SearchProvider to ensure `useSearch` is provided with data
    const renderWithContext = (props = defaultProps) => {
      return render(
        <SearchProvider>
          <SearchFilter {...props} />
        </SearchProvider>
      );
    };
  
    test('renders modal when isOpen is true', () => {
        renderWithContext();
        // Use getAllByText to handle multiple matches
        const filterTexts = screen.getAllByText(/Filters/i);
        expect(filterTexts).toHaveLength(2); // Ensure there are two "Filters" elements
        expect(filterTexts[0]).toBeInTheDocument(); // First match (modal title)
        expect(filterTexts[1]).toBeInTheDocument(); // Second match (books match the filters text)
        expect(screen.getByPlaceholderText(/Search by title or author/i)).toBeInTheDocument();
      });
      test('does not render modal when isOpen is false', () => {
        renderWithContext({ ...defaultProps, isOpen: false });
        expect(screen.queryByText(/Filters/i)).not.toBeInTheDocument();
      });
      test('calls onClose when close button is clicked', () => {
        renderWithContext();
        fireEvent.click(screen.getByText(/Search/i)); // Simulate clicking the "Search" button
        expect(mockOnClose).toHaveBeenCalledTimes(1);
      });
      test('filters books based on genre', () => {
        renderWithContext();
        const fictionTag = screen.getByText('Fiction');
        fireEvent.click(fictionTag);
        expect(mockOnFilterUpdate).toHaveBeenCalledWith([
          { title: 'Book One', author: 'Author A', genre: 'Fiction', availability: true, publication_year: 2020 },
        ]);
      });
      test('filters books by availability', () => {
        renderWithContext();
        const availableTag = screen.getByText('Available');
        fireEvent.click(availableTag);
        expect(mockOnFilterUpdate).toHaveBeenCalledWith([
          { title: 'Book One', author: 'Author A', genre: 'Fiction', availability: true, publication_year: 2020 },
        ]);
      });
      it('filters books by publication year range', () => {
        renderWithContext();
        const startYearInput = screen.getByPlaceholderText('Start year');
        const endYearInput = screen.getByPlaceholderText('End year');
        fireEvent.change(startYearInput, { target: { value: '2019' } });
        fireEvent.change(endYearInput, { target: { value: '2020' } });
        expect(defaultProps.onFilterUpdate).toHaveBeenCalledWith([
          { title: 'Book One', author: 'Author A', genre: 'Fiction', availability: true, publication_year: 2020 },
          { title: 'Book Two', author: 'Author B', genre: 'Non-fiction', availability: false, publication_year: 2019 },
        ]);
      });
      test('filters books based on title', () => {
        renderWithContext();
      
        const searchInput = screen.getByPlaceholderText(/Search by title or author/i);
        userEvent.type(searchInput, 'Book One');
      
        expect(mockOnFilterUpdate).toHaveBeenCalledWith([
          { title: 'Book One', author: 'Author A', genre: 'Fiction', availability: true, publication_year: 2020 },
        ]);
      });
  });