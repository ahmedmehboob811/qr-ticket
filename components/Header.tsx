
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SignedIn, SignedOut, UserButton, useUser } from '@clerk/clerk-react';
import { ORGANIZER_EMAIL } from '../constants';
import { HomeIcon, TicketIcon, LayoutDashboardIcon, QrCodeIcon } from './icons';

const NavLink: React.FC<{ to: string; icon: React.ReactNode; children: React.ReactNode }> = ({ to, icon, children }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <Link
      to={to}
      className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
        isActive
          ? 'bg-primary/10 text-primary'
          : 'text-muted hover:bg-gray-100 hover:text-text'
      }`}
    >
      {icon}
      <span>{children}</span>
    </Link>
  );
};


const Header: React.FC = () => {
    const { user } = useUser();
    const isOrganizer = user?.primaryEmailAddress?.emailAddress === ORGANIZER_EMAIL;

  return (
    <header className="bg-card/80 backdrop-blur-lg border-b border-gray-200/50 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2 text-primary">
              <TicketIcon className="h-8 w-8" />
              <span className="text-xl font-bold text-text">EventHive</span>
            </Link>
            <nav className="hidden md:flex items-center space-x-2">
               <NavLink to="/" icon={<HomeIcon className="w-4 h-4"/>}>Events</NavLink>
                <SignedIn>
                    <NavLink to="/my-tickets" icon={<TicketIcon className="w-4 h-4" />}>My Tickets</NavLink>
                    {isOrganizer && (
                        <>
                            <NavLink to="/dashboard" icon={<LayoutDashboardIcon className="w-4 h-4" />}>Dashboard</NavLink>
                            <NavLink to="/scan" icon={<QrCodeIcon className="w-4 h-4" />}>Scan</NavLink>
                        </>
                    )}
                </SignedIn>
            </nav>
          </div>
          <div className="flex items-center">
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <SignedOut>
              <Link
                to="/sign-in"
                className="text-sm font-medium text-muted hover:text-primary transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/sign-up"
                className="ml-4 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Sign Up
              </Link>
            </SignedOut>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
