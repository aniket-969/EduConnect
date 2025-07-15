import { Link } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';
import { Button } from "@/components/ui/button";
import {  useState } from "react";
import { Menu, X } from "lucide-react"; // hamburger and close icons
import logo from "@/assets/logo.png"; 

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all bg-background border-b border-border shadow-[0_2px_8px_rgba(255,255,255,0.08)]`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-0">
        {/* Logo + Brand */}
        <Link to="/" className="flex items-center gap-3 text-primary font-bold text-xl">
          <img src={logo} alt="Logo" className="h-8 w-8" />
          <span className="text-2xl font-bold text-primary">EduConnect</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          <HashLink smooth to="/#home" className="text-md hover:text-primary">
            Home
          </HashLink>
          <HashLink smooth to="/#popular-courses"className="text-md hover:text-primary">
            Courses
          </HashLink>
          <Link to="/auth/login">
            <Button variant="outline" size="sm" className="w-18">
              Log in
            </Button>
          </Link>
          <Link to="/auth/register" className="w-24">
            <Button size="sm">Sign up</Button>
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      
      {menuOpen && (
  <div className="md:hidden absolute right-4 top-[64px] z-40">
    <div className="bg-card rounded-lg border shadow-md p-4 w-60 space-y-3">
  <Link
        to="/"
        onClick={toggleMenu}
        className="block text-sm px-4 py-2 rounded hover:bg-muted"
      >
        Home
      </Link>
      <Link
        to="/courses"
        onClick={toggleMenu}
        className="block text-sm px-4 py-2 rounded hover:bg-muted"
      >
        Courses
      </Link>
      <Link
        to="/auth/login"
        onClick={toggleMenu}
        className="block text-sm px-4 py-2 rounded hover:bg-muted"
      >
        Log in
      </Link>
      <Link
        to="/auth/register"
        onClick={toggleMenu}
        className="block text-sm px-4 py-2 rounded hover:bg-muted"
      >
        Sign up
      </Link>
    </div>
  </div>
)}

    </header>
  );
};

export default Navbar;
