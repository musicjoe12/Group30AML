const request = require('supertest');
const express = require('express');
const app = require('../server');


describe('GET /users', () => {
    it('should fetch all users', async () => {
        const response = await request(app).get('/api/users');
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
    });
});

describe('GET /user/:id', () => {
    it('should fetch a single user by ID', async () => {
        const response = await request(app).get(`/api/user/6748545d57e6a5bc8e6c88d9`);
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
    });
});

describe('GET /api/user-books-borrowed/:id', () => {
    it("should fetch the user's borrowed books", async () => {
        const response = await request(app).get(`/api/user-books-borrowed/6748545d57e6a5bc8e6c88d9`);
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
    });
});

describe('GET /api/user-books-reserved/:id', () => {
    it("should fetch the user's reserved books", async () => {
        const response = await request(app).get(`/api/user-books-reserved/6748545d57e6a5bc8e6c88d9`);
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
    });
});

describe('POST /api/add-borrowed-book/:id', () => {
    it('should add a borrowed book to the user', async () => {
        const newBook = { book_id: '6751ab1f104665938d849eeb', due_date: '2024-12-17' };
        const response = await request(app).post('/api/add-borrowed-book/6748545d57e6a5bc8e6c88d9').send(newBook);
        expect(response.status).toBe(200);
        expect(response.body).toContainEqual(expect.objectContaining(newBook));
    });
});

describe('POST /api/add-reserved-book/:id', () => {
    it('should add a reserved book to the user', async () => {
        const newBook = { book: '6751ab1f104665938d849fb4' };
        const response = await request(app).post(`/api/add-reserved-book/6748545d57e6a5bc8e6c88d9`).send(newBook);
        expect(response.status).toBe(200);
        expect(response.body).toContain(newBook.book);
    });
});

describe('DELETE /api/user-books-borrowed/:id/:books_borrowed', () => {
    it('should delete a borrowed book from the user', async () => {
        const response = await request(app).delete(`/api/user-books-borrowed/6748545d57e6a5bc8e6c88d9/6751ab1f104665938d849eeb`);
        expect(response.status).toBe(200);
        expect(response.body.status).toBeUndefined(); 
    });
});

describe('DELETE /api/user-books-reserved/:id/:books_reserved', () => {
    it('should delete a borrowed book from the user', async () => {
        const response = await request(app).delete(`/api/user-books-reserved/6748545d57e6a5bc8e6c88d9/6751ab1f104665938d849fb4`);
        expect(response.status).toBe(200);
        expect(response.body.status).toBeUndefined(); 
    });
});

describe('PATCH /api/update-due-date/:id/:book_id', () => {
    it("should update a borrowed book's due date for the user", async () => {
        const newDueDate = { due_date: '2025-01-01' };
        const response = await request(app).patch(`/api/update-due-date/6748545d57e6a5bc8e6c88d9/6751ab1f104665938d849eeb`).send(newDueDate);
        expect(response.status).toBe(200);
    });
});