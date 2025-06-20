
import LoginForm from "@/components/form/auth/loginForm";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Link } from "react-router-dom";

const Login = () => {
  return (
     <div className="min-h-screen bg-background flex items-center justify-center px-4">
  <Card className="backdrop-blur-md rounded-2xl shadow-lg w-full max-w-sm sm:max-w-md ">
    <CardHeader className="pt-6 sm:pt-8 text-center px-4 sm:px-8">
      <CardTitle className="text-xl sm:text-2xl font-semibold">
        Welcome Back
      </CardTitle>
    </CardHeader>

    <CardContent className="px-4 sm:px-8 pb-6 sm:pb-8">
      <LoginForm />
    </CardContent>

    <CardFooter className="pb-6 sm:pb-8 text-center px-4 sm:px-8">
      <p className="text-sm">
        New here?{' '}
        <Link href="/auth/register" className="text-secondary hover:underline">
          Sign up
        </Link>
      </p>
    </CardFooter>
  </Card>
</div>

  );
};

export default Login;
