package com.educonnect.educonnect.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "lessons")
public class Lesson {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ContentType contentType;

    @Column(length = 2000)
    private String content;

    @ManyToOne
    @JoinColumn(name = "course_id", nullable = false)
    private Course course;

    // === Constructors ===

    public Lesson() {
    }

    public Lesson(Long id, String title, ContentType contentType, String content, Course course) {
        this.id = id;
        this.title = title;
        this.contentType = contentType;
        this.content = content;
        this.course = course;
    }

    // === Getters and Setters ===

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
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

    public Course getCourse() {
        return course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }
}
