import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CourseService } from '../../service/course.service';
import { Course } from '../../interfaces/course.model';


@Component({
  selector: 'app-course-list',
  template: `
    <div *ngFor="let course of courses" (click)="selectCourse(course)">
      <h2>{{ course.title }}</h2>
      <p>{{ course.description }}</p>
      <p>Instructor ID: {{ course.instructorId }}</p>
    </div>
  `,
  standalone: false,
})
export class CourseListComponent implements OnInit {
  courses: Course[] = [];
  
  @Output() courseSelected = new EventEmitter<Course>();

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.courseService.getCourses().subscribe((data) => {
      this.courses = data;
    }); 
  }

  selectCourse(course: Course): void {
   this.courseSelected.emit(course);
  }

}
