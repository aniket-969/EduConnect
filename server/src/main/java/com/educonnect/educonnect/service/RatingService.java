package com.educonnect.educonnect.service;

import com.educonnect.educonnect.entity.Rating;
import com.educonnect.educonnect.entity.Course;
import com.educonnect.educonnect.entity.User;
import com.educonnect.educonnect.dao.CourseRepository;
import com.educonnect.educonnect.dao.RatingRepository;
import com.educonnect.educonnect.dao.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class RatingService {

    @Autowired
    private RatingRepository ratingRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CourseRepository courseRepository;

    // CREATE or UPDATE by student+course
    public String submitRating(UUID studentId, UUID courseId, int rating, String comment) {
        Optional<User> studentOpt = userRepository.findById(studentId);
        Optional<Course> courseOpt = courseRepository.findById(courseId);

        if (studentOpt.isEmpty() || courseOpt.isEmpty()) {
            return "Invalid student or course ID";
        }

        User student = studentOpt.get();
        Course course = courseOpt.get();

        Optional<Rating> existingRating = ratingRepository.findByStudentAndCourse(student, course);

        Rating ratingEntity = existingRating.orElse(new Rating());
        ratingEntity.setStudent(student);
        ratingEntity.setCourse(course);
        ratingEntity.setRating(rating);
        ratingEntity.setComment(comment);

        ratingRepository.save(ratingEntity);

        return existingRating.isPresent() ? "Rating updated" : "Rating submitted";
    }

    // READ: Ratings by Course
    public List<Rating> getRatingsByCourse(UUID courseId) {
        return courseRepository.findById(courseId)
                .map(ratingRepository::findByCourse)
                .orElse(List.of());
    }

    // READ: Ratings by Student
    public List<Rating> getRatingsByStudent(UUID studentId) {
        return userRepository.findById(studentId)
                .map(ratingRepository::findByStudent)
                .orElse(List.of());
    }

    // UPDATE: By rating ID
    public Rating updateRating(UUID ratingId, Rating updatedRating) {
        Optional<Rating> existing = ratingRepository.findById(ratingId);
        if (existing.isPresent()) {
            Rating rating = existing.get();
            rating.setRating(updatedRating.getRating());
            rating.setComment(updatedRating.getComment());
            return ratingRepository.save(rating);
        }
        return null;
    }

    // DELETE: By rating ID
    public boolean deleteRating(UUID ratingId) {
        if (ratingRepository.existsById(ratingId)) {
            ratingRepository.deleteById(ratingId);
            return true;
        }
        return false;
    }
}
