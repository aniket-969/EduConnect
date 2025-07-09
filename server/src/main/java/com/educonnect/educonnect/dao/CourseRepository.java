package com.educonnect.educonnect.dao;

import com.educonnect.educonnect.entity.Course;
import com.educonnect.educonnect.entity.User;
import com.educonnect.educonnect.CourseStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface CourseRepository extends JpaRepository<Course, UUID> {

    // Find courses by category
    List<Course> findByCategory(String category);

    // Find courses by instructor
    List<Course> findByInstructor(User instructor);

    // Find courses by status (enum CourseStatus)
    List<Course> findByStatus(CourseStatus status);
}
