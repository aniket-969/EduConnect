package com.educonnect.educonnect.controller;

import com.educonnect.educonnect.entity.Rating;
import com.educonnect.educonnect.service.RatingService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;

import org.springframework.http.ResponseEntity;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class RatingControllerTest {

    @Mock
    private RatingService ratingService;

    @InjectMocks
    private RatingController ratingController;

    private UUID studentId;
    private UUID courseId;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        studentId = UUID.randomUUID();
        courseId = UUID.randomUUID();
    }

    @Test
    void submitRating_ShouldReturnSuccessMessage() {
        when(ratingService.submitRating(studentId, courseId, 5, "Great course"))
                .thenReturn("Rating submitted successfully");

        ResponseEntity<String> response = ratingController.submitRating(studentId, courseId, 5, "Great course");

        assertEquals(200, response.getStatusCodeValue());
        assertEquals("Rating submitted successfully", response.getBody());
    }

    @Test
    void submitRating_ShouldReturnBadRequest_WhenInvalidStudentOrCourse() {
        when(ratingService.submitRating(studentId, courseId, 4, "Nice"))
                .thenReturn("Invalid student or course ID");

        ResponseEntity<String> response = ratingController.submitRating(studentId, courseId, 4, "Nice");

        assertEquals(400, response.getStatusCodeValue());
        assertEquals("Invalid student or course ID", response.getBody());
    }

    @Test
    void getRatingsByCourse_ShouldReturnList_WhenRatingsExist() {
        Rating rating = new Rating();
        rating.setRating(5);
        rating.setComment("Excellent");

        when(ratingService.getRatingsByCourse(courseId)).thenReturn(List.of(rating));

        ResponseEntity<List<Rating>> response = ratingController.getRatingsByCourse(courseId);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals(1, response.getBody().size());
        assertEquals(5, response.getBody().get(0).getRating());
    }

    @Test
    void getRatingsByCourse_ShouldReturnNotFound_WhenNoRatings() {
        when(ratingService.getRatingsByCourse(courseId)).thenReturn(List.of());

        ResponseEntity<List<Rating>> response = ratingController.getRatingsByCourse(courseId);

        assertEquals(404, response.getStatusCodeValue());
    }

    @Test
    void getRatingsByStudent_ShouldReturnList_WhenRatingsExist() {
        Rating rating = new Rating();
        rating.setRating(3);
        rating.setComment("Average");

        when(ratingService.getRatingsByStudent(studentId)).thenReturn(List.of(rating));

        ResponseEntity<List<Rating>> response = ratingController.getRatingsByStudent(studentId);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals(1, response.getBody().size());
        assertEquals("Average", response.getBody().get(0).getComment());
    }

    @Test
    void getRatingsByStudent_ShouldReturnNotFound_WhenNoRatings() {
        when(ratingService.getRatingsByStudent(studentId)).thenReturn(List.of());

        ResponseEntity<List<Rating>> response = ratingController.getRatingsByStudent(studentId);

        assertEquals(404, response.getStatusCodeValue());
    }
}
