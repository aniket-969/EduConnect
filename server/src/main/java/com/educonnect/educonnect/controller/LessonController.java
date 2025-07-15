package com.educonnect.educonnect.controller;

import com.educonnect.educonnect.entity.Lesson;
import com.educonnect.educonnect.service.LessonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/lessons")
@CrossOrigin(origins = "*")
public class LessonController {

    @Autowired
    private LessonService lessonService;

    // READ: Get lessons by course ID (accessible by INSTRUCTOR and STUDENT)
    @PreAuthorize("hasAnyRole('INSTRUCTOR', 'STUDENT')")
    @GetMapping("/course/{courseId}")
    public ResponseEntity<List<Lesson>> getLessonsByCourse(@PathVariable UUID courseId) {
        List<Lesson> lessons = lessonService.getLessonsByCourse(courseId);
        return ResponseEntity.ok(lessons);
    }

    // READ: Get lesson by lesson ID (accessible by INSTRUCTOR and STUDENT)
    @PreAuthorize("hasAnyRole('INSTRUCTOR', 'STUDENT')")
    @GetMapping("/{id}")
    public ResponseEntity<Lesson> getLessonById(@PathVariable UUID id) {
        Lesson lesson = lessonService.getLessonById(id);
        return lesson != null ? ResponseEntity.ok(lesson) : ResponseEntity.notFound().build();
    }

    // CREATE: Add a lesson (only for INSTRUCTOR)
    @PreAuthorize("hasRole('INSTRUCTOR')")
    @PostMapping("/add")
    public ResponseEntity<Lesson> addLesson(@RequestBody Lesson lesson) {
        Lesson savedLesson = lessonService.addLesson(lesson);
        return ResponseEntity.ok(savedLesson);
    }
}
