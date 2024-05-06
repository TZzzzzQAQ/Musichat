import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import ArtistPage from '../Artist.jsx';
import { searchAPI } from '@/apis/everyoneDataAPI';
import ImageCard from '@/components/ImageCard.jsx';

// Function to generate random artist data
const generateRandomArtists = (numArtists = 5) => ({
  artists: {
    items: Array.from({ length: numArtists }, (_, i) => ({
      id: `${i + 1}`,
      name: `Artist ${i + 1}`,
    })),
  },
});

// Mock the searchAPI
vi.mock('@/apis/everyoneDataAPI', () => ({
  searchAPI: vi.fn(),
}));

describe('ArtistPage', () => {
  beforeEach(() => {
    // Use the dynamic random generator function in the mock implementation
    searchAPI.mockImplementation(() => Promise.resolve(generateRandomArtists(Math.floor(Math.random() * 10 + 1))));
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should render a variable number of artist cards', async () => {
    render(<ArtistPage />, { wrapper: MemoryRouter });

    // Verify API was called once
    expect(searchAPI).toHaveBeenCalledTimes(1);

    // Since the number of artists is random, we test if at least one artist is rendered
    // You could enhance this by checking if the count matches the mock's return
    const artistCards = await screen.findAllByRole('link');
    expect(artistCards.length).toBeGreaterThan(0);
  });

  it('should handle API errors gracefully', async () => {
    searchAPI.mockRejectedValue(new Error('API Error'));

    render(<ArtistPage />, { wrapper: MemoryRouter });

    // No artist cards should be rendered if the API fails
    const artistCards = await screen.queryAllByRole('link');
    expect(artistCards.length).toBe(0);
  });
});
