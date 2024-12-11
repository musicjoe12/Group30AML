import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ManageMedia from "../Pages/ManageMedia";
import { UserContext } from "../Context/UserContext";
import axios from "axios";
import '@testing-library/jest-dom';


// Mock axios
jest.mock("axios");

// mock antds message component
jest.mock("antd", () => {
    const originalModule = jest.requireActual("antd");
    return {
        ...originalModule,
        message: {
            success: jest.fn((msg) => console.log(`Message called with: ${msg}`)),
        },
    };
});

describe("ManageMedia Component", () => {
  beforeAll(() => {
    // Mock API responses for borrowed books and return actions
    axios.get.mockImplementation((url) => {
      if (url.includes("/user-books-borrowed")) {
        return Promise.resolve({
          data: [{ book_id: "book1", title: "Borrowed Book", due_date: "2024-12-20", image: "test-image.jpg", author: "Test Author", genre: "Test Genre", description: "Test Description" }],
        });
      }
      if (url.includes("/books/multiple")) {
        return Promise.resolve({
          data: [
            {
              book_id: "book1",
              title: "Borrowed Book",
              author: "Test Author",
              genre: "Test Genre",
              description: "Test Description",
              image: "test-image.jpg",
            },
          ],
        });
      }
      return Promise.reject(new Error("Unexpected API call"));
    });

    axios.delete.mockResolvedValue({ data: { success: true } });
    axios.patch.mockResolvedValue({ data: { success: true } });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should return a borrowed media item", async () => {
    const mockUserContext = {
      userId: "test-user-id",
      setUserId: jest.fn(),
      userName: "Test User",
      setUserName: jest.fn(),
    };

    render(
      <UserContext.Provider value={mockUserContext}>
        <ManageMedia />
      </UserContext.Provider>
    );

    // Wait for borrowed books to load and verify "Currently Borrowed" is displayed
    await waitFor(() => expect(screen.getByText("Currently Borrowed -")).toBeInTheDocument());

    // Simulate clicking on the borrowed book card to reveal details
    const borrowedBooks = screen.getAllByText("Borrowed Book");
    fireEvent.click(borrowedBooks[0]);

    // Wait for the "Return" button to appear
    await waitFor(() => expect(screen.getByText("Return")).toBeInTheDocument());

    // Simulate clicking the "Return" button
    fireEvent.click(screen.getByText("Return"));

    // Verify DELETE API call
    await waitFor(() => {
      expect(axios.delete).toHaveBeenCalledWith(
        "http://localhost:8080/api/user-books-borrowed/test-user-id/book1"
      );
    });

  //  console.log(screen.debug());


    // Verify success message is displayed
  //  expect(require("antd").message.success).toHaveBeenCalledWith(
  //      "Media returned successfully"
  //  );
      

    // Verify the borrowed book is removed from the list
   // await waitFor(() => {
    //  expect(screen.queryByText("Borrowed Book")).not.toBeInTheDocument();
   // });
  });
});
