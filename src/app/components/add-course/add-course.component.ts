import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CourseService } from "../../service/course.service";
import { Router } from "@angular/router";
import { Course } from "../../interfaces/course.model";

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  standalone: false,
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {

  formCourse: FormGroup;
  imagePreview: string = ''; // Para mostrar la vista previa de la imagen

  constructor(private courseService: CourseService, private router: Router) { 
    this.formCourse = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      duration: new FormControl('', [Validators.required, Validators.min(1)]),
      dateStart: new FormControl('', Validators.required),
      dateEnd: new FormControl('', Validators.required),
      imageUrl: new FormControl('')
    });
  }

  ngOnInit(): void {}

  // Método para mostrar la vista previa de la imagen
  updateImagePreview() {
    this.imagePreview = this.formCourse.value.imageUrl;
  }

  async onSubmit() {
    if (this.formCourse.invalid) {
      console.error("Formulario inválido. Complete todos los campos.");
      return;
    }

    const course: Course = {
      name: this.formCourse.value.name,
      description: this.formCourse.value.description,
      duration: this.formCourse.value.duration,
      dateStart: new Date(this.formCourse.value.dateStart),
      dateEnd: new Date(this.formCourse.value.dateEnd),
      imageUrl: this.formCourse.value.imageUrl || ''
    };

    try {
      console.log("Datos a enviar:", course);
      const docRef = await this.courseService.addCourse(course);  // Guardamos el curso y obtenemos la referencia
      console.log("Curso agregado correctamente con ID:", docRef.id);  // Aquí obtenemos el ID
      this.router.navigate(['/main']); // Redirige después de agregar el curso
    } catch (error) {
      console.error("Error al agregar el curso:", error);
    }
  }
}
