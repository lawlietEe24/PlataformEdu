import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import { Course } from '../../interfaces/course.model';
import { CourseService } from '../../service/course.service';


@Component({
  selector: 'app-main',
  standalone: false,
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  courses: Course[] = [];

  constructor(
    private userService: UserService,
    private router: Router,
    private courseService: CourseService
  ) { }

  ngOnInit(): void {
    this.loadCourses();
  }
  async loadCourses() {
    try {
      const querySnapshot = await this.courseService.getAllCourses();
      this.courses = querySnapshot.map((course) => ({
        ...course // Asegurar que los datos coincidan con la interfaz Course
      })) as Course[];
    } catch (error) {
      console.error("Error al obtener cursos:", error);
    }
  }

  onClick() {
    this.userService.logout()
      .then(() => {
        this.router.navigate(['/register']);
      })
      .catch(error => console.log(error));
  }


  onEdit(courseId: string) {
    this.router.navigate(['/edit-course', courseId]);
  }
  onDelete(courseId: string) {
    this.courseService.deleteCourse(courseId)
     .then(() => console.log("Curso eliminado correctamente"))
     .catch(error => console.error("Error al eliminar el curso:", error));
  }
  onAddCourse() {
    this.router.navigate(['/add-course']);
  }

  

}