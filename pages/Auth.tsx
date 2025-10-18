
import React from 'react';
import { SignIn, SignUp } from '@clerk/clerk-react';

interface AuthPageProps {
  mode: 'sign-in' | 'sign-up';
}

const Auth: React.FC<AuthPageProps> = ({ mode }) => {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-64px)] bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        {mode === 'sign-in' ? (
          // Fix: Removed `path` and `routing` props, as they are not needed with react-router-dom integration.
          <SignIn signUpUrl="/sign-up" />
        ) : (
          // Fix: Removed `path` and `routing` props, as they are not needed with react-router-dom integration.
          <SignUp signInUrl="/sign-in" />
        )}
      </div>
    </div>
  );
};

export default Auth;