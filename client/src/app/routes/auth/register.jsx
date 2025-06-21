import React from 'react';
import RegisterForm from '@/components/form/auth/registerForm';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <Card className="backdrop-blur-md rounded-2xl shadow-lg w-full max-w-sm sm:max-w-md ">
        <CardHeader className="pt-6 sm:pt-8 text-center px-4 sm:px-8">
          <CardTitle className="text-xl sm:text-2xl font-semibold text-primary">
            Create Account
          </CardTitle>
        </CardHeader>

        <CardContent className="px-4 sm:px-8 pb-6 sm:pb-8">
          <RegisterForm />
        </CardContent>

        <CardFooter className="pb-6 sm:pb-8 text-center px-4 sm:px-8">
          <p className="text-sm text-muted">
            Already have an account?{' '}
            <Link to="/auth/login" className="text-secondary hover:underline">
              Log in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RegisterPage;
