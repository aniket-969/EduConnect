package com.educonnect.educonnect.service;

import com.educonnect.educonnect.entity.*;
import com.educonnect.educonnect.CourseStatus;
import com.educonnect.educonnect.dao.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class CourseService {

    @Autowired
    private CourseRepository courseRepository;

    // Create or update a course
    public Course saveCourse(Course course) {
       if(course.getLessons()!=null){
           for(Lesson lesson:course.getLessons()){
               lesson.setCourse(course);
           }
       }
        return courseRepository.save(course);
    }

    // Update course by ID
    public Optional<Course> updateCourse(UUID id, Course updatedCourse) {
        return courseRepository.findById(id).map(existing -> {
            existing.setTitle(updatedCourse.getTitle());
            existing.setDescription(updatedCourse.getDescription());
            existing.setCategory(updatedCourse.getCategory());
            existing.setStatus(updatedCourse.getStatus());
            existing.setThumbnailUrl(updatedCourse.getThumbnailUrl());
            existing.setImageUrls(updatedCourse.getImageUrls());
            existing.setPrice(updatedCourse.getPrice());
            existing.setLevel(updatedCourse.getLevel());
            existing.setLearningObjectives(updatedCourse.getLearningObjectives());
            return courseRepository.save(existing);
        });
    }

    // Delete course by ID
    public boolean deleteCourse(UUID id) {
        if (courseRepository.existsById(id)) {
            courseRepository.deleteById(id);
            return true;
        }
        return false;
    }

    // Get all courses
    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    // Get course by UUID
    public Optional<Course> getCourseById(UUID id) {
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
    public List<Course> getCoursesByStatus(CourseStatus status) {
        return courseRepository.findByStatus(status);
    }
}
