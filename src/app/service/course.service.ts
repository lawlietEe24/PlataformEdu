import { Injectable } from "@angular/core";
import { collection, Firestore, addDoc } from "@angular/fire/firestore";
import { Course } from "../interfaces/course.model";

@Injectable({
  providedIn: "root",
})

export class CourseService {

  constructor(private firestore: Firestore) {}

    addCourse(course: Course) {
      const courseRef = collection(this.firestore, "courses");
      return addDoc(courseRef, course); 

    }
  }
