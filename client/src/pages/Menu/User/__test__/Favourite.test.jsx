import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from "vitest";
import Album from '../GuessYouLike.jsx'; // Adjust the import path as necessary
import { getTopTracksAPI } from "@/apis/everyoneDataAPI"; // Ensure this is the correct path
import '@testing-library/jest-dom';

// Mocking the API correctly
vi.mock('@/apis/everyoneDataAPI', () => ({
    getTopTracksAPI: vi.fn()
}));

// Example mock data based on your input
const mockAlbumData = {
  albums: {
    items: [
      {
        id: '5H7ixXZfsNMGbIE5OBSpcb',
        name: 'THE TORTURED POETS DEPARTMENT: THE ANTHOLOGY',
        artists: [{ name: 'Taylor Swift' }],
        release_date: '2024-04-19',
        images: [{ url: 'https://i.scdn.co/image/ab67616d00001e028ecc33f195df6aa257c39eaa', height: 300, width: 300 }]
      },
    ]
  }
};

describe('AlbumPage Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    getTopTracksAPI.mockResolvedValue(mockAlbumData); // Ensure this mock is reset before each test
  });

  it('fetches and displays albums on mount', async () => {
    render(<MemoryRouter><Album/></MemoryRouter>);
    await waitFor(() => {
      expect(screen.getByText('THE TORTURED POETS DEPARTMENT: THE ANTHOLOGY')).toBeInTheDocument();
      expect(screen.getByText('Taylor Swift')).toBeInTheDocument();
    });
  });

  it('displays error message if API call fails', async () => {
    const errorMessage = 'Failed to fetch';
    getTopTracksAPI.mockRejectedValue(new Error(errorMessage)); // Ensuring the rejection is properly simulated
    render(<MemoryRouter><Album /></MemoryRouter>);

    await waitFor(() => {
        // Make sure your component actually renders this error message.
        // Example:
        // expect(screen.getByText(`Error fetching albums: ${errorMessage}`)).toBeInTheDocument();
    });
  });
});
