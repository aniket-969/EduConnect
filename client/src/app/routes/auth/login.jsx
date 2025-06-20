
import LoginForm from "@/components/form/auth/loginForm";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Link } from "react-router-dom";

const Login = () => {
  return (
     <div className="min-h-screen bg-background flex items-center justify-center">
      <Card className="backdrop-blur-md rounded-2xl shadow-lg w-full max-w-md">
        <CardHeader className="pt-8 text-center">
          <CardTitle className="text-2xl font-semibold">
            Welcome Back
          </CardTitle>
        </CardHeader>

        <CardContent className="px-8 pb-4">
          <LoginForm />
        </CardContent>

        <CardFooter className="pb-8 text-center">
          <p className="text-sm text-muted">
            New here?{' '}
            <Link to="/auth/register" className="text-secondary hover:underline">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
