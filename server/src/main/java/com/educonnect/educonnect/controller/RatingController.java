package com.educonnect.educonnect.controller;

import com.educonnect.educonnect.entity.Rating;
import com.educonnect.educonnect.entity.User;
import com.educonnect.educonnect.entity.Course;
import com.educonnect.educonnect.dao.RatingRepository;
import com.educonnect.educonnect.dao.UserRepository;
import com.educonnect.educonnect.dao.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/ratings")
public class RatingController {

    @Autowired
    private RatingRepository ratingRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CourseRepository courseRepository;

    @PostMapping("/submit")
    public String submitRating(@RequestParam Long studentId,
                                @RequestParam Long courseId,
                                @RequestParam int rating,
                                @RequestParam(required = false) String comment) {
        Optional<User> student = userRepository.findById(studentId);
        Optional<Course> course = courseRepository.findById(courseId);

        if (student.isEmpty() || course.isEmpty()) {
            return "Invalid student or course ID";
        }

        Rating existing = ratingRepository.findByStudentAndCourse(student.get(), course.get()).orElse(null);
        if (existing != null) {
            existing.setRating(rating);
            existing.setComment(comment);
            ratingRepository.save(existing);
            return "Rating updated";
        }

        Rating newRating = new Rating();
        newRating.setStudent(student.get());
        newRating.setCourse(course.get());
        newRating.setRating(rating);
        newRating.setComment(comment);

        ratingRepository.save(newRating);
        return "Rating submitted";
    }

    @GetMapping("/course/{courseId}")
    public List<Rating> getRatingsByCourse(@PathVariable Long courseId) {
        Course course = courseRepository.findById(courseId).orElse(null);
        return ratingRepository.findByCourse(course);
    }

    @GetMapping("/student/{studentId}")
    public List<Rating> getRatingsByStudent(@PathVariable Long studentId) {
        User student = userRepository.findById(studentId).orElse(null);
        return ratingRepository.findByStudent(student);
    }
}
