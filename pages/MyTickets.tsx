import React from 'react';
import { useDatabase } from '../context/DatabaseContext';
import { useUser } from '@clerk/clerk-react';
import TicketQRCode from '../components/TicketQRCode';
import { CalendarIcon, MapPinIcon, TicketIcon } from '../components/icons';
import { Link } from 'react-router-dom';

const MyTickets: React.FC = () => {
  const { getTicketsForUser, getEventById } = useDatabase();
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <div className="text-center py-20">
        <p>Loading your tickets...</p>
      </div>
    );
  }

  if (!user) {
    return (
        <div className="text-center py-20">
            <h2 className="text-2xl font-bold">Please sign in</h2>
            <p className="text-muted mt-2">You need to be signed in to view your tickets.</p>
        </div>
    );
  }

  const userTickets = getTicketsForUser(user.id);

  if (userTickets.length === 0) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <TicketIcon className="w-16 h-16 mx-auto text-gray-300" />
        <h2 className="mt-6 text-2xl font-bold text-text">No Tickets Yet</h2>
        <p className="mt-2 text-muted">You haven't booked any tickets. Explore our events to find your next experience!</p>
        <Link to="/" className="mt-6 inline-block bg-primary text-white font-semibold py-3 px-6 rounded-lg hover:bg-primary/90 transition-colors">
          Browse Events
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl font-extrabold text-text mb-8">My Tickets</h1>
            <div className="space-y-8">
                {userTickets.map(ticket => {
                const event = getEventById(ticket.eventId);
                if (!event) {
                    return (
                        <div key={ticket.id} className="bg-card rounded-2xl shadow-lg p-6 text-center">
                            <p className="text-red-500 font-semibold">Could not find event details for this ticket.</p>
                        </div>
                    );
                }

                return (
                    <div key={ticket.id} className="bg-card rounded-2xl shadow-lg overflow-hidden md:flex transition-shadow hover:shadow-xl">
                        <div className="md:w-1/3">
                            <img className="w-full h-48 md:h-full object-cover" src={event.imageUrl} alt={event.name} />
                        </div>
                        <div className="p-6 md:w-2/3 flex flex-col md:flex-row gap-6">
                            <div className="flex-grow">
                                <span className="text-sm font-semibold text-primary">{event.name}</span>
                                <h2 className="text-2xl font-bold text-text mt-1 mb-3">{ticket.userName}'s Ticket</h2>
                                <div className="space-y-2 text-sm text-muted mb-4">
                                    <div className="flex items-center">
                                        <CalendarIcon className="w-4 h-4 mr-2 flex-shrink-0" />
                                        <span>{new Date(event.date).toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' })}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <MapPinIcon className="w-4 h-4 mr-2 flex-shrink-0" />
                                        <span>{event.location}</span>
                                    </div>
                                </div>
                                <div className="text-sm space-y-1">
                                    <p className="text-muted">Purchased: <span className="font-semibold text-text">{new Date(ticket.purchaseDate).toLocaleDateString()}</span></p>
                                    <p className="text-muted">Ticket ID: <span className="font-mono text-xs bg-gray-100 p-1 rounded">{ticket.id}</span></p>
                                </div>
                                <div className="mt-4">
                                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                        ticket.validated ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                                    }`}>
                                    {ticket.validated ? 'Checked In' : 'Valid for Entry'}
                                    </span>
                                </div>
                            </div>
                            <div className="md:w-48 flex-shrink-0 flex flex-col items-center justify-center text-center bg-gray-50 p-4 rounded-lg">
                                <TicketQRCode ticket={ticket} />
                                <p className="text-xs text-muted mt-2">Show this code at the event entrance.</p>
                            </div>
                        </div>
                    </div>
                );
                })}
            </div>
        </div>
    </div>
  );
};

export default MyTickets;
