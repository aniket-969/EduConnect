import React from 'react'
import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import PopularCourses from "@/components/landing/PopularCourses";
import Footer from "@/components/landing/Footer";

const LandingPage = () => {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <Navbar />
      <main className="pt-16"> 
        <section id="home">
        <HeroSection />
        </section>
        <section id="popular-courses">
        <PopularCourses />
        </section>
      </main>
      <Footer /> 
    </div>
  )
}

export default LandingPage