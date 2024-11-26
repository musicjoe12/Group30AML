import React, { useState, useEffect } from 'react';
import { Input, Tag, Select, Space, DatePicker, Modal, Button, Typography, Divider } from 'antd';
import '../CSS/searchFilter.css';
import { useSearch } from '../Context/SearchContext';
import { FilterAlt, Spa } from '@mui/icons-material';
import { triggerFocus } from 'antd/es/input/Input';


const { Search } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { Title, Text } = Typography;

const SearchFilter = ({ books, onFilterUpdate, genres, isOpen, onClose }) => {
  const [filters, setFilters] = useState({
    search: '',
    genre: null,
    availability: null,
    publicationYear: {start: null, end: null},
  });

  const { searchValue } = useSearch(); // Get searchValue and setSearchValue



//  useEffect(() => {
 //   if (trigger) {
  //    trigger(() => setModalVisible(true));
  //  }
 // }, [trigger]);


  //const [modalVisible, setModalVisible] = useState(false); // State to manage modal visibility



  useEffect(() => {
    if (searchValue.trim() !== "") {
      const filteredBooks = books.filter((book) =>
        book.title.toLowerCase().includes(searchValue.toLowerCase()) ||
        book.author.toLowerCase().includes(searchValue.toLowerCase())
      );
      onFilterUpdate(filteredBooks);
    } else {
      onFilterUpdate(books); // Reset to all books if search is cleared
    }
  }, [searchValue, books, onFilterUpdate]);


 // useEffect(() => {
 //   applyFilters(filters);
 // }, [books, filters]); 


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
    const updatedGenre = filters.genre === genre ? null : genre; // Toggle genre filter
    handleFilterChange('genre', updatedGenre);
  };

  const handleAvailabilityClick = (availability) => {
    const updatedAvailability = filters.availability === availability ? null : availability; // Toggle availability filter
    handleFilterChange('availability', updatedAvailability);
  };

  const applyFilters = (activeFilters) => {
    const { search, genre, availability, publicationYear } = activeFilters;

    let filteredBooks = [...books];

    // Filter by search
    if (search) {
      filteredBooks = filteredBooks.filter(
        (book) =>
          book.title.toLowerCase().includes(search.toLowerCase()) ||
          book.author.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Filter by genre
    if (genre) {
      filteredBooks = filteredBooks.filter((book) => book.genre === genre);
    }

    // Filter by availability
    if (availability !== null && availability !== undefined) {
      filteredBooks = filteredBooks.filter((book) => book.availability === availability);
    }

    // Filter by publication year range
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
      <Modal
      title='Filters'
      visible={isOpen}
      onCancel={onClose}
      footer={null}
      bodyStyle={{
        backgroundColor: '#D3D3D3',
        display: 'flex',
        flexDirection: 'column',
      }}
      >
        <Title level={4} style={{ color: 'black' }}>
          Filter Books
        </Title>
        <Divider />

          {/* Search Input */}
          <Input
            placeholder="Search by title or author"
            className="filter-input"
            onChange={(e) => handleSearch(e.target.value)}
          />

          {/* Filter by Publication Year */}
          <RangePicker
            picker="year"
            className="filter-range-picker"
            onChange={handleYearChange}
            allowClear
          />
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
          <Space>
            {/* Filter by Availability */}
        <div className="filter-availability">
          <Text className="filter-subtitle">Availability</Text>
          <Space wrap>
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
          </Space>
        </div>
          </Space>

        

        {/* Search Button */}
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
  );
};

export default SearchFilter;