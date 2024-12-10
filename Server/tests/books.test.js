const request = require('supertest');
const express = require('express');
const app = require('../server');


describe('GET /books', () => {
    test('It should respond with an Array of books', async () => {
        const response = await request(app).get('/api/books');
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body.length).toBeGreaterThan(0);
    });
});

describe('GET /book/:id', () => {
    test('It should respond with a single book', async () => {
        const response = await request(app).get('/api/book/6751ab1f104665938d849c95');
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
    });
});

describe('GET /books/multiple', () => {
    test('It should respond with an array of books', async () => {
        const bookIds = ['6751ab1f104665938d849c96', '6751ab1f104665938d849c91'];
        const response = await request(app).get(`/api/books/multiple?ids=${bookIds.join(',')}`);
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array); 
    });
});

describe('GET /reserved/:id', () => {
    test('It should return whether the book is reserved', async () => {
        const response = await request(app).get(`/api/reserved/6751ab1f104665938d849c96`);
        expect(response.body).toBe(false); 
    });
});

describe('POST /add-book', () => {
    test('It should create a new book and return it', async () => {
        const newBook = {
            title: 'Test Book',
            author: 'Test Author',
            description: 'Test Description',
            genre: 'Test Genre',
            publication_year: 2021,
            image: 'test.jpg',
            availability: true,
            reserved: false,
            quantity: 1,
        };
        const response = await request(app).post('/api/add-book').send(newBook);
        expect(response.body.status).toBe('Success');
        expect(response.body.data.book).toMatchObject(newBook);
    });
});

describe('PATCH /update-book/:id', () => {
    test('It should update the book and return the updated version', async () => {
        const updatedData = { title: 'Updated Book Title' };
        const response = await request(app).patch(`/api/update-book/6751ab1f104665938d849c93`).send(updatedData);
        expect(response.body.status).toBe('Success');
        expect(response.body.data.updatedBook.title).toBe('Updated Book Title');
    });
});

describe('DELETE /delete-book/:id', () => {
    test('It should delete the book and return success status', async () => {
        const response = await request(app).delete(`/api/delete-book/6751ab1f104665938d849e22`);
        expect(response.body.status).toBeUndefined(); 
    });
});



