import React, { useState, useEffect } from 'react';
import { Input, Tag, Select, Space, DatePicker, Drawer, Button, Typography, Divider } from 'antd';
import '../CSS/searchFilter.css';


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

  useEffect(() => {
    applyFilters(filters);
  }, [books, filters]); 

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
      <Button type="primary" onClick={showDrawer} className="filter-button">
    Open Filters
</Button>

<Drawer
    title={<span className="drawer-header">Filters</span>}
    placement="left"
    closable={true}
    onClose={closeDrawer}
    visible={drawerVisible}
    bodyStyle={{
        backgroundColor: '#124E78',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    }}
    drawerStyle={{ backgroundColor: '#124E78' }}
    width={350}
    className="filter-drawer"
>
    <Space className="filter-space" wrap direction="vertical">
        <Title level={4} className="filter-title">Filter Books</Title>
        <Text type="secondary" className="filter-count">
            {filteredBooksCount} books found
        </Text>
        <Divider className="filter-divider" />

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
    </Space>

        {/* Filter by Genre */}
        <div className="filter-genre">
        <Text className="filter-subtitle">Genres</Text>
        <Space wrap>
          {genres.map((genre) => (
            <Tag
              key={genre}
              className={`filter-tag ${filters.genre === genre ? 'filter-tag-available' : ''}`}
              onClick={() => handleGenreClick(genre)}
            >
              {genre}
            </Tag>
          ))}
        </Space>
      </div>

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

    {/* Search Button */}
    <Button
        type="primary"
        className="search-button"
        onClick={() => applyFilters(filters)}
    >
        Search
    </Button>
</Drawer>
</>
  );
};

export default SearchFilter;
