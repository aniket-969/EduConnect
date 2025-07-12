
import api from "../axiosClient"

export function getLessonsByCourse(courseId) {
  if (!courseId) throw new Error('No courseId provided')
  return api.get(`/lessons/course/${courseId}`)
}


export function getLessonById(id) {
  if (!id) throw new Error('No lesson id provided')
  return api.get(`/lessons/${id}`)
}


export function addLesson(lesson) {
  if (!lesson) throw new Error('No lesson payload provided')
  return api.post(`/lessons/add`, lesson)
}
