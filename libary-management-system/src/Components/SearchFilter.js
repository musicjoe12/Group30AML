import React, { useState } from 'react';
import { Input, Select, Space, DatePicker, Drawer, Button, Typography, Divider } from 'antd';

// Search filter button code

// {/* Search and Filters */}
// <SearchFilter
// books={books}
// onFilterUpdate={setFilteredBooks} // Update filtered books
// genres={genres}
// />

// New backend to include the search filter

// useEffect(() => {
//     // Fetch books from the API
//     axios.get('http://localhost:8080/api/books')
//       .then((response) => {
//         setBooks(response.data);
//         setFilteredBooks(response.data);

//         // Extract genres
//         const uniqueGenres = [...new Set(response.data.map((book) => book.genre))];
//         setGenres(uniqueGenres);
//       })
//       .catch((err) => console.log(err));
//   }, []);




const { Search } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { Title, Text } = Typography;

const SearchFilter = ({ books, onFilterUpdate, genres }) => {
  const [filters, setFilters] = useState({
    search: '',
    genre: null,
    availability: null,
    publicationYear: { start: null, end: null },
  });

  const [drawerVisible, setDrawerVisible] = useState(false); // State to manage drawer visibility

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

  // Toggle drawer visibility
  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
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
    <>
      {/* Drawer */}
      <Button type="primary" onClick={showDrawer} style={{ marginBottom: '20px' }}>
        Open Filters
      </Button>

      {/* Drawer Component */}
      <Drawer
        title="Filters"
        placement="left"
        closable={true}
        onClose={closeDrawer}
        visible={drawerVisible}
        width={350}
        style={{ padding: '0px' }}
      >
        <Space style={{ marginBottom: '10px' }} wrap direction="vertical">
          {/* Title and Book count */}
          <Title level={4} style={{ marginBottom: 10 }}>Filter Books</Title>
          <Text type="secondary" style={{ marginBottom: '20px', fontSize: '14px' }}>
            {filteredBooksCount} books found
          </Text>
          <Divider style={{ margin: '10px 0' }} />

          {/* Search by title or author */}
          <Search
            placeholder="Search by title or author"
            onSearch={handleSearch}
            enterButton
            style={{ width: '100%' }}
          />

          {/* Filter by genre */}
          <Select
            style={{ width: '100%' }}
            placeholder="Filter by genre"
            onChange={(value) => handleFilterChange('genre', value)}
            allowClear
          >
            {genres.map((genre) => (
              <Option key={genre} value={genre}>
                {genre}
              </Option>
            ))}
          </Select>

          {/* Filter by availability */}
          <Select
            style={{ width: '100%' }}
            placeholder="Filter by availability"
            onChange={(value) => handleFilterChange('availability', value)}
            allowClear
          >
            <Option value={true}>Available</Option>
            <Option value={false}>Reserved</Option>
          </Select>

          {/* Filter by publication year range */}
          <RangePicker
            picker="year"
            style={{ width: '100%' }}
            onChange={handleYearChange}
            allowClear
          />
        </Space>
      </Drawer>
    </>
  );
};

export default SearchFilter;
