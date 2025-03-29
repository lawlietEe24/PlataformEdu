import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CourseService } from "../../service/course.service";

@Component({
  selector: 'app-add-course',
  standalone: false,
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})

export class AddCourseComponent implements OnInit {

  formCourse: FormGroup;

  constructor(private courseService: CourseService) {
    this.formCourse = new FormGroup({
      name: new FormControl(),
      description: new FormControl(),
      duration: new FormControl(),
      dateStart: new FormControl(),
      dateEnd: new FormControl()
    })
  }

  ngOnInit(): void {
  }

  async onSubmit(){
    console.log(this.formCourse.value);
    const response = await this.courseService.addCourse(this.formCourse.value);
    console.log(response);
  }
}