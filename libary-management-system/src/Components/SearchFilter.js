import React, { useState, useEffect } from 'react';
import { Input, Tag, Space, DatePicker, Modal, Button, Typography, Divider } from 'antd';
import '../CSS/searchFilter.css';
import { useSearch } from '../Context/SearchContext';
import Draggable from 'react-draggable';

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

const SearchFilter = ({ books, onFilterUpdate, genres, isOpen, onClose }) => {
  const [filters, setFilters] = useState({
    search: '',
    genre: null,
    availability: null,
    publicationYear: { start: null, end: null },
  });

  const { searchValue } = useSearch();

  useEffect(() => {
    if (searchValue.trim() !== "") {
      const filteredBooks = books.filter(book => {
        return book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
               book.author.toLowerCase().includes(searchQuery.toLowerCase());
      });
      onFilterUpdate(filteredBooks);
    } else {
      onFilterUpdate(books); // Reset to all books if search is cleared
    }
  }, [searchValue, books, onFilterUpdate]);

  const handleSearch = (searchValue) => {
    setFilters((prev) => ({ ...prev, search: searchValue }));
    applyFilters({ ...filters, search: searchValue });
  };

  const handleFilterChange = (key, value) => {
    const updatedFilters = { ...filters, [key]: value };
    setFilters(updatedFilters);
    applyFilters(updatedFilters);
  };

  const handleYearChange = (dates) => {
    const [startYear, endYear] = dates || [];
    const updatedFilters = {
      ...filters,
      publicationYear: {
        start: startYear?.year() || null,
        end: endYear?.year() || null,
      },
    };
    setFilters(updatedFilters);
    applyFilters(updatedFilters);
  };

  const handleGenreClick = (genre) => {
    const updatedGenre = filters.genre === genre ? null : genre; 
    handleFilterChange('genre', updatedGenre);
  };

  const handleAvailabilityClick = (availability) => {
    const updatedAvailability = filters.availability === availability ? null : availability;
    handleFilterChange('availability', updatedAvailability);
  };

  const applyFilters = (activeFilters) => {
    const { search, genre, availability, publicationYear } = activeFilters;

    let filteredBooks = [...books];

    if (search) {
      filteredBooks = filteredBooks.filter(
        (book) =>
          book.title.toLowerCase().includes(search.toLowerCase()) ||
          book.author.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (genre) {
      filteredBooks = filteredBooks.filter((book) => book.genre === genre);
    }

    if (availability !== null && availability !== undefined) {
      filteredBooks = filteredBooks.filter((book) => book.availability === availability);
    }

    if (publicationYear.start && publicationYear.end) {
      filteredBooks = filteredBooks.filter(
        (book) =>
          book.publication_year >= publicationYear.start &&
          book.publication_year <= publicationYear.end
      );
    }

    onFilterUpdate(filteredBooks);
  };

  const filteredBooksCount = books.filter((book) => {
    const { search, genre, availability, publicationYear } = filters;

    let matches = true;

    if (search && !book.title.toLowerCase().includes(search.toLowerCase()) && !book.author.toLowerCase().includes(search.toLowerCase())) {
      matches = false;
    }

    if (genre && book.genre !== genre) {
      matches = false;
    }

    if (availability !== null && availability !== undefined && book.availability !== availability) {
      matches = false;
    }

    if (publicationYear.start && publicationYear.end && (book.publication_year < publicationYear.start || book.publication_year > publicationYear.end)) {
      matches = false;
    }

    return matches;
  }).length;

  return (
    <Draggable handle=".ant-modal-header">
      <div>
        <Modal
          title='Filters'
          open={isOpen} 
          onCancel={onClose}
          footer={null}
          styles={{ body: { backgroundColor: '#D3D3D3', display: 'flex', flexDirection: 'column', pointerEvents: 'auto' } }} // Updated from 'bodyStyle' to 'styles.body'
        >
          <Title level={4} style={{ color: 'black' }}>
            Filter Books
          </Title>
          <Text type="secondary" style={{ marginBottom: 10 }}>
            {filteredBooksCount} books match the filters.
          </Text>
          <Divider />

          <Input
            placeholder="Search by title or author"
            className="filter-input"
            onChange={(e) => handleSearch(e.target.value)}
          />
          <Text className="filter-subtitle">Publication Year</Text>
          <RangePicker
            picker="year"
            className="filter-range-picker"
            onChange={handleYearChange}
            allowClear
          />
          <Text className="filter-subtitle">Genre</Text>
          <Space wrap>
            {genres.map((genre) => (
              <Tag
                key={genre}
                color={filters.genre === genre ? 'blue' : 'default'}
                className={`filter-tag ${filters.genre === genre ? 'filter-tag-available' : ''}`}
                onClick={() => handleGenreClick(genre)}
              >
                {genre}
              </Tag>
            ))}
          </Space>

          <div className="filter-availability">
            <Text className="filter-subtitle">Availability</Text>
            <div className="filter-tags-container">
              <Tag
                className={`filter-tag ${filters.availability === true ? 'filter-tag-available' : ''}`}
                onClick={() => handleAvailabilityClick(true)}
              >
                Available
              </Tag>
              <Tag
                className={`filter-tag ${filters.availability === false ? 'filter-tag-reserved' : ''}`}
                onClick={() => handleAvailabilityClick(false)}
              >
                Reserved
              </Tag>
            </div>
          </div>

          <Button
            type="primary"
            className="search-button"
            onClick={() => {
              applyFilters(filters);
              onClose();
            }}
          >
            Search
          </Button>
        </Modal>
      </div>
    </Draggable>
  );
};

export default SearchFilter;
