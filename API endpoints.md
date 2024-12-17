# API Endpoint Documentation
---
## Book Routes
## **1. Get All Books**

**Endpoint**:  
`GET /api/books`  

**Description**:  
Fetches a list of all books.

**Headers**:   
- `Content-Type`: application/json  

**Query Parameters**:  
None  

**Response**:  
- **Status**: 200 OK  
- **Body**:  

```json
[
  {
    "id": "1",
    "title": "Book Title",
    "author": "Author Name",
    "description": "A brief description of the book",
    "genre": "Fiction",
    "publication_year": 2020,
    "image": "https://example.com/book-image.jpg",
    "availability": true,
    "reserved": false,
    "quantity": 10
  },
  {ect...},
]
```
## **2. Get a Book**

**Endpoint**:  
`GET /book/:id`  

**Description**:  
Fetches the details of a specific book by its ID.

**Headers**:  
- `Content-Type`: application/json  

**Path Parameters**:  
- `id` (string): The ID of the book to retrieve.  

**Response**:  
- **Status**: 200 OK  
- **Body**:  

```json
[
  {
    "id": "1",
    "title": "Book Title",
    "author": "Author Name",
    "description": "A brief description of the book",
    "genre": "Fiction",
    "publication_year": 2020,
    "image": "https://example.com/book-image.jpg",
    "availability": true,
    "reserved": false,
    "quantity": 10
  }
]
```
## **3. Get Multiple Books**

**Endpoint**:  
`GET /books/multiple`  

**Description**:  
Fetches details of multiple books based on query parameters.

**Headers**:   
- `Content-Type`: application/json  

**Query Parameters**:  
- `ids` (string): A comma-separated list of book IDs (e.g., `ids=1,2,3`).  

**Response**:  
- **Status**: 200 OK  
- **Body**:  

```json
[
  {
    "id": "1",
    "title": "Book Title",
    "author": "Author Name",
    "description": "A brief description of the book",
    "genre": "Fiction",
    "publication_year": 2020,
    "image": "https://example.com/book-image.jpg",
    "availability": true,
    "reserved": false,
    "quantity": 10
  },
  {ect...},
]
```
## **4. Check if a Book is Reserved**

**Endpoint**:  
`GET /reserved/:id`  

**Description**:  
Checks if a specific book is reserved.

**Headers**:  
- `Content-Type`: application/json  

**Path Parameters**:  
- `id` (string): The ID of the book to check.  

**Response**:  
- **Status**: 200 OK  
- **Body**:  

```json
{
  "id": "1",
  "reserved": true
}
```
## **5. Create a New Book**

**Endpoint**:  
`POST /add-book`  

**Description**:  
Creates a new book in the system.

**Headers**:   
- `Content-Type`: application/json  

**Body Parameters**:  
- `title` (string): The title of the book.  
- `author` (string): The author of the book.  
- `available` (boolean): Availability status of the book (true if available, false if not).  

**Request Body Example**:  

```json
{
  "title": "New Book Title",
  "author": "New Author",
  "description": "A detailed description of the new book",
  "genre": "Non-fiction",
  "publication_year": 2024,
  "image": "https://example.com/new-book-image.jpg",
  "availability": true,
  "reserved": false,
  "quantity": 5
}
```
**Response**:  
- **Status**: 200 OK  
- **Body**:  

```json
{
  "id": "1",
  "title": "New Book Title",
  "author": "New Author",
  "description": "A detailed description of the new book",
  "genre": "Non-fiction",
  "publication_year": 2024,
  "image": "https://example.com/new-book-image.jpg",
  "availability": true,
  "reserved": false,
  "quantity": 5
}

```
## **6. Update a Book**

**Endpoint**:  
`PATCH /update-book/:id`  

**Description**:  
Updates the details of an existing book by its ID.

**Headers**:  
- `Authorization`: Bearer [token] (required)  
- `Content-Type`: application/json  

**Path Parameters**:  
- `id` (string): The ID of the book to update.  

**Body Parameters**:  
- `title` (string, optional): The new title of the book.  
- `author` (string, optional): The new author of the book.  
- `available` (boolean, optional): The new availability status of the book.  

**Request Body Example**:  

