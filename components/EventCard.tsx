
import React from 'react';
import { Link } from 'react-router-dom';
import { Event } from '../types';
import { CalendarIcon, MapPinIcon, TicketIcon } from './icons';
import { useDatabase } from '../context/DatabaseContext';


interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const { getTicketCountForEvent } = useDatabase();
  const ticketCount = getTicketCountForEvent(event.id);
  const ticketsLeft = event.totalTickets - ticketCount;
  
  return (
    <div className="bg-card rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col">
      <div className="relative">
        <img className="w-full h-48 object-cover" src={event.imageUrl} alt={event.name} />
        <div className="absolute top-2 right-2 bg-secondary/80 text-white text-xs font-bold px-2 py-1 rounded-full backdrop-blur-sm">
          ${event.price.toFixed(2)}
        </div>
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-text mb-2 leading-tight">{event.name}</h3>
        <div className="space-y-2 text-sm text-muted mb-4">
          <div className="flex items-center">
            <CalendarIcon className="w-4 h-4 mr-2 flex-shrink-0" />
            <span>{new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
          <div className="flex items-center">
            <MapPinIcon className="w-4 h-4 mr-2 flex-shrink-0" />
            <span>{event.location}</span>
          </div>
        </div>
        <div className="mt-auto">
          <div className="flex justify-between items-center text-sm text-muted mb-3">
              <div className="flex items-center">
                <TicketIcon className="w-4 h-4 mr-1 text-secondary"/>
                <span>{ticketsLeft} / {event.totalTickets} left</span>
              </div>
              <div className="w-24 h-2 bg-gray-200 rounded-full">
                <div className="h-2 bg-secondary rounded-full" style={{ width: `${(ticketsLeft/event.totalTickets)*100}%` }}></div>
              </div>
          </div>
          <Link
            to={`/event/${event.id}`}
            className="w-full text-center block bg-primary text-white font-semibold py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors duration-300"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
