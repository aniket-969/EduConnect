import CarouselBanner from "@/components/student/dashboard/carouselBanner"
import MyLearning from "@/components/student/dashboard/myLearning"
import ProfileHeader from "@/components/student/dashboard/profileHeader"
import RecommendedCourses from "@/components/student/dashboard/recommendedCourses"
import { Spinner } from "@/components/ui/spinner"
import { useAuth } from "@/hooks/useAuth"
import { fakeCourses } from "@/data/fakeCourses"
import { Download } from "lucide-react"
 const studentSlides = [
{
    id: 'bedc6aeb-62a6-48d1-a8c3-187c075b1fe4_duwjd3.jpg',
    title: 'Skills that start careers',
    description:
      "Introducing Career Accelerators - focus on the skills and real-world experience that'll get you noticed.",
    ctaLabel: 'Explore All Career Accelerators',
    ctaHref: '/app/courses',
  },
  {
    id: '6ddba6b6-3e71-4b0f-a825-d76977d3d6a4_gspjyj.png',
    title: 'The latest in learning',
    description:
      'Stay on top of the skills you need. Courses as low as ₹479 through June 26.',
    ctaLabel: 'See Latest Courses',
    ctaHref: '/app/courses',
  },
]

const StudenDashboard = () => {
  const {session} = useAuth()
  if(session.isLoading) return <Spinner/>
  if(session.isError)return <>Something went wrong , please refresh</>
  // console.log(session.data) 
  const userId = session.data?.id
  return ( 
    <div className="w-full flex flex-col gap-6 ">
      <ProfileHeader user ={session?.data}/>
      <CarouselBanner slides={studentSlides}/>
      <MyLearning courses={fakeCourses} userId={userId}/>
      <RecommendedCourses courses={fakeCourses} userId={userId}/>
    </div>
  )
}

export default StudenDashboard