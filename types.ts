export interface Event {
  id: string;
  name: string;
  date: string;
  location: string;
  description: string;
  price: number;
  totalTickets: number;
  imageUrl: string;
  organizerId: string;
}

export interface Ticket {
  id: string;
  eventId: string;
  userId: string;
  userName: string;
  userEmail: string;
  purchaseDate: string;
  validated: boolean;
}
