import CarouselBanner from "@/components/student/dashboard/carouselBanner"
import MyLearning from "@/components/student/dashboard/myLearning"
import ProfileHeader from "@/components/student/dashboard/profileHeader"
import RecommendedCourses from "@/components/student/dashboard/recommendedCourses"
import { Spinner } from "@/components/ui/spinner"
import { useAuth } from "@/hooks/useAuth"
import { fakeCourses } from "@/data/fakeCourses"

const StudenDashboard = () => {
  const {session} = useAuth()
  if(session.isLoading) return <Spinner/>
  if(session.isError)return <>Something went wrong , please refresh</>
  console.log("here in student") 
  return ( 
    <div className="w-full flex flex-col gap-6 ">
      <ProfileHeader user ={session.data}/>
      <CarouselBanner/>
      <MyLearning courses={fakeCourses} />
      <RecommendedCourses courses={fakeCourses}/>
    </div>
  )
}

export default StudenDashboard