import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroImg from "@/assets/Hero.svg"; 
import { HashLink } from 'react-router-hash-link';


const HeroSection = () => {
  return (
    <section className="bg-background text-foreground py-10 sm:py-20 px-4 ">
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-12">
        
        {/* Left Text Section */}
        <div className="text-center md:text-left space-y-6 md:w-1/2">
          <h1 className="text-3xl sm:text-4xl font-bold leading-tight">
            Empower your <span className="text-primary">Learning</span> Journey
          </h1>
          <h2 className="text-lg sm:text-xl text-muted-foreground">
            Connect with top <span className="text-secondary">Instructors</span> & master new skills.
          </h2>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
            <HashLink smooth to="/#popular-courses" className="w-full sm:w-42">
            
              <Button size="lg" className="w-full sm:w-42">Explore Courses</Button>
          
            </HashLink>
            <Link to="/auth/register" className="w-full sm:w-42">
              <Button variant="outline" size="lg" className="w-full sm:w-42">
                Get Started
              </Button>
            </Link>
          </div>
        </div>

        {/* Right Image Section */}
        <div className="md:w-1/2 flex justify-center">
          <img
            src={heroImg}
            alt="Learning Illustration"
className="w-4/5 max-w-xs sm:max-w-sm md:max-w-lg"          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
