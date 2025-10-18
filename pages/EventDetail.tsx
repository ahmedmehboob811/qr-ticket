
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDatabase } from '../context/DatabaseContext';
import { CalendarIcon, MapPinIcon, TicketIcon } from '../components/icons';
import { useUser, useClerk } from '@clerk/clerk-react';

const EventDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getEventById, bookTicket, getTicketCountForEvent } = useDatabase();
  const { isSignedIn, user } = useUser();
  // Fix: `openSignIn` is available on the `useClerk` hook, not `useAuth`.
  const { openSignIn } = useClerk();
  
  const event = id ? getEventById(id) : undefined;
  const [ticketCount, setTicketCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (event) {
      setTicketCount(getTicketCountForEvent(event.id));
    }
  }, [event, getTicketCountForEvent]);

  if (!event) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">Event not found</h2>
        <button onClick={() => navigate('/')} className="mt-4 px-4 py-2 bg-primary text-white rounded-lg">
          Back to Events
        </button>
      </div>
    );
  }

  const handleBookTicket = () => {
    if (!isSignedIn || !user) {
        openSignIn();
        return;
    }
    setIsLoading(true);
    setTimeout(() => { // Simulate network delay
        const newTicket = bookTicket(event.id, user.id, user.fullName || 'N/A', user.primaryEmailAddress?.emailAddress || 'N/A');
        if (newTicket) {
            alert('Ticket booked successfully!');
            navigate('/my-tickets');
        }
        setIsLoading(false);
    }, 1000);
  };

  const ticketsLeft = event.totalTickets - ticketCount;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-card rounded-2xl shadow-xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <img src={event.imageUrl} alt={event.name} className="w-full h-64 md:h-full object-cover"/>
          <div className="p-8 flex flex-col">
            <h1 className="text-3xl lg:text-4xl font-extrabold text-text mb-3">{event.name}</h1>
            <div className="flex items-center text-secondary font-bold text-2xl mb-4">
              ${event.price.toFixed(2)}
            </div>
            <div className="space-y-3 text-muted mb-6">
              <div className="flex items-center">
                <CalendarIcon className="w-5 h-5 mr-3"/>
                <span>{new Date(event.date).toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' })}</span>
              </div>
              <div className="flex items-center">
                <MapPinIcon className="w-5 h-5 mr-3"/>
                <span>{event.location}</span>
              </div>
            </div>
            <p className="text-text mb-8 flex-grow">{event.description}</p>
            
            <div className="mb-6">
                <div className="flex justify-between items-center text-sm text-muted mb-2">
                    <div className="flex items-center">
                        <TicketIcon className="w-5 h-5 mr-2 text-secondary"/>
                        <span className="font-medium">{ticketsLeft} tickets remaining</span>
                    </div>
                    <span className="font-medium">{Math.round((ticketsLeft / event.totalTickets) * 100)}% Available</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-secondary h-2.5 rounded-full" style={{ width: `${(ticketsLeft/event.totalTickets)*100}%` }}></div>
                </div>
            </div>

            <button 
                onClick={handleBookTicket}
                disabled={isLoading || ticketsLeft <= 0}
                className="w-full py-3 px-6 bg-primary text-white font-bold rounded-lg text-lg hover:bg-primary/90 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : ticketsLeft > 0 ? 'Book Your Ticket' : 'Sold Out'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;