
import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';
import { Event, Ticket } from '../types';
import { MOCK_EVENTS } from '../constants';

interface DatabaseContextType {
  events: Event[];
  tickets: Ticket[];
  getEventById: (id: string) => Event | undefined;
  getTicketsForEvent: (eventId: string) => Ticket[];
  getTicketsForUser: (userId: string) => Ticket[];
  bookTicket: (eventId: string, userId: string, userName: string, userEmail: string) => Ticket | null;
  validateTicket: (ticketId: string) => boolean;
  getTicketCountForEvent: (eventId: string) => number;
}

const DatabaseContext = createContext<DatabaseContextType | undefined>(undefined);

export const DatabaseProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [events] = useState<Event[]>(MOCK_EVENTS);
  const [tickets, setTickets] = useState<Ticket[]>([]);

  const getEventById = useCallback((id: string) => events.find(event => event.id === id), [events]);
  
  const getTicketCountForEvent = useCallback((eventId: string) => {
    return tickets.filter(ticket => ticket.eventId === eventId).length;
  }, [tickets]);

  const bookTicket = useCallback((eventId: string, userId: string, userName: string, userEmail: string): Ticket | null => {
    const event = getEventById(eventId);
    if (!event) return null;

    const currentTicketCount = getTicketCountForEvent(eventId);
    if (currentTicketCount >= event.totalTickets) {
      alert('Sorry, this event is sold out!');
      return null;
    }

    const existingTicket = tickets.find(t => t.eventId === eventId && t.userId === userId);
    if (existingTicket) {
      alert('You have already booked a ticket for this event.');
      return existingTicket;
    }

    const newTicket: Ticket = {
      id: `tkt-${eventId}-${userId}-${Date.now()}`,
      eventId,
      userId,
      userName,
      userEmail,
      purchaseDate: new Date().toISOString(),
      validated: false,
    };

    setTickets(prevTickets => [...prevTickets, newTicket]);
    return newTicket;
  }, [getEventById, getTicketCountForEvent, tickets]);

  const getTicketsForEvent = useCallback((eventId: string) => {
    return tickets.filter(ticket => ticket.eventId === eventId);
  }, [tickets]);

  const getTicketsForUser = useCallback((userId: string) => {
    return tickets.filter(ticket => ticket.userId === userId);
  }, [tickets]);

  const validateTicket = useCallback((ticketId: string) => {
    let isValid = false;
    setTickets(prevTickets =>
      prevTickets.map(ticket => {
        if (ticket.id === ticketId && !ticket.validated) {
          isValid = true;
          return { ...ticket, validated: true };
        }
        return ticket;
      })
    );
    return isValid;
  }, []);

  const value = {
    events,
    tickets,
    getEventById,
    getTicketsForEvent,
    getTicketsForUser,
    bookTicket,
    validateTicket,
    getTicketCountForEvent,
  };

  return <DatabaseContext.Provider value={value}>{children}</DatabaseContext.Provider>;
};

export const useDatabase = () => {
  const context = useContext(DatabaseContext);
  if (context === undefined) {
    throw new Error('useDatabase must be used within a DatabaseProvider');
  }
  return context;
};
