package com.educonnect.educonnect.service;

import com.educonnect.educonnect.entity.Enrollment;
import com.educonnect.educonnect.entity.User;
import com.educonnect.educonnect.entity.Course;
import com.educonnect.educonnect.dao.EnrollmentRepository;
import com.educonnect.educonnect.dao.UserRepository;
import com.educonnect.educonnect.dao.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EnrollmentService {

    @Autowired
    private EnrollmentRepository enrollmentRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CourseRepository courseRepository;

    public String enrollStudent(Long studentId, Long courseId) {
        Optional<User> studentOpt = userRepository.findById(studentId);
        Optional<Course> courseOpt = courseRepository.findById(courseId);

        if (studentOpt.isEmpty() || courseOpt.isEmpty()) {
            return "Invalid student or course ID";
        }

        User student = studentOpt.get();
        Course course = courseOpt.get();

        if (enrollmentRepository.existsByStudentAndCourse(student, course)) {
            return "Student already enrolled";
        }

        Enrollment enrollment = new Enrollment();
        enrollment.setStudent(student);
        enrollment.setCourse(course);
        enrollmentRepository.save(enrollment);

        return "Enrollment successful";
    }

    public List<Enrollment> getEnrollmentsByStudent(Long studentId) {
        return enrollmentRepository.findByStudent(userRepository.findById(studentId).orElse(null));
    }

    public List<Enrollment> getEnrollmentsByCourse(Long courseId) {
        return enrollmentRepository.findByCourse(courseRepository.findById(courseId).orElse(null));
    }
}
