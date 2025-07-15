package com.educonnect.educonnect.entity;

import com.educonnect.educonnect.ContentType;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "lessons")
public class Lesson {

    @Id
    @GeneratedValue
    private UUID id;

    private String title;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ContentType contentType;

    @Column(length = 2000)
    private String content;

    private Integer sequence;

    private String thumbnailUrl;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @ManyToOne
    @JoinColumn(name = "course_id", nullable = false)
    private Course course;

    // === Constructors ===

    public Lesson() {}

    public Lesson(UUID id, String title, ContentType contentType, String content,
                  Integer sequence, String thumbnailUrl, LocalDateTime createdAt,
                  LocalDateTime updatedAt, Course course) {
        this.id = id;
        this.title = title;
        this.contentType = contentType;
        this.content = content;
        this.sequence = sequence;
        this.thumbnailUrl = thumbnailUrl;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.course = course;
    }

    // === Timestamps ===

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    // === Getters and Setters ===

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public ContentType getContentType() {
        return contentType;
    }

    public void setContentType(ContentType contentType) {
        this.contentType = contentType;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Integer getSequence() {
        return sequence;
    }

    public void setSequence(Integer sequence) {
        this.sequence = sequence;
    }

    public String getThumbnailUrl() {
        return thumbnailUrl;
    }

    public void setThumbnailUrl(String thumbnailUrl) {
        this.thumbnailUrl = thumbnailUrl;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public Course getCourse() {
        return course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }
}
