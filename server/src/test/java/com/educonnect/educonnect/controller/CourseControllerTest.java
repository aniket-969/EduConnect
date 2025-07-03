package com.educonnect.educonnect.controller;

import com.educonnect.educonnect.CourseStatus;
import com.educonnect.educonnect.Role;
import com.educonnect.educonnect.dao.UserRepository;
import com.educonnect.educonnect.entity.Course;
import com.educonnect.educonnect.entity.User;
import com.educonnect.educonnect.service.CourseService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.springframework.http.ResponseEntity;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class CourseControllerTest {

    @Mock
    private CourseService courseService;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private CourseController courseController;

    private User instructor;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        instructor = new User();
        instructor.setId(UUID.randomUUID());
        instructor.setName("Instructor");
        instructor.setRole(Role.INSTRUCTOR);
    }

    @Test
    void createCourse_ShouldReturnSavedCourse_WhenInstructorValid() {
        Course course = new Course();
        course.setInstructor(instructor);

        when(userRepository.findById(instructor.getId())).thenReturn(Optional.of(instructor));
        when(courseService.saveCourse(any(Course.class))).thenReturn(course);

        ResponseEntity<?> response = courseController.createCourse(course);
        assertEquals(200, response.getStatusCodeValue());
        assertEquals(course, response.getBody());
    }

    @Test
    void createCourse_ShouldReturnBadRequest_WhenInstructorMissing() {
        Course course = new Course(); // no instructor set

        ResponseEntity<?> response = courseController.createCourse(course);
        assertEquals(400, response.getStatusCodeValue());
        assertEquals("Instructor info is required.", response.getBody());
    }

    @Test
    void createCourse_ShouldReturnBadRequest_WhenUserIsNotInstructor() {
        User nonInstructor = new User();
        nonInstructor.setId(UUID.randomUUID());
        nonInstructor.setRole(Role.STUDENT); // not an instructor

        Course course = new Course();
        course.setInstructor(nonInstructor);

        when(userRepository.findById(nonInstructor.getId())).thenReturn(Optional.of(nonInstructor));

        ResponseEntity<?> response = courseController.createCourse(course);
        assertEquals(400, response.getStatusCodeValue());
        assertEquals("Only instructors can create courses.", response.getBody());
    }

    @Test
    void getAllCourses_ShouldReturnListOfCourses() {
        Course course = new Course();
        course.setTitle("Java");

        when(courseService.getAllCourses()).thenReturn(List.of(course));

        List<Course> courses = courseController.getAllCourses();
        assertEquals(1, courses.size());
        assertEquals("Java", courses.get(0).getTitle());
    }

    @Test
    void getCourseById_ShouldReturnCourse_IfExists() {
        UUID id = UUID.randomUUID();
        Course course = new Course();
        course.setId(id);

        when(courseService.getCourseById(id)).thenReturn(Optional.of(course));

        ResponseEntity<Course> response = courseController.getCourseById(id);
        assertEquals(200, response.getStatusCodeValue());
        assertEquals(course, response.getBody());
    }

    @Test
    void getCourseById_ShouldReturnNotFound_IfNotExists() {
        UUID id = UUID.randomUUID();

        when(courseService.getCourseById(id)).thenReturn(Optional.empty());

        ResponseEntity<Course> response = courseController.getCourseById(id);
        assertEquals(404, response.getStatusCodeValue());
    }

    @Test
    void getCoursesByCategory_ShouldReturnList() {
        Course course = new Course();
        course.setCategory("Programming");

        when(courseService.getCoursesByCategory("Programming")).thenReturn(List.of(course));

        List<Course> courses = courseController.getCoursesByCategory("Programming");
        assertEquals(1, courses.size());
        assertEquals("Programming", courses.get(0).getCategory());
    }

    @Test
    void getCoursesByInstructor_ShouldReturnList_IfInstructorExists() {
        UUID instructorId = instructor.getId();
        Course course = new Course();

        when(userRepository.findById(instructorId)).thenReturn(Optional.of(instructor));
        when(courseService.getCoursesByInstructor(instructor)).thenReturn(List.of(course));

        List<Course> courses = courseController.getCoursesByInstructor(instructorId);
        assertEquals(1, courses.size());
    }

    @Test
    void getCoursesByInstructor_ShouldReturnEmptyList_IfInstructorNotFound() {
        UUID instructorId = UUID.randomUUID();

        when(userRepository.findById(instructorId)).thenReturn(Optional.empty());

        List<Course> courses = courseController.getCoursesByInstructor(instructorId);
        assertTrue(courses.isEmpty());
    }

    @Test
    void updateCourse_ShouldReturnUpdatedCourse_IfExists() {
        UUID id = UUID.randomUUID();
        Course updatedCourse = new Course();
        updatedCourse.setId(id);

        when(courseService.updateCourse(id, updatedCourse)).thenReturn(Optional.of(updatedCourse));

        ResponseEntity<?> response = courseController.updateCourse(id, updatedCourse);
        assertEquals(200, response.getStatusCodeValue());
        assertEquals(updatedCourse, response.getBody());
    }

    @Test
    void updateCourse_ShouldReturnNotFound_IfCourseNotExists() {
        UUID id = UUID.randomUUID();
        Course updatedCourse = new Course();

        when(courseService.updateCourse(id, updatedCourse)).thenReturn(Optional.empty());

        ResponseEntity<?> response = courseController.updateCourse(id, updatedCourse);
        assertEquals(404, response.getStatusCodeValue());
    }

    @Test
    void deleteCourse_ShouldReturnOk_IfDeleted() {
        UUID id = UUID.randomUUID();
        when(courseService.deleteCourse(id)).thenReturn(true);

        ResponseEntity<String> response = courseController.deleteCourse(id);
        assertEquals(200, response.getStatusCodeValue());
        assertEquals("Course deleted successfully.", response.getBody());
    }

    @Test
    void deleteCourse_ShouldReturnNotFound_IfNotFound() {
        UUID id = UUID.randomUUID();
        when(courseService.deleteCourse(id)).thenReturn(false);

        ResponseEntity<String> response = courseController.deleteCourse(id);
        assertEquals(404, response.getStatusCodeValue());
    }
}
