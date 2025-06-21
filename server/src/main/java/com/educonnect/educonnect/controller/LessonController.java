package com.educonnect.educonnect.controller;

import com.educonnect.educonnect.entity.Lesson;
import com.educonnect.educonnect.entity.Course;
import com.educonnect.educonnect.dao.LessonRepository;
import com.educonnect.educonnect.dao.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/lessons")
public class LessonController {

    @Autowired
    private LessonRepository lessonRepository;

    @Autowired
    private CourseRepository courseRepository;

    @GetMapping("/course/{courseId}")
    public List<Lesson> getLessonsByCourse(@PathVariable Long courseId) {
        Course course = courseRepository.findById(courseId).orElse(null);
        return lessonRepository.findByCourse(course);
    }

    @PostMapping("/add")
    public String addLesson(@RequestBody Lesson lesson) {
        lessonRepository.save(lesson);
        return "Lesson added successfully";
    }

    @GetMapping("/{id}")
    public Lesson getLessonById(@PathVariable Long id) {
        return lessonRepository.findById(id).orElse(null);
    }
}
