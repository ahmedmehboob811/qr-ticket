
import { Event } from './types';

export const ORGANIZER_EMAIL = 'organizer.eventhive@example.com';

export const MOCK_EVENTS: Event[] = [
  {
    id: 'evt-1',
    name: 'Starlight Music Festival',
    date: '2024-08-15T18:00:00Z',
    location: 'Meadowbrook Park, CA',
    description: 'An unforgettable night under the stars with the world\'s top DJs and live bands. Experience music, art, and community.',
    price: 75.00,
    totalTickets: 5000,
    imageUrl: 'https://picsum.photos/seed/music/600/400',
    organizerId: 'user_organizer_123',
  },
  {
    id: 'evt-2',
    name: 'Tech Innovators Conference 2024',
    date: '2024-09-22T09:00:00Z',
    location: 'Grand Convention Center, NY',
    description: 'Join industry leaders and visionaries to explore the future of technology, from AI to quantum computing.',
    price: 199.99,
    totalTickets: 1500,
    imageUrl: 'https://picsum.photos/seed/tech/600/400',
    organizerId: 'user_organizer_123',
  },
  {
    id: 'evt-3',
    name: 'Artisan Food & Wine Fair',
    date: '2024-10-05T12:00:00Z',
    location: 'Vineyard Estates, Napa Valley',
    description: 'A culinary journey featuring local artisans, gourmet food tastings, and exquisite wine pairings. A delight for the senses.',
    price: 50.00,
    totalTickets: 800,
    imageUrl: 'https://picsum.photos/seed/food/600/400',
    organizerId: 'user_organizer_123',
  },
  {
    id: 'evt-4',
    name: 'City Marathon Challenge',
    date: '2024-11-10T07:00:00Z',
    location: 'Downtown Metropolis',
    description: 'Push your limits in the annual City Marathon. A scenic route through the heart of the city, open to all skill levels.',
    price: 45.00,
    totalTickets: 10000,
    imageUrl: 'https://picsum.photos/seed/marathon/600/400',
    organizerId: 'user_organizer_123',
  },
];
