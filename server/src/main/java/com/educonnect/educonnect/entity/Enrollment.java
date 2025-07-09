package com.educonnect.educonnect.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "enrollments", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"student_id", "course_id"})
})
public class Enrollment {

    @Id
    @GeneratedValue(strategy=GenerationType.UUID)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    private User student;

    @ManyToOne
    @JoinColumn(name = "course_id", nullable = false)
    private Course course;

    @ElementCollection
    @CollectionTable(name = "completed_lessons", joinColumns = @JoinColumn(name = "enrollment_id"))
    @Column(name = "lesson_id")
    private Set<UUID> completedLessonIds = new HashSet<>();

    private LocalDateTime enrolledAt;

    // === Constructors ===

    public Enrollment() {
        this.enrolledAt = LocalDateTime.now();
    }

    public Enrollment(UUID id, User student, Course course, Set<UUID> completedLessonIds, LocalDateTime enrolledAt) {
        this.id = id;
        this.student = student;
        this.course = course;
        this.completedLessonIds = completedLessonIds;
        this.enrolledAt = enrolledAt != null ? enrolledAt : LocalDateTime.now();
    }

    // === Getters and Setters ===

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
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

    public Set<UUID> getCompletedLessonIds() {
        return completedLessonIds;
    }

    public void setCompletedLessonIds(Set<UUID> completedLessonIds) {
        this.completedLessonIds = completedLessonIds;
    }

    public LocalDateTime getEnrolledAt() {
        return enrolledAt;
    }

    public void setEnrolledAt(LocalDateTime enrolledAt) {
        this.enrolledAt = enrolledAt;
    }
}
