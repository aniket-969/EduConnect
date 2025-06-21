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

@Service
public class RatingService {

    @Autowired
    private RatingRepository ratingRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CourseRepository courseRepository;

    public String submitRating(Long studentId, Long courseId, int rating, String comment) {
        Optional<User> studentOpt = userRepository.findById(studentId);
        Optional<Course> courseOpt = courseRepository.findById(courseId);

        if (studentOpt.isEmpty() || courseOpt.isEmpty()) {
            return "Invalid student or course ID";
        }

        User student = studentOpt.get();
        Course course = courseOpt.get();

        Optional<Rating> existingRating = ratingRepository.findByStudentAndCourse(student, course);

        if (existingRating.isPresent()) {
            Rating r = existingRating.get();
            r.setRating(rating);
            r.setComment(comment);
            ratingRepository.save(r);
            return "Rating updated";
        }

        Rating newRating = new Rating();
        newRating.setStudent(student);
        newRating.setCourse(course);
        newRating.setRating(rating);
        newRating.setComment(comment);
        ratingRepository.save(newRating);

        return "Rating submitted";
    }

    public List<Rating> getRatingsByCourse(Long courseId) {
        Course course = courseRepository.findById(courseId).orElse(null);
        return ratingRepository.findByCourse(course);
    }

    public List<Rating> getRatingsByStudent(Long studentId) {
        User student = userRepository.findById(studentId).orElse(null);
        return ratingRepository.findByStudent(student);
    }
}
