package com.educonnect.educonnect.controller;

import com.educonnect.educonnect.entity.Enrollment;
import com.educonnect.educonnect.service.EnrollmentService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/enrollments")
@CrossOrigin(origins = "*")
public class EnrollmentController {

    @Autowired
    private EnrollmentService enrollmentService;

    // Enroll a student in a course
    @PostMapping("/enroll")
    public ResponseEntity<String> enrollStudent(@RequestParam UUID studentId, @RequestParam UUID courseId) {
        String result = enrollmentService.enrollStudent(studentId, courseId);
        if (result.equals("Enrollment successful")) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.badRequest().body(result);
        }
    }

    // Get enrollments by student ID
    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<Enrollment>> getEnrollmentsByStudent(@PathVariable UUID studentId) {
        List<Enrollment> enrollments = enrollmentService.getEnrollmentsByStudent(studentId);
        if (enrollments.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(enrollments);
    }

    // Get enrollments by course ID
    @GetMapping("/course/{courseId}")
    public ResponseEntity<List<Enrollment>> getEnrollmentsByCourse(@PathVariable UUID courseId) {
        List<Enrollment> enrollments = enrollmentService.getEnrollmentsByCourse(courseId);
        if (enrollments.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(enrollments);
    }
}
