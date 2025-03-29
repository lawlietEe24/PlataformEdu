import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../../service/course.service';
import { Course } from '../../interfaces/course.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-course',
  standalone: false,
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css']
})
export class EditCourseComponent implements OnInit {
  courseId: string = '';
  course: Course | undefined;
  formCourse: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private router: Router
  ) {
    this.formCourse = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      duration: new FormControl('', [Validators.required, Validators.min(1)]),
      dateStart: new FormControl('', Validators.required),
      dateEnd: new FormControl('', Validators.required),
      imageUrl: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.courseId = this.route.snapshot.paramMap.get('id')!;
    this.loadCourse();
  }

  // Cargar los detalles del curso para editarlo
  loadCourse() {
    this.courseService.getCourseById(this.courseId).then((doc) => {
      if (doc) {
        this.course = doc as Course;
        this.formCourse.patchValue(this.course);
      } else {
        console.error('Curso no encontrado');
      }
    }).catch(error => console.error('Error al cargar el curso:', error));
  }

  // Actualizar el curso
  async onSubmit() {
    if (this.formCourse.valid) {
      const updatedCourse: Course = {
        ...this.formCourse.value
      };

      try {
        await this.courseService.updateCourse(this.courseId, updatedCourse);
        console.log('Curso actualizado correctamente');
        this.router.navigate(['/main']);
      } catch (error) {
        console.error('Error al actualizar el curso:', error);
      }
    }
  }
}
