package com.educonnect.educonnect.controller;

import com.educonnect.educonnect.entity.Enrollment;
import com.educonnect.educonnect.service.EnrollmentService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;

import org.springframework.http.ResponseEntity;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class EnrollmentControllerTest {

    @Mock
    private EnrollmentService enrollmentService;

    @InjectMocks
    private EnrollmentController enrollmentController;

    private UUID studentId;
    private UUID courseId;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        studentId = UUID.randomUUID();
        courseId = UUID.randomUUID();
    }

    @Test
    void enrollStudent_ShouldReturnSuccessMessage() {
        when(enrollmentService.enrollStudent(studentId, courseId)).thenReturn("Enrollment successful");

        ResponseEntity<String> response = enrollmentController.enrollStudent(studentId, courseId);
        assertEquals(200, response.getStatusCodeValue());
        assertEquals("Enrollment successful", response.getBody());
    }

    @Test
    void enrollStudent_ShouldReturnBadRequestOnFailure() {
        when(enrollmentService.enrollStudent(studentId, courseId)).thenReturn("Enrollment failed: Already enrolled");

        ResponseEntity<String> response = enrollmentController.enrollStudent(studentId, courseId);
        assertEquals(400, response.getStatusCodeValue());
        assertEquals("Enrollment failed: Already enrolled", response.getBody());
    }

    @Test
    void getEnrollmentsByStudent_ShouldReturnList_WhenFound() {
        Enrollment enrollment = new Enrollment();
        enrollment.setId(UUID.randomUUID());

        when(enrollmentService.getEnrollmentsByStudent(studentId)).thenReturn(List.of(enrollment));

        ResponseEntity<List<Enrollment>> response = enrollmentController.getEnrollmentsByStudent(studentId);
        assertEquals(200, response.getStatusCodeValue());
        assertEquals(1, response.getBody().size());
    }

    @Test
    void getEnrollmentsByStudent_ShouldReturnNotFound_WhenEmpty() {
        when(enrollmentService.getEnrollmentsByStudent(studentId)).thenReturn(List.of());

        ResponseEntity<List<Enrollment>> response = enrollmentController.getEnrollmentsByStudent(studentId);
        assertEquals(404, response.getStatusCodeValue());
    }

    @Test
    void getEnrollmentsByCourse_ShouldReturnList_WhenFound() {
        Enrollment enrollment = new Enrollment();
        enrollment.setId(UUID.randomUUID());

        when(enrollmentService.getEnrollmentsByCourse(courseId)).thenReturn(List.of(enrollment));

        ResponseEntity<List<Enrollment>> response = enrollmentController.getEnrollmentsByCourse(courseId);
        assertEquals(200, response.getStatusCodeValue());
        assertEquals(1, response.getBody().size());
    }

    @Test
    void getEnrollmentsByCourse_ShouldReturnNotFound_WhenEmpty() {
        when(enrollmentService.getEnrollmentsByCourse(courseId)).thenReturn(List.of());

        ResponseEntity<List<Enrollment>> response = enrollmentController.getEnrollmentsByCourse(courseId);
        assertEquals(404, response.getStatusCodeValue());
    }
}
