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

//mock js cookie to prevent actual cookie operation during tests
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

//navbar test suite
describe('Navbar Component', () => {
    const renderNavbar = () => { //rendering navbar with relevant context needed for testing
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

    //reset mock implementations before each test
    beforeEach(() => {
        Cookies.get.mockReset();
        Cookies.set.mockReset();
        Cookies.remove.mockReset();
    });

    test('renders logo and title', () => {
        renderNavbar();

        expect(screen.getByAltText('AML Logo')).toBeInTheDocument(); 
        expect(screen.getByText('AML')).toBeInTheDocument(); //check for logo rendered
    });

    test('renders the search input and allows for user input', () => {
        renderNavbar();

        const searchInput = screen.getByPlaceholderText('Search'); //palceholder text within search input field
        expect(searchInput).toBeInTheDocument(); //check if search input has rendered

        act(() => {
            fireEvent.change(searchInput, { target: { value: 'Test Search' } }); //simulating user input
        })

        expect(searchInput.value).toBe('Test Search'); //search field has been updated
    });

    test('renders login button and handles login modal', () => {
        renderNavbar();

        const loginButton = screen.getByText('Login'); //finding button by its text
        expect(loginButton).toBeInTheDocument(); //check if rendered

        act(() => {
            fireEvent.click(loginButton); //simulate clicking on button
        })

        expect(screen.getByText('Select User to Login')).toBeInTheDocument(); //modal title
    });

    test('toggles Branch Manager Mode Switch', () => {
        renderNavbar();

        const toggleSwitch = screen.getByRole('switch'); //find toggle slider by role
        expect(toggleSwitch).toBeInTheDocument(); //check if rendered

        expect(toggleSwitch).toHaveAttribute('aria-checked', 'false'); //initial state should be unchecked, BM mode off

        act(() => {
            fireEvent.click(toggleSwitch); //simulate user clicking
        });

        expect(toggleSwitch).toHaveAttribute('aria-checked', 'true'); //check if state is changed, BM mode on
    });

    test('Search input triggers navigation on submit', () => {
        renderNavbar();

        const searchInput = screen.getByPlaceholderText('Search'); //find search by placeholder text
        const searchButton = screen.getByRole('button', { name: /search/i }); //finding search button by role

        act(() => {
            fireEvent.change(searchInput, { target: { value: 'Test Search' } }); //simulate user typing
            fireEvent.click(searchButton); // user clicking on the search button
        });

        expect(window.location.pathname).toBe('/browse-media'); //check if user has been redirected to browse media page
    });

    test('renders settings icon and handles logout', () => {
        renderNavbar();

        const settingsIcon = screen.getByTestId('settings-icon'); //find settings icon by testid attributed in <SettingsOutlined> in Navbar.js
        expect(settingsIcon).toBeInTheDocument(); //check if rendered

        act(() => {
            fireEvent.click(settingsIcon); //simulate user clicking on settings icon
        });

        expect(screen.getByText('Logout')).toBeInTheDocument(); //checking if logout button renders

        act(() => {
            fireEvent.click(screen.getByText('Logout')); //user clicking on logout button
        });

        expect(Cookies.remove).toHaveBeenCalledWith('userId'); //remove userId cookie
        expect(Cookies.remove).toHaveBeenCalledWith('userName'); //remove userName cookie
    }); //passes
});