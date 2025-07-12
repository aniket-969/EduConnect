
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { getLessonsByCourse, getLessonById, addLesson} from './../api/queries/lesson';

export function useLessonsByCourse(courseId) {
  return useQuery({
    queryKey: ['lessons', courseId],
    queryFn: () => getLessonsByCourse(courseId).then(res => res.data),
    enabled: Boolean(courseId),
    onError: err => {
      toast.error(err.response?.data?.message || 'Failed to load lessons')
    },
  })
}

export function useLesson(id) {
  return useQuery({
    queryKey: ['lesson', id],
    queryFn: () => getLessonById(id).then(res => res.data),
    enabled: Boolean(id),
    onError: err => {
      toast.error(err.response?.data?.message || 'Failed to load lesson')
    },
  })
}

export function useAddLesson() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: lesson => addLesson(lesson).then(res => res.data),
    onSuccess: created => {
      queryClient.invalidateQueries(['lessons', created.courseId])
      toast.success('Lesson added')
    },
    onError: err => {
      toast.error(err.response?.data?.message || 'Failed to add lesson')
    },
  })
}
