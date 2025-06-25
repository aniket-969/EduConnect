import CarouselBanner from "@/components/student/dashboard/carouselBanner"
import MyLearning from "@/components/student/dashboard/myLearning"
import ProfileHeader from "@/components/student/dashboard/profileHeader"
import RecommendedCourses from "@/components/student/dashboard/recommendedCourses"

const StudenDashboard = () => {
  console.log("here in student") 
  return ( 
    <div>
      <ProfileHeader/>
      <CarouselBanner/>
      <MyLearning/>
      <RecommendedCourses/>
    </div>
  )
}

export default StudenDashboard