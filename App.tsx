
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ClerkProvider, SignedIn, SignedOut, useUser } from '@clerk/clerk-react';

import Header from './components/Header';
import Home from './pages/Home';
import EventDetail from './pages/EventDetail';
import MyTickets from './pages/MyTickets';
import Dashboard from './pages/Dashboard';
import Scan from './pages/Scan';
import Auth from './pages/Auth';
import { DatabaseProvider } from './context/DatabaseContext';
import { ORGANIZER_EMAIL } from './constants';

const clerkPubKey = 'pk_test_aW5mb3JtZWQtbXVzdGFuZy00Ni5jbGVyay5hY2NvdW50cy5kZXYk';

// Fix: Replaced incorrect <Protect> usage with a component using the useUser hook for authorization.
// The <Protect> component's `condition` prop doesn't get the full user object, and role/permission/condition props are mutually exclusive.
const OrganizerProtect = ({ children }: { children: React.ReactNode }) => {
  const { isLoaded, user } = useUser();

  if (!isLoaded) {
    return null; // Or a loading spinner while user is being checked
  }

  const isOrganizer = user?.primaryEmailAddress?.emailAddress === ORGANIZER_EMAIL;

  if (isOrganizer) {
    return <>{children}</>;
  }

  return <Navigate to="/" />;
};

function App() {
  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <DatabaseProvider>
        <HashRouter>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/event/:id" element={<EventDetail />} />
                
                {/* Signed In Routes */}
                <Route path="/my-tickets" element={<SignedIn><MyTickets /></SignedIn>} />

                {/* Organizer Routes */}
                <Route path="/dashboard" element={<SignedIn><OrganizerProtect><Dashboard /></OrganizerProtect></SignedIn>} />
                <Route path="/scan" element={<SignedIn><OrganizerProtect><Scan /></OrganizerProtect></SignedIn>} />

                {/* Auth Routes */}
                <Route path="/sign-in" element={<SignedOut><Auth mode="sign-in" /></SignedOut>} />
                <Route path="/sign-up" element={<SignedOut><Auth mode="sign-up" /></SignedOut>} />

                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </main>
          </div>
        </HashRouter>
      </DatabaseProvider>
    </ClerkProvider>
  );
}

export default App;