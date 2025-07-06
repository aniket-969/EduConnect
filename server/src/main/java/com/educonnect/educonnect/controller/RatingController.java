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

    // Submit or update rating
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

    // Get ratings by course
    @GetMapping("/course/{courseId}")
    public ResponseEntity<List<Rating>> getRatingsByCourse(@PathVariable UUID courseId) {
        List<Rating> ratings = ratingService.getRatingsByCourse(courseId);
        if (ratings.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(ratings);
    }

    // Get ratings by student
    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<Rating>> getRatingsByStudent(@PathVariable UUID studentId) {
        List<Rating> ratings = ratingService.getRatingsByStudent(studentId);
        if (ratings.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(ratings);
    }
}
