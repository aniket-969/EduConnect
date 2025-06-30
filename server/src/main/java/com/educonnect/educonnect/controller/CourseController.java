package com.educonnect.educonnect.controller;

import com.educonnect.educonnect.CourseStatus;
import com.educonnect.educonnect.Role;
import com.educonnect.educonnect.entity.Course;
import com.educonnect.educonnect.entity.User;
import com.educonnect.educonnect.service.CourseService;
import com.educonnect.educonnect.dao.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/courses")
@CrossOrigin(origins = "*")
public class CourseController {

    @Autowired
    private CourseService courseService;

    @Autowired
    private UserRepository userRepository;

    // Create course - Instructor only
    @PreAuthorize("hasRole('INSTRUCTOR')")
    @PostMapping("/create")
    public ResponseEntity<?> createCourse(@RequestBody Course course) {
        if (course.getInstructor() == null || course.getInstructor().getId() == null) {
            return ResponseEntity.badRequest().body("Instructor info is required.");
        }

        Optional<User> instructor = userRepository.findById(course.getInstructor().getId());
        if (instructor.isEmpty() || !instructor.get().getRole().equals(Role.INSTRUCTOR)) {
            return ResponseEntity.badRequest().body("Only instructors can create courses.");
        }

        course.setInstructor(instructor.get());
        course.setStatus(CourseStatus.DRAFT);
        return ResponseEntity.ok(courseService.saveCourse(course));
    }

    // Read all courses - Both roles
    @PreAuthorize("hasAnyRole('INSTRUCTOR', 'STUDENT')")
    @GetMapping
    public List<Course> getAllCourses() {
        return courseService.getAllCourses();
    }

    // Read course by ID
    @PreAuthorize("hasAnyRole('INSTRUCTOR', 'STUDENT')")
    @GetMapping("/{id}")
    public ResponseEntity<Course> getCourseById(@PathVariable UUID id) {
        return courseService.getCourseById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Read courses by category
    @PreAuthorize("hasAnyRole('INSTRUCTOR', 'STUDENT')")
    @GetMapping("/category/{category}")
    public List<Course> getCoursesByCategory(@PathVariable String category) {
        return courseService.getCoursesByCategory(category);
    }

    // Read courses by instructor
    @PreAuthorize("hasAnyRole('INSTRUCTOR', 'STUDENT')")
    @GetMapping("/instructor/{instructorId}")
    public List<Course> getCoursesByInstructor(@PathVariable UUID instructorId) {
        Optional<User> instructor = userRepository.findById(instructorId);
        return instructor.map(courseService::getCoursesByInstructor).orElse(List.of());
    }

    // Update course - Instructor only
    @PreAuthorize("hasRole('INSTRUCTOR')")
    @PutMapping("/{id}")
    public ResponseEntity<?> updateCourse(@PathVariable UUID id, @RequestBody Course updatedCourse) {
        return courseService.updateCourse(id, updatedCourse)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Delete course - Instructor only
    @PreAuthorize("hasRole('INSTRUCTOR')")
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCourse(@PathVariable UUID id) {
        boolean deleted = courseService.deleteCourse(id);
        if (deleted) {
            return ResponseEntity.ok("Course deleted successfully.");
        }
        return ResponseEntity.notFound().build();
    }
}
