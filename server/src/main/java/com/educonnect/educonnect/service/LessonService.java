package com.educonnect.educonnect.service;

import com.educonnect.educonnect.entity.Course;
import com.educonnect.educonnect.entity.Lesson;
import com.educonnect.educonnect.dao.CourseRepository;
import com.educonnect.educonnect.dao.LessonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LessonService {

    @Autowired
    private LessonRepository lessonRepository;

    @Autowired
    private CourseRepository courseRepository;

    public List<Lesson> getLessonsByCourse(Long courseId) {
        Course course = courseRepository.findById(courseId).orElse(null);
        return lessonRepository.findByCourse(course);
    }

    public Lesson getLessonById(Long id) {
        return lessonRepository.findById(id).orElse(null);
    }

    public Lesson addLesson(Lesson lesson) {
        return lessonRepository.save(lesson);
    }
}
