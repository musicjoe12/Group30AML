import React from "react";
import { render, screen, fireEvent, act } from '@testing-library/react';
import Navbar from '../Components/Navbar';
import { UserProvider } from "../Context/UserContext";
import { SearchProvider } from "../Context/SearchContext";
import { BrowserRouter } from "react-router-dom";
import Cookies from 'js-cookie';
import { experimentalStyled } from "@mui/material";
import '@testing-library/jest-dom';
import { message } from "antd";


//temporarily ignore deprecated code warnings
//jest.spyOn(console, 'error').mockImplementation((message) => {
//    if (message.includes('[antd:')) return;
//    console.error(message);
//});


jest.mock('js-cookie', () => ({
    get: jest.fn(),
    set: jest.fn(),
    remove: jest.fn(),
}));

beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation(query => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: jest.fn(),
            removeListener: jest.fn(),
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn(),
        })),
    });
});

describe('Navbar Component', () => {
    const renderNavbar = () => {
        render(
            <BrowserRouter>
            <SearchProvider>
                <UserProvider>
                    <Navbar />
                </UserProvider>
            </SearchProvider>
            </BrowserRouter>
        );
    };

    beforeEach(() => {
        Cookies.get.mockReset();
        Cookies.set.mockReset();
        Cookies.remove.mockReset();
    });

    test('renders logo and title', () => {
        renderNavbar();

        expect(screen.getByAltText('AML Logo')).toBeInTheDocument(); //check for logo
        expect(screen.getByText('AML')).toBeInTheDocument();
    }); //passes

    test('renders the search input and allows for user input', () => {
        renderNavbar();

        const searchInput = screen.getByPlaceholderText('Search');
        expect(searchInput).toBeInTheDocument();

        act(() => {
            fireEvent.change(searchInput, { target: { value: 'Test Search' } });
        })

        expect(searchInput.value).toBe('Test Search');
    }); //passes

    test('renders login button and handles login modal', () => {
        renderNavbar();

        const loginButton = screen.getByText('Login');
        expect(loginButton).toBeInTheDocument();

        act(() => {
            fireEvent.click(loginButton);
        })

        expect(screen.getByText('Select User to Login')).toBeInTheDocument(); //modal title
    }); //passes

    test('toggles Branch Manager Mode Switch', () => {
        renderNavbar();

        const toggleSwitch = screen.getByRole('switch');
        expect(toggleSwitch).toBeInTheDocument();
        expect(toggleSwitch).toHaveAttribute('aria-checked', 'false');

        act(() => {
            fireEvent.click(toggleSwitch);
        });

        expect(toggleSwitch).toHaveAttribute('aria-checked', 'true');

     //   fireEvent.click(toggleSwitch);
     //   expect(localStorage.setItem).toHaveBeenCalledWith('sliderState', 'true');
    }); //passes

    test('Search input triggers navigation on submit', () => {
        renderNavbar();

        const searchInput = screen.getByPlaceholderText('Search');
        const searchButton = screen.getByRole('button', { name: /search/i });

        act(() => {
            fireEvent.change(searchInput, { target: { value: 'Test Search' } });
            fireEvent.click(searchButton);
        });

        expect(window.location.pathname).toBe('/browse-media');
    }); //passes

    test('renders settings icon and handles logout', () => {
        renderNavbar();

        const settingsIcon = screen.getByTestId('settings-icon');
        expect(settingsIcon).toBeInTheDocument();

        act(() => {
            fireEvent.click(settingsIcon);
        });

        expect(screen.getByText('Logout')).toBeInTheDocument();

        act(() => {
            fireEvent.click(screen.getByText('Logout'));
        });

        expect(Cookies.remove).toHaveBeenCalledWith('userId');
        expect(Cookies.remove).toHaveBeenCalledWith('userName');
    }); //passes
});