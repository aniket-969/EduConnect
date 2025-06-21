package com.educonnect.educonnect.service;

import com.educonnect.educonnect.entity.*;
import com.educonnect.educonnect.dao.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CourseService {

    @Autowired
    private CourseRepository courseRepository;

    // Create or update a course
    public Course saveCourse(Course course) {
        return courseRepository.save(course);
    }

    // Get all courses
    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    // Get course by ID
    public Optional<Course> getCourseById(Long id) {
        return courseRepository.findById(id);
    }

    // Get courses by category
    public List<Course> getCoursesByCategory(String category) {
        return courseRepository.findByCategory(category);
    }

    // Get courses created by a specific instructor
    public List<Course> getCoursesByInstructor(User instructor) {
        return courseRepository.findByInstructor(instructor);
    }

    // Get courses by status
    public List<Course> getCoursesByStatus(String status) {
        return courseRepository.findByStatus(status);
    }
}
