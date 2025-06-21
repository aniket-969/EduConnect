package com.educonnect.educonnect.dao;

import com.educonnect.educonnect.entity.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {

    // Find courses by category
    List<Course> findByCategory(String category);

    // Find courses by instructor
    List<Course> findByInstructor(User instructor);

    // Find courses by status (e.g., DRAFT or PUBLISHED)
    List<Course> findByStatus(String status);
}
