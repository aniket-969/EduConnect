package com.educonnect.educonnect.controller;

import com.educonnect.educonnect.entity.*;
import com.educonnect.educonnect.CourseStatus;
import com.educonnect.educonnect.dao.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/courses")
@CrossOrigin(origins = "*")
public class CourseController {

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private UserRepository userRepository;

    // Create a new course (only by instructors)
    @PostMapping("/create")
    public ResponseEntity<?> createCourse(@RequestBody Course course) {
        // Validate instructor
        if (course.getInstructor() == null || course.getInstructor().getId() == null) {
            return ResponseEntity.badRequest().body("Instructor info is required.");
        }

        Optional<User> instructor = userRepository.findById(course.getInstructor().getId());
        if (instructor.isEmpty() || !instructor.get().getRole().name().equals("INSTRUCTOR")) {
            return ResponseEntity.badRequest().body("Only instructors can create courses.");
        }

        course.setInstructor(instructor.get());
        course.setStatus(CourseStatus.DRAFT); // Default status
        Course savedCourse = courseRepository.save(course);

        return ResponseEntity.ok(savedCourse);
    }

    // Get all courses
    @GetMapping
    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    // Get course by ID
    @GetMapping("/{id}")
    public ResponseEntity<Course> getCourseById(@PathVariable Long id) {
        Optional<Course> course = courseRepository.findById(id);
        return course.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Get courses by category
    @GetMapping("/category/{category}")
    public List<Course> getCoursesByCategory(@PathVariable String category) {
        return courseRepository.findByCategory(category);
    }

    // Get courses by instructor ID
    @GetMapping("/instructor/{instructorId}")
    public List<Course> getCoursesByInstructor(@PathVariable Long instructorId) {
        Optional<User> instructor = userRepository.findById(instructorId);
        return instructor.map(courseRepository::findByInstructor).orElse(List.of());
    }
}
