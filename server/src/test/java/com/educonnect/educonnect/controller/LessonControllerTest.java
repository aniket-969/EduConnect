package com.educonnect.educonnect.controller;

import com.educonnect.educonnect.entity.Lesson;
import com.educonnect.educonnect.service.LessonService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;

import org.springframework.http.ResponseEntity;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class LessonControllerTest {

    @Mock
    private LessonService lessonService;

    @InjectMocks
    private LessonController lessonController;

    private UUID courseId;
    private UUID lessonId;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        courseId = UUID.randomUUID();
        lessonId = UUID.randomUUID();
    }

    @Test
    void getLessonsByCourse_ShouldReturnLessonsList() {
        Lesson lesson = new Lesson();
        lesson.setId(UUID.randomUUID());
        lesson.setTitle("Intro to Java");

        when(lessonService.getLessonsByCourse(courseId)).thenReturn(List.of(lesson));

        ResponseEntity<List<Lesson>> response = lessonController.getLessonsByCourse(courseId);
        assertEquals(200, response.getStatusCodeValue());
        assertEquals(1, response.getBody().size());
        assertEquals("Intro to Java", response.getBody().get(0).getTitle());
    }

    @Test
    void getLessonById_ShouldReturnLesson_WhenExists() {
        Lesson lesson = new Lesson();
        lesson.setId(lessonId);
        lesson.setTitle("Lesson 1");

        when(lessonService.getLessonById(lessonId)).thenReturn(lesson);

        ResponseEntity<Lesson> response = lessonController.getLessonById(lessonId);
        assertEquals(200, response.getStatusCodeValue());
        assertEquals("Lesson 1", response.getBody().getTitle());
    }

    @Test
    void getLessonById_ShouldReturnNotFound_WhenDoesNotExist() {
        when(lessonService.getLessonById(lessonId)).thenReturn(null);

        ResponseEntity<Lesson> response = lessonController.getLessonById(lessonId);
        assertEquals(404, response.getStatusCodeValue());
    }

    @Test
    void addLesson_ShouldReturnSavedLesson() {
        Lesson newLesson = new Lesson();
        newLesson.setTitle("Spring Boot Basics");

        when(lessonService.addLesson(newLesson)).thenReturn(newLesson);

        ResponseEntity<Lesson> response = lessonController.addLesson(newLesson);
        assertEquals(200, response.getStatusCodeValue());
        assertEquals("Spring Boot Basics", response.getBody().getTitle());
    }
}
