package com.educonnect.educonnect.dao;

import com.educonnect.educonnect.entity.Lesson;
import com.educonnect.educonnect.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LessonRepository extends JpaRepository<Lesson, Long> {

    List<Lesson> findByCourse(Course course);
}