```json
{
  "title": "Updated Book Title",
  "author": "Updated Author",
}
```
**Response**:  
- **Status**: 200 OK  
- **Body**:  

```json
{
  {
  "id": "1",
  "title": "Updated Book Title",
  "author": "Updated Author",
  "description": "A detailed description of the new book",
  "genre": "Non-fiction",
  "publication_year": 2024,
  "image": "https://example.com/new-book-image.jpg",
  "availability": true,
  "reserved": false,
  "quantity": 5
}

}
```
## **7. Delete a Book**

**Endpoint**:  
`DELETE /delete-book/:id`  

**Description**:  
Deletes a specific book by its ID.

**Headers**:  
- `Authorization`: Bearer [token] (required)  
- `Content-Type`: application/json  

**Path Parameters**:  
- `id` (string): The ID of the book to delete.  

**Response**:  
- **Status**: 200 OK  
- **Body**:  

```json
{
  "message": "Book successfully deleted",
}
```
---
## User Routes

## **1. Get All Users**

**Endpoint**:  
`GET /users`  

**Description**:  
Fetches a list of all users.

**Headers**:  
- `Content-Type`: application/json  

**Query Parameters**:  
None  

**Response**:  
- **Status**: 200 OK  
- **Body**:  

```json
[
{
  "first_name": "John",
  "last_name": "Doe",
  "email": "johndoe@example.com",
  "password": "hashed_password",
  "phone": "+1234567890",
  "address": "123 Main St, City, Country",
  "books_borrowed": [
    {
      "book_id": "1",
      "due_date": "2024-12-31"
    }
  ],
  "books_reserved": [
    {
      "book_id": "2",
      "title": "Reserved Book Title"
    }
  ],
  "branch": "Main Library"
},
{ect...},
]
```
## **2. Get a User**

**Endpoint**:  
`GET /user/:id`  

**Description**:  
Fetches the details of a specific user by their ID.

**Headers**:  
- `Content-Type`: application/json  

**Path Parameters**:  
- `id` (string): The ID of the user to retrieve.  

**Response**:  
- **Status**: 200 OK  
- **Body**:  

```json
{
  "id": "1",
  "name": "User Name",
  "email": "user@example.com",
  "joined_date": "2023-01-01",
  "borrowed_books": [
    {
      "book_id": "1",
      "title": "Book Title",
      "due_date": "2024-12-31"
    }
  ],
  "reserved_books": [
    {
      "book_id": "2",
      "title": "Reserved Book Title"
    }
  ]
}
```
## **3. Get User's Borrowed Books**

**Endpoint**:  
`GET /user-books-borrowed/:id`  

**Description**:  
Fetches the list of books borrowed by a specific user.

**Headers**:  
- `Content-Type`: application/json  

**Path Parameters**:  
- `id` (string): The ID of the user.  

**Response**:  
- **Status**: 200 OK  
- **Body**:  

```json
[
  {
    "book_id": "1",
    "title": "Book Title 1",
    "due_date": "2024-12-31"
  },
  {
    "book_id": "2",
    "title": "Book Title 2",
    "due_date": "2025-01-15"
  }
]
```
## **4. Get User's Reserved Books**

**Endpoint**:  
`GET /user-books-reserved/:id`  

**Description**:  
Fetches the list of books reserved by a specific user.

**Headers**:  
- `Content-Type`: application/json  

**Path Parameters**:  
- `id` (string): The ID of the user.  

**Response**:  
- **Status**: 200 OK  
- **Body**:  

```json
[
  {
    "book_id": "1",
    "title": "Reserved Book Title 1",
    "reserved_date": "2024-12-01"
  },
  {
    "book_id": "2",
    "title": "Reserved Book Title 2",
    "reserved_date": "2024-12-10"
  }
]
```
## **5. Delete User's Borrowed Book**

**Endpoint**:  
`DELETE /user-books-borrowed/:id/:books_borrowed`  

**Description**:  
Deletes a borrowed book from a user's record.

**Headers**:  
- `Content-Type`: application/json  

**Path Parameters**:  
- `id` (string): The ID of the user.  
- `books_borrowed` (string): The ID of the borrowed book to delete.  

**Response**:  
- **Status**: 200 OK  
- **Body**:  

