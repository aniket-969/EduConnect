package com.educonnect.educonnect.controller;

import com.educonnect.educonnect.entity.Rating;
import com.educonnect.educonnect.service.RatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/ratings")
@CrossOrigin(origins = "*")
public class RatingController {

    @Autowired
    private RatingService ratingService;

    // CREATE or UPDATE: Submit or update rating
    @PostMapping("/submit")
    public ResponseEntity<String> submitRating(@RequestParam UUID studentId,
                                               @RequestParam UUID courseId,
                                               @RequestParam int rating,
                                               @RequestParam(required = false) String comment) {
        String result = ratingService.submitRating(studentId, courseId, rating, comment);
        if (result.equals("Invalid student or course ID")) {
            return ResponseEntity.badRequest().body(result);
        }
        return ResponseEntity.ok(result);
    }

    // READ: Get all ratings for a course
    @GetMapping("/course/{courseId}")
    public ResponseEntity<List<Rating>> getRatingsByCourse(@PathVariable UUID courseId) {
        List<Rating> ratings = ratingService.getRatingsByCourse(courseId);
        return ratings.isEmpty() ? ResponseEntity.notFound().build() : ResponseEntity.ok(ratings);
    }

    // READ: Get all ratings by a student
    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<Rating>> getRatingsByStudent(@PathVariable UUID studentId) {
        List<Rating> ratings = ratingService.getRatingsByStudent(studentId);
        return ratings.isEmpty() ? ResponseEntity.notFound().build() : ResponseEntity.ok(ratings);
    }

    // UPDATE: Update rating by ID
    @PutMapping("/{ratingId}")
    public ResponseEntity<Rating> updateRating(@PathVariable UUID ratingId,
                                               @RequestBody Rating updatedRating) {
        Rating rating = ratingService.updateRating(ratingId, updatedRating);
        return rating != null ? ResponseEntity.ok(rating) : ResponseEntity.notFound().build();
    }

    // DELETE: Delete rating by ID
    @DeleteMapping("/{ratingId}")
    public ResponseEntity<Void> deleteRating(@PathVariable UUID ratingId) {
        boolean deleted = ratingService.deleteRating(ratingId);
        return deleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
}
