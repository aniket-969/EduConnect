import LoginForm from "@/components/form/auth/loginForm";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";
const Login = () => {
  return (
    <div className="min-h-screen bg-background relative">
      
      <Link
        to="/"
        className="flex items-center gap-3 text-primary font-bold text-xl absolute top-4 left-6 sm:left-30"
      >
        <img src={logo} alt="Logo" className="h-8 w-8" />
        <span className="text-2xl font-bold text-primary">EduConnect</span>{" "}
      </Link>
      <div className="flex items-center justify-center min-h-screen px-4">
        <Card className="backdrop-blur-md rounded-2xl shadow-lg w-full max-w-sm sm:max-w-md ">
          <CardHeader className="pt-6 sm:pt-8 text-center px-4 sm:px-8">
            <CardTitle className="text-xl sm:text-2xl font-semibold text-primary">
              Welcome Back
            </CardTitle>
          </CardHeader>

          <CardContent className="px-4 sm:px-8 pb-2">
            <LoginForm />
          </CardContent>

          <CardFooter className="pb-6 sm:pb-8 text-center px-4 sm:px-8">
            <p className="text-sm text-muted">
              New here?{" "}
              <Link
                to="/auth/register"
                className="text-secondary hover:underline"
              >
                Sign up
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;
