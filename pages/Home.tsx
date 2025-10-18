
import React from 'react';
import { useDatabase } from '../context/DatabaseContext';
import EventCard from '../components/EventCard';

const Home: React.FC = () => {
  const { events } = useDatabase();

  return (
    <div className="min-h-screen bg-gray-50">
      <main>
        <div className="py-12 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-extrabold text-text sm:text-5xl md:text-6xl">
              Discover Your Next <span className="text-primary">Experience</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-muted sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Browse our curated selection of events, from music festivals to tech conferences. Your next adventure is just a click away.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-3xl font-bold text-text mb-8">Upcoming Events</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {events.map(event => (
                <EventCard key={event.id} event={event} />
            ))}
            </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
