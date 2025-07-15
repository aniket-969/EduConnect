package com.educonnect.educonnect.dao;

import com.educonnect.educonnect.entity.Enrollment;
import com.educonnect.educonnect.entity.User;
import com.educonnect.educonnect.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface EnrollmentRepository extends JpaRepository<Enrollment, UUID> {

    List<Enrollment> findByStudent(User student);

    List<Enrollment> findByCourse(Course course);

    Optional<Enrollment> findByStudentAndCourse(User student, Course course);

    boolean existsByStudentAndCourse(User student, Course course);
}
