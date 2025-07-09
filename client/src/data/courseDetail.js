
export const courseDetailData = {
  // 1) Instructor (User)
  instructor: {
    id: "u123",
    name: "Jane Doe",
    email: "jane.doe@example.com",
    role: "INSTRUCTOR",
    avatarUrl: "https://i.pravatar.cc/100?img=5",
    bio: "Senior Front-End Engineer with 10 years of React and UI/UX experience.",
  },

  // 2) Course entity
 course: {
  id: "c101",
  title: "Mastering React",
  description: `Dive deep into React.js and learn how to build scalable, high-performance user interfaces. 
You’ll go from JSX basics to advanced hooks, context, and performance optimizations.`,
  category: "Web Development",
  status: "PUBLISHED",
  instructor: "u123",
  thumbnailUrl: "https://res.cloudinary.com/dni3ccfha/image/upload/c_fill,f_auto/bedc6aeb-62a6-48d1-a8c3-187c075b1fe4_duwjd3.jpg",
 
  slug: "mastering-react",
  learningObjectives: [
    "Understand JSX and how React renders elements",
    "Build and compose reusable components",
    "Manage component state and side effects with Hooks",
    "Fetch & display data from APIs using React Query",
    "Optimize React applications for performance"
  ],
  price: 999,       // in INR
  currency: "INR",
},

  // 3) Enrollment status
  enrollment: {
    id: "e202",
    student: "u456",                       // sample student ID
    course: "c101",
    completedLessonIds: ["l1", "l2"],      // lessons the student has finished
    enrolledAt: "",
  },

  // 4) Curriculum preview (Lesson entities)
  lessons: [
    {
      id: "l1",
      title: "JSX & Rendering Basics",
      contentType: "TEXT",
      content: "In this lesson, you’ll learn how JSX maps to React.createElement and how React renders to the DOM.",
      course: "c101",
      sequence: 1,
      thumbnailUrl: "https://via.placeholder.com/150?text=Lesson+1",
    },
    {
      id: "l2",
      title: "Components & Props",
      contentType: "VIDEO",
      content: "https://example.com/videos/components-and-props.mp4",
      course: "c101",
      sequence: 2,
      thumbnailUrl: "https://via.placeholder.com/150?text=Lesson+2",
    },
    {
      id: "l3",
      title: "State & Lifecycle",
      contentType: "VIDEO",
      content: "https://example.com/videos/state-and-lifecycle.mp4",
      course: "c101",
      sequence: 3,
      thumbnailUrl: "https://via.placeholder.com/150?text=Lesson+3",
    },
    {
      id: "l4",
      title: "Hooks: useState & useEffect",
      contentType: "TEXT",
      content: "Dive into the useState and useEffect hooks: how they work and common patterns.",
      course: "c101",
      sequence: 4,
      thumbnailUrl: "https://via.placeholder.com/150?text=Lesson+4",
    },
    {
      id: "l5",
      title: "Context API for Global State",
      contentType: "VIDEO",
      content: "https://example.com/videos/context-api.mp4",
      course: "c101",
      sequence: 5,
      thumbnailUrl: "https://via.placeholder.com/150?text=Lesson+5",
    },
    {
      id: "l6",
      title: "Building Forms & Handling Events",
      contentType: "TEXT",
      content: "Learn controlled vs uncontrolled components, validation, and form libraries.",
      course: "c101",
      sequence: 6,
      thumbnailUrl: "https://via.placeholder.com/150?text=Lesson+6",
    },
    {
      id: "l7",
      title: "Fetching Data with React Query",
      contentType: "VIDEO",
      content: "https://example.com/videos/react-query.mp4",
      course: "c101",
      sequence: 7,
      thumbnailUrl: "https://via.placeholder.com/150?text=Lesson+7",
    },
    {
      id: "l8",
      title: "Putting It All Together",
      contentType: "TEXT",
      content: "Final project: combine all concepts into a small dashboard app.",
      course: "c101",
      sequence: 8,
      thumbnailUrl: "https://via.placeholder.com/150?text=Lesson+8",
    },
  ],

  // 5) Ratings / Reviews (optional display on Course Detail)
  ratings: [
    {
      id: "r1",
      student: "u789",
      course: "c101",
      rating: 5,
      comment: "Excellent course—learned so much!",
    },
    {
      id: "r2",
      student: "u456",
      course: "c101",
      rating: 4,
      comment: "Great content but could use more real-world examples.",
    },
  ],
};
