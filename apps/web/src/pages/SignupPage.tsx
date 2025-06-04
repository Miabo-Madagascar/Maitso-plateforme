import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf } from 'lucide-react';
import SignupForm from '../components/authentication/SignupForm';

const SignupPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link to="/" className="flex items-center justify-center gap-2">
          <Leaf className="h-12 w-12 text-green-600 dark:text-green-500" />
        </Link>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
          Créez votre compte
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          Ou{' '}
          <Link to="/login" className="font-medium text-green-600 hover:text-green-700 dark:text-green-500 dark:hover:text-green-400">
            connectez-vous à votre compte existant
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <SignupForm />
        </div>
      </div>
    </div>
  );
};

export default SignupPage;