package com.educonnect.educonnect.dao;

import com.educonnect.educonnect.entity.Lesson;
import com.educonnect.educonnect.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface LessonRepository extends JpaRepository<Lesson, UUID> {

    List<Lesson> findByCourse(Course course);
}
