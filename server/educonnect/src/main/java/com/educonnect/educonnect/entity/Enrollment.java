package com.educonnect.educonnect.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "enrollments")
public class Enrollment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    private User student;

    @ManyToOne
    @JoinColumn(name = "course_id", nullable = false)
    private Course course;

    @ElementCollection
    private Set<Long> completedLessons = new HashSet<>();

    private LocalDateTime enrolledAt = LocalDateTime.now();

    // === Constructors ===

    public Enrollment() {
    }

    public Enrollment(Long id, User student, Course course, Set<Long> completedLessons, LocalDateTime enrolledAt) {
        this.id = id;
        this.student = student;
        this.course = course;
        this.completedLessons = completedLessons;
        this.enrolledAt = enrolledAt;
    }

    // === Getters and Setters ===

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getStudent() {
        return student;
    }

    public void setStudent(User student) {
        this.student = student;
    }

    public Course getCourse() {
        return course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

    public Set<Long> getCompletedLessons() {
        return completedLessons;
    }

    public void setCompletedLessons(Set<Long> completedLessons) {
        this.completedLessons = completedLessons;
    }

    public LocalDateTime getEnrolledAt() {
        return enrolledAt;
    }

    public void setEnrolledAt(LocalDateTime enrolledAt) {
        this.enrolledAt = enrolledAt;
    }
}
