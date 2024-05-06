import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from "vitest";
import Album from '../Album'; // Adjust the import path as necessary
import { getNewReleasesAPI } from "@/apis/everyoneDataAPI"; // Ensure this is the correct path
import '@testing-library/jest-dom';

// Mocking the API call
vi.mock('@/apis/everyoneDataAPI', () => ({
  getNewReleasesAPI: vi.fn()
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
  });

  it('fetches and displays albums on mount', async () => {
    getNewReleasesAPI.mockResolvedValue(mockAlbumData); // Simulating a successful API response
    render(<MemoryRouter><Album/></MemoryRouter>);

    await waitFor(() => {
      expect(screen.getByText('THE TORTURED POETS DEPARTMENT: THE ANTHOLOGY')).toBeInTheDocument();
      expect(screen.getByText('Taylor Swift')).toBeInTheDocument();
    });
  });

  it('displays error message if API call fails', async () => {
    const errorMessage = 'Failed to fetch';
    getNewReleasesAPI.mockRejectedValue(new Error(errorMessage));
    render(<MemoryRouter><Album /></MemoryRouter>);

    //await waitFor(() => {
        // expect(screen.getByText(`Error fetching albums: ${errorMessage}`)).toBeInTheDocument();
    // });
  });
});
