package com.educonnect.educonnect.controller;

import com.educonnect.educonnect.entity.Enrollment;
import com.educonnect.educonnect.entity.User;
import com.educonnect.educonnect.entity.Course;
import com.educonnect.educonnect.dao.EnrollmentRepository;
import com.educonnect.educonnect.dao.UserRepository;
import com.educonnect.educonnect.dao.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/enrollments")
public class EnrollmentController {

    @Autowired
    private EnrollmentRepository enrollmentRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CourseRepository courseRepository;

    @PostMapping("/enroll")
    public String enrollStudent(@RequestParam Long studentId, @RequestParam Long courseId) {
        Optional<User> userOpt = userRepository.findById(studentId);
        Optional<Course> courseOpt = courseRepository.findById(courseId);

        if (userOpt.isEmpty() || courseOpt.isEmpty()) {
            return "Invalid student or course ID";
        }

        if (enrollmentRepository.existsByStudentAndCourse(userOpt.get(), courseOpt.get())) {
            return "Student already enrolled";
        }

        Enrollment enrollment = new Enrollment();
        enrollment.setStudent(userOpt.get());
        enrollment.setCourse(courseOpt.get());
        enrollmentRepository.save(enrollment);
        return "Enrollment successful";
    }

    @GetMapping("/student/{studentId}")
    public List<Enrollment> getEnrollmentsByStudent(@PathVariable Long studentId) {
        User student = userRepository.findById(studentId).orElse(null);
        return enrollmentRepository.findByStudent(student);
    }

    @GetMapping("/course/{courseId}")
    public List<Enrollment> getEnrollmentsByCourse(@PathVariable Long courseId) {
        Course course = courseRepository.findById(courseId).orElse(null);
        return enrollmentRepository.findByCourse(course);
    }
}
