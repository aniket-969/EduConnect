import React from "react";
import RegisterForm from "@/components/form/auth/registerForm";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const RegisterPage = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <Link
        to="/"
        className="flex items-center gap-3 text-primary font-bold text-xl absolute top-4 left-6 sm:left-30"
      >
        <img src={logo} alt="Logo" className="h-8 w-8" />
        <span className="text-2xl font-bold text-primary">EduConnect</span>{" "}
      </Link>
      <div className="flex items-center justify-center min-h-[80vh] px-4  pb-10 pt-15 sm:pt-20">
        <Card className="backdrop-blur-md rounded-2xl shadow-lg w-full max-w-sm sm:max-w-md ">
          <CardHeader className="pt-2 text-center px-4 sm:px-8">
            <CardTitle className="text-xl sm:text-2xl font-semibold text-primary">
              Create Account
            </CardTitle>
          </CardHeader>

          <CardContent className="px-4 sm:px-8 pb-2 ">
            <RegisterForm />
          </CardContent>

          <CardFooter className="pb-2 text-center px-4 sm:px-8">
            <p className="text-sm text-muted">
              Already have an account?{" "}
              <Link to="/auth/login" className="text-secondary hover:underline">
                Log in
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default RegisterPage;
