
import React, { useState } from 'react';
import { useDatabase } from '../context/DatabaseContext';

const Dashboard: React.FC = () => {
  const { events, getTicketsForEvent } = useDatabase();
  const [selectedEventId, setSelectedEventId] = useState<string | null>(events[0]?.id || null);

  const selectedEvent = events.find(e => e.id === selectedEventId);
  const attendees = selectedEvent ? getTicketsForEvent(selectedEvent.id) : [];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-extrabold text-text mb-8">Organizer Dashboard</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-card rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-text mb-4">Your Events</h2>
            <ul className="space-y-2">
              {events.map(event => (
                <li key={event.id}>
                  <button
                    onClick={() => setSelectedEventId(event.id)}
                    className={`w-full text-left p-3 rounded-lg transition-colors text-sm ${
                      selectedEventId === event.id
                        ? 'bg-primary/10 text-primary font-semibold'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    {event.name}
                    <span className="block text-xs text-muted">
                      {getTicketsForEvent(event.id).length} / {event.totalTickets} attendees
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="lg:col-span-2">
          {selectedEvent ? (
            <div className="bg-card rounded-xl shadow-lg">
              <div className="p-6 border-b">
                 <h2 className="text-xl font-bold text-text">Attendees for {selectedEvent.name}</h2>
                 <p className="text-sm text-muted mt-1">Total: {attendees.length} / {selectedEvent.totalTickets}</p>
              </div>
              <div className="overflow-x-auto">
                {attendees.length > 0 ? (
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Name</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Email</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {attendees.map(ticket => (
                        <tr key={ticket.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-text">{ticket.userName}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-muted">{ticket.userEmail}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                ticket.validated ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                            }`}>
                              {ticket.validated ? 'Checked In' : 'Not Checked In'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                    <div className="p-6 text-center text-muted">No attendees have booked for this event yet.</div>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-20 bg-card rounded-xl shadow-lg">
              <h2 className="text-xl font-bold">Select an event to see attendees.</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
