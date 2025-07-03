package com.educonnect.educonnect.dao;

import com.educonnect.educonnect.entity.Rating;
import com.educonnect.educonnect.entity.User;
import com.educonnect.educonnect.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface RatingRepository extends JpaRepository<Rating, UUID> {

    List<Rating> findByCourse(Course course);

    List<Rating> findByStudent(User student);

    Optional<Rating> findByStudentAndCourse(User student, Course course);

    boolean existsByStudentAndCourse(User student, Course course);
}