```json
{
  "message": "Book successfully deleted from borrowed list",
}
```
## **6. Delete User's Reserved Book**

**Endpoint**:  
`DELETE /user-books-reserved/:id/:books_reserved`  

**Description**:  
Deletes a reserved book from a user's record.

**Headers**:  
- `Content-Type`: application/json  

**Path Parameters**:  
- `id` (string): The ID of the user.  
- `books_reserved` (string): The ID of the reserved book to delete.  

**Response**:  
- **Status**: 200 OK  
- **Body**:  

```json
{
  "message": "Book successfully deleted from reserved list",
}
```
## **7. Add Borrowed Book**

**Endpoint**:  
`POST /add-borrowed-book/:id`  

**Description**:  
Adds a new borrowed book to a user's record.

**Headers**:  
- `Content-Type`: application/json  

**Path Parameters**:  
- `id` (string): The ID of the user.  

**Request Body Example**:  

```json
{
  "first_name": "John",
  "last_name": "Doe",
  "email": "johndoe@example.com",
  "password": "hashed_password",
  "phone": "+1234567890",
  "address": "123 Main St, City, Country",
  "books_borrowed": [
    {
      "book_id": "1",
      "due_date": "2024-12-31"
    }
  ],
  "books_reserved": [
    {
      "book_id": "2",
      "title": "Reserved Book Title"
    }
  ],
  "branch": "Main Library"
}
```
**Response**:  
- **Status**: 200 OK  
- **Body**:  

```json
{
  "first_name": "John",
  "last_name": "Doe",
  "email": "johndoe@example.com",
  "password": "hashed_password",
  "phone": "+1234567890",
  "address": "123 Main St, City, Country",
  "books_borrowed": [
    {
      "book_id": "1",
      "due_date": "2024-12-31"
    }
  ],
  "books_reserved": [
    {
      "book_id": "2",
      "title": "Reserved Book Title"
    }
  ],
  "branch": "Main Library"
}
```
## **8. Add Reserved Book**

**Endpoint**:  
`POST /add-reserved-book/:id`  

**Description**:  
Adds a new reserved book to a user's record.

**Headers**:  
- `Content-Type`: application/json  

**Path Parameters**:  
- `id` (string): The ID of the user.  

**Request Body Example**:  

```json
{
  "first_name": "John",
  "last_name": "Doe",
  "email": "johndoe@example.com",
  "password": "hashed_password",
  "phone": "+1234567890",
  "address": "123 Main St, City, Country",
  "books_borrowed": [
    {
      "book_id": "1",
      "due_date": "2024-12-31"
    }
  ],
  "books_reserved": [
    {
      "book_id": "2",
      "title": "Reserved Book Title"
    }
  ],
  "branch": "Main Library"
}
```

**Response**:  
- **Status**: 200 OK  
- **Body**:  

```json
{
  "first_name": "John",
  "last_name": "Doe",
  "email": "johndoe@example.com",
  "password": "hashed_password",
  "phone": "+1234567890",
  "address": "123 Main St, City, Country",
  "books_borrowed": [
    {
      "book_id": "1",
      "due_date": "2024-12-31"
    }
  ],
  "books_reserved": [
    {
      "book_id": "2",
      "title": "Reserved Book Title"
    }
  ],
  "branch": "Main Library"
}
```
## **9. Update Due Date**

**Endpoint**:  
`PATCH /update-due-date/:id/:book_id`  

**Description**:  
Updates the due date for a borrowed book in a user's record.

**Headers**:  
- `Content-Type`: application/json  

**Path Parameters**:  
- `id` (string): The ID of the user.  
- `book_id` (string): The ID of the borrowed book.  

**Request Body Example**:  

```json
{
  "due_date": "2025-01-15"
}
```

**Response**:  
- **Status**: 200 OK  
- **Body**:  

```json
{
  "first_name": "John",
  "last_name": "Doe",
  "email": "johndoe@example.com",
  "password": "hashed_password",
  "phone": "+1234567890",
  "address": "123 Main St, City, Country",
  "books_borrowed": [
    {
      "book_id": "1",
      "due_date": "2024-12-31"
    }
  ],
  "books_reserved": [
    {
      "book_id": "2",
      "title": "Reserved Book Title"
    }
  ],
  "branch": "Main Library"
}
```


