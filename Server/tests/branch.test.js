const request = require('supertest');
const express = require('express');
const app = require('../server');

describe('POST /api/change-branch', () => {
    test('It should successfully connect to the specified branch and return a success message', async () => {
        const response = await request(app).post('/api/change-branch').send({ branch: 'BranchManchester' });
        expect(response.status).toBe(200);
        expect(response.body.status).toBe('Success');
        expect(response.body.message).toBe('Connected to BranchManchester branch');
    });
});