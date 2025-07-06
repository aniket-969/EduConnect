package com.educonnect.educonnect.service;

import com.educonnect.educonnect.entity.Course;
import com.educonnect.educonnect.entity.Lesson;
import com.educonnect.educonnect.dao.CourseRepository;
import com.educonnect.educonnect.dao.LessonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class LessonService {

    @Autowired
    private LessonRepository lessonRepository;

    @Autowired
    private CourseRepository courseRepository;

    // Get all lessons of a course
    public List<Lesson> getLessonsByCourse(UUID courseId) {
        Course course = courseRepository.findById(courseId).orElse(null);
        return course != null ? lessonRepository.findByCourse(course) : List.of();
    }

    // Get lesson by ID
    public Lesson getLessonById(UUID id) {
        return lessonRepository.findById(id).orElse(null);
    }

    // Add new lesson
    public Lesson addLesson(Lesson lesson) {
        // Optional: validate if course exists before saving
        UUID courseId = lesson.getCourse().getId();
        if (courseId != null && courseRepository.existsById(courseId)) {
            return lessonRepository.save(lesson);
        }
        return null;
    }

    // Update existing lesson (optional)
    public Lesson updateLesson(UUID id, Lesson updatedLesson) {
        return lessonRepository.findById(id).map(existingLesson -> {
            existingLesson.setTitle(updatedLesson.getTitle());
            existingLesson.setContent(updatedLesson.getContent());
            existingLesson.setContentType(updatedLesson.getContentType());
            existingLesson.setSequence(updatedLesson.getSequence());
            existingLesson.setThumbnailUrl(updatedLesson.getThumbnailUrl());
            return lessonRepository.save(existingLesson);
        }).orElse(null);
    }

    // Delete lesson (optional)
    public boolean deleteLesson(UUID id) {
        if (lessonRepository.existsById(id)) {
            lessonRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
